"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--background)] text-foreground px-4 py-10">
      <h1 className="text-5xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-6 max-w-md text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="px-6 py-2 rounded-xl text-white font-semibold bg-[color:var(--accent)] hover:bg-accent/90 transition-all duration-300"
      >
        🔙 Go Home
      </Link>
    </div>
  );
}
