// app/api/users/[id]/route.js
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET: Fetch a user by ID
export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /users/:id error:", error);
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
}

// DELETE: Remove a user by ID
export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted", deletedUser }, { status: 200 });
  } catch (error) {
    console.error("DELETE /users/:id error:", error);
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}

// PATCH: Update a user's status to "Delivered"
export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { status: "Delivered" }, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User status updated to Delivered", updatedUser }, { status: 200 });
  } catch (error) {
    console.error("PATCH /users/:id error:", error);
    return NextResponse.json({ message: "Error updating user status" }, { status: 500 });
  }
}

// PUT: Update a user's status to "Processing"
// app/api/users/[id]/route.js

// import connectDB from "@/lib/db";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// PUT: Update a user's status to "Processing"
// export async function PUT(req, { params }) {
//   await connectDB();
//   const { id } = params;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { status: "Processing" },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "User status updated to 'Processing'",
//         data: updatedUser,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("PUT /api/users/[id] error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// import connectDB from "@/lib/db";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await connectDB();

  try {
    console.log("PUT request to /api/users/[id]", params);
    const { id } = params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "Processing" },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User status updated to 'Processing'",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error in PUT /api/users/[id]:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

