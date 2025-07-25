"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user"); // or "vendor", "supplier", etc.

    // Redirect to login
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
