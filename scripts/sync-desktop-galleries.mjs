/**
 * Copies up to 50 JPEGs per shoot from Desktop source folders into
 * public/images/<slug>/ as <slug>-01.jpg … (evenly spaced through sorted
 * filenames so the set spans the whole shoot, not only the first burst).
 *
 * Mapping matches the five shoots in data/shoots.js:
 *   meyly-graduation  ← MEYLY GRAD FINAL
 *   bryan-and-amy     ← Bryan & Amy Pregnancy Shoot Miami
 *   miami-portraits   ← Miami Shoot 1
 *   koi-gardens       ← Miami Shoot 2
 *   vizcaya           ← Miami Shoot 3
 *
 * Run from repo root:  node scripts/sync-desktop-galleries.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");
const TARGET_COUNT = 50;

const MAPPINGS = [
  {
    slug: "meyly-graduation",
    src: "/Users/christianmiller/Desktop/MEYLY GRAD FINAL",
  },
  {
    slug: "bryan-and-amy",
    src: "/Users/christianmiller/Desktop/Bryan & Amy Pregnancy Shoot Miami",
  },
  {
    slug: "miami-portraits",
    src: "/Users/christianmiller/Desktop/Miami Shoot 1",
  },
  { slug: "koi-gardens", src: "/Users/christianmiller/Desktop/Miami Shoot 2" },
  { slug: "vizcaya", src: "/Users/christianmiller/Desktop/Miami Shoot 3" },
];

function listJpgs(dir) {
  if (!fs.existsSync(dir)) {
    console.warn("missing folder:", dir);
    return [];
  }
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.(jpe?g)$/i.test(e.name))
    .map((e) => path.join(dir, e.name))
    .sort((a, b) =>
      path.basename(a).localeCompare(path.basename(b), "en", {
        numeric: true,
        sensitivity: "base",
      })
    );
}

/** Spread picks across the full sorted list (not just the first N files). */
function pickEvenlySpread(files, count) {
  const n = files.length;
  if (n === 0) return [];
  const take = Math.min(count, n);
  if (take === 1) return [files[0]];
  const chosen = [];
  const seen = new Set();
  for (let k = 0; k < take; k++) {
    const i = Math.min(n - 1, Math.floor((k / (take - 1)) * (n - 1)));
    const f = files[i];
    if (!seen.has(f)) {
      seen.add(f);
      chosen.push(f);
    }
  }
  let scan = 0;
  while (chosen.length < take && scan < n) {
    const f = files[scan++];
    if (!seen.has(f)) {
      seen.add(f);
      chosen.push(f);
    }
  }
  return chosen.slice(0, take);
}

function clearSlugDir(slugDir) {
  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
    return;
  }
  for (const name of fs.readdirSync(slugDir)) {
    const p = path.join(slugDir, name);
    if (fs.statSync(p).isFile()) fs.unlinkSync(p);
  }
}

const photosOut = {};

for (const { slug, src } of MAPPINGS) {
  const files = listJpgs(src);
  const picked = pickEvenlySpread(files, TARGET_COUNT);
  const destDir = path.join(PUBLIC_IMAGES, slug);
  clearSlugDir(destDir);

  const urls = [];
  let i = 1;
  for (const srcFile of picked) {
    const pad = String(i).padStart(2, "0");
    const destName = `${slug}-${pad}.jpg`;
    const destPath = path.join(destDir, destName);
    fs.copyFileSync(srcFile, destPath);
    urls.push(`/images/${slug}/${destName}`);
    i += 1;
  }
  photosOut[slug] = urls;
  console.log(`${slug}: copied ${urls.length} from ${files.length} in ${src}`);
}

const outJson = path.join(ROOT, "data", "photos.json");
fs.writeFileSync(outJson, JSON.stringify(photosOut, null, 2) + "\n", "utf8");
console.log("Wrote", outJson);
