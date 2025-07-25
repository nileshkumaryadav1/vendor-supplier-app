"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === "vendor") router.push("/dashboard");
      else if (userData.role === "supplier") router.push("/supplier/dashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      if (data.user.role === "vendor") router.push("/dashboard");
      else if (data.user.role === "supplier") router.push("/supplier/dashboard");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full border p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full border p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="bg-green-600 text-white px-4 py-2 w-full">Login</button>
      </form>
      <p className="mt-4">Do not have an account? <a href="/register" className="text-blue-500">Register</a></p>
    </div>
  );
}
