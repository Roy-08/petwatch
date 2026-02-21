"use client"
import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

/* ─── Theme Context ─────────────────────────────────────────────────────── */
type ThemeMode = "light" | "dark";
type AccentColor = "violet" | "ocean" | "emerald" | "rose" | "amber";

interface ThemeContextType {
  mode: ThemeMode;
  accent: AccentColor;
  toggleMode: () => void;
  setAccent: (c: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark", accent: "violet", toggleMode: () => {}, setAccent: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const accentMap: Record<AccentColor, { gradient: string; text: string; textLight: string; bg: string; bgLight: string; hex: string; hex2: string; ring: string; shadow: string; btnGrad: string; border: string; borderLight: string }> = {
  violet: {
    gradient: "from-violet-500 to-fuchsia-500", text: "text-violet-400", textLight: "text-violet-600",
    bg: "bg-violet-500/10", bgLight: "bg-violet-50", hex: "#8b5cf6", hex2: "#d946ef",
    ring: "ring-violet-500/40", shadow: "shadow-violet-500/20", btnGrad: "from-violet-600 to-fuchsia-600",
    border: "border-violet-500/20", borderLight: "border-violet-200",
  },
  ocean: {
    gradient: "from-blue-500 to-cyan-400", text: "text-blue-400", textLight: "text-blue-600",
    bg: "bg-blue-500/10", bgLight: "bg-blue-50", hex: "#3b82f6", hex2: "#22d3ee",
    ring: "ring-blue-500/40", shadow: "shadow-blue-500/20", btnGrad: "from-blue-600 to-cyan-500",
    border: "border-blue-500/20", borderLight: "border-blue-200",
  },
  emerald: {
    gradient: "from-emerald-500 to-lime-400", text: "text-emerald-400", textLight: "text-emerald-600",
    bg: "bg-emerald-500/10", bgLight: "bg-emerald-50", hex: "#10b981", hex2: "#a3e635",
    ring: "ring-emerald-500/40", shadow: "shadow-emerald-500/20", btnGrad: "from-emerald-600 to-lime-500",
    border: "border-emerald-500/20", borderLight: "border-emerald-200",
  },
  rose: {
    gradient: "from-rose-500 to-orange-400", text: "text-rose-400", textLight: "text-rose-600",
    bg: "bg-rose-500/10", bgLight: "bg-rose-50", hex: "#f43f5e", hex2: "#fb923c",
    ring: "ring-rose-500/40", shadow: "shadow-rose-500/20", btnGrad: "from-rose-600 to-orange-500",
    border: "border-rose-500/20", borderLight: "border-rose-200",
  },
  amber: {
    gradient: "from-amber-500 to-yellow-400", text: "text-amber-400", textLight: "text-amber-600",
    bg: "bg-amber-500/10", bgLight: "bg-amber-50", hex: "#f59e0b", hex2: "#facc15",
    ring: "ring-amber-500/40", shadow: "shadow-amber-500/20", btnGrad: "from-amber-600 to-yellow-500",
    border: "border-amber-500/20", borderLight: "border-amber-200",
  },
};

const swatches: { id: AccentColor; hex: string; label: string }[] = [
  { id: "violet", hex: "#8b5cf6", label: "Violet" },
  { id: "ocean", hex: "#3b82f6", label: "Ocean" },
  { id: "emerald", hex: "#10b981", label: "Emerald" },
  { id: "rose", hex: "#f43f5e", label: "Rose" },
  { id: "amber", hex: "#f59e0b", label: "Amber" },
];

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const I = {
  Shield: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Dashboard: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  ),
  Paw: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={c}>
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  File: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  ),
  Chat: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  ),
  Chart: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>
    </svg>
  ),
  Heart: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={c}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Calendar: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
    </svg>
  ),
  Logout: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  Sun: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  ),
  Moon: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ),
  Palette: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  Bell: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  Menu: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  Loader: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${c} animate-spin`}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  Search: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  External: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  ),
  ChevronLeft: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  ChevronRight: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  Settings: ({ c = "w-5 h-5" }: { c?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};

interface AdminData { _id: string; name: string; email: string; role: string; }

const navItems = [
  { id: "overview", href: "/admin/dashboard", label: "Overview", icon: I.Dashboard },
  { id: "pets", href: "/admin/dashboard/pets", label: "Pets", icon: I.Paw },
  { id: "applications", href: "/admin/dashboard/applications", label: "Applications", icon: I.File },
  { id: "adoptions", href: "/admin/dashboard/adoptions", label: "Adoptions", icon: I.Heart },
  { id: "visits", href: "/admin/dashboard/visits", label: "Visits", icon: I.Calendar },
  { id: "messages", href: "/admin/dashboard/messages", label: "Messages", icon: I.Chat },
  { id: "reports", href: "/admin/dashboard/reports", label: "Reports", icon: I.Chart },
];

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [accent, setAccent] = useState<AccentColor>("violet");

  useEffect(() => {
    const stored = localStorage.getItem("pawmatch_admin");
    if (stored) { setAdmin(JSON.parse(stored)); }
    else { router.push("/admin/login"); }
    const savedMode = localStorage.getItem("pm_theme_mode") as ThemeMode;
    const savedAccent = localStorage.getItem("pm_theme_accent") as AccentColor;
    if (savedMode) setMode(savedMode);
    if (savedAccent) setAccent(savedAccent);
    const savedCollapsed = localStorage.getItem("pm_sidebar_collapsed");
    if (savedCollapsed === "true") setCollapsed(true);
    setLoading(false);
  }, [router]);

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("pm_theme_mode", next);
  };

  const handleSetAccent = (c: AccentColor) => {
    setAccent(c);
    localStorage.setItem("pm_theme_accent", c);
  };

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("pm_sidebar_collapsed", String(next));
  };

  const handleLogout = () => {
    localStorage.removeItem("pawmatch_admin");
    router.push("/admin/login");
  };

  const getActiveTab = () => {
    if (pathname === "/admin/dashboard") return "overview";
    if (pathname.includes("/pets")) return "pets";
    if (pathname.includes("/applications")) return "applications";
    if (pathname.includes("/adoptions")) return "adoptions";
    if (pathname.includes("/visits")) return "visits";
    if (pathname.includes("/messages")) return "messages";
    if (pathname.includes("/reports")) return "reports";
    return "overview";
  };

  const activeTab = getActiveTab();
  const ac = accentMap[accent];
  const dk = mode === "dark";

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dk ? "bg-[#09090b]" : "bg-[#fafafa]"}`}>
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ac.gradient} flex items-center justify-center shadow-2xl ${ac.shadow}`}>
              <I.Paw c="w-8 h-8 text-white" />
            </div>
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${ac.gradient} animate-ping opacity-20`} />
          </div>
          <div className="flex items-center gap-2">
            <I.Loader c={`w-4 h-4 ${ac.text}`} />
            <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading…</span>
          </div>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  const pageTitles: Record<string, string> = {
    overview: "Overview", pets: "Pet Management", applications: "Applications",
    adoptions: "Adoptions", visits: "Visit Requests", messages: "Messages", reports: "Reports & Analytics",
  };

  return (
    <ThemeContext.Provider value={{ mode, accent, toggleMode, setAccent: handleSetAccent }}>
      <div className={`min-h-screen flex transition-colors duration-500 ${dk ? "bg-[#09090b] text-zinc-100" : "bg-[#f5f5f7] text-zinc-900"}`}
        style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}>

        {/* ═══ Desktop Sidebar ═══ */}
        <aside className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${collapsed ? "w-[76px]" : "w-[260px]"} ${dk ? "bg-[#0c0c0f] border-zinc-800/50" : "bg-white border-zinc-200/80"} border-r`}>
          {/* Logo area */}
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-4 h-16 flex-shrink-0`}>
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ac.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-lg`}
                  style={{ boxShadow: `0 8px 24px ${ac.hex}30` }}>
                  <I.Paw c="w-5 h-5 text-white" />
                </div>
              </div>
              {!collapsed && (
                <div className="overflow-hidden">
                  <div className={`text-base font-extrabold tracking-tight bg-gradient-to-r ${ac.gradient} bg-clip-text text-transparent`}>PawMatch</div>
                  <div className={`text-[9px] font-semibold uppercase tracking-[0.2em] -mt-0.5 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Admin Panel</div>
                </div>
              )}
            </Link>
            {!collapsed && (
              <button onClick={toggleCollapsed}
                className={`p-1.5 rounded-lg transition-colors ${dk ? "hover:bg-zinc-800 text-zinc-600 hover:text-zinc-400" : "hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600"}`}>
                <I.ChevronLeft c="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Collapse expand button when collapsed */}
          {collapsed && (
            <div className="flex justify-center mb-2">
              <button onClick={toggleCollapsed}
                className={`p-1.5 rounded-lg transition-colors ${dk ? "hover:bg-zinc-800 text-zinc-600 hover:text-zinc-400" : "hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600"}`}>
                <I.ChevronRight c="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 px-3 py-2 space-y-1 overflow-y-auto`}>
            {!collapsed && (
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 mb-3 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Navigation</p>
            )}
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <Link key={item.id} href={item.href}
                  className={`relative flex items-center ${collapsed ? "justify-center" : ""} gap-3 ${collapsed ? "px-0 py-3" : "px-3 py-2.5"} rounded-xl text-sm font-medium transition-all duration-200 group ${
                    active
                      ? dk
                        ? `bg-gradient-to-r ${ac.bg} text-white`
                        : `bg-gradient-to-r ${ac.bgLight} ${ac.textLight}`
                      : dk
                        ? "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60"
                        : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
                  }`}
                  title={collapsed ? item.label : undefined}>
                  {active && (
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b ${ac.gradient}`} />
                  )}
                  <item.icon c={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${active ? (dk ? ac.text : ac.textLight) : ""}`} />
                  {!collapsed && <span>{item.label}</span>}
                  {collapsed && active && (
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b ${ac.gradient}`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className={`flex-shrink-0 px-3 pb-4 space-y-1 ${dk ? "border-zinc-800/50" : "border-zinc-200/80"}`}>
            {!collapsed && (
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 mb-3 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Settings</p>
            )}

            {/* Theme toggle */}
            <button onClick={toggleMode}
              className={`w-full flex items-center ${collapsed ? "justify-center" : ""} gap-3 ${collapsed ? "px-0 py-3" : "px-3 py-2.5"} rounded-xl text-sm font-medium transition-all duration-200 ${dk ? "text-zinc-500 hover:text-amber-400 hover:bg-zinc-800/60" : "text-zinc-500 hover:text-indigo-500 hover:bg-zinc-100"}`}
              title={dk ? "Light Mode" : "Dark Mode"}>
              {dk ? <I.Sun c="w-[18px] h-[18px] flex-shrink-0" /> : <I.Moon c="w-[18px] h-[18px] flex-shrink-0" />}
              {!collapsed && <span>{dk ? "Light Mode" : "Dark Mode"}</span>}
            </button>

            {/* Palette */}
            <div className="relative">
              <button onClick={() => { setShowPalette(!showPalette); setShowProfile(false); }}
                className={`w-full flex items-center ${collapsed ? "justify-center" : ""} gap-3 ${collapsed ? "px-0 py-3" : "px-3 py-2.5"} rounded-xl text-sm font-medium transition-all duration-200 ${dk ? "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"}`}
                title="Accent Color">
                <I.Palette c="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && <span>Theme Color</span>}
              </button>
              {showPalette && (
                <>
                  <div className="fixed inset-0 z-[55]" onClick={() => setShowPalette(false)} />
                  <div className={`absolute ${collapsed ? "left-full ml-2" : "left-0"} bottom-full mb-2 z-[56] rounded-2xl p-4 ${collapsed ? "w-52" : "w-full"} ${dk ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"} border shadow-2xl`}
                    style={{ animation: "popIn 0.2s ease-out" }}>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Choose Accent</p>
                    <div className="flex gap-2">
                      {swatches.map((s) => (
                        <button key={s.id} onClick={() => { handleSetAccent(s.id); setShowPalette(false); }}
                          className={`w-9 h-9 rounded-lg transition-all duration-200 hover:scale-110 ${accent === s.id ? "ring-2 ring-offset-2 scale-105" : ""} ${dk ? "ring-offset-zinc-900" : "ring-offset-white"}`}
                          style={{ backgroundColor: s.hex, boxShadow: accent === s.id ? `0 0 16px ${s.hex}40` : "none" }}
                          title={s.label} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            
            {/* View site */}
            <Link href="/"
              className={`w-full flex items-center ${collapsed ? "justify-center" : ""} gap-3 ${collapsed ? "px-0 py-3" : "px-3 py-2.5"} rounded-xl text-sm font-medium transition-all duration-200 ${dk ? "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"}`}
              title="View Site">
              <I.External c="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>View Site</span>}
            </Link>

            {/* Divider */}
            <div className={`my-3 ${dk ? "border-t border-zinc-800/60" : "border-t border-zinc-200"}`} />

            {/* User profile */}
            <div className="relative">
              <button onClick={() => { setShowProfile(!showProfile); setShowPalette(false); }}
                className={`w-full flex items-center ${collapsed ? "justify-center" : ""} gap-3 ${collapsed ? "px-0 py-2" : "px-2 py-2"} rounded-xl transition-all duration-200 ${dk ? "hover:bg-zinc-800/60" : "hover:bg-zinc-100"}`}>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${ac.gradient} flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0`}
                  style={{ boxShadow: `0 4px 12px ${ac.hex}30` }}>
                  {admin.name.charAt(0).toUpperCase()}
                </div>
                {!collapsed && (
                  <div className="text-left flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-none truncate ${dk ? "text-zinc-200" : "text-zinc-800"}`}>{admin.name}</p>
                    <p className={`text-[11px] mt-1 capitalize truncate ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{admin.role.replace("_", " ")}</p>
                  </div>
                )}
              </button>
              {showProfile && (
                <>
                  <div className="fixed inset-0 z-[55]" onClick={() => setShowProfile(false)} />
                  <div className={`absolute ${collapsed ? "left-full ml-2" : "left-0"} bottom-full mb-2 z-[56] rounded-2xl p-2 ${collapsed ? "w-48" : "w-full"} ${dk ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"} border shadow-2xl`}
                    style={{ animation: "popIn 0.2s ease-out" }}>
                    <div className={`px-3 py-2 mb-1 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
                      <p className={`text-sm font-semibold ${dk ? "text-zinc-200" : "text-zinc-800"}`}>{admin.name}</p>
                      <p className="text-xs truncate">{admin.email}</p>
                    </div>
                    <div className={`border-t ${dk ? "border-zinc-800" : "border-zinc-100"} my-1`} />
                    <button onClick={handleLogout}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${dk ? "text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}`}>
                      <I.Logout c="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* ═══ Mobile Nav Drawer ═══ */}
        {mobileNav && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className={`absolute inset-0 ${dk ? "bg-black/60" : "bg-black/20"} backdrop-blur-sm`} onClick={() => setMobileNav(false)} />
            <div className={`absolute left-0 top-0 bottom-0 w-72 ${dk ? "bg-[#0c0c0f] border-zinc-800" : "bg-white border-zinc-200"} border-r`}
              style={{ animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <div className="flex items-center justify-between p-4 h-16">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ac.gradient} flex items-center justify-center shadow-lg`}>
                    <I.Paw c="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-base font-extrabold bg-gradient-to-r ${ac.gradient} bg-clip-text text-transparent`}>PawMatch</span>
                </div>
                <button onClick={() => setMobileNav(false)} className={`p-2 rounded-xl ${dk ? "hover:bg-zinc-800 text-zinc-500" : "hover:bg-zinc-100 text-zinc-400"}`}>
                  <I.X />
                </button>
              </div>
              <nav className="px-3 py-2 space-y-1">
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 mb-3 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Navigation</p>
                {navItems.map((item) => {
                  const active = activeTab === item.id;
                  return (
                    <Link key={item.id} href={item.href} onClick={() => setMobileNav(false)}
                      className={`relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        active
                          ? dk ? `${ac.bg} text-white` : `${ac.bgLight} ${ac.textLight}`
                          : dk ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
                      }`}>
                      {active && (
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b ${ac.gradient}`} />
                      )}
                      <item.icon c={`w-5 h-5 ${active ? (dk ? ac.text : ac.textLight) : ""}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className={`mx-3 mt-4 pt-4 border-t ${dk ? "border-zinc-800" : "border-zinc-200"}`}>
                <div className="flex items-center gap-3 px-3 py-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${ac.gradient} flex items-center justify-center text-white text-sm font-bold`}>
                    {admin.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${dk ? "text-zinc-200" : "text-zinc-800"}`}>{admin.name}</p>
                    <p className={`text-[11px] capitalize ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{admin.role.replace("_", " ")}</p>
                  </div>
                </div>
                <button onClick={handleLogout}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium w-full transition-colors ${dk ? "text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}`}>
                  <I.Logout c="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ Main Content Area ═══ */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "lg:ml-[76px]" : "lg:ml-[260px]"}`}>
          {/* Top bar */}
          

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10">
            <div className="max-w-[1400px] mx-auto">
              {children}
            </div>
          </main>
        </div>

        <style>{`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes popIn {
            from { transform: scale(0.95) translateY(-4px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
          }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
}