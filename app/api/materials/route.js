import connectDB from "@/lib/db";
import Material from "@/models/Material";

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url); // Extract query params
    const supplierId = searchParams.get("supplierId"); // e.g. ?supplierId=abc123

    const filter = supplierId ? { supplierId } : {};

    const materials = await Material.find(filter).lean();

    return new Response(JSON.stringify(materials), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching materials:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch materials" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
