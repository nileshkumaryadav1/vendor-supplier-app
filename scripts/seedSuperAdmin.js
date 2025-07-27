// scripts/seedSuperAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config"; // to load env vars
import Admin from "../models/Admin.js"; // make sure this path is correct
import connectDB from "../lib/db.js"; // adjust import if needed

async function seedSuperAdmin() {
  await connectDB();

  const existing = await Admin.findOne({ role: "superadmin" });
  if (existing) {
    console.log("🚫 Superadmin already exists.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const newAdmin = new Admin({
    name: "Super Admin",
    email: "superadmin@fest.com",
    password: hashedPassword,
    role: "superadmin",
  });

  await newAdmin.save();
  console.log("✅ Superadmin created successfully!");
  process.exit(0);
}

seedSuperAdmin().catch((err) => {
  console.error("❌ Error creating Superadmin:", err);
  process.exit(1);
});
