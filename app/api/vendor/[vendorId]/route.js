import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  await connectDB();

  const { vendorId } = params;

  try {
    const orders = await Order.find({ vendorId }).populate("materialId");
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    return new Response(JSON.stringify({ message: "Error fetching orders" }), {
      status: 500,
    });
  }
}
