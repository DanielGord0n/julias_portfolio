import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70vh] flex-col items-start justify-center">
      <p className="label">Error 404</p>
      <h1 className="display mt-5 text-[clamp(3rem,12vw,9rem)]">
        Not found.
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        This page doesn’t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        ← Back home
      </Link>
    </div>
  );
}
