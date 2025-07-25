import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    console.log("Received params:", params);
    const { id } = params;

    const body = await req.json();
    console.log("Body received:", body);

    const { status } = body;
    if (!status) {
      return NextResponse.json({ error: "Missing status field" }, { status: 400 });
    }

    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error updating order:", err.message, err.stack);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
