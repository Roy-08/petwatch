import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, newPassword, token } = body;

    if (token && newPassword) {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: new Date() },
      });
      if (!user) {
        return NextResponse.json(
          { success: false, error: "Invalid or expired reset token" },
          { status: 400 }
        );
      }
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Password reset successfully!",
      });
    }

    if (email) {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({
          success: true,
          message: "If an account exists with this email, a reset link has been sent.",
        });
      }
      const resetToken = Math.random().toString(36).substring(2, 15);
      user.resetToken = resetToken;
      user.resetTokenExpiry = new Date(Date.now() + 3600000);
      await user.save();
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, a reset link has been sent.",
        token: resetToken,
      });
    }

    return NextResponse.json(
      { success: false, error: "Email is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}