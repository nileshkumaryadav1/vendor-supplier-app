"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  Package,
  ShoppingCart,
  X,
  User,
  Shield,
  Home,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [roleLinks, setRoleLinks] = useState([]);

  useEffect(() => {
    setMenuOpen(false);

    // Fetch user from localStorage
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, [pathname]);

  useEffect(() => {
    const links = [
      { href: "/", icon: <Home size={18} />, label: "Home" },
    ];

    if (!user) {
      // Guest (not logged in)
      links.push(
        { href: "/materials", icon: <Package size={18} />, label: "Materials" },
        { href: "/dashboard", icon: <User size={18} />, label: "Dashboard" }
      );
    } else if (user.role === "vendor") {
      links.push(
        { href: "/materials", icon: <Package size={18} />, label: "Materials" },
        { href: "/orders", icon: <ShoppingCart size={18} />, label: "Orders" },
        { href: "/dashboard", icon: <User size={18} />, label: "Dashboard" }
      );
    } else if (user.role === "supplier") {
      links.push(
        {
          href: "/supplier/add-material",
          icon: <Package size={18} />,
          label: "Add Material",
        },
        {
          href: "/supplier/all-materials",
          icon: <Package size={18} />,
          label: "My Materials",
        },
        {
          href: "/supplier/orders",
          icon: <ShoppingCart size={18} />,
          label: "Orders Received",
        },
        { href: "/dashboard", icon: <User size={18} />, label: "Dashboard" }
      );
    } else if (user.role === "admin") {
      links.push(
        {
          href: "/dashboard",
          icon: <User size={18} />,
          label: "Dashboard",
        },
        {
          href: "/admin",
          icon: <Shield size={18} />,
          label: "Admin Panel",
        }
      );
    }

    setRoleLinks(links);
  }, [user]);

  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--accent)] tracking-tight"
        >
          RawEase
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          {roleLinks.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                isActive(href)
                  ? "text-[var(--accent)] border-b-2 border-[var(--accent)] pb-1"
                  : "text-gray-700 hover:text-[var(--accent)]"
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
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>
          </div>

          {roleLinks.map(({ href, icon, label }) => (
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
