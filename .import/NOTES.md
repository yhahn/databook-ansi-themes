# Notes: the R pass (2026-10-20, a deputy)

**Asked.** The R pass on databook-themes (SPEC R1-R6): pick the spine,
write `.import/reading.md`, have the importer answer it on the README and
the spine's pages with pictures, every number filled at build; warn
`finding-turned` on rerun; have faq.js check the pages' numbers
(`page-drifted`); add the R questions to faq.md; rebuild with every test,
target and the Source check holding. Branch `r-pass`, nothing pushed.

**Made.** Commits f13c0c6 (the importer: reading.md, reading.js,
chapters.js, faq.js and faq.md, readme.js, import.js, tests, target.sql,
DECISIONS) and 8a10e80 (the pages: README.md, FAQ.md, chapters/ four
pages, the 27 letter pages' one line each). Theme pages unchanged; data
unchanged (Theme 816, Theme_Palette 13,056, Initial 26). Questions 12 to
18; target 13 checks and 5 README queries held; 11 tests; proper check
clean; the Source check held; a rerun writes the same bytes.

**The spine.** By question: the front page asks four and says what the
data points to; `chapters/` holds Dark or light, Contrast, Palettes,
Alike, each a `# Chapter:` record with its Ask, opening with its
questions answered, then its themes ranked with their colours drawn. The
letter folders are the index.

**Findings (filled at build).** 634 of 816 dark (78%). Backgrounds keep
to the ends: 23 lie between 40% and 90% lightness (OKLab). 791 read well
(4.5+), 724 very well; median contrast 12.09; light themes read better,
12.61 against 12.01; 25 fall short, 21 of them dark. Bright black (colour
8) is faint (under 3) in 392 themes; of the hues red most often (94),
green least (50); blue faint in 92, 75 of them dark. 84 pairs alike in
36 families (95 themes); 5 themes are copies, in 2 sets (TokyoNight,
TokyoNight Night, Solarized Osaka Night; Zenbones, Zenbones Light).

**Counts, before and after** (words / bars cards / colours drawn):
README 930 / 0 / 0, now 1,795 / 3 / 16. Spine pages had none before; the
nearest were the letter pages (S.md 1,693 / 0 / 206). Now Contrast
1,278 / 1 / 174; Palettes 1,760 / 2 / 956.

**Proved.** page-drifted bites: a README number changed by hand, and a
kept value changed, each warned and stopped (exit 2). finding-turned
bites: a kept weak hue changed, warned on rerun.

**Learnings.**
- cards.md, bars: at a phone's width only the first and last x labels
  are drawn. Right for time, wrong for categories: the faint-colour bars
  (Grey, Red ... Cyan) and the contrast bins read unlabelled between.
  Marks near each other overprint their words (4.5 and 7 did; one kept).
- cards.md, a picture it lacks: a swatch strip, a theme's colours as
  blocks, a row a theme, no hex. Sixteen code spans in a table cell wrap
  and clip their swatches; written as prose they wrap but are mostly
  hex. A swatch also breaks from its hex at a line's end; the two might
  be kept together.
- cards.md, bars of one series: a strip's total is drawn (1,093 for the
  faint colours), which means nothing when the bars are not parts of a
  whole.
- proper: two cards under one heading are "2 tables of one name and
  different heads"; a picture's table and a listing need their own
  headings. Known (CLAUDE.md), met twice here.
- proper: a code span wholly a cell is gathered as its text (checked in
  target.sql); the README's trim note is gone.

**Unsure.** Alike is a mean over eighteen colours, so the palette weighs
most: Misterioso and Pandora are a family though their backgrounds
differ (#2d3743, #141e43). Red as the faintest hue leads blue by two
(94, 92): it may turn on the next release, which is what finding-turned
is for. "The grey many programs write hints and comments in" is common
use (colour 8), not from the source.

**Against the brief's Predicted.** No Predicted was given me; the work
went as HUD's pass, quicker for having it to copy. The trial's lesson
(findings in sentences with their numbers) shaped the front page.

**What the brief and SPEC R lacked.** R2 says page-drifted "stops the
build", while this book's FAQ is warn-only (10-19, gap 9); I took both:
page-drifted alone stops. R2/R5 assume place or time; a book of things
with no place or time needs "the colours themselves are the picture",
which the kit draws only as hex plus a small swatch. R4 says a folder
page compares; for a book by question the chapter is the comparing page
and the folder is a plain index; R could say so. R gives no word on how
long the front page may grow (it doubled).

Summary: the themes book now reads by question, four chapters and a
front page of findings, every number filled and checked at build; the
kit lacks a swatch strip and labelled categorical bars.
