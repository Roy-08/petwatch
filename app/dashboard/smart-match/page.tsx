"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles, ArrowRight, ArrowLeft, Check, Loader2, Heart,
  Home, Activity, Clock, Maximize, PawPrint, Baby, AlertTriangle,
  Smile, DollarSign, MapPin, Star, Shield, Stethoscope, RefreshCw,
} from "lucide-react";
import { useDashboard, GlassCard, GradientButton } from "../layout";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */
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

interface MatchedPet {
  petId: string;
  score: number;
  reason: string;
  tips: string;
  pet: {
    _id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    gender: string;
    image: string;
    shelterName: string;
    personality: string[];
    color: string;
    vaccinated: boolean;
    neutered: boolean;
  };
}

interface MatchResult {
  matches: MatchedPet[];
  overallAdvice: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   QUESTION DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */
interface QuestionDef {
  id: keyof QuestionnaireAnswers;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  type: "single" | "multi" | "boolean" | "text";
  options?: { value: string; label: string; emoji: string }[];
  condition?: (answers: QuestionnaireAnswers) => boolean;
}

const QUESTIONS: QuestionDef[] = [
  {
    id: "livingSpace",
    title: "What's your living situation?",
    subtitle: "This helps us find pets that fit your space",
    icon: <Home className="w-6 h-6" />,
    type: "single",
    options: [
      { value: "Studio Apartment", label: "Studio Apartment", emoji: "🏢" },
      { value: "Apartment", label: "Apartment", emoji: "🏬" },
      { value: "House", label: "House with Yard", emoji: "🏡" },
      { value: "Villa", label: "Villa / Large Property", emoji: "🏰" },
      { value: "Farm", label: "Farm / Rural", emoji: "🌾" },
    ],
  },
  {
    id: "activityLevel",
    title: "How active is your lifestyle?",
    subtitle: "Some pets need more exercise than others",
    icon: <Activity className="w-6 h-6" />,
    type: "single",
    options: [
      { value: "Sedentary", label: "Mostly at home", emoji: "🛋️" },
      { value: "Light", label: "Light walks & activities", emoji: "🚶" },
      { value: "Moderate", label: "Regular exercise", emoji: "🏃" },
      { value: "Active", label: "Very active / outdoorsy", emoji: "⛰️" },
      { value: "Athletic", label: "Athletic / sports lover", emoji: "🏋️" },
    ],
  },
  {
    id: "timeAvailability",
    title: "How much time can you dedicate daily?",
    subtitle: "Pets need attention, feeding, and playtime",
    icon: <Clock className="w-6 h-6" />,
    type: "single",
    options: [
      { value: "1-2 hours", label: "1-2 hours", emoji: "⏰" },
      { value: "2-4 hours", label: "2-4 hours", emoji: "🕐" },
      { value: "4-6 hours", label: "4-6 hours", emoji: "🕓" },
      { value: "6+ hours", label: "6+ hours (work from home)", emoji: "🏠" },
      { value: "Full time", label: "Full time availability", emoji: "💯" },
    ],
  },
  {
    id: "petSizePreference",
    title: "What size pet do you prefer?",
    subtitle: "Size matters for space and handling",
    icon: <Maximize className="w-6 h-6" />,
    type: "single",
    options: [
      { value: "Small", label: "Small (under 10kg)", emoji: "🐹" },
      { value: "Medium", label: "Medium (10-25kg)", emoji: "🐕" },
      { value: "Large", label: "Large (25-45kg)", emoji: "🐕‍🦺" },
      { value: "Extra Large", label: "Extra Large (45kg+)", emoji: "🦮" },
      { value: "No Preference", label: "No preference", emoji: "✨" },
    ],
  },
  {
    id: "petTypePreference",
    title: "What type of pet are you looking for?",
    subtitle: "Select one or more types",
    icon: <PawPrint className="w-6 h-6" />,
    type: "multi",
    options: [
      { value: "Dog", label: "Dog", emoji: "🐕" },
      { value: "Cat", label: "Cat", emoji: "🐈" },
      { value: "Rabbit", label: "Rabbit", emoji: "🐇" },
      { value: "Bird", label: "Bird", emoji: "🐦" },
      { value: "Hamster", label: "Hamster", emoji: "🐹" },
      { value: "Fish", label: "Fish", emoji: "🐠" },
      { value: "Turtle", label: "Turtle", emoji: "🐢" },
      { value: "Any", label: "Open to any", emoji: "💝" },
    ],
  },
  {
    id: "experienceLevel",
    title: "What's your pet care experience?",
    subtitle: "Be honest — it helps us find the right match!",
    icon: <Star className="w-6 h-6" />,
    type: "single",
    options: [
      { value: "None", label: "First time pet owner", emoji: "🌱" },
      { value: "Beginner", label: "Had pets as a child", emoji: "🌿" },
      { value: "Intermediate", label: "Owned pets before", emoji: "🌳" },
      { value: "Experienced", label: "Very experienced", emoji: "🏆" },
    ],
  },
  {
    id: "hasChildren",
    title: "Do you have children at home?",
    subtitle: "Some pets are better suited for families with kids",
    icon: <Baby className="w-6 h-6" />,
    type: "boolean",
  },
  {
    id: "hasOtherPets",
    title: "Do you have other pets?",
    subtitle: "Compatibility with existing pets is important",
    icon: <Heart className="w-6 h-6" />,
    type: "boolean",
  },
  {
    id: "otherPetsDetails",
    title: "Tell us about your current pets",
    subtitle: "e.g., '1 cat, 2 years old' or '2 dogs, both friendly'",
    icon: <PawPrint className="w-6 h-6" />,
    type: "text",
    condition: (answers) => answers.hasOtherPets === true,
  },
  {
    id: "allergyConcerns",
    title: "Any allergy concerns?",
    subtitle: "This helps us suggest hypoallergenic options",
    icon: <AlertTriangle className="w-6 h-6" />,
    type: "single",
    options: [
      { value: "None", label: "No allergies", emoji: "✅" },
      { value: "Mild", label: "Mild allergies (manageable)", emoji: "🤧" },
      { value: "Moderate", label: "Moderate allergies", emoji: "⚠️" },
      { value: "Severe", label: "Severe allergies", emoji: "🚨" },
    ],
  },
  {
    id: "preferredPersonality",
    title: "What personality traits do you prefer?",
    subtitle: "Select all that appeal to you",
    icon: <Smile className="w-6 h-6" />,
    type: "multi",
    options: [
      { value: "Friendly", label: "Friendly", emoji: "😊" },
      { value: "Playful", label: "Playful", emoji: "🎾" },
      { value: "Calm", label: "Calm", emoji: "😌" },
      { value: "Affectionate", label: "Affectionate", emoji: "🥰" },
      { value: "Loyal", label: "Loyal", emoji: "🤝" },
      { value: "Energetic", label: "Energetic", emoji: "⚡" },
      { value: "Gentle", label: "Gentle", emoji: "🕊️" },
      { value: "Independent", label: "Independent", emoji: "😎" },
      { value: "Quiet", label: "Quiet", emoji: "🤫" },
      { value: "Protective", label: "Protective", emoji: "🛡️" },
    ],
  },
  {
    id: "budgetRange",
    title: "What's your monthly pet care budget?",
    subtitle: "Including food, vet visits, and supplies",
    icon: <DollarSign className="w-6 h-6" />,
    type: "single",
    options: [
      { value: "Under ₹2,000", label: "Under ₹2,000", emoji: "💰" },
      { value: "₹2,000 - ₹5,000", label: "₹2,000 - ₹5,000", emoji: "💵" },
      { value: "₹5,000 - ₹10,000", label: "₹5,000 - ₹10,000", emoji: "💳" },
      { value: "₹10,000+", label: "₹10,000+", emoji: "💎" },
      { value: "Flexible", label: "Flexible / No limit", emoji: "✨" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function SmartMatchPage() {
  const router = useRouter();
  const { user, darkMode } = useDashboard();
  const d = darkMode;

  const [step, setStep] = useState<"intro" | "quiz" | "loading" | "results">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    livingSpace: "",
    activityLevel: "",
    timeAvailability: "",
    petSizePreference: "",
    petTypePreference: [],
    experienceLevel: "",
    hasChildren: false,
    hasOtherPets: false,
    otherPetsDetails: "",
    allergyConcerns: "",
    preferredPersonality: [],
    budgetRange: "",
  });
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState("");

  // Filter questions based on conditions
  const activeQuestions = QUESTIONS.filter(
    (q) => !q.condition || q.condition(answers)
  );

  const currentQ = activeQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / activeQuestions.length) * 100;

  /* ─── Handlers ─── */
  const handleSingleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestion < activeQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 300);
  };

  const handleMultiSelect = (value: string) => {
    setAnswers((prev) => {
      const current = prev[currentQ.id] as string[];
      if (value === "Any") {
        return { ...prev, [currentQ.id]: ["Any"] };
      }
      const filtered = current.filter((v) => v !== "Any");
      if (filtered.includes(value)) {
        return { ...prev, [currentQ.id]: filtered.filter((v) => v !== value) };
      }
      return { ...prev, [currentQ.id]: [...filtered, value] };
    });
  };

  const handleBooleanSelect = (value: boolean) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    setTimeout(() => {
      if (currentQuestion < activeQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 300);
  };

  const handleTextInput = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setStep("loading");
    setError("");

    try {
      const res = await fetch("/api/smart-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          userProfile: user
            ? {
                name: user.name,
                housingType: user.housingType,
                hasYard: user.hasYard,
                otherPets: user.otherPets,
                experience: user.experience,
                city: user.city,
                state: user.state,
              }
            : null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMatchResult(data.data);
        setStep("results");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setStep("quiz");
        setCurrentQuestion(activeQuestions.length - 1);
      }
    } catch {
      setError("Failed to connect to the matching service. Please try again.");
      setStep("quiz");
      setCurrentQuestion(activeQuestions.length - 1);
    }
  };

  const handleRestart = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({
      livingSpace: "",
      activityLevel: "",
      timeAvailability: "",
      petSizePreference: "",
      petTypePreference: [],
      experienceLevel: "",
      hasChildren: false,
      hasOtherPets: false,
      otherPetsDetails: "",
      allergyConcerns: "",
      preferredPersonality: [],
      budgetRange: "",
    });
    setMatchResult(null);
    setError("");
  };

  const isCurrentAnswered = () => {
    if (!currentQ) return false;
    const val = answers[currentQ.id];
    if (currentQ.type === "multi") return (val as string[]).length > 0;
    if (currentQ.type === "boolean") return true;
    if (currentQ.type === "text") return (val as string).trim().length > 0;
    return !!val;
  };

  const isLastQuestion = currentQuestion === activeQuestions.length - 1;

  /* ═══════════════════════════════════════════════════════════════════════════
     SCORE COLOR HELPER
     ═══════════════════════════════════════════════════════════════════════════ */
  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-green-500";
    if (score >= 75) return "from-sky-500 to-blue-500";
    if (score >= 60) return "from-amber-500 to-orange-500";
    return "from-rose-500 to-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 75) return "Great Match";
    if (score >= 60) return "Good Match";
    return "Possible Match";
  };

  /* ═══════════════════════════════════════════════════════════════════════════
     INTRO SCREEN
     ═══════════════════════════════════════════════════════════════════════════ */
  if (step === "intro") {
    return (
      <div>
        <GlassCard dark={d} className="overflow-hidden">
          {/* Hero Section */}
          <div
            className="relative p-8 md:p-12"
            style={{
              background: d
                ? "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 50%, rgba(249,115,22,0.15) 100%)"
                : "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(236,72,153,0.05) 50%, rgba(249,115,22,0.08) 100%)",
            }}
          >
            <div className="absolute top-4 right-6 w-3 h-3 bg-purple-400/40 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
            <div className="absolute bottom-6 right-20 w-2 h-2 bg-pink-400/40 rounded-full animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
            <div className="absolute top-10 right-28 w-1.5 h-1.5 bg-orange-400/40 rounded-full animate-ping" style={{ animationDuration: "5s", animationDelay: "2s" }} />

            <div className="relative text-center max-w-2xl mx-auto">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-2xl ${
                d ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-purple-500/30" : "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-purple-500/20"
              }`}>
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h1 className={`text-3xl md:text-4xl font-extrabold mb-4 tracking-tight ${d ? "text-white" : "text-gray-900"}`}>
                AI Smart Matching{" "}
                <span className="inline-block animate-bounce" style={{ animationDuration: "2s" }}>🤖</span>
              </h1>

              <p className={`text-lg mb-8 leading-relaxed max-w-lg mx-auto ${d ? "text-gray-400" : "text-gray-600"}`}>
                Our AI algorithm analyzes your lifestyle, preferences, and living situation to find the perfect pet companion for you. Answer a few questions and let the magic happen!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                {[
                  { icon: "📋", label: "Quick Quiz", desc: "~2 minutes" },
                  { icon: "🧠", label: "AI Analysis", desc: "GPT-4.1 powered" },
                  { icon: "🎯", label: "Top Matches", desc: "Ranked results" },
                ].map((item) => (
                  <div key={item.label} className={`p-3 rounded-2xl border text-center ${
                    d ? "bg-white/[0.03] border-white/[0.06]" : "bg-white/60 border-gray-200"
                  }`}>
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className={`text-xs font-semibold ${d ? "text-gray-300" : "text-gray-700"}`}>{item.label}</p>
                    <p className={`text-[10px] ${d ? "text-gray-500" : "text-gray-500"}`}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <GradientButton dark={d} className="text-lg px-8 py-4" onClick={() => setStep("quiz")}>
                <Sparkles className="w-5 h-5" /> Start Smart Matching <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LOADING SCREEN
     ═══════════════════════════════════════════════════════════════════════════ */
  if (step === "loading") {
    return (
      <div>
        <GlassCard dark={d} className="py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className={`w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl ${
              d ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-purple-500/30" : "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-purple-500/20"
            }`}>
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>

            <h2 className={`text-2xl font-extrabold mb-3 ${d ? "text-white" : "text-gray-900"}`}>
              Finding Your Perfect Match...
            </h2>
            <p className={`text-sm mb-8 ${d ? "text-gray-400" : "text-gray-600"}`}>
              Our AI is analyzing your preferences against available pets. This may take a moment.
            </p>

            <div className="space-y-3">
              {["Analyzing your lifestyle profile...", "Scanning available pets...", "Calculating compatibility scores...", "Preparing your matches..."].map((text, i) => (
                <div key={text} className={`flex items-center gap-3 p-3 rounded-xl border ${
                  d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                }`} style={{ animation: `fadeIn 0.5s ease-out ${i * 0.5}s both` }}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    d ? "bg-purple-500/20" : "bg-purple-100"
                  }`}>
                    <Loader2 className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                  </div>
                  <span className={`text-sm ${d ? "text-gray-400" : "text-gray-600"}`}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </GlassCard>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     RESULTS SCREEN
     ═══════════════════════════════════════════════════════════════════════════ */
  if (step === "results" && matchResult) {
    return (
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>
              Your Matches <span className="inline-block animate-bounce" style={{ animationDuration: "2s" }}>🎉</span>
            </h2>
            <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
              {matchResult.matches.length} pets matched based on your profile
            </p>
          </div>
          <GradientButton dark={d} variant="ghost" onClick={handleRestart}>
            <RefreshCw className="w-4 h-4" /> Retake Quiz
          </GradientButton>
        </div>

        {/* Overall Advice */}
        {matchResult.overallAdvice && (
          <GlassCard dark={d} className={`p-5 mb-6 border-l-4 ${
            d ? "border-l-purple-500" : "border-l-purple-500"
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                d ? "bg-purple-500/20" : "bg-purple-100"
              }`}>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className={`text-sm font-semibold mb-1 ${d ? "text-purple-400" : "text-purple-600"}`}>AI Recommendation</p>
                <p className={`text-sm leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>{matchResult.overallAdvice}</p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Match Cards */}
        {matchResult.matches.length === 0 ? (
          <GlassCard dark={d} className="py-16 text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center border ${
              d ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/10" : "bg-purple-50 border-purple-100"
            }`}>
              <PawPrint className="w-8 h-8 text-purple-400" />
            </div>
            <p className={`text-lg font-semibold mb-2 ${d ? "text-gray-300" : "text-gray-700"}`}>No matches found</p>
            <p className={`text-sm mb-6 ${d ? "text-gray-500" : "text-gray-500"}`}>Try adjusting your preferences or browse all available pets</p>
            <div className="flex gap-3 justify-center">
              <GradientButton dark={d} variant="ghost" onClick={handleRestart}>
                <RefreshCw className="w-4 h-4" /> Try Again
              </GradientButton>
              <GradientButton dark={d} onClick={() => router.push("/pets")}>
                <PawPrint className="w-4 h-4" /> Browse All Pets
              </GradientButton>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-5">
            {matchResult.matches.map((match, index) => (
              <GlassCard dark={d} key={match.petId} className={`overflow-hidden transition-all duration-300 ${
                d ? "hover:border-white/[0.12]" : "hover:border-gray-300"
              }`}>
                <div className="flex flex-col md:flex-row">
                  {/* Pet Image */}
                  <div className="relative w-full md:w-56 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={match.pet.image}
                      alt={match.pet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      d ? "from-[#06060a] via-transparent" : "from-black/40 via-transparent"
                    } to-transparent md:bg-gradient-to-r`} />

                    {/* Rank Badge */}
                    <div className="absolute top-3 left-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                        index === 0
                          ? "bg-gradient-to-br from-amber-400 to-yellow-500 shadow-amber-500/30"
                          : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-400 shadow-gray-400/30"
                          : index === 2
                          ? "bg-gradient-to-br from-amber-600 to-amber-700 shadow-amber-600/30"
                          : "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/30"
                      }`}>
                        #{index + 1}
                      </div>
                    </div>

                    {/* Score Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getScoreColor(match.score)} text-white text-xs font-bold shadow-lg`}>
                        {match.score}% Match
                      </div>
                    </div>
                  </div>

                  {/* Pet Details */}
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className={`text-xl font-bold ${d ? "text-white" : "text-gray-900"}`}>{match.pet.name}</h3>
                        <p className={`text-sm ${d ? "text-gray-400" : "text-gray-600"}`}>
                          {match.pet.breed} • {match.pet.age} • {match.pet.gender}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        d
                          ? `bg-gradient-to-r ${getScoreColor(match.score)} bg-clip-text text-transparent border-white/[0.1]`
                          : `text-gray-600 border-gray-200`
                      }`}>
                        <Star className={`w-3 h-3 ${match.score >= 90 ? "text-emerald-400" : match.score >= 75 ? "text-sky-400" : "text-amber-400"}`} />
                        {getScoreLabel(match.score)}
                      </span>
                    </div>

                    {/* Why this match */}
                    <div className={`p-3 rounded-xl border mb-3 ${
                      d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                    }`}>
                      <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${d ? "text-gray-500" : "text-gray-400"}`}>Why this match</p>
                      <p className={`text-sm leading-relaxed ${d ? "text-gray-300" : "text-gray-700"}`}>{match.reason}</p>
                    </div>

                    {/* Tips */}
                    {match.tips && (
                      <div className={`p-3 rounded-xl border mb-3 ${
                        d ? "bg-amber-500/[0.04] border-amber-500/10" : "bg-amber-50 border-amber-200"
                      }`}>
                        <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${d ? "text-amber-400/80" : "text-amber-600"}`}>💡 Tip</p>
                        <p className={`text-sm leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>{match.tips}</p>
                      </div>
                    )}

                    {/* Pet Info Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                        d ? "bg-white/[0.04] text-gray-400 border-white/[0.06]" : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}>
                        <MapPin className="w-3 h-3" /> {match.pet.shelterName}
                      </span>
                      {match.pet.vaccinated && (
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                          d ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                        }`}>
                          <Stethoscope className="w-3 h-3" /> Vaccinated
                        </span>
                      )}
                      {match.pet.neutered && (
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                          d ? "bg-sky-500/10 text-sky-400 border-sky-500/20" : "bg-sky-50 text-sky-600 border-sky-200"
                        }`}>
                          <Shield className="w-3 h-3" /> Neutered
                        </span>
                      )}
                      {match.pet.personality.map((p) => (
                        <span key={p} className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                          d ? "bg-white/[0.04] text-gray-400 border-white/[0.06]" : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}>{p}</span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <GradientButton dark={d} className="flex-1 text-sm" onClick={() => router.push(`/pets/${match.pet._id}`)}>
                        View Details <ArrowRight className="w-4 h-4" />
                      </GradientButton>
                      <GradientButton dark={d} variant="ghost" className="text-sm" onClick={() => router.push(`/pets/${match.pet._id}`)}>
                        <Heart className="w-4 h-4" /> Adopt
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     QUIZ SCREEN
     ═══════════════════════════════════════════════════════════════════════════ */
  return (
    <div>
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>
            <Sparkles className="w-5 h-5 inline-block mr-2 text-purple-400" />
            Smart Match Quiz
          </h2>
          <span className={`text-sm font-medium ${d ? "text-gray-500" : "text-gray-500"}`}>
            {currentQuestion + 1} of {activeQuestions.length}
          </span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${d ? "bg-white/[0.06]" : "bg-gray-200"}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={`mb-4 p-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${
          d ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-red-50 border border-red-200 text-red-600"
        }`}>
          <AlertTriangle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Question Card */}
      {currentQ && (
        <GlassCard dark={d} className="p-6 md:p-8">
          {/* Question Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              d ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20" : "bg-gradient-to-br from-purple-100 to-pink-100"
            }`}>
              <span className={d ? "text-purple-400" : "text-purple-600"}>{currentQ.icon}</span>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${d ? "text-white" : "text-gray-900"}`}>{currentQ.title}</h3>
              <p className={`text-sm ${d ? "text-gray-500" : "text-gray-500"}`}>{currentQ.subtitle}</p>
            </div>
          </div>

          {/* Options */}
          {currentQ.type === "single" && currentQ.options && (
            <div className="grid gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSingleSelect(opt.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? d
                          ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-lg shadow-purple-200/50"
                        : d
                        ? "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className={`font-medium text-sm ${
                      isSelected
                        ? d ? "text-white" : "text-gray-900"
                        : d ? "text-gray-300" : "text-gray-700"
                    }`}>{opt.label}</span>
                    {isSelected && (
                      <div className="ml-auto">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === "multi" && currentQ.options && (
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((opt) => {
                const selected = (answers[currentQ.id] as string[]) || [];
                const isSelected = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleMultiSelect(opt.value)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? d
                          ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-lg shadow-purple-200/50"
                        : d
                        ? "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className={`font-medium text-sm flex-1 ${
                      isSelected
                        ? d ? "text-white" : "text-gray-900"
                        : d ? "text-gray-300" : "text-gray-700"
                    }`}>{opt.label}</span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === "boolean" && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: true, label: "Yes", emoji: "👍" },
                { value: false, label: "No", emoji: "👎" },
              ].map((opt) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleBooleanSelect(opt.value)}
                    className={`flex flex-col items-center gap-3 p-8 rounded-2xl border text-center transition-all duration-300 ${
                      isSelected
                        ? d
                          ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-lg shadow-purple-200/50"
                        : d
                        ? "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
                        : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-4xl">{opt.emoji}</span>
                    <span className={`font-bold text-lg ${
                      isSelected
                        ? d ? "text-white" : "text-gray-900"
                        : d ? "text-gray-300" : "text-gray-700"
                    }`}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === "text" && (
            <div>
              <textarea
                value={(answers[currentQ.id] as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                rows={3}
                placeholder="Type your answer here..."
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 resize-none ${
                  d
                    ? "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                }`}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <GradientButton
              dark={d}
              variant="ghost"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </GradientButton>

            {isLastQuestion ? (
              <GradientButton
                dark={d}
                onClick={handleSubmit}
                disabled={!isCurrentAnswered()}
              >
                <Sparkles className="w-4 h-4" /> Find My Matches
              </GradientButton>
            ) : (
              <GradientButton
                dark={d}
                variant="ghost"
                onClick={handleNext}
                disabled={!isCurrentAnswered()}
              >
                Next <ArrowRight className="w-4 h-4" />
              </GradientButton>
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
}