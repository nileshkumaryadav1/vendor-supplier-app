import connectDB from "@/lib/db";
import Material from "@/models/Material";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  await connectDB();

  try {
    const material = await Material.findById(params.id).lean();

    if (!material) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    return NextResponse.json(material, { status: 200 });
  } catch (err) {
    console.error("Error fetching material by ID:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
