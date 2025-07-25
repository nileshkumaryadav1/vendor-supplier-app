"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "vendor") {
      router.push("/login");
    }

    fetch("/api/materials")
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading materials...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Raw Materials</h1>
      {materials.length === 0 ? (
        <p>No materials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div key={mat._id} className="border rounded-lg p-4 shadow-sm bg-white">
              {mat.imageUrl && (
                <img src={mat.imageUrl} alt={mat.name} className="h-40 w-full object-cover rounded mb-2" />
              )}
              <h2 className="text-xl font-semibold">{mat.name}</h2>
              <p className="text-sm text-gray-600">{mat.category}</p>
              <p className="mt-1">💰 ₹{mat.pricePerKg}/kg</p>
              <p>📦 {mat.availableQuantity} kg available</p>
              <p>🏷️ Grade: {mat.qualityGrade}</p>
              <p className="text-sm text-gray-500 mt-2">
                By <strong>{mat.supplierId.name}</strong> ({mat.location})
              </p>
              <button
                onClick={() => router.push(`/materials/${mat._id}`)}
                className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                View & Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
