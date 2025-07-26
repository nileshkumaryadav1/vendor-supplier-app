// /api/orders/route.js
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import RawMaterial from "@/models/RawMaterial";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  try {
    const material = await RawMaterial.findById(body.materialId);
    if (!material) {
      return new Response(JSON.stringify({ message: "Material not found" }), { status: 404 });
    }

    const totalPrice = material.pricePerKg * body.quantity;

    const order = new Order({
      vendorId: body.vendorId,
      materialId: body.materialId,
      quantity: body.quantity,
      totalPrice,
      status: "pending",
    });

    await order.save();
    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    console.error("Order Error:", error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), { status: 500 });
  }
}
