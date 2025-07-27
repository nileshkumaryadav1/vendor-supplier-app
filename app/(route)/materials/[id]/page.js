"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function MaterialDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

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
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id, router]);

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in first.");
      router.push("/login");
      return;
    }

    if (quantity < 1 || quantity > material.availableQuantity) {
      setError(
        `Please enter a valid quantity (max: ${material.availableQuantity})`
      );
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendorId: user._id,
          materialId: material._id,
          quantity: Number(quantity),
          totalPrice: Number(quantity) * Number(material.pricePerKg),
          location: user.location,
          paymentMethod: "Cash",
          supplierId: material.supplierId,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Order placed successfully!");
        setTimeout(() => router.push("/dashboard"), 600);
      } else {
        alert("Error placing order: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-sm">
        Loading material details...
      </p>
    );

  if (!material)
    return (
      <p className="text-center text-red-500 mt-10">Material not found.</p>
    );

  const totalPrice = Number(quantity) * Number(material.pricePerKg);

  return (
    <section className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] px-6 py-14 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Image */}
        <div>
          {material.imageUrl ? (
            <img
              src={material.imageUrl}
              alt={material.name}
              className="w-full rounded-2xl shadow-md border border-[color:var(--border)] object-cover h-80"
            />
          ) : (
            <div className="w-full h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 text-sm border">
              No Image Available
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-900">{material.name}</h1>
          <p className="text-[color:var(--muted-foreground)] font-medium text-base">
            {material.category}
          </p>

          <div className="space-y-2 text-base leading-6">
            <p>
              💰 Price:{" "}
              <strong className="text-green-700">
                ₹{material.pricePerKg} / kg
              </strong>
            </p>
            <p>📦 Stock: {material.availableQuantity} kg</p>
            <p>🏷️ Grade: {material.qualityGrade}</p>
            <p>
              📍 Location: {material.supplierId?.location || "Not specified"}
            </p>
            <p>🚚 Estimated Delivery: 3–5 days</p>
            <p>⭐ Rating: {material.rating || "4.2"} / 5</p>
          </div>

          <div className="bg-[color:var(--muted)] p-4 rounded-xl border border-[color:var(--border)] mt-4">
            <p className="font-semibold">Supplier Info:</p>
            <p className="text-sm text-[color:var(--muted-foreground)] leading-5">
              {material.supplierId?.name || "Unnamed Supplier"} (
              {material.supplierId?.company || "Certified Supplier"})<br />
              📧 {material.supplierId?.email || "Not Provided"}
            </p>
          </div>

          {material.description && (
            <div className="mt-4">
              <p className="text-lg font-semibold mb-1">📄 Description:</p>
              <p className="text-sm text-[color:var(--muted-foreground)]">
                {material.description}
              </p>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <label htmlFor="quantity" className="block font-medium mb-1">
              Select Quantity (kg):
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={material.availableQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="mt-2 text-sm text-gray-600">
              Total Price: ₹{totalPrice.toFixed(2)}
            </p>
          </div>

          {/* Order Button */}
          <button
            onClick={handleOrder}
            className="mt-6 w-fit bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow transition"
          >
            🚀 Place Order
          </button>
        </div>
      </div>
    </section>
  );
}
