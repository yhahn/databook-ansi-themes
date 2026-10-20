// The README, the importer's (SPEC B6): what the book holds, how it is laid
// out and keyed, queries that run (target.js plays each), how cards.md reads
// it, its source and its terms, and how to make it again. Written for a
// stranger: no path of the maker's machine is in it.

const fs = require('node:fs');
const path = require('node:path');

const REPO = path.resolve(__dirname, '..');

function write(c, folders, reading) {
  const chapters = reading.chapters.map(n => `[${n}](./chapters/${encodeURIComponent(n)}.md)`).join(', ');
  const faqN = (fs.readFileSync(path.join(__dirname, 'faq.md'), 'utf8').match(/^### Question: /gm) || []).length;
  const text = `# Terminal colour themes: iTerm2-Color-Schemes' ${c.themes}, as of ${c.date}

Every terminal colour theme in [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes), the catalog Ghostty's own themes come from, a page a theme: its background, text, cursor and selection colours, and the sixteen colours a terminal names 0 to 15, each drawn beside its hex. ${c.dark} are dark and ${c.light} light. Each says how well its text reads on its background, who upstream credits for it, and its licence where its own project states one.

The book is also where cards.md's colour themes come from: a \`.cards/config.md\` that says \`- theme: Nord\` means these colours on the desk, the phone and the web alike. The ${c.default} themes whose own licence is known ship with them by default.

${reading.markdown}

## Questions and answers

[Questions and answers](./FAQ.md): ${faqN} questions a reader of this book can answer, from one theme's blue to which themes are alike, each with its answer and the page to look in. Every number on this page and the chapters' is worked out afresh from upstream's files at each release, and checked against the FAQ's own answers.

## How it is laid out

By question, then by name. Four chapters, in \`chapters/\`, each ask one question across every theme and set the themes side by side: ${chapters}. Then the index: a folder an initial (${folders.join(', ')}), a page a theme, named as upstream names it; each folder's page beside it (\`N.md\` beside \`N/\`) lists its themes with their background, text, contrast and licence. \`themes.json\`, at the root, holds the same themes for a program, written by the same run as the pages. \`Source.md\` is the source record: the upstream commit the book was read from, the day it was fetched, how long that stays fresh, and git's hash of the folder; a check in \`.proper/checks.md\` says when the window has passed.

## Keys

- \`# Theme: <name>\`, one a page, keyed by upstream's name (its file name in \`ghostty/\`). Its rows: Dark (yes when white text reads better on its background than black), Background, Foreground, Cursor, Cursor text, Selection, Selection text (each \`#rrggbb\`), Contrast (its text against its background, WCAG's ratio: 4.5 reads well, 7 very well), Same brights (how many of its eight bright colours are the same as their normal ones), Licence and Licence from (where its project states it; "unstated" otherwise), Default (yes when it ships with cards.md by default), Credit (upstream's own words for it, in its CREDITS.md, where one paragraph names it), Made from (the upstream file, at the commit read).
- \`## Palette\`, under each theme, gathered as \`Theme_Palette\`: Index (0 to 15, as every terminal's configuration names them), Name (Black to Bright White), Colour.
- \`# Initial: <letter>\`, a folder's page, its listing gathered as \`Initial_Themes\`.

- \`# Chapter: <name>\`, a chapter's page, its one row its question (Ask); each of its tables gathered by its heading (\`Chapter_The_best_read\`).

A colour is written as a code span, so cards.md draws its swatch beside it; proper gathers it as its text:

\`\`\`sql
select name from Theme where Background = '#2e3440'
\`\`\`

## Queries

The dark themes that ship by default, the most readable first:

\`\`\`sql
select name, Background, Foreground, Contrast from Theme
where Dark = 'yes' and "Default" = 'yes' order by Contrast desc
\`\`\`

Nord's sixteen colours:

\`\`\`sql
select p.Index, p.Name, p.Colour from Theme_Palette p join Theme t using (_file)
where t.name = 'Nord' order by p.Index
\`\`\`

How many themes each licence covers:

\`\`\`sql
select Licence, count(*) as themes from Theme group by Licence order by themes desc
\`\`\`

The themes whose text reads worst on their own background:

\`\`\`sql
select name, Dark, Contrast from Theme order by Contrast limit 10
\`\`\`

## Its source and its terms

[iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes), kept by Mark Badolato and its contributors, its \`ghostty/\` folder at commit \`${c.commit.slice(0, 12)}\` (${c.date}). Its LICENSE, kept here as LICENSE: "MIT License, Copyright (c) 2011 to Present Mark Badolato ... This license covers the iTerm-Color-Schemes repository collection of themes. The copyright/license for each individual theme belongs to the author of that theme." So this book claims nothing of the themes: each is its author's, credited as upstream credits it. A theme's Licence is filled only where its own project states one, checked by hand against that project (\`.import/licences.md\`); the rest are "unstated", and are in the book, not shipped by default.

## Licence

Two parts ([LICENSE](LICENSE)). The themes are upstream's, under its MIT notice, each its author's as above. Our own work, the importer and the pages' words, is given to the public domain under CC0 1.0: copy it, change it and use it as you like, without asking.

## Our own themes

A theme of our own, or our fix to one of upstream's, is a page in this book's shape in \`.import/ours/\`; the importer checks it as it checks upstream's and writes it beside them (or in place of upstream's of the same name, its Made from saying so). ${c.ours ? `There are ${c.ours}.` : 'There are none yet.'} A fix to upstream's theme is best sent upstream too.

## Making it again

\`\`\`sh
git clone --depth 1 --filter=blob:none --sparse https://github.com/mbadolato/iTerm2-Color-Schemes.git ~/.cache/proper/themes/upstream
git -C ~/.cache/proper/themes/upstream sparse-checkout set ghostty
node .import/import.js     # the pages, the chapters, themes.json, README.md, LICENSE
node .import/faq.js        # FAQ.md, its answers from upstream's files (the importer runs it too, warn-only)
node --test .import/import.test.js   # the importer's vectors
node .import/target.js     # what proper gathers, against the counts
\`\`\`

A new edition is upstream pulled and the importer run again; the diff is the news. The questions and findings on this page and the chapters are written by hand in \`.import/reading.md\`, their numbers filled at every build: a finding that turns (a leader replaced, a lead lost) is warned of, \`finding-turned\`, and a number that differs from the FAQ's own answer, worked out apart from upstream's files, stops the build, \`page-drifted\`.

## Changes

The first edition (${c.date}). At each edition the importer compares upstream with the last: a theme gone while another appears with the very same colours is a rename, its old name kept in themes.json's \`aliases\` (old to new, carried forward) so a config naming it still resolves; a theme gone otherwise is listed in \`removed\`. Each is a record in Changes.md. ${c.renamed || c.removed ? `So far: ${c.renamed} renamed, ${c.removed} removed.` : 'None yet.'}
`;
  fs.writeFileSync(path.join(REPO, 'README.md'), text);
}

module.exports = { write };
