import { shoots } from "@/data/shoots";
import ShootCard from "@/components/ShootCard";

export const metadata = {
  title: "Work — Christian Miller",
  description:
    "Selected portraits, pregnancy, editorial, and graduation photography — Miami and travel.",
};

export default function WorkIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gold/10 bg-wash">
        <div
          className="pointer-events-none absolute inset-0 halation-ambient opacity-70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_65%_at_50%_0%,rgba(253,252,248,0.75),transparent_58%)]"
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-12">
          <p className="label mb-2">Selected work</p>
          <h1 className="halation-text-ink font-display text-4xl italic leading-tight text-ink md:text-5xl md:leading-tight">
            Recent shoots
          </h1>
          <p className="mt-4 max-w-xl font-serif text-[1.02rem] leading-relaxed text-ink/75 md:text-[1.05rem]">
            Each gallery opens in order — scroll the frames at your own pace.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        {shoots.map((shoot, i) => (
          <ShootCard key={shoot.slug} shoot={shoot} index={i} />
        ))}
      </section>
    </>
  );
}
