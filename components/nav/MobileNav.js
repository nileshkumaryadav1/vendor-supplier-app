"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, User } from "lucide-react";

export default function MobileNavbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: <Home size={20} />, href: "/" },
    { label: "Materials", icon: <Package size={20} />, href: "/materials" },
    { label: "Orders", icon: <ShoppingCart size={20} />, href: "/orders" },
    { label: "Dashboard", icon: <User size={20} />, href: "/dashboard" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-md">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ label, icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-500"
              } hover:text-blue-600 transition`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
