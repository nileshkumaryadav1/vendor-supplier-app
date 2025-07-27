"use client";

import { useEffect, useState } from "react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("/api/suppliers");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        setError("Could not load suppliers. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading suppliers...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Verified Suppliers</h1>

      {suppliers.length === 0 ? (
        <p className="text-gray-600">No suppliers available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {suppliers.map((s, i) => (
            <div
              key={s._id || i}
              className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{s.name}</h2>
                {s.verified && (
                  <span className="text-green-600 text-sm font-medium">✔ Verified</span>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1">📍 {s.location || "N/A"}</p>
              <p className="text-sm text-gray-700 mb-1">📦 Category: {s.category || "General"}</p>
              <p className="text-sm text-gray-700 mb-1">
                🛒 Items: {Array.isArray(s.items) ? s.items.join(", ") : "None"}
              </p>
              <p className="text-sm text-yellow-600 font-medium">
                ⭐ Rating: {s.rating ?? "Unrated"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
