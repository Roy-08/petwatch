import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Shelter from "@/models/Shelter";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const shelter = await Shelter.findById(id).lean();

    if (!shelter) {
      return NextResponse.json(
        { success: false, error: "Shelter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: shelter });
  } catch (error) {
    console.error("Error fetching shelter:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch shelter" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const shelter = await Shelter.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!shelter) {
      return NextResponse.json(
        { success: false, error: "Shelter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: shelter });
  } catch (error) {
    console.error("Error updating shelter:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update shelter" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const shelter = await Shelter.findByIdAndDelete(id);

    if (!shelter) {
      return NextResponse.json(
        { success: false, error: "Shelter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Shelter deleted" });
  } catch (error) {
    console.error("Error deleting shelter:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete shelter" },
      { status: 500 }
    );
  }
}