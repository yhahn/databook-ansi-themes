// A reader's way in (SPEC R2, R3): the questions and findings written by
// hand in .import/reading.md, their words filled from the values the
// importer reckons here, and the values kept in .import/reading.json, so a
// rerun whose finding turns warns `finding-turned`. Used by chapters.js
// (the chapters' pages) and readme.js (the front page); not run itself.
//
// A record's words hold `{name}`, `{name:t}` (a theme's name, or several,
// each linked to its page), `{name:c}` (a colour, as code, so its swatch is
// drawn), `{name:%}` (a whole percent) and `{name:,}` (thousands marked) and `{name:s}` (sets of themes, each
// listed and linked, the sets split by ";");
// a value that is a list is written "a, b and c".

const fs = require('node:fs');
const path = require('node:path');

const KEYS = ['Page', 'Ask', 'Answer', 'Says', 'Measure', 'Picture', 'Turns on', 'FAQ', 'FAQ page', 'Holds'];
const HUES = ['Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan'];
const NAMES = ['Black', ...HUES, 'White'];
const SLOT = i => (i < 8 ? NAMES[i] : `Bright ${NAMES[i - 8]}`);

// The words used alike everywhere (reading.md's head).
const WELL = 4.5, VERY = 7, FAINT = 3, ALIKE = 0.01, MID = [0.4, 0.9];

function records(file = path.join(__dirname, 'reading.md')) {
  const out = new Map();
  for (const block of fs.readFileSync(file, 'utf8').split(/\n(?=### (?:Question|Finding): )/).slice(1)) {
    const [, kind, id] = /^### (Question|Finding): (\S+)/.exec(block);
    if (out.has(id)) throw new Error(`reading.md: ${id} twice`);
    const rec = { kind, id };
    for (const m of block.matchAll(/^- ([^:]+):[ \t]*(.*)$/gm)) if (KEYS.includes(m[1])) rec[m[1]] = m[2].trim();
    rec.turns = (rec['Turns on'] || '').split(',').map(s => s.trim()).filter(Boolean);
    out.set(id, rec);
  }
  return out;
}

// --- colour ------------------------------------------------------------------
const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
function luminance(h) { const [r, g, b] = rgb(h).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; }
function contrast(a, b) { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); }
// OKLab (Björn Ottosson, 2020), from sRGB.
function oklab(h) {
  const [r, g, b] = rgb(h).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
const eighteen = t => [t.background, t.foreground, ...t.palette];
// Two themes' distance: the mean, over their eighteen colours, of each
// pair's OKLab distance.
function distance(a, b) {
  let s = 0;
  for (let i = 0; i < 18; i++) s += Math.hypot(a[i][0] - b[i][0], a[i][1] - b[i][1], a[i][2] - b[i][2]);
  return s / 18;
}

const r2 = x => Math.round(x * 100) / 100;
const median = xs => { const s = [...xs].sort((a, b) => a - b), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const byName = (a, b) => a.localeCompare(b, 'en');
// The themes at the extreme of f, ties kept, by name.
function best(ts, f, most) {
  const v = ts.reduce((m, t) => (most ? Math.max(m, f(t)) : Math.min(m, f(t))), most ? -Infinity : Infinity);
  return [ts.filter(t => f(t) === v).map(t => t.name).sort(byName), v];
}

// --- the values: every number the reading's words use, from the themes ----
function measure(themes) {
  const all = [...themes].sort((a, b) => byName(a.name, b.name));
  const n = all.length;
  // Contrast unrounded here, as the FAQ reckons it; written to two places.
  for (const t of all) { t.c = contrast(t.foreground, t.background); t.L = oklab(t.background)[0]; }
  const dark = all.filter(t => t.dark), light = all.filter(t => !t.dark);
  const v = { themes: n, dark: dark.length, light: light.length, dark_pct: 100 * dark.length / n };
  v.most = dark.length > light.length ? 'dark' : 'light';

  // Lightness.
  v.bins = Array.from({ length: 10 }, (_, i) => all.filter(t => Math.min(9, Math.floor(t.L * 10)) === i).length);
  v.low = all.filter(t => t.L < MID[0]).length;
  v.high = all.filter(t => t.L >= MID[1]).length;
  v.mid = n - v.low - v.high;
  v.mid_few = v.mid < n / 10;
  v.middle = all.filter(t => t.L >= MID[0] && t.L < MID[1]).sort((a, b) => a.L - b.L || byName(a.name, b.name));
  v.dark_l = 100 * median(dark.map(t => t.L));
  v.light_l = 100 * median(light.map(t => t.L));
  [v.lightest_dark, v.lightest_dark_l] = best(dark, t => t.L, true); v.lightest_dark_l *= 100;
  [v.darkest_light, v.darkest_light_l] = best(light, t => t.L, false); v.darkest_light_l *= 100;
  const bgs = new Map();
  for (const t of all) bgs.set(t.background, [...(bgs.get(t.background) || []), t.name]);
  v.common = [...bgs.entries()].map(([c, names]) => ({ colour: c, names })).sort((a, b) => b.names.length - a.names.length || (a.colour < b.colour ? -1 : 1));
  v.black = '#000000'; v.white = '#ffffff';
  v.black_bg = (bgs.get('#000000') || []).length;
  v.white_bg = (bgs.get('#ffffff') || []).length;
  const rest = v.common.filter(x => x.colour !== '#000000' && x.colour !== '#ffffff');
  v.next_bg_n = rest[0].names.length;
  v.next_bg = rest.filter(x => x.names.length === v.next_bg_n).map(x => x.colour);
  v.own_bg = v.common.filter(x => x.names.length === 1).length;

  // Contrast.
  v.good = all.filter(t => t.c >= WELL).length;
  v.very = all.filter(t => t.c >= VERY).length;
  v.poor = n - v.good;
  v.poor_some = v.poor > 0;
  v.poor_dark = dark.filter(t => t.c < WELL).length;
  v.median_c = r2(median(all.map(t => t.c)));
  [v.best, v.best_v] = best(all, t => t.c, true);
  v.best_n = v.best.length;
  [v.worst, v.worst_v] = best(all, t => t.c, false);
  v.light_med = r2(median(light.map(t => t.c)));
  v.dark_med = r2(median(dark.map(t => t.c)));
  v.lead_word = v.light_med > v.dark_med ? 'Light' : v.light_med < v.dark_med ? 'Dark' : 'Neither';
  v.lead_yes = v.light_med > v.dark_med ? 'Yes' : 'No';
  [v.lead_med, v.lag_med] = v.light_med >= v.dark_med ? [v.light_med, v.dark_med] : [v.dark_med, v.light_med];
  const edges = [1, 3, WELL, VERY, 10, 15, 21.01];
  v.cbins = edges.slice(0, -1).map((e, i) => all.filter(t => t.c >= e && t.c < edges[i + 1]).length);
  v.ranked = [...all].sort((a, b) => b.c - a.c || byName(a.name, b.name));
  const defs = all.filter(t => t.default);
  v.def_n = defs.length;
  v.defaults = [...defs].sort((a, b) => b.c - a.c || byName(a.name, b.name));
  [v.def_best, v.def_best_v] = best(defs, t => t.c, true);
  [v.def_worst, v.def_worst_v] = best(defs, t => t.c, false);
  v.def_poor = defs.filter(t => t.c < WELL).length;

  // The palette: a colour faint where it reads under 3 on its background.
  const faint = (t, i) => contrast(t.palette[i], t.background) < FAINT;
  v.faint = Array.from({ length: 16 }, (_, i) => all.filter(t => faint(t, i)).length);
  v.bb_faint = v.faint[8];
  v.black_faint = v.faint[0];
  const hues = HUES.map((h, k) => ({ h, n: v.faint[k + 1] }));
  const most = Math.max(...hues.map(x => x.n)), least = Math.min(...hues.map(x => x.n));
  v.weak_hue = hues.filter(x => x.n === most).map(x => x.h.toLowerCase());
  v.weak_hue_n = most;
  v.strong_hue = hues.filter(x => x.n === least).map(x => x.h.toLowerCase());
  v.strong_hue_n = least;
  v.all_clear = all.filter(t => ![1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14].some(i => faint(t, i))).length;
  const blue = t => r2(contrast(t.palette[4], t.background));
  const bf = all.filter(t => faint(t, 4));
  v.blue_faint = bf.length;
  v.blue_faint_dark = bf.filter(t => t.dark).length;
  [v.blue_worst, v.blue_worst_v] = best(all, blue, false);
  v.blues = [...all].sort((a, b) => blue(a) - blue(b) || byName(a.name, b.name)).slice(0, 10).map(t => ({ t, v: blue(t) }));
  v.brights_all = all.filter(t => t.palette.slice(0, 8).every((c, i) => c !== t.palette[i + 8])).length;
  v.brights_none = all.filter(t => t.palette.slice(0, 8).every((c, i) => c === t.palette[i + 8])).length;
  v.brights_most = v.brights_all > n / 2;
  v.few_colours = all.filter(t => new Set(t.palette).size < 16).length;

  // Alike.
  const labs = all.map(t => eighteen(t).map(oklab));
  const key = all.map(t => eighteen(t).join(' '));
  const parent = all.map((_, i) => i);
  const root = i => (parent[i] === i ? i : (parent[i] = root(parent[i])));
  const pairs = [];
  for (let i = 0; i < n; i++) for (let k = i + 1; k < n; k++) {
    const d = key[i] === key[k] ? 0 : distance(labs[i], labs[k]);
    if (d < ALIKE) { pairs.push({ a: all[i], b: all[k], d }); parent[root(i)] = root(k); }
  }
  pairs.sort((x, y) => x.d - y.d || byName(x.a.name, y.a.name) || byName(x.b.name, y.b.name));
  v.pairs = pairs.length;
  const fam = new Map();
  all.forEach((t, i) => { if (pairs.some(p => p.a === t || p.b === t)) fam.set(root(i), [...(fam.get(root(i)) || []), t]); });
  v.family_list = [...fam.values()].sort((a, b) => b.length - a.length || byName(a[0].name, b[0].name));
  v.families = v.family_list.length;
  v.family_themes = v.family_list.reduce((s, f) => s + f.length, 0);
  v.largest_n = v.family_list[0].length;
  v.largest = v.family_list.filter(f => f.length === v.largest_n).flatMap(f => f.map(t => t.name));
  const copies = new Map();
  all.forEach((t, i) => copies.set(key[i], [...(copies.get(key[i]) || []), t]));
  v.copy_sets = [...copies.values()].filter(s => s.length > 1).sort((a, b) => byName(a[0].name, b[0].name));
  v.copy_groups = v.copy_sets.length;
  v.copy_themes = v.copy_sets.reduce((s, x) => s + x.length, 0);
  v.copy_list = v.copy_sets.map(s => s.map(t => t.name));
  v.near = pairs.filter(p => p.d > 0);
  v.near_a = [v.near[0].a.name]; v.near_b = [v.near[0].b.name]; v.near_d = v.near[0].d.toFixed(4);
  return v;
}

// --- words ----------------------------------------------------------------
const href = (name, up) => `${up}${/^[A-Za-z]/.test(name) ? name[0].toUpperCase() : '0-9'}/${name.replace(/\//g, '-')}.md`.split('/').map(s => (s === '..' || s === '.' ? s : encodeURIComponent(s))).join('/');
const themeLink = (name, up = './') => `[${name.replace(/\|/g, '\\|')}](${href(name, up)})`;
function listed(xs) { return xs.length === 1 ? xs[0] : xs.length > 6 ? `${xs.slice(0, 3).join(', ')} and ${xs.length - 3} more` : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`; }
function format(v, spec, up) {
  if (spec === 's') return v.map(set => format(set, 't', up)).join('; ');
  if (Array.isArray(v)) return listed(v.map(x => format(x, spec, up)));
  if (spec === 't') return themeLink(v, up);
  if (spec === 'c') return `\`${v}\``;
  if (spec === '%') return `${Math.round(v)}%`;
  if (spec === ',') return Number(v).toLocaleString('en');
  return typeof v === 'number' && !Number.isInteger(v) ? v.toFixed(2) : String(v);
}
// A record's words, each {name} filled; up is the way from its page to the
// root ('./' for README.md, '../' for a chapter).
function fill(template, values, up = './') {
  return template.replace(/\{(\w+)(?::([^}]*))?\}/g, (_, k, spec) => {
    if (!(k in values)) throw new Error(`reading.md: no value ${k} for "${template.slice(0, 60)}…"`);
    return format(values[k], spec, up);
  });
}
const say = (rec, values, up) => { const s = fill(rec.Answer || rec.Says, values, up); return s[0].toUpperCase() + s.slice(1); };

// The values a record uses (its words', its turns', its Holds'), as kept.
function kept(rec, values) {
  const used = new Set([...(rec.Answer || rec.Says || '').matchAll(/\{(\w+)/g)].map(m => m[1]));
  for (const k of rec.turns) used.add(k);
  for (const p of (rec.Holds || '').split(',')) if (p.includes('=')) used.add(p.split('=')[0].trim());
  const out = {};
  for (const k of [...used].sort()) {
    const x = values[k];
    if (x === undefined) throw new Error(`reading.md ${rec.id}: no value ${k}`);
    out[k] = typeof x === 'number' ? r2(x) : x;
  }
  return out;
}

// Each finding or question turned since the last release: pages is {page:
// {id: kept values}}; the last release's are in reading.json. Writes the
// new ones in its place; returns the warnings, each a line.
function turned(pages, file = path.join(__dirname, 'reading.json')) {
  let before = {};
  try { before = JSON.parse(fs.readFileSync(file, 'utf8')).pages || {}; } catch { /* the first release */ }
  const recs = records(), said = [];
  for (const [page, ids] of Object.entries(pages).sort()) for (const [id, now] of Object.entries(ids)) {
    const was = (before[page] || {})[id];
    if (!was) continue;
    for (const k of recs.get(id).turns) {
      if (k in was && JSON.stringify(was[k]) !== JSON.stringify(now[k])) said.push(`warn finding-turned ${id}: ${page}, ${k} was ${JSON.stringify(was[k])}, now ${JSON.stringify(now[k])}`);
    }
  }
  fs.writeFileSync(file, JSON.stringify({ pages }, null, 1) + '\n');
  return said;
}

module.exports = { records, measure, fill, say, kept, turned, themeLink, contrast, oklab, distance, SLOT, HUES, WELL, VERY, FAINT, ALIKE, MID };
