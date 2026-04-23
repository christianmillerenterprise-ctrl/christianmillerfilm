import Link from "next/link";
import InstagramLink from "@/components/InstagramLink";

export default function Nav() {
  return (
    <header className="relative z-40 border-b border-gold/15 bg-gradient-to-b from-ivory/50 via-paper/30 to-transparent shadow-[0_12px_36px_-16px_rgba(184,154,106,0.14)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-7">
        <Link
          href="/"
          className="group text-ink transition-colors hover:text-gold"
        >
          <span className="halation-text-nav block font-display text-lg leading-snug tracking-wide md:text-2xl md:leading-snug">
            <span className="italic">Christian</span>{" "}
            <span className="not-italic">Miller Photography</span>
          </span>
          <span className="mt-2 block font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-gold/90 md:text-[0.72rem]">
            Miami, FL
          </span>
        </Link>
        <div className="flex items-center gap-6 md:gap-9">
          <ul className="flex items-center gap-6 font-sans text-[0.78rem] font-medium uppercase tracking-[0.22em] text-ink/90 md:gap-8 md:text-[0.85rem]">
            <li>
              <Link href="/work" className="text-ink/90 transition-colors hover:text-gold">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-ink/90 transition-colors hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/inquire" className="text-ink/90 transition-colors hover:text-gold">
                Inquire
              </Link>
            </li>
          </ul>
          <InstagramLink className="p-1 -m-1 shrink-0" />
        </div>
      </nav>
    </header>
  );
}
