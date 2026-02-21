import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

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

    const admin = await Admin.findOne({ email, isActive: true }).lean();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (admin.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Update last login
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

    const adminData = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      shelter: admin.shelter,
      avatar: admin.avatar,
      isActive: admin.isActive,
    };

    return NextResponse.json({ success: true, data: adminData });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to login" },
      { status: 500 }
    );
  }
}