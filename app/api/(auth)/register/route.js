import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { email, phone, password } = body;

    // Check for required fields
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required." }), { status: 400 });
    }

    // Check if user already exists (by email or phone)
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists with given email or phone." }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Replace plain password with hashed password
    const newUserData = {
      ...body,
      password: hashedPassword,
    };

    // Create new user with dynamic fields
    const newUser = await User.create(newUserData);

    return new Response(JSON.stringify({ message: "User registered successfully", user: newUser }), {
      status: 201,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
