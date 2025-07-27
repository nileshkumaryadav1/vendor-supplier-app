import connectDB from "@/lib/db";
import Material from "@/models/Material";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Auto-create material from full body
    const material = await Material.create(body);

    return new Response(JSON.stringify({ message: "Material added", material }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Material creation error:", err);
    return new Response(JSON.stringify({ error: "Failed to add material" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
