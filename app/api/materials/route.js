import connectDB from "@/lib/db";
import RawMaterial from "@/models/RawMaterial";
import User from "@/models/User"; // ✅ This is required for populate to work

export async function GET() {
  await connectDB();

  const materials = await RawMaterial.find({})
    .populate("supplierId", "name location");

  return new Response(JSON.stringify(materials), { status: 200 });
}
