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
  'th-across-1': () => { const n = all.filter(dark).length; return [n, `${n} of ${all.length} dark, ${all.length - n} light.`, { dark: n }]; },
  'th-across-2': () => {
    const t = all.reduce((a, b) => (ratio(b.fg, b.bg) < ratio(a.fg, a.bg) ? b : a));
    return [`${t.name}, ${r2(ratio(t.fg, t.bg))}`, `${t.name}: foreground ${t.fg} on background ${t.bg}, contrast ${r2(ratio(t.fg, t.bg))}.`];
  },
  'th-across-3': () => [shipped.length, `licences.md names ${shipped.length} themes.`],
  'th-across-4': () => {
    const same = all.filter(t => t.palette.slice(0, 8).every((c, i) => c === t.palette[i + 8]));
    return [same.length, `${same.length} themes: ${same.map(t => t.name).join(', ')}.`, { n: same.length }];
  },
  'th-across-5': () => {
    const t = shipped.map(s => by.get(s.name)).reduce((a, b) => (ratio(b.fg, b.bg) > ratio(a.fg, a.bg) ? b : a));
    return [`${t.name}, ${r2(ratio(t.fg, t.bg))}`, `Of the ${shipped.length} shipped: ${t.name}, foreground ${t.fg} on ${t.bg}, contrast ${r2(ratio(t.fg, t.bg))}.`, { name: [t.name], value: +r2(ratio(t.fg, t.bg)) }];
  },
  'th-gap-1': () => ['the book does not say', 'A theme gives colours only.'],
  'th-gap-2': () => ['the book does not say', 'Neither the theme nor upstream\'s credits give a date.'],
  'th-analysis-1': () => {
    const d = median(all.filter(dark).map(t => ratio(t.fg, t.bg)));
    const l = median(all.filter(t => !dark(t)).map(t => ratio(t.fg, t.bg)));
    return [`${l > d ? 'Yes' : 'No'}: light themes' median contrast is ${r2(l)}, dark themes' ${r2(d)}`, `Medians of foreground on background: light ${r2(l)} (${all.filter(t => !dark(t)).length} themes), dark ${r2(d)} (${all.filter(dark).length}).`, { light: +r2(l), dark: +r2(d) }];
  },
  // Reading (SPEC R2): the questions the front page and the chapters open
  // with, worked out here apart from the importer's reading.
  'th-reading-1': () => {
    const c = all.map(t => ({ name: t.name, v: ratio(t.fg, t.bg) }));
    const good = c.filter(x => x.v >= 4.5).length, very = c.filter(x => x.v >= 7).length;
    const top = Math.max(...c.map(x => x.v)), low = Math.min(...c.map(x => x.v));
    const bestN = c.filter(x => x.v === top).length, worst = c.filter(x => x.v === low).map(x => x.name);
    return [`${good} read well, ${very} very well, ${all.length - good} fall short; ${bestN} reach ${r2(top)}; worst ${worst.join(', ')}, ${r2(low)}`,
      `Contrast of foreground on background, ${all.length} themes: 4.5 or more ${good}, 7 or more ${very}, under 4.5 ${all.length - good}; the greatest ${r2(top)} (${bestN} themes), the least ${r2(low)}.`,
      { good, very, poor: all.length - good, best_n: bestN, best_v: +r2(top), worst, worst_v: +r2(low) }];
  },
  'th-reading-2': () => {
    const faint = i => all.filter(t => ratio(t.palette[i], t.bg) < 3).length;
    const hues = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'].map((h, k) => [h, faint(k + 1)]);
    const n = Math.max(...hues.map(h => h[1])), hue = hues.filter(h => h[1] === n).map(h => h[0]);
    return [`${hue.join(', ')}, in ${n} themes; bright black in ${faint(8)}`, `Palette 1-6 under 3 on the background: ${hues.map(h => `${h[0]} ${h[1]}`).join(', ')}; palette 8 ${faint(8)}.`,
      { hue, n, bright_black: faint(8) }];
  },
  'th-reading-3': () => {
    const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const ok = h => {
      const [r, g, b] = [1, 3, 5].map(i => lin(parseInt(h.substr(i, 2), 16) / 255));
      const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
      return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
    };
    const cols = all.map(t => [t.bg, t.fg, ...t.palette]);
    const labs = cols.map(cs => cs.map(ok));
    const up = all.map((_, i) => i), find = i => (up[i] === i ? i : (up[i] = find(up[i])));
    let pairs = 0;
    const inPair = new Set();
    for (let i = 0; i < all.length; i++) for (let k = i + 1; k < all.length; k++) {
      let d = 0;
      for (let j = 0; j < 18; j++) d += Math.hypot(...labs[i][j].map((x, q) => x - labs[k][j][q]));
      if (d / 18 < 0.01) { pairs++; up[find(i)] = find(k); inPair.add(i); inPair.add(k); }
    }
    const families = new Set([...inPair].map(find)).size;
    const seen = new Map();
    cols.forEach(cs => seen.set(cs.join(' '), (seen.get(cs.join(' ')) || 0) + 1));
    const copies = [...seen.values()].filter(n => n > 1).reduce((a, b) => a + b, 0);
    return [`${pairs} pairs, ${families} families; ${copies} copies`, `Of ${all.length * (all.length - 1) / 2} pairs, ${pairs} under 0.01 on the average of their eighteen OKLab distances; ${inPair.size} themes in ${families} families; ${copies} themes share all eighteen colours with another.`,
      { pairs, families, copies }];
  },
  'th-reading-4': () => {
    const n = new Map();
    for (const t of all) n.set(t.bg, (n.get(t.bg) || 0) + 1);
    const black = n.get('#000000') || 0, white = n.get('#ffffff') || 0, unique = [...n.values()].filter(x => x === 1).length;
    return [`black ${black}, white ${white}; ${unique} backgrounds of one theme`, `${n.size} different backgrounds over ${all.length} themes.`, { black, white, unique }];
  },
  'th-reading-5': () => {
    const L = h => { const [r, g, b] = [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
      return 0.2104542553 * Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) + 0.793617785 * Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) - 0.0040720468 * Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b); };
    const mid = all.filter(t => L(t.bg) >= 0.4 && L(t.bg) < 0.9).length;
    return [mid, `OKLab L of each background, from 0.4 up to 0.9: ${mid}.`, { mid }];
  },
  'th-reading-6': () => {
    const f = all.filter(t => ratio(t.palette[4], t.bg) < 3);
    return [`${f.length}, ${f.filter(dark).length} of them dark`, `Palette 4 under 3 on the background: ${f.length}; dark ${f.filter(dark).length}, light ${f.filter(t => !dark(t)).length}.`, { n: f.length, dark: f.filter(dark).length }];
  },
};

const src = fs.readFileSync(path.join(__dirname, 'faq.md'), 'utf8');
const qs = src.split(/\n(?=### Question: )/).filter(b => b.startsWith('### Question: '));

// Warn-only, every build (the person, 10-19, gap 9): each finding a reason
// code, so a run's warnings can be counted and compared. Codes: page-missing
// (a Look in page the book does not have), answer-for-gap (a Gap question
// given a value), answer-changed (an answer that differs from the last
// release's FAQ.md: news, or a fault, to read before shipping), and
// page-drifted (a number on the front page or a chapter that differs from
// this answer, or that its page does not say: the page is wrong, or this;
// it stops the build, faq.js exiting 2).
const warnings = [];
const warn = (code, id, what) => warnings.push(`warn ${code} ${id}: ${what}`);
const last = new Map();
const got = new Map(); // each question's answer as values, for the pages' check below
if (fs.existsSync(path.join(REPO, 'FAQ.md'))) {
  for (const b of fs.readFileSync(path.join(REPO, 'FAQ.md'), 'utf8').split(/\n(?=### Question: )/).filter(b => b.startsWith('### Question: '))) {
    last.set(/^### Question: (.+)$/m.exec(b)[1].trim(), ((/^- Answer: (.*)$/m.exec(b) || [])[1] || '').trim());
  }
}
const L = ['# Questions and answers', '',
  `${qs.length} questions a careful reader of this book can answer, from the plainest (one theme's colour) to the hardest (whether light themes read better than dark), each with its answer and the page to look in. Read a question, open the page, and find the answer yourself; or put the questions to a reader or an agent with this page hidden, and mark what comes back. Where the book cannot answer, the right answer is to say so. The answers are worked out afresh from upstream's own files at every release, not copied from the pages: where the two disagree, one is wrong.`];
for (const q of qs) {
  const id = /^### Question: (.+)$/m.exec(q)[1].trim();
  const f = k => ((new RegExp(`^- ${k}: ?(.*)$`, 'm').exec(q) || [])[1] || '').trim();
  if (!answers[id]) throw new Error(`no answer worked out for ${id}`);
  const [answer, how, values] = answers[id]();
  got.set(id, values || {});
  for (const p of f('Look in') ? f('Look in').split('; ') : []) if (!fs.existsSync(path.join(REPO, p))) warn('page-missing', id, p);
  if (f('Tier') === 'Gap' && String(answer) !== 'the book does not say') warn('answer-for-gap', id, String(answer));
  if (last.has(id) && last.get(id) !== String(answer)) warn('answer-changed', id, `${last.get(id)} → ${answer}`);
  const look =f('Look in') ? f('Look in').split('; ').map(p => `[${p.replace(/\.md$/, '')}](./${p.split('/').map(encodeURIComponent).join('/')})`).join('; ') : '';
  L.push('', `### Question: ${id}`, '', `- Tier: ${f('Tier')}`, `- Ask: ${f('Ask')}`, `- Answer: ${answer}`, `- Type: ${f('Type')}`, `- Tolerance: ${f('Tolerance')}`.trimEnd(), `- Look in: ${look}`.trimEnd(), '', how);
}
fs.writeFileSync(path.join(REPO, 'FAQ.md'), L.join('\n') + '\n');

// The pages against the source (SPEC R2): each record of reading.md that
// names an FAQ question Holds values its page was filled with (kept by the
// importer in .import/reading.json), each to agree with that question's
// answer here, and to be said in the page's own paragraph for it (the line
// that opens with its question in bold; a finding, the page's).
let held = 0;
const keptFile = path.join(__dirname, 'reading.json');
if (fs.existsSync(keptFile)) {
  const kept = JSON.parse(fs.readFileSync(keptFile, 'utf8')).pages;
  const reading = fs.readFileSync(path.join(__dirname, 'reading.md'), 'utf8');
  for (const b of reading.split(/\n(?=### (?:Question|Finding): )/).slice(1)) {
    const id = /^### \w+: (\S+)/.exec(b)[1];
    const k = key => ((new RegExp(`^- ${key}:[ \\t]*(.*)$`, 'm').exec(b) || [])[1] || '').trim();
    const faq = k('FAQ'), page = k('Page');
    if (!faq) continue;
    if (!got.has(faq)) { warn('page-drifted', id, `FAQ ${faq} is no question in faq.md`); continue; }
    const mine = (kept[page] || {})[id];
    if (!mine || !fs.existsSync(path.join(REPO, page))) { warn('page-drifted', id, `nothing kept for ${page}`); continue; }
    const text = fs.readFileSync(path.join(REPO, page), 'utf8');
    const para = k('Ask') ? text.split('\n').find(l => l.startsWith(`**${k('Ask')}**`)) || '' : text;
    if (!para) warn('page-drifted', id, `${page} does not ask "${k('Ask')}"`);
    for (const pair of k('Holds').split(/,\s*/).filter(Boolean)) {
      const [m, t] = pair.split('=').map(x => x.trim());
      const a = mine[m], theirs = got.get(faq)[t];
      const norm = x => JSON.stringify(Array.isArray(x) ? [...x].sort() : x);
      held++;
      if (norm(a) !== norm(theirs)) { warn('page-drifted', id, `${page}: ${m} is ${JSON.stringify(a)}, but ${faq}'s ${t} is ${JSON.stringify(theirs)}`); continue; }
      for (const w of Array.isArray(a) ? a : [a]) {
        const forms = typeof w === 'number' ? [String(w), w.toLocaleString('en'), w.toFixed(2)] : [String(w)];
        if (!forms.some(f => para.includes(f))) warn('page-drifted', id, `${page} does not say ${m}, ${JSON.stringify(w)}`);
      }
    }
  }
}
console.log(`FAQ.md: ${qs.length} questions, ${warnings.length} warnings; ${held} numbers on the pages checked against the answers`);
for (const w of warnings) console.log(w);
if (warnings.some(w => w.startsWith('warn page-drifted'))) process.exit(2);
