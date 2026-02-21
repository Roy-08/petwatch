import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Visit from "@/models/Visit";
import Shelter from "@/models/Shelter";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Look up the Shelter ObjectId by shelter name
    let shelterId = body.shelter;
    const shelterName = body.shelterName || "";

    if (!shelterId || !mongoose.Types.ObjectId.isValid(shelterId)) {
      // Try to find shelter by name
      if (shelterName) {
        const shelter = await Shelter.findOne({
          name: { $regex: new RegExp(shelterName.split(",")[0].trim(), "i") },
        }).lean();
        if (shelter) {
          shelterId = (shelter as any)._id;
        } else {
          return NextResponse.json(
            { success: false, error: `Shelter "${shelterName}" not found` },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { success: false, error: "Shelter information is required" },
          { status: 400 }
        );
      }
    }

    // Look up Pet ObjectId if petId is provided but not a valid ObjectId
    let petId = body.petId || body.pet;
    if (petId && !mongoose.Types.ObjectId.isValid(petId)) {
      petId = undefined; // Skip invalid pet IDs
    }

    // Build the visit document matching the Visit model schema
    const visitData = {
      user: body.user,
      shelter: shelterId,
      shelterName: shelterName,
      pet: petId || undefined,
      petName: body.petName || undefined,
      date: body.date,
      time: body.time || body.timeSlot, // Map timeSlot -> time
      status: "scheduled" as const, // Model enum: scheduled, completed, cancelled
      notes: body.message || body.notes || undefined,
    };

    const visit = await Visit.create(visitData);

    // Return with frontend-compatible field names
    const responseVisit = {
      ...visit.toObject(),
      timeSlot: visit.time,
      petImage: body.petImage || "",
      userName: body.userName || "",
      userEmail: body.userEmail || "",
      userPhone: body.userPhone || "",
      message: visit.notes || "",
      status: "pending", // Map "scheduled" back to "pending" for frontend
    };

    return NextResponse.json(
      { success: true, data: responseVisit },
      { status: 201 }
    );
  } catch (error) {
    console.error("Visit create error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to schedule visit" },
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

    // Query by both string and ObjectId to handle both storage formats
    const query = mongoose.Types.ObjectId.isValid(userId)
      ? { $or: [{ user: userId }, { user: new mongoose.Types.ObjectId(userId) }] }
      : { user: userId };

    const visits = await Visit.find(query)
      .populate("pet", "name image")
      .populate("shelter", "name city")
      .sort({ date: -1 })
      .lean();

    // Map model fields back to frontend-compatible field names
    const mappedVisits = visits.map((visit: any) => ({
      ...visit,
      timeSlot: visit.time || "",
      shelterName: visit.shelterName || (visit.shelter?.name ? `${visit.shelter.name}${visit.shelter.city ? `, ${visit.shelter.city}` : ""}` : ""),
      petImage: visit.pet?.image || "",
      petName: visit.petName || visit.pet?.name || "",
      message: visit.notes || "",
      // Map model status to frontend status
      status: visit.status === "scheduled" ? "pending" : visit.status,
    }));

    return NextResponse.json({ success: true, data: mappedVisits });
  } catch (error) {
    console.error("Visits fetch error:", error);
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
    const { visitId, status } = body;

    // Map frontend status to model status
    const statusMap: Record<string, string> = {
      pending: "scheduled",
      confirmed: "scheduled",
      scheduled: "scheduled",
      completed: "completed",
      cancelled: "cancelled",
    };
    const modelStatus = statusMap[status] || status;

    const visit = await Visit.findByIdAndUpdate(
      visitId,
      { status: modelStatus },
      { new: true }
    ).lean();

    if (!visit) {
      return NextResponse.json(
        { success: false, error: "Visit not found" },
        { status: 404 }
      );
    }

    // Map back for frontend
    const mappedVisit = {
      ...(visit as any),
      timeSlot: (visit as any).time || "",
      message: (visit as any).notes || "",
      status: (visit as any).status === "scheduled" ? "pending" : (visit as any).status,
    };

    return NextResponse.json({ success: true, data: mappedVisit });
  } catch (error) {
    console.error("Visit update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update visit" },
      { status: 500 }
    );
  }
}