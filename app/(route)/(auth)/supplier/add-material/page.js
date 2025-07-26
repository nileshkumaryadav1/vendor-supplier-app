"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddMaterialPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    pricePerKg: "",
    availableQuantity: "",
    description: "",
    imageUrl: "",
    qualityGrade: "B",
    location: "",
  });

  const router = useRouter();
  const [supplierId, setSupplierId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "supplier") {
      router.push("/login");
    } else {
      setSupplierId(user._id);
      setForm((prev) => ({ ...prev, location: user.location }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/materials/add", {
      method: "POST",
      body: JSON.stringify({ ...form, supplierId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Material added!");
      router.push("/supplier/dashboard");
    } else {
      alert("Failed to add material");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Material</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price per Kg"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, pricePerKg: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Available Quantity (Kg)"
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, availableQuantity: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <select
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, qualityGrade: e.target.value })}
        >
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          Add Material
        </button>
      </form>
    </div>
  );
}
