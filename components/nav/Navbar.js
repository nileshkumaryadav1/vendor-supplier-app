"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("vendor");
    router.push("/vendor/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Home
        </Link>

        <div className="space-x-4">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
          <Link href="/suppliers" className="text-gray-700 hover:text-blue-600 transition">
            Suppliers
          </Link>
          <Link
            href="/vendor/orders"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Orders
          </Link>
          <Link
            href="/materials"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Materials
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
