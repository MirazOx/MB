# Masum Billah — portfolio

A static portfolio site for journalist Masum Billah. Design language borrowed
from the house style (Literata + Public Sans + JetBrains Mono, sober cool‑grey
palette with a single deep‑navy accent), tuned to a light, pastel key.

## Pages
- `index.html` — landing: name + photo banner, "See my work" button, and a
  "Work appeared in" logo wall.
- `work.html` — selected work, filed by beat, with source banners. A button at
  the bottom leads to the full archive.
- `archive.html` — the complete, searchable/filterable archive (not in the top
  nav; reached from the Work page).
- `about.html` — bio, a ledger of facts, awards, fellowships, and where the
  work runs.

## Editing content
All content lives in **`src/data.mjs`** (bio, beats, articles, awards,
fellowships, outlets). Edit it, then regenerate the HTML:

```bash
node src/build.mjs
```

### Article banners
Each story shows the banner image from its original article. To (re)fetch and
localise banners after adding articles:

```bash
node src/fetch-images.mjs     # resolves each article's og:image -> src/images.json
node src/download-images.mjs  # downloads them to assets/banners/ -> src/banners.json
node src/build.mjs            # rebuild
```

Stories whose source blocks image access fall back to a labelled tile.

## Preview locally
Any static server works, e.g.:

```bash
python3 -m http.server 4599
```

then open http://localhost:4599/ .

## Deploy
It is plain static files — drop the folder on Netlify, Vercel, or GitHub Pages.
No build step is required at deploy time (the HTML is already generated).

## Assets
- `assets/masum-billah.png` — portrait
- `assets/banners/` — localised article banners
- `assets/logos/` — publication logo marks
