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
