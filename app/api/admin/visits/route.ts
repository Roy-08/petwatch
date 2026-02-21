import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Visit from "@/models/Visit";
import Message from "@/models/Message";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    // Map frontend status to model status for filtering
    if (status && status !== "all") {
      const statusMap: Record<string, string> = {
        pending: "scheduled",
        confirmed: "scheduled",
        scheduled: "scheduled",
        completed: "completed",
        cancelled: "cancelled",
      };
      filter.status = statusMap[status] || status;
    }
    if (search) {
      filter.$or = [
        { shelterName: { $regex: search, $options: "i" } },
        { petName: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }

    const [visits, total] = await Promise.all([
      Visit.find(filter)
        .populate("user", "name email phone")
        .populate("shelter", "name city")
        .populate("pet", "name image")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Visit.countDocuments(filter),
    ]);

    // Map model fields back to frontend field names
    const mappedVisits = visits.map((visit: any) => ({
      ...visit,
      timeSlot: visit.time || "",
      shelterName: visit.shelterName || visit.shelter?.name || "",
      userName: visit.user?.name || "",
      userEmail: visit.user?.email || "",
      userPhone: visit.user?.phone || "",
      petName: visit.petName || visit.pet?.name || "",
      petImage: visit.pet?.image || "",
      message: visit.notes || "",
      status: visit.status === "scheduled" ? "pending" : visit.status,
    }));

    return NextResponse.json({
      success: true,
      data: mappedVisits,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching visits:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch visits" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { visitId, status, adminNotes } = body;

    if (!visitId || !status) {
      return NextResponse.json(
        { success: false, error: "Visit ID and status are required" },
        { status: 400 }
      );
    }

    // Map frontend status to model status
    const statusMap: Record<string, string> = {
      pending: "scheduled",
      confirmed: "scheduled",
      accepted: "completed",
      scheduled: "scheduled",
      completed: "completed",
      cancelled: "cancelled",
      rejected: "cancelled",
    };
    const modelStatus = statusMap[status] || status;

    const updateData: Record<string, unknown> = { status: modelStatus };
    if (adminNotes !== undefined) updateData.notes = adminNotes;

    const visit = await Visit.findByIdAndUpdate(
      visitId,
      updateData,
      { new: true }
    )
      .populate("user", "name email phone")
      .populate("shelter", "name city")
      .populate("pet", "name image")
      .lean();

    if (!visit) {
      return NextResponse.json(
        { success: false, error: "Visit not found" },
        { status: 404 }
      );
    }

    const visitAny = visit as any;

    // ─── Send a message to the user about the visit status change ───
    try {
      const userName = visitAny.user?.name || "User";
      const userEmail = visitAny.user?.email || "";
      const petName = visitAny.petName || visitAny.pet?.name || "your pet";
      const shelterName = visitAny.shelterName || visitAny.shelter?.name || "the shelter";
      const visitDate = visitAny.date || "";
      const visitTime = visitAny.time || "";

      let subject = "";
      let content = "";

      if (status === "accepted" || status === "completed") {
        subject = `✅ Visit Request Accepted — ${petName}`;
        content = `Dear ${userName},\n\nGreat news! Your visit request to see ${petName} at ${shelterName} has been ACCEPTED.\n\n📅 Date: ${visitDate}\n🕐 Time: ${visitTime}\n📍 Shelter: ${shelterName}\n\n${adminNotes ? `Admin Notes: ${adminNotes}\n\n` : ""}Please arrive on time and bring a valid ID. We look forward to seeing you!\n\nBest regards,\nPawMatch Admin Team`;
      } else if (status === "rejected" || status === "cancelled") {
        subject = `❌ Visit Request Declined — ${petName}`;
        content = `Dear ${userName},\n\nWe regret to inform you that your visit request to see ${petName} at ${shelterName} has been DECLINED.\n\n📅 Requested Date: ${visitDate}\n🕐 Requested Time: ${visitTime}\n📍 Shelter: ${shelterName}\n\n${adminNotes ? `Reason: ${adminNotes}\n\n` : ""}You can schedule a new visit at a different time or contact us for more information.\n\nBest regards,\nPawMatch Admin Team`;
      }

      if (subject && content) {
        // Get admin ObjectId — use a placeholder admin ID or create one
        const adminData = {
          sender: new mongoose.Types.ObjectId(), // Admin system sender
          senderName: "PawMatch Admin",
          senderType: "shelter" as const,
          recipient: visitAny.user?._id || new mongoose.Types.ObjectId(),
          recipientName: userName,
          recipientType: "user" as const,
          subject,
          content,
          isRead: false,
        };

        await Message.create(adminData);
      }
    } catch (msgError) {
      console.error("Error sending visit status message:", msgError);
      // Don't fail the visit update if message sending fails
    }

    const mappedVisit = {
      ...visitAny,
      timeSlot: visitAny.time || "",
      message: visitAny.notes || "",
      adminNotes: visitAny.notes || "",
      userName: visitAny.user?.name || "",
      userEmail: visitAny.user?.email || "",
      userPhone: visitAny.user?.phone || "",
      petName: visitAny.petName || visitAny.pet?.name || "",
      petImage: visitAny.pet?.image || "",
      status: status, // Return the frontend status as-is
    };

    return NextResponse.json({ success: true, data: mappedVisit });
  } catch (error) {
    console.error("Error updating visit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update visit" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const visitId = searchParams.get("visitId");

    if (!visitId) {
      return NextResponse.json(
        { success: false, error: "Visit ID is required" },
        { status: 400 }
      );
    }

    const visit = await Visit.findByIdAndDelete(visitId);

    if (!visit) {
      return NextResponse.json(
        { success: false, error: "Visit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Visit deleted successfully" });
  } catch (error) {
    console.error("Error deleting visit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete visit" },
      { status: 500 }
    );
  }
}