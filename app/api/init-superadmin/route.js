// app/api/init-superadmin/route.js
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();

    const existing = await Admin.findOne({ role: "superadmin" });

    if (existing) {
      return NextResponse.json(
        { message: "Superadmin already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // Change later for security

    const newAdmin = new Admin({
      name: "Super Admin",
      email: "superadmin@rawease.com",
      password: hashedPassword,
      role: "superadmin",
    });

    await newAdmin.save();

    return NextResponse.json(
      { message: "Superadmin created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating Superadmin:", error);
    return NextResponse.json(
      { message: "Internal server error while creating Superadmin." },
      { status: 500 }
    );
  }
}
