import connectDB from "@/lib/db";
import RawMaterial from "@/models/RawMaterial";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const material = await RawMaterial.findById(params.id).populate("supplierId", "name");
    if (!material) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(material);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
