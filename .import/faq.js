// FAQ.md (SPEC B9): the questions in .import/faq.md, each answered afresh
// from upstream's ghostty/ files and .import/licences.md, never from the
// book. Its own reading of the files, not the importer's, so the two can
// disagree and show a fault. Run from the repo, after the importer:
//
//   node .import/faq.js

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const REPO = path.resolve(__dirname, '..');
const SRC = process.env.THEMES_SRC || path.join(os.homedir(), '.cache/proper/themes/upstream');

function read(name) {
  const text = fs.readFileSync(path.join(SRC, 'ghostty', name), 'utf8').toLowerCase();
  const get = k => (new RegExp(`^${k}\\s*=\\s*(#[0-9a-f]{6})\\s*$`, 'm').exec(text) || [])[1];
  const palette = [];
  for (const m of text.matchAll(/^palette\s*=\s*(\d+)=(#[0-9a-f]{6})\s*$/gm)) palette[+m[1]] = m[2];
  return { name, bg: get('background'), fg: get('foreground'), palette };
}
const lum = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255)
  .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const dark = t => ratio(t.bg, '#ffffff') > ratio(t.bg, '#000000');
const median = xs => { const s = [...xs].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };

const all = fs.readdirSync(path.join(SRC, 'ghostty')).sort().map(read);
const by = new Map(all.map(t => [t.name, t]));
const lic = fs.readFileSync(path.join(__dirname, 'licences.md'), 'utf8');
const shipped = [...lic.matchAll(/^\| ([^|]+) \| [^|]+ \| ([^|]+) \| [^|]+ \|$/gm)]
  .filter(m => m[1].trim() !== 'Themes' && !/^-+$/.test(m[1].trim()))
  .flatMap(m => m[1].split(',').map(s => ({ name: s.trim(), licence: m[2].trim() })));
const r2 = x => x.toFixed(2);

const answers = {
  'th-lookup-1': () => [by.get('Nord').bg, `ghostty/Nord: background = ${by.get('Nord').bg}.`],
  'th-lookup-2': () => [by.get('Dracula').palette[4], `ghostty/Dracula: palette = 4=${by.get('Dracula').palette[4]}.`],
  'th-lookup-3': () => { const l = shipped.find(s => s.name === 'TokyoNight'); return [l.licence, `licences.md: TokyoNight, folke's Tokyo Night, ${l.licence}.`]; },
  'th-page-1': () => {
    const s = all.filter(t => /^s/i.test(t.name));
    const light = s.filter(t => !dark(t)).length;
    return [`${s.length} themes, ${light} of them light`, `ghostty/ files beginning S or s: ${s.length}; light ${light}, dark ${s.length - light}.`];
  },
  'th-across-1': () => { const n = all.filter(dark).length; return [n, `${n} of ${all.length} dark, ${all.length - n} light.`]; },
  'th-across-2': () => {
    const t = all.reduce((a, b) => (ratio(b.fg, b.bg) < ratio(a.fg, a.bg) ? b : a));
    return [`${t.name}, ${r2(ratio(t.fg, t.bg))}`, `${t.name}: foreground ${t.fg} on background ${t.bg}, contrast ${r2(ratio(t.fg, t.bg))}.`];
  },
  'th-across-3': () => [shipped.length, `licences.md names ${shipped.length} themes.`],
  'th-across-4': () => {
    const same = all.filter(t => t.palette.slice(0, 8).every((c, i) => c === t.palette[i + 8]));
    return [same.length, `${same.length} themes: ${same.map(t => t.name).join(', ')}.`];
  },
  'th-across-5': () => {
    const t = shipped.map(s => by.get(s.name)).reduce((a, b) => (ratio(b.fg, b.bg) > ratio(a.fg, a.bg) ? b : a));
    return [`${t.name}, ${r2(ratio(t.fg, t.bg))}`, `Of the ${shipped.length} shipped: ${t.name}, foreground ${t.fg} on ${t.bg}, contrast ${r2(ratio(t.fg, t.bg))}.`];
  },
  'th-gap-1': () => ['the book does not say', 'A theme gives colours only.'],
  'th-gap-2': () => ['the book does not say', 'Neither the theme nor upstream\'s credits give a date.'],
  'th-analysis-1': () => {
    const d = median(all.filter(dark).map(t => ratio(t.fg, t.bg)));
    const l = median(all.filter(t => !dark(t)).map(t => ratio(t.fg, t.bg)));
    return [`${l > d ? 'Yes' : 'No'}: light themes' median contrast is ${r2(l)}, dark themes' ${r2(d)}`, `Medians of foreground on background: light ${r2(l)} (${all.filter(t => !dark(t)).length} themes), dark ${r2(d)} (${all.filter(dark).length}).`];
  },
};

const src = fs.readFileSync(path.join(__dirname, 'faq.md'), 'utf8');
const qs = src.split(/\n(?=### Question: )/).filter(b => b.startsWith('### Question: '));
const L = ['# Questions and answers', '',
  `${qs.length} questions a careful reader of this book can answer, from the plainest (one theme's colour) to the hardest (whether light themes read better than dark), each with its answer and the page to look in. Read a question, open the page, and find the answer yourself; or put the questions to a reader or an agent with this page hidden, and mark what comes back. Where the book cannot answer, the right answer is to say so. The answers are worked out afresh from upstream's own files at every release, not copied from the pages: where the two disagree, one is wrong.`];
for (const q of qs) {
  const id = /^### Question: (.+)$/m.exec(q)[1].trim();
  const f = k => ((new RegExp(`^- ${k}: ?(.*)$`, 'm').exec(q) || [])[1] || '').trim();
  if (!answers[id]) throw new Error(`no answer worked out for ${id}`);
  const [answer, how] = answers[id]();
  const look = f('Look in') ? f('Look in').split('; ').map(p => `[${p.replace(/\.md$/, '')}](./${p.split('/').map(encodeURIComponent).join('/')})`).join('; ') : '';
  L.push('', `### Question: ${id}`, '', `- Tier: ${f('Tier')}`, `- Ask: ${f('Ask')}`, `- Answer: ${answer}`, `- Type: ${f('Type')}`, `- Tolerance: ${f('Tolerance')}`.trimEnd(), `- Look in: ${look}`.trimEnd(), '', how);
}
fs.writeFileSync(path.join(REPO, 'FAQ.md'), L.join('\n') + '\n');
console.log(`FAQ.md: ${qs.length} questions`);
