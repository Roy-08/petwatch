import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pet from "@/models/Pet";
import Shelter from "@/models/Shelter";
import AdoptionApplication from "@/models/AdoptionApplication";

export async function GET() {
  try {
    await connectDB();

    const [totalPets, totalShelters, adoptedPetsFromFlag, completedApplications, petsByType] =
      await Promise.all([
        Pet.countDocuments(),
        Shelter.countDocuments(),
        Pet.countDocuments({ isAdopted: true }),
        AdoptionApplication.countDocuments({ status: "completed" }),
        Pet.aggregate([
          { $group: { _id: "$type", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
      ]);

    // Use the higher of the two counts to ensure accuracy
    const adoptedPets = Math.max(adoptedPetsFromFlag, completedApplications);

    return NextResponse.json({
      success: true,
      data: {
        totalPets,
        totalShelters,
        adoptedPets,
        availablePets: totalPets - adoptedPets,
        petsByType,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}