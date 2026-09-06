// Scrape Masum Billah's full author archives (listing pages carry the live
// thumbnail, so one fetch per page yields many articles). Writes src/scraped.json.
// Run: node src/scrape.mjs
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";

const get = (url) => {
  try {
    return execFileSync("curl", ["-sL", "-A", UA, "--max-time", "30", url], {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 24,
    });
  } catch (e) {
    return "";
  }
};
const decode = (s = "") =>
  s
    .replace(/&amp;/g, "&").replace(/&#0?39;/g, "'").replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘").replace(/&#8220;/g, "“").replace(/&#8221;/g, "”")
    .replace(/&quot;/g, '"').replace(/&#8211;/g, "–").replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ").replace(/&rsquo;/g, "’").replace(/<[^>]+>/g, "").trim();

// ---- The Business Standard (paginated) ------------------------------------
function scrapeTBS() {
  const items = [];
  const seen = new Set();
  for (let page = 0; page <= 30; page++) {
    const url = "https://www.tbsnews.net/author/masum-billah" + (page ? "?page=" + page : "");
    const html = get(url);
    if (!html) break;
    const blocks = html.split(/<div class="card relative/);
    let found = 0;
    for (const b of blocks) {
      const m = b.match(/<h3 class="card-title"[^>]*>\s*<a href="([^"]+)">([\s\S]*?)<\/a>/);
      if (!m) continue;
      let href = m[1];
      if (!/-\d+$/.test(href)) continue;
      const url2 = href.startsWith("http") ? href : "https://www.tbsnews.net" + href;
      if (seen.has(url2)) continue;
      seen.add(url2);
      const title = decode(m[2]);
      if (!title) continue;
      let img = null;
      const im = b.match(/data-srcset="([^"\s]+)/) || b.match(/<img[^>]+(?:data-src|src)="([^"]+)"/);
      if (im) { img = im[1]; if (img.startsWith("/")) img = "https://www.tbsnews.net" + img; }
      const sec = (b.match(/eyebrow[^>]*>\s*<a[^>]*>([^<]+)/) || [])[1];
      const id = Number((url2.match(/-(\d+)$/) || [])[1] || 0);
      items.push({ url: url2, title, image: img, outlet: "The Business Standard", section: sec ? sec.trim() : null, id });
      found++;
    }
    process.stdout.write(`TBS page ${page}: ${found} articles\n`);
    if (found === 0) break;
  }
  return items;
}

// ---- Al Jazeera (listing in initial HTML) ---------------------------------
function scrapeAJ() {
  const items = [];
  const seen = new Set();
  const html = get("https://www.aljazeera.com/author/masum-billah/");
  // article cards: <a class="u-clickable-card__link" href="/features/2024/..."> ... <img src=...>
  const re = /<article[\s\S]*?<a[^>]+href="(\/[^"]+\/20\d\d\/[^"]+)"[^>]*>([\s\S]*?)<\/article>/g;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    const url = "https://www.aljazeera.com" + href.split("?")[0];
    if (seen.has(url)) continue;
    seen.add(url);
    const chunk = m[2];
    const title = decode((chunk.match(/<span[^>]*>([\s\S]*?)<\/span>/) || chunk.match(/>([^<]{15,})</) || [])[1] || "");
    let img = (chunk.match(/<img[^>]+src="([^"]+)"/) || [])[1] || null;
    if (img && img.startsWith("/")) img = "https://www.aljazeera.com" + img;
    const y = (href.match(/\/(20\d\d)\//) || [])[1];
    if (title) items.push({ url, title, image: img, outlet: "Al Jazeera English", year: y || null });
  }
  process.stdout.write(`Al Jazeera: ${items.length} articles\n`);
  return items;
}

const tbs = scrapeTBS();
const aj = scrapeAJ();
const all = [...tbs, ...aj];
writeFileSync(join(HERE, "scraped.json"), JSON.stringify(all, null, 2));
console.log(`\nScraped ${all.length} total (TBS ${tbs.length}, AJ ${aj.length}). Wrote src/scraped.json`);
console.log("With thumbnails:", all.filter((a) => a.image).length);
