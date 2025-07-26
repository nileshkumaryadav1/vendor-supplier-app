"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "vendor",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        if (userData.role === "vendor") router.push("/dashboard");
        else if (userData.role === "supplier")
          router.push("/supplier/dashboard");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        if (data.user.role === "vendor") router.push("/dashboard");
        else if (data.user.role === "supplier")
          router.push("/supplier/dashboard");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <select
            value={form.role}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="vendor">Vendor</option>
            <option value="supplier">Supplier</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded w-full transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
