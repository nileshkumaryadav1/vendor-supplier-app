// app/api/vendor/[id]/route.js
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
    const updatedOrders = await Order.updateMany(
      { vendorId },
      { status: "Delivered" }
    );
    return new Response(JSON.stringify(updatedOrders), { status: 200 });
  } catch (error) {
    console.error("Error updating vendor orders:", error);
    return new Response(JSON.stringify({ message: "Error updating orders" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  await connectDB();

  try {
    const { orderId, quantity, location, status, deliveryDate } =
      await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Missing order ID" }), {
        status: 400,
      });
    }

    const updateFields = {};
    if (quantity) updateFields.quantity = quantity;
    if (location) updateFields.location = location;
    if (status) updateFields.status = status;
    if (deliveryDate) updateFields.deliveryDate = deliveryDate; // ✅ NEW LINE

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateFields, {
      new: true,
    });

    if (!updatedOrder) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Order updated", updatedOrder }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Order update failed:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
