import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Order from "@/models/Order";
import Material from "@/models/Material";

// 📌 GET ALL DATA (user, material, order)
export async function GET() {
  try {
    await connectDB();

    const materials = await Material.find();
    const orders = await Order.find();
    const users = await User.find();

    return NextResponse.json({ materials, orders, users }, { status: 200 });
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// 📌 EDIT ITEM
export async function PUT(req) {
  try {
    await connectDB();
    const { category, id, updatedItem } = await req.json();

    if (!category || !id || !updatedItem) {
      return NextResponse.json({ error: "Missing category, id or update data" }, { status: 400 });
    }

    let model;
    switch (category) {
      case "materials":
        model = Material;
        break;
      case "orders":
        model = Order;
        break;
      case "users":
        model = User;
        break;
      default:
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    await model.findByIdAndUpdate(id, updatedItem);
    return NextResponse.json({ message: `${category} updated successfully!` }, { status: 200 });

  } catch (error) {
    console.error("❌ PUT Error:", error);
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

// 📌 DELETE ITEM
export async function DELETE(req) {
  try {
    await connectDB();
    const { category, id } = await req.json();

    if (!category || !id) {
      return NextResponse.json({ error: "Missing category or id" }, { status: 400 });
    }

    if (category === "orders") {
      // Delete order by _id
      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Also delete all other orders with the same supplierId (optional cleanup logic)
      await Order.deleteMany({ supplierId: id });
    } else if (category === "materials") {
      await Material.findByIdAndDelete(id);
    } else if (category === "users") {
      await User.findByIdAndDelete(id);
    } else {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
