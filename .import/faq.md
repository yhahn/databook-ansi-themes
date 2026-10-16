# The book's questions: databook-themes

The questions a good reader of this book can answer, a designer's, a
programmer's or anyone choosing a theme (SPEC B9), written by hand and only
ever added to: a question changed is a new question, under a new id. Each:
its Tier (BENCH.md's ladder), Ask, Type (number, set, list, none, judge),
Tolerance, How its answer is worked out from upstream's files, and Look in,
the pages where a reader finds it (several split by "; "; none for a Gap
question). `.import/faq.js` works out each answer from upstream's `ghostty/`
files and `.import/licences.md`, never from the book, and writes FAQ.md.
First written 2026-10-16.

### Question: th-lookup-1
- Tier: Lookup
- Ask: What is Nord's background colour?
- Type: judge
- Tolerance:
- How: ghostty/Nord, background
- Look in: N/Nord.md

### Question: th-lookup-2
- Tier: Lookup
- Ask: In Dracula, what colour is a terminal's colour 4, its blue?
- Type: judge
- Tolerance:
- How: ghostty/Dracula, palette 4
- Look in: D/Dracula.md

### Question: th-lookup-3
- Tier: Lookup
- Ask: Under what licence is Tokyo Night's own project published?
- Type: judge
- Tolerance:
- How: licences.md, the row naming TokyoNight
- Look in: T/TokyoNight.md

### Question: th-page-1
- Tier: Page
- Ask: How many themes have names beginning with S, and how many of those are light?
- Type: judge
- Tolerance:
- How: the ghostty/ files whose names begin with S or s; light where black text reads better on the background than white (WCAG)
- Look in: S.md

### Question: th-across-1
- Tier: Across
- Ask: How many of the book's themes are dark?
- Type: number
- Tolerance: 0
- How: every ghostty/ file; dark where white text reads better on its background than black (WCAG contrast)
- Look in: A.md; B.md; C.md

### Question: th-across-2
- Tier: Across
- Ask: Which theme's text reads worst on its own background, and what is its contrast ratio?
- Type: judge
- Tolerance:
- How: every ghostty/ file, the WCAG contrast of foreground on background, the least
- Look in: A.md; B.md; C.md

### Question: th-across-3
- Tier: Across
- Ask: How many themes ship with cards.md by default?
- Type: number
- Tolerance: 0
- How: the themes named in licences.md
- Look in: README.md

### Question: th-across-4
- Tier: Across
- Ask: How many themes use the very same colour for all eight of their bright colours as for the normal ones?
- Type: number
- Tolerance: 0
- How: every ghostty/ file, palette 0-7 against 8-15, all eight equal
- Look in: A.md; B.md; C.md

### Question: th-across-5
- Tier: Across
- Ask: Which of the themes that ship by default has the most readable text, and what is its contrast?
- Type: judge
- Tolerance:
- How: the themes named in licences.md, the WCAG contrast of foreground on background, the greatest
- Look in: README.md

### Question: th-gap-1
- Tier: Gap
- Ask: What font does the Nord theme use?
- Type: none
- Tolerance:
- How: a terminal theme gives colours only; ghostty/Nord names no font
- Look in:

### Question: th-gap-2
- Tier: Gap
- Ask: In what year was the Dracula theme first published?
- Type: none
- Tolerance:
- How: neither ghostty/Dracula nor CREDITS.md gives a date
- Look in:

### Question: th-analysis-1
- Tier: Analysis
- Ask: Do light themes read better than dark ones? Compare their median text contrast.
- Type: judge
- Tolerance:
- How: every ghostty/ file, dark or light as above, the median WCAG contrast of foreground on background in each
- Look in: A.md; B.md; C.md
