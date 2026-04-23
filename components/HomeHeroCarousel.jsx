"use client";

import { useCallback, useEffect, useState } from "react";
import { PHOTO_FOCAL_OVERRIDES } from "@/data/shoots";

const INTERVAL_MS = 6000;

/**
 * Home hero — photographs fill the section edge-to-edge (object-cover). Copy
 * sits about one-third up from the bottom, centered. Requires landscape-oriented sources.
 * On portrait phones, object-position is nudged from geometric center (see
 * `.hero-carousel-img` in globals.css) so typical portrait framing stays readable.
 *
 * @param {{ images: string[]; children: import("react").ReactNode }} props
 */
export default function HomeHeroCarousel({ images, children }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const n = images.length;
  const go = useCallback(
    (dir) => {
      if (n < 2) return;
      setActive((i) => (i + dir + n) % n);
    },
    [n]
  );

  useEffect(() => {
    if (n < 2 || paused || reduceMotion) return;
    const t = setInterval(() => setActive((i) => (i + 1) % n), INTERVAL_MS);
    return () => clearInterval(t);
  }, [n, paused, reduceMotion]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!n) return null;

  return (
    <section
      className="relative hero-vignette min-h-[max(88vh,600px)] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Home — photograph carousel"
    >
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- static paths, fade stack
          <img
            key={src}
            src={src}
            alt={
              i === active
                ? `Photograph ${active + 1} of ${n} on the home page`
                : ""
            }
            aria-hidden={i !== active}
            style={
              PHOTO_FOCAL_OVERRIDES[src]
                ? { objectPosition: PHOTO_FOCAL_OVERRIDES[src] }
                : undefined
            }
            className={`hero-carousel-img absolute inset-0 h-full w-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
              i === active ? "z-[1] opacity-100" : "z-0 opacity-0"
            }`}
          />
        ))}
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 z-[3] w-[min(28%,7rem)] cursor-pointer bg-transparent"
          />
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 z-[3] w-[min(28%,7rem)] cursor-pointer bg-transparent"
          />
          <button
            type="button"
            aria-label="Previous photograph"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-[4] -translate-y-1/2 rounded-sm bg-black/40 px-2.5 py-2.5 text-xl leading-none text-paper backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:left-4 md:px-3 md:py-3"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            aria-label="Next photograph"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-[4] -translate-y-1/2 rounded-sm bg-black/40 px-2.5 py-2.5 text-xl leading-none text-paper backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:right-4 md:px-3 md:py-3"
          >
            <span aria-hidden>›</span>
          </button>
          <div
            className="absolute bottom-[calc(7.5rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[4] flex justify-center gap-2 px-4 md:bottom-[8.5rem]"
            role="tablist"
            aria-label="Choose photograph"
          >
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                aria-label={`Photo ${i + 1} of ${n}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper ${
                  i === active
                    ? "w-6 bg-paper"
                    : "w-1.5 bg-paper/45 hover:bg-paper/80"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-[33%] z-[5] flex justify-center px-6 md:px-10">
        <div className="pointer-events-auto w-full max-w-3xl text-center">
          {children}
        </div>
      </div>
    </section>
  );
}
