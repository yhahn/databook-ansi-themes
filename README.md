# Terminal colour themes: iTerm2-Color-Schemes' 816, as of 2026-10-16

Every terminal colour theme in [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes), the catalog Ghostty's own themes come from, a page a theme: its background, text, cursor and selection colours, and the sixteen colours a terminal names 0 to 15, each drawn beside its hex. 634 are dark and 182 light. Each says how well its text reads on its background, who upstream credits for it, and its licence where its own project states one.

The book is also where cards.md's colour themes come from: a `.cards/config.md` that says `- theme: Nord` means these colours on the desk, the phone and the web alike. The 52 themes whose own licence is known ship with them by default.

## What the data points to

Most themes are dark: 634 of 816, 78%. Backgrounds keep to the ends: only 23 of them lie between 40% and 90% lightness; a theme is dark, or near white. Nearly all read well: 791 of 816 themes' text reads well on its own background, and the median theme's contrast is 12.09, past AAA's 7. Light themes read better, the median 12.61 against 12.01. Their faint colour is grey: colour 8, bright black, the grey many programs write hints and comments in, is faint on its own background in 392 themes; of the six hues, red is faint most often, in 94. Many are near copies: 95 themes fall into 36 families of themes alike, and 5 are copies of another, colour for colour.

## Dark or light

**How many themes are dark?** 634 of the 816 themes are dark and 182 light. Their backgrounds keep to the ends: 623 are darker than 40% lightness and 170 lighter than 90%, and only 23 lie between. Pure black is the commonest background (53 themes), pure white the next (33).

The themes by their background's lightness (OKLab: 0% black, 100% white), a tenth a bar.

> [!CARD:bars] Backgrounds by lightness
> |  | 0% | 10% | 20% | 30% | 40% | 50% | 60% | 70% | 80% | 90% |
> |---|---|---|---|---|---|---|---|---|---|---|
> | Themes | 54 | 190 | 300 | 79 | 10 | 1 | 1 | 4 | 7 | 170 |
> - Mark: 40% The middle, to 90%

More: [Dark or light](./chapters/Dark%20or%20light.md), the commonest backgrounds and the few between.

## How well they read

**Which themes read best, and which worst?** 791 of the 816 themes' text reads well on its background, 724 very well; 25 fall short of 4.5. 29 reach 21, as far as contrast goes; worst is [Darkermatrix](./D/Darkermatrix.md), at 1.89. Of the 52 that ship with cards.md by default, [GitHub Light High Contrast](./G/GitHub%20Light%20High%20Contrast.md) reads best, at 18.91.

The themes by the contrast of their text on their own background (WCAG: 4.5 reads well, 7 very well).

> [!CARD:bars] Themes by contrast
> |  | 1–3 | 3–4.5 | 4.5–7 | 7–10 | 10–15 | 15–21 |
> |---|---|---|---|---|---|---|
> | Themes | 10 | 15 | 67 | 152 | 344 | 228 |
> - Mark: 4.5–7 Reads well from here

### The best and the worst

The three best and the three worst, their colours drawn.

| Theme | Background | Text | Contrast |
| --- | --- | --- | --- |
| [Atlas Ragnarok](./A/Atlas%20Ragnarok.md) | `#000000` | `#ffffff` | 21.00 |
| [Builtin Light](./B/Builtin%20Light.md) | `#ffffff` | `#000000` | 21.00 |
| [Builtin Tango Dark](./B/Builtin%20Tango%20Dark.md) | `#000000` | `#ffffff` | 21.00 |
| [Darkermatrix](./D/Darkermatrix.md) | `#070c0e` | `#35451a` | 1.89 |
| [C64](./C/C64.md) | `#40318d` | `#7869c4` | 2.26 |
| [Royal](./R/Royal.md) | `#100815` | `#514968` | 2.34 |

More: [Contrast](./chapters/Contrast.md), the best ten, every theme that falls short, and the defaults ranked.

## Faint colours

**Which of a theme's colours can hardly be seen?** The grey: colour 8, bright black, is faint on its own background in 392 of the 816 themes. Of the six hues, red is faint most often, in 94 themes, and green least, in 50. In 559 themes all twelve hues read clear.

The grey, colour 8, against the six hues: the themes in which each reads under 3 on its own background.

> [!CARD:bars] Faint on its own background, themes
> |  | Grey (8) | Red | Green | Yellow | Blue | Magenta | Cyan |
> |---|---|---|---|---|---|---|---|
> | Themes | 392 | 94 | 50 | 76 | 92 | 84 | 68 |

More: [Palettes](./chapters/Palettes.md), the faintest blues and the defaults' palettes.

## Themes alike

**Which themes are alike?** 84 pairs of themes are alike, in 36 families of 95 themes; the largest is [Adobe Moon](./A/Adobe%20Moon.md), [Copper Canyon](./C/Copper%20Canyon.md), [Ocotillo](./O/Ocotillo.md), [Pueblo Night](./P/Pueblo%20Night.md) and [Red Rock](./R/Red%20Rock.md). 5 themes are copies of another, colour for colour: [Solarized Osaka Night](./S/Solarized%20Osaka%20Night.md), [TokyoNight](./T/TokyoNight.md) and [TokyoNight Night](./T/TokyoNight%20Night.md); [Zenbones](./Z/Zenbones.md) and [Zenbones Light](./Z/Zenbones%20Light.md).

The copies, their colours drawn.

| Themes | Background | Text |
| --- | --- | --- |
| [Solarized Osaka Night](./S/Solarized%20Osaka%20Night.md), [TokyoNight](./T/TokyoNight.md), [TokyoNight Night](./T/TokyoNight%20Night.md) | `#1a1b26` | `#c0caf5` |
| [Zenbones](./Z/Zenbones.md), [Zenbones Light](./Z/Zenbones%20Light.md) | `#f0edec` | `#2c363c` |

More: [Alike](./chapters/Alike.md), every family and the nearest pairs.

## Questions and answers

[Questions and answers](./FAQ.md): 18 questions a reader of this book can answer, from one theme's blue to which themes are alike, each with its answer and the page to look in. Every number on this page and the chapters' is worked out afresh from upstream's files at each release, and checked against the FAQ's own answers.

## How it is laid out

By question, then by name. Four chapters, in `chapters/`, each ask one question across every theme and set the themes side by side: [Dark or light](./chapters/Dark%20or%20light.md), [Contrast](./chapters/Contrast.md), [Palettes](./chapters/Palettes.md), [Alike](./chapters/Alike.md). Then the index: a folder an initial (0-9, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R, S, T, U, V, W, X, Y, Z), a page a theme, named as upstream names it; each folder's page beside it (`N.md` beside `N/`) lists its themes with their background, text, contrast and licence. `themes.json`, at the root, holds the same themes for a program, written by the same run as the pages. `Source.md` is the source record: the upstream commit the book was read from, the day it was fetched, how long that stays fresh, and git's hash of the folder; a check in `.proper/checks.md` says when the window has passed.

## Keys

- `# Theme: <name>`, one a page, keyed by upstream's name (its file name in `ghostty/`). Its rows: Dark (yes when white text reads better on its background than black), Background, Foreground, Cursor, Cursor text, Selection, Selection text (each `#rrggbb`), Contrast (its text against its background, WCAG's ratio: 4.5 reads well, 7 very well), Same brights (how many of its eight bright colours are the same as their normal ones), Licence and Licence from (where its project states it; "unstated" otherwise), Default (yes when it ships with cards.md by default), Credit (upstream's own words for it, in its CREDITS.md, where one paragraph names it), Made from (the upstream file, at the commit read).
- `## Palette`, under each theme, gathered as `Theme_Palette`: Index (0 to 15, as every terminal's configuration names them), Name (Black to Bright White), Colour.
- `# Initial: <letter>`, a folder's page, its listing gathered as `Initial_Themes`.

- `# Chapter: <name>`, a chapter's page, its one row its question (Ask); each of its tables gathered by its heading (`Chapter_The_best_read`).

A colour is written as a code span, so cards.md draws its swatch beside it; proper gathers it as its text:

```sql
select name from Theme where Background = '#2e3440'
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
node .import/import.js     # the pages, the chapters, themes.json, README.md, LICENSE
node .import/faq.js        # FAQ.md, its answers from upstream's files (the importer runs it too, warn-only)
node --test .import/import.test.js   # the importer's vectors
node .import/target.js     # what proper gathers, against the counts
```

A new edition is upstream pulled and the importer run again; the diff is the news. The questions and findings on this page and the chapters are written by hand in `.import/reading.md`, their numbers filled at every build: a finding that turns (a leader replaced, a lead lost) is warned of, `finding-turned`, and a number that differs from the FAQ's own answer, worked out apart from upstream's files, stops the build, `page-drifted`.

## Changes

The first edition (2026-10-16). At each edition the importer compares upstream with the last: a theme gone while another appears with the very same colours is a rename, its old name kept in themes.json's `aliases` (old to new, carried forward) so a config naming it still resolves; a theme gone otherwise is listed in `removed`. Each is a record in Changes.md. None yet.
