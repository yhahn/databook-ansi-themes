# Our own themes

A theme of our own, or our fix to one of upstream's, is a file here in the
book's own page shape: `# Theme: <name>`, its rows (`- Background:
#rrggbb` and the rest, as any page in the book), and its `## Palette`
table of sixteen. `node .import/import.js` checks it as it checks
upstream's and writes it as a page; one named as an upstream theme takes
its place, and its page's Made from says so. Its Licence is read from
`.import/licences.md`, as every theme's is.
