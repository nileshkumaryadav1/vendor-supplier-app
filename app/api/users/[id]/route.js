// app/api/users/[id]/route.js
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const user = await User.find({ id });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: "Error fetching user" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const deletedUser = await User.deleteMany({ id });
    return new Response(JSON.stringify(deletedUser), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ message: "Error deleting user" }), {
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const updatedUser = await User.updateMany({ id }, { status: "Delivered" });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: "Error updating user" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const updatedUser = await Order.updateMany({ id }, { status: "Processing" });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: "Error updating user" }), {
      status: 500,
    });
  }
}