// V2: the importer's vectors (.import/vectors/importer.json), each a few
// lines of upstream's in and the exact reading or page out.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { parseGhostty, parseOurs, themePage, contrast, isDark } = require('./import.js');

const cases = JSON.parse(fs.readFileSync(path.join(__dirname, 'vectors', 'importer.json'), 'utf8'));
const licensed = { licence: 'MIT', licenceAt: 'https://github.com/nordtheme/nord', default: true,
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
