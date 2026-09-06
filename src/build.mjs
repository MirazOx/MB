// Build the static site from src/data.mjs → index.html, work.html, about.html,
// archive.html. Run: node src/build.mjs
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { site, outlets, publications, beats, articles, awards, fellowships, path as career, facts } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const banners = existsSync(join(HERE, "banners.json"))
  ? JSON.parse(readFileSync(join(HERE, "banners.json"), "utf8"))
  : {};

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s = "") => esc(s).replace(/"/g, "&quot;");
const arw = '<span class="arw" aria-hidden="true">↗</span>';
const arwR = '<span class="arw" aria-hidden="true">→</span>';

const beatName = (id) => beats.find((b) => b.id === id)?.name ?? id;
const beatIndex = (id) => String(beats.findIndex((b) => b.id === id) + 1).padStart(2, "0");
const byYear = (x, y) => Number(y.year) - Number(x.year);
const inBeat = (id) => articles.filter((a) => a.beat === id).sort(byYear);
// Highlights per beat: featured first, then newest, capped.
const highlightsFor = (id, n = 4) => {
  const list = inBeat(id);
  return [...list.filter((a) => a.featured), ...list.filter((a) => !a.featured)].slice(0, n);
};
const featured = articles.filter((a) => a.featured);

const shortOutlet = (pub) => {
  const o = outlets.find((x) => x.name === pub);
  if (o?.short) return o.short;
  return (
    { "The Business Standard": "TBS", "South China Morning Post": "SCMP", "Al Jazeera English": "Al Jazeera", "Energy Institute": "Energy Inst." }[pub] || pub
  );
};

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1b2430"/><text x="50%" y="52%" dy=".02em" text-anchor="middle" dominant-baseline="middle" font-family="Georgia,serif" font-size="34" fill="#eef2f6">M<tspan fill="#8ab4f8">.</tspan></text></svg>`
  );

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Journalist",
  description: site.tagline,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  email: "mailto:" + site.contact.email,
  knowsLanguage: ["English", "Bengali"],
  sameAs: [site.contact.twitter.url, site.contact.linkedin.url, site.contact.portfolio.url],
};

function head(title, desc, current) {
  const nav = (p, label) => `<a href="${p}"${current === p ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(desc)}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${favicon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,400;1,7..72,500&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<a href="#main" class="skip">Skip to content</a>
<div class="topline"><div class="wrap">
  <span>${esc(site.title)}</span>
  <span class="live"><span id="clock" data-tz="Asia/Dhaka">Dhaka</span></span>
</div></div>
<header class="masthead"><div class="wrap">
  <a class="wordmark" href="index.html"><b>Masum Billah</b><small>Journalist</small></a>
  <nav class="nav">
    ${nav("work.html", "Work")}
    ${nav("about.html", "About")}
    <a class="pill" href="about.html#contact">Get in touch</a>
  </nav>
</div></header>
<main id="main">`;
}

function contactBand() {
  const c = site.contact;
  const chan = (k, v, href, ext = true) =>
    `<a href="${attr(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}><span class="k">${esc(k)}</span><span class="v">${esc(v)} ${arw}</span></a>`;
  return `<section class="contact" id="contact">
  <div class="wrap reveal">
    <p class="eyebrow">Get in touch</p>
    <h2 class="display">Tips, commissions, <em>and conversations.</em></h2>
    <p class="sub">Open to freelance commissions, collaboration on cross-border investigations, and speaking on migration, climate, and the Bangladeshi press.</p>
    <div class="channels">
      ${chan("Email", c.email, "mailto:" + c.email, false)}
      ${chan("X / Twitter", c.twitter.handle, c.twitter.url)}
      ${chan("LinkedIn", "Masum Billah", c.linkedin.url)}
      ${chan("Story archive", "All published work", c.portfolio.url)}
    </div>
    <p class="tipnote">Working on something sensitive? Email first and we can arrange an encrypted channel before you share anything.</p>
  </div>
</section>`;
}

function foot() {
  const year = new Date().getFullYear();
  return `${contactBand()}
<footer class="footer"><div class="wrap">
  <span class="fm">Masum Billah</span>
  <nav>
    <a href="work.html">Work</a>
    <a href="archive.html">Archive</a>
    <a href="about.html">About</a>
    <a href="${site.contact.twitter.url}" target="_blank" rel="noopener">X</a>
    <a href="${site.contact.linkedin.url}" target="_blank" rel="noopener">LinkedIn</a>
  </nav>
  <small>© ${year} Masum Billah · Dhaka</small>
</div></footer>
<script src="main.js"></script>
</body>
</html>`;
}

// --- Banner thumbnail -------------------------------------------------------
function thumb(a) {
  const src = banners[a.url];
  const fb = `<span class="thumb-fb"${src ? " hidden" : ""}>${esc(shortOutlet(a.publication))}</span>`;
  const img = src
    ? `<img src="${attr(src)}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">`
    : "";
  return `<span class="thumb" data-beat="${a.beat}">${img}${fb}</span>`;
}

// --- Story row (with banner) ------------------------------------------------
function storyRow(a, { showBeat = false, excerpt = true } = {}) {
  return `<li class="story" data-beat="${a.beat}" data-year="${esc(a.year)}" data-outlet="${attr(a.publication)}" data-title="${attr(a.title.toLowerCase())}">
  <a href="${attr(a.url)}" target="_blank" rel="noopener">
    ${thumb(a)}
    <span class="st-body">
      <span class="st-top">
        <span class="pub">${esc(a.publication)}</span>
        <span class="yr">${esc(a.year)}</span>
      </span>
      <h4>${esc(a.title)}</h4>
      ${excerpt ? `<p class="st-ex">${esc(a.excerpt)}</p>` : ""}
      ${showBeat ? `<span class="st-tag">${esc(beatName(a.beat))}</span>` : ""}
    </span>
    ${arw}
  </a>
</li>`;
}

// ===========================================================================
// INDEX — name + photo banner, then "Work appeared in" logos
// ===========================================================================
function buildIndex() {
  const logos = outlets
    .map(
      (o) => `<li class="logo reveal">
      <img src="assets/logos/${o.logo}" alt="${attr(o.name)} logo" loading="lazy" onerror="this.style.visibility='hidden'">
      <span>${esc(o.name)}</span>
    </li>`
    )
    .join("\n");

  const body = `
<section class="banner"><div class="wrap banner-grid">
  <div class="banner-copy">
    <p class="eyebrow reveal">Journalist <span class="dot">·</span> Dhaka, Bangladesh</p>
    <h1 class="reveal d1">Masum<br><span class="ln2">Billah</span></h1>
    <p class="banner-sub reveal d2">${esc(site.tagline)}</p>
    <a class="btn btn--lg reveal d3" href="work.html">See my work ${arwR}</a>
  </div>
  <figure class="banner-photo reveal d2">
    <div class="frame"><img src="assets/masum-billah.png" alt="Masum Billah, photographed in Dhaka" width="1024" height="577"></div>
  </figure>
</div></section>

<section class="appeared"><div class="wrap">
  <div class="appeared-head reveal">
    <p class="eyebrow">Work appeared in</p>
    <p class="appeared-sub">National and international reporting across ${outlets.length} newsrooms.</p>
  </div>
  <ul class="logos">${logos}</ul>
</div></section>
`;
  return head("Masum Billah · Journalist, Dhaka", site.tagline, "index.html") + body + foot();
}

// ===========================================================================
// WORK — highlighted work by beat, then a button to the full archive
// ===========================================================================
function buildWork() {
  const chips =
    `<button class="chip" data-filter="all" aria-pressed="true">All beats</button>` +
    beats
      .map((b) => `<button class="chip" data-filter="${b.id}" aria-pressed="false">${esc(b.name)}</button>`)
      .join("");

  const sections = beats
    .map((b) => {
      const picks = highlightsFor(b.id, 4);
      const total = inBeat(b.id).length;
      const more =
        total > picks.length
          ? `<a class="beat-more" href="archive.html#${b.id}">${total - picks.length} more in the archive ${arwR}</a>`
          : "";
      const list = picks.map((a) => storyRow(a, { excerpt: true })).join("\n");
      return `<section class="beat-sec" id="${b.id}" data-beat="${b.id}">
  <div class="beat-head reveal">
    <span class="bnum">${beatIndex(b.id)}</span>
    <h2 class="display">${esc(b.name)}</h2>
    <p>${esc(b.blurb)}</p>
    <span class="bcount">${total} ${total === 1 ? "story" : "stories"}</span>
  </div>
  <ul class="stories">${list}</ul>
  ${more}
</section>`;
    })
    .join("\n");

  const body = `
<section class="page-head"><div class="wrap">
  <p class="eyebrow reveal">Selected work</p>
  <h1 class="display reveal d1">The work I'm proudest of.</h1>
  <p class="page-sub reveal d2">Highlights by beat, from a decade reporting Bangladesh. Each headline opens the original at its publication.</p>
</div></section>

<div class="filterbar"><div class="wrap"><div class="chips" role="group" aria-label="Filter beats">${chips}</div></div></div>

<div class="wrap" id="beats">
  ${sections}
</div>

<section class="archive-cta"><div class="wrap reveal">
  <div>
    <h2 class="display">Looking for everything?</h2>
    <p>Every published piece, searchable by outlet, beat, and year.</p>
  </div>
  <a class="btn btn--lg" href="archive.html">See all ${articles.length} pieces ${arwR}</a>
</div></section>
`;
  return head("Work · Masum Billah", "Selected work by Masum Billah, filed by beat: migration and trafficking, climate, politics, labour, and society.", "work.html") + body + foot();
}

// ===========================================================================
// ARCHIVE — full, searchable, filterable (not in the top nav)
// ===========================================================================
function buildArchive() {
  const all = [...articles].sort(byYear);
  const years = [...new Set(articles.map((a) => a.year))].sort().reverse();
  const outletNames = [...new Set(articles.map((a) => a.publication))].sort();

  const beatOpts = beats.map((b) => `<option value="${b.id}">${esc(b.name)}</option>`).join("");
  const outletOpts = outletNames.map((o) => `<option value="${attr(o)}">${esc(o)}</option>`).join("");
  const yearOpts = years.map((y) => `<option value="${esc(y)}">${esc(y)}</option>`).join("");

  const rows = all.map((a) => storyRow(a, { showBeat: true, excerpt: false })).join("\n");

  const body = `
<section class="page-head"><div class="wrap">
  <p class="eyebrow reveal"><a href="work.html" class="back">${"←"} Selected work</a></p>
  <h1 class="display reveal d1">The full archive.</h1>
  <p class="page-sub reveal d2">Every piece in this portfolio, ${articles.length} in all. Search by title or outlet, filter by beat, outlet and year, and sort by date.</p>
</div></section>

<div class="filterbar filterbar--archive"><div class="wrap">
  <div class="controls">
    <input type="search" id="q" class="search" placeholder="Search titles or outlets…" aria-label="Search stories" autocomplete="off">
    <select id="f-beat" aria-label="Filter by beat"><option value="">All beats</option>${beatOpts}</select>
    <select id="f-outlet" aria-label="Filter by outlet"><option value="">All outlets</option>${outletOpts}</select>
    <select id="f-year" aria-label="Filter by year"><option value="">All years</option>${yearOpts}</select>
    <select id="f-sort" aria-label="Sort order">
      <option value="new">Newest first</option>
      <option value="old">Oldest first</option>
      <option value="az">Title A–Z</option>
    </select>
  </div>
  <p class="count" id="count" aria-live="polite">Showing ${all.length} of ${all.length} pieces</p>
</div></div>

<div class="wrap">
  <ul class="stories archive-list" id="archive-list">${rows}</ul>
  <p class="no-results is-hidden" id="no-results">No pieces match those filters.</p>
</div>
<div class="sec--tight"></div>
`;
  return head("Archive · Masum Billah", "The complete, searchable archive of Masum Billah's published journalism.", "archive.html") + body + foot();
}

// ===========================================================================
// ABOUT
// ===========================================================================
function buildAbout() {
  const ledger = facts
    .map((f) => `<div><span class="figure">${esc(f.figure)}</span><span class="flabel">${esc(f.label)}</span></div>`)
    .join("");
  const awardList = awards
    .map((a) => `<li><div class="cname">${esc(a.name)}</div><div class="cmeta">${esc(a.detail)}</div><span class="cyear">${esc(a.year)}</span></li>`)
    .join("\n");
  const fellowList = fellowships
    .map((f) => `<li><div class="cname">${esc(f.name)}</div><div class="cmeta">${esc(f.org)}</div></li>`)
    .join("\n");
  const careerList = career
    .map((c) => `<li><div class="cname">${esc(c.role)} <span style="color:var(--ink-muted)">· ${esc(c.org)}</span></div><div class="cmeta">${esc(c.note)}</div></li>`)
    .join("\n");

  const body = `
<section class="about-hero"><div class="wrap">
  <div class="grid">
    <div class="bio">
      <p class="eyebrow reveal">About</p>
      <h1 class="reveal d1" style="margin-top:1rem">A reporter on migration, climate, and <em>power</em> in Bangladesh.</h1>
      <div class="reveal d2">
        <p>Masum Billah is a Dhaka-based journalist and senior feature writer at The Business Standard, reporting the forces that reshape ordinary Bangladeshi lives.</p>
        <p>His investigations have followed workers trafficked to Cambodia's scam compounds and to the front lines of Russia's war, traced a coastline losing ground to salt water, and documented the fall of Sheikh Hasina and the uprising that unseated her. He works in long-form and data: a feature on the changing monsoon drew on three decades of rainfall records.</p>
        <p>The reporting has run in ${esc(publications.slice(0, 4).join(", "))}, and beyond, and has been recognised twice by the BRAC Migration Media Award and picked by the Global Investigative Journalism Network among the year's best.</p>
      </div>
    </div>
    <figure class="about-portrait reveal d2">
      <div class="frame"><img src="assets/masum-billah.png" alt="Portrait of Masum Billah" width="1024" height="577"></div>
      <figcaption>Dhaka, Bangladesh</figcaption>
    </figure>
  </div>
</div></section>

<section class="sec--tight"><div class="wrap">
  <div class="ledger reveal">${ledger}</div>
</div></section>

<section class="sec--tight"><div class="wrap">
  <div class="creds">
    <div class="reveal">
      <h2 class="display">Awards &amp; recognition</h2>
      <ul class="cred-list">${awardList}</ul>
    </div>
    <div class="reveal d1">
      <h2 class="display">Fellowships &amp; training</h2>
      <ul class="cred-list">${fellowList}</ul>
    </div>
  </div>
</div></section>

<section class="sec--tight" style="border-top:1px solid var(--line)"><div class="wrap">
  <div class="creds">
    <div class="reveal">
      <h2 class="display">On the record</h2>
      <ul class="cred-list">${careerList}</ul>
    </div>
    <div class="reveal d1">
      <h2 class="display">Where the work runs</h2>
      <ul class="cred-list">
        ${publications.map((p) => `<li><div class="cname" style="font-size:1.02rem">${esc(p)}</div></li>`).join("\n")}
      </ul>
    </div>
  </div>
</div></section>
`;
  return head("About · Masum Billah", "Masum Billah is a Dhaka-based journalist and senior feature writer at The Business Standard, twice awarded the BRAC Migration Media Award.", "about.html") + body + foot();
}

writeFileSync(join(ROOT, "index.html"), buildIndex());
writeFileSync(join(ROOT, "work.html"), buildWork());
writeFileSync(join(ROOT, "archive.html"), buildArchive());
writeFileSync(join(ROOT, "about.html"), buildAbout());
console.log("Built index.html, work.html, archive.html, about.html");
