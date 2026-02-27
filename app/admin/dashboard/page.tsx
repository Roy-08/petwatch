"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const I = {
  Paw: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={c}>
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  Users: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Building: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  ),
  File: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  ),
  Check: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Arrow: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Loader: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${c} animate-spin`}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  Heart: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={c}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Up: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  Chat: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  ),
  Zap: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Clock: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Activity: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>
    </svg>
  ),
  Refresh: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
    </svg>
  ),
};

interface Stats {
  totalPets: number; totalShelters: number; totalUsers: number; totalApplications: number;
  adoptedPets: number; availablePets: number; pendingApplications: number; reviewingApplications: number;
  approvedApplications: number; rejectedApplications: number; completedApplications: number;
  totalMessages: number; unreadMessages: number;
  petsByType: { _id: string; count: number }[];
  recentApplications: Array<{
    _id: string; petName: string; petImage: string; shelterName: string;
    status: string; applicantName: string; applicantEmail: string; createdAt: string;
    user?: { name: string; email: string }; pet?: { name: string; type: string; breed: string; image: string };
  }>;
  recentPets: Array<{
    _id: string; name: string; type: string; breed: string; image: string;
    shelterName: string; isAdopted: boolean; createdAt: string;
  }>;
}

const emptyStats: Stats = {
  totalPets: 0, totalShelters: 0, totalUsers: 0, totalApplications: 0,
  adoptedPets: 0, availablePets: 0, pendingApplications: 0, reviewingApplications: 0,
  approvedApplications: 0, rejectedApplications: 0, completedApplications: 0,
  totalMessages: 0, unreadMessages: 0,
  petsByType: [],
  recentApplications: [],
  recentPets: [],
};

const statusStyle: Record<string, { dot: string; bgDk: string; textDk: string; bgLt: string; textLt: string }> = {
  pending: { dot: "bg-amber-500", bgDk: "bg-amber-500/10", textDk: "text-amber-400", bgLt: "bg-amber-50", textLt: "text-amber-600" },
  reviewing: { dot: "bg-sky-500", bgDk: "bg-sky-500/10", textDk: "text-sky-400", bgLt: "bg-sky-50", textLt: "text-sky-600" },
  approved: { dot: "bg-emerald-500", bgDk: "bg-emerald-500/10", textDk: "text-emerald-400", bgLt: "bg-emerald-50", textLt: "text-emerald-600" },
  rejected: { dot: "bg-red-500", bgDk: "bg-red-500/10", textDk: "text-red-400", bgLt: "bg-red-50", textLt: "text-red-600" },
  completed: { dot: "bg-violet-500", bgDk: "bg-violet-500/10", textDk: "text-violet-400", bgLt: "bg-violet-50", textLt: "text-violet-600" },
};

function useDk() {
  const [dk, setDk] = useState(true);
  useEffect(() => {
    const check = () => setDk(localStorage.getItem("pm_theme_mode") !== "light");
    check();
    const id = setInterval(check, 300);
    return () => clearInterval(id);
  }, []);
  return dk;
}

/* ─── Animated Counter ─────────────────────────────────────────────────── */
function Counter({ value, dur = 1000 }: { value: number; dur?: number }) {
  const [n, setN] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const s = prev.current;
    const d = value - s;
    if (d === 0) return;
    const t0 = Date.now();
    let raf: number;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      const v = Math.round(s + d * e);
      setN(v);
      prev.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, dur]);
  return <>{n}</>;
}

/* ─── Mini Donut Chart ─────────────────────────────────────────────────── */
function DonutChart({ segments, size = 120 }: { segments: { value: number; color: string }[]; size?: number }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  if (total === 0) return null;
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth="10" className="opacity-[0.06]" />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circ;
        const gap = circ - dash;
        const el = (
          <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={seg.color} strokeWidth="10"
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} strokeLinecap="round"
            className="transition-all duration-1000" style={{ animation: `donutFill 1s ease-out ${i * 0.15}s both` }} />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

/* ─── Sparkline Mini Chart ─────────────────────────────────────────────── */
function Sparkline({ data, color, height = 32, width = 80 }: { data: number[]; color: string; height?: number; width?: number }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#spark-${color.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Time Ago Helper ─────────────────────────────────────────────────── */
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ─── Mobile Application Card ──────────────────────────────────────────── */
function MobileApplicationCard({ app, dk }: { app: Stats["recentApplications"][0]; dk: boolean }) {
  const sc = statusStyle[app.status] || statusStyle.pending;
  const applicant = app.user?.name || app.applicantName || "Unknown";
  const petName = app.pet?.name || app.petName || "Unknown";
  return (
    <div className={`p-4 rounded-xl ${dk ? "bg-zinc-800/40" : "bg-zinc-50"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-violet-500 to-purple-500 flex-shrink-0">
            {applicant.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-semibold truncate ${dk ? "text-zinc-200" : "text-zinc-700"}`}>{applicant}</p>
            <p className={`text-[11px] truncate ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{app.applicantEmail || app.user?.email || ""}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold flex-shrink-0 ${dk ? `${sc.bgDk} ${sc.textDk}` : `${sc.bgLt} ${sc.textLt}`}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
        </span>
      </div>
      <div className={`flex items-center justify-between text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
        <div className="flex items-center gap-2">
          <span className={`font-medium ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{petName}</span>
          <span>·</span>
          <span>{app.shelterName}</span>
        </div>
        <span className="tabular-nums">{timeAgo(app.createdAt)}</span>
      </div>
    </div>
  );
}

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const dk = useDk();

  const fetchStats = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      setError(null);
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && data.data) {
        setStats(data.data);
      } else {
        throw new Error(data.message || "Failed to load stats");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to fetch data";
      setError(msg);
      console.error("Error fetching stats:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <I.Loader c={`w-7 h-7 ${dk ? "text-violet-400" : "text-violet-500"}`} />
          <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading dashboard…</span>
        </div>
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const card = dk
    ? "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm"
    : "rounded-2xl border border-zinc-200/80 bg-white shadow-sm";

  const hasData = stats.totalPets > 0 || stats.totalUsers > 0 || stats.totalApplications > 0;

  const kpis = [
    { label: "Total Pets", val: stats.totalPets, icon: I.Paw, grad: "from-rose-500 to-pink-500", hex: "#f43f5e", sparkData: [12, 18, 24, 22, 28, 32, stats.totalPets] },
    { label: "Available", val: stats.availablePets, icon: I.Heart, grad: "from-emerald-500 to-teal-500", hex: "#10b981", sparkData: [8, 12, 15, 18, 20, 22, stats.availablePets] },
    { label: "Adopted", val: stats.adoptedPets, icon: I.Check, grad: "from-violet-500 to-purple-500", hex: "#8b5cf6", sparkData: [2, 4, 5, 7, 8, 10, stats.adoptedPets] },
    { label: "Shelters", val: stats.totalShelters, icon: I.Building, grad: "from-sky-500 to-blue-500", hex: "#0ea5e9", sparkData: [5, 7, 9, 10, 12, 13, stats.totalShelters] },
    { label: "Users", val: stats.totalUsers, icon: I.Users, grad: "from-amber-500 to-orange-500", hex: "#f59e0b", sparkData: [40, 55, 72, 88, 100, 115, stats.totalUsers] },
    { label: "Applications", val: stats.totalApplications, icon: I.File, grad: "from-cyan-500 to-teal-500", hex: "#06b6d4", sparkData: [10, 18, 22, 28, 35, 40, stats.totalApplications] },
  ];

  const pipeline = [
    { label: "Pending", val: stats.pendingApplications, color: "#f59e0b", grad: "from-amber-500 to-orange-500" },
    { label: "Reviewing", val: stats.reviewingApplications, color: "#0ea5e9", grad: "from-sky-500 to-blue-500" },
    { label: "Approved", val: stats.approvedApplications, color: "#10b981", grad: "from-emerald-500 to-green-500" },
    { label: "Rejected", val: stats.rejectedApplications, color: "#ef4444", grad: "from-red-500 to-rose-500" },
    { label: "Completed", val: stats.completedApplications, color: "#8b5cf6", grad: "from-violet-500 to-purple-500" },
  ];

  const petColors = ["#f43f5e", "#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b", "#06b6d4", "#6366f1"];
  const petEmoji: Record<string, string> = { Dog: "🐕", Cat: "🐈", Rabbit: "🐇", Bird: "🐦", Hamster: "🐹", Fish: "🐟", Turtle: "🐢" };

  const donutSegments = stats.petsByType.map((pt, i) => ({
    value: pt.count,
    color: petColors[i % petColors.length],
  }));

  const quickActions = [
    { href: "/admin/dashboard/pets", icon: I.Paw, title: "Manage Pets", desc: `${stats.totalPets} total listings`, grad: "from-rose-500 to-pink-500", hex: "#f43f5e" },
    { href: "/admin/dashboard/applications", icon: I.File, title: "Applications", desc: `${stats.pendingApplications} pending review`, grad: "from-sky-500 to-blue-500", hex: "#0ea5e9" },
    { href: "/admin/dashboard/messages", icon: I.Chat, title: "Messages", desc: `${stats.unreadMessages} unread`, grad: "from-emerald-500 to-teal-500", hex: "#10b981" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ═══ Hero Banner ═══ */}
      <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl ${dk ? "bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-800/50 border-zinc-800/60" : "bg-gradient-to-br from-white via-white to-zinc-50 border-zinc-200/80"} border`}>
        {/* Abstract gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
          <div className="absolute -bottom-24 -left-24 w-48 sm:w-72 h-48 sm:h-72 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
          <div className="absolute top-1/3 right-1/3 w-32 sm:w-48 h-32 sm:h-48 rounded-full opacity-8 blur-3xl"
            style={{ background: "radial-gradient(circle, #f43f5e, transparent)" }} />
        </div>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />

        <div className="relative p-4 sm:p-6 md:p-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-3 sm:mb-4 ${dk ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-50 text-violet-600 border border-violet-200"}`}>
                <I.Zap c="w-3 h-3" />
                Live Dashboard
              </div>
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>
                {greeting} <span className="inline-block" style={{ animation: "wave 2s ease-in-out infinite" }}>👋</span>
              </h1>
              <p className={`mt-1.5 sm:mt-2 text-xs sm:text-sm max-w-lg leading-relaxed ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
                {hasData ? (
                  <>
                    You have <span className={`font-bold ${dk ? "text-violet-400" : "text-violet-600"}`}>{stats.pendingApplications} pending application{stats.pendingApplications !== 1 ? "s" : ""}</span> and{" "}
                    <span className={`font-bold ${dk ? "text-cyan-400" : "text-cyan-600"}`}>{stats.unreadMessages} unread message{stats.unreadMessages !== 1 ? "s" : ""}</span> to review.
                  </>
                ) : (
                  "Welcome to your dashboard. Data will appear here once your system is connected."
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button onClick={() => fetchStats(true)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 ${dk ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"} ${refreshing ? "opacity-60 pointer-events-none" : ""}`}>
                <I.Refresh c={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing…" : "Refresh"}
              </button>
              <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium ${dk ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="hidden xs:inline">{error ? "Offline" : "Online"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className={`rounded-xl p-3 sm:p-4 flex items-center gap-3 ${dk ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-red-50 border border-red-200 text-red-600"}`}>
          <span className="text-xs sm:text-sm font-medium flex-1">⚠️ {error}</span>
          <button onClick={() => fetchStats(true)} className="text-xs font-bold underline flex-shrink-0">Retry</button>
        </div>
      )}

      {/* ═══ KPI Cards — 2 cols mobile, 3 cols desktop ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {kpis.map((k, i) => (
          <div key={k.label} className={`${card} p-3.5 sm:p-5 group cursor-default relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            style={{ animation: `riseIn 0.5s ease-out ${i * 0.07}s both` }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{k.label}</p>
                <p className={`text-2xl sm:text-3xl font-extrabold mt-1 sm:mt-1.5 tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>
                  <Counter value={k.val} />
                </p>
                <div className="mt-1.5 sm:mt-2">
                  <Sparkline data={k.sparkData} color={k.hex} width={60} height={20} />
                </div>
              </div>
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${k.grad} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 flex-shrink-0`}
                style={{ boxShadow: `0 8px 24px ${k.hex}30` }}>
                <k.icon c="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${k.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* ═══ Quick Actions — horizontal scroll on mobile, grid on desktop ═══ */}
      <div className="lg:hidden">
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {quickActions.map((a, i) => (
            <Link key={a.href} href={a.href}
              className={`${card} p-3.5 sm:p-4 group transition-all duration-300 flex items-center gap-3 relative overflow-hidden flex-shrink-0 min-w-[200px] sm:min-w-[220px]`}
              style={{ animation: `riseIn 0.5s ease-out ${i * 0.1}s both` }}>
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${a.grad} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 6px 16px ${a.hex}25` }}>
                <a.icon c="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs sm:text-sm font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{a.title}</p>
                <p className={`text-[10px] sm:text-[11px] ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{a.desc}</p>
              </div>
              <I.Arrow c={`w-3.5 h-3.5 flex-shrink-0 ${dk ? "text-zinc-600" : "text-zinc-300"}`} />
            </Link>
          ))}
        </div>
      </div>

      {/* ═══ Bento Grid: Pipeline + Donut + Quick Actions ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">

        {/* Application Pipeline — full width mobile, spans 5 cols desktop */}
        <div className={`${card} p-4 sm:p-6 md:col-span-1 lg:col-span-5`}>
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h2 className={`text-sm sm:text-base font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Application Pipeline</h2>
              <p className={`text-[11px] sm:text-xs mt-0.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{stats.totalApplications} total</p>
            </div>
            <Link href="/admin/dashboard/applications"
              className={`text-[11px] sm:text-xs font-semibold flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-colors ${dk ? "text-violet-400 hover:bg-violet-500/10" : "text-violet-600 hover:bg-violet-50"}`}>
              View <I.Arrow c="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
          {stats.totalApplications === 0 ? (
            <div className={`text-center py-6 sm:py-8 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>
              <I.File c="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs sm:text-sm">No applications yet</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {pipeline.map((p, i) => {
                const pct = stats.totalApplications > 0 ? (p.val / stats.totalApplications) * 100 : 0;
                return (
                  <div key={p.label} style={{ animation: `riseIn 0.4s ease-out ${i * 0.08}s both` }}>
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className={`text-xs sm:text-sm font-medium ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{p.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className={`text-[10px] sm:text-[11px] ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{pct.toFixed(0)}%</span>
                        <span className={`text-xs sm:text-sm font-bold tabular-nums ${dk ? "text-white" : "text-zinc-900"}`}>{p.val}</span>
                      </div>
                    </div>
                    <div className={`w-full h-1 sm:h-1.5 rounded-full overflow-hidden ${dk ? "bg-zinc-800" : "bg-zinc-100"}`}>
                      <div className={`h-full rounded-full bg-gradient-to-r ${p.grad} transition-all duration-1000`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pets by Type — Donut + Legend — full width mobile, spans 4 cols desktop */}
        <div className={`${card} p-4 sm:p-6 md:col-span-1 lg:col-span-4`}>
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h2 className={`text-sm sm:text-base font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Pets by Type</h2>
              <p className={`text-[11px] sm:text-xs mt-0.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{stats.totalPets} total</p>
            </div>
            <Link href="/admin/dashboard/pets"
              className={`text-[11px] sm:text-xs font-semibold flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-colors ${dk ? "text-violet-400 hover:bg-violet-500/10" : "text-violet-600 hover:bg-violet-50"}`}>
              Manage <I.Arrow c="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
          {stats.petsByType.length === 0 ? (
            <div className={`text-center py-6 sm:py-8 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>
              <I.Paw c="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs sm:text-sm">No pets registered</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="relative flex-shrink-0">
                <DonutChart segments={donutSegments} size={100} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-lg sm:text-xl font-extrabold ${dk ? "text-white" : "text-zinc-900"}`}>{stats.totalPets}</p>
                    <p className={`text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Total</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full space-y-2 sm:space-y-2.5">
                {stats.petsByType.slice(0, 5).map((pt, i) => {
                  const pct = stats.totalPets > 0 ? ((pt.count / stats.totalPets) * 100).toFixed(0) : "0";
                  return (
                    <div key={pt._id} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: petColors[i % petColors.length] }} />
                        <span className="text-xs sm:text-sm">{petEmoji[pt._id] || "🐾"}</span>
                        <span className={`text-[11px] sm:text-xs font-medium ${dk ? "text-zinc-400" : "text-zinc-500"}`}>{pt._id}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className={`text-[10px] sm:text-[11px] ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{pct}%</span>
                        <span className={`text-[11px] sm:text-xs font-bold tabular-nums ${dk ? "text-zinc-200" : "text-zinc-700"}`}>{pt.count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions — hidden on mobile (shown above as horizontal scroll), visible on desktop — spans 3 cols */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
          {quickActions.map((a, i) => (
            <Link key={a.href} href={a.href}
              className={`${card} p-4 group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-4 relative overflow-hidden`}
              style={{ animation: `riseIn 0.5s ease-out ${i * 0.1}s both` }}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.grad} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 6px 16px ${a.hex}25` }}>
                <a.icon c="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{a.title}</p>
                <p className={`text-[11px] ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{a.desc}</p>
              </div>
              <I.Arrow c={`w-4 h-4 flex-shrink-0 ${dk ? "text-zinc-600" : "text-zinc-300"} group-hover:translate-x-1 transition-transform duration-200`} />
            </Link>
          ))}
        </div>
      </div>

      {/* ═══ Recent Applications ═══ */}
      <div className={`${card} overflow-hidden`}>
        <div className="p-4 sm:p-6 pb-0">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h2 className={`text-sm sm:text-base font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Recent Applications</h2>
              <p className={`text-[11px] sm:text-xs mt-0.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Latest adoption requests</p>
            </div>
            <Link href="/admin/dashboard/applications"
              className={`text-[11px] sm:text-xs font-semibold flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-colors ${dk ? "text-violet-400 hover:bg-violet-500/10" : "text-violet-600 hover:bg-violet-50"}`}>
              View All <I.Arrow c="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </div>
        {stats.recentApplications.length === 0 ? (
          <div className={`px-4 sm:px-6 pb-6 sm:pb-8 pt-2 sm:pt-4 text-center ${dk ? "text-zinc-600" : "text-zinc-400"}`}>
            <I.File c="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 opacity-30" />
            <p className="text-xs sm:text-sm font-medium">No applications yet</p>
            <p className="text-[11px] sm:text-xs mt-1 opacity-60">Applications will appear here once submitted</p>
          </div>
        ) : (
          <>
            {/* Mobile: Card layout */}
            <div className="md:hidden px-4 pb-4 space-y-3">
              {stats.recentApplications.map((app, i) => (
                <div key={app._id} style={{ animation: `riseIn 0.4s ease-out ${i * 0.08}s both` }}>
                  <MobileApplicationCard app={app} dk={dk} />
                </div>
              ))}
            </div>
            {/* Desktop: Table layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={dk ? "border-t border-zinc-800/80" : "border-t border-zinc-100"}>
                    {["Applicant", "Pet", "Shelter", "Status", "Time"].map(h => (
                      <th key={h} className={`text-left px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] ${dk ? "text-zinc-500 bg-zinc-800/30" : "text-zinc-400 bg-zinc-50"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentApplications.map((app, i) => {
                    const sc = statusStyle[app.status] || statusStyle.pending;
                    const applicant = app.user?.name || app.applicantName || "Unknown";
                    const petName = app.pet?.name || app.petName || "Unknown";
                    return (
                      <tr key={app._id}
                        className={`transition-colors ${dk ? "border-t border-zinc-800/50 hover:bg-zinc-800/30" : "border-t border-zinc-100 hover:bg-zinc-50"}`}
                        style={{ animation: `riseIn 0.4s ease-out ${i * 0.08}s both` }}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-violet-500 to-purple-500 flex-shrink-0">
                              {applicant.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className={`font-semibold truncate ${dk ? "text-zinc-200" : "text-zinc-700"}`}>{applicant}</p>
                              <p className={`text-[11px] truncate ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{app.applicantEmail || app.user?.email || ""}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4 font-medium ${dk ? "text-zinc-300" : "text-zinc-700"}`}>{petName}</td>
                        <td className={`px-6 py-4 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{app.shelterName}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${dk ? `${sc.bgDk} ${sc.textDk}` : `${sc.bgLt} ${sc.textLt}`}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </td>
                        <td className={`px-6 py-4 tabular-nums text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
                          {timeAgo(app.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* ═══ Recent Pets ═══ */}
      {stats.recentPets.length > 0 && (
        <div className={`${card} p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h2 className={`text-sm sm:text-base font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Recently Added Pets</h2>
              <p className={`text-[11px] sm:text-xs mt-0.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Newest listings</p>
            </div>
            <Link href="/admin/dashboard/pets"
              className={`text-[11px] sm:text-xs font-semibold flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg transition-colors ${dk ? "text-violet-400 hover:bg-violet-500/10" : "text-violet-600 hover:bg-violet-50"}`}>
              View All <I.Arrow c="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {stats.recentPets.map((pet, i) => (
              <div key={pet._id}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-200 ${dk ? "bg-zinc-800/40 hover:bg-zinc-800/60" : "bg-zinc-50 hover:bg-zinc-100"}`}
                style={{ animation: `riseIn 0.4s ease-out ${i * 0.1}s both` }}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 ${dk ? "bg-zinc-700/50" : "bg-white shadow-sm"}`}>
                  {petEmoji[pet.type] || "🐾"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm font-bold truncate ${dk ? "text-white" : "text-zinc-900"}`}>{pet.name}</p>
                  <p className={`text-[10px] sm:text-[11px] truncate ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{pet.breed} · {pet.shelterName}</p>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold ${pet.isAdopted ? (dk ? "bg-violet-500/10 text-violet-400" : "bg-violet-50 text-violet-600") : (dk ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600")}`}>
                      {pet.isAdopted ? "Adopted" : "Available"}
                    </span>
                    <span className={`text-[9px] sm:text-[10px] ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{timeAgo(pet.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Activity Ticker ═══ */}
      {stats.recentApplications.length > 0 && (
        <div className={`${card} p-4 sm:p-5 flex flex-col gap-3 sm:gap-4`}>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center ${dk ? "bg-zinc-800" : "bg-zinc-100"}`}>
              <I.Activity c={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${dk ? "text-violet-400" : "text-violet-500"}`} />
            </div>
            <div>
              <p className={`text-xs font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Recent Activity</p>
              <p className={`text-[10px] sm:text-[11px] ${dk ? "text-zinc-500" : "text-zinc-400"}`}>From applications</p>
            </div>
          </div>
          <div className={`flex flex-col sm:flex-row sm:flex-wrap gap-2 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
            {stats.recentApplications.slice(0, 3).map((app, i) => {
              const applicant = app.user?.name || app.applicantName || "Someone";
              const petName = app.pet?.name || app.petName || "a pet";
              return (
                <div key={app._id || i} className={`flex items-center gap-2 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-lg ${dk ? "bg-zinc-800/50" : "bg-zinc-50"}`}>
                  <I.Clock c="w-3 h-3 opacity-50 flex-shrink-0" />
                  <span className="truncate">{applicant} applied for {petName}</span>
                  <span className="opacity-40 flex-shrink-0">·</span>
                  <span className="opacity-50 flex-shrink-0 whitespace-nowrap">{timeAgo(app.createdAt)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes donutFill {
          from { stroke-dasharray: 0 9999; }
        }
      `}</style>
    </div>
  );
}
