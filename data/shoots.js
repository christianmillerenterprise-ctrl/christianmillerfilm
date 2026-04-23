// -----------------------------------------------------------------------------
// Shoots metadata
// -----------------------------------------------------------------------------
// Edit titles, subtitles, descriptions, and hero choices here (`heroIndex` for
// Work cards / teasers; optional `pageHeroIndex` for /work/[slug] only). The `slug`
// must match the folder name under /public/images/. The `photos` array is
// pulled from /data/photos.json (regenerate with: npm run sync:galleries).
// Home hero carousel: display order = array in /data/homeCarousel.json (mix
// series there so slides do not stay on one shoot). Work band still
// uses landscape picks from galleries unless
// homeLandscapePaths is set. photoAspects.json: npm run gen:aspects
// -----------------------------------------------------------------------------

import photos from "./photos.json";
import photoAspects from "./photoAspects.json";
import homeCarouselPaths from "./homeCarousel.json";

/**
 * @typedef {Object} Shoot
 * @property {string} slug       URL slug; must match /public/images/<slug>/
 * @property {string} title      Display title
 * @property {string} subtitle   Small caps subtitle (location — year)
 * @property {string[]} description  Paragraphs (one string per paragraph)
 * @property {number} [heroIndex]   Index for Work index cards and carousels.
 *                                  Defaults to 0 if omitted.
 * @property {number} [pageHeroIndex]  Optional: hero on /work/[slug] only.
 *                                  If omitted, uses heroIndex.
 * @property {string[]} photos   Ordered list of public image paths
 */

/** @type {Shoot[]} */
export const shoots = [
  {
    slug: "meyly-graduation",
    title: "FIU Architecture Students Graduation",
    subtitle: "FIU — April 17, 2026",
    heroIndex: 0,
    description: [
      "Architecture students in caps and gowns on campus at FIU. We shot in the late afternoon when the sun was low and warm.",
      "Straightforward group and individual frames — clear faces, tidy gowns, nothing gimmicky — so the pictures stay useful as prints and for family.",
    ],
    photos: photos["meyly-graduation"] || [],
  },
  {
    slug: "bryan-and-amy",
    title: "Amy & Bryan",
    subtitle: "Pregnancy — January 15, 2026 — South Beach, Miami",
    heroIndex: 0,
    description: [
      "One afternoon in the walled beauty of a South Beach garden. Amy and Bryan are expecting their first child; we worked between the fountain and the palms and kept the pace unhurried.",
      "The light was high and hard in the open court, then softer and greener under the palms. We used the pockets of shade for even skin tones and stepped into the sun when we wanted rim and contrast on the stone and water.",
      "Most of the set is black and white. I leaned on strong shadow, texture in the stone and plants, and close, simple framing rather than a lot of posing.",
    ],
    photos: photos["bryan-and-amy"] || [],
  },
  {
    slug: "vizcaya",
    title: "At The Society of the Four Arts",
    subtitle: "Classical Portraits — Palm Beach",
    heroIndex: 32,
    pageHeroIndex: 42,
    description: [
      "A morning in the sculpture garden and grounds of The Society of the Four Arts: clipped hedges, stone paths, and soft light moving through the palms.",
      "We kept compositions spare so the architecture of the garden and the figure share the frame — formal, quiet, and unhurried.",
    ],
    photos: photos["vizcaya"] || [],
  },
  {
    slug: "miami-portraits",
    title: "At Vizcaya",
    subtitle: "Classical Portraits — Miami",
    heroIndex: 0,
    description: [
      "A morning session at Vizcaya Museum and Gardens: frescoes, stained glass, marble floors, and the light shifting as we moved through the rooms.",
      "We followed the sun through the house and courtyards and kept compositions simple so the building and the subjects share the frame evenly.",
    ],
    photos: photos["miami-portraits"] || [],
  },
  {
    slug: "koi-gardens",
    title: "Botanical Gardens",
    subtitle: "Portraits — Miami Beach",
    heroIndex: 0,
    description: [
      "An afternoon among palms, paths, and dense green at a botanical garden on Miami Beach — clear foreground and background without needing much set dressing.",
      "The dress color read strongly against the foliage; most of the edit is about that contrast and keeping the subject readable in a lively outdoor setting.",
    ],
    photos: photos["koi-gardens"] || [],
  },
];

export function getShoot(slug) {
  return shoots.find((s) => s.slug === slug) || null;
}

export function getHero(shoot) {
  const idx = shoot.heroIndex ?? 0;
  return shoot.photos[idx] || shoot.photos[0] || null;
}

/** Hero image on the shoot detail page (`/work/[slug]`). */
export function getShootPageHero(shoot) {
  const idx =
    shoot.pageHeroIndex !== undefined && shoot.pageHeroIndex !== null
      ? shoot.pageHeroIndex
      : (shoot.heroIndex ?? 0);
  return shoot.photos[idx] || shoot.photos[0] || null;
}

/**
 * Paths for the home-page work teaser carousel (hero + one extra per shoot).
 * @param {Shoot[]} shootList
 * @param {number} [maxImages]
 */
export function getCarouselTeaserImages(shootList, maxImages = 14) {
  const urls = [];
  for (const shoot of shootList) {
    const idx = shoot.heroIndex ?? 0;
    const hero = shoot.photos[idx];
    if (hero) urls.push(hero);
    const next =
      shoot.photos[idx + 1] ??
      shoot.photos.find((_, i) => i !== idx);
    if (next && next !== hero) urls.push(next);
  }
  const seen = new Set();
  const unique = [];
  for (const u of urls) {
    if (seen.has(u)) continue;
    seen.add(u);
    unique.push(u);
  }
  return unique.slice(0, maxImages);
}

/**
 * Up to `count` frames for the home hero carousel, interleaving shoots so the
 * set mixes series instead of exhausting one gallery first.
 * @param {Shoot[]} shootList
 * @param {number} [count]
 */
export function getHomeHeroCarouselImages(shootList, count = 10) {
  const seen = new Set();
  const out = [];
  let frame = 0;
  while (out.length < count && frame < 80) {
    let addedThisRound = false;
    for (const shoot of shootList) {
      if (out.length >= count) break;
      const p = shoot.photos[frame];
      if (p && !seen.has(p)) {
        seen.add(p);
        out.push(p);
        addedThisRound = true;
      }
    }
    if (!addedThisRound) break;
    frame += 1;
  }
  return out;
}

/** Measured width ≥ height (see data/photoAspects.json). */
function isLandscapePhotoUrl(url) {
  const rec = photoAspects[url];
  return Boolean(rec && rec.landscape);
}

/** All landscape URLs in shoot order (deduped). */
function landscapeUrlPool(shootList) {
  const seen = new Set();
  const out = [];
  for (const shoot of shootList) {
    for (const p of shoot.photos) {
      if (!p || seen.has(p)) continue;
      if (!isLandscapePhotoUrl(p)) continue;
      seen.add(p);
      out.push(p);
    }
  }
  return out;
}

/**
 * Interleaves landscape frames across shoots (like getHomeHeroCarouselImages),
 * then tops up from the landscape pool so `count` can be met when possible.
 * @param {Shoot[]} shootList
 * @param {number} count
 * @param {number} startIndex  frame column to start from (0 = first columns)
 */
function collectLandscapeCarousel(shootList, count, startIndex) {
  const seen = new Set();
  const out = [];
  let frame = startIndex;
  while (out.length < count && frame < 120) {
    for (const shoot of shootList) {
      if (out.length >= count) break;
      const p = shoot.photos[frame];
      if (p && !seen.has(p) && isLandscapePhotoUrl(p)) {
        seen.add(p);
        out.push(p);
      }
    }
    let anyPhotoHere = false;
    for (const shoot of shootList) {
      if (shoot.photos[frame]) {
        anyPhotoHere = true;
        break;
      }
    }
    if (!anyPhotoHere) break;
    frame += 1;
  }
  if (out.length < count) {
    for (const p of landscapeUrlPool(shootList)) {
      if (out.length >= count) break;
      if (seen.has(p)) continue;
      seen.add(p);
      out.push(p);
    }
  }
  return out;
}

/**
 * Optional explicit landscape URLs for home carousels (both). If non-empty,
 * overrides automatic picks — use when you know filenames are wide/horizontal.
 * @type {string[]}
 */
export const homeLandscapePaths = [];

function uniqueLandscapeOverride(count) {
  if (!homeLandscapePaths.length) return null;
  const seen = new Set();
  const out = [];
  for (const u of homeLandscapePaths) {
    if (!u || seen.has(u)) continue;
    seen.add(u);
    out.push(u);
    if (out.length >= count) break;
  }
  return out.length ? out : null;
}

/** Curated hero URLs from homeCarousel.json (deduped, capped). */
function uniqueHomeCarouselPaths(count) {
  if (!Array.isArray(homeCarouselPaths) || homeCarouselPaths.length === 0) {
    return null;
  }
  const seen = new Set();
  const out = [];
  for (const u of homeCarouselPaths) {
    if (!u || seen.has(u)) continue;
    seen.add(u);
    out.push(u);
    if (out.length >= count) break;
  }
  return out.length ? out : null;
}

/**
 * Landing hero carousel — prefers paths in data/homeCarousel.json, then
 * homeLandscapePaths, then automatic landscape picks from galleries.
 */
export function getHomeHorizontalCarouselImages(shootList, count = 10) {
  const curated = uniqueHomeCarouselPaths(count);
  if (curated) return curated;
  const manual = uniqueLandscapeOverride(count);
  if (manual) return manual;
  return collectLandscapeCarousel(shootList, count, 0);
}

/**
 * Work teaser carousel — same landscape filter, different start column vs hero.
 */
export function getWorkHorizontalCarouselImages(shootList, count = 10) {
  const manual = uniqueLandscapeOverride(count);
  if (manual) return manual;
  return collectLandscapeCarousel(shootList, count, 4);
}
