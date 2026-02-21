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
  FileText: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
  ),
  ChevronLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  ),
  Clock: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Zap: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
  ),
  Image: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  Download: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  ZoomIn: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
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

interface Application {
  _id: string; petName: string; petImage: string; shelterName: string;
  status: string; message: string; createdAt: string; updatedAt: string;
  applicantName?: string; applicantPhone?: string; applicantEmail?: string;
  livingArrangement?: string; hasExperience?: boolean; reasonForAdoption?: string;
  fullAddress?: string; adminNotes?: string;
  documentType?: string; documentFileName?: string; documentFileData?: string;
  addressProofType?: string; addressProofFileName?: string; addressProofFileData?: string;
  undertakingAccepted?: boolean;
  user?: { name: string; email: string; phone?: string };
  pet?: { name: string; type: string; breed: string; image: string };
}

const statusColors: Record<string, { dot: string; bgDk: string; textDk: string; bgLt: string; textLt: string; borderDk: string; borderLt: string; gradient: string }> = {
  pending: { dot: "bg-amber-500", bgDk: "bg-amber-500/10", textDk: "text-amber-400", bgLt: "bg-amber-50", textLt: "text-amber-600", borderDk: "border-amber-500/20", borderLt: "border-amber-200", gradient: "from-amber-500 to-orange-500" },
  reviewing: { dot: "bg-sky-500", bgDk: "bg-sky-500/10", textDk: "text-sky-400", bgLt: "bg-sky-50", textLt: "text-sky-600", borderDk: "border-sky-500/20", borderLt: "border-sky-200", gradient: "from-sky-500 to-blue-500" },
  approved: { dot: "bg-emerald-500", bgDk: "bg-emerald-500/10", textDk: "text-emerald-400", bgLt: "bg-emerald-50", textLt: "text-emerald-600", borderDk: "border-emerald-500/20", borderLt: "border-emerald-200", gradient: "from-emerald-500 to-green-500" },
  rejected: { dot: "bg-red-500", bgDk: "bg-red-500/10", textDk: "text-red-400", bgLt: "bg-red-50", textLt: "text-red-600", borderDk: "border-red-500/20", borderLt: "border-red-200", gradient: "from-red-500 to-rose-500" },
  completed: { dot: "bg-violet-500", bgDk: "bg-violet-500/10", textDk: "text-violet-400", bgLt: "bg-violet-50", textLt: "text-violet-600", borderDk: "border-violet-500/20", borderLt: "border-violet-200", gradient: "from-violet-500 to-purple-500" },
};

const statusOptions = ["all", "pending", "reviewing", "approved", "rejected", "completed"];

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

/* ─── Document Viewer Component ─────────────────────────────────────────── */
function DocumentViewer({ title, docType, fileName, fileData, dk }: {
  title: string; docType?: string; fileName?: string; fileData?: string; dk: boolean;
}) {
  const [zoomed, setZoomed] = useState(false);

  if (!fileData) return null;

  // Determine if the data is an image (base64 encoded)
  const isImage = fileData.startsWith("data:image") || fileData.startsWith("/9j") || fileData.startsWith("iVBOR");
  const imageSrc = fileData.startsWith("data:") ? fileData : `data:image/jpeg;base64,${fileData}`;
  const isPdf = fileData.startsWith("data:application/pdf") || fileName?.toLowerCase().endsWith(".pdf");

  return (
    <>
      <div className={`rounded-xl p-4 border transition-all ${dk ? "bg-zinc-800/30 border-zinc-700/40 hover:border-zinc-600/60" : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icons.Image className={`w-4 h-4 ${dk ? "text-violet-400" : "text-violet-600"}`} />
            <h4 className={`text-[11px] font-bold uppercase tracking-[0.15em] ${dk ? "text-violet-400" : "text-violet-600"}`}>{title}</h4>
          </div>
          {docType && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${dk ? "bg-zinc-700/60 text-zinc-400" : "bg-zinc-200 text-zinc-500"}`}>
              {docType}
            </span>
          )}
        </div>
        {fileName && (
          <p className={`text-xs mb-3 truncate ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
            📎 {fileName}
          </p>
        )}
        {isImage ? (
          <div className="relative group">
            <img
              src={imageSrc}
              alt={title}
              className={`w-full max-h-48 object-contain rounded-lg cursor-pointer transition-all duration-300 group-hover:brightness-110 ${dk ? "ring-1 ring-zinc-700" : "ring-1 ring-zinc-200"}`}
              onClick={() => setZoomed(true)}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${dk ? "bg-black/70 text-white" : "bg-white/90 text-zinc-800 shadow-lg"}`}>
                <Icons.ZoomIn className="w-3.5 h-3.5" /> Click to enlarge
              </div>
            </div>
          </div>
        ) : isPdf ? (
          <div className={`flex items-center gap-3 p-3 rounded-lg ${dk ? "bg-zinc-700/40" : "bg-zinc-100"}`}>
            <Icons.FileText className={`w-8 h-8 ${dk ? "text-red-400" : "text-red-500"}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${dk ? "text-zinc-300" : "text-zinc-700"}`}>{fileName || "Document.pdf"}</p>
              <p className={`text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>PDF Document</p>
            </div>
            <a href={fileData.startsWith("data:") ? fileData : `data:application/pdf;base64,${fileData}`}
              download={fileName || "document.pdf"}
              className={`p-2 rounded-lg transition-colors ${dk ? "hover:bg-zinc-600/50 text-zinc-400" : "hover:bg-zinc-200 text-zinc-500"}`}>
              <Icons.Download className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className={`flex items-center gap-3 p-3 rounded-lg ${dk ? "bg-zinc-700/40" : "bg-zinc-100"}`}>
            <Icons.FileText className={`w-8 h-8 ${dk ? "text-zinc-400" : "text-zinc-500"}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${dk ? "text-zinc-300" : "text-zinc-700"}`}>{fileName || "Document"}</p>
              <p className={`text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Uploaded Document</p>
            </div>
          </div>
        )}
      </div>

      {/* Zoomed Image Modal */}
      {zoomed && isImage && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={() => setZoomed(false)}>
          <div className={`absolute inset-0 ${dk ? "bg-black/85" : "bg-black/60"} backdrop-blur-sm`} />
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoomed(false)}
              className={`absolute -top-3 -right-3 z-10 p-2 rounded-full shadow-xl ${dk ? "bg-zinc-800 hover:bg-zinc-700 text-white" : "bg-white hover:bg-zinc-100 text-zinc-800"}`}>
              <Icons.X className="w-5 h-5" />
            </button>
            <img src={imageSrc} alt={title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
            <div className={`mt-3 text-center ${dk ? "text-zinc-400" : "text-zinc-300"}`}>
              <p className="text-sm font-medium">{title} {docType ? `— ${docType}` : ""}</p>
              {fileName && <p className="text-xs mt-0.5 opacity-70">{fileName}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminApplicationsPage() {
  const dk = useDk();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "15");
      const res = await fetch(`/api/admin/applications?${params}`);
      const data = await res.json();
      if (data.success) { setApplications(data.data); setTotalPages(data.pagination?.totalPages || 1); }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, statusFilter, page]);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const handleStatusUpdate = async (appId: string, newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId, status: newStatus, adminNotes }),
      });
      const data = await res.json();
      if (data.success) {
        fetchApplications();
        if (selectedApp?._id === appId) setSelectedApp({ ...selectedApp, status: newStatus, adminNotes });
      }
    } catch (e) { console.error(e); }
    finally { setUpdating(false); }
  };

  const openReview = (app: Application) => { setSelectedApp(app); setAdminNotes(app.adminNotes || ""); };

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
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }} />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative p-6 sm:p-8 flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-sky-500/25">
              <Icons.FileText className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 opacity-20 blur-xl" />
          </div>
          <div>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${dk ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "bg-sky-50 text-sky-600 border border-sky-200"}`}>
              <Icons.Zap className="w-2.5 h-2.5" /> Queue
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>Application Queue</h1>
            <p className={`text-sm mt-1 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>Review and manage adoption applications</p>
          </div>
        </div>
      </div>

      {/* ═══ Filters ═══ */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Icons.Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500 group-focus-within:text-violet-400" : "text-zinc-400 group-focus-within:text-violet-500"} transition-colors`} />
          <input type="text" placeholder="Search applications..." value={search}
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

      {/* ═══ Applications Table ═══ */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Icons.Loader className={`w-8 h-8 ${dk ? "text-violet-400" : "text-violet-500"}`} />
              <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full" />
            </div>
            <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading applications…</span>
          </div>
        </div>
      ) : applications.length === 0 ? (
        <div className={`${card} flex flex-col items-center justify-center py-20 gap-4`}>
          <div className={`w-20 h-20 rounded-2xl ${dk ? "bg-zinc-800/60" : "bg-zinc-100"} flex items-center justify-center`}>
            <Icons.FileText className={`w-10 h-10 ${dk ? "text-zinc-600" : "text-zinc-300"}`} />
          </div>
          <p className={`font-bold ${dk ? "text-zinc-400" : "text-zinc-500"}`}>No applications found</p>
          <p className={`text-sm ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Applications will appear here once submitted</p>
        </div>
      ) : (
        <div className={`${card} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={dk ? "border-b border-zinc-800/80" : "border-b border-zinc-100"}>
                  {["Applicant", "Pet", "Shelter", "Status", "Docs", "Time", "Actions"].map(h => (
                    <th key={h} className={`text-left py-3.5 px-5 text-[10px] font-bold uppercase tracking-[0.15em] ${dk ? "text-zinc-500 bg-zinc-800/30" : "text-zinc-400 bg-zinc-50"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => {
                  const sc = statusColors[app.status] || statusColors.pending;
                  const applicant = app.user?.name || app.applicantName || "Unknown";
                  const petName = app.pet?.name || app.petName;
                  const hasDocuments = !!(app.documentFileData || app.addressProofFileData);
                  return (
                    <tr key={app._id}
                      className={`transition-all duration-200 ${dk ? "border-b border-zinc-800/40 hover:bg-zinc-800/30" : "border-b border-zinc-100 hover:bg-zinc-50"}`}
                      style={{ animation: `riseIn 0.4s ease-out ${i * 0.04}s both` }}>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-violet-500 to-purple-500 flex-shrink-0 shadow-md" style={{ boxShadow: "0 4px 12px rgba(139,92,246,0.3)" }}>
                            {applicant.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className={`font-bold truncate ${dk ? "text-white" : "text-zinc-900"}`}>{applicant}</p>
                            <p className={`text-[11px] truncate ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{app.user?.email || app.applicantEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`py-3.5 px-5 font-medium ${dk ? "text-zinc-300" : "text-zinc-700"}`}>{petName}</td>
                      <td className={`py-3.5 px-5 text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{app.shelterName}</td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${dk ? `${sc.bgDk} ${sc.textDk} ${sc.borderDk}` : `${sc.bgLt} ${sc.textLt} ${sc.borderLt}`}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        {hasDocuments ? (
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${dk ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                            <Icons.Image className="w-3 h-3" /> Attached
                          </span>
                        ) : (
                          <span className={`text-[10px] ${dk ? "text-zinc-600" : "text-zinc-400"}`}>None</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1.5">
                          <Icons.Clock className={`w-3 h-3 ${dk ? "text-zinc-600" : "text-zinc-400"}`} />
                          <span className={`text-xs tabular-nums ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{timeAgo(app.createdAt)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <button onClick={() => openReview(app)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 ${dk ? "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40" : "bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-200"}`}>
                          <Icons.Eye className="w-3.5 h-3.5" /> Review
                        </button>
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
              <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Page <span className={dk ? "text-zinc-300" : "text-zinc-700"}>{page}</span> of <span className={dk ? "text-zinc-300" : "text-zinc-700"}>{totalPages}</span></span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-30 ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"}`}>
                <Icons.ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ Review Modal ═══ */}
      {selectedApp && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className={`absolute inset-0 ${dk ? "bg-black/70" : "bg-black/30"} backdrop-blur-md`} onClick={() => setSelectedApp(null)} />
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 ${dk ? "bg-[#0c0c14]/98 border border-zinc-800" : "bg-white border border-zinc-200 shadow-2xl"} backdrop-blur-2xl`}
            style={{ animation: "fadeInScale 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Application Review</h2>
              <button onClick={() => setSelectedApp(null)} className={`p-2 rounded-xl ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"} transition-all`}>
                <Icons.X />
              </button>
            </div>

            <div className="space-y-5">
              {/* Applicant Info */}
              <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Applicant Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Name", selectedApp.user?.name || selectedApp.applicantName],
                    ["Email", selectedApp.user?.email || selectedApp.applicantEmail],
                    ["Phone", selectedApp.user?.phone || selectedApp.applicantPhone || "N/A"],
                    ["Address", selectedApp.fullAddress || "N/A"],
                    ["Living", selectedApp.livingArrangement || "N/A"],
                    ["Experience", selectedApp.hasExperience ? "Yes" : "No"],
                  ].map(([label, value]) => (
                    <div key={label as string}><span className={dk ? "text-zinc-500" : "text-zinc-400"}>{label}:</span> <span className={`ml-2 font-medium ${dk ? "text-white" : "text-zinc-900"}`}>{value}</span></div>
                  ))}
                </div>
              </div>

              {/* Pet Info */}
              <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Pet Details</h3>
                <div className="flex items-center gap-4">
                  {(selectedApp.pet?.image || selectedApp.petImage) && (
                    <img src={selectedApp.pet?.image || selectedApp.petImage} alt="" className={`w-16 h-16 rounded-xl object-cover ring-2 ${dk ? "ring-zinc-700" : "ring-zinc-200"}`} />
                  )}
                  <div className="text-sm">
                    <p className={`font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{selectedApp.pet?.name || selectedApp.petName}</p>
                    <p className={`mt-0.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{selectedApp.pet?.type} • {selectedApp.pet?.breed}</p>
                    <p className={dk ? "text-zinc-500" : "text-zinc-400"}>{selectedApp.shelterName}</p>
                  </div>
                </div>
              </div>

              {/* Message & Reason */}
              <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Application Message</h3>
                <p className={`text-sm leading-relaxed ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{selectedApp.message}</p>
                {selectedApp.reasonForAdoption && (
                  <>
                    <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] pt-2 ${dk ? "text-violet-400" : "text-violet-600"}`}>Reason for Adoption</h3>
                    <p className={`text-sm leading-relaxed ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{selectedApp.reasonForAdoption}</p>
                  </>
                )}
              </div>

              {/* ═══ Uploaded Documents Section ═══ */}
              {(selectedApp.documentFileData || selectedApp.addressProofFileData) && (
                <div className={`rounded-2xl p-5 space-y-4 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <div className="flex items-center gap-2">
                    <Icons.Image className={`w-4 h-4 ${dk ? "text-violet-400" : "text-violet-600"}`} />
                    <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Uploaded Documents</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ID Proof Document */}
                    <DocumentViewer
                      title="ID Proof"
                      docType={selectedApp.documentType}
                      fileName={selectedApp.documentFileName}
                      fileData={selectedApp.documentFileData}
                      dk={dk}
                    />

                    {/* Address Proof Document */}
                    <DocumentViewer
                      title="Address Proof"
                      docType={selectedApp.addressProofType}
                      fileName={selectedApp.addressProofFileName}
                      fileData={selectedApp.addressProofFileData}
                      dk={dk}
                    />
                  </div>

                  {selectedApp.undertakingAccepted && (
                    <div className={`flex items-center gap-2 p-3 rounded-xl ${dk ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${dk ? "text-emerald-400" : "text-emerald-600"}`}><polyline points="20 6 9 17 4 12"/></svg>
                      <span className={`text-sm font-medium ${dk ? "text-emerald-400" : "text-emerald-700"}`}>Undertaking form accepted and signed</span>
                    </div>
                  )}
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Admin Notes</label>
                <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3} placeholder="Add notes about this application..."
                  className={`${dk ? "bg-zinc-800/60 border-zinc-700/60 text-white placeholder-zinc-600 focus:bg-zinc-800" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:bg-white"} w-full px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition-all duration-300 border`} />
              </div>

              {/* Status Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className={`text-sm self-center mr-2 font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Set Status:</span>
                {["pending", "reviewing", "approved", "rejected", "completed"].map((s) => {
                  const sc = statusColors[s];
                  const isActive = selectedApp.status === s;
                  return (
                    <button key={s} onClick={() => handleStatusUpdate(selectedApp._id, s)} disabled={updating || isActive}
                      className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 disabled:opacity-40 ${
                        isActive
                          ? `bg-gradient-to-r ${sc.gradient} text-white shadow-lg`
                          : dk ? "bg-zinc-800/60 text-zinc-400 border border-zinc-700/60 hover:bg-zinc-800" : "bg-zinc-50 text-zinc-500 border border-zinc-200 hover:bg-zinc-100"
                      }`}>
                      {updating ? "…" : s}
                    </button>
                  );
                })}
              </div>

              {/* Completion Note */}
              {selectedApp.status !== "completed" && (
                <div className={`flex items-start gap-2 p-3 rounded-xl text-xs ${dk ? "bg-violet-500/5 border border-violet-500/10 text-violet-400" : "bg-violet-50 border border-violet-100 text-violet-600"}`}>
                  <Icons.Zap className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Setting status to <strong>&quot;Completed&quot;</strong> will automatically mark the pet as adopted.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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