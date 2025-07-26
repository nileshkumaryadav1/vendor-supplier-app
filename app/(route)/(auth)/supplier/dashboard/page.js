"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/custom/LogoutButton";
import Link from "next/link";
import AddedItems from "@/components/suppliers/AddedItems";

export default function SupplierDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "supplier") {
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name} (Supplier)</h1>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
      <p className="mt-4">🚛 Your Actions:</p>
      <ul className="list-disc pl-6 mt-2">
        <li> <Link href="/supplier/add-material" className="text-blue-500 hover:underline">Add Raw Material</Link></li>
        <li> <Link href="/supplier/orders" className="text-blue-500 hover:underline">Track Orders</Link></li>
        <li>See Reviews from Vendors</li>
      </ul>
      <AddedItems />
      <LogoutButton />
    </div>
  );
}
