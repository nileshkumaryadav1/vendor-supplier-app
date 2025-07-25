import connectDB from "@/lib/db";
import Order from "@/models/Order";
import RawMaterial from "@/models/RawMaterial"; // import Material to get price

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  // Get the material to get the price
  const material = await RawMaterial.findById(body.materialId);
  const totalPrice = material.price * body.quantity;

  const order = new Order({
    vendorId: body.vendorId,
    materialId: body.materialId,
    quantity: body.quantity,
    totalPrice, // save total price
    status: "pending",
  });

  await order.save();
  return new Response(JSON.stringify(order), { status: 201 });
}
