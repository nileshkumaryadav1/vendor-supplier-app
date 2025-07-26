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
      });
  }, [id]);

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
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Order response:", data); // 🔍 Debug log
        alert("Order placed successfully!");

        // Wait 500ms before redirecting
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        const errData = await res.json();
        alert("Error placing order: " + errData.message);
        console.error(errData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-[color:var(--foreground)]">
        Loading...
      </p>
    );
  if (!material)
    return <p className="text-center text-red-500">Material not found.</p>;

  const totalPrice = Number(quantity) * Number(material.pricePerKg);

  return (
    <section className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] px-6 py-14 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Image */}
        {material.imageUrl && (
          <img
            src={material.imageUrl}
            alt={material.name}
            className="w-full rounded-2xl shadow-lg border border-[color:var(--border)]"
          />
        )}

        {/* Right Content */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{material.name}</h1>
          <p className="text-[color:var(--muted-foreground)] font-medium text-base">
            {material.category}
          </p>

          <div className="space-y-1 mt-2 text-base leading-6">
            <p>
              💰 <strong>₹{material.pricePerKg}</strong> per kg
            </p>
            <p>
              📦 Stock: <strong>{material.availableQuantity} kg</strong>
            </p>
            <p>
              🏷️ Grade: <strong>{material.qualityGrade}</strong>
            </p>
            <p>
              📍 Location: <strong>{material.location}</strong>
            </p>
            <p>
              🚚 Estimated Delivery: <strong>3–5 days</strong>
            </p>
            <p>
              ⭐ Rating: <strong>{material.rating || "4.2"}</strong> / 5
            </p>
          </div>

          <div className="bg-[color:var(--muted)] p-4 rounded-xl border border-[color:var(--border)] mt-4">
            <p className="font-semibold">Supplier Info:</p>
            <p className="text-sm text-[color:var(--muted-foreground)]">
              {material.supplierId?.name} (
              {material.supplierId?.company || "Certified Supplier"})<br />
              Contact: {material.supplierId?.email || "Not Provided"}
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

          {/* Quantity Selector */}
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
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="mt-2 text-sm text-gray-600">
              Total Price: ₹{totalPrice.toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleOrder}
            className="mt-6 w-fit bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow transition"
          >
            🚚 Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
