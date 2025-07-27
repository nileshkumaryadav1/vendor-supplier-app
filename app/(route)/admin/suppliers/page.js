// app/admin/suppliers/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("/api/admin/suppliers");
        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏭 All Suppliers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <div className="grid gap-4">
          {suppliers.map((supplier) => (
            <div
              key={supplier._id}
              className="border p-4 rounded-lg bg-white shadow"
            >
              <p><strong>Name:</strong> {supplier.name}</p>
              <p><strong>Email:</strong> {supplier.email}</p>
              <p><strong>Phone:</strong> {supplier.phone || "N/A"}</p>
              <p><strong>Role:</strong> {supplier.role}</p>
              <p className="text-sm text-gray-500">
                Joined on {new Date(supplier.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
