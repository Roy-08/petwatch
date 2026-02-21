"use client"
import { useState, useEffect, useRef } from "react";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const Icons = {
  Loader: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  Paw: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  Users: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Building: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  ),
  FileText: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  ),
  MessageCircle: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  Heart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Clock: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Chart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>
    </svg>
  ),
};

function useDk() {
  const [dk, setDk] = useState(true);
  useEffect(() => {
    const check = () => setDk(localStorage.getItem("pm_theme_mode") !== "light");
    check(); const id = setInterval(check, 300); return () => clearInterval(id);
  }, []);
  return dk;
}

/* ─── Animated Counter ─────────────────────────────────────────────────── */
function Counter({ value, dur = 1000 }: { value: number; dur?: number }) {
  const [n, setN] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const s = prev.current; const d = value - s;
    if (d === 0) return;
    const t0 = Date.now(); let raf: number;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      const v = Math.round(s + d * e);
      setN(v); prev.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, dur]);
  return <>{n}</>;
}

interface Stats {
  totalPets: number; totalShelters: number; totalUsers: number; totalApplications: number;
  adoptedPets: number; availablePets: number; pendingApplications: number; reviewingApplications: number;
  approvedApplications: number; rejectedApplications: number; completedApplications: number;
  totalMessages: number; unreadMessages: number;
  petsByType: { _id: string; count: number }[];
  applicationsByMonth?: { _id: { month: number; year: number }; count: number }[];
  // Pre-calculated rates from backend (optional, we calculate on frontend as fallback)
  adoptionRate?: number;
  approvalRate?: number;
  completionRate?: number;
}

const DEMO_STATS: Stats = {
  totalPets: 36, totalShelters: 15, totalUsers: 128, totalApplications: 45,
  adoptedPets: 12, availablePets: 24, pendingApplications: 15, reviewingApplications: 8,
  approvedApplications: 12, rejectedApplications: 5, completedApplications: 5,
  totalMessages: 89, unreadMessages: 12,
  petsByType: [
    { _id: "Dog", count: 14 }, { _id: "Cat", count: 10 }, { _id: "Rabbit", count: 3 },
    { _id: "Bird", count: 3 }, { _id: "Hamster", count: 2 }, { _id: "Fish", count: 1 }, { _id: "Turtle", count: 1 },
  ],
  applicationsByMonth: [
    { _id: { month: 2, year: 2026 }, count: 15 }, { _id: { month: 1, year: 2026 }, count: 12 },
    { _id: { month: 12, year: 2025 }, count: 8 }, { _id: { month: 11, year: 2025 }, count: 6 },
    { _id: { month: 10, year: 2025 }, count: 3 }, { _id: { month: 9, year: 2025 }, count: 1 },
  ],
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const petEmoji: Record<string, string> = { Dog: "🐕", Cat: "🐈", Rabbit: "🐇", Bird: "🐦", Hamster: "🐹", Fish: "🐟", Turtle: "🐢" };

export default function AdminReportsPage() {
  const dk = useDk();
  const [stats, setStats] = useState<Stats>(DEMO_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (e) { console.error("Error fetching stats:", e); }
    finally { setLoading(false); }
  };

  const card = dk
    ? "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm"
    : "rounded-2xl border border-zinc-200/80 bg-white shadow-sm";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Icons.Loader className={`w-8 h-8 ${dk ? "text-violet-400" : "text-violet-500"}`} />
            <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full" />
          </div>
          <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading reports…</span>
        </div>
      </div>
    );
  }

  // ─── CORRECTED RATE CALCULATIONS ───────────────────────────────────────
  // Adoption Rate: percentage of total pets that have been adopted
  // Formula: adoptedPets / totalPets * 100
  const adoptionRate = stats.adoptionRate !== undefined
    ? stats.adoptionRate.toFixed(1)
    : stats.totalPets > 0
      ? ((stats.adoptedPets / stats.totalPets) * 100).toFixed(1)
      : "0";

  // Approval Rate: percentage of applications that were approved
  // IMPORTANT: "completed" applications were approved first, so they count as approved too
  // Formula: (approvedApplications + completedApplications) / totalApplications * 100
  const totalApprovedOrCompleted = stats.approvedApplications + stats.completedApplications;
  const approvalRate = stats.approvalRate !== undefined
    ? stats.approvalRate.toFixed(1)
    : stats.totalApplications > 0
      ? ((totalApprovedOrCompleted / stats.totalApplications) * 100).toFixed(1)
      : "0";

  // Completion Rate: percentage of applications that reached final "completed" status
  // Formula: completedApplications / totalApplications * 100
  const completionRate = stats.completionRate !== undefined
    ? stats.completionRate.toFixed(1)
    : stats.totalApplications > 0
      ? ((stats.completedApplications / stats.totalApplications) * 100).toFixed(1)
      : "0";

  const summaryCards = [
    { label: "Total Pets", value: stats.totalPets, icon: Icons.Paw, gradient: "from-rose-500 to-pink-600", hex: "#f43f5e" },
    { label: "Total Users", value: stats.totalUsers, icon: Icons.Users, gradient: "from-amber-500 to-orange-600", hex: "#f59e0b" },
    { label: "Shelters", value: stats.totalShelters, icon: Icons.Building, gradient: "from-sky-500 to-blue-600", hex: "#0ea5e9" },
    { label: "Applications", value: stats.totalApplications, icon: Icons.FileText, gradient: "from-cyan-500 to-teal-600", hex: "#06b6d4" },
    { label: "Messages", value: stats.totalMessages, icon: Icons.MessageCircle, gradient: "from-emerald-500 to-green-600", hex: "#10b981" },
    { label: "Adoption Rate", value: -1, display: `${adoptionRate}%`, icon: Icons.TrendingUp, gradient: "from-violet-500 to-purple-600", hex: "#8b5cf6" },
  ];

  const applicationBreakdown = [
    { label: "Pending", value: stats.pendingApplications, color: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
    { label: "Reviewing", value: stats.reviewingApplications, color: "#0ea5e9", gradient: "from-sky-500 to-blue-500" },
    { label: "Approved", value: stats.approvedApplications, color: "#10b981", gradient: "from-emerald-500 to-green-500" },
    { label: "Rejected", value: stats.rejectedApplications, color: "#ef4444", gradient: "from-red-500 to-rose-500" },
    { label: "Completed", value: stats.completedApplications, color: "#8b5cf6", gradient: "from-violet-500 to-purple-500" },
  ];

  const maxMonthlyCount = stats.applicationsByMonth ? Math.max(...stats.applicationsByMonth.map(m => m.count), 1) : 1;

  const ringCharts = [
    {
      label: "Adoption Rate",
      value: parseFloat(adoptionRate),
      gradId: "adoptGrad",
      c1: "#8b5cf6",
      c2: "#6366f1",
      sub: "Adopted",
      stats: [
        { v: stats.availablePets, l: "Available", c: "text-emerald-400" },
        { v: stats.adoptedPets, l: "Adopted", c: "text-violet-400" },
        { v: stats.totalPets, l: "Total", c: dk ? "text-white" : "text-zinc-900" },
      ],
    },
    {
      label: "Approval Rate",
      value: parseFloat(approvalRate),
      gradId: "approveGrad",
      c1: "#10b981",
      c2: "#059669",
      sub: "Approved",
      stats: [
        // Show total approved (approved + completed) as the "Approved" count
        { v: totalApprovedOrCompleted, l: "Approved", c: "text-emerald-400" },
        { v: stats.rejectedApplications, l: "Rejected", c: "text-red-400" },
        { v: stats.totalApplications, l: "Total", c: dk ? "text-white" : "text-zinc-900" },
      ],
    },
    {
      label: "Completion Rate",
      value: parseFloat(completionRate),
      gradId: "completeGrad",
      c1: "#f59e0b",
      c2: "#d97706",
      sub: "Completed",
      stats: [
        { v: stats.completedApplications, l: "Completed", c: "text-violet-400" },
        { v: stats.pendingApplications, l: "Pending", c: "text-amber-400" },
        { v: stats.reviewingApplications, l: "Reviewing", c: "text-sky-400" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* ═══ Hero Header ═══ */}
      <div className={`relative overflow-hidden rounded-2xl ${dk ? "bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-800/50 border-zinc-800/60" : "bg-gradient-to-br from-white via-white to-zinc-50 border-zinc-200/80"} border`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
          <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full opacity-[0.08] blur-3xl" style={{ background: "radial-gradient(circle, #f43f5e, transparent)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative p-6 sm:p-8 flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/25">
              <Icons.Chart className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 opacity-20 blur-xl" />
          </div>
          <div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>
              Reports & Analytics 📊
            </h1>
            <p className={`text-sm mt-1 max-w-lg ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
              Platform performance metrics, adoption statistics, and application trends.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Summary Cards ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCards.map((stat, i) => (
          <div key={stat.label} className={`${card} p-4 group cursor-default relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            style={{ animation: `riseIn 0.5s ease-out ${i * 0.06}s both` }}>
            <div className="flex items-center justify-between mb-3">
              <p className={`text-[10px] font-bold uppercase tracking-wider ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{stat.label}</p>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                style={{ boxShadow: `0 6px 16px ${stat.hex}30` }}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className={`text-2xl font-extrabold ${dk ? "text-white" : "text-zinc-900"}`}>
              {stat.value === -1 ? stat.display : <Counter value={stat.value} />}
            </p>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* ═══ Ring Charts ═══ */}
      <div className="grid md:grid-cols-3 gap-4">
        {ringCharts.map((rc, i) => (
          <div key={rc.label} className={`${card} p-6`} style={{ animation: `riseIn 0.5s ease-out ${i * 0.1}s both` }}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{rc.label}</h3>
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke={dk ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke={`url(#${rc.gradId})`} strokeWidth="10"
                    strokeDasharray={`${(rc.value / 100) * 314} 314`}
                    strokeLinecap="round" className="transition-all duration-1000" />
                  <defs>
                    <linearGradient id={rc.gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={rc.c1} />
                      <stop offset="100%" stopColor={rc.c2} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-extrabold ${dk ? "text-white" : "text-zinc-900"}`}>{rc.value}%</span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{rc.sub}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              {rc.stats.map(s => (
                <div key={s.l} className="text-center">
                  <p className={`text-lg font-extrabold ${s.c}`}>{s.v}</p>
                  <p className={`text-[10px] font-medium ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Application Breakdown + Monthly Trend ═══ */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className={`${card} p-6`}>
          <h3 className={`text-base font-bold mb-5 ${dk ? "text-white" : "text-zinc-900"}`}>Application Status Breakdown</h3>
          <div className="space-y-4">
            {applicationBreakdown.map((item, i) => {
              const pct = stats.totalApplications > 0 ? (item.value / stats.totalApplications) * 100 : 0;
              return (
                <div key={item.label} style={{ animation: `riseIn 0.4s ease-out ${i * 0.08}s both` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className={`text-sm font-medium ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{pct.toFixed(0)}%</span>
                      <span className={`text-sm font-bold tabular-nums ${dk ? "text-white" : "text-zinc-900"}`}>{item.value}</span>
                    </div>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${dk ? "bg-zinc-800" : "bg-zinc-100"}`}>
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-1000`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${card} p-6`}>
          <h3 className={`text-base font-bold mb-5 ${dk ? "text-white" : "text-zinc-900"}`}>Monthly Application Trend</h3>
          {stats.applicationsByMonth && stats.applicationsByMonth.length > 0 ? (
            <div className="flex items-end gap-3 h-48">
              {[...stats.applicationsByMonth].reverse().map((m, i) => {
                const height = (m.count / maxMonthlyCount) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className={`text-xs font-bold transition-colors ${dk ? "text-zinc-400 group-hover:text-white" : "text-zinc-500 group-hover:text-zinc-900"}`}>{m.count}</span>
                    <div className="w-full relative" style={{ height: "160px" }}>
                      <div className="absolute bottom-0 w-full rounded-t-xl bg-gradient-to-t from-violet-600 to-indigo-500 transition-all duration-500 group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:shadow-lg group-hover:shadow-violet-500/20"
                        style={{ height: `${Math.max(height, 4)}%` }} />
                    </div>
                    <span className={`text-[10px] font-semibold ${dk ? "text-zinc-600" : "text-zinc-400"}`}>
                      {monthNames[m._id.month - 1]}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`flex items-center justify-center h-48 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>
              <p className="text-sm">No monthly data available yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Pet Type Distribution ═══ */}
      <div className={`${card} p-6`}>
        <h3 className={`text-base font-bold mb-5 ${dk ? "text-white" : "text-zinc-900"}`}>Pet Type Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {stats.petsByType.map((pt, i) => {
            const percentage = stats.totalPets > 0 ? ((pt.count / stats.totalPets) * 100).toFixed(0) : "0";
            return (
              <div key={pt._id}
                className={`rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-default ${dk ? "bg-zinc-800/40 border border-zinc-700/40 hover:border-violet-500/30" : "bg-zinc-50 border border-zinc-200 hover:border-violet-300"}`}
                style={{ animation: `riseIn 0.4s ease-out ${i * 0.06}s both` }}>
                <div className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125">{petEmoji[pt._id] || "🐾"}</div>
                <p className={`text-xl font-extrabold ${dk ? "text-white" : "text-zinc-900"}`}>{pt.count}</p>
                <p className={`text-xs mt-0.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{pt._id}</p>
                <p className={`text-[10px] font-bold mt-1 ${dk ? "text-violet-400" : "text-violet-600"}`}>{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ Platform Health ═══ */}
      <div className={`${card} p-6`}>
        <h3 className={`text-base font-bold mb-5 ${dk ? "text-white" : "text-zinc-900"}`}>Platform Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Icons.MessageCircle, iconColor: "text-emerald-400", label: "Unread Messages", value: stats.unreadMessages, sub: `of ${stats.totalMessages} total`, gradient: "from-emerald-500 to-teal-500", hex: "#10b981" },
            { icon: Icons.Clock, iconColor: "text-amber-400", label: "Pending Review", value: stats.pendingApplications + stats.reviewingApplications, sub: "applications awaiting", gradient: "from-amber-500 to-orange-500", hex: "#f59e0b" },
            { icon: Icons.Heart, iconColor: "text-rose-400", label: "Pets per Shelter", value: -1, display: stats.totalShelters > 0 ? (stats.totalPets / stats.totalShelters).toFixed(1) : "0", sub: "average count", gradient: "from-rose-500 to-pink-500", hex: "#f43f5e" },
            { icon: Icons.Check, iconColor: "text-violet-400", label: "Success Rate", value: -1, display: `${approvalRate}%`, sub: "approved + completed", gradient: "from-violet-500 to-purple-500", hex: "#8b5cf6" },
          ].map((item, i) => (
            <div key={item.label}
              className={`rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 group ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-200"}`}
              style={{ animation: `riseIn 0.4s ease-out ${i * 0.08}s both` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md`} style={{ boxShadow: `0 4px 12px ${item.hex}25` }}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{item.label}</span>
              </div>
              <p className={`text-2xl font-extrabold ${dk ? "text-white" : "text-zinc-900"}`}>
                {item.value === -1 ? item.display : <Counter value={item.value} />}
              </p>
              <p className={`text-[11px] mt-1 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}