import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Shelter from "@/models/Shelter";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};

    if (city) filter.city = { $regex: city, $options: "i" };
    if (state) filter.state = { $regex: state, $options: "i" };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
      ];
    }

    const shelters = await Shelter.find(filter).sort({ rating: -1 }).lean();

    return NextResponse.json({ success: true, data: shelters });
  } catch (error) {
    console.error("Error fetching shelters:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch shelters" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const shelter = await Shelter.create(body);
    return NextResponse.json(
      { success: true, data: shelter },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating shelter:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create shelter" },
      { status: 500 }
    );
  }
}