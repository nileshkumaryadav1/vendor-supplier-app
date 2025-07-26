"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/custom/LogoutButton";
import Link from "next/link";
import VendorOrdersPage from "@/components/custom/VendorOrdersPage";
import { BadgeCheck, ShoppingBag, Star, LogOut } from "lucide-react";

export default function VendorDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role !== "vendor") {
        router.push("/login");
      } else {
        setUser(storedUser);
      }
    } catch (err) {
      console.error("User data parsing error:", err);
      router.push("/login");
    }
  }, []);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--foreground)]">Welcome, {user.name} 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Role: <span className="font-medium text-blue-600">Vendor</span></p>
      </header>

      <section className="mb-6 bg-white shadow rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">📍 Account Info</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Location:</strong> {user.location}</p>
      </section>

      <section className="mb-8 bg-white shadow rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">🎯 Your Dashboard Tools</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-green-600" />
            <Link href="/materials" className="text-blue-600 hover:underline font-medium">
              Browse & Order Raw Materials
            </Link>
          </li>

          <li className="flex items-center gap-2">
            <BadgeCheck size={16} className="text-yellow-500" />
            <span>View & Manage Your Orders</span>
          </li>

          <li className="flex items-center gap-2">
            <Star size={16} className="text-purple-500" />
            <span>Leave Supplier Reviews</span>
          </li>
        </ul>

        <div className="mt-6">
          <VendorOrdersPage />
        </div>
      </section>

      <footer className="flex justify-end">
        <LogoutButton className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
          <LogOut size={16} /> Logout
        </LogoutButton>
      </footer>
    </main>
  );
}
