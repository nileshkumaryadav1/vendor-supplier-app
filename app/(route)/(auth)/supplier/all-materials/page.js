"use client";

import { useEffect, useState } from "react";

export default function SupplierMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supplierId, setSupplierId] = useState(null);
  const [editMaterial, setEditMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "supplier") {
      setSupplierId(user._id);
    } else {
      setLoading(false);
    }
  }, []);

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

  useEffect(() => {
    if (supplierId) {
      fetchMaterials();
    }
  }, [supplierId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this material?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMaterials(materials.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (material) => {
    setEditMaterial(material);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/materials/${editMaterial._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editMaterial),
      });

      if (res.ok) {
        const updated = await res.json();
        setMaterials((prev) =>
          prev.map((m) => (m._id === updated._id ? updated : m))
        );
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading)
    return <div className="p-6 text-gray-600 text-center">Loading your materials...</div>;

  if (!supplierId)
    return (
      <div className="p-6 text-red-500 text-center">
        You must be logged in as a supplier to view this page.
      </div>
    );

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

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(m)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && editMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-xl font-bold">Edit Material</h2>

            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Name"
              value={editMaterial.name}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, name: e.target.value })
              }
            />
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Price per Kg"
              value={editMaterial.pricePerKg}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, pricePerKg: e.target.value })
              }
            />
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Quantity"
              value={editMaterial.availableQuantity}
              onChange={(e) =>
                setEditMaterial({
                  ...editMaterial,
                  availableQuantity: e.target.value,
                })
              }
            />
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="imageUrl"
              value={editMaterial.imageUrl}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, imageUrl: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Location"
              value={editMaterial.location}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, location: e.target.value })
              }
            />
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Description"
              value={editMaterial.description}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, description: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
