import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      bio: user.bio,
      avatar: user.avatar,
      housingType: user.housingType,
      hasYard: user.hasYard,
      otherPets: user.otherPets,
      experience: user.experience,
      isVerified: user.isVerified,
      favoritePets: user.favoritePets,
    };

    return NextResponse.json({ success: true, data: userData });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to login" },
      { status: 500 }
    );
  }
}