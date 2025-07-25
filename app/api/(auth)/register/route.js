import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { name, email, password, role, phone, location } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ error: "User exists" }), { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashed, role, phone, location });

  return new Response(JSON.stringify({ message: "User registered", user: newUser }), { status: 201 });
}
