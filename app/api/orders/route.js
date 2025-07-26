import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Material from "@/models/Material";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  try {
    const { vendorId, materialId, quantity, totalPrice } = body;

    // Fetch material
    const material = await Material.findById(materialId);
    if (!material) {
      return NextResponse.json({ message: "Material not found" }, { status: 404 });
    }

    // Check stock
    if (material.availableQuantity < quantity) {
      return NextResponse.json({ message: "Insufficient stock" }, { status: 400 });
    }

    // Create order
    const order = await Order.create({
      vendorId,
      materialId,
      quantity,
      totalPrice,
      status: "Processing", // default
    });

    // Decrease stock
    material.availableQuantity -= quantity;
    await material.save();

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
