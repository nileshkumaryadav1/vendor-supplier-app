// app/api/orders/vendor/[id]/route.js
import Order from "@/models/Order";
// import Material from "@/models/Material";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  const orders = await Order.find({ vendorId: id }).populate("materialId");

  return Response.json(orders);
}
