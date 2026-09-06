// Build the static site. Run: node src/build.mjs
import { writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { site, outlets, publications, beats, articles, awards, fellowships, path as career, facts, posts, expertise, education } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const V = Date.now(); // cache-busting version for styles/js
const readJSON = (f) => (existsSync(join(HERE, f)) ? JSON.parse(readFileSync(join(HERE, f), "utf8")) : {});
const banners = readJSON("banners.json");
const scraped = existsSync(join(HERE, "scraped.json")) ? JSON.parse(readFileSync(join(HERE, "scraped.json"), "utf8")) : [];

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s = "") => esc(s).replace(/"/g, "&quot;");
const arw = '<span class="arw" aria-hidden="true">↗</span>';
const arwR = '<span class="arw" aria-hidden="true">→</span>';

const beatById = Object.fromEntries(beats.map((b) => [b.id, b]));
const shortOutlet = (pub) => {
  const o = outlets.find((x) => x.name === pub);
  if (o?.short) return o.short;
  return { "The Business Standard": "TBS", "South China Morning Post": "SCMP", "Al Jazeera English": "Al Jazeera", "Energy Institute": "Energy Inst." }[pub] || pub;
};

// ---- Beat classifier -------------------------------------------------------
function classifyBeat(text) {
  const t = (" " + text + " ").toLowerCase();
  let best = "society", score = 0;
  for (const b of beats) {
    let s = 0;
    for (const k of b.kw) if (t.includes(k)) s++;
    if (s > score) { score = s; best = b.id; }
  }
  return best;
}

// ---- Merge scraped + curated into one archive ------------------------------
const rank = (x) => (x.year ? Number(x.year) + 0.5 : x.id ? 2020 + (x.id - 35591) / 221000 : 0);
const curatedFeatured = new Set(articles.filter((a) => a.featured).map((a) => a.url));
const archiveMap = new Map();
for (const s of scraped) archiveMap.set(s.url, { url: s.url, title: s.title, outlet: s.outlet, image: s.image, section: s.section || null, id: s.id, year: s.year || null });
for (const a of articles) {
  const ex = archiveMap.get(a.url) || {};
  archiveMap.set(a.url, {
    url: a.url, title: a.title, outlet: a.publication,
    image: banners[a.url] || ex.image || null,
    year: a.year || ex.year || null, section: ex.section || null, id: ex.id || null,
    excerpt: a.excerpt, curated: true, beat: a.beat, laurel: a.laurel,
  });
}
const archive = [...archiveMap.values()].map((x) => ({ ...x, beat: x.beat || classifyBeat(x.title + " " + (x.section || "")), rank: rank(x) })).sort((a, b) => b.rank - a.rank);
const outletCounts = {}, beatCounts = {};
archive.forEach((x) => { outletCounts[x.outlet] = (outletCounts[x.outlet] || 0) + 1; beatCounts[x.beat] = (beatCounts[x.beat] || 0) + 1; });
const archiveOutlets = Object.keys(outletCounts).sort((a, b) => outletCounts[b] - outletCounts[a]);
const archiveYears = [...new Set(archive.map((x) => x.year).filter(Boolean))].sort().reverse();

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1b2430"/><text x="50%" y="52%" dy=".02em" text-anchor="middle" dominant-baseline="middle" font-family="Georgia,serif" font-size="34" fill="#eef2f6">M<tspan fill="#8ab4f8">.</tspan></text></svg>`);
const jsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: site.name, jobTitle: "Journalist",
  description: site.tagline, address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  email: "mailto:" + site.contact.email, knowsLanguage: ["English", "Bengali"], alumniOf: education.map((e) => e.org),
  sameAs: [site.contact.twitter.url, site.contact.linkedin.url, site.contact.tbs.url, site.contact.youtube.url],
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
<link rel="stylesheet" href="styles.css?v=${V}">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<a href="#main" class="skip">Skip to content</a>
<header class="masthead"><div class="wrap">
  <a class="home${current === "index.html" ? " is-current" : ""}" href="index.html"><span class="home-dot" aria-hidden="true"></span>Home</a>
  <nav class="nav">
    ${nav("work.html", "Work")}
    ${nav("fellowships.html", "Credentials")}
    ${nav("beyond.html", "Beyond")}
    ${nav("about.html", "About")}
    <a class="pill" href="mailto:${site.contact.email}">Get in touch</a>
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
      ${chan("YouTube", "A Journalist Who Travels", c.youtube.url)}
    </div>
    <p class="tipnote">Working on something sensitive? Email first and we can arrange an encrypted channel before you share anything.</p>
  </div>
</section>`;
}

function foot() {
  const year = new Date().getFullYear();
  const c = site.contact;
  const icon = (svg) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`;
  const icons = {
    email: icon('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>'),
    linkedin: icon('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>'),
    twitter: icon('<path d="M4 4l16 16m0-16L4 20"></path>'),
    youtube: icon('<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>')
  };

  return `\n
<footer class="footer"><div class="wrap footer-grid">
  <div class="f-left">
    <div class="f-loc">
      <p class="f-eyebrow">Location &amp; local time</p>
      <p class="f-time">Dhaka, Bangladesh &ndash; <span id="clock">...</span></p>
    </div>
    <nav class="f-socials">
      <a href="mailto:${attr(c.email)}">${icons.email} email</a>
      <a href="${attr(c.linkedin.url)}" target="_blank" rel="noopener">${icons.linkedin} linkedin</a>
      <a href="${attr(c.twitter.url)}" target="_blank" rel="noopener">${icons.twitter} x</a>
      <a href="${attr(c.youtube.url)}" target="_blank" rel="noopener">${icons.youtube} youtube</a>
    </nav>
  </div>
  <div class="f-right">
    <p>&copy; ${year} Masum Billah. All rights reserved.<a href="about.html">About</a></p>
  </div>
</div></footer>
<script src="main.js?v=${V}"></script>
</body>
</html>`;
}

// --- thumbnails + rows ------------------------------------------------------
function thumb(image, outlet) {
  const fb = `<span class="thumb-fb"${image ? " hidden" : ""}>${esc(shortOutlet(outlet))}</span>`;
  const img = image ? `<img src="${attr(image)}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">` : "";
  return `<span class="thumb">${img}${fb}</span>`;
}
function archiveRow(x, { showBeat = true, excerpt = false } = {}) {
  const meta = x.year || x.section || "";
  const b = beatById[x.beat];
  return `<li class="story" data-beat="${x.beat}" data-outlet="${attr(x.outlet)}" data-title="${attr(x.title.toLowerCase())}" data-year="${attr(x.year || "")}">
  <a href="${attr(x.url)}" target="_blank" rel="noopener">
    ${thumb(x.image, x.outlet)}
    <span class="st-body">
      <span class="st-top"><span class="pub">${esc(x.outlet)}</span><span class="yr">${esc(meta)}</span></span>
      <h4>${esc(x.title)}</h4>
      ${excerpt && x.excerpt ? `<p class="st-ex">${esc(x.excerpt)}</p>` : ""}
      ${showBeat && b ? `<span class="st-tag st-tag--${x.beat}">${esc(b.name)}</span>` : ""}
    </span>
    ${arw}
  </a>
</li>`;
}
function leadCard(x) {
  const b = beatById[x.beat];
  return `<article class="lead reveal">
    <a class="story-link" href="${attr(x.url)}" target="_blank" rel="noopener">
      <span class="lead-media">${thumb(x.image, x.outlet)}</span>
      <span class="lead-copy">
        ${x.laurel ? `<span class="laurel">${esc(x.laurel)}</span>` : b ? `<span class="laurel laurel--beat">${esc(b.name)}</span>` : ""}
        <span class="st-top"><span class="pub">${esc(x.outlet)}</span><span class="yr">${esc(x.year || x.section || "")}</span></span>
        <h3>${esc(x.title)}</h3>
        ${x.excerpt ? `<p class="excerpt">${esc(x.excerpt)}</p>` : ""}
        <span class="read">Read the story ${arw}</span>
      </span>
    </a>
  </article>`;
}

// --- shared: beat strip + archive block ------------------------------------
function beatStrip(currentId) {
  const all = `<a class="beatchip${!currentId ? " is-active" : ""}" href="work.html">All <span class="c">${archive.length}</span></a>`;
  const chips = beats.map((b) => `<a class="beatchip${b.id === currentId ? " is-active" : ""}" href="beat-${b.id}.html">${esc(b.name)} <span class="c">${beatCounts[b.id] || 0}</span></a>`).join("");
  return `<nav class="beatstrip" aria-label="Browse by beat">${all}${chips}</nav>`;
}
function archiveBlock(items, { withBeat = true } = {}) {
  const oc = {}; items.forEach((x) => { oc[x.outlet] = (oc[x.outlet] || 0) + 1; });
  const outletsSorted = Object.keys(oc).sort((a, b) => oc[b] - oc[a]);
  const years = [...new Set(items.map((x) => x.year).filter(Boolean))].sort().reverse();
  const beatOpts = withBeat ? beats.map((b) => `<option value="${b.id}">${esc(b.name)} (${beatCounts[b.id] || 0})</option>`).join("") : "";
  const outletOpts = outletsSorted.map((o) => `<option value="${attr(o)}">${esc(o)} (${oc[o]})</option>`).join("");
  const yearOpts = years.map((y) => `<option value="${esc(y)}">${esc(y)}</option>`).join("");
  const rows = items.map((x) => archiveRow(x, { showBeat: true })).join("\n");
  return `
<div class="filterbar filterbar--archive"><div class="wrap">
  <div class="controls">
    <input type="search" id="q" class="search" placeholder="Search titles or outlets…" aria-label="Search stories" autocomplete="off">
    ${withBeat ? `<select id="f-beat" aria-label="Filter by beat"><option value="">All beats</option>${beatOpts}</select>` : ""}
    <select id="f-outlet" aria-label="Filter by outlet"><option value="">All outlets (${items.length})</option>${outletOpts}</select>
    <select id="f-year" aria-label="Filter by year"><option value="">All years</option>${yearOpts}</select>
    <select id="f-sort" aria-label="Sort order"><option value="random" selected>Shuffle (Random)</option><option value="new">Newest first</option><option value="old">Oldest first</option><option value="az">Title A–Z</option></select>
  </div>
  <p class="count" id="count" aria-live="polite">Showing ${items.length} of ${items.length} pieces</p>
</div></div>
<div class="wrap">
  <ul class="stories archive-list" id="archive-list">${rows}</ul>
  <button id="load-more" class="btn btn--lg" type="button" style="margin: 2.5rem auto; display: none;">See more stories</button>
  <p class="no-results is-hidden" id="no-results">No pieces match those filters.</p>
</div>`;
}

// ===========================================================================
// INDEX — name + photo banner, then floating "Work appeared in" logos
// ===========================================================================
const logoWeight = {
  "The Business Standard": 3, "The Guardian": 3, "Al Jazeera English": 2.9, "Nikkei Asia": 2.5,
  "South China Morning Post": 2.1, "The Daily Waadaa": 2, "The Diplomat": 1.9, "VICE": 1.9,
  "Mongabay": 1.6, "Devex": 1.5, "Just-Style": 1.5,
};
function buildIndex() {
  // Largest first so the float reads deliberately.
  const ordered = [...outlets].sort((a, b) => (logoWeight[b.name] || 1.5) - (logoWeight[a.name] || 1.5));
  const logos = ordered
    .map((o) => `<li class="logo reveal" style="--s:${logoWeight[o.name] || 1.5}">
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
  <figure class="banner-photo cutout reveal d2">
    <img src="assets/masum-landing.png" alt="Masum Billah" width="1263" height="1246">
  </figure>
</div></section>

<section class="appeared"><div class="wrap">
  <div class="appeared-head reveal"><p class="eyebrow">Work appeared in</p></div>
  <ul class="logos logos--float">${logos}</ul>
</div></section>
`;
  return head("Masum Billah · Journalist, Dhaka", site.tagline, "index.html") + body + foot();
}

// ===========================================================================
// WORK — proudest, beat strip, then the full archive
// ===========================================================================
function buildWork() {
  const featured = articles.filter((a) => a.featured).map((a) => archiveMap.get(a.url));
  const lead = featured[0];
  const rest = featured.slice(1);
  const restRows = rest.map((a) => archiveRow(a, { showBeat: true, excerpt: true })).join("\n");

  const body = `
<section class="page-head"><div class="wrap">
  <p class="eyebrow reveal">Selected work</p>
  <h1 class="display reveal d1">The work I'm proudest of.</h1>
</div></section>

<section class="beatstrip-wrap beatstrip-wrap--top"><div class="wrap">
  <p class="eyebrow reveal">Explore by beat</p>
  ${beatStrip(null)}
</div></section>

<section class="impactful"><div class="wrap">
  ${leadCard(lead)}
  <ul class="stories impactful-rest">${restRows}</ul>
</div></section>

<section class="archive-full"><div class="wrap">
  <div class="sec-head reveal">
    <h2 class="display">The full archive</h2>
    <p class="page-sub">Everything published, ${archive.length} pieces and counting. Search, or filter by beat, outlet and year.</p>
  </div>
</div>
${archiveBlock(archive, { withBeat: true })}
<div class="sec--tight"></div>
`;
  return head("Work · Masum Billah", "Selected and complete work by Masum Billah: investigative and long-form reporting from Bangladesh across " + archiveOutlets.length + " newsrooms.", "work.html") + body + foot();
}

// ===========================================================================
// BEAT PAGES — a lead story then highlights, one per beat
// ===========================================================================
function buildBeat(b) {
  const items = archive.filter((x) => x.beat === b.id);
  const feat = items.filter((x) => curatedFeatured.has(x.url));
  const ordered = [...feat, ...items.filter((x) => !curatedFeatured.has(x.url))];
  const lead = ordered[0];
  const highlights = ordered.slice(1, 9);
  const rows = highlights.map((x) => archiveRow(x, { showBeat: false, excerpt: !!x.excerpt })).join("\n");

  const body = `
<section class="page-head page-head--beat"><div class="wrap">
  <p class="eyebrow reveal"><a href="work.html" class="back">← All work</a></p>
  <h1 class="display reveal d1">${esc(b.full)}</h1>
  <p class="page-sub reveal d2">${esc(b.blurb)}</p>
</div></section>

<section class="beatstrip-wrap beatstrip-wrap--top"><div class="wrap">
  <p class="eyebrow reveal">Jump to a beat</p>
  ${beatStrip(b.id)}
</div></section>

<section class="impactful"><div class="wrap">
  ${lead ? leadCard(lead) : ""}
  <ul class="stories impactful-rest">${rows}</ul>
</div></section>

<section class="archive-full"><div class="wrap">
  <div class="sec-head reveal">
    <h2 class="display">All ${esc(b.name)} stories</h2>
    <p class="page-sub">${items.length} ${items.length === 1 ? "piece" : "pieces"} in this beat. Search within it, or filter by outlet and year.</p>
  </div>
</div>
${archiveBlock(items, { withBeat: false })}
<div class="sec--tight"></div>
`;
  return head(`${b.full} · Masum Billah`, `${b.full}: ${b.blurb}`, "work.html") + body + foot();
}

// ===========================================================================
// FELLOWSHIPS
// ===========================================================================
function buildFellowships() {
  const orgLogo = (l) => (l ? `assets/logos/orgs/${l}` : null);
  const fcard = (x, isAward = false) => {
    const src = orgLogo(x.logo);
    return `<article class="fcard reveal">
      <div class="fcard-logo">${src ? `<img src="${src}" alt="" loading="lazy" onerror="this.closest('.fcard-logo').classList.add('is-empty')">` : ""}<span class="fcard-fb">${esc((x.name || "?").slice(0, 1))}</span></div>
      <div class="fcard-body">
        <h3 class="fcard-name">${esc(x.name)}</h3>
        <p class="fcard-org">${esc(x.org || x.detail)}</p>
      </div>
      ${(x.tag || x.year) ? `<span class="fcard-year">${esc(x.tag || x.year)}</span>` : ""}
    </article>`;
  };
  const orgs = [...fellowships, ...awards].filter((x) => x.logo);
  const strip = [...orgs, ...orgs, ...orgs]
    .map((x) => `<li class="orgmark"><img src="assets/logos/orgs/${x.logo}" alt="${attr(x.name)}" loading="lazy" onerror="this.style.visibility='hidden'"></li>`)
    .join("");

  const body = `
<section class="page-head page-head--accent"><div class="wrap">
  <p class="eyebrow reveal">Fellowships, training &amp; awards</p>
  <h1 class="display reveal d1">The rooms that shaped the reporting.</h1>
  <p class="page-sub reveal d2">From climate journalism at Oxford and a COP30 fellowship in the Amazon to investigative honours at home, the programmes and prizes that sharpened the work.</p>
  <div class="orgstrip-wrapper reveal d3"><ul class="orgstrip">${strip}</ul></div>
</div></section>

<section class="sec--tight"><div class="wrap">
  <h2 class="display sec-label reveal">Fellowships &amp; programmes</h2>
  <div class="fcards">${fellowships.map((f) => fcard(f)).join("\n")}</div>
</div></section>

<section class="sec--tight" style="border-top:1px solid var(--line)"><div class="wrap">
  <h2 class="display sec-label reveal">Awards &amp; recognition</h2>
  <div class="fcards">${awards.map((a) => fcard(a, true)).join("\n")}</div>
</div></section>`;
  return head("Credentials · Masum Billah", "Fellowships, training and awards: Oxford Climate Journalism Network, National Press Foundation, CCMP COP30, Earth Journalism Network, and the BRAC Migration Media Award.", "fellowships.html") + body + foot();
}

// ===========================================================================
// BEYOND
// ===========================================================================
function buildBeyond() {
  const list = posts.length
    ? posts.map((p) => {
        const d = new Date(p.date);
        const ds = isNaN(d) ? p.date : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
        return `<article class="note reveal"><div class="note-meta"><span class="note-kind">${esc(p.kind || "Note")}</span><time>${esc(ds)}</time></div><h2 class="display">${esc(p.title)}</h2><p>${esc(p.body)}</p></article>`;
      }).join("\n")
    : `<p class="empty">Nothing here yet. Check back soon.</p>`;
  const body = `
<section class="page-head page-head--beyond"><div class="wrap beyond-head">
  <div class="beyond-intro">
    <p class="eyebrow reveal">Beyond the byline</p>
    <h1 class="display reveal d1">Beyond.</h1>
    <p class="page-sub reveal d2">The life that happens between deadlines: the trails, the travels, and a small boy who outranks every editor I've had.</p>
  </div>
  
</div></section>
<section class="sec--tight"><div class="wrap notes">${list}</div></section>`;
  return head("Beyond · Masum Billah", "Notes, quick blogs, and thoughts from journalist Masum Billah.", "beyond.html") + body + foot();
}

// ===========================================================================
// ABOUT — wide cover, bio, then profile columns
// ===========================================================================
function buildAbout() {
  const bioParas = site.bio.map((p) => `<p>${esc(p)}</p>`).join("\n        ");
  const skills = expertise.map((s) => `<li>${esc(s)}</li>`).join("");
  const accolades = awards.map((a) => `<li><b>${esc(a.name)}</b><span>${esc(a.year)}</span></li>`).join("");
  const edu = education.map((e) => `<li><b>${esc(e.degree)}</b><span>${esc(e.org)}</span></li>`).join("");
  const c = site.contact;
  const elsewhere = [
    `<li><a href="${attr(c.twitter.url)}" target="_blank" rel="noopener">X / Twitter ${arw}</a></li>`,
    `<li><a href="${attr(c.linkedin.url)}" target="_blank" rel="noopener">LinkedIn ${arw}</a></li>`,
    `<li><a href="${attr(c.youtube.url)}" target="_blank" rel="noopener">YouTube ${arw}</a></li>`,
    `<li><a href="mailto:${attr(c.email)}">Email ${arw}</a></li>`,
  ].join("");

  const body = `
<section class="cover">
  <img class="cover-img" src="assets/masum-cover.jpg" alt="Masum Billah in the Nepal Himalaya" width="1280" height="855">
  <div class="cover-cap">
    <p class="eyebrow">About</p>
    <h1 class="display">Masum Billah</h1>
    
  </div>
</section>

<section class="about-body"><div class="wrap">
  <div class="about-lead reveal">
    ${bioParas}
  </div>

  <div class="about-cols">
    <div class="col reveal">
      <h2 class="col-h">Beats &amp; expertise</h2>
      <ul class="tags">${skills}</ul>
    </div>
    <div class="col reveal d1">
      <h2 class="col-h">Accolades</h2>
      <ul class="deflist">${accolades}</ul>
      <a class="link-more" href="fellowships.html">See all credentials ${arwR}</a>
    </div>
    <div class="col reveal d2">
      <h2 class="col-h">Education</h2>
      <ul class="deflist">${edu}</ul>
    </div>
    <div class="col reveal d1">
      <h2 class="col-h">Languages</h2>
      <ul class="tags"><li>English</li><li>Bengali</li></ul>
    </div>
    <div class="col reveal d2">
      <h2 class="col-h">Elsewhere</h2>
      <ul class="linklist">${elsewhere}</ul>
    </div>
    <div class="col reveal d3">
      <h2 class="col-h">On the record</h2>
      <ul class="deflist">
        ${career.map((c2) => `<li><b>${esc(c2.role)}</b><span>${esc(c2.org)}</span></li>`).join("")}
      </ul>
    </div>
  </div>
</div></section>`;
  return head("About · Masum Billah", "Masum Billah is a Dhaka-based journalist, reporter at The Daily Waadaa and Bangladesh correspondent for INS, covering migration, climate, and power.", "about.html") + body + foot();
}

// ---- write ----------------------------------------------------------------
try { rmSync(join(ROOT, "archive.html")); } catch {}
writeFileSync(join(ROOT, "index.html"), buildIndex());
writeFileSync(join(ROOT, "work.html"), buildWork());
for (const b of beats) writeFileSync(join(ROOT, `beat-${b.id}.html`), buildBeat(b));
writeFileSync(join(ROOT, "fellowships.html"), buildFellowships());
writeFileSync(join(ROOT, "beyond.html"), buildBeyond());
writeFileSync(join(ROOT, "about.html"), buildAbout());
console.log(`Built index, work (${archive.length} rows), ${beats.length} beat pages, fellowships, beyond, about.`);
console.log("Beat distribution:", beatCounts);
