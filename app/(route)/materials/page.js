"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const router = useRouter();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("/api/materials");
        const data = await res.json();
        setMaterials(data || []);
        setFilteredMaterials(data || []);
      } catch (err) {
        console.error("Error fetching materials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    let updated = [...materials];

    if (searchTerm) {
      updated = updated.filter((mat) =>
        mat.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      updated = updated.filter((mat) =>
        mat.supplierId?.location
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase())
      );
    }

    updated.sort((a, b) =>
      sortOrder === "asc"
        ? a.pricePerKg - b.pricePerKg
        : b.pricePerKg - a.pricePerKg
    );

    setFilteredMaterials(updated);
  }, [searchTerm, locationFilter, sortOrder, materials]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 text-sm">
        Loading materials...
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-6">
        <Package className="text-[var(--accent)]" size={26} />
        <h1 className="text-3xl font-bold text-gray-800">
          Browse{" "}
          <span className="text-[color:var(--accent,#3b82f6)]">
            Raw Materials
          </span>
        </h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--accent,#3b82f6)] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--accent,#3b82f6)] focus:outline-none"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[var(--accent,#3b82f6)] focus:outline-none"
        >
          <option value="asc">🔼 Price: Low to High</option>
          <option value="desc">🔽 Price: High to Low</option>
        </select>
      </div>

      {/* Results */}
      {filteredMaterials.length === 0 ? (
        <p className="text-gray-500">No materials match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => (
            <div
              key={mat._id}
              className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-lg transition-all flex flex-col relative"
            >
              {/* Verified Badge */}
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${
                  mat.supplierId?.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {mat.supplierId?.isVerified ? "✅ Verified" : "❌ Unverified"}
              </span>

              {/* Image */}
              <div className="h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
                {mat.imageUrl ? (
                  <img
                    src={mat.imageUrl}
                    alt={mat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
                    No image
                  </div>
                )}
              </div>

              {/* Info */}
              <h2 className="text-xl font-semibold text-gray-800">
                {mat.name}
              </h2>
              <p className="text-sm text-gray-500">{mat.category}</p>
              <p className="text-sm">💰 ₹{mat.pricePerKg} / kg</p>
              <p className="text-sm">📦 {mat.availableQuantity} kg in stock</p>
              <p className="text-sm mb-2">🏷️ Grade: {mat.qualityGrade}</p>

              {/* Supplier */}
              <p className="text-xs text-gray-500 mb-2">
                Supplier:{" "}
                <strong>{mat.supplierId?.name || "N/A"}</strong> (
                {mat.supplierId?.location || "Unknown"})
              </p>

              {/* Static Rating */}
              <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
                ⭐ 4.2 / 5
              </div>

              {/* CTA */}
              <button
                onClick={() => router.push(`/materials/${mat._id}`)}
                className="mt-auto bg-[color:var(--accent,#3b82f6)] text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                View & Order
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
