import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, petId } = body;

    if (!userId || !petId) {
      return NextResponse.json(
        { success: false, error: "User ID and Pet ID are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const petIndex = user.favoritePets.findIndex(
      (id) => id.toString() === petId
    );

    if (petIndex > -1) {
      user.favoritePets.splice(petIndex, 1);
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Pet removed from favorites",
        isFavorite: false,
      });
    } else {
      user.favoritePets.push(petId);
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Pet added to favorites",
        isFavorite: true,
      });
    }
  } catch (error) {
    console.error("Favorites error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update favorites" },
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

    const user = await User.findById(userId).populate("favoritePets").lean();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user.favoritePets });
  } catch (error) {
    console.error("Favorites fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}