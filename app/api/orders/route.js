import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Material from "@/models/Material";

export async function POST(req) {
  await connectDB();

  try {
    const { vendorId, materialId, quantity, location } = await req.json();

    // Validate inputs
    if (!vendorId || !materialId || !quantity || !location) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Get material to calculate price
    const material = await Material.findById(materialId);
    if (!material) {
      return new Response(JSON.stringify({ error: "Material not found" }), { status: 404 });
    }

    // Calculate total price
    const totalPrice = material.pricePerKg * quantity;

    // Create order
    const order = await Order.create({
      vendorId,
      materialId,
      quantity,
      totalPrice,
      location,
      status: "Processing", // default, can omit
    });

    return new Response(JSON.stringify({ message: "Order placed successfully", order }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Order placement failed:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req) {
  await connectDB();

  try {
    const { vendorId, materialId } = await req.json();

    if (!vendorId || !materialId) {
      return new Response(JSON.stringify({ error: "Missing vendor ID or material ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Remove a specific order
    const deleted = await Order.findOneAndDelete({ vendorId, materialId });

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Order deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Order cancellation error:", error);
    return new Response(JSON.stringify({ error: "Failed to cancel order" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
