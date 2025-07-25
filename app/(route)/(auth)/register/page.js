"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === "vendor") router.push("/dashboard");
      else if (userData.role === "supplier") router.push("/supplier/dashboard");
    }
  };

  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "vendor", phone: "", location: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      if (data.user.role === "vendor") router.push("/dashboard");
      else if (data.user.role === "supplier") router.push("/supplier/dashboard");
    }
    else alert(data.error);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" className="w-full border p-2" onChange={(e) => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email" className="w-full border p-2" onChange={(e) => setForm({...form, email: e.target.value})} />
        <input type="tel" placeholder="Phone" className="w-full border p-2" onChange={(e) => setForm({...form, phone: e.target.value})} />
        <input type="text" placeholder="Location" className="w-full border p-2" onChange={(e) => setForm({...form, location: e.target.value})} />
        <select className="w-full border p-2" onChange={(e) => setForm({...form, role: e.target.value})}>
          <option value="vendor">Vendor</option>
          <option value="supplier">Supplier</option>
        </select>
        <input type="password" placeholder="Password" className="w-full border p-2" onChange={(e) => setForm({...form, password: e.target.value})} />
        <button className="bg-orange-500 text-white px-4 py-2 w-full">Register</button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
}
