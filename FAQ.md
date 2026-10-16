# Questions and answers

12 questions a careful reader of this book can answer, from the plainest (one theme's colour) to the hardest (whether light themes read better than dark), each with its answer and the page to look in. Read a question, open the page, and find the answer yourself; or put the questions to a reader or an agent with this page hidden, and mark what comes back. Where the book cannot answer, the right answer is to say so. The answers are worked out afresh from upstream's own files at every release, not copied from the pages: where the two disagree, one is wrong.

### Question: th-lookup-1

- Tier: Lookup
- Ask: What is Nord's background colour?
- Answer: #2e3440
- Type: judge
- Tolerance:
- Look in: [N/Nord](./N/Nord.md)

ghostty/Nord: background = #2e3440.

### Question: th-lookup-2

- Tier: Lookup
- Ask: In Dracula, what colour is a terminal's colour 4, its blue?
- Answer: #bd93f9
- Type: judge
- Tolerance:
- Look in: [D/Dracula](./D/Dracula.md)

ghostty/Dracula: palette = 4=#bd93f9.

### Question: th-lookup-3

- Tier: Lookup
- Ask: Under what licence is Tokyo Night's own project published?
- Answer: Apache-2.0
- Type: judge
- Tolerance:
- Look in: [T/TokyoNight](./T/TokyoNight.md)

licences.md: TokyoNight, folke's Tokyo Night, Apache-2.0.

### Question: th-page-1

- Tier: Page
- Ask: How many themes have names beginning with S, and how many of those are light?
- Answer: 103 themes, 27 of them light
- Type: judge
- Tolerance:
- Look in: [S](./S.md)

ghostty/ files beginning S or s: 103; light 27, dark 76.

### Question: th-across-1

- Tier: Across
- Ask: How many of the book's themes are dark?
- Answer: 634
- Type: number
- Tolerance: 0
- Look in: [A](./A.md); [B](./B.md); [C](./C.md)

634 of 816 dark, 182 light.

### Question: th-across-2

- Tier: Across
- Ask: Which theme's text reads worst on its own background, and what is its contrast ratio?
- Answer: Darkermatrix, 1.89
- Type: judge
- Tolerance:
- Look in: [A](./A.md); [B](./B.md); [C](./C.md)

Darkermatrix: foreground #35451a on background #070c0e, contrast 1.89.

### Question: th-across-3

- Tier: Across
- Ask: How many themes ship with cards.md by default?
- Answer: 52
- Type: number
- Tolerance: 0
- Look in: [README](./README.md)

licences.md names 52 themes.

### Question: th-across-4

- Tier: Across
- Ask: How many themes use the very same colour for all eight of their bright colours as for the normal ones?
- Answer: 6
- Type: number
- Tolerance: 0
- Look in: [A](./A.md); [B](./B.md); [C](./C.md)

6 themes: GitLab Light, Hot Dog Stand, Material Ocean, Subliminal, Whimsy, hazyland.

### Question: th-across-5

- Tier: Across
- Ask: Which of the themes that ship by default has the most readable text, and what is its contrast?
- Answer: GitHub Light High Contrast, 18.91
- Type: judge
- Tolerance:
- Look in: [README](./README.md)

Of the 52 shipped: GitHub Light High Contrast, foreground #0e1116 on #ffffff, contrast 18.91.

### Question: th-gap-1

- Tier: Gap
- Ask: What font does the Nord theme use?
- Answer: the book does not say
- Type: none
- Tolerance:
- Look in:

A theme gives colours only.

### Question: th-gap-2

- Tier: Gap
- Ask: In what year was the Dracula theme first published?
- Answer: the book does not say
- Type: none
- Tolerance:
- Look in:

Neither the theme nor upstream's credits give a date.

### Question: th-analysis-1

- Tier: Analysis
- Ask: Do light themes read better than dark ones? Compare their median text contrast.
- Answer: Yes: light themes' median contrast is 12.61, dark themes' 12.01
- Type: judge
- Tolerance:
- Look in: [A](./A.md); [B](./B.md); [C](./C.md)

Medians of foreground on background: light 12.61 (182 themes), dark 12.01 (634).
