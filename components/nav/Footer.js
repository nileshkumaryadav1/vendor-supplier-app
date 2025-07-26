import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)] text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-base font-medium tracking-tight">© 2025 RawEase</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-blue-600 transition-colors duration-200">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors duration-200">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors duration-200">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
