import Link from "next/link";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import HomeWorkCarousel from "@/components/HomeWorkCarousel";
import {
  shoots,
  getHomeHorizontalCarouselImages,
  getWorkHorizontalCarouselImages,
} from "@/data/shoots";

export default function HomePage() {
  const heroCarouselImages = getHomeHorizontalCarouselImages(shoots, 19);
  const workTeaserImages = getWorkHorizontalCarouselImages(shoots, 10);

  return (
    <>
      <HomeHeroCarousel images={heroCarouselImages}>
        <div>
          <h1 className="sr-only">
            Christian Miller Photography — Miami, Florida
          </h1>
          <p className="font-display text-3xl leading-snug text-paper sm:text-4xl md:text-5xl lg:text-6xl md:leading-tight italic">
            Devoted to classical and beautiful things.
          </p>
          <p className="mt-8 md:mt-10">
            <Link
              href="/inquire"
              className="inline-block label !text-paper border border-paper bg-paper/10 px-8 py-4 backdrop-blur-[1px] transition-colors hover:bg-paper hover:!text-ink"
            >
              Inquire now
            </Link>
          </p>
        </div>
      </HomeHeroCarousel>

      {/* Philosophy — compact band */}
      <section className="relative overflow-hidden border-y border-gold/10 bg-wash py-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_30%,rgba(253,252,248,0.55),transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="label mb-3">Philosophy of photography</p>
          <p className="font-display text-xl leading-snug text-ink md:text-2xl md:leading-snug italic">
            I want my photography to feel like a painting — as if I were a
            Renaissance artist walking amidst the gardens and columns of
            Florence, only my brush is a camera. I have always loved history,
            and pursued the sublime and beautiful in life with a quiet devotion.
            A camera is a way of capturing that: of tying a fleeting moment to
            the objective beauty that lives in nature and architecture.
          </p>
        </div>
      </section>

      {/* Work — rotating teaser + single CTA to /work (no per-shoot list) */}
      <section
        id="work"
        className="relative overflow-hidden border-y border-gold/10 bg-depth py-12 md:py-16"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(184,154,106,0.09),transparent_50%)]"
          aria-hidden
        />
        <div className="relative z-[1] px-6 md:px-10">
          <HomeWorkCarousel images={workTeaserImages} />
        </div>
      </section>

      {/* Closing CTA — hiring / booking */}
      <section className="relative overflow-hidden border-t border-gold/20 bg-gradient-to-b from-ivory/35 via-paper to-paper py-12 text-center shadow-[inset_0_1px_0_rgba(253,252,248,0.65)] md:py-16">
        <div className="relative z-[1] mx-auto max-w-2xl px-6 md:px-10">
          <p className="label mb-3">Book your shoot</p>
          <h2 className="font-display text-3xl italic leading-snug md:text-4xl md:leading-snug">
            If you’re hiring a photographer and what you’ve seen here feels
            like the right fit, I’d love to hear what you’re planning.
          </h2>
          <p className="mt-6">
            <Link
              href="/inquire"
              className="inline-block label border border-ink/85 px-8 py-4 transition-colors hover:border-gold hover:bg-ink hover:text-paper"
            >
              Begin an inquiry
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
