// The importer of databook-ansi-themes: iTerm2-Color-Schemes' terminal themes,
// as Ghostty writes them, a page a theme (SPEC B1, B7), a folder an
// initial, each folder's page beside it; themes.json for cards.md, from the
// same run; the README and LICENSE. Run from the repo:
//
//   node .import/import.js
//
// It reads the upstream clone (THEMES_SRC, or ~/.cache/proper/themes/upstream:
// `git clone --depth 1 --filter=blob:none --sparse
// https://github.com/mbadolato/iTerm2-Color-Schemes.git` then
// `git sparse-checkout set ghostty`), the hand-checked licences
// (.import/licences.md) and our own themes (.import/ours/*.md), and nothing
// else. One record is one theme, keyed by upstream's name (K5).

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const REPO = path.resolve(__dirname, '..');
const SRC = process.env.THEMES_SRC || path.join(os.homedir(), '.cache/proper/themes/upstream');
const UPSTREAM = 'https://github.com/mbadolato/iTerm2-Color-Schemes';

const NAMES = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'];
const SLOT = i => (i < 8 ? NAMES[i] : `Bright ${NAMES[i - 8]}`);
const FIELDS = {
  background: 'Background', foreground: 'Foreground', 'cursor-color': 'Cursor',
  'cursor-text': 'Cursor text', 'selection-background': 'Selection',
  'selection-foreground': 'Selection text',
};
const HEX = /^#[0-9a-f]{6}$/;

// V1: a theme file as Ghostty writes it, every line known, sixteen colours
// 0-15 once each, every colour #rrggbb in lower case. Anything else stops.
function parseGhostty(text, name) {
  const t = { name, palette: new Array(16).fill(null) };
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const m = /^([a-z-]+)\s*=\s*(.+)$/.exec(line);
    if (!m) throw new Error(`${name}: a line not key = value: ${line}`);
    const [, key, value] = m;
    if (key === 'palette') {
      const p = /^(\d+)=(#[0-9a-f]{6})$/.exec(value.toLowerCase());
      if (!p || +p[1] > 15) throw new Error(`${name}: a palette line not N=#rrggbb, N 0-15: ${value}`);
      if (t.palette[+p[1]]) throw new Error(`${name}: palette ${p[1]} twice`);
      t.palette[+p[1]] = p[2];
    } else if (FIELDS[key]) {
      // One theme (hazyland) writes a colour in upper case: case means
      // nothing in hex, so it is read either way and written lower.
      if (!HEX.test(value.toLowerCase())) throw new Error(`${name}: ${key} not #rrggbb: ${value}`);
      t[key] = value.toLowerCase();
    } else throw new Error(`${name}: an unknown key ${key}`);
  }
  const missing = [...Object.keys(FIELDS).filter(k => !t[k]), ...t.palette.flatMap((c, i) => (c ? [] : [`palette ${i}`]))];
  if (missing.length) throw new Error(`${name}: missing ${missing.join(', ')}`);
  return t;
}

// Our own themes: a page in the book's own shape, in .import/ours/.
function parseOurs(text, file) {
  const name = (/^# Theme: (.+)$/m.exec(text) || [])[1];
  if (!name) throw new Error(`${file}: no "# Theme: <name>"`);
  const t = { name: name.trim(), palette: new Array(16).fill(null) };
  for (const [key, label] of Object.entries(FIELDS)) {
    const m = new RegExp(`^- ${label}: \`?(#[0-9a-fA-F]{6})\`?$`, 'm').exec(text);
    if (!m) throw new Error(`${file}: no ${label}`);
    t[key] = m[1].toLowerCase();
  }
  for (const m of text.matchAll(/^\| (\d+) \| [^|]+ \| `?(#[0-9a-fA-F]{6})`? \|$/gm)) {
    if (+m[1] > 15 || t.palette[+m[1]]) throw new Error(`${file}: palette ${m[1]} out of range or twice`);
    t.palette[+m[1]] = m[2].toLowerCase();
  }
  if (t.palette.some(c => !c)) throw new Error(`${file}: not all sixteen colours`);
  return t;
}

// WCAG's relative luminance and contrast ratio.
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
// Dark: white text would read better on its background than black.
const isDark = bg => contrast(bg, '#ffffff') > contrast(bg, '#000000');

// The hand-checked licences: theme name -> { licence, at }.
function readLicences(text) {
  const out = new Map();
  for (const m of text.matchAll(/^\| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)) {
    if (m[1].trim() === 'Themes' || /^-+$/.test(m[1].trim())) continue;
    for (const n of m[1].split(',').map(s => s.trim())) {
      if (out.has(n)) throw new Error(`licences.md: ${n} twice`);
      out.set(n, { licence: m[3].trim(), at: m[4].trim().split(' ')[0] });
    }
  }
  return out;
}

// The featured list (.import/featured.md): the theme names cards.md ships.
function readFeatured(text) {
  const out = [];
  for (const m of text.matchAll(/^\| ([^|]+) \| ([^|]+) \|$/gm)) {
    const n = m[1].trim();
    if (n === 'Theme' || /^-+$/.test(n)) continue;
    if (out.includes(n)) throw new Error(`featured.md: ${n} twice`);
    out.push(n);
  }
  return out;
}

// Featured implies default: a name that is no theme, or whose own project
// states no licence (licences.md), stops the build, naming it.
function checkFeatured(featured, themes, licences) {
  for (const n of featured) {
    if (!themes.has(n)) throw new Error(`featured.md names ${n}, which no theme is`);
    if (!licences.has(n)) throw new Error(`featured.md names ${n}, which is not default (licences.md does not name it)`);
  }
}

// CREDITS.md, upstream's words for a theme: the one paragraph that names it
// within its first 100 characters, the name whole (not "Nord" in
// "Nord-light"). None, or several, and the theme has no credit.
function creditFor(name, paragraphs) {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(^|[^\\w-])${esc}($|[^\\w-])`);
  const hits = paragraphs.filter(p => { const m = re.exec(p); return m && m.index < 100; });
  return hits.length === 1 ? hits[0].replace(/\s+/g, ' ').trim() : '';
}

const safe = name => name.replace(/\//g, '-');
const folderOf = name => (/^[A-Za-z]/.test(name) ? name[0].toUpperCase() : '0-9');
const link = (text, rel) => `[${text}](${rel.split('/').map(encodeURIComponent).join('/')})`;
const cell = v => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

function themePage(t) {
  const L = [`# Theme: ${t.name}`, ''];
  const keys = [
    ['Dark', t.dark ? 'yes' : 'no'],
    ...Object.entries(FIELDS).map(([k, label]) => [label, `\`${t[k]}\``]),
    ['Contrast', t.contrast],
    ['Same brights', t.sameBrights],
    ['Licence', t.licence],
    ['Licence from', t.licenceAt],
    ['Default', t.default ? 'yes' : 'no'],
    ['Featured', t.featured ? 'yes' : 'no'],
    ['Credit', t.credit],
    ['Made from', t.madeFrom],
  ];
  for (const [k, v] of keys) L.push(`- ${k}: ${v}`.trimEnd());
  L.push('', `The ${t.dark ? 'dark' : 'light'} terminal theme ${t.name}: its background, text, cursor and selection, and the sixteen colours a terminal names 0 to 15. Contrast is its text's against its background (WCAG; 4.5 reads well, 7 very well).`, '', '## Palette', '',
    '| Index | Name | Colour |', '| --- | --- | --- |');
  t.palette.forEach((c, i) => L.push(`| ${i} | ${SLOT(i)} | \`${c}\` |`));
  return L.join('\n') + '\n';
}

function folderPage(folder, themes) {
  const dark = themes.filter(t => t.dark).length;
  const L = [`# Initial: ${folder}`, '', `- Themes: ${themes.length}`, `- Dark: ${dark}`, `- Light: ${themes.length - dark}`, `- Default: ${themes.filter(t => t.default).length}`, `- Featured: ${themes.filter(t => t.featured).length}`, '',
    `The themes whose names begin with ${folder === '0-9' ? 'a figure' : folder}, a page each: the index, by name. The chapters ask across every theme: ${require('./chapters').CHAPTERS.map(c => `[${c.name}](./chapters/${encodeURIComponent(c.name)}.md)`).join(', ')}.`, '', '## Themes', '',
    '| Theme | Dark | Background | Foreground | Contrast | Licence | Default | Featured |', '| --- | --- | --- | --- | --- | --- | --- | --- |'];
  for (const t of themes) L.push(`| ${link(cell(t.name), `./${folder}/${safe(t.name)}.md`)} | ${t.dark ? 'yes' : 'no'} | \`${t.background}\` | \`${t.foreground}\` | ${t.contrast} | ${cell(t.licence)} | ${t.default ? 'yes' : 'no'} | ${t.featured ? 'yes' : 'no'} |`);
  return L.join('\n') + '\n';
}

// The source record (the person, 10-19, gap 8a): the file the book was made
// from, the day it was read, how long it stays fresh, and what was true of
// it then. Current is upstream's folder at the commit; Sha its git tree,
// which changes when any theme file does. As of is the day the clone was
// last fetched (its FETCH_HEAD, or HEAD for a fresh clone), so a source
// that has not moved upstream still reads as fresh once fetched again.
function sourcePage(c) {
  const git = path.join(SRC, '.git');
  const fetched = ['FETCH_HEAD', 'HEAD'].map(f => path.join(git, f)).filter(f => fs.existsSync(f))
    .map(f => fs.statSync(f).mtime).sort((a, b) => b - a)[0].toISOString().slice(0, 10);
  const tree = execFileSync('git', ['-C', SRC, 'rev-parse', 'HEAD:ghostty'], { encoding: 'utf8' }).trim();
  return [`# Source: iTerm2-Color-Schemes`, '',
    `- Current: ghostty/ at ${c.commit.slice(0, 12)}`,
    `- As of: ${fetched}`,
    `- Fresh for: 90 days`,
    `- Newest like: ${UPSTREAM}, its default branch`,
    `- Sha: ${tree}`,
    `- Upstream date: ${c.date}`,
    `- Themes: ${c.upstream}`,
    `- Featured: ${c.featured}`, '',
    `Where this book comes from: upstream's \`ghostty/\` folder, read whole at the commit above. As of is the day it was last fetched; past its window (Fresh for), fetch upstream again and rerun the importer. Sha is git's hash of the folder: when it differs from upstream's, the book is behind.`, ''].join('\n');
}

function build() {
  const ghostty = path.join(SRC, 'ghostty');
  const commit = execFileSync('git', ['-C', SRC, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const when = execFileSync('git', ['-C', SRC, 'log', '-1', '--format=%cs'], { encoding: 'utf8' }).trim();
  const files = fs.readdirSync(ghostty).sort();
  // V1: the count within reason; a big swing is a release to read first.
  if (files.length < 700 || files.length > 1200) throw new Error(`ghostty/ holds ${files.length} themes, outside 700-1200`);
  const lower = new Map();
  for (const f of files) {
    const k = f.toLowerCase();
    if (lower.has(k)) throw new Error(`two themes alike but for case: ${lower.get(k)}, ${f}`);
    lower.set(k, f);
  }
  const credits = fs.readFileSync(path.join(SRC, 'CREDITS.md'), 'utf8').split(/\n\s*\n/).filter(p => !p.startsWith('#'));
  const licences = readLicences(fs.readFileSync(path.join(__dirname, 'licences.md'), 'utf8'));

  const featured = readFeatured(fs.readFileSync(path.join(__dirname, 'featured.md'), 'utf8'));

  const themes = new Map();
  for (const f of files) {
    const t = parseGhostty(fs.readFileSync(path.join(ghostty, f), 'utf8'), f);
    t.madeFrom = `[iTerm2-Color-Schemes, ghostty/${cell(f)}](${UPSTREAM}/blob/${commit}/ghostty/${encodeURIComponent(f)})`;
    // Upstream's relative links resolved against upstream at the commit
    // read, as a reader of its CREDITS.md on GitHub would follow them.
    t.credit = creditFor(f, credits).replace(/\]\((?![a-z]+:)([^)]*)\)/g,
      (_, href) => `](${UPSTREAM}/blob/${commit}/${href.replace(/^\.\//, '')})`);
    themes.set(f, t);
  }
  const oursDir = path.join(__dirname, 'ours');
  const ours = fs.readdirSync(oursDir).filter(f => f.endsWith('.md') && f !== 'README.md').sort();
  let replaced = 0;
  for (const f of ours) {
    const t = parseOurs(fs.readFileSync(path.join(oursDir, f), 'utf8'), f);
    if (themes.has(t.name)) replaced++;
    t.madeFrom = `ours, .import/ours/${f}${themes.has(t.name) ? ', in place of upstream\'s' : ''}`;
    t.credit = (/^- Credit: (.*)$/m.exec(fs.readFileSync(path.join(oursDir, f), 'utf8')) || [])[1] || '';
    themes.set(t.name, t);
  }
  for (const n of licences.keys()) if (!themes.has(n)) throw new Error(`licences.md names ${n}, which no theme is`);
  checkFeatured(featured, themes, licences);
  for (const t of themes.values()) {
    const l = licences.get(t.name);
    t.featured = featured.includes(t.name);
    t.licence = l ? l.licence : 'unstated';
    t.licenceAt = l ? l.at : '';
    t.default = !!l;
    t.dark = isDark(t.background);
    t.contrast = contrast(t.foreground, t.background).toFixed(2);
    t.sameBrights = t.palette.slice(0, 8).filter((c, i) => c === t.palette[i + 8]).length;
  }

  // Write: clear what the importer wrote last, then every page again.
  for (const e of fs.readdirSync(REPO)) {
    if (/^([A-Z]|0-9)(\.md)?$/.test(e)) fs.rmSync(path.join(REPO, e), { recursive: true });
  }
  const byFolder = new Map();
  for (const t of [...themes.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const folder = folderOf(t.name);
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder).push(t);
    fs.mkdirSync(path.join(REPO, folder), { recursive: true });
    fs.writeFileSync(path.join(REPO, folder, `${safe(t.name)}.md`), themePage(t));
  }
  const folders = [...byFolder.keys()].sort((a, b) => (a === '0-9' ? -1 : b === '0-9' ? 1 : a.localeCompare(b)));
  for (const f of folders) fs.writeFileSync(path.join(REPO, `${f}.md`), folderPage(f, byFolder.get(f)));

  const json = { source: { repo: UPSTREAM, commit, date: when, licence: 'MIT (the collection); each theme its author\'s' }, themes: {} };
  for (const t of [...themes.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    json.themes[t.name] = {
      dark: t.dark, background: t.background, foreground: t.foreground, cursor: t['cursor-color'],
      cursorText: t['cursor-text'], selection: t['selection-background'], selectionText: t['selection-foreground'],
      palette: t.palette, licence: t.licence, default: t.default, featured: t.featured,
    };
  }
  // V4, D5: against the last edition. A name gone while a new name holds
  // the very same colours is a rename: kept in `aliases` (old -> new, every
  // old name carried forward and pointed at the latest), so a config naming
  // the old one still resolves. A name gone otherwise is said as removed.
  const last = (() => { try { return JSON.parse(fs.readFileSync(path.join(REPO, 'themes.json'), 'utf8')); } catch { return null; } })();
  const colours = x => JSON.stringify([x.background, x.foreground, x.cursor, x.cursorText, x.selection, x.selectionText, x.palette]);
  json.aliases = {};
  json.removed = {};
  const changes = [];
  if (last) {
    const fresh = Object.keys(json.themes).filter(n => !last.themes[n]);
    const byColours = new Map(fresh.map(n => [colours(json.themes[n]), n]));
    for (const n of Object.keys(last.themes)) {
      if (json.themes[n]) continue;
      const to = byColours.get(colours(last.themes[n]));
      if (to) { json.aliases[n] = to; changes.push({ what: `Renamed: ${n}`, was: n, now: to }); }
      else { json.removed[n] = json.source.commit; changes.push({ what: `Removed: ${n}`, was: n, now: '' }); }
    }
    for (const [o, n] of Object.entries(last.aliases || {})) {
      let to = n; const seen = new Set();
      while (json.aliases[to] && !seen.has(to)) { seen.add(to); to = json.aliases[to]; }
      if (json.themes[to]) json.aliases[o] = to; else json.removed[o] = (last.removed || {})[o] || json.source.commit;
    }
    Object.assign(json.removed, Object.fromEntries(Object.entries(last.removed || {}).filter(([o]) => !json.themes[o] && !json.aliases[o])));
  }
  fs.writeFileSync(path.join(REPO, 'themes.json'), JSON.stringify(json, null, 1) + '\n');
  if (changes.length) {
    const was = last.source.commit.slice(0, 12), now = commit.slice(0, 12);
    const page = path.join(REPO, 'Changes.md');
    const old = fs.existsSync(page) ? fs.readFileSync(page, 'utf8').replace(/^# Changes\n\n[^\n]*\n/, '') : '';
    const recs = changes.map(c => `\n### Change: ${c.what}, ${when}\n\n- What: ${c.now ? 'renamed upstream' : 'no longer upstream'}\n- Year: ${when.slice(0, 4)}\n- Boundary: upstream ${was} to ${now}\n- Was: ${c.was}\n- Now: ${c.now}\n- Crosswalk: ${c.now ? 'themes.json aliases' : 'themes.json removed'}\n`).join('');
    fs.writeFileSync(page, `# Changes\n\nWhat changed between editions of upstream's themes (SPEC D5): a theme renamed (the same colours under a new name; the old name kept in themes.json's aliases) or no longer listed.\n${recs}${old}`);
  }
  const renamed = Object.keys(json.aliases).length, removed = Object.keys(json.removed).length;

  const all = [...themes.values()];
  const counts = {
    themes: all.length, upstream: files.length, ours: ours.length, replaced, folders: folders.length,
    dark: all.filter(t => t.dark).length, light: all.filter(t => !t.dark).length,
    default: all.filter(t => t.default).length, featured: all.filter(t => t.featured).length, credited: all.filter(t => t.credit).length,
    palette_rows: all.length * 16, renamed, removed, commit, date: when,
  };
  fs.writeFileSync(path.join(__dirname, 'counts.json'), JSON.stringify(counts, null, 1) + '\n');
  fs.writeFileSync(path.join(REPO, 'Source.md'), sourcePage(counts));
  // Two parts: the themes are upstream's (its MIT notice, kept as it asks);
  // our own work, the importer and the pages' words, is CC0 (the person,
  // 10-16).
  fs.writeFileSync(path.join(REPO, 'LICENSE'), [
    'This book has two parts, licensed differently.', '',
    '1. The themes (their names and colours, in the pages and themes.json) are',
    '   from iTerm2-Color-Schemes, under its licence, kept here whole:', '',
    fs.readFileSync(path.join(SRC, 'LICENSE'), 'utf8').trim(), '',
    '2. Our own work (the importer in .import/, and the pages\' words beyond the',
    '   themes themselves) is given to the public domain under CC0 1.0:', '',
    fs.readFileSync(path.join(__dirname, 'CC0.txt'), 'utf8').trim(), ''].join('\n'));
  // The spine (R1): the chapters, and the front page's reading, every number
  // reckoned from the themes now; a finding turned since the last release
  // warns (R3).
  const reading = require('./chapters').write(all);
  counts.chapters = reading.chapters.length;
  fs.writeFileSync(path.join(__dirname, 'counts.json'), JSON.stringify(counts, null, 1) + '\n');
  for (const w of require('./reading').turned(reading.pages)) console.log(w);
  require('./readme').write(counts, folders, reading);
  return counts;
}

if (require.main === module) {
  console.log(JSON.stringify(build()));
  // The FAQ worked out afresh at every build, warn-only (gap 9): its own
  // process, so it shares nothing of this importer.
  const faq = require('node:child_process').spawnSync(process.execPath, [path.join(__dirname, 'faq.js')], { cwd: REPO, stdio: 'inherit' });
  // A page whose numbers differ from the FAQ's, worked out apart from the
  // source, stops the build (R2): faq.js exits 2.
  if (faq.status === 2) { console.log('stop: a page has drifted from the source (page-drifted, above)'); process.exit(1); }
  if (faq.status) console.log(`warn faq-failed: faq.js exited ${faq.status}`);
}
module.exports = { readFeatured, checkFeatured, parseGhostty, parseOurs, themePage, folderPage, contrast, isDark, creditFor, readLicences, SLOT };
