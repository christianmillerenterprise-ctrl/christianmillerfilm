"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const INTERVAL_MS = 5200;

/**
 * Work teaser on the home page — headline and CTA above a compact, gold-framed
 * carousel (hero carousel at top of page stays unframed).
 *
 * @param {{ images: string[] }} props
 */
export default function HomeWorkCarousel({ images }) {
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

  if (!n) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8 px-1 text-center md:mb-10">
        <p className="label mb-3 text-ink/90">Work</p>
        <h2 className="font-display text-3xl italic leading-tight text-ink md:text-4xl">
          See it all in one place
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink/80">
          The home page shows a taste of the frames — every full gallery lives
          on Work.
        </p>
        <p className="mt-6">
          <Link
            href="/work"
            className="inline-block label border border-ink/80 bg-ivory/60 px-8 py-3.5 text-ink transition-colors hover:border-gold hover:bg-paper"
          >
            See all work
          </Link>
        </p>
      </header>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected work — rotating photographs"
      >
        <div className="overflow-hidden rounded-sm border-2 border-gold bg-paper shadow-[0_12px_40px_rgba(42,35,29,0.1)]">
          <div className="relative mx-auto aspect-video w-full max-w-xl overflow-hidden bg-ink/10 sm:max-w-2xl md:max-w-3xl">
              {images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- static paths, fade stack
                <img
                  key={src}
                  src={src}
                  alt={
                    i === active
                      ? "Selection from recent photography"
                      : ""
                  }
                  aria-hidden={i !== active}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1000ms] ease-in-out ${
                    i === active ? "z-[1] opacity-100" : "z-0 opacity-0"
                  }`}
                />
              ))}
              <div
                className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-transparent"
                aria-hidden
              />
              {n > 1 && (
                <div
                  className="absolute bottom-3 left-0 right-0 z-[3] flex justify-center gap-2 px-4 md:bottom-4"
                  role="tablist"
                  aria-label="Choose slide"
                >
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      tabIndex={i === active ? 0 : -1}
                      aria-label={`Image ${i + 1} of ${n}`}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper ${
                        i === active
                          ? "w-6 bg-paper"
                          : "w-1.5 bg-paper/45 hover:bg-paper/75"
                      }`}
                    />
                  ))}
                </div>
              )}

              {n > 1 && (
                <>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => go(-1)}
                    className="absolute inset-y-0 left-0 z-[2] w-[min(26%,5rem)] cursor-pointer bg-transparent"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => go(1)}
                    className="absolute inset-y-0 right-0 z-[2] w-[min(26%,5rem)] cursor-pointer bg-transparent"
                  />
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => go(-1)}
                    className="absolute left-2 top-1/2 z-[4] -translate-y-1/2 rounded-sm bg-black/35 px-2.5 py-2.5 text-lg leading-none text-paper backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:left-3"
                  >
                    <span aria-hidden>‹</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => go(1)}
                    className="absolute right-2 top-1/2 z-[4] -translate-y-1/2 rounded-sm bg-black/35 px-2.5 py-2.5 text-lg leading-none text-paper backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:right-3"
                  >
                    <span aria-hidden>›</span>
                  </button>
                </>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
