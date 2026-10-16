# Terminal colour themes: iTerm2-Color-Schemes' 816, as of 2026-10-16

Every terminal colour theme in [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes), the catalog Ghostty's own themes come from, a page a theme: its background, text, cursor and selection colours, and the sixteen colours a terminal names 0 to 15, each drawn beside its hex. 634 are dark and 182 light. Each says how well its text reads on its background, who upstream credits for it, and its licence where its own project states one.

The book is also where cards.md's colour themes come from: a `.cards/config.md` that says `- theme: Nord` means these colours on the desk, the phone and the web alike. The 52 themes whose own licence is known ship with them by default.

[Questions and answers](./FAQ.md): 12 questions a reader of this book can answer, from one theme's blue to which themes read worst, each with its answer and the page to look in.

## How it is laid out

A folder an initial (0-9, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R, S, T, U, V, W, X, Y, Z), a page a theme, named as upstream names it; each folder's page beside it (`N.md` beside `N/`) lists its themes with their background, text, contrast and licence. `themes.json`, at the root, holds the same themes for a program, written by the same run as the pages.

## Keys

- `# Theme: <name>`, one a page, keyed by upstream's name (its file name in `ghostty/`). Its rows: Dark (yes when white text reads better on its background than black), Background, Foreground, Cursor, Cursor text, Selection, Selection text (each `#rrggbb`), Contrast (its text against its background, WCAG's ratio: 4.5 reads well, 7 very well), Same brights (how many of its eight bright colours are the same as their normal ones), Licence and Licence from (where its project states it; "unstated" otherwise), Default (yes when it ships with cards.md by default), Credit (upstream's own words for it, in its CREDITS.md, where one paragraph names it), Made from (the upstream file, at the commit read).
- `## Palette`, under each theme, gathered as `Theme_Palette`: Index (0 to 15, as every terminal's configuration names them), Name (Black to Bright White), Colour.
- `# Initial: <letter>`, a folder's page, its listing gathered as `Initial_Themes`.

A colour is written as a code span, so cards.md draws its swatch beside it. proper gathers it with its backticks for now, so match one with the backticks trimmed:

```sql
select name from Theme where trim(Background, '`') = '#2e3440'
```

## Queries

The dark themes that ship by default, the most readable first:

```sql
select name, Background, Foreground, Contrast from Theme
where Dark = 'yes' and "Default" = 'yes' order by Contrast desc
```

Nord's sixteen colours:

```sql
select p.Index, p.Name, p.Colour from Theme_Palette p join Theme t using (_file)
where t.name = 'Nord' order by p.Index
```

How many themes each licence covers:

```sql
select Licence, count(*) as themes from Theme group by Licence order by themes desc
```

The themes whose text reads worst on their own background:

```sql
select name, Dark, Contrast from Theme order by Contrast limit 10
```

## Its source and its terms

[iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes), kept by Mark Badolato and its contributors, its `ghostty/` folder at commit `c379d7a31af8` (2026-10-16). Its LICENSE, kept here as LICENSE: "MIT License, Copyright (c) 2011 to Present Mark Badolato ... This license covers the iTerm-Color-Schemes repository collection of themes. The copyright/license for each individual theme belongs to the author of that theme." So this book claims nothing of the themes: each is its author's, credited as upstream credits it. A theme's Licence is filled only where its own project states one, checked by hand against that project (`.import/licences.md`); the rest are "unstated", and are in the book, not shipped by default.

## Licence

Two parts ([LICENSE](LICENSE)). The themes are upstream's, under its MIT notice, each its author's as above. Our own work, the importer and the pages' words, is given to the public domain under CC0 1.0: copy it, change it and use it as you like, without asking.

## Our own themes

A theme of our own, or our fix to one of upstream's, is a page in this book's shape in `.import/ours/`; the importer checks it as it checks upstream's and writes it beside them (or in place of upstream's of the same name, its Made from saying so). There are none yet. A fix to upstream's theme is best sent upstream too.

## Making it again

```sh
git clone --depth 1 --filter=blob:none --sparse https://github.com/mbadolato/iTerm2-Color-Schemes.git ~/.cache/proper/themes/upstream
git -C ~/.cache/proper/themes/upstream sparse-checkout set ghostty
node .import/import.js     # the pages, themes.json, README.md, LICENSE
node .import/faq.js        # FAQ.md, its answers from upstream's files
node --test .import/import.test.js   # the importer's vectors
node .import/target.js     # what proper gathers, against the counts
```

A new edition is upstream pulled and the importer run again; the diff is the news.

## Changes

The first edition (2026-10-16). At each edition the importer compares upstream with the last: a theme gone while another appears with the very same colours is a rename, its old name kept in themes.json's `aliases` (old to new, carried forward) so a config naming it still resolves; a theme gone otherwise is listed in `removed`. Each is a record in Changes.md. None yet.
