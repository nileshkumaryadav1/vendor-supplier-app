"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingCart, User, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileNavbar() {
  const pathname = usePathname();
  const [role, setRole] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role) {
        setRole(user.role); // vendor, supplier, or admin
      } else {
        setRole(null);
      }
    } catch {
      setRole(null);
    }
  }, []);

  const common = [
    { label: "Home", icon: <Home size={20} />, href: "/" },
  ];

  const vendorNav = [
    { label: "Materials", icon: <Package size={20} />, href: "/materials" },
    { label: "Orders", icon: <ShoppingCart size={20} />, href: "/orders" },
    { label: "Dashboard", icon: <User size={20} />, href: "/dashboard" },
  ];

  const supplierNav = [
    // { label: "Add Materials", icon: <Package size={20} />, href: "/supplier/add-material" },
    { label: "My Materials", icon: <Package size={20} />, href: "/supplier/all-materials" },
    { label: "Orders Received", icon: <ShoppingCart size={20} />, href: "/supplier/orders" },
    { label: "Dashboard", icon: <User size={20} />, href: "/dashboard" },
  ];

  const adminNav = [
    { label: "Dashboard", icon: <User size={20} />, href: "/dashboard" },
    { label: "Admin Panel", icon: <Shield size={20} />, href: "/admin" },
  ];

  const guestNav = [
    { label: "Materials", icon: <Package size={20} />, href: "/materials" },
    { label: "Dashboard", icon: <User size={20} />, href: "/dashboard" },
  ];

  const roleNavMap = {
    vendor: vendorNav,
    supplier: supplierNav,
    admin: adminNav,
    null: guestNav, // when not logged in
  };

  const navItems = [...common, ...(roleNavMap[role] || guestNav)];

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
