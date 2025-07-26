"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, PackageSearch } from "lucide-react";

export default function AddedItems() {
  const [supplier, setSupplier] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("supplier");
    if (!stored) {
      router.push("/supplier/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setSupplier(parsed);

      // Fetch items added by the supplier
      fetch(`/api/supplier/items/${parsed._id}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch items", err);
          setLoading(false);
        });
    } catch (err) {
      console.error("Invalid supplier data", err);
      localStorage.removeItem("supplier");
      router.push("/supplier/login");
    }
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-[var(--foreground)] bg-[var(--background)]">
        <p className="text-sm">Loading your added items...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-12 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <PackageSearch size={20} /> All Added Items ({items.length})
        </h2>

        {items.length === 0 ? (
          <div className="text-gray-500">You haven&apos;t added any items yet.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded-xl bg-white text-black shadow-sm"
              >
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Price:</span> ₹{item.price}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
