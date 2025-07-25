"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/custom/LogoutButton";
import Link from "next/link";
import VendorOrdersPage from "@/components/custom/VendorOrdersPage";

export default function VendorDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "vendor") {
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name} (Vendor)</h1>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
      <p className="mt-4">🎯 Your Actions:</p>
      <ul className="list-disc pl-6 mt-2">
        <li><Link href="/materials" className="text-blue-500 hover:underline">Browse & Order Raw Materials</Link></li>
        {/* <li><Link href="/orders" className="text-blue-500 hover:underline">Track Orders</Link></li> */}
        <VendorOrdersPage />
        <li>Leave Supplier Reviews</li>
      </ul>
      <LogoutButton />
    </div>
  );
}
