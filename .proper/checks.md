# Checks

Each record here with a sql block is a check, asked at every gather. They
travel with the book (the rest of .proper/ does not).

## Check: The source within its window

- Done when: Source.md's As of, plus its Fresh for, is not past today: upstream was fetched recently enough to trust the book is current (gap 8a, the person, 10-19). Past it: fetch upstream, rerun the importer.

```sql
select count(*) = 0 from Source
where cast("As of" as date) + cast(regexp_extract("Fresh for", '\d+') as int) < today()
```
