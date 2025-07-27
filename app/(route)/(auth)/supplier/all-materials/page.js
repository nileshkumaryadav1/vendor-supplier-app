"use client";

import { useEffect, useState } from "react";

export default function SupplierMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorId = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("vendor"))?._id : null;

  useEffect(() => {
    if (vendorId) {
      fetch(`/api/materials?vendorId=${vendorId}`)
        .then(res => res.json())
        .then(data => {
          setMaterials(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load materials", err);
          setLoading(false);
        });
    }
  }, [vendorId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Added Materials</h1>
      {materials.length === 0 ? (
        <p>No materials found.</p>
      ) : (
        <div className="space-y-4">
          {materials.map((m) => (
            <div key={m._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{m.name}</h2>
              <p>Price: ₹{m.pricePerKg}/kg</p>
              <p>Category: {m.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
