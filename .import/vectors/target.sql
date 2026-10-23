-- V3: what proper gathers, checked against what the importer wrote and read
-- (.import/counts.json) and against the rules (SPEC B, K). Each check: a
-- name, what it should give ({x} read from counts.json), and one query
-- giving one value. Played by .import/target.js with `proper query`.

-- name: B3 the keys of Theme
-- want: Dark, Background, Foreground, Cursor, Cursor text, Selection, Selection text, Contrast, Same brights, Licence, Licence from, Default, Featured, Credit, Made from
select string_agg(column_name, ', ' order by ordinal_position) from information_schema.columns
where table_name = 'Theme' and column_name not in ('name', '_file', '_line', '_end_line');

-- name: B4 the head of the palette, the same in every theme
-- want: Index, Name, Colour
select string_agg(column_name, ', ' order by ordinal_position) from information_schema.columns
where table_name = 'Theme_Palette' and column_name not in ('record', '_file', '_line', '_end_line');

-- name: K5 a theme a record, every upstream theme and ours
-- want: {themes}
select count(distinct name) from Theme;

-- name: the themes, as many pages as records
-- want: {themes}
select count(distinct _file) from Theme;

-- name: sixteen colours a theme, every theme
-- want: {palette_rows} / 0
select (select count(*) from Theme_Palette) || ' / ' ||
  (select count(*) from (select _file from Theme_Palette group by _file having count(*) <> 16 or count(distinct Index) <> 16));

-- name: the palette's index runs 0 to 15
-- want: 0-15
select min(Index) || '-' || max(Index) from Theme_Palette;

-- name: dark and light, as the importer counted
-- want: {dark} / {light}
select count(*) filter (where Dark = 'yes') || ' / ' || count(*) filter (where Dark = 'no') from Theme;

-- name: the themes default (licence known), and each a licence named
-- want: {default} / {default}
select count(*) filter (where "Default" = 'yes') || ' / ' || count(*) filter (where "Default" = 'yes' and Licence <> 'unstated') from Theme;

-- name: the featured themes, as the importer counted, each default too
-- want: {featured} / 0
select count(*) filter (where Featured = 'yes') || ' / ' || count(*) filter (where Featured = 'yes' and "Default" <> 'yes') from Theme;

-- name: the themes upstream credits
-- want: {credited}
select count(*) from Theme where coalesce(Credit, '') <> '';

-- name: B7 every theme listed on its folder's page, once
-- want: {folders} / {themes}
select (select count(*) from Initial) || ' / ' || (select count(*) from Initial_Themes);

-- name: B9 the FAQ's questions
-- want: {faq.questions}
select count(*) from Question;

-- name: R1 the spine, a chapter a question, each asking it
-- want: {chapters} / {chapters}
select count(*) || ' / ' || count(*) filter (where coalesce(Ask, '') <> '') from Chapter;

-- name: a colour gathered as its text, the code span's backticks gone
-- want: #2e3440
select Background from Theme where name = 'Nord';
