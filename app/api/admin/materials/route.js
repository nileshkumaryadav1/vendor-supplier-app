// app/api/admin/materials/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Material from "@/models/Material";

export async function GET() {
  try {
    await connectDB();

    const materials = await Material.find();

    return NextResponse.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    return NextResponse.json({ error: "Failed to fetch materials" }, { status: 500 });
  }
}
