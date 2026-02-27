import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ email: "admin@pawmatch.com" });
    if (existingAdmin) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists. Use email: admin@pawmatch.com, password: pawmatch1010",
      });
    }

    await Admin.create({
      name: "Admin User",
      email: "admin@pawmatch.com",
      password: "pawmatch1010",
      role: "super_admin",
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Admin seeded successfully! Use email: admin@pawmatch.com, password: pawmatch1010",
    });
  } catch (error) {
    console.error("Admin seed error:", error);
    return NextResponse.json(
      { success: false, error: `Failed to seed admin: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Send a POST request to /api/admin/seed to create the default admin account.",
  });

}

