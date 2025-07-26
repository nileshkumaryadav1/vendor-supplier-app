"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/custom/LogoutButton";
import Link from "next/link";
import VendorOrdersPage from "@/components/custom/VendorOrdersPage";
import { BadgeCheck, ShoppingBag, Star, LogOut } from "lucide-react";

export default function VendorDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "vendor") {
          router.replace("/login");
        } else {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("User data parsing error:", err);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading your vendor dashboard...
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--foreground)]">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Role:{" "}
          <span className="font-medium text-blue-600 capitalize">
            {user.role}
          </span>
        </p>
      </header>

      {/* Account Info */}
      <section className="mb-6 bg-white shadow rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          📍 Account Info
        </h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Location:</strong> {user.location || "Not specified"}
        </p>
      </section>

      {/* Dashboard Tools */}
      <section className="mb-8 bg-white shadow rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          🎯 Vendor Dashboard Tools
        </h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-green-600" />
            <Link
              href="/materials"
              className="text-blue-600 hover:underline font-medium"
            >
              Browse & Order Raw Materials
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <BadgeCheck size={16} className="text-yellow-500" />
            <Link
              href="/vendor/orders"
              className="text-blue-600 hover:underline font-medium"
            >
              Manage Your Orders
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Star size={16} className="text-purple-500" />
            <Link
              href="/vendor/reviews"
              className="text-blue-600 hover:underline font-medium"
            >
              Leave Reviews for Suppliers
            </Link>
          </li>
        </ul>

        {/* Orders component */}
        <div className="mt-6">
          <VendorOrdersPage />
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-end mt-6">
        <LogoutButton className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
          <LogOut size={16} /> Logout
        </LogoutButton>
      </footer>
    </main>
  );
}
