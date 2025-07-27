"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("/api/homepage");
        if (!res.ok) throw new Error("Failed to fetch suppliers");
        const data = await res.json();
        const supplierUsers = data.users.filter(
          (user) => user.role === "supplier"
        );
        setSuppliers(supplierUsers);
      } catch (err) {
        setError("Could not load suppliers. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-[color:var(--accent)] text-lg">
        Loading suppliers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[color:var(--background)] px-6 md:px-20 py-12 text-[color:var(--foreground)]">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Verified Suppliers
      </h1>

      {suppliers.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No suppliers available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {suppliers.map((s, i) => (
            <div
              key={s._id || i}
              className="rounded-2xl border border-[color:var(--border)] shadow-lg bg-[color:var(--card)] p-5 transition-all hover:shadow-xl hover:scale-[1.015]"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">{s.shopName}</h2>
                {s.verified && (
                  <span
                    className="px-2 py-0.5 text-green-600 text-xs font-medium bg-green-100 rounded-full"
                    title="Verified Supplier"
                  >
                    ✔ Verified
                  </span>
                )}
              </div>

              <ul className="space-y-1 text-sm text-[color:var(--foreground)]/80">
                <li>👤 <strong>Owner:</strong> {s.name || "N/A"}</li>
                <li>📍 <strong>Location:</strong> {s.location || "N/A"}</li>
                <li>📦 <strong>Category:</strong> {s.category || "All Items"}</li>
                <li>
                  🛒 <strong>Items:</strong>{" "}
                  {Array.isArray(s.materials) && s.materials.length > 0
                    ? s.materials.slice(0, 3).join(", ") +
                      (s.materials.length > 3 ? "..." : "")
                    : "view Details"}
                </li>
                <li>⭐ <strong>Rating:</strong> {s.rating ?? "Unrated"}</li>
              </ul>

              <Link
                href={`/suppliers/${s._id}`}
                className="mt-4 inline-block w-full text-center border border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white transition rounded-md py-2 text-sm font-medium"
              >
                View Supplier →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
