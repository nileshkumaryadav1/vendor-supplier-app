"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Pencil, CalendarCheck, Trash2 } from "lucide-react";
import UserInfo from "@/components/dashboard/UserInfo";
import Link from "next/link";
import SupplierOrdersPage from "../orders/page";
// import OrderedItemPage from "../../orders/page";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      fetch(`/api/orders/${parsed._id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data || []))
        .catch((err) => {
          console.error("Error fetching events", err);
          setOrders([]);
        });
    } catch (err) {
      console.error("Invalid user data", err);
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    const confirmed = confirm("🔒 Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      localStorage.removeItem("user");
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Something went wrong during logout.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      "⚠️ This will permanently delete your account. Continue?"
    );
    if (!confirmed || !user?._id) return;

    try {
      const res = await fetch(`/api/user/${user._id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Account deleted.");
        localStorage.removeItem("user");
        router.push("/register");
      } else {
        alert("Failed to delete account.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("An error occurred.");
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-[var(--foreground)] bg-[var(--background)]">
        <p className="text-sm">Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-12 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
          <h1 className="text-lg md:text-2xl font-bold">
            Welcome, {user.name || user.email}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm">
            <button
              onClick={() => router.push("/edit-profile")}
              className="flex items-center gap-1 px-3 py-1 rounded-md text-[var(--highlight)] border border-[var(--highlight)] hover:bg-[var(--highlight)] hover:text-[var(--primary)] transition"
            >
              <Pencil size={16} /> Edit
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 rounded-md text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition"
            >
              <LogOut size={16} /> Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-1 px-3 py-1 rounded-md text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        {/* User Info */}
        <section>
          <UserInfo user={user} />
        </section>

        {/* Materials */}
        <div>
          <Link
            href={"/supplier/add-material"}
            className="p-2 mx-2 rounded-md text-[var(--highlight)] border border-[var(--highlight)] hover:bg-[var(--highlight)] hover:text-[var(--primary)] transition"
          >
            {/* <Pencil size={16} />  */}
            Add Materials
          </Link>

          <Link
            href={"/supplier/all-materials"}
            className="p-2 mx-2 rounded-md text-[var(--highlight)] border border-[var(--highlight)] hover:bg-[var(--highlight)] hover:text-[var(--primary)] transition"
          >
            {/* <Pencil size={16} /> */}
             My Materials
          </Link>
        </div>

        {/* Ordered items */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarCheck size={20} /> Ordered Items
          </h2>
          <SupplierOrdersPage />
        </section>
      </div>
    </main>
  );
}
