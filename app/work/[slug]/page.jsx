import Link from "next/link";
import { notFound } from "next/navigation";
import ShootGalleryImage from "@/components/ShootGalleryImage";
import { shoots, getShoot, getShootPageHero } from "@/data/shoots";

// Pre-render every shoot detail page at build time
export function generateStaticParams() {
  return shoots.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const shoot = getShoot(params.slug);
  if (!shoot) return {};
  return {
    title: `${shoot.title} — Christian Miller`,
    description: shoot.description?.[0]?.slice(0, 160) || "",
  };
}

export default function ShootPage({ params }) {
  const shoot = getShoot(params.slug);
  if (!shoot) return notFound();

  const hero = getShootPageHero(shoot);
  // Gallery = all photos except the detail-page hero, original order
  const gallery = shoot.photos.filter((p) => p !== hero);

  // Find neighbors for "next / previous" navigation at the bottom
  const idx = shoots.findIndex((s) => s.slug === shoot.slug);
  const prev = shoots[(idx - 1 + shoots.length) % shoots.length];
  const next = shoots[(idx + 1) % shoots.length];

  return (
    <>
      {/* Hero */}
      <section className="relative hero-vignette h-[min(66vh,748px)] min-h-[459px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero}
          alt={`${shoot.title} — hero image`}
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 z-[2] flex items-end">
          <div className="max-w-6xl w-full mx-auto px-6 md:px-10 pb-12 md:pb-14">
            <div className="halation-glass-panel inline-block max-w-3xl rounded-sm bg-black/35 px-5 py-5 md:px-6 md:py-6 backdrop-blur-[2px] border border-white/10 text-paper">
              <p className="halation-text-paper-muted label tracking-widest2 text-paper/95">
                {shoot.subtitle}
              </p>
              <h1 className="halation-text-paper font-display text-5xl md:text-7xl italic leading-[1.02] mt-2">
                {shoot.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="relative overflow-hidden border-y border-hairline/80 bg-wash py-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 halation-ambient opacity-50"
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-prose2 px-6 md:px-10">
          <p className="label mb-3">The story</p>
          {shoot.description?.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "mb-3 font-display text-xl italic leading-snug text-ink md:mb-4 md:text-2xl md:leading-snug"
                  : "mb-4 text-[1.125rem] leading-relaxed text-ink/85 md:mb-5 md:text-[1.2rem] md:leading-[1.65]"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Gallery — staggered single column, generous whitespace.
          Every other image breaks to a narrower center column so the page
          reads like a magazine rather than a product grid. */}
      <section className="bg-paper pt-16 md:pt-20 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-16 md:space-y-24">
          {gallery.map((src, i) => {
            const narrow = i % 3 === 1;
            return (
              <figure
                key={src}
                className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-5xl"}`}
              >
                <ShootGalleryImage
                  src={src}
                  alt={`${shoot.title} — frame ${i + 2}`}
                />
              </figure>
            );
          })}
        </div>
      </section>

      {/* Next / Previous */}
      <section className="bg-depth border-t border-hairline py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-between label">
          <Link href={`/work/${prev.slug}`} className="hover:text-rust">
            ← {prev.title}
          </Link>
          <Link href="/work" className="hover:text-rust">
            All work
          </Link>
          <Link href={`/work/${next.slug}`} className="hover:text-rust">
            {next.title} →
          </Link>
        </div>
      </section>

      {/* Inquire CTA */}
      <section className="bg-paper border-t border-hairline py-20 text-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <p className="font-display text-2xl md:text-3xl italic">
            Working on something similar?
          </p>
          <p className="mt-6">
            <Link
              href="/inquire"
              className="inline-block label border border-ink px-8 py-4 hover:bg-ink hover:text-paper"
            >
              Start an inquiry
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
