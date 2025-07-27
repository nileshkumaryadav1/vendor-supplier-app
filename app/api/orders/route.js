// app/api/orders/route.js

import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Material from "@/models/Material";

// GET /api/orders?supplierId=...&vendorId=...
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const supplierId = searchParams.get("supplierId");
  const vendorId = searchParams.get("vendorId");

  const query = {};
  if (supplierId) query.supplierId = supplierId;
  if (vendorId) query.vendorId = vendorId;

  try {
    const orders = await Order.find(query)
      .populate("materialId", "name pricePerKg")
      .populate("vendorId", "name email")
      .populate("supplierId", "name email");

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch orders" }),
      { status: 500 }
    );
  }
}

// POST /api/orders
export async function POST(req) {
  await connectDB();

  try {
    const {
      vendorId,
      supplierId,
      materialId,
      quantity,
      location,
      deliveryDate, // optional
    } = await req.json();

    // Validation
    if (!vendorId || !supplierId || !materialId || !quantity || !location) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const material = await Material.findById(materialId);
    if (!material) {
      return new Response(
        JSON.stringify({ error: "Material not found" }),
        { status: 404 }
      );
    }

    const totalPrice = material.pricePerKg * quantity;

    const order = await Order.create({
      vendorId,
      supplierId,
      materialId,
      quantity,
      totalPrice,
      location,
      deliveryDate: deliveryDate || null,
      status: "Processing",
    });

    return new Response(
      JSON.stringify({ message: "Order placed", order }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Order placement failed:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}

// PUT /api/orders
export async function PUT(req) {
  await connectDB();

  try {
    const {
      orderId,
      quantity,
      location,
      status,
      deliveryDate, // newly added support
    } = await req.json();

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "Missing order ID" }),
        { status: 400 }
      );
    }

    const updateFields = {};
    if (quantity !== undefined) updateFields.quantity = quantity;
    if (location !== undefined) updateFields.location = location;
    if (status !== undefined) updateFields.status = status;
    if (deliveryDate !== undefined) updateFields.deliveryDate = deliveryDate;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateFields,
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Order updated", updatedOrder }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Order update failed:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}

// DELETE /api/orders
export async function DELETE(req) {
  await connectDB();

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "Missing order ID" }),
        { status: 400 }
      );
    }

    const deleted = await Order.findByIdAndDelete(orderId);

    if (!deleted) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Order deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Order deletion failed:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
