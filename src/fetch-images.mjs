// Fetch each article's banner (og:image / twitter:image) from its source.
// Writes src/images.json = { [articleUrl]: bannerUrl }.
// Run: node src/fetch-images.mjs
import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { articles } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "images.json");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#0?38;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .trim();

function extract(html, prop, attr = "property") {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${prop}["'][^>]*>`,
    "i"
  );
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  const c = tag.match(/content=["']([^"']+)["']/i);
  return c ? decode(c[1]) : null;
}

const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const out = { ...existing };

for (const a of articles) {
  if (out[a.url]) {
    console.log("skip (cached):", a.title.slice(0, 40));
    continue;
  }
  let html = "";
  try {
    html = execFileSync(
      "curl",
      ["-sL", "-A", UA, "--max-time", "25", a.url],
      { encoding: "utf8", maxBuffer: 1024 * 1024 * 12 }
    );
  } catch (e) {
    console.log("FAIL curl:", a.publication, "|", a.title.slice(0, 40));
    out[a.url] = null;
    continue;
  }
  let img =
    extract(html, "og:image:secure_url") ||
    extract(html, "og:image") ||
    extract(html, "twitter:image") ||
    extract(html, "twitter:image:src", "name") ||
    extract(html, "twitter:image", "name");
  // Ignore author-avatar style images (Mongabay serves the author's headshot).
  if (img && /masum-billah/i.test(img)) img = null;
  out[a.url] = img || null;
  console.log(img ? "OK  " : "MISS", a.publication, "|", a.title.slice(0, 38), "->", img ? img.slice(0, 70) : "—");
}

writeFileSync(OUT, JSON.stringify(out, null, 2));
const have = Object.values(out).filter(Boolean).length;
console.log(`\nWrote ${OUT}: ${have}/${articles.length} banners resolved.`);
