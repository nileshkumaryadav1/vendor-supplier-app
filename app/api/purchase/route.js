import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const { materialId, supplierId, vendorId } = body;

  try {
    const purchase = await Order.create({
      materialId,
      supplierId,
      vendorId,
      status: "pending", // or "completed"
    });

    return new Response(JSON.stringify({ message: "Purchased", purchase }), {
      status: 201,
    });
  } catch (err) {
    console.error("Purchase error:", err);
    return new Response(JSON.stringify({ error: "Failed to purchase" }), { status: 500 });
  }
}
