import connectDB from "@/lib/db";
import Material from "@/models/Material";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const material = await Material.findById(params.id);
    if (!material) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(material);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
