/**
 * Scans JPEGs referenced in data/photos.json plus data/homeCarousel.json and
 * writes data/photoAspects.json (public URL path -> { width, height, landscape }).
 * Run after adding images: npm run gen:aspects
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import imageSize from "image-size";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const photos = JSON.parse(
  readFileSync(join(root, "data", "photos.json"), "utf8")
);

const paths = new Set();
for (const list of Object.values(photos)) {
  if (!Array.isArray(list)) continue;
  for (const p of list) {
    if (typeof p === "string" && p.startsWith("/")) paths.add(p);
  }
}

const homeCarouselPath = join(root, "data", "homeCarousel.json");
if (existsSync(homeCarouselPath)) {
  const hc = JSON.parse(readFileSync(homeCarouselPath, "utf8"));
  if (Array.isArray(hc)) {
    for (const p of hc) {
      if (typeof p === "string" && p.startsWith("/")) paths.add(p);
    }
  }
}

const aspects = {};
let ok = 0;
let missing = 0;

for (const webPath of [...paths].sort()) {
  const diskPath = join(root, "public", webPath);
  if (!existsSync(diskPath)) {
    console.warn("missing file:", webPath);
    missing += 1;
    continue;
  }
  try {
    const buf = readFileSync(diskPath);
    const dim = imageSize(buf);
    const w = dim.width ?? 0;
    const h = dim.height ?? 0;
    aspects[webPath] = {
      width: w,
      height: h,
      landscape: w >= h,
    };
    ok += 1;
  } catch (e) {
    console.warn("skip", webPath, e?.message || e);
    missing += 1;
  }
}

const outPath = join(root, "data", "photoAspects.json");
writeFileSync(outPath, JSON.stringify(aspects, null, 2) + "\n", "utf8");
console.log(`Wrote ${outPath} (${ok} images, ${missing} skipped/missing).`);
