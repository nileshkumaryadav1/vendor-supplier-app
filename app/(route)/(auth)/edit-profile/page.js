"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    shopName: "",
    location: "",
    status: "",
    Verified: false,
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (!stored || !stored._id) {
        router.push("/login");
        return;
      }

      setFormData({
        _id: stored._id || "",
        name: stored.name || "",
        email: stored.email || "",
        phone: stored.phone || "",
        role: stored.role || "",
        shopName: stored.shopName || "",
        location: stored.location || "",
        status: stored.status || "Inactive",
        Verified: stored.Verified || false,
      });
    } catch (err) {
      console.error("Error parsing user data:", err);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Profile updated successfully!");
        if (data.updatedUser) {
          localStorage.setItem("user", JSON.stringify(data.updatedUser));
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        // Optionally redirect
        // router.push("/dashboard");
      } else {
        setMessage("❌ Failed to update profile.");
        console.error("Update error:", data);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("❌ An unexpected error occurred.");
    }
  };

  if (loading) return <p className="text-center py-8">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-[var(--card)] rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div><p className="text-sm text-gray-600">User ID: {formData._id}</p></div>
        <div><p className="text-sm">Activeness: <strong>{formData.status}</strong></p></div>
        <div><p className="text-sm">Verified: <strong>{formData.Verified ? "✅ Yes" : "❌ No"}</strong></p></div>

        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-[var(--background)]"
            required
          >
            <option value="">Select Role</option>
            <option value="vendor">Vendor</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Shop Name</label>
          <input
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Full Address</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-[var(--accent)] text-white font-semibold hover:opacity-90"
        >
          Save Changes
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
