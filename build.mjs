#!/usr/bin/env node
/**
 * Primidian — build script
 *
 * Concatenates src/ into theme.css in deterministic numeric order and runs
 * static checks for the failure classes that are otherwise invisible until a
 * user reports them.
 *
 * Zero runtime dependencies. Node built-ins only.
 *
 *   node build.mjs            build + validate
 *   node build.mjs --watch    rebuild on change
 *   node build.mjs --check    validate only, no write
 */

import { readdirSync, readFileSync, writeFileSync, statSync, watch } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'theme.css');

const IMPORTANT_BUDGET = 5; // functional; accessibility guards are exempt by comment marker

/* ── file discovery ─────────────────────────────────────────────────────── */

function collect(dir) {
	const out = [];
	for (const entry of readdirSync(dir).sort()) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) out.push(...collect(full));
		else if (entry.endsWith('.css')) out.push(full);
	}
	return out;
}

/**
 * Order is by the leading numeric prefix of the FILENAME, not the path, so
 * that the layer model in docs/13 is honoured across subdirectories.
 */
function ordered() {
	return collect(SRC).sort((a, b) => {
		const na = parseInt(a.split(sep).pop(), 10);
		const nb = parseInt(b.split(sep).pop(), 10);
		if (Number.isNaN(na) || Number.isNaN(nb)) return a.localeCompare(b);
		if (na !== nb) return na - nb;
		return a.localeCompare(b);
	});
}

/* ── validation ─────────────────────────────────────────────────────────── */

const errors = [];
const warnings = [];

/**
 * Strip CSS comments before running property-level checks, so that a rule
 * DESCRIBED in a comment (e.g. documenting what Obsidianite did wrong) is not
 * mistaken for a rule the theme actually contains.
 */
function stripComments(s) {
	return s.replace(/\/\*[\s\S]*?\*\//g, '');
}

function check(files, css) {
	/* I-6 — no `transition: all` */
	for (const f of files) {
		const raw = readFileSync(f, 'utf8');
		const body = stripComments(raw);
		const rel = relative(ROOT, f);

		if (/transition\s*:\s*all\b/.test(body))
			errors.push(`${rel}: "transition: all" is banned (perf rule PR-1).`);

		/* I-4 — Tier-1 primitives must not leak outside tokens/ */
		if (!rel.includes(`tokens${sep}`)) {
			const leak = body.match(/var\(\s*--primidian-c-[a-z0-9-]+/g);
			if (leak)
				errors.push(
					`${rel}: references Tier-1 primitive(s) outside src/tokens/ — ` +
						`${[...new Set(leak)].join(', ')}. Route through a semantic token (I-4).`
				);
		}

		/* I-10 — :has() restricted */
		const has = body.match(/:has\([^)]*\)/g) || [];
		if (has.length && /\.cm-line[^{]*:has\(/.test(body))
			errors.push(`${rel}: ":has()" on .cm-line is banned (perf rule PR-6 / I-10).`);

		if (/@import/.test(body)) errors.push(`${rel}: "@import" is banned (I-*: ordering ambiguity).`);
	}

	/* I-5 — !important budget. Comments are excluded; a11y-marked lines are
	 * exempt because accessibility overrides are the legitimate use case. */
	const impLines = css
		.split('\n')
		.filter((l) => l.includes('!important'))
		// drop comment lines (banner art, prose describing Obsidianite's rules)
		.filter((l) => !/^\s*(\*|\/\*)/.test(l))
		// a11y overrides are the legitimate exception
		.filter((l) => !/a11y|accessibility-override/i.test(l));
	if (impLines.length > IMPORTANT_BUDGET)
		warnings.push(
			`!important budget exceeded: ${impLines.length} functional uses (budget ${IMPORTANT_BUDGET}).`
		);

	/* Style Settings validation */
	const m = css.match(/\/\*\s*@settings([\s\S]*?)\*\//);
	if (!m) {
		errors.push('No /* @settings */ block found. Style Settings integration would be absent.');
		return;
	}
	const yaml = m[1];

	const ids = [...yaml.matchAll(/^\s*(?:-\s+)?id:\s*(\S+)\s*$/gm)].map((x) => x[1]);
	const types = [...yaml.matchAll(/^\s*type:\s*(\S+)\s*$/gm)].map((x) => x[1]);

	if (!ids.length) errors.push('@settings: no ids parsed — the YAML is likely malformed.');

	/* Every class-select option value must exist as a body.<value> rule. */
	const optionValues = [...yaml.matchAll(/^\s*value:\s*(\S+)\s*$/gm)].map((x) => x[1]);
	for (const v of new Set(optionValues)) {
		if (v === 'none') continue;
		if (!new RegExp(`body\\.${v}\\b`).test(css))
			errors.push(`@settings: option value "${v}" has no matching "body.${v}" rule in src/variants/.`);
	}

	/* Every variable-* setting id must exist as a declared --<id>. */
	const blocks = yaml.split(/^\s*-\s*$/m);
	for (const b of blocks) {
		const id = (b.match(/^\s*id:\s*(\S+)\s*$/m) || [])[1];
		const type = (b.match(/^\s*type:\s*(\S+)\s*$/m) || [])[1];
		if (!id || !type) continue;
		if (!type.startsWith('variable-')) continue;

		if (!new RegExp(`--${id}\\s*:`).test(css))
			errors.push(`@settings: "${id}" (${type}) has no matching "--${id}:" declaration in src/tokens/.`);

		const hasDefault =
			/^\s*default:/m.test(b) || (/^\s*default-light:/m.test(b) && /^\s*default-dark:/m.test(b));
		if (!hasDefault)
			errors.push(
				`@settings: "${id}" has no default. Style Settings will render NO control and NO reset (SS-1).`
			);
	}

	for (const b of blocks) {
		const id = (b.match(/^\s*id:\s*(\S+)\s*$/m) || [])[1];
		const type = (b.match(/^\s*type:\s*(\S+)\s*$/m) || [])[1];
		if (type === 'class-toggle' || type === 'class-select') {
			if (!/^\s*default:/m.test(b))
				warnings.push(`@settings: "${id}" (${type}) has no explicit default.`);
		}
	}

	return { settingCount: ids.length, typeCount: types.length };
}

/* ── build ──────────────────────────────────────────────────────────────── */

function build({ write = true } = {}) {
	errors.length = 0;
	warnings.length = 0;

	const files = ordered();
	const parts = [];

	for (const f of files) {
		const rel = relative(SRC, f).split(sep).join('/');
		const body = readFileSync(f, 'utf8').trimEnd();
		// The banner is emitted verbatim, with no separator above it (I-3).
		if (rel === '00-banner.css') {
			parts.push(body);
			continue;
		}
		parts.push(
			`\n\n/* ════════════════════════════════════════════════════════════════\n` +
				`   ${rel}\n` +
				`   ════════════════════════════════════════════════════════════════ */\n\n` +
				body
		);
	}

	const css = parts.join('') + '\n';
	const stats = check(files, css);

	for (const w of warnings) console.warn(`  warn  ${w}`);
	for (const e of errors) console.error(`  ERROR ${e}`);

	if (errors.length) {
		console.error(`\nBuild failed: ${errors.length} error(s).`);
		if (write) process.exitCode = 1;
		return false;
	}

	if (write) {
		writeFileSync(OUT, css, 'utf8');
		const kb = (Buffer.byteLength(css) / 1024).toFixed(1);
		console.log(
			`  ok    theme.css  ${kb} KB  ·  ${files.length} sources  ·  ` +
				`${stats?.settingCount ?? 0} settings entries`
		);
	} else {
		console.log('  ok    validation passed');
	}
	return true;
}

/* ── entry ──────────────────────────────────────────────────────────────── */

const args = process.argv.slice(2);

if (args.includes('--check')) {
	build({ write: false });
} else {
	build();
	if (args.includes('--watch')) {
		console.log('  ..    watching src/');
		let t;
		watch(SRC, { recursive: true }, () => {
			clearTimeout(t);
			t = setTimeout(() => build(), 80);
		});
	}
}
