import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const { deliveryDate } = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { deliveryDate },
      { new: true }
    );

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (err) {
    console.error("Error updating delivery date:", err);
    return new Response(JSON.stringify({ message: "Update failed" }), {
      status: 500,
    });
  }
}
