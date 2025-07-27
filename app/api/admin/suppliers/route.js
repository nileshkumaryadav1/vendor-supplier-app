// app/api/admin/suppliers/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const suppliers = await User.find({ role: "supplier" }).sort({ createdAt: -1 });

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
