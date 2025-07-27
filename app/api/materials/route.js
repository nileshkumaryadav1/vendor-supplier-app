import connectDB from "@/lib/db";
import Material from "@/models/Material";

export async function GET() {
  await connectDB();

  try {
    const materials = await Material.find({}).lean();

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
