import connectDB from "@/lib/db";
import RawMaterial from "@/models/RawMaterial";

export async function POST(req) {
  await connectDB();
  const {
    name,
    category,
    pricePerKg,
    availableQuantity,
    description,
    imageUrl,
    qualityGrade,
    location,
    supplierId
  } = await req.json();

  const material = await RawMaterial.create({
    name,
    category,
    pricePerKg,
    availableQuantity,
    description,
    imageUrl,
    qualityGrade,
    location,
    supplierId
  });

  return new Response(JSON.stringify({ message: "Material added", material }), { status: 201 });
}
