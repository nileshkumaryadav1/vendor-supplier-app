import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    // ✅ Fetch only suppliers
    const suppliers = await User.find({ role: "supplier" }).lean();

    return NextResponse.json(suppliers, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);

    return NextResponse.json(
      { error: "Failed to fetch suppliers" },
      { status: 500 }
    );
  }
}
