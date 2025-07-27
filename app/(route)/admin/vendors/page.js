// app/admin/vendors/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("/api/admin/vendors");
        const data = await res.json();
        setVendors(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧑‍💼 All Vendors</h1>

      {loading ? (
        <p>Loading...</p>
      ) : vendors.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        <div className="grid gap-4">
          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="border p-4 rounded-lg bg-white shadow"
            >
              <p><strong>Name:</strong> {vendor.name}</p>
              <p><strong>Email:</strong> {vendor.email}</p>
              <p><strong>Phone:</strong> {vendor.phone || "N/A"}</p>
              <p><strong>Role:</strong> {vendor.role}</p>
              <p className="text-sm text-gray-500">
                Joined on {new Date(vendor.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
