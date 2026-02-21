"use client"
import { useState, useEffect, useCallback } from "react";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const Icons = {
  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Loader: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  Eye: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Calendar: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  ),
  Check: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  XCircle: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  ),
  Clock: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  User: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  MapPin: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Send: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Trash: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  ),
  ChevronLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  ),
  Zap: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
  ),
  Paw: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
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

interface Visit {
  _id: string;
  user?: { _id: string; name: string; email: string; phone?: string };
  shelter?: { _id: string; name: string; city?: string };
  shelterName: string;
  pet?: { _id: string; name: string; image?: string };
  petName?: string;
  petImage?: string;
  date: string;
  time?: string;
  timeSlot?: string;
  status: string;
  notes?: string;
  message?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  createdAt: string;
  updatedAt?: string;
}

const statusColors: Record<string, { dot: string; bgDk: string; textDk: string; bgLt: string; textLt: string; borderDk: string; borderLt: string; gradient: string }> = {
  pending: { dot: "bg-amber-500", bgDk: "bg-amber-500/10", textDk: "text-amber-400", bgLt: "bg-amber-50", textLt: "text-amber-600", borderDk: "border-amber-500/20", borderLt: "border-amber-200", gradient: "from-amber-500 to-orange-500" },
  scheduled: { dot: "bg-amber-500", bgDk: "bg-amber-500/10", textDk: "text-amber-400", bgLt: "bg-amber-50", textLt: "text-amber-600", borderDk: "border-amber-500/20", borderLt: "border-amber-200", gradient: "from-amber-500 to-orange-500" },
  accepted: { dot: "bg-emerald-500", bgDk: "bg-emerald-500/10", textDk: "text-emerald-400", bgLt: "bg-emerald-50", textLt: "text-emerald-600", borderDk: "border-emerald-500/20", borderLt: "border-emerald-200", gradient: "from-emerald-500 to-green-500" },
  completed: { dot: "bg-emerald-500", bgDk: "bg-emerald-500/10", textDk: "text-emerald-400", bgLt: "bg-emerald-50", textLt: "text-emerald-600", borderDk: "border-emerald-500/20", borderLt: "border-emerald-200", gradient: "from-emerald-500 to-green-500" },
  rejected: { dot: "bg-red-500", bgDk: "bg-red-500/10", textDk: "text-red-400", bgLt: "bg-red-50", textLt: "text-red-600", borderDk: "border-red-500/20", borderLt: "border-red-200", gradient: "from-red-500 to-rose-500" },
  cancelled: { dot: "bg-red-500", bgDk: "bg-red-500/10", textDk: "text-red-400", bgLt: "bg-red-50", textLt: "text-red-600", borderDk: "border-red-500/20", borderLt: "border-red-200", gradient: "from-red-500 to-rose-500" },
};

const statusOptions = ["all", "pending", "accepted", "rejected"];

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

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function AdminVisitsPage() {
  const dk = useDk();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchVisits = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "15");
      const res = await fetch(`/api/admin/visits?${params}`);
      const data = await res.json();
      if (data.success) {
        setVisits(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, statusFilter, page]);

  useEffect(() => { fetchVisits(); }, [fetchVisits]);

  const handleStatusUpdate = async (visitId: string, newStatus: string) => {
    setUpdating(true);
    setActionSuccess(null);
    try {
      const res = await fetch("/api/admin/visits", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitId, status: newStatus, adminNotes }),
      });
      const data = await res.json();
      if (data.success) {
        fetchVisits();
        if (selectedVisit?._id === visitId) {
          setSelectedVisit({ ...selectedVisit, status: newStatus });
        }
        const actionLabel = newStatus === "accepted" ? "accepted" : "rejected";
        setActionSuccess(`Visit ${actionLabel} successfully! A notification message has been sent to the user.`);
        setTimeout(() => setActionSuccess(null), 5000);
      }
    } catch (e) { console.error(e); }
    finally { setUpdating(false); }
  };

  const handleDelete = async (visitId: string) => {
    if (!confirm("Are you sure you want to delete this visit?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/visits?visitId=${visitId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSelectedVisit(null);
        fetchVisits();
      }
    } catch (e) { console.error(e); }
    finally { setDeleting(false); }
  };

  const openReview = (visit: Visit) => {
    setSelectedVisit(visit);
    setAdminNotes(visit.notes || visit.message || "");
    setActionSuccess(null);
  };

  const pendingCount = visits.filter(v => v.status === "pending" || v.status === "scheduled").length;

  const card = dk
    ? "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm"
    : "rounded-2xl border border-zinc-200/80 bg-white shadow-sm";

  const inputClass = dk
    ? "w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all duration-300"
    : "w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-300 focus:bg-white transition-all duration-300";

  return (
    <div className="space-y-6">
      {/* ═══ Hero Header ═══ */}
      <div className={`relative overflow-hidden rounded-2xl ${dk ? "bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-800/50 border-zinc-800/60" : "bg-gradient-to-br from-white via-white to-zinc-50 border-zinc-200/80"} border`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/25">
                <Icons.Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 opacity-20 blur-xl" />
            </div>
            <div>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${dk ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                <Icons.Zap className="w-2.5 h-2.5" /> Schedule
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>Visit Requests</h1>
              <p className={`text-sm mt-1 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
                {pendingCount > 0 ? (
                  <><span className={`font-bold ${dk ? "text-amber-400" : "text-amber-600"}`}>{pendingCount} pending</span> visit{pendingCount > 1 ? "s" : ""} to review</>
                ) : "All visit requests have been processed ✓"}
              </p>
            </div>
          </div>
          {pendingCount > 0 && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${dk ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              {pendingCount} Pending
            </div>
          )}
        </div>
      </div>

      {/* ═══ Success Banner ═══ */}
      {actionSuccess && (
        <div className={`rounded-xl p-4 flex items-center gap-3 ${dk ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border border-emerald-200 text-emerald-700"}`}
          style={{ animation: "riseIn 0.3s ease-out" }}>
          <Icons.Check className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{actionSuccess}</span>
          <button onClick={() => setActionSuccess(null)} className="ml-auto">
            <Icons.X className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}

      {/* ═══ Filters ═══ */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Icons.Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500 group-focus-within:text-violet-400" : "text-zinc-400 group-focus-within:text-violet-500"} transition-colors`} />
          <input type="text" placeholder="Search by shelter, pet, or notes..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className={`pl-10 pr-4 ${inputClass}`} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map(s => {
            const sc = s !== "all" ? statusColors[s] : null;
            return (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                  statusFilter === s
                    ? `bg-gradient-to-r ${sc ? sc.gradient : "from-violet-600 to-fuchsia-600"} text-white shadow-lg shadow-violet-500/20`
                    : dk ? "bg-zinc-800/60 text-zinc-500 border border-zinc-700/60 hover:text-zinc-300 hover:bg-zinc-800" : "bg-zinc-50 text-zinc-500 border border-zinc-200 hover:text-zinc-700 hover:bg-zinc-100"
                }`}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Visits Table ═══ */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Icons.Loader className={`w-8 h-8 ${dk ? "text-violet-400" : "text-violet-500"}`} />
              <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full" />
            </div>
            <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading visits…</span>
          </div>
        </div>
      ) : visits.length === 0 ? (
        <div className={`${card} flex flex-col items-center justify-center py-20 gap-4`}>
          <div className={`w-20 h-20 rounded-2xl ${dk ? "bg-zinc-800/60" : "bg-zinc-100"} flex items-center justify-center`}>
            <Icons.Calendar className={`w-10 h-10 ${dk ? "text-zinc-600" : "text-zinc-300"}`} />
          </div>
          <p className={`font-bold ${dk ? "text-zinc-400" : "text-zinc-500"}`}>No visit requests found</p>
          <p className={`text-sm ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Visit requests will appear here once users schedule them</p>
        </div>
      ) : (
        <div className={`${card} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={dk ? "border-b border-zinc-800/80" : "border-b border-zinc-100"}>
                  {["Visitor", "Pet", "Shelter", "Date & Time", "Status", "Submitted", "Actions"].map(h => (
                    <th key={h} className={`text-left py-3.5 px-5 text-[10px] font-bold uppercase tracking-[0.15em] ${dk ? "text-zinc-500 bg-zinc-800/30" : "text-zinc-400 bg-zinc-50"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visits.map((visit, i) => {
                  const sc = statusColors[visit.status] || statusColors.pending;
                  const visitorName = visit.user?.name || visit.userName || "Unknown";
                  const petName = visit.pet?.name || visit.petName || "—";
                  const shelterName = visit.shelterName || visit.shelter?.name || "—";
                  const visitTime = visit.time || visit.timeSlot || "";
                  const isPending = visit.status === "pending" || visit.status === "scheduled";
                  return (
                    <tr key={visit._id}
                      className={`transition-all duration-200 ${dk ? "border-b border-zinc-800/40 hover:bg-zinc-800/30" : "border-b border-zinc-100 hover:bg-zinc-50"}`}
                      style={{ animation: `riseIn 0.4s ease-out ${i * 0.04}s both` }}>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-amber-500 to-orange-500 flex-shrink-0 shadow-md" style={{ boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}>
                            {visitorName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className={`font-bold truncate ${dk ? "text-white" : "text-zinc-900"}`}>{visitorName}</p>
                            <p className={`text-[11px] truncate ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{visit.user?.email || visit.userEmail || ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          {(visit.pet?.image || visit.petImage) && (
                            <img src={visit.pet?.image || visit.petImage} alt="" className="w-7 h-7 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <span className={`font-medium truncate ${dk ? "text-zinc-300" : "text-zinc-700"}`}>{petName}</span>
                        </div>
                      </td>
                      <td className={`py-3.5 px-5 text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
                        <div className="flex items-center gap-1.5">
                          <Icons.MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate max-w-[120px]">{shelterName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div>
                          <p className={`text-xs font-semibold ${dk ? "text-zinc-200" : "text-zinc-700"}`}>{visit.date}</p>
                          {visitTime && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Icons.Clock className={`w-3 h-3 ${dk ? "text-zinc-600" : "text-zinc-400"}`} />
                              <span className={`text-[11px] ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{visitTime}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${dk ? `${sc.bgDk} ${sc.textDk} ${sc.borderDk}` : `${sc.bgLt} ${sc.textLt} ${sc.borderLt}`}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1.5">
                          <Icons.Clock className={`w-3 h-3 ${dk ? "text-zinc-600" : "text-zinc-400"}`} />
                          <span className={`text-xs tabular-nums ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{timeAgo(visit.createdAt)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          {isPending && (
                            <>
                              <button onClick={() => handleStatusUpdate(visit._id, "accepted")}
                                title="Accept Visit"
                                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 hover:scale-105 ${dk ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"}`}>
                                <Icons.Check className="w-3.5 h-3.5" /> Accept
                              </button>
                              <button onClick={() => handleStatusUpdate(visit._id, "rejected")}
                                title="Reject Visit"
                                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 hover:scale-105 ${dk ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20" : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"}`}>
                                <Icons.XCircle className="w-3.5 h-3.5" /> Reject
                              </button>
                            </>
                          )}
                          <button onClick={() => openReview(visit)}
                            title="View Details"
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 hover:scale-105 ${dk ? "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20" : "bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-200"}`}>
                            <Icons.Eye className="w-3.5 h-3.5" /> View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`flex items-center justify-center gap-3 px-5 py-4 border-t ${dk ? "border-zinc-800/60" : "border-zinc-100"}`}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-30 ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"}`}>
                <Icons.ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
                Page <span className={dk ? "text-zinc-300" : "text-zinc-700"}>{page}</span> of <span className={dk ? "text-zinc-300" : "text-zinc-700"}>{totalPages}</span>
              </span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-30 ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"}`}>
                <Icons.ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ Visit Detail Modal ═══ */}
      {selectedVisit && (() => {
        const visit = selectedVisit;
        const visitorName = visit.user?.name || visit.userName || "Unknown";
        const visitorEmail = visit.user?.email || visit.userEmail || "N/A";
        const visitorPhone = visit.user?.phone || visit.userPhone || "N/A";
        const petName = visit.pet?.name || visit.petName || "—";
        const shelterName = visit.shelterName || visit.shelter?.name || "—";
        const visitTime = visit.time || visit.timeSlot || "—";
        const sc = statusColors[visit.status] || statusColors.pending;
        const isPending = visit.status === "pending" || visit.status === "scheduled";

        return (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <div className={`absolute inset-0 ${dk ? "bg-black/70" : "bg-black/30"} backdrop-blur-md`} onClick={() => { setSelectedVisit(null); setActionSuccess(null); }} />
            <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 ${dk ? "bg-[#0c0c14]/98 border border-zinc-800" : "bg-white border border-zinc-200 shadow-2xl"} backdrop-blur-2xl`}
              style={{ animation: "fadeInScale 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Visit Details</h2>
                <button onClick={() => { setSelectedVisit(null); setActionSuccess(null); }}
                  className={`p-2 rounded-xl ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"} transition-all`}>
                  <Icons.X />
                </button>
              </div>

              {/* Success message inside modal */}
              {actionSuccess && (
                <div className={`rounded-xl p-3 mb-5 flex items-center gap-3 ${dk ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border border-emerald-200 text-emerald-700"}`}>
                  <Icons.Send className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{actionSuccess}</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${dk ? `${sc.bgDk} ${sc.textDk} ${sc.borderDk}` : `${sc.bgLt} ${sc.textLt} ${sc.borderLt}`}`}>
                    <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                    {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                  </span>
                  <span className={`text-xs ${dk ? "text-zinc-600" : "text-zinc-400"}`}>
                    Submitted {timeAgo(visit.createdAt)}
                  </span>
                </div>

                {/* Visitor Info */}
                <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-amber-400" : "text-amber-600"}`}>Visitor Details</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {visitorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={`font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{visitorName}</p>
                      <p className={`text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{visitorEmail}</p>
                      {visitorPhone !== "N/A" && (
                        <p className={`text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>📞 {visitorPhone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visit Schedule */}
                <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-amber-400" : "text-amber-600"}`}>Visit Schedule</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className={dk ? "text-zinc-500" : "text-zinc-400"}>Date:</span>
                      <span className={`ml-2 font-semibold ${dk ? "text-white" : "text-zinc-900"}`}>{formatDate(visit.date)}</span>
                    </div>
                    <div>
                      <span className={dk ? "text-zinc-500" : "text-zinc-400"}>Time:</span>
                      <span className={`ml-2 font-semibold ${dk ? "text-white" : "text-zinc-900"}`}>{visitTime}</span>
                    </div>
                    <div>
                      <span className={dk ? "text-zinc-500" : "text-zinc-400"}>Pet:</span>
                      <span className={`ml-2 font-semibold ${dk ? "text-white" : "text-zinc-900"}`}>{petName}</span>
                    </div>
                    <div>
                      <span className={dk ? "text-zinc-500" : "text-zinc-400"}>Shelter:</span>
                      <span className={`ml-2 font-semibold ${dk ? "text-white" : "text-zinc-900"}`}>{shelterName}</span>
                    </div>
                  </div>
                </div>

                {/* Notes / Message */}
                {(visit.notes || visit.message) && (
                  <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                    <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-amber-400" : "text-amber-600"}`}>Visitor&apos;s Message</h3>
                    <p className={`text-sm leading-relaxed ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{visit.notes || visit.message}</p>
                  </div>
                )}

                {/* Admin Notes */}
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Admin Notes (sent to user with decision)</label>
                  <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3}
                    placeholder="Add notes — these will be included in the notification message sent to the user..."
                    className={`${dk ? "bg-zinc-800/60 border-zinc-700/60 text-white placeholder-zinc-600 focus:bg-zinc-800" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:bg-white"} w-full px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition-all duration-300 border`} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {isPending && (
                    <>
                      <button onClick={() => handleStatusUpdate(visit._id, "accepted")} disabled={updating}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all disabled:opacity-50">
                        {updating ? <Icons.Loader className="w-4 h-4" /> : <Icons.Check className="w-4 h-4" />}
                        Accept Visit
                      </button>
                      <button onClick={() => handleStatusUpdate(visit._id, "rejected")} disabled={updating}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:scale-[1.02] transition-all disabled:opacity-50">
                        {updating ? <Icons.Loader className="w-4 h-4" /> : <Icons.XCircle className="w-4 h-4" />}
                        Reject Visit
                      </button>
                    </>
                  )}
                  <button onClick={() => handleDelete(visit._id)} disabled={deleting}
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50 ${dk ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-red-400 border border-zinc-700" : "bg-zinc-100 text-zinc-500 hover:bg-red-50 hover:text-red-600 border border-zinc-200"}`}>
                    {deleting ? <Icons.Loader className="w-4 h-4" /> : <Icons.Trash className="w-4 h-4" />}
                    Delete
                  </button>
                </div>

                {/* Info note */}
                {isPending && (
                  <div className={`flex items-start gap-2 p-3 rounded-xl text-xs ${dk ? "bg-amber-500/5 border border-amber-500/10 text-amber-400" : "bg-amber-50 border border-amber-100 text-amber-600"}`}>
                    <Icons.Send className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>When you accept or reject a visit, a <strong>notification message</strong> will be automatically sent to the user&apos;s inbox with the decision and any notes you&apos;ve added above.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}