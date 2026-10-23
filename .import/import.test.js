// V2: the importer's vectors (.import/vectors/importer.json), each a few
// lines of upstream's in and the exact reading or page out.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { parseGhostty, parseOurs, themePage, contrast, isDark } = require('./import.js');

const cases = JSON.parse(fs.readFileSync(path.join(__dirname, 'vectors', 'importer.json'), 'utf8'));
const licensed = { licence: 'MIT', licenceAt: 'https://github.com/nordtheme/nord', default: true, featured: true,
  credit: 'Nord theme was created by [Arctic Ice Studio](https://www.nordtheme.com/) and added by [Teraskull](https://github.com/Teraskull)',
  madeFrom: '[iTerm2-Color-Schemes, ghostty/Nord](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/c379d7a31af861838a017468b03120c8970eaa00/ghostty/Nord)' };

for (const c of cases) {
  test(`${c.rule}: ${c.about}`, () => {
    if (c.output.error) return assert.throws(() => parseGhostty(c.input, 'case'), new RegExp(c.output.error));
    const t = parseGhostty(c.input, 'Nord');
    if (c.output.page) {
      Object.assign(t, licensed, { dark: isDark(t.background), contrast: contrast(t.foreground, t.background).toFixed(2),
        sameBrights: t.palette.slice(0, 8).filter((x, i) => x === t.palette[i + 8]).length });
      return assert.strictEqual(themePage(t), c.output.page);
    }
    for (const [k, v] of Object.entries(c.output)) {
      const got = k === 'selection' ? t['selection-background'] : /^palette(\d+)$/.test(k) ? t.palette[+k.slice(7)] : t[k];
      assert.strictEqual(got, v, k);
    }
  });
}

test('WCAG: black on white is 21, a colour on itself 1', () => {
  assert.strictEqual(contrast('#000000', '#ffffff').toFixed(2), '21.00');
  assert.strictEqual(contrast('#2e3440', '#2e3440').toFixed(2), '1.00');
  assert.strictEqual(isDark('#2e3440'), true);
  assert.strictEqual(isDark('#fdf6e3'), false);
});

test('our own theme, in the page\'s own shape, reads back as written', () => {
  const page = fs.readFileSync(path.join(__dirname, '..', 'N', 'Nord.md'), 'utf8');
  const t = parseOurs(page, 'Nord.md');
  assert.strictEqual(t.name, 'Nord');
  assert.strictEqual(t.background, '#2e3440');
  assert.strictEqual(t.palette[14], '#8fbcbb');
});

// Gap 9 (the person, 10-19): the FAQ's answers are worked out by code that
// cannot lean on the importer's reading. faq.js may require node's own
// modules only; a require of anything else (./import.js, a package) fails.
test('faq.js requires node\'s own modules only', () => {
  const src = fs.readFileSync(path.join(__dirname, 'faq.js'), 'utf8');
  const reqs = [...src.matchAll(/require\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1]);
  assert.ok(reqs.length > 0);
  assert.deepStrictEqual(reqs.filter(r => !r.startsWith('node:')), []);
  assert.ok(!/\bimport\s*\(|^\s*import\s/m.test(src), 'no ES imports');
});

// R2, R3: the reading's words, filled from values the importer reckons.
const R = require('./reading.js');
test('reading: a value written as the spec says, a list as words', () => {
  const v = { n: 1234, x: 12.0891, names: ['Nord', 'Dracula', 'C64'], c: '#2e3440', p: 77.69, sets: [['A b', 'C/d'], ['0x96f']] };
  assert.strictEqual(R.fill('{n:,} {n} {x} {p:%} {c:c}', v), '1,234 1234 12.09 78% `#2e3440`');
  assert.strictEqual(R.fill('{names}', v), 'Nord, Dracula and C64');
  assert.strictEqual(R.fill('{names:t}', v, '../'), '[Nord](../N/Nord.md), [Dracula](../D/Dracula.md) and [C64](../C/C64.md)');
  assert.strictEqual(R.fill('{sets:s}', v), '[A b](./A/A%20b.md) and [C/d](./C/C-d.md); [0x96f](./0-9/0x96f.md)');
  assert.throws(() => R.fill('{nothing}', v), /no value nothing/);
});

test('reading: OKLab lightness 0 for black and 1 for white; a theme no distance from itself', () => {
  assert.ok(Math.abs(R.oklab('#000000')[0]) < 1e-9);
  assert.ok(Math.abs(R.oklab('#ffffff')[0] - 1) < 1e-6);
  const nord = ['#2e3440', '#d8dee9', ...Array(16).fill('#88c0d0')].map(R.oklab);
  assert.strictEqual(R.distance(nord, nord), 0);
});

test('reading: every record of reading.md names a page the book writes, and fills from the build', () => {
  const kept = JSON.parse(fs.readFileSync(path.join(__dirname, 'reading.json'), 'utf8')).pages;
  for (const r of R.records().values()) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', r.Page)), `${r.id}: ${r.Page}`);
    assert.ok(kept[r.Page] && kept[r.Page][r.id], `${r.id}: kept`);
  }
});

// The featured list (the person, 10-23): the shorter list inside Default.
const I = require('./import.js');
const featured = I.readFeatured(fs.readFileSync(path.join(__dirname, 'featured.md'), 'utf8'));
const licences = I.readLicences(fs.readFileSync(path.join(__dirname, 'licences.md'), 'utf8'));
const book = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'themes.json'), 'utf8'));

test('featured: exactly 28, each once, each a theme in the book and default (featured implies default)', () => {
  assert.strictEqual(featured.length, 28);
  assert.strictEqual(new Set(featured).size, 28);
  for (const n of featured) {
    assert.ok(book.themes[n], `${n} is a theme`);
    assert.strictEqual(book.themes[n].default, true, `${n} default`);
    assert.strictEqual(book.themes[n].featured, true, `${n} featured`);
  }
  assert.strictEqual(Object.values(book.themes).filter(t => t.featured).length, 28);
  for (const t of Object.values(book.themes)) assert.ok(!t.featured || t.default);
});

test('featured: a name that is no theme, or no default one, stops the build and is named', () => {
  const themes = new Map([['Nord', {}], ['Odd', {}]]);
  I.checkFeatured(['Nord'], themes, licences);
  assert.throws(() => I.checkFeatured(['Nord', 'Nowhere'], themes, licences), /Nowhere, which no theme is/);
  assert.throws(() => I.checkFeatured(['Odd'], themes, licences), /Odd, which is not default/);
});

test('every name that was default in the last edition (10-16) still resolves, by name or alias', () => {
  const was = JSON.parse(fs.readFileSync(path.join(__dirname, 'vectors', 'defaults-10-16.json'), 'utf8'));
  assert.strictEqual(was.length, 52);
  for (const n of was) assert.ok(book.themes[n] || (book.aliases || {})[n], `${n} resolves`);
  // The 24 that leave the featured list stay themes: default, not featured.
  assert.strictEqual(was.filter(n => !book.themes[n].featured).length, 24);
});
