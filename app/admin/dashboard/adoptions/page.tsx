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
  Heart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Paw: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  Eye: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
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
  User: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  MapPin: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Calendar: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  ),
  Check: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
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

interface Adoption {
  _id: string;
  petName: string;
  petImage: string;
  shelterName: string;
  status: string;
  message: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  fullAddress?: string;
  livingArrangement?: string;
  reasonForAdoption?: string;
  createdAt: string;
  updatedAt: string;
  user?: { name: string; email: string; phone?: string; avatar?: string };
  pet?: {
    name: string; type: string; breed: string; image: string; images?: string[];
    gender?: string; age?: string; color?: string; weight?: string;
    vaccinated?: boolean; neutered?: boolean;
  };
}

const petEmoji: Record<string, string> = { Dog: "🐕", Cat: "🐈", Rabbit: "🐇", Bird: "🐦", Hamster: "🐹", Fish: "🐟", Turtle: "🐢" };

export default function AdminAdoptionsPage() {
  const dk = useDk();
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAdoption, setSelectedAdoption] = useState<Adoption | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchAdoptions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      // Filter by completed status to only show successful adoptions
      params.set("status", "completed");
      if (search) params.set("search", search);
      params.set("page", String(page));
      params.set("limit", "12");
      const res = await fetch(`/api/admin/adoptions?${params}`);
      const data = await res.json();
      if (data.success) {
        setAdoptions(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, page]);

  useEffect(() => { fetchAdoptions(); }, [fetchAdoptions]);

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
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #f43f5e, transparent)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-2xl shadow-violet-500/25">
                <Icons.Heart className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 opacity-20 blur-xl" />
            </div>
            <div>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${dk ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-50 text-violet-600 border border-violet-200"}`}>
                <Icons.Zap className="w-2.5 h-2.5" /> Adoptions
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>Completed Adoptions</h1>
              <p className={`text-sm mt-1 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
                {totalCount} successful adoption{totalCount !== 1 ? "s" : ""} 🎉
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${dk ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-50 text-violet-600 border border-violet-200"}`}>
            <Icons.Heart className="w-4 h-4" />
            {totalCount} Forever Homes
          </div>
        </div>
      </div>

      {/* ═══ Search ═══ */}
      <div className="relative group">
        <Icons.Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500 group-focus-within:text-violet-400" : "text-zinc-400 group-focus-within:text-violet-500"} transition-colors`} />
        <input type="text" placeholder="Search by pet name, adopter, shelter..." value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className={`pl-10 pr-4 ${inputClass}`} />
      </div>

      {/* ═══ Adoptions Grid ═══ */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Icons.Loader className={`w-8 h-8 ${dk ? "text-violet-400" : "text-violet-500"}`} />
              <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full" />
            </div>
            <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading adoptions…</span>
          </div>
        </div>
      ) : adoptions.length === 0 ? (
        <div className={`${card} flex flex-col items-center justify-center py-20 gap-4`}>
          <div className={`w-20 h-20 rounded-2xl ${dk ? "bg-zinc-800/60" : "bg-zinc-100"} flex items-center justify-center`}>
            <Icons.Heart className={`w-10 h-10 ${dk ? "text-zinc-600" : "text-zinc-300"}`} />
          </div>
          <p className={`font-bold ${dk ? "text-zinc-400" : "text-zinc-500"}`}>No completed adoptions yet</p>
          <p className={`text-sm ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Adoptions will appear here when applications are marked as completed</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adoptions.map((adoption, i) => {
            const petType = adoption.pet?.type || "Pet";
            const emoji = petEmoji[petType] || "🐾";
            const adopter = adoption.user?.name || adoption.applicantName || "Unknown";
            const petName = adoption.pet?.name || adoption.petName;
            const petBreed = adoption.pet?.breed || "";
            const petImage = adoption.pet?.image || adoption.petImage;

            return (
              <div key={adoption._id}
                className={`${card} overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                onClick={() => setSelectedAdoption(adoption)}
                style={{ animation: `riseIn 0.5s ease-out ${i * 0.06}s both` }}>
                {/* Pet Image */}
                <div className="relative h-44 overflow-hidden">
                  {petImage ? (
                    <img src={petImage} alt={petName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-5xl ${dk ? "bg-zinc-800" : "bg-zinc-100"}`}>
                      {emoji}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Adopted Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-violet-500/90 text-white backdrop-blur-sm shadow-lg">
                      <Icons.Check className="w-3 h-3" /> Adopted
                    </span>
                  </div>
                  {/* Pet Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-lg leading-tight drop-shadow-lg">{petName}</p>
                    <p className="text-white/80 text-xs mt-0.5 drop-shadow-md">{emoji} {petType} • {petBreed}</p>
                  </div>
                </div>

                {/* Adoption Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
                      {adopter.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${dk ? "text-white" : "text-zinc-900"}`}>{adopter}</p>
                      <p className={`text-[11px] truncate ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
                        {adoption.user?.email || adoption.applicantEmail}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
                    <div className="flex items-center gap-1">
                      <Icons.MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{adoption.shelterName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icons.Calendar className="w-3 h-3" />
                      <span>{new Date(adoption.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 py-4">
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

      {/* ═══ Adoption Detail Modal ═══ */}
      {selectedAdoption && (() => {
        const adopter = selectedAdoption.user?.name || selectedAdoption.applicantName || "Unknown";
        const petName = selectedAdoption.pet?.name || selectedAdoption.petName;
        const petImage = selectedAdoption.pet?.image || selectedAdoption.petImage;
        const petType = selectedAdoption.pet?.type || "";
        const petBreed = selectedAdoption.pet?.breed || "";
        const emoji = petEmoji[petType] || "🐾";

        return (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <div className={`absolute inset-0 ${dk ? "bg-black/70" : "bg-black/30"} backdrop-blur-md`} onClick={() => setSelectedAdoption(null)} />
            <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl ${dk ? "bg-[#0c0c14]/98 border border-zinc-800" : "bg-white border border-zinc-200 shadow-2xl"} backdrop-blur-2xl`}
              style={{ animation: "fadeInScale 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>

              {/* Header Image */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                {petImage ? (
                  <img src={petImage} alt={petName} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-6xl ${dk ? "bg-zinc-800" : "bg-zinc-100"}`}>
                    {emoji}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <button onClick={() => setSelectedAdoption(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all">
                  <Icons.X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-violet-500/90 text-white backdrop-blur-sm mb-2">
                    <Icons.Check className="w-3 h-3" /> Successfully Adopted
                  </div>
                  <h2 className="text-2xl font-extrabold text-white drop-shadow-lg">{petName}</h2>
                  <p className="text-white/80 text-sm mt-0.5">{emoji} {petType} • {petBreed}</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Adopter Info */}
                <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Adopter Information</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                      {adopter.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={`font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{adopter}</p>
                      <p className={`text-sm ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{selectedAdoption.user?.email || selectedAdoption.applicantEmail}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Phone", selectedAdoption.user?.phone || selectedAdoption.applicantPhone || "N/A"],
                      ["Address", selectedAdoption.fullAddress || "N/A"],
                      ["Living", selectedAdoption.livingArrangement || "N/A"],
                      ["Shelter", selectedAdoption.shelterName],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <span className={dk ? "text-zinc-500" : "text-zinc-400"}>{label}:</span>
                        <span className={`ml-2 font-medium ${dk ? "text-zinc-200" : "text-zinc-700"}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pet Details */}
                {selectedAdoption.pet && (
                  <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                    <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Pet Details</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                      {[
                        ["Gender", selectedAdoption.pet.gender || "N/A"],
                        ["Age", selectedAdoption.pet.age || "N/A"],
                        ["Color", selectedAdoption.pet.color || "N/A"],
                        ["Weight", selectedAdoption.pet.weight || "N/A"],
                        ["Vaccinated", selectedAdoption.pet.vaccinated ? "✅ Yes" : "❌ No"],
                        ["Neutered", selectedAdoption.pet.neutered ? "✅ Yes" : "❌ No"],
                      ].map(([label, value]) => (
                        <div key={label as string}>
                          <span className={dk ? "text-zinc-500" : "text-zinc-400"}>{label}:</span>
                          <span className={`ml-2 font-medium ${dk ? "text-zinc-200" : "text-zinc-700"}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reason */}
                {selectedAdoption.reasonForAdoption && (
                  <div className={`rounded-2xl p-5 space-y-2 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                    <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Reason for Adoption</h3>
                    <p className={`text-sm leading-relaxed ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{selectedAdoption.reasonForAdoption}</p>
                  </div>
                )}

                {/* Timeline */}
                <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Timeline</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className={dk ? "text-zinc-500" : "text-zinc-400"}>Applied:</span>
                      <span className={`ml-2 font-medium ${dk ? "text-zinc-200" : "text-zinc-700"}`}>
                        {new Date(selectedAdoption.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <div>
                      <span className={dk ? "text-zinc-500" : "text-zinc-400"}>Completed:</span>
                      <span className={`ml-2 font-medium ${dk ? "text-emerald-400" : "text-emerald-600"}`}>
                        {new Date(selectedAdoption.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Success Banner */}
                <div className={`flex items-center gap-3 p-4 rounded-2xl ${dk ? "bg-violet-500/10 border border-violet-500/20" : "bg-violet-50 border border-violet-200"}`}>
                  <div className="text-3xl">🎉</div>
                  <div>
                    <p className={`font-bold ${dk ? "text-violet-300" : "text-violet-700"}`}>{petName} found a forever home!</p>
                    <p className={`text-sm ${dk ? "text-violet-400/70" : "text-violet-500"}`}>Adopted by {adopter} from {selectedAdoption.shelterName}</p>
                  </div>
                </div>
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