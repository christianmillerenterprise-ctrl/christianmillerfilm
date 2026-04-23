import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <p className="label mb-6">404</p>
        <h1 className="font-display text-5xl italic">
          This page has wandered off.
        </h1>
        <p className="mt-6 text-ink/70">
          Perhaps it stepped out into the garden.
        </p>
        <p className="mt-10">
          <Link
            href="/"
            className="label border border-ink px-6 py-3 hover:bg-ink hover:text-paper"
          >
            Back to the work
          </Link>
        </p>
      </div>
    </section>
  );
}
