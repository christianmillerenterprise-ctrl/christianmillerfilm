import Link from "next/link";
import InstagramLink from "@/components/InstagramLink";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-40 mt-32 overflow-hidden border-t border-gold/25 bg-gradient-to-b from-paper via-depth to-[#d8ccbb] shadow-[inset_0_1px_0_rgba(253,252,248,0.55)]">
      <div
        className="pointer-events-none absolute inset-0 halation-ambient opacity-90"
        aria-hidden
      />
      <div className="relative z-[1] max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl italic text-ink">Christian Miller</p>
          <p className="mt-3 text-ink/70 max-w-prose2">
            A photographer with a slow eye — devoted to classical and
            beautiful things.
          </p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="label">Contact</p>
            <InstagramLink className="p-0.5 -m-0.5" iconClassName="h-4 w-4" />
          </div>
          <p>
            <a
              href="mailto:christianmillerenterprise@gmail.com"
              className="hover:text-rust"
            >
              christianmillerenterprise@gmail.com
            </a>
          </p>
          <p className="mt-1 text-ink/60">Miami, Florida</p>
        </div>
        <div>
          <p className="label mb-3">Site</p>
          <ul className="space-y-1">
            <li>
              <Link href="/work" className="transition-colors hover:text-gold">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/inquire" className="transition-colors hover:text-gold">
                Inquire
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative z-[1] max-w-6xl mx-auto px-6 md:px-10 pb-10 flex flex-col md:flex-row justify-between text-ink/50 text-sm">
        <p>&copy; {year} Christian Miller. All rights reserved.</p>
        <p className="italic mt-2 md:mt-0">
          Made slowly, in the classical mode.
        </p>
      </div>
    </footer>
  );
}
