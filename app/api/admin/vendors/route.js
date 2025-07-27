// app/api/admin/vendors/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const vendors = await User.find({ role: "vendor" }).sort({ createdAt: -1 });

    return NextResponse.json(vendors);
  } catch (error) {
    console.error("Failed to fetch vendors:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
