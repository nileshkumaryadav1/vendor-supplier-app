import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Material from "@/models/Material";

export async function GET(req, { params }) {
  await connectDB();
  const { supplierId } = params;

  try {
    const items = await Material.find({ supplierId });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
