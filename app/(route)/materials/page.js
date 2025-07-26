"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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
        setFilteredMaterials(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updated = [...materials];

    // Filter by search
    if (searchTerm) {
      updated = updated.filter((mat) =>
        mat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by location
    if (locationFilter) {
      updated = updated.filter(
        (mat) =>
          mat.supplierId?.location &&
          mat.supplierId.location
            .toLowerCase()
            .includes(locationFilter.toLowerCase())
      );
    }

    // Sort by price
    updated.sort((a, b) => {
      if (sortOrder === "asc") return a.pricePerKg - b.pricePerKg;
      else return b.pricePerKg - a.pricePerKg;
    });

    setFilteredMaterials(updated);
  }, [searchTerm, locationFilter, sortOrder, materials]);

  if (loading) return <p className="text-center mt-10">Loading materials...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Raw Materials</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by material name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        <input
          type="text"
          placeholder="📍 Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        >
          <option value="asc">🔼 Price: Low to High</option>
          <option value="desc">🔽 Price: High to Low</option>
        </select>
      </div>

      {filteredMaterials.length === 0 ? (
        <p>No materials match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => (
            <div
              key={mat._id}
              className="relative border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-all"
            >
              {/* Verified Badge */}
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
                  mat.supplierId?.isVerified
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {mat.supplierId?.isVerified ? "✅ Verified" : "❌ Not Verified"}
              </span>

              {/* Image */}
              {mat.imageUrl && (
                <img
                  src={mat.imageUrl}
                  alt={mat.name}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />
              )}

              {/* Info */}
              <h2 className="text-xl font-semibold">{mat.name}</h2>
              <p className="text-sm text-gray-600">{mat.category}</p>
              <p className="mt-1">💰 ₹{mat.pricePerKg}/kg</p>
              <p>📦 {mat.availableQuantity} kg available</p>
              <p>🏷️ Grade: {mat.qualityGrade}</p>
              <p className="text-sm text-gray-500 mt-2">
                By <strong>{mat.supplierId?.name}</strong> (
                {mat.supplierId?.location})
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                ⭐ 4.2 / 5 {/* Replace with dynamic rating if needed */}
              </div>

              {/* CTA */}
              <button
                onClick={() => router.push(`/materials/${mat._id}`)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
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
