import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, token } = body;

    const user = await User.findOne({ email, verificationToken: token });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid verification token" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify email" },
      { status: 500 }
    );
  }
}