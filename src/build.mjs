// Build the static site. Run: node src/build.mjs
import { writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { site, outlets, publications, articles, awards, fellowships, path as career, facts, posts } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const readJSON = (f) => (existsSync(join(HERE, f)) ? JSON.parse(readFileSync(join(HERE, f), "utf8")) : {});
const banners = readJSON("banners.json");          // curated url -> local file
const scraped = existsSync(join(HERE, "scraped.json")) ? JSON.parse(readFileSync(join(HERE, "scraped.json"), "utf8")) : [];

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s = "") => esc(s).replace(/"/g, "&quot;");
const arw = '<span class="arw" aria-hidden="true">↗</span>';
const arwR = '<span class="arw" aria-hidden="true">→</span>';

const shortOutlet = (pub) => {
  const o = outlets.find((x) => x.name === pub);
  if (o?.short) return o.short;
  return { "The Business Standard": "TBS", "South China Morning Post": "SCMP", "Al Jazeera English": "Al Jazeera", "Energy Institute": "Energy Inst." }[pub] || pub;
};
const featured = articles.filter((a) => a.featured);

// ---- Merge scraped + curated into one archive ------------------------------
const rank = (x) => (x.year ? Number(x.year) + 0.5 : x.id ? 2020 + (x.id - 35591) / 221000 : 0);
const archiveMap = new Map();
for (const s of scraped) archiveMap.set(s.url, { url: s.url, title: s.title, outlet: s.outlet, image: s.image, section: s.section || null, id: s.id, year: s.year || null });
for (const a of articles) {
  const ex = archiveMap.get(a.url) || {};
  archiveMap.set(a.url, {
    url: a.url, title: a.title, outlet: a.publication,
    image: banners[a.url] || ex.image || null,
    year: a.year || ex.year || null, section: ex.section || null, id: ex.id || null,
    excerpt: a.excerpt, curated: true,
  });
}
const archive = [...archiveMap.values()].map((x) => ({ ...x, rank: rank(x) })).sort((a, b) => b.rank - a.rank);
const outletCounts = {};
archive.forEach((x) => { outletCounts[x.outlet] = (outletCounts[x.outlet] || 0) + 1; });
const archiveOutlets = Object.keys(outletCounts).sort((a, b) => outletCounts[b] - outletCounts[a]);
const archiveYears = [...new Set(archive.map((x) => x.year).filter(Boolean))].sort().reverse();

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1b2430"/><text x="50%" y="52%" dy=".02em" text-anchor="middle" dominant-baseline="middle" font-family="Georgia,serif" font-size="34" fill="#eef2f6">M<tspan fill="#8ab4f8">.</tspan></text></svg>`
  );
const jsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: site.name, jobTitle: "Journalist",
  description: site.tagline, address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  email: "mailto:" + site.contact.email, knowsLanguage: ["English", "Bengali"],
  sameAs: [site.contact.twitter.url, site.contact.linkedin.url, site.contact.website.url],
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
<header class="masthead"><div class="wrap">
  <a class="home${current === "index.html" ? " is-current" : ""}" href="index.html"><span class="home-dot" aria-hidden="true"></span>Home</a>
  <nav class="nav">
    ${nav("work.html", "Work")}
    ${nav("fellowships.html", "Fellowships")}
    ${nav("beyond.html", "Beyond")}
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
      ${chan("Personal site", "bit.ly/3LBxljq", c.website.url)}
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
    <a href="fellowships.html">Fellowships</a>
    <a href="beyond.html">Beyond</a>
    <a href="about.html">About</a>
    <a href="${site.contact.twitter.url}" target="_blank" rel="noopener">X</a>
  </nav>
  <small>© ${year} Masum Billah · Dhaka</small>
</div></footer>
<script src="main.js"></script>
</body>
</html>`;
}

// --- thumbnail + rows -------------------------------------------------------
function thumb(image, outlet) {
  const fb = `<span class="thumb-fb"${image ? " hidden" : ""}>${esc(shortOutlet(outlet))}</span>`;
  const img = image
    ? `<img src="${attr(image)}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">`
    : "";
  return `<span class="thumb">${img}${fb}</span>`;
}
function archiveRow(x) {
  const meta = x.year || x.section || "";
  return `<li class="story" data-outlet="${attr(x.outlet)}" data-title="${attr(x.title.toLowerCase())}" data-year="${attr(x.year || "")}">
  <a href="${attr(x.url)}" target="_blank" rel="noopener">
    ${thumb(x.image, x.outlet)}
    <span class="st-body">
      <span class="st-top"><span class="pub">${esc(x.outlet)}</span><span class="yr">${esc(meta)}</span></span>
      <h4>${esc(x.title)}</h4>
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
    .map((o) => `<li class="logo reveal">
      <img src="assets/logos/${o.logo}" alt="${attr(o.name)} logo" loading="lazy" onerror="this.style.visibility='hidden'">
      <span>${esc(o.name)}</span>
    </li>`)
    .join("\n");

  const body = `
<section class="banner"><div class="wrap banner-grid">
  <div class="banner-copy">
    <p class="eyebrow reveal">${esc(site.title)}</p>
    <h1 class="reveal d1">Masum<br><span class="ln2">Billah</span></h1>
    <p class="banner-sub reveal d2">${esc(site.tagline)}</p>
    <a class="btn btn--lg reveal d3" href="work.html">See my work ${arwR}</a>
  </div>
  <figure class="banner-photo reveal d2">
    <div class="frame"><img src="assets/masum-billah.png" alt="Masum Billah, photographed in Dhaka" width="1024" height="577"></div>
  </figure>
</div></section>

<section class="appeared"><div class="wrap">
  <div class="appeared-head reveal"><p class="eyebrow">Work appeared in</p></div>
  <ul class="logos">${logos}</ul>
</div></section>
`;
  return head("Masum Billah · Journalist, Dhaka", site.tagline, "index.html") + body + foot();
}

// ===========================================================================
// WORK — most impactful up top, then the full archive
// ===========================================================================
function buildWork() {
  const lead = featured[0];
  const rest = featured.slice(1);
  const leadImg = banners[lead.url] || null;
  const restRows = rest
    .map((a) => `<li class="story" data-outlet="${attr(a.publication)}" data-title="${attr(a.title.toLowerCase())}">
      <a href="${attr(a.url)}" target="_blank" rel="noopener">
        ${thumb(banners[a.url] || null, a.publication)}
        <span class="st-body">
          <span class="st-top"><span class="pub">${esc(a.publication)}</span><span class="yr">${esc(a.year)}</span></span>
          <h4>${esc(a.title)}</h4>
          <p class="st-ex">${esc(a.excerpt)}</p>
        </span>
        ${arw}
      </a>
    </li>`)
    .join("\n");

  const outletOpts = archiveOutlets.map((o) => `<option value="${attr(o)}">${esc(o)} (${outletCounts[o]})</option>`).join("");
  const yearOpts = archiveYears.map((y) => `<option value="${esc(y)}">${esc(y)}</option>`).join("");
  const rows = archive.map(archiveRow).join("\n");

  const body = `
<section class="page-head"><div class="wrap">
  <p class="eyebrow reveal">Selected work</p>
  <h1 class="display reveal d1">The work I'm proudest of.</h1>
  <p class="page-sub reveal d2">A handful of the stories that mattered most, then the full archive of everything below.</p>
</div></section>

<section class="impactful"><div class="wrap">
  <article class="lead reveal">
    <a class="story-link" href="${attr(lead.url)}" target="_blank" rel="noopener">
      <span class="lead-media">${thumb(leadImg, lead.publication)}</span>
      <span class="lead-copy">
        ${lead.laurel ? `<span class="laurel">${esc(lead.laurel)}</span>` : ""}
        <span class="st-top"><span class="pub">${esc(lead.publication)}</span><span class="yr">${esc(lead.year)}</span></span>
        <h3>${esc(lead.title)}</h3>
        <p class="excerpt">${esc(lead.excerpt)}</p>
        <span class="read">Read the investigation ${arw}</span>
      </span>
    </a>
  </article>
  <ul class="stories impactful-rest">${restRows}</ul>
</div></section>

<section class="archive-full"><div class="wrap">
  <div class="sec-head reveal">
    <h2 class="display">The full archive</h2>
    <p class="page-sub">Everything published, ${archive.length} pieces and counting. Search, or filter by outlet and year.</p>
  </div>
</div>
<div class="filterbar filterbar--archive"><div class="wrap">
  <div class="controls">
    <input type="search" id="q" class="search" placeholder="Search titles or outlets…" aria-label="Search stories" autocomplete="off">
    <select id="f-outlet" aria-label="Filter by outlet"><option value="">All outlets (${archive.length})</option>${outletOpts}</select>
    <select id="f-year" aria-label="Filter by year"><option value="">All years</option>${yearOpts}</select>
    <select id="f-sort" aria-label="Sort order">
      <option value="new">Newest first</option>
      <option value="old">Oldest first</option>
      <option value="az">Title A–Z</option>
    </select>
  </div>
  <p class="count" id="count" aria-live="polite">Showing ${archive.length} of ${archive.length} pieces</p>
</div></div>
<div class="wrap">
  <ul class="stories archive-list" id="archive-list">${rows}</ul>
  <p class="no-results is-hidden" id="no-results">No pieces match those filters.</p>
</div>
<div class="sec--tight"></div>
`;
  return head("Work · Masum Billah", "Selected and complete work by Masum Billah: investigative and long-form reporting from Bangladesh, published across " + archiveOutlets.length + " newsrooms.", "work.html") + body + foot();
}

// ===========================================================================
// FELLOWSHIPS / TRAINING
// ===========================================================================
function buildFellowships() {
  const fellowList = fellowships
    .map((f) => `<li class="cred reveal"><div class="cname">${esc(f.name)}</div><div class="cmeta">${esc(f.org)}</div>${f.tag ? `<span class="cyear">${esc(f.tag)}</span>` : ""}</li>`)
    .join("\n");
  const awardList = awards
    .map((a) => `<li class="cred reveal"><div class="cname">${esc(a.name)}</div><div class="cmeta">${esc(a.detail)}</div><span class="cyear">${esc(a.year)}</span></li>`)
    .join("\n");

  const body = `
<section class="page-head"><div class="wrap">
  <p class="eyebrow reveal">Fellowships &amp; training</p>
  <h1 class="display reveal d1">The rooms that shaped the reporting.</h1>
  <p class="page-sub reveal d2">Fellowships, newsroom training, and recognition, from climate journalism at Oxford and COP30 to investigative honours at home.</p>
</div></section>

<section class="sec--tight"><div class="wrap creds-single">
  <div>
    <h2 class="display sec-label reveal">Fellowships &amp; programmes</h2>
    <ul class="cred-list">${fellowList}</ul>
  </div>
  <div>
    <h2 class="display sec-label reveal">Awards &amp; recognition</h2>
    <ul class="cred-list">${awardList}</ul>
  </div>
</div></section>
`;
  return head("Fellowships & Training · Masum Billah", "Fellowships, training and awards: Oxford Climate Journalism Network, National Press Foundation, CCMP COP30, Earth Journalism Network, and the BRAC Migration Media Award.", "fellowships.html") + body + foot();
}

// ===========================================================================
// BEYOND — notes / quick blogs
// ===========================================================================
function buildBeyond() {
  const list = posts.length
    ? posts
        .map((p) => {
          const d = new Date(p.date);
          const ds = isNaN(d) ? p.date : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
          return `<article class="note reveal">
      <div class="note-meta"><span class="note-kind">${esc(p.kind || "Note")}</span><time>${esc(ds)}</time></div>
      <h2 class="display">${esc(p.title)}</h2>
      <p>${esc(p.body)}</p>
    </article>`;
        })
        .join("\n")
    : `<p class="empty">Nothing here yet. Check back soon.</p>`;

  const body = `
<section class="page-head"><div class="wrap">
  <p class="eyebrow reveal">Beyond the byline</p>
  <h1 class="display reveal d1">Beyond.</h1>
  <p class="page-sub reveal d2">Notes, half-formed thoughts, and things worth sharing that never make it into a filed story.</p>
</div></section>

<section class="sec--tight"><div class="wrap notes">${list}</div></section>
`;
  return head("Beyond · Masum Billah", "Notes, quick blogs, and thoughts from journalist Masum Billah.", "beyond.html") + body + foot();
}

// ===========================================================================
// ABOUT
// ===========================================================================
function buildAbout() {
  const ledger = facts.map((f) => `<div><span class="figure">${esc(f.figure)}</span><span class="flabel">${esc(f.label)}</span></div>`).join("");
  const careerList = career
    .map((c) => `<li><div class="cname">${esc(c.role)} <span style="color:var(--ink-muted)">· ${esc(c.org)}</span></div><div class="cmeta">${esc(c.note)}</div></li>`)
    .join("\n");
  const bioParas = site.bio.map((p) => `<p>${esc(p)}</p>`).join("\n        ");

  const body = `
<section class="about-hero"><div class="wrap">
  <div class="grid">
    <div class="bio">
      <p class="eyebrow reveal">About</p>
      <h1 class="reveal d1" style="margin-top:1rem">A reporter on migration, climate, and <em>power</em> in Bangladesh.</h1>
      <div class="reveal d2">
        ${bioParas}
      </div>
      <a class="link-more reveal d3" href="fellowships.html" style="margin-top:1.5rem;display:inline-flex">Fellowships &amp; awards ${arwR}</a>
    </div>
    <figure class="about-portrait reveal d2">
      <div class="frame"><img src="assets/masum-billah.png" alt="Portrait of Masum Billah" width="1024" height="577"></div>
      <figcaption>Dhaka, Bangladesh</figcaption>
    </figure>
  </div>
</div></section>

<section class="sec--tight"><div class="wrap"><div class="ledger reveal">${ledger}</div></div></section>

<section class="sec--tight"><div class="wrap">
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
  return head("About · Masum Billah", "Masum Billah is a Dhaka-based journalist, reporter at The Daily Waadaa and Bangladesh correspondent for INS, twice recognised for his migration reporting.", "about.html") + body + foot();
}

// old archive page no longer used
try { rmSync(join(ROOT, "archive.html")); } catch {}

writeFileSync(join(ROOT, "index.html"), buildIndex());
writeFileSync(join(ROOT, "work.html"), buildWork());
writeFileSync(join(ROOT, "fellowships.html"), buildFellowships());
writeFileSync(join(ROOT, "beyond.html"), buildBeyond());
writeFileSync(join(ROOT, "about.html"), buildAbout());
console.log(`Built index, work (${archive.length} archive rows), fellowships, beyond, about.`);
