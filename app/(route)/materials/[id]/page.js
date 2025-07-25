"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function MaterialDetailPage() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "vendor") {
      router.push("/login");
      return;
    }

    fetch(`/api/materials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMaterial(data);
        setLoading(false);
      });
  }, [id]);

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorId: user._id,
        materialId: material._id,
        quantity: 10, // You can replace this with dynamic input later
      }),
    });

    if (res.ok) {
      alert("Order placed successfully!");
      router.push("/dashboard");
    } else {
      alert("Error placing order.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!material) return <p>Material not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {material.imageUrl && (
          <img src={material.imageUrl} alt={material.name} className="w-full md:w-80 rounded-lg shadow" />
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{material.name}</h1>
          <p className="text-gray-600 mb-2">{material.category}</p>
          <p className="mb-1">💰 ₹{material.pricePerKg}/kg</p>
          <p className="mb-1">📦 {material.availableQuantity} kg available</p>
          <p className="mb-1">🏷️ Grade: {material.qualityGrade}</p>
          <p className="text-sm text-gray-500 mt-2">
            Supplier: <strong>{material.supplierId?.name}</strong> ({material.location})
          </p>

          <button
            onClick={handleOrder}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
