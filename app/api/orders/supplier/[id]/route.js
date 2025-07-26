// app/api/orders/supplier/[id]/route.js
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Material from "@/models/Material";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  // Get all materials created by this supplier
  const materials = await Material.find({ supplierId: id }).select("_id");
  const materialIds = materials.map((m) => m._id);

  // Get all orders for these materials
  const orders = await Order.find({ materialId: { $in: materialIds } })
    .populate("materialId")
    .populate("vendorId");

  return Response.json(orders);
}
