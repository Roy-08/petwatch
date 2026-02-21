import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pet from "@/models/Pet";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const breed = searchParams.get("breed");
    const gender = searchParams.get("gender");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { isAdopted: false };

    if (type) filter.type = type;
    if (breed) filter.breed = { $regex: breed, $options: "i" };
    if (gender) filter.gender = gender;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
        { shelterName: { $regex: search, $options: "i" } },
      ];
    }

    const [pets, total] = await Promise.all([
      Pet.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
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
    console.error("Error fetching pets:", error);
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