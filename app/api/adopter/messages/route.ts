import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const message = await Message.create(body);
    return NextResponse.json(
      { success: true, data: message },
      { status: 201 }
    );
  } catch (error) {
    console.error("Message create error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
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

    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { messageId } = body;

    await Message.findByIdAndUpdate(messageId, { isRead: true });
    return NextResponse.json({ success: true, message: "Message marked as read" });
  } catch (error) {
    console.error("Message update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update message" },
      { status: 500 }
    );
  }
}
