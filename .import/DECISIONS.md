# Decisions: databook-themes

Small things decided while making the book, each reversible (CLAUDE.md,
"Decide and move"). The first edition, 2026-10-16.

- **The source: upstream's `ghostty/` folder.** iTerm2-Color-Schemes keeps
  its themes in `schemes/` (.itermcolors, floats) and generates a folder
  for each terminal; Ghostty's is the plainest (`key = value`, hex already)
  and is what Ghostty itself ships. One format read, one rerun.
- **A theme keyed by upstream's name,** its file name in `ghostty/` (K1,
  K5): the name a person writes in `- theme:`. A rename upstream is a
  change (D5), with the old name at the boundary.
- **A folder an initial** (A to Z, and 0-9 for names that begin with a
  figure), a page a theme, each folder's page beside it (B7): a reader
  finds a theme by its name. S, the largest, lists 103.
- **Hex written lower case.** Upstream writes lower case but for one
  colour (hazyland's selection, `#0D2847`); case means nothing in hex, so
  it is read either way and written lower. hazyland also writes
  `background= #171219`: spacing round `=` is read loosely. Both are
  vectors (V1).
- **Dark** is where white text reads better on the background than black
  (WCAG contrast), not a threshold of our own.
- **Contrast** is the theme's own text on its own background (WCAG's
  ratio, two places): the one number that says whether a theme reads.
- **Same brights** counts the bright colours (8-15) that are the very
  colour of their normal ones (0-7): six themes have all eight.
- **Credit is upstream's words,** the one paragraph of its CREDITS.md that
  names the theme near its start, whole (not "Nord" in "Nord-light"). Two
  paragraphs, or none, and Credit is blank: a wrong credit is worse than
  none. 486 of 816 credited; a sample of 14 checked by hand, all right.
  Its relative links are resolved against upstream at the commit read.
- **Licence by hand.** Upstream's LICENSE covers the collection (MIT) and
  gives each theme to its author; CREDITS names authors, not licences. So
  `.import/licences.md` lists the themes whose own project states a
  licence, each checked against that project, and only those are Default
  (shipped with cards.md): 52. The rest say "unstated". A theme added
  there is a new check, with where it was checked.
- **themes.json** at the root, from the same run as the pages, so the two
  cannot disagree: the one way cards.md reads themes on every host
  (engine, 10-16), pinned by cards.md to a commit of this book.
- **LICENSE in two parts:** upstream's MIT notice for the themes, kept
  as it asks (the book claims nothing of them), and CC0 for our own work,
  the importer and the pages' words (the person, 10-16, as for HUD, Water
  and Companies). Public under github.com/yhahn (the person, 10-16).
- **Colours as code spans** (`` `#2e3440` ``), so cards.md draws a swatch
  beside each (engine's convention, 10-16). proper gathers the backticks
  with the value; told to engine.
- **A rename is found by colour** (V4, D5; engine asked, 10-16: a config's
  `scheme` row names a theme). At each edition, a theme gone while a new
  name holds the very same colours is a rename: `aliases` in themes.json
  (old to new, carried forward and pointed at the latest), and a
  `### Change:` in Changes.md. Gone otherwise: `removed`, with the
  upstream commit it went at. A rename that also changes a colour reads
  as a removal and an addition: said, never guessed. Tried on a copy
  against a doctored upstream (Nord renamed, Zenburn dropped), run twice.

- **Colour themes, and nothing more** (the person, 10-19, by engine). The
  book holds a terminal's colours: the sixteen it names 0 to 15, its
  background and foreground, and the cursor and selection colours a theme
  file gives beside them. Fonts, spacing and the rest of a look live
  elsewhere, never here. A name that says so (databook-ansi-themes, say)
  waits on a rename talk with everyone; the name stands till then.

## The R pass (SPEC R, a reader's way in; 2026-10-20, a deputy)

- **The spine: by question** (R1). A stranger comes to a book of 816
  themes with a few questions (how many are dark? which read best? which
  colours can hardly be seen? which are alike?), not with a name; one
  who has a name has the letter folders, kept whole as the index. So the
  front page asks the four and says what the data points to, and a
  chapter a question goes deeper, in `chapters/` (Dark or light,
  Contrast, Palettes, Alike), each a record `# Chapter: <name>` with its
  Ask, its tables gathered by their headings. Place and time are no axis
  here (a theme has neither); a register by entity would be the letter
  folders alone, which is what the book was. To undo: drop chapters.js
  and the front page's reading; the index stands as before.
- **Lightness is OKLab's L**, not WCAG's luminance: an even step of it
  looks even, so a bar a tenth of it shows where backgrounds gather.
  Dark stays WCAG's (white reads better than black), as before.
- **Faint is under 3** on the theme's own background, WCAG's least (large
  text, marks); reads well is 4.5 (AA), very well 7 (AAA). Black (0) and
  white (7) are counted but not compared with the hues: a dark theme's
  black is meant to sit near its background.
- **Alike is under 0.01 mean OKLab distance** over the eighteen colours a
  terminal draws text in (background, text, the sixteen); cursor and
  selection left out. 0.01 is half the 0.02 commonly taken as a step an
  eye can see; at 0.01, 84 pairs in 36 families, read by eye: most a
  theme's named variants (Everforest Dark Hard, Med and Soft; Modus
  Operandi and its tints), some sets of unlike names (Adobe Moon, Copper
  Canyon, Ocotillo, Pueblo Night, Red Rock), and a few whose backgrounds
  differ though their sixteen are near (Misterioso and Pandora): a mean
  over eighteen weighs the palette most. At 0.03 it was 564 pairs, too
  loose to call alike. Copies are the eighteen all equal (5 themes, 2 sets).
- **Contrast unrounded in every count and median,** as faq.js reckons
  it; written to two places. The bins of the contrast bars are of the
  unrounded value too.
- **Palettes in words, not a table:** sixteen code spans a row is too
  wide for a phone (cards.md's table cell wraps them and clips the
  swatch); a paragraph a theme wraps as prose does, each swatch after
  its hex. A swatch-strip picture is asked of cards.md (NOTES).
- **The faint bars show the grey and the six hues,** not all sixteen:
  black's 537 flattened every hue to a line.
- **page-drifted stops the build** (SPEC R2): faq.js exits 2 and the
  importer stops; every other FAQ warning stays warn-only (10-19, gap
  9). It checks each Holds value against faq.js's answer and that the
  page's own paragraph for the question says it.
- **finding-turned** is said by the importer against `.import/reading.json`
  (the last release's values, kept in git), as HUD's.
- **The folder pages say they are the index** and link the chapters; the
  theme pages are unchanged (R2's "each level reading.md names": the
  chapters, not every theme).
