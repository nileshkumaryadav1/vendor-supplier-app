"use client";

import { useEffect, useState } from "react";

export default function SupplierMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "supplier") {
      setSupplierId(user._id);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supplierId) return;

    const fetchMaterials = async () => {
      try {
        const res = await fetch(`/api/materials?supplierId=${supplierId}`);
        const data = await res.json();
        setMaterials(data);
      } catch (err) {
        console.error("Failed to load materials", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [supplierId]);

  if (loading) return <div className="p-6 text-gray-600 text-center">Loading your materials...</div>;
  if (!supplierId) return <div className="p-6 text-red-500 text-center">You must be logged in as a supplier to view this page.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Added Materials</h1>
      
      {materials.length === 0 ? (
        <p className="text-gray-500">No materials found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 p-4 border border-gray-100"
            >
              {m.imageUrl && (
                <img
                  src={m.imageUrl}
                  alt={m.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-indigo-600 mb-1">{m.name}</h2>
              <p className="text-gray-800 font-medium mb-1">₹{m.pricePerKg}/kg</p>
              <p className="text-sm text-gray-500 mb-1">Category: {m.category}</p>
              <p className="text-sm text-gray-500 mb-1">Quantity: {m.availableQuantity} kg</p>
              <p className="text-sm text-gray-500 mb-1">Quality: <span className="font-medium">{m.qualityGrade}</span></p>
              <p className="text-sm text-gray-500 mb-1">Location: {m.location}</p>
              {m.description && <p className="text-sm text-gray-400 italic">“{m.description}”</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
