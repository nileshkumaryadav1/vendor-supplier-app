"use client";
import { useState } from "react";
import axios from "axios";

export default function BuyButton({ materialId, supplierId }) {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/purchase", {
        materialId,
        supplierId,
        // Add vendor info from localStorage or context
      });
      setPurchased(true);
    } catch (err) {
      alert("Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading || purchased}
      className={`px-4 py-2 rounded-md text-white ${
        purchased
          ? "bg-gray-500"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {purchased ? "Purchased" : loading ? "Buying..." : "Buy Now"}
    </button>
  );
}
