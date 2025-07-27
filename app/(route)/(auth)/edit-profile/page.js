"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    _id: "",

    name: "",
    email: "",
    phone: "",
    // password: "",

    role: "",
    location: "",
    status: "",
    Verified: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));

    if (!stored) {
      router.push("/login");
      return;
    };

    if (stored) {
      setFormData({
        _id: stored._id || "",

        name: stored.name || "",
        email: stored.email || "",
        phone: stored.phone || "",
        // password: stored.password || "",

        role: stored.role || "",
        location: stored.location || "",
        status: stored.status || "",
        Verified: stored.Verified || "",
      });
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const res = await fetch(`/api/vendor/${formData._id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      setMessage("❌ Failed to update profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-[var(--card)] rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <p>ID: {formData._id}</p>
        </div>
         <div>
            <p>Activeness: {formData.status}</p>
        </div>
         <div>
            <p>Verified: {formData.Verified}</p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Name</label>
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
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            type="email"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            type="tel"
            required
          />
        </div>
        {/* <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-[var(--background)]"
            type="password"
            required
          />
        </div> */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={formData.role}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="vendor">Vendor</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="Enter your full Delivery Address"
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
      
      {message && <p className="mb-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}
