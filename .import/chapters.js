// The spine (SPEC R1, DECISIONS "The spine"): a chapter a question, in
// chapters/, each opening with the questions .import/reading.md gives it,
// answered in words filled from the data, then its themes set side by side
// (R4), their colours drawn (R5): a colour written as code is drawn with
// its swatch. And the front page's part of the reading, for readme.js.
// Every number is reckoned here, at the build; nothing is written by hand.

const fs = require('node:fs');
const path = require('node:path');
const R = require('./reading');

const REPO = path.resolve(__dirname, '..');
const DIR = 'chapters';
const CHAPTERS = [
  { name: 'Dark or light', ask: 'How many themes are dark, and how dark?' },
  { name: 'Contrast', ask: 'Which themes read best?' },
  { name: 'Palettes', ask: 'Which of a theme\'s sixteen colours can be seen?' },
  { name: 'Alike', ask: 'Which themes are alike?' },
];
const pageOf = ch => `${DIR}/${ch}.md`;
const linkTo = (ch, up) => `[${ch}](${up}${DIR}/${encodeURIComponent(ch)}.md)`;
const code = c => `\`${c}\``;
const cell = s => String(s).replace(/\|/g, '\\|');

// A question as the page opens with it: the ask in bold, its answer after.
const asked = (rec, v, up) => `**${rec.Ask}** ${R.say(rec, v, up)}`;

function bars(title, head, rows, extra = []) {
  return [`> [!CARD:bars] ${title}`, `> |  | ${head.join(' | ')} |`, `> |---|${head.map(() => '---').join('|')}|`,
    ...rows.map(([name, xs]) => `> | ${name} | ${xs.join(' | ')} |`), ...extra.map(e => `> ${e}`)].join('\n');
}
const LBINS = Array.from({ length: 10 }, (_, i) => `${i * 10}%`);
const CBINS = ['1–3', '3–4.5', '4.5–7', '7–10', '10–15', '15–21'];
const lightnessCard = v => bars('Backgrounds by lightness', LBINS, [['Themes', v.bins]], ['- Mark: 40% The middle, to 90%']);
const contrastCard = v => bars('Themes by contrast', CBINS, [['Themes', v.cbins]], ['- Mark: 4.5–7 Reads well from here']);
// The grey against the six hues: colour 8, then 1 to 6.
const greyCard = v => bars('Faint on its own background, themes', ['Grey (8)', ...R.HUES], [['Themes', [v.faint[8], ...v.faint.slice(1, 7)]]]);
// Each of the sixteen: the normal colour above, the bright below, on one scale.
const huesCard = v => bars('The hues faint, normal and bright, themes', R.HUES, [['Normal', v.faint.slice(1, 7)], ['Bright', v.faint.slice(9, 15)]], ['- Scale: shared']);

// A table of themes, their colours drawn.
function themeTable(ts, up, cols = ['Background', 'Text', 'Contrast'], more = () => []) {
  const head = ['Theme', ...cols];
  const row = t => [R.themeLink(t.name, up), ...cols.map(c => ({
    Dark: t.dark ? 'yes' : 'no', Background: code(t.background), Text: code(t.foreground), Contrast: t.c.toFixed(2),
    Lightness: `${Math.round(100 * t.L)}%`,
  }[c] ?? more(t, c)))];
  return [`| ${head.join(' | ')} |`, `|${head.map(() => ' --- ').join('|')}|`, ...ts.map(t => `| ${row(t).join(' | ')} |`)].join('\n');
}

function chapterPage(ch, recs, v) {
  const up = '../';
  const q = id => asked(recs.get(id), v, up);
  const L = [`# Chapter: ${ch.name}`, '', `- Ask: ${ch.ask}`, ''];
  if (ch.name === 'Dark or light') {
    L.push(`A theme is dark where white text reads better on its background than black (WCAG's contrast). Lightness here is OKLab's, 0% black and 100% white, an even step of it an even step to the eye. Every theme is on its letter's page too, by name; [the front page](../README.md) asks the other questions.`, '',
      '## How dark', '', q('dl-count'), '', 'The themes by their background\'s lightness, a tenth a bar.', '', lightnessCard(v), '',
      '## The commonest backgrounds', '', q('dl-common'), '', 'The twelve commonest, each drawn, with how many themes have it and the first three by name.', '',
      '| Background | Themes | Some of them |', '| --- | --- | --- |',
      ...v.common.slice(0, 12).map(x => `| ${code(x.colour)} | ${x.names.length} | ${x.names.slice(0, 3).map(n => R.themeLink(n, up)).join(', ')} |`), '',
      '## Between dark and light', '', q('dl-middle'), '', 'Every theme whose background lies between 40% and 90% lightness, darkest first.', '',
      themeTable(v.middle, up, ['Dark', 'Lightness', 'Background', 'Text']));
  } else if (ch.name === 'Contrast') {
    L.push(`Contrast is a theme's text on its own background, WCAG's ratio: 1 where they are the same, 21 for black on white; 4.5 reads well (AA), 7 very well (AAA). Every theme's is on its own page and its letter's.`, '',
      '## How many read well', '', q('ct-well'), '', 'The themes by the contrast of their text, 4.5 marked.', '', contrastCard(v), '',
      '## The best read', '', `${v.best_n} themes reach ${v.best_v.toFixed(2)}, the most contrast there is: black and white. Past them, the ten best, their colours drawn.`, '', themeTable(v.ranked.filter(t => t.c < v.best_v).slice(0, 10), up), '',
      '## Dark and light', '', q('ct-dark-light'), '', `Every theme that falls short of 4.5, the worst first.`, '', themeTable(v.ranked.filter(t => t.c < R.WELL).reverse(), up, ['Dark', 'Background', 'Text', 'Contrast']), '',
      '## The featured themes', '', q('ct-featured'), '', 'The featured themes, the ones cards.md ships, the best read first.', '', themeTable(v.featured_list, up));
  } else if (ch.name === 'Palettes') {
    L.push(`A terminal names sixteen colours, 0 to 15: black, red, green, yellow, blue, magenta, cyan and white, then the bright of each. A colour is faint here where it reads under 3 on its theme's own background, WCAG's least for large text and marks.`, '',
      '## Faint colours', '', q('pl-faint'), '', 'The grey, colour 8, against the six hues: the themes in which each is faint.', '', greyCard(v), '',
      '### Normal and bright', '', 'The six hues, normal (1 to 6) above and bright (9 to 14) below, on one scale. Black and white are left out: a dark theme\'s black and a light one\'s white are meant to sit near the background.', '', huesCard(v), '',
      '## Blue', '', q('pl-blue'), '', 'The ten faintest blues, each beside its background.', '',
      '| Theme | Background | Blue | Contrast |', '| --- | --- | --- | --- |',
      ...v.blues.map(({ t, v: c }) => `| ${R.themeLink(t.name, up)} | ${code(t.background)} | ${code(t.palette[4])} | ${c.toFixed(2)} |`), '',
      '## Brights', '', q('pl-brights'), '', 'The palettes of the featured themes (the ones cards.md ships), the best read first, each in words: its background and text, then colours 0 to 7, then 8 to 15, each drawn after its hex. A table of sixteen colours a row is too wide to read on a phone.', '',
      ...v.featured_list.flatMap(t => [`**${R.themeLink(t.name, up)}** on ${code(t.background)}, text ${code(t.foreground)}: ${t.palette.slice(0, 8).map(code).join(' ')}; bright ${t.palette.slice(8).map(code).join(' ')}.`, '']));
  } else if (ch.name === 'Alike') {
    L.push(`Two themes are alike here where their eighteen colours (background, text and the sixteen) lie, on the average, under ${R.ALIKE} apart in OKLab: half the step an eye is commonly held to see (0.02). Copies are alike in every colour. Cursor and selection are left out: a terminal's text is drawn in the eighteen.`, '',
      '## Copies', '', q('al-copies'), '', 'Each set of copies, its colours drawn: its background and text, then colours 0 to 7, then 8 to 15.', '',
      ...v.copy_sets.flatMap(s => [`**${s.map(t => R.themeLink(t.name, up)).join(', ')}** on ${code(s[0].background)}, text ${code(s[0].foreground)}: ${s[0].palette.slice(0, 8).map(code).join(' ')}; bright ${s[0].palette.slice(8).map(code).join(' ')}.`, '']),
      '## Families', '', q('al-families'), '', 'Every family, the largest first, each theme by its background.', '',
      '| Themes | Family | Backgrounds |', '| --- | --- | --- |',
      ...v.family_list.map(f => `| ${f.length} | ${f.map(t => R.themeLink(t.name, up)).join(', ')} | ${f.map(t => code(t.background)).join(' ')} |`), '',
      '## The nearest', '', q('al-nearest'), '', 'The twenty nearest pairs not copies, their backgrounds drawn.', '',
      '| Theme | Background | Alike | Background | Apart |', '| --- | --- | --- | --- | --- |',
      ...v.near.slice(0, 20).map(p => `| ${R.themeLink(p.a.name, up)} | ${code(p.a.background)} | ${R.themeLink(p.b.name, up)} | ${code(p.b.background)} | ${p.d.toFixed(4)} |`));
  }
  L.push('', `The other chapters: ${CHAPTERS.filter(c => c !== ch).map(c => `[${c.name}](./${encodeURIComponent(c.name)}.md)`).join(', ')}. The questions and their answers worked out from upstream's files apart: [FAQ](../FAQ.md).`);
  return L.join('\n') + '\n';
}

// The front page's reading: what the data points to, and its questions,
// each with its picture and its way deeper. Returns the markdown.
function front(recs, v) {
  const up = './';
  const q = id => asked(recs.get(id), v, up);
  const findings = [...recs.values()].filter(r => r.kind === 'Finding' && r.Page === 'README.md').map(r => R.say(r, v, up));
  const top = v.ranked.slice(0, 3), bottom = v.ranked.slice(-3).reverse();
  return [
    '## What the data points to', '', findings.join(' '), '',
    '## Dark or light', '', q('front-dark'), '', 'The themes by their background\'s lightness (OKLab: 0% black, 100% white), a tenth a bar.', '', lightnessCard(v), '',
    `More: ${linkTo('Dark or light', up)}, the commonest backgrounds and the few between.`, '',
    '## How well they read', '', q('front-reads'), '', 'The themes by the contrast of their text on their own background (WCAG: 4.5 reads well, 7 very well).', '', contrastCard(v), '',
    '### The best and the worst', '', 'The three best and the three worst, their colours drawn.', '', themeTable([...top, ...bottom], up, ['Background', 'Text', 'Contrast']), '',
    `More: ${linkTo('Contrast', up)}, the best ten, every theme that falls short, and the featured themes ranked.`, '',
    '## Faint colours', '', q('front-faint'), '', 'The grey, colour 8, against the six hues: the themes in which each reads under 3 on its own background.', '', greyCard(v), '',
    `More: ${linkTo('Palettes', up)}, the faintest blues and the featured themes' palettes.`, '',
    '## Themes alike', '', q('front-alike'), '', 'The copies, their colours drawn.', '',
    '| Themes | Background | Text |', '| --- | --- | --- |',
    ...v.copy_sets.map(s => `| ${s.map(t => R.themeLink(t.name, up)).join(', ')} | ${code(s[0].background)} | ${code(s[0].foreground)} |`), '',
    `More: ${linkTo('Alike', up)}, every family and the nearest pairs.`,
  ].join('\n');
}

// Write the chapters; return the front page's reading and what each page
// was filled with, {page: {id: values}}, for reading.json.
function write(themes) {
  const recs = R.records();
  const v = R.measure(themes);
  for (const r of recs.values()) {
    if (r.Page !== 'README.md' && !CHAPTERS.some(c => pageOf(c.name) === r.Page)) throw new Error(`reading.md ${r.id}: Page ${r.Page} is no page the book writes`);
  }
  fs.rmSync(path.join(REPO, DIR), { recursive: true, force: true });
  fs.mkdirSync(path.join(REPO, DIR));
  for (const ch of CHAPTERS) fs.writeFileSync(path.join(REPO, pageOf(ch.name)), chapterPage(ch, recs, v));
  const pages = {};
  for (const r of recs.values()) (pages[r.Page] ||= {})[r.id] = R.kept(r, v);
  return { markdown: front(recs, v), pages, values: v, chapters: CHAPTERS.map(c => c.name) };
}

module.exports = { write, CHAPTERS, DIR };
