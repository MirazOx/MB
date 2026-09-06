# Masum Billah — portfolio

A static portfolio site for journalist Masum Billah. House style: Literata +
Public Sans + JetBrains Mono, a sober cool-grey palette with a single deep-navy
accent, kept in a light, pastel key.

## Pages
- `index.html` — landing: name + photo banner, "See my work", and a floating
  "Work appeared in" logo wall.
- `work.html` — the stories he's proudest of, a clickable **beat strip**, then
  the full searchable/filterable archive (search + beat + outlet + year + sort).
- `beat-<id>.html` — one page per beat (migration, climate, economy, politics,
  geopolitics, society): a lead story plus highlights in that beat.
- `fellowships.html` — fellowships, training, and awards.
- `beyond.html` — notes / quick blog posts.
- `about.html` — wide cover photo, bio, and profile columns (expertise,
  accolades, education, languages, links).

## Editing content
All content is in **`src/data.mjs`** (bio, contact, outlets, beats, curated
articles, awards, fellowships, expertise, education, Beyond posts). Edit it,
then regenerate every page:

```bash
node src/build.mjs
```

### The archive (his full body of work)
The archive is built from **`src/scraped.json`** (his author pages) merged with
the curated articles. To refresh after he publishes more:

```bash
node src/scrape.mjs           # re-scrape TBS + Al Jazeera author archives
node src/fetch-images.mjs     # (curated only) resolve source banners
node src/download-images.mjs  # (curated only) localise them to assets/banners/
node src/build.mjs
```

Archive thumbnails are the **live** banner from each source (hotlinked); curated
highlights use locally-saved copies. Anything that blocks hotlinking falls back
to a labelled tile.

### Beats
Each article is filed into a beat by a keyword classifier — the `kw` arrays on
each beat in `src/data.mjs`. Add keywords there to re-file stories, then rebuild.

## Preview & deploy
```bash
python3 -m http.server 4599   # then open http://localhost:4599/
```
Plain static files — deploy by dropping the folder on Netlify, Vercel, or GitHub
Pages.

## Assets
- `assets/masum-billah.png` — landing portrait
- `assets/masum-cover.jpg` — About cover
- `assets/banners/` — localised highlight banners
- `assets/logos/` — publication logo marks
