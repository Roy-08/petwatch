import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdoptionApplication from "@/models/AdoptionApplication";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const existingApp = await AdoptionApplication.findOne({
      user: body.user,
      pet: body.pet,
      status: { $nin: ["rejected", "completed"] },
    });

    if (existingApp) {
      return NextResponse.json(
        { success: false, error: "You already have an active application for this pet" },
        { status: 400 }
      );
    }

    const application = await AdoptionApplication.create(body);
    return NextResponse.json(
      { success: true, data: application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application create error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const applications = await AdoptionApplication.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error("Applications fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}