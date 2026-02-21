import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pet from "@/models/Pet";
import Shelter from "@/models/Shelter";
import User from "@/models/User";
import AdoptionApplication from "@/models/AdoptionApplication";
import Message from "@/models/Message";
import Visit from "@/models/Visit";

export async function GET() {
  try {
    await connectDB();

    const [
      totalPets,
      totalShelters,
      totalUsers,
      totalApplications,
      adoptedPetsFromFlag,
      availablePetsFromFlag,
      pendingApplications,
      reviewingApplications,
      approvedApplications,
      rejectedApplications,
      completedApplications,
      totalMessages,
      unreadMessages,
      totalVisits,
      pendingVisits,
      confirmedVisits,
      completedVisits,
      cancelledVisits,
      petsByType,
      recentApplications,
      recentPets,
      applicationsByMonth,
    ] = await Promise.all([
      Pet.countDocuments(),
      Shelter.countDocuments(),
      User.countDocuments(),
      AdoptionApplication.countDocuments(),
      Pet.countDocuments({ isAdopted: true }),
      Pet.countDocuments({ isAdopted: false }),
      AdoptionApplication.countDocuments({ status: "pending" }),
      AdoptionApplication.countDocuments({ status: "reviewing" }),
      AdoptionApplication.countDocuments({ status: "approved" }),
      AdoptionApplication.countDocuments({ status: "rejected" }),
      AdoptionApplication.countDocuments({ status: "completed" }),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Visit.countDocuments(),
      Visit.countDocuments({ status: "pending" }),
      Visit.countDocuments({ status: "confirmed" }),
      Visit.countDocuments({ status: "completed" }),
      Visit.countDocuments({ status: "cancelled" }),
      Pet.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      AdoptionApplication.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "name email")
        .populate("pet", "name type breed image")
        .lean(),
      Pet.find().sort({ createdAt: -1 }).limit(5).lean(),
      AdoptionApplication.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
      ]),
    ]);

    // ─── Sync isAdopted flag on pets for completed applications ───────
    // This ensures that any pet with a completed application has isAdopted = true,
    // even if it wasn't set properly during the status update.
    if (completedApplications > 0) {
      const completedApps = await AdoptionApplication.find(
        { status: "completed" },
        { pet: 1 }
      ).lean();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const completedPetIds = completedApps
        .map((app: any) => app.pet)
        .filter(Boolean);
      if (completedPetIds.length > 0) {
        await Pet.updateMany(
          { _id: { $in: completedPetIds }, isAdopted: { $ne: true } },
          { $set: { isAdopted: true } }
        );
      }
    }

    // Re-count adopted pets after sync to get accurate numbers
    const adoptedPets = await Pet.countDocuments({ isAdopted: true });
    const availablePets = await Pet.countDocuments({
      $or: [{ isAdopted: false }, { isAdopted: { $exists: false } }],
    });

    // Use the higher of the two counts to ensure accuracy:
    // - adoptedPets: pets with isAdopted flag = true
    // - completedApplications: applications with status "completed"
    // In case there are completed applications whose pets weren't flagged,
    // we use the max to be safe.
    const effectiveAdoptedCount = Math.max(adoptedPets, completedApplications);

    // ─── Calculate Rates (percentages) ───────────────────────────────
    // Adoption Rate: percentage of total pets that have been adopted
    const adoptionRate =
      totalPets > 0
        ? parseFloat(((effectiveAdoptedCount / totalPets) * 100).toFixed(1))
        : 0;

    // Approval Rate: percentage of total applications that were approved
    // "approved" includes both "approved" status AND "completed" status,
    // because a completed application was necessarily approved first
    const totalApprovedOrCompleted = approvedApplications + completedApplications;
    const approvalRate =
      totalApplications > 0
        ? parseFloat(
            ((totalApprovedOrCompleted / totalApplications) * 100).toFixed(1)
          )
        : 0;

    // Completion Rate: percentage of total applications that reached "completed" status
    const completionRate =
      totalApplications > 0
        ? parseFloat(
            ((completedApplications / totalApplications) * 100).toFixed(1)
          )
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalPets,
        totalShelters,
        totalUsers,
        totalApplications,
        adoptedPets: effectiveAdoptedCount,
        availablePets: totalPets - effectiveAdoptedCount,
        pendingApplications,
        reviewingApplications,
        approvedApplications,
        rejectedApplications,
        completedApplications,
        totalMessages,
        unreadMessages,
        totalVisits,
        pendingVisits,
        confirmedVisits,
        completedVisits,
        cancelledVisits,
        petsByType,
        recentApplications,
        recentPets,
        applicationsByMonth,
        // Calculated rates for the report module
        adoptionRate,
        approvalRate,
        completionRate,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}