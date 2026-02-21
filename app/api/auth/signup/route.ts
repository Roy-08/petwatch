import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    const verificationToken = Math.random().toString(36).substring(2, 15);

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      isVerified: false,
    });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    };

    return NextResponse.json(
      { success: true, data: userData, message: "Account created successfully! Please verify your email." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create account" },
      { status: 500 }
    );
  }
}