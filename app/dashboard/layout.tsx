"use client";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Heart, User, FileText, MessageCircle, LogOut, Sun, Moon, Bell,
  Check, X, Clock, Loader2, Sparkles,
  TrendingUp, Star, Shield, ChevronRight, Search, Eye, Calendar,
  Menu, Zap, Activity, PawPrint, MapPin,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */
export interface UserData {
  _id: string; name: string; email: string; phone?: string; address?: string;
  city?: string; state?: string; bio?: string; housingType?: string;
  hasYard?: boolean; otherPets?: string; experience?: string; isVerified: boolean;
  favoritePets?: string[];
}
export interface Pet {
  _id: string; name: string; type: string; breed: string; age: string;
  gender: string; image: string; shelterName: string; personality: string[];
  color: string;
}
export interface Application {
  _id: string; petName: string; petImage: string; shelterName: string;
  status: string; message: string; createdAt: string; updatedAt: string;
  documentType?: string; documentFileName?: string; addressProofType?: string;
  addressProofFileName?: string; fullAddress?: string; livingArrangement?: string;
  hasExperience?: boolean; reasonForAdoption?: string; undertakingAccepted?: boolean;
  applicantName?: string; applicantPhone?: string; applicantEmail?: string;
}
export interface Msg {
  notificationType: string;
  relatedStatus: any;
  relatedPetName: any;
  _id: string; senderName: string; senderType: string; recipientName: string;
  subject: string; content: string; isRead: boolean; createdAt: string;
}
export interface Visit {
  _id: string; user?: string; userName?: string; userEmail?: string; userPhone?: string;
  petId?: string; petName: string; petImage: string; shelterName: string;
  date: string; timeSlot: string; message?: string; status: string;
  adminNotes?: string; createdAt: string; updatedAt?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATUS CONFIG
   ═══════════════════════════════════════════════════════════════════════════ */
export const statusConfig: Record<string, {
  color: string; bg: string; border: string; icon: ReactNode;
  lightColor: string; lightBg: string; lightBorder: string;
}> = {
  pending: {
    color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20",
    lightColor: "text-amber-600", lightBg: "bg-amber-50", lightBorder: "border-amber-200",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  reviewing: {
    color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20",
    lightColor: "text-sky-600", lightBg: "bg-sky-50", lightBorder: "border-sky-200",
    icon: <Eye className="w-3.5 h-3.5" />,
  },
  approved: {
    color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20",
    lightColor: "text-emerald-600", lightBg: "bg-emerald-50", lightBorder: "border-emerald-200",
    icon: <Check className="w-3.5 h-3.5" />,
  },
  confirmed: {
    color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20",
    lightColor: "text-emerald-600", lightBg: "bg-emerald-50", lightBorder: "border-emerald-200",
    icon: <Check className="w-3.5 h-3.5" />,
  },
  rejected: {
    color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20",
    lightColor: "text-red-600", lightBg: "bg-red-50", lightBorder: "border-red-200",
    icon: <X className="w-3.5 h-3.5" />,
  },
  cancelled: {
    color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/20",
    lightColor: "text-gray-600", lightBg: "bg-gray-50", lightBorder: "border-gray-200",
    icon: <X className="w-3.5 h-3.5" />,
  },
  completed: {
    color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20",
    lightColor: "text-violet-600", lightBg: "bg-violet-50", lightBorder: "border-violet-200",
    icon: <Star className="w-3.5 h-3.5" />,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   REUSABLE INLINE COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
export function GlassCard({ children, className = "", onClick, dark }: {
  children: ReactNode; className?: string; onClick?: () => void; dark: boolean;
}) {
  return (
    <div onClick={onClick} className={`rounded-2xl sm:rounded-3xl border backdrop-blur-2xl transition-all duration-300 ${
      dark
        ? "border-white/[0.07] bg-white/[0.025] shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        : "border-gray-200/80 bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
    } ${className}`}>
      {children}
    </div>
  );
}

export function GradientButton({ children, className = "", type = "button", disabled = false, onClick, variant = "primary", dark }: {
  children: ReactNode; className?: string; type?: "button" | "submit";
  disabled?: boolean; onClick?: () => void;
  variant?: "primary" | "ghost" | "danger" | "outline"; dark: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-sm sm:text-base";
  const variants: Record<string, string> = {
    primary: "px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 hover:scale-[1.02]",
    ghost: dark
      ? "px-3 py-2 sm:px-4 sm:py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 border border-white/[0.06]"
      : "px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
    danger: dark
      ? "px-3 py-2 sm:px-4 sm:py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
      : "px-3 py-2 sm:px-4 sm:py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
    outline: dark
      ? "px-3 py-2 sm:px-4 sm:py-2.5 bg-transparent hover:bg-white/[0.04] text-gray-400 border border-white/[0.1]"
      : "px-3 py-2 sm:px-4 sm:py-2.5 bg-transparent hover:bg-gray-50 text-gray-500 border border-gray-200",
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

function FloatingOrb({ className, dark }: { className: string; dark: boolean }) {
  if (!dark) return null;
  return <div className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DEMO DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const DEMO_USER: UserData = {
  _id: "demo123", name: "Sarah Johnson", email: "sarah@example.com",
  phone: "+91 98765 43210", city: "Mumbai", state: "Maharashtra",
  bio: "Animal lover looking to adopt a furry friend!",
  housingType: "Apartment", hasYard: true, otherPets: "1 cat",
  experience: "Intermediate", isVerified: true, address: "123 Pet Street, Bandra West",
};
const DEMO_FAVORITES: Pet[] = [
  { _id: "1", name: "Luna", type: "Dog", breed: "Golden Retriever", age: "2 years", gender: "Female", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop", shelterName: "Happy Paws Shelter", personality: ["Friendly", "Playful"], color: "Golden" },
  { _id: "2", name: "Milo", type: "Cat", breed: "British Shorthair", age: "1 year", gender: "Male", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop", shelterName: "Whiskers Haven", personality: ["Calm", "Affectionate"], color: "Gray" },
  { _id: "3", name: "Buddy", type: "Dog", breed: "Labrador", age: "3 years", gender: "Male", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop", shelterName: "Furry Friends", personality: ["Loyal", "Energetic"], color: "Chocolate" },
  { _id: "4", name: "Whiskers", type: "Cat", breed: "Persian", age: "4 years", gender: "Female", image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=300&fit=crop", shelterName: "Kitty Corner", personality: ["Gentle", "Quiet"], color: "White" },
];
const DEMO_APPLICATIONS: Application[] = [
  { _id: "a1", petName: "Luna", petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop", shelterName: "Happy Paws Shelter", status: "reviewing", message: "I would love to give Luna a forever home. I have experience with dogs and a large yard.", createdAt: "2026-02-10T10:00:00Z", updatedAt: "2026-02-15T14:00:00Z", documentType: "Aadhar Card", documentFileName: "aadhar_card.pdf", addressProofType: "Electricity Bill", addressProofFileName: "electricity_bill.pdf" },
  { _id: "a2", petName: "Milo", petImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop", shelterName: "Whiskers Haven", status: "approved", message: "Milo seems perfect for our family. We already have a cat-friendly home.", createdAt: "2026-02-05T09:00:00Z", updatedAt: "2026-02-18T11:00:00Z", documentType: "PAN Card", documentFileName: "/images/PetAdoption.jpg", addressProofType: "Rent Agreement", addressProofFileName: "rent_agreement.pdf" },
  { _id: "a3", petName: "Buddy", petImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop", shelterName: "Furry Friends", status: "pending", message: "Buddy would be a great addition to our active family.", createdAt: "2026-02-18T09:00:00Z", updatedAt: "2026-02-18T09:00:00Z", documentType: "Passport", documentFileName: "/images/Passport.jpg", addressProofType: "Bank Statement", addressProofFileName: "bank_statement.pdf" },
];
const DEMO_VISITS: Visit[] = [
  {
    _id: "v1", userName: "Sarah Johnson", userEmail: "sarah@example.com", userPhone: "+91 98765 43210",
    petName: "Luna", petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    shelterName: "Happy Paws Shelter", date: "2026-02-25T00:00:00Z", timeSlot: "10:00 AM - 11:00 AM",
    message: "Looking forward to meeting Luna!", status: "confirmed",
    createdAt: "2026-02-19T10:00:00Z", updatedAt: "2026-02-20T14:00:00Z",
  },
  {
    _id: "v2", userName: "Sarah Johnson", userEmail: "sarah@example.com", userPhone: "+91 98765 43210",
    petName: "Buddy", petImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    shelterName: "Furry Friends", date: "2026-02-28T00:00:00Z", timeSlot: "2:00 PM - 3:00 PM",
    message: "", status: "pending",
    createdAt: "2026-02-20T09:00:00Z", updatedAt: "2026-02-20T09:00:00Z",
  },
];
const DEMO_MESSAGES: Msg[] = [
  {
    _id: "m1", senderName: "Happy Paws Shelter", senderType: "shelter", recipientName: "Sarah Johnson", subject: "Application Update - Luna 🐕", content: "Hi Sarah! We've reviewed your application for Luna and would love to schedule a meet & greet. Are you available this weekend?", isRead: false, createdAt: "2026-02-19T10:00:00Z",
    notificationType: "",
    relatedStatus: undefined,
    relatedPetName: undefined
  },
  {
    _id: "m2", senderName: "Sarah Johnson", senderType: "user", recipientName: "Whiskers Haven", subject: "Question about Milo", content: "Hi! I wanted to ask about Milo's dietary needs. Does he have any food allergies?", isRead: true, createdAt: "2026-02-17T15:00:00Z",
    notificationType: "",
    relatedStatus: undefined,
    relatedPetName: undefined
  },
  {
    _id: "m3", senderName: "Whiskers Haven", senderType: "shelter", recipientName: "Sarah Johnson", subject: "Re: Question about Milo 🐱", content: "Hi Sarah! Milo doesn't have any allergies. He loves wet food and treats. We'll prepare his care guide for you!", isRead: false, createdAt: "2026-02-18T09:00:00Z",
    notificationType: "",
    relatedStatus: undefined,
    relatedPetName: undefined
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CONTEXT - shared state across dashboard modules
   ═══════════════════════════════════════════════════════════════════════════ */
import { createContext, useContext } from "react";

interface DashboardContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  favorites: Pet[];
  setFavorites: React.Dispatch<React.SetStateAction<Pet[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  messages: Msg[];
  setMessages: React.Dispatch<React.SetStateAction<Msg[]>>;
  visits: Visit[];
  setVisits: React.Dispatch<React.SetStateAction<Visit[]>>;
  fetchFavorites: () => Promise<void>;
  fetchApplications: () => Promise<void>;
  fetchMessages: () => Promise<void>;
  fetchVisits: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardLayout");
  return ctx;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE BOTTOM NAV COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
function MobileBottomNav({
  activeTab,
  darkMode,
  unreadCount,
  favCount,
  appCount,
  visitCount,
}: {
  activeTab: string;
  darkMode: boolean;
  unreadCount: number;
  favCount: number;
  appCount: number;
  visitCount: number;
}) {
  const d = darkMode;
  const items = [
    { id: "profile", href: "/dashboard/profile", label: "Profile", icon: User, count: 0 },
    { id: "favorites", href: "/dashboard/favorites", label: "Favorites", icon: Heart, count: favCount },
    { id: "smart-match", href: "/dashboard/smart-match", label: "Match", icon: Sparkles, count: 0 },
    { id: "applications", href: "/dashboard/applications", label: "Apps", icon: FileText, count: appCount },
    { id: "messages", href: "/dashboard/messages", label: "Messages", icon: MessageCircle, count: unreadCount },
    { id: "visits", href: "/dashboard/visits", label: "Visits", icon: Calendar, count: visitCount },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t backdrop-blur-2xl ${
      d ? "bg-[#06060a]/90 border-white/[0.06]" : "bg-white/90 border-gray-200/60"
    }`}>
      <div className="flex items-center justify-around px-1 py-1.5 safe-area-bottom">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 rounded-xl min-w-0 flex-1 transition-all duration-200 ${
                isActive
                  ? d ? "text-white" : "text-rose-600"
                  : d ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent rounded-xl" />
              )}
              <div className="relative">
                <item.icon className={`w-5 h-5 transition-all duration-200 ${
                  isActive ? "scale-110" : ""
                }`} />
                {item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {item.count > 99 ? "99+" : item.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium leading-tight truncate max-w-full ${
                isActive ? "font-semibold" : ""
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN DASHBOARD LAYOUT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Pet[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  /* ─── Derive active tab from pathname ────────────────────────────────── */
  const getActiveTab = () => {
    if (pathname === "/dashboard" || pathname === "/dashboard/profile") return "profile";
    if (pathname === "/dashboard/favorites") return "favorites";
    if (pathname === "/dashboard/applications") return "applications";
    if (pathname === "/dashboard/messages") return "messages";
    if (pathname === "/dashboard/visits") return "visits";
    if (pathname === "/dashboard/smart-match") return "smart-match";
    return "profile";
  };
  const activeTab = getActiveTab();

  /* ─── Init ──────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const stored = localStorage.getItem("pawmatch_user");
    if (stored) {
      const ud = JSON.parse(stored);
      setUser(ud);
    } else {
      setUser(DEMO_USER);
      setFavorites(DEMO_FAVORITES);
      setApplications(DEMO_APPLICATIONS);
      setMessages(DEMO_MESSAGES);
      setVisits(DEMO_VISITS);
    }
    const savedTheme = localStorage.getItem("pawmatch_theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("pawmatch_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ─── Lock body scroll when mobile sidebar is open ──────────────────── */
  useEffect(() => {
    if (mobileSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebar]);

  /* ─── API Fetchers (for real users) ─────────────────────────────────────── */
  const fetchFavorites = useCallback(async () => {
    if (!user || user._id === "demo123") return;
    try {
      const res = await fetch(`/api/adopter/favorites?userId=${user._id}`);
      const data = await res.json();
      if (data.success) setFavorites(data.data || []);
    } catch (e) { console.error(e); }
  }, [user]);
  const fetchApplications = useCallback(async () => {
    if (!user || user._id === "demo123") return;
    try {
      const res = await fetch(`/api/adopter/applications?userId=${user._id}`);
      const data = await res.json();
      if (data.success) setApplications(data.data || []);
    } catch (e) { console.error(e); }
  }, [user]);
  const fetchMessages = useCallback(async () => {
    if (!user || user._id === "demo123") return;
    try {
      const res = await fetch(`/api/adopter/messages?userId=${user._id}`);
      const data = await res.json();
      if (data.success) setMessages(data.data || []);
    } catch (e) { console.error(e); }
  }, [user]);
  const fetchVisits = useCallback(async () => {
    if (!user || user._id === "demo123") return;
    try {
      const res = await fetch(`/api/adopter/visits?userId=${user._id}`);
      const data = await res.json();
      if (data.success) setVisits(data.data || []);
    } catch (e) { console.error(e); }
  }, [user]);

  /* Fetch ALL data on initial load so counts are available everywhere */
  useEffect(() => {
    if (user && user._id !== "demo123") {
      fetchFavorites();
      fetchApplications();
      fetchMessages();
      fetchVisits();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* Also re-fetch when switching tabs to get latest data */
  useEffect(() => {
    if (!user || user._id === "demo123") return;
    if (activeTab === "favorites") fetchFavorites();
    if (activeTab === "applications") fetchApplications();
    if (activeTab === "messages") fetchMessages();
    if (activeTab === "visits") fetchVisits();
  }, [activeTab, user, fetchFavorites, fetchApplications, fetchMessages, fetchVisits]);

  const handleLogout = () => {
    localStorage.removeItem("pawmatch_user");
    router.push("/auth/login");
  };

  /* ─── Loading ───────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${darkMode ? "bg-[#06060a]" : "bg-gray-50"}`}>
        <FloatingOrb dark={darkMode} className="w-[500px] h-[500px] bg-rose-600/10 top-[-10%] left-[-5%]" />
        <FloatingOrb dark={darkMode} className="w-[400px] h-[400px] bg-orange-600/10 bottom-[-10%] right-[-5%]" />
        <div className="flex flex-col items-center gap-5 z-10">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-rose-500/30 animate-pulse">
              <img src="/logo.png" alt="PawMatch Logo" className="w-10 sm:w-14 h-auto" />
            </div>
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-rose-500/20 to-orange-500/20 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-rose-400" />
            <span className={`font-medium tracking-wide text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Loading your dashboard…</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  /* ─── Derived ───────────────────────────────────────────────────────────── */
  const d = darkMode;
  const unreadCount = messages.filter(m => !m.isRead && m.senderType !== "user").length;

  const sidebarItems = [
    { id: "profile", href: "/dashboard/profile", label: "Profile", icon: User, count: 0, gradient: "from-violet-500 to-purple-600" },
    { id: "smart-match", href: "/dashboard/smart-match", label: "Smart Match", icon: Sparkles, count: 0, gradient: "from-purple-500 to-pink-600" },
    { id: "favorites", href: "/dashboard/favorites", label: "Favorites", icon: Heart, count: favorites.length, gradient: "from-rose-500 to-pink-600" },
    { id: "applications", href: "/dashboard/applications", label: "Applications", icon: FileText, count: applications.length, gradient: "from-blue-500 to-cyan-600" },
    { id: "messages", href: "/dashboard/messages", label: "Messages", icon: MessageCircle, count: unreadCount, gradient: "from-emerald-500 to-teal-600" },
    { id: "visits", href: "/dashboard/visits", label: "Visits", icon: Calendar, count: visits.length, gradient: "from-amber-500 to-orange-600" },
  ];

  const stats = [
    { icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />, label: "Favorites", value: favorites.length, gradient: "from-rose-500 to-pink-600", glow: "shadow-rose-500/20" },
    { icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />, label: "Applications", value: applications.length, gradient: "from-violet-500 to-purple-600", glow: "shadow-violet-500/20" },
    { icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />, label: "Messages", value: messages.length, gradient: "from-sky-500 to-blue-600", glow: "shadow-sky-500/20" },
  ];

  /* ═══════════════════════════════════════════════════════════════════════════
     SIDEBAR RENDERER
     ═══════════════════════════════════════════════════════════════════════════ */
  function renderSidebar() {
    return (
      <>
        {/* User Mini Profile */}
        <div className={`p-3 sm:p-4 mb-3 rounded-xl sm:rounded-2xl border ${
          d ? "bg-white/[0.03] border-white/[0.04]" : "bg-gray-50 border-gray-100"
        }`}>
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-500/20">
                {user!.name.charAt(0).toUpperCase()}
              </div>
              {user!.isVerified && (
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-md sm:rounded-lg flex items-center justify-center border-2 ${d ? "border-[#0a0a0f]" : "border-white"}`}>
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold truncate text-sm sm:text-base ${d ? "text-white" : "text-gray-900"}`}>{user!.name}</p>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span className={`text-xs truncate ${d ? "text-gray-500" : "text-gray-500"}`}>{user!.isVerified ? "Verified Adopter" : "Adopter"}</span>
              </div>
            </div>
          </div>
          {user!.city && (
            <div className={`flex items-center gap-1.5 mt-2.5 sm:mt-3 text-xs ${d ? "text-gray-500" : "text-gray-500"}`}>
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{user!.city}{user!.state ? `, ${user!.state}` : ""}</span>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link key={item.id} href={item.href}
                onClick={() => { setMobileSidebar(false); }}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-left font-medium transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? d ? "text-white" : "text-gray-900"
                    : d ? "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}>
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} ${d ? "opacity-[0.12]" : "opacity-[0.08]"} rounded-xl sm:rounded-2xl`} />
                )}
                {isActive && (
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 sm:h-8 rounded-r-full bg-gradient-to-b ${item.gradient}`} />
                )}
                <div className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  isActive ? `bg-gradient-to-br ${item.gradient} shadow-lg` : d ? "bg-white/[0.04] group-hover:bg-white/[0.06]" : "bg-gray-100 group-hover:bg-gray-200"
                }`}>
                  <item.icon className={`w-4 h-4 ${isActive ? "text-white" : d ? "text-gray-500 group-hover:text-gray-300" : "text-gray-500 group-hover:text-gray-700"}`} />
                </div>
                <span className="relative flex-1 text-sm truncate">{item.label}</span>
                {item.count > 0 && (
                  <span className={`relative min-w-[22px] sm:min-w-[24px] h-5 sm:h-6 px-1.5 sm:px-2 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? d ? "bg-white/15 text-white" : "bg-white/80 text-gray-700"
                      : d ? "bg-white/[0.04] text-gray-500" : "bg-gray-200 text-gray-600"
                  }`}>
                    {item.count}
                  </span>
                )}
                {isActive && <ChevronRight className={`w-4 h-4 relative flex-shrink-0 ${d ? "text-white/50" : "text-gray-400"}`} />}
              </Link>
            );
          })}
        </nav>

        {/* Quick Tip */}
        <div className={`mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${
          d ? "bg-gradient-to-br from-rose-500/[0.06] to-orange-500/[0.06] border-white/[0.04]"
            : "bg-gradient-to-br from-rose-50 to-orange-50 border-orange-100"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className={`text-xs font-semibold ${d ? "text-gray-400" : "text-gray-600"}`}>Quick Tip</span>
          </div>
          <p className={`text-xs leading-relaxed ${d ? "text-gray-500" : "text-gray-500"}`}>
            Complete your profile to increase your adoption approval chances by 3x! 🚀
          </p>
        </div>
      </>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     MAIN RENDER
     ═══════════════════════════════════════════════════════════════════════════ */
  return (
    <DashboardContext.Provider value={{
      user, setUser, darkMode, setDarkMode,
      favorites, setFavorites, applications, setApplications,
      messages, setMessages, visits, setVisits,
      fetchFavorites, fetchApplications, fetchMessages, fetchVisits,
    }}>
      <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
        d ? "bg-[#06060a] text-white" : "bg-[#f5f6fa] text-gray-900"
      }`} style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>

        {/* ─── Ambient Background ──────────────────────────────────────── */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <FloatingOrb dark={d} className="w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-rose-600/[0.04] top-[-15%] left-[-10%] animate-pulse" />
          <FloatingOrb dark={d} className="w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-600/[0.03] bottom-[-15%] right-[-10%] animate-pulse" />
          <FloatingOrb dark={d} className="w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-violet-600/[0.03] top-[40%] left-[50%] animate-pulse" />
          {d && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }} />
            </>
          )}
          {!d && (
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
          )}
        </div>

        {/* ─── Mobile Sidebar Overlay ──────────────────────────────────── */}
        {mobileSidebar && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebar(false)} />
            <div className={`absolute left-0 top-0 bottom-0 w-[min(320px,85vw)] backdrop-blur-2xl border-r p-4 sm:p-6 overflow-y-auto ${
              d ? "bg-[#0a0a0f]/95 border-white/[0.06]" : "bg-white/95 border-gray-200"
            }`} style={{ animation: "slideInLeft 0.3s ease-out" }}>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="PawMatch Logo" className="h-8 sm:h-10 w-auto" />
                </div>
                <button onClick={() => setMobileSidebar(false)} className={`p-2 rounded-xl ${d ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderSidebar()}
            </div>
          </div>
        )}

        {/* ─── Header ──────────────────────────────────────────────────── */}
        <header className={`sticky top-0 z-50 backdrop-blur-2xl border-b ${
          d ? "bg-[#06060a]/70 border-white/[0.04]" : "bg-white/70 border-gray-200/60"
        }`}>
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={() => setMobileSidebar(true)} className={`lg:hidden p-2 rounded-xl transition-colors ${
                d ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-500"
              }`}>
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <img src="/logo.png" alt="PawMatch Logo" className="h-8 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* Dark/Light Toggle */}
              <button onClick={() => setDarkMode(!darkMode)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 ${
                  d ? "hover:bg-white/5 text-gray-400 hover:text-amber-400" : "hover:bg-gray-100 text-gray-500 hover:text-indigo-500"
                }`} title={d ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                {d ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              <Link href="/dashboard/messages"
                className={`relative p-2 sm:p-2.5 rounded-xl transition-all ${d ? "hover:bg-white/5 text-gray-400 hover:text-gray-200" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"}`}>
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[9px] sm:text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-rose-500/40 animate-bounce" style={{ animationDuration: "2s" }}>
                    {unreadCount}
                  </span>
                )}
              </Link>

              <div className={`hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-2xl transition-colors cursor-default border ${
                d ? "bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.04]" : "bg-gray-50 hover:bg-gray-100 border-gray-200"
              }`}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-rose-500/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className={`text-sm font-semibold leading-none ${d ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                  <p className={`text-[10px] mt-0.5 ${d ? "text-gray-500" : "text-gray-500"}`}>{user.isVerified ? "✓ Verified" : "Adopter"}</p>
                </div>
              </div>

              {/* Mobile: show avatar only */}
              <div className={`flex sm:hidden items-center justify-center ${
                d ? "" : ""
              }`}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-rose-500/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <button onClick={handleLogout}
                className={`p-2 sm:p-2.5 rounded-xl transition-all ${d ? "hover:bg-red-500/10 text-gray-500 hover:text-red-400" : "hover:bg-red-50 text-gray-400 hover:text-red-500"}`}
                title="Logout">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 lg:pb-6">
          {/* ─── Welcome Banner ────────────────────────────────────────── */}
          <div className="mb-5 sm:mb-8">
            <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border ${d ? "border-white/[0.06]" : "border-gray-200/60"}`}
              style={{
                background: d
                  ? "linear-gradient(135deg, rgba(244,63,94,0.12) 0%, rgba(249,115,22,0.08) 50%, rgba(245,158,11,0.12) 100%)"
                  : "linear-gradient(135deg, rgba(244,63,94,0.06) 0%, rgba(249,115,22,0.04) 50%, rgba(245,158,11,0.06) 100%)",
              }}>
              <div className="absolute top-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-gradient-to-br from-rose-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-36 sm:w-60 h-36 sm:h-60 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
              <div className="hidden sm:block absolute top-6 right-8 w-2 h-2 bg-rose-400/40 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
              <div className="hidden sm:block absolute bottom-8 right-24 w-1.5 h-1.5 bg-amber-400/40 rounded-full animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
              <div className="hidden sm:block absolute top-12 right-32 w-1 h-1 bg-orange-400/40 rounded-full animate-ping" style={{ animationDuration: "5s", animationDelay: "2s" }} />

              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                    <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border ${
                      d ? "bg-white/[0.06] border-white/[0.08]" : "bg-white/60 border-gray-200"
                    }`}>
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span className={`text-[10px] sm:text-xs font-medium ${d ? "text-amber-400/80" : "text-amber-600"}`}>Good to see you!</span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border ${
                      d ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"
                    }`}>
                      <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                      <span className={`text-[10px] sm:text-xs font-medium ${d ? "text-emerald-400" : "text-emerald-600"}`}>Active</span>
                    </div>
                  </div>
                  <h1 className={`text-xl sm:text-3xl md:text-4xl font-extrabold mb-1.5 sm:mb-2 tracking-tight ${d ? "text-white" : "text-gray-900"}`}>
                    Welcome back, {user.name.split(" ")[0]}!{" "}
                    <span className="inline-block animate-bounce" style={{ animationDuration: "2s" }}>🐾</span>
                  </h1>
                  <p className={`text-sm sm:text-base max-w-lg leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>
                    Your adoption journey continues. Track applications, manage favorites, and connect with shelters.
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-shrink-0 flex-wrap">
                  <GradientButton dark={d} variant="ghost" onClick={() => router.push("/pets")}>
                    <Search className="w-4 h-4" /> <span className="hidden xs:inline">Browse</span> Pets
                  </GradientButton>
                  <GradientButton dark={d} onClick={() => router.push("/dashboard/smart-match")}>
                    <Sparkles className="w-4 h-4" /> <span className="hidden xs:inline">Smart</span> Match
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Stats Grid ────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="group cursor-pointer"
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}>
                <GlassCard dark={d} className={`p-3 sm:p-5 transition-all duration-500 hover:scale-[1.03] ${
                  d ? `hover:border-white/[0.12] ${hoveredStat === i ? `shadow-xl ${stat.glow}` : ""}` : `hover:border-gray-300 ${hoveredStat === i ? "shadow-xl shadow-gray-200/50" : ""}`
                }`}>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className={`text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider ${d ? "text-gray-500" : "text-gray-400"}`}>{stat.label}</p>
                    <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className={`text-xl sm:text-3xl font-extrabold tracking-tight ${d ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                    <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">Active</span>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* ─── Main Layout ───────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <GlassCard dark={d} className="p-3">
                  {renderSidebar()}
                </GlassCard>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        </div>

        {/* ─── Mobile Bottom Navigation ────────────────────────────────── */}
        <MobileBottomNav
          activeTab={activeTab}
          darkMode={d}
          unreadCount={unreadCount}
          favCount={favorites.length}
          appCount={applications.length}
          visitCount={visits.length}
        />

        {/* Inline keyframes */}
        <style>{`
          @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .safe-area-bottom {
            padding-bottom: max(0.375rem, env(safe-area-inset-bottom));
          }
        `}</style>
      </div>
    </DashboardContext.Provider>
  );
}
