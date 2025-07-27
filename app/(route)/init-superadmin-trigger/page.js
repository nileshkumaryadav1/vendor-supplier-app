"use client";

import { useEffect, useState } from "react";

export default function InitSuperAdminTrigger() {
  const [status, setStatus] = useState("Initializing Super Admin...");

  useEffect(() => {
    const createAdmin = async () => {
      try {
        const res = await fetch("/api/init-superadmin", { method: "POST" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to create Super Admin");
        }

        console.log("✅ Super Admin Response:", data);
        setStatus(data.message || "Super Admin created successfully.");
      } catch (error) {
        console.error("❌ Error creating Super Admin:", error);
        setStatus("Failed to initialize Super Admin.");
      }
    };

    createAdmin();
  }, []);

  return (
    <div className="text-center py-4 text-sm text-gray-600">
      {status}
    </div>
  );
}
