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

export async function DELETE(req, { params }) {
  await connectDB();

  const { vendorId } = params;

  try {
    const deletedOrders = await Order.deleteMany({ vendorId });
    return new Response(JSON.stringify(deletedOrders), { status: 200 });
  } catch (error) {
    console.error("Error deleting vendor orders:", error);
    return new Response(JSON.stringify({ message: "Error deleting orders" }), {
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  await connectDB();

  const { vendorId } = params;

  try {
    const updatedOrders = await Order.updateMany({ vendorId }, { status: "Delivered" });
    return new Response(JSON.stringify(updatedOrders), { status: 200 });
  } catch (error) {
    console.error("Error updating vendor orders:", error);
    return new Response(JSON.stringify({ message: "Error updating orders" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  await connectDB();

  const { vendorId } = params;

  try {
    const updatedOrders = await Order.updateMany({ vendorId }, { status: "Processing" });
    return new Response(JSON.stringify(updatedOrders), { status: 200 });
  } catch (error) {
    console.error("Error updating vendor orders:", error);
    return new Response(JSON.stringify({ message: "Error updating orders" }), {
      status: 500,
    });
  }
}