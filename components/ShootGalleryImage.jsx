"use client";

import { useCallback, useState } from "react";

/** Width after first pass (work page). Tall frames get one more ~15% step. */
const WIDTH_LANDSCAPE = "w-[85%]";
/** 85% × 0.85 — extra shrink for portrait-only gallery frames */
const WIDTH_PORTRAIT = "w-[72.25%]";

/**
 * Gallery frame on a shoot detail page: landscape-ish images stay at 85% of
 * the figure width; portrait (taller than wide) narrows further so tall
 * files do not dominate the scroll.
 *
 * @param {{ src: string; alt: string }} props
 */
export default function ShootGalleryImage({ src, alt }) {
  const [portrait, setPortrait] = useState(false);

  const onLoad = useCallback((e) => {
    const el = e.currentTarget;
    if (el.naturalWidth > 0 && el.naturalHeight > el.naturalWidth) {
      setPortrait(true);
    }
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static paths, intrinsic sizing
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={onLoad}
      className={`mx-auto block h-auto max-w-full transition-[width] duration-200 ease-out ${
        portrait ? WIDTH_PORTRAIT : WIDTH_LANDSCAPE
      }`}
    />
  );
}
