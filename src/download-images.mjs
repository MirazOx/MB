// Download resolved banners locally so the site is self-contained and robust
// (no hotlink/referer breakage on deploy). Reads src/images.json (url -> remote
// image), writes files to assets/banners/<n>.<ext> and src/banners.json
// (url -> local path). Run after fetch-images.mjs.
import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { articles } from "./data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const DIR = join(ROOT, "assets", "banners");
mkdirSync(DIR, { recursive: true });

const images = JSON.parse(readFileSync(join(HERE, "images.json"), "utf8"));
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";
const extFor = (ct) =>
  /png/i.test(ct) ? "png" : /webp/i.test(ct) ? "webp" : /gif/i.test(ct) ? "gif" : "jpg";

const banners = {};
articles.forEach((a, i) => {
  const remote = images[a.url];
  if (!remote) return;
  const tmp = join(DIR, `_tmp_${i}`);
  let ct = "";
  try {
    ct = execFileSync(
      "curl",
      ["-sL", "-A", UA, "-e", a.url, "--max-time", "30", "-o", tmp, "-w", "%{content_type}", remote],
      { encoding: "utf8", maxBuffer: 1024 * 1024 * 32 }
    ).trim();
  } catch (e) {
    console.log("FAIL", i, a.publication, a.title.slice(0, 34));
    return;
  }
  if (!/image\//i.test(ct)) {
    console.log("not-image", i, ct, a.title.slice(0, 30));
    return;
  }
  const ext = extFor(ct);
  const fname = `${i}.${ext}`;
  execFileSync("mv", [tmp, join(DIR, fname)]);
  banners[a.url] = `assets/banners/${fname}`;
  console.log("saved", fname, "(" + ct + ")", a.title.slice(0, 34));
});

writeFileSync(join(HERE, "banners.json"), JSON.stringify(banners, null, 2));
console.log(`\nDownloaded ${Object.keys(banners).length}/${articles.length} banners to assets/banners/`);
