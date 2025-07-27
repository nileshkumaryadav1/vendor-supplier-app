import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { deliveryDate } = await req.json();
    const { id: orderId } = params;

    if (!deliveryDate) {
      return new Response(JSON.stringify({ error: "Missing deliveryDate" }), { status: 400 });
    }

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { deliveryDate },
      { new: true }
    );

    if (!updated) {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Updated", order: updated }), { status: 200 });
  } catch (err) {
    console.error("❌ Delivery date update error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
