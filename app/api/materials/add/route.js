import connectDB from "@/lib/db";
import Material from "@/models/Material";

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

  const material = await Material.create({
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
