import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-muted tracking-widest uppercase mb-4">404</p>
      <h1 className="font-display text-4xl text-ink mb-4">Page not found</h1>
      <p className="text-muted mb-8 max-w-sm">
        This page doesn&apos;t exist. It may have been moved or deleted.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-accent underline underline-offset-4 hover:no-underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
