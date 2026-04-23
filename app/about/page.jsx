import Link from "next/link";

const PORTRAIT_SRC = "/images/about/christian-miller.jpg";

export const metadata = {
  title: "About — Christian Miller",
  description:
    "Christian Miller is a Miami-based photographer working in portraits, pregnancy, editorial, and graduation work.",
};

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden border-b border-gold/10 bg-wash py-12 md:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 halation-ambient opacity-65"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_35%,rgba(253,252,248,0.85),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-12 xl:gap-16">
          {/* Portrait — large, sticky on tall viewports */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="halation-frame overflow-hidden rounded-sm border-2 border-gold bg-paper">
                <div className="relative aspect-[4/3] w-full min-h-[260px] sm:aspect-[5/4] md:aspect-auto md:h-[min(52vh,520px)] lg:aspect-auto lg:h-[min(72vh,760px)] lg:min-h-[min(56vh,600px)]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static asset in /public */}
                  <img
                    src={PORTRAIT_SRC}
                    alt="Christian Miller"
                    className="absolute inset-0 h-full w-full object-cover object-[48%_42%]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="label mb-3">About</p>
            <h1 className="halation-text-ink font-display text-4xl italic leading-[1.06] text-ink md:text-5xl lg:text-6xl lg:leading-[1.04]">
              Christian Miller
            </h1>

            <div className="mt-8 max-w-prose2 space-y-6 text-[1.06rem] leading-relaxed text-ink/85 md:mt-10 md:text-[1.1rem] md:leading-relaxed lg:max-w-none">
              <p>
                I am a photographer based in Miami. Most of my work is portraits
                — pregnancy, weddings and couples, graduation, and longer editorial
                sittings when a client wants something built like a small study
                rather than a quick session.
              </p>
              <p>
                I care about light, place, and a calm pace on set. If that matches
                what you are looking for, I would be glad to talk through a
                project.
              </p>
            </div>

            <p className="mt-10 md:mt-12">
              <Link
                href="/inquire"
                className="inline-block label border border-ink px-9 py-4 transition-colors hover:border-gold hover:bg-ink hover:text-paper"
              >
                Inquire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
