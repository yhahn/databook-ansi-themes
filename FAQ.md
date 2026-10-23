# Questions and answers

20 questions a careful reader of this book can answer, from the plainest (one theme's colour) to the hardest (whether light themes read better than dark), each with its answer and the page to look in. Read a question, open the page, and find the answer yourself; or put the questions to a reader or an agent with this page hidden, and mark what comes back. Where the book cannot answer, the right answer is to say so. The answers are worked out afresh from upstream's own files at every release, not copied from the pages: where the two disagree, one is wrong.

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
- Ask: How many themes are default, their own project's licence known (the ones licences.md names)?
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
- Ask: Which of the default themes (licence known) has the most readable text, and what is its contrast?
- Answer: GitHub Light High Contrast, 18.91
- Type: judge
- Tolerance:
- Look in: [README](./README.md)

Of the 52 with a known licence: GitHub Light High Contrast, foreground #0e1116 on #ffffff, contrast 18.91.

### Question: th-across-6

- Tier: Across
- Ask: How many themes are featured, the short list that ships with cards.md?
- Answer: 28
- Type: number
- Tolerance: 0
- Look in: [README](./README.md)

featured.md names 28 themes.

### Question: th-across-7

- Tier: Across
- Ask: Which of the featured themes has the most readable text, and what is its contrast?
- Answer: GitHub Light High Contrast, 18.91
- Type: judge
- Tolerance:
- Look in: [README](./README.md)

Of the 28 featured: GitHub Light High Contrast, foreground #0e1116 on #ffffff, contrast 18.91.

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

### Question: th-reading-1

- Tier: Across
- Ask: How many themes' text reads well on its own background (contrast 4.5 or more), how many very well (7 or more), and how many fall short? How many reach the greatest contrast, and which reads worst?
- Answer: 791 read well, 724 very well, 25 fall short; 29 reach 21.00; worst Darkermatrix, 1.89
- Type: judge
- Tolerance:
- Look in: [README](./README.md); [chapters/Contrast](./chapters/Contrast.md)

Contrast of foreground on background, 816 themes: 4.5 or more 791, 7 or more 724, under 4.5 25; the greatest 21.00 (29 themes), the least 1.89.

### Question: th-reading-2

- Tier: Across
- Ask: Of the six hues (colours 1 to 6), which is faint, under 3 on its theme's own background, in the most themes, and in how many? In how many is colour 8, bright black, faint?
- Answer: red, in 94 themes; bright black in 392
- Type: judge
- Tolerance:
- Look in: [README](./README.md); [chapters/Palettes](./chapters/Palettes.md)

Palette 1-6 under 3 on the background: red 94, green 50, yellow 76, blue 92, magenta 84, cyan 68; palette 8 392.

### Question: th-reading-3

- Tier: Analysis
- Ask: How many pairs of themes are alike, their eighteen colours (background, text and palette) under 0.01 apart on the average in OKLab? Into how many families do they fall, and how many themes are copies of another, colour for colour?
- Answer: 84 pairs, 36 families; 5 copies
- Type: judge
- Tolerance:
- Look in: [README](./README.md); [chapters/Alike](./chapters/Alike.md)

Of 332520 pairs, 84 under 0.01 on the average of their eighteen OKLab distances; 95 themes in 36 families; 5 themes share all eighteen colours with another.

### Question: th-reading-4

- Tier: Across
- Ask: How many themes have a pure black background, how many pure white, and how many backgrounds belong to one theme only?
- Answer: black 53, white 33; 531 backgrounds of one theme
- Type: judge
- Tolerance:
- Look in: [chapters/Dark or light](./chapters/Dark%20or%20light.md)

599 different backgrounds over 816 themes.

### Question: th-reading-5

- Tier: Across
- Ask: How many themes have a background between 40% and 90% lightness, in OKLab?
- Answer: 23
- Type: number
- Tolerance: 0
- Look in: [README](./README.md); [chapters/Dark or light](./chapters/Dark%20or%20light.md)

OKLab L of each background, from 0.4 up to 0.9: 23.

### Question: th-reading-6

- Tier: Across
- Ask: In how many themes is blue, colour 4, faint (under 3) on its own background, and how many of those are dark?
- Answer: 92, 75 of them dark
- Type: judge
- Tolerance:
- Look in: [chapters/Palettes](./chapters/Palettes.md)

Palette 4 under 3 on the background: 92; dark 75, light 17.
