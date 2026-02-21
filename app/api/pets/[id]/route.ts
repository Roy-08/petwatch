import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pet from "@/models/Pet";
import "@/models/Shelter";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const pet = await Pet.findById(id).populate("shelter").lean();

    if (!pet) {
      return NextResponse.json(
        { success: false, error: "Pet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pet });
  } catch (error) {
    console.error("Error fetching pet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pet" },
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
    const pet = await Pet.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!pet) {
      return NextResponse.json(
        { success: false, error: "Pet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pet });
  } catch (error) {
    console.error("Error updating pet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update pet" },
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
    const pet = await Pet.findByIdAndDelete(id);

    if (!pet) {
      return NextResponse.json(
        { success: false, error: "Pet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Pet deleted" });
  } catch (error) {
    console.error("Error deleting pet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete pet" },
      { status: 500 }
    );
  }
}