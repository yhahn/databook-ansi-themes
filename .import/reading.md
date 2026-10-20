# A reader's way in: databook-ansi-themes

The questions a stranger asks first of this book, and what its data
points to (SPEC R2, R3). Written by hand, and only added to, as faq.md
is: a question or finding changed is a new one, under a new id.

The spine is the question (DECISIONS.md, "The spine"): the front page,
README.md, asks the four big ones and says what the data points to;
a chapter a question, `chapters/<Chapter>.md`, goes deeper, its themes
set side by side. The letter folders stay as the index: a theme found
by its name.

Each record names its page and how it is worked out (Measure). Its
words (Answer, or Says for a finding) are filled by the importer from
upstream's files at every release, by `.import/reading.js`: `{name}` is
a value it reckons; `{name:t}` a theme's name, or several, each linked
to its page; `{name:c}` a colour, written as code so its swatch is
drawn; `{name:%}` a whole percent; `{name:,}` with its thousands
marked; `{name:s}` sets of themes, each listed and linked, split by ";". A value that is a list is written "a, b and c". Turns on names
the values whose change on a rerun warns `finding-turned` (a leader
replaced, a lead lost): news, or a fault. FAQ names the question in
faq.md that asks the same of the source, and Holds which values must
agree with its answer (`value=key` of faq.js's answer); faq.js warns
`page-drifted` where they do not, or where the page does not say them.

Words used alike everywhere: a theme reads well where its text's
contrast on its own background is 4.5 or more (WCAG's AA for body
text), very well at 7 (AAA); a colour of its palette is faint where
its contrast on that background is under 3 (WCAG's least, for large
text and marks). Lightness is OKLab's L, 0% black and 100% white: an
even step of it looks an even step to the eye, as WCAG's luminance
does not. Two themes are alike where their eighteen colours (the
background, the text and the sixteen) lie, on the average, under 0.01
apart in OKLab, half the step an eye is commonly held to see (0.02); copies where all
eighteen are the very same.

## What the data points to (the front page)

### Finding: dark-rules
- Page: README.md
- Says: Most themes are dark: {dark:,} of {themes:,}, {dark_pct:%}.
- Measure: dark where white text reads better on the background than black (WCAG), as the Theme's Dark
- Turns on: most

### Finding: ends
- Page: README.md
- Says: Backgrounds keep to the ends: only {mid} of them lie between 40% and 90% lightness; a theme is dark, or near white.
- Measure: the OKLab lightness of each background; those from 40% up to 90%
- Turns on: mid_few

### Finding: reads
- Page: README.md
- Says: Nearly all read well: {good:,} of {themes:,} themes' text reads well on its own background, and the median theme's contrast is {median_c}, past AAA's 7. {lead_word} themes read better, the median {lead_med} against {lag_med}.
- Measure: the contrast of each theme's text on its own background; the median of all, and of the dark and the light apart
- Turns on: lead_word

### Finding: faint
- Page: README.md
- Says: Their faint colour is grey: colour 8, bright black, the grey many programs write hints and comments in, is faint on its own background in {bb_faint:,} themes; of the six hues, {weak_hue} is faint most often, in {weak_hue_n}.
- Measure: for each theme, each of its sixteen colours' contrast on its background; colour 8, and of colours 1 to 6 the one under 3 in the most themes
- Turns on: weak_hue

### Finding: copies
- Page: README.md
- Says: Many are near copies: {family_themes} themes fall into {families} families of themes alike, and {copy_themes} are copies of another, colour for colour.
- Measure: as alike above; families joined where any two are alike
- Turns on: copy_themes

## The front page (README.md)

### Question: front-dark
- Page: README.md
- Ask: How many themes are dark?
- Answer: {dark:,} of the {themes:,} themes are dark and {light:,} light. Their backgrounds keep to the ends: {low} are darker than 40% lightness and {high} lighter than 90%, and only {mid} lie between. Pure black is the commonest background ({black_bg} themes), pure white the next ({white_bg}).
- Measure: Dark as the Theme's; each background's OKLab lightness, in tenths; the backgrounds counted alike
- Picture: bars, a tenth of lightness a bar, the themes whose background lies in it
- Turns on: most
- FAQ: th-across-1
- FAQ page: README.md
- Holds: dark=dark

### Question: front-reads
- Page: README.md
- Ask: Which themes read best, and which worst?
- Answer: {good:,} of the {themes:,} themes' text reads well on its background, {very:,} very well; {poor} fall short of 4.5. {best_n} reach {best_v}, as far as contrast goes; worst is {worst:t}, at {worst_v}. Of the {def_n} that ship with cards.md by default, {def_best:t} reads best, at {def_best_v}.
- Measure: the contrast of each theme's text on its background; the greatest and least, ties kept; the same over the themes shipped by default
- Picture: bars, the themes by their contrast, 4.5 and 7 marked; the best and worst, their colours drawn
- Turns on: best, worst
- FAQ: th-reading-1
- FAQ page: README.md
- Holds: good=good, very=very, poor=poor, best_n=best_n, best_v=best_v, worst=worst, worst_v=worst_v

### Question: front-faint
- Page: README.md
- Ask: Which of a theme's colours can hardly be seen?
- Answer: The grey: colour 8, bright black, is faint on its own background in {bb_faint:,} of the {themes:,} themes. Of the six hues, {weak_hue} is faint most often, in {weak_hue_n} themes, and {strong_hue} least, in {strong_hue_n}. In {all_clear:,} themes all twelve hues read clear.
- Measure: each theme's colours 1 to 6 and 9 to 14 (the hues) and 8 (bright black), their contrast on its background under 3
- Picture: bars, a colour a bar, the themes in which it is faint
- Turns on: weak_hue
- FAQ: th-reading-2
- FAQ page: README.md
- Holds: bb_faint=bright_black, weak_hue=hue, weak_hue_n=n

### Question: front-alike
- Page: README.md
- Ask: Which themes are alike?
- Answer: {pairs} pairs of themes are alike, in {families} families of {family_themes} themes; the largest is {largest:t}. {copy_themes} themes are copies of another, colour for colour: {copy_list:s}.
- Measure: as alike above; the families, joined where any two are alike, the largest by its themes, ties kept
- Picture: the copies, their colours drawn
- Turns on: copy_themes
- FAQ: th-reading-3
- FAQ page: README.md
- Holds: pairs=pairs, families=families, copy_themes=copies

## Dark or light (chapters/Dark or light.md)

### Question: dl-count
- Page: chapters/Dark or light.md
- Ask: How many themes are dark, and how dark?
- Answer: {dark:,} of the {themes:,} are dark, {dark_pct:%}. The median dark background is {dark_l:%} light; the median light one {light_l:%}.
- Measure: Dark as the Theme's; the median OKLab lightness of the dark backgrounds, and of the light
- Picture: bars, a tenth of lightness a bar
- Turns on: most
- FAQ: th-across-1
- FAQ page: chapters/Dark or light.md
- Holds: dark=dark

### Question: dl-common
- Page: chapters/Dark or light.md
- Ask: Which backgrounds are commonest?
- Answer: Pure black, {black:c}, is the background of {black_bg} themes, and pure white, {white:c}, of {white_bg}; next come {next_bg:c}, {next_bg_n} each. {own_bg:,} themes have a background no other has.
- Measure: the backgrounds counted alike; those of one theme only
- Picture: the commonest twelve, each drawn, with how many have it
- Turns on: next_bg
- FAQ: th-reading-4
- FAQ page: chapters/Dark or light.md
- Holds: black_bg=black, white_bg=white, own_bg=unique

### Question: dl-middle
- Page: chapters/Dark or light.md
- Ask: Do any lie between dark and light?
- Answer: Few: {mid} of the {themes:,} backgrounds lie between 40% and 90% lightness. The lightest dark one is {lightest_dark:t}'s, at {lightest_dark_l:%}; the darkest light one {darkest_light:t}'s, at {darkest_light_l:%}.
- Measure: the OKLab lightness of each background; of the dark, the greatest, and of the light, the least
- Picture: the middle's themes, their colours drawn
- Turns on: lightest_dark, darkest_light
- FAQ: th-reading-5
- FAQ page: chapters/Dark or light.md
- Holds: mid=mid

## Contrast (chapters/Contrast.md)

### Question: ct-well
- Page: chapters/Contrast.md
- Ask: How many themes read well?
- Answer: {good:,} of the {themes:,} read well (4.5 or more) and {very:,} very well (7 or more); {poor} fall short. The median theme's contrast is {median_c}.
- Measure: the contrast of each theme's text on its background, against 4.5 and 7
- Picture: bars, the themes by their contrast, 4.5 and 7 marked
- Turns on: poor_some
- FAQ: th-reading-1
- FAQ page: chapters/Contrast.md
- Holds: good=good, very=very, poor=poor

### Question: ct-dark-light
- Page: chapters/Contrast.md
- Ask: Do light themes read better than dark ones?
- Answer: {lead_yes}: the median light theme's contrast is {light_med}, the median dark one's {dark_med}. Of the {poor} that fall short, {poor_dark} are dark.
- Measure: the median contrast of the light themes and of the dark; the dark among those under 4.5
- Picture: the worst, their colours drawn
- Turns on: lead_word
- FAQ: th-analysis-1
- FAQ page: chapters/Contrast.md
- Holds: light_med=light, dark_med=dark

### Question: ct-default
- Page: chapters/Contrast.md
- Ask: Of the themes that ship by default, which read best?
- Answer: Of the {def_n} that ship with cards.md by default, {def_best:t} reads best, at {def_best_v}, and {def_worst:t} least, at {def_worst_v}; {def_poor} of them fall short of 4.5.
- Measure: the themes named in licences.md, by their contrast
- Picture: the defaults ranked, their colours drawn
- Turns on: def_best
- FAQ: th-across-5
- FAQ page: chapters/Contrast.md
- Holds: def_best=name, def_best_v=value

## Palettes (chapters/Palettes.md)

### Question: pl-faint
- Page: chapters/Palettes.md
- Ask: Which colours are faint on their own background?
- Answer: Colour 8, bright black, is faint in {bb_faint:,} of the {themes:,} themes, and colour 0, black, in {black_faint:,}: a dark theme's black is near its background, as a light one's white is. Of the six hues, {weak_hue} is faint most often ({weak_hue_n} themes) and {strong_hue} least ({strong_hue_n}).
- Measure: each theme's sixteen colours, their contrast on its background under 3
- Picture: bars, a colour a bar, normal and bright on one scale
- Turns on: weak_hue
- FAQ: th-reading-2
- FAQ page: chapters/Palettes.md
- Holds: bb_faint=bright_black, weak_hue=hue, weak_hue_n=n

### Question: pl-blue
- Page: chapters/Palettes.md
- Ask: In which themes is blue hardest to see?
- Answer: Blue, colour 4, is faint in {blue_faint} themes, {blue_faint_dark} of them dark: a dark blue on a dark ground. Faintest is {blue_worst:t}'s, at {blue_worst_v}.
- Measure: colour 4's contrast on the background, under 3; the least, ties kept
- Picture: the faintest ten, background and blue drawn
- Turns on: blue_worst
- FAQ: th-reading-6
- FAQ page: chapters/Palettes.md
- Holds: blue_faint=n, blue_faint_dark=dark

### Question: pl-brights
- Page: chapters/Palettes.md
- Ask: Do the bright colours differ from the normal ones?
- Answer: In {brights_all:,} themes all eight bright colours differ from their normal ones; in {brights_none} none do. {few_colours:,} themes use fewer than sixteen different colours in their palette.
- Measure: colours 8 to 15 against 0 to 7, each the very same or not; the different colours of the sixteen
- Picture: the defaults' palettes, a theme a row
- Turns on: brights_most
- FAQ: th-across-4
- FAQ page: chapters/Palettes.md
- Holds: brights_none=n

## Alike (chapters/Alike.md)

### Question: al-copies
- Page: chapters/Alike.md
- Ask: Which themes are copies of another?
- Answer: {copy_themes} themes, in {copy_groups} sets, have the very same eighteen colours: {copy_list:s}. Their names differ; their colours do not.
- Measure: the background, the text and the sixteen, all equal
- Picture: the copies, their colours drawn
- Turns on: copy_themes
- FAQ: th-reading-3
- FAQ page: chapters/Alike.md
- Holds: copy_themes=copies

### Question: al-families
- Page: chapters/Alike.md
- Ask: Which themes are alike?
- Answer: {pairs} pairs of themes are alike, joining {family_themes} themes into {families} families; the largest, of {largest_n}, is {largest:t}.
- Measure: as alike above; families joined where any two are alike
- Picture: the families, each theme's background drawn
- Turns on: largest
- FAQ: th-reading-3
- FAQ page: chapters/Alike.md
- Holds: pairs=pairs, families=families

### Question: al-nearest
- Page: chapters/Alike.md
- Ask: Which two different themes are nearest?
- Answer: Of the pairs not copies, {near_a:t} and {near_b:t} are nearest, {near_d} apart.
- Measure: the least distance above 0
- Picture: the twenty nearest pairs, their backgrounds drawn
- Turns on: near_a
