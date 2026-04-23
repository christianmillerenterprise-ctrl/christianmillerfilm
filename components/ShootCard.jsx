import Link from "next/link";
import { getHero } from "@/data/shoots";

/**
 * ShootCard — one full-bleed hero image per shoot, then title and caption
 * centered underneath. Quiet, editorial, newspaper-feeling pacing.
 */
export default function ShootCard({ shoot, index }) {
  const hero = getHero(shoot);
  const isRight = index % 2 === 1;

  return (
    <article
      className={`border-t border-gold/10 py-14 md:py-20 ${
        index === 0 ? "border-t-0 pt-10 md:pt-12" : ""
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center ${
          isRight ? "md:[direction:rtl]" : ""
        }`}
      >
        <div className="md:col-span-8 [direction:ltr]">
          <div className="halation-frame mx-auto w-[85%] max-w-full overflow-hidden rounded-sm border-2 border-gold bg-paper">
            <Link
              href={`/work/${shoot.slug}`}
              className="group block overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero}
                alt={`${shoot.title} — hero image`}
                loading="lazy"
                className="h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              />
            </Link>
          </div>
        </div>
        <div className="md:col-span-4 [direction:ltr]">
          <p className="label mb-3">
            {String(index + 1).padStart(2, "0")} —{" "}
            {shoot.photos.length} frames
          </p>
          <h3 className="font-display text-3xl md:text-4xl leading-tight">
            <Link
              href={`/work/${shoot.slug}`}
              className="italic hover:text-rust"
            >
              {shoot.title}
            </Link>
          </h3>
          <p className="mt-2 label tracking-widest2">{shoot.subtitle}</p>
          {shoot.description?.[0] && (
            <p className="mt-5 text-ink/80 max-w-prose2 text-[1.05rem] leading-relaxed">
              {shoot.description[0]}
            </p>
          )}
          <Link
            href={`/work/${shoot.slug}`}
            className="inline-block mt-6 label border-b border-ink/40 hover:text-rust hover:border-rust pb-0.5"
          >
            View the series →
          </Link>
        </div>
      </div>
    </article>
  );
}
