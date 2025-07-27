// app/admin/materials/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/materials")
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading materials:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 All Materials</h1>

      {loading ? (
        <p>Loading...</p>
      ) : materials.length === 0 ? (
        <p>No materials found.</p>
      ) : (
        <div className="grid gap-4">
          {materials.map((material) => (
            <div
              key={material._id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <h2 className="text-lg font-semibold">{material.name}</h2>
              <p>Category: {material.category}</p>
              <p>Price: ₹{material.pricePerKg}</p>
              <p>Quantity: {material.availableQuantity}</p>
              <p>Supplier: {material.supplier?.name || "N/A"}</p>
              <p className="text-sm text-gray-500">
                Created on: {new Date(material.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
