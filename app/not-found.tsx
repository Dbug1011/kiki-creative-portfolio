import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-32 sm:px-6">
      <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/80">404</p>
      <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-white">This frame got cut.</h1>
      <Link href="/" className="mt-6 text-sm font-medium text-fuchsia-300 hover:text-fuchsia-200">
        ← Back to the work
      </Link>
    </section>
  );
}
