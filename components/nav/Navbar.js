"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Package, ShoppingCart, X, User } from "lucide-react";

const navLinks = [
  { href: "/materials", icon: <Package size={18} />, label: "Materials" },
  { href: "/orders", icon: <ShoppingCart size={18} />, label: "Orders" },
  { href: "/dashboard", icon: <User size={18} />, label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          RawEase
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          {navLinks.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                isActive(href)
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          {navLinks.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 text-base transition-colors duration-200 ${
                isActive(href)
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}
