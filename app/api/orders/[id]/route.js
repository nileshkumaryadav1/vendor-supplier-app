import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Material from "@/models/Material";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params; // vendorId

  try {
    const orders = await Order.find({ vendorId: id }).populate("materialId");

    if (!orders || orders.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
