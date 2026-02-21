import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pet from "@/models/Pet";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: Record<string, unknown> = {};

    // Filter by pet type
    if (type) {
      filter.type = type;
    }

    // Filter by adoption status
    if (status === "available") {
      filter.isAdopted = false;
    } else if (status === "adopted") {
      filter.isAdopted = true;
    }

    // Search by name, breed, or shelter name
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
        { shelterName: { $regex: search, $options: "i" } },
      ];
    }

    const [pets, total] = await Promise.all([
      Pet.find(filter)
        .populate("shelter")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Pet.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: pets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admin pets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const pet = await Pet.create(body);
    return NextResponse.json({ success: true, data: pet }, { status: 201 });
  } catch (error) {
    console.error("Error creating pet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create pet" },
      { status: 500 }
    );
  }
}