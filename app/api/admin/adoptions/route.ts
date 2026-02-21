import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdoptionApplication from "@/models/AdoptionApplication";
import Pet from "@/models/Pet";

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

    if (status && status !== "all") filter.status = status;
    if (search) {
      filter.$or = [
        { petName: { $regex: search, $options: "i" } },
        { applicantName: { $regex: search, $options: "i" } },
        { applicantEmail: { $regex: search, $options: "i" } },
        { shelterName: { $regex: search, $options: "i" } },
      ];
    }

    const [applications, total] = await Promise.all([
      AdoptionApplication.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "name email phone")
        .populate("pet", "name type breed image")
        .lean(),
      AdoptionApplication.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { applicationId, status, adminNotes } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        { success: false, error: "Application ID and status are required" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = { status };
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const application = await AdoptionApplication.findByIdAndUpdate(
      applicationId,
      updateData,
      { new: true }
    ).lean();

    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    // When status is set to "completed", mark the pet as adopted
    if (status === "completed" && application.pet) {
      await Pet.findByIdAndUpdate(application.pet, { isAdopted: true });
    }

    // When status is changed from "completed" to something else, mark the pet as not adopted
    // (in case admin reverts the status)
    if (status !== "completed") {
      // Check if there are any other completed applications for this pet
      const otherCompleted = await AdoptionApplication.countDocuments({
        pet: application.pet,
        status: "completed",
        _id: { $ne: applicationId },
      });
      if (otherCompleted === 0 && application.pet) {
        await Pet.findByIdAndUpdate(application.pet, { isAdopted: false });
      }
    }

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update application" },
      { status: 500 }
    );
  }
}