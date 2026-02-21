import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pet from "@/models/Pet";

interface QuestionnaireAnswers {
  livingSpace: string;
  activityLevel: string;
  timeAvailability: string;
  petSizePreference: string;
  petTypePreference: string[];
  experienceLevel: string;
  hasChildren: boolean;
  hasOtherPets: boolean;
  otherPetsDetails: string;
  allergyConcerns: string;
  preferredPersonality: string[];
  budgetRange: string;
}

interface UserProfile {
  name: string;
  housingType?: string;
  hasYard?: boolean;
  otherPets?: string;
  experience?: string;
  city?: string;
  state?: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { answers, userProfile } = body as {
      answers: QuestionnaireAnswers;
      userProfile: UserProfile;
    };

    if (!answers) {
      return NextResponse.json(
        { success: false, error: "Questionnaire answers are required" },
        { status: 400 }
      );
    }

    // Fetch available pets from database
    const typeFilter: Record<string, unknown> = { isAdopted: false };
    if (
      answers.petTypePreference &&
      answers.petTypePreference.length > 0 &&
      !answers.petTypePreference.includes("Any")
    ) {
      typeFilter.type = { $in: answers.petTypePreference };
    }

    const availablePets = await Pet.find(typeFilter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    if (availablePets.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          matches: [],
          message: "No pets currently available matching your preferences.",
        },
      });
    }

    // Build pet summaries for AI prompt
    const petSummaries = availablePets.map((pet) => ({
      id: pet._id.toString(),
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      personality: pet.personality,
      color: pet.color,
      weight: pet.weight || "Unknown",
      vaccinated: pet.vaccinated,
      neutered: pet.neutered,
      shelterName: pet.shelterName,
      image: pet.image,
    }));

    // Build the AI prompt
    const systemPrompt = `You are an expert pet adoption matchmaker AI. Your job is to analyze a potential adopter's lifestyle, preferences, and living situation, then match them with the most compatible pets from the available list.

For each match, provide:
1. A compatibility score (0-100)
2. A brief reason why this pet is a good match
3. Any considerations or tips for the adopter

Return your response as a valid JSON object with this exact structure:
{
  "matches": [
    {
      "petId": "the pet's id",
      "score": 95,
      "reason": "Brief explanation of why this is a great match",
      "tips": "Any helpful tips for the adopter about this pet"
    }
  ],
  "overallAdvice": "General adoption advice based on the user's profile"
}

Return the top 5 best matches, sorted by compatibility score (highest first). Only return valid JSON, no markdown or extra text.`;

    const userMessage = `Here is the adopter's profile and questionnaire answers:

**Adopter Profile:**
- Name: ${userProfile?.name || "Unknown"}
- Housing: ${userProfile?.housingType || answers.livingSpace || "Not specified"}
- Has Yard: ${userProfile?.hasYard ? "Yes" : "No"}
- Current Pets: ${userProfile?.otherPets || (answers.hasOtherPets ? answers.otherPetsDetails : "None")}
- Experience Level: ${userProfile?.experience || answers.experienceLevel || "Not specified"}
- Location: ${[userProfile?.city, userProfile?.state].filter(Boolean).join(", ") || "Not specified"}

**Lifestyle Questionnaire:**
- Living Space: ${answers.livingSpace}
- Activity Level: ${answers.activityLevel}
- Time Available for Pet: ${answers.timeAvailability}
- Preferred Pet Size: ${answers.petSizePreference}
- Preferred Pet Types: ${answers.petTypePreference?.join(", ") || "Any"}
- Has Children at Home: ${answers.hasChildren ? "Yes" : "No"}
- Has Other Pets: ${answers.hasOtherPets ? "Yes - " + answers.otherPetsDetails : "No"}
- Allergy Concerns: ${answers.allergyConcerns || "None"}
- Preferred Personality Traits: ${answers.preferredPersonality?.join(", ") || "Any"}
- Budget Range: ${answers.budgetRange || "Not specified"}

**Available Pets:**
${JSON.stringify(petSummaries, null, 2)}

Please analyze and return the top 5 best pet matches for this adopter.`;

    // Call Bytez API with GPT-4.1
    const Bytez = (await import("bytez.js")).default;
    const sdk = new Bytez("e99b917d01e614241b0bc5726eafb837");
    const model = sdk.model("openai/gpt-4.1");

    const { error, output } = await model.run([
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ]);

    if (error) {
      console.error("Bytez API error:", error);
      return NextResponse.json(
        { success: false, error: "AI matching service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Parse AI response
    let aiResponse;
    try {
      // Extract the text content from the output
      const responseText =
        typeof output === "string"
          ? output
          : output?.choices?.[0]?.message?.content ||
            output?.message?.content ||
            output?.content ||
            JSON.stringify(output);

      // Clean up potential markdown code blocks
      const cleanedText = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      aiResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, "Raw output:", output);
      // Fallback: return pets sorted by basic compatibility
      const fallbackMatches = petSummaries.slice(0, 5).map((pet, index) => ({
        petId: pet.id,
        score: 85 - index * 5,
        reason: `${pet.name} is a ${pet.age} old ${pet.breed} ${pet.type} with a ${pet.personality.join(", ")} personality that could be a great companion.`,
        tips: `Make sure to visit ${pet.shelterName} to meet ${pet.name} in person before making your decision.`,
      }));

      aiResponse = {
        matches: fallbackMatches,
        overallAdvice:
          "We recommend visiting the shelter to meet your potential pet in person. Every pet has a unique personality that you'll discover during your visit!",
      };
    }

    // Enrich matches with full pet data
    const enrichedMatches = (aiResponse.matches || []).map(
      (match: { petId: string; score: number; reason: string; tips: string }) => {
        const petData = availablePets.find(
          (p) => p._id.toString() === match.petId
        );
        return {
          ...match,
          pet: petData
            ? {
                _id: petData._id.toString(),
                name: petData.name,
                type: petData.type,
                breed: petData.breed,
                age: petData.age,
                gender: petData.gender,
                image: petData.image,
                shelterName: petData.shelterName,
                personality: petData.personality,
                color: petData.color,
                vaccinated: petData.vaccinated,
                neutered: petData.neutered,
              }
            : null,
        };
      }
    );

    return NextResponse.json({
      success: true,
      data: {
        matches: enrichedMatches.filter(
          (m: { pet: unknown }) => m.pet !== null
        ),
        overallAdvice: aiResponse.overallAdvice || "",
      },
    });
  } catch (error) {
    console.error("Smart match error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process smart matching" },
      { status: 500 }
    );
  }
}