"use client"
import { useState, useEffect, useCallback } from "react";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const Icons = {
  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Plus: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Edit: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Trash: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Loader: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  Paw: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  ChevronLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  ),
  Filter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
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

interface Pet {
  _id: string; name: string; type: string; breed: string; age: string;
  gender: string; image: string; shelterName: string; personality: string[];
  color: string; vaccinated: boolean; neutered: boolean; isAdopted: boolean;
  description: string; weight?: string;
}

interface PetForm {
  name: string; type: string; breed: string; age: string; gender: string;
  image: string; shelterName: string; personality: string; color: string;
  vaccinated: boolean; neutered: boolean; description: string; weight: string;
  shelter: string;
}

const emptyForm: PetForm = {
  name: "", type: "Dog", breed: "", age: "", gender: "Male",
  image: "", shelterName: "", personality: "", color: "",
  vaccinated: false, neutered: false, description: "", weight: "", shelter: "",
};

const petTypes = ["Dog", "Cat", "Rabbit", "Bird", "Hamster", "Fish", "Turtle"];
const petEmoji: Record<string, string> = { Dog: "🐕", Cat: "🐈", Rabbit: "🐇", Bird: "🐦", Hamster: "🐹", Fish: "🐟", Turtle: "🐢" };

function getPaginationRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [];
  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("...", total);
  } else if (current >= total - 3) {
    pages.push(1, "...");
    for (let i = total - 4; i <= total; i++) pages.push(i);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }
  return pages;
}

export default function AdminPetsPage() {
  const dk = useDk();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [form, setForm] = useState<PetForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (typeFilter) params.set("type", typeFilter);
      if (statusFilter) params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "12");
      const res = await fetch(`/api/admin/pets?${params}`);
      const data = await res.json();
      if (data.success) {
        setPets(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || data.data?.length || 0);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, typeFilter, statusFilter, page]);

  useEffect(() => { fetchPets(); }, [fetchPets]);

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setForm({
      name: pet.name, type: pet.type, breed: pet.breed, age: pet.age,
      gender: pet.gender, image: pet.image, shelterName: pet.shelterName,
      personality: pet.personality.join(", "), color: pet.color,
      vaccinated: pet.vaccinated, neutered: pet.neutered,
      description: pet.description, weight: pet.weight || "", shelter: "",
    });
    setShowModal(true);
  };

  const handleAdd = () => { setEditingPet(null); setForm(emptyForm); setShowModal(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    try {
      const res = await fetch(`/api/admin/pets/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchPets();
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...form,
        personality: form.personality.split(",").map(s => s.trim()).filter(Boolean),
        images: form.image ? [form.image] : [],
      };
      if (editingPet) {
        const res = await fetch(`/api/admin/pets/${editingPet._id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.success) { setShowModal(false); fetchPets(); }
      } else {
        const res = await fetch("/api/admin/pets", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.success) { setShowModal(false); fetchPets(); }
      }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const card = dk
    ? "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm"
    : "rounded-2xl border border-zinc-200/80 bg-white shadow-sm";

  const inputClass = dk
    ? "w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all duration-300"
    : "w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-300 focus:bg-white transition-all duration-300";

  const paginationRange = getPaginationRange(page, totalPages);
  const startItem = (page - 1) * 12 + 1;
  const endItem = Math.min(page * 12, totalCount);

  return (
    <div className="space-y-6">
      {/* ═══ Hero Header ═══ */}
      <div className={`relative overflow-hidden rounded-2xl ${dk ? "bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-800/50 border-zinc-800/60" : "bg-gradient-to-br from-white via-white to-zinc-50 border-zinc-200/80"} border`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #f43f5e, transparent)" }} />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-rose-500/25">
                <Icons.Paw className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 opacity-20 blur-xl" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>Pet Management</h1>
              <p className={`text-sm mt-1 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
                {totalCount > 0 ? `${totalCount} pets registered · Showing ${startItem}–${endItem}` : "Manage your pet listings"}
              </p>
            </div>
          </div>
          <button onClick={handleAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03] transition-all duration-300">
            <Icons.Plus className="w-4 h-4" /> Add Pet
          </button>
        </div>
      </div>

      {/* ═══ Filters ═══ */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Icons.Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500 group-focus-within:text-violet-400" : "text-zinc-400 group-focus-within:text-violet-500"} transition-colors`} />
          <input type="text" placeholder="Search pets by name, breed..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className={`pl-10 pr-4 ${inputClass}`} />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Icons.Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`} />
            <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className={`pl-9 pr-8 py-2.5 rounded-xl text-sm font-medium appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${dk ? "bg-zinc-800/60 border border-zinc-700/60 text-zinc-300 hover:bg-zinc-800" : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`}>
              <option value="">All Types</option>
              {petTypes.map(t => <option key={t} value={t}>{petEmoji[t] || "🐾"} {t}</option>)}
            </select>
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${dk ? "bg-zinc-800/60 border border-zinc-700/60 text-zinc-300 hover:bg-zinc-800" : "bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100"}`}>
            <option value="">All Status</option>
            <option value="available">🟢 Available</option>
            <option value="adopted">💜 Adopted</option>
          </select>
        </div>
      </div>

      {/* ═══ Pets Table ═══ */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Icons.Loader className={`w-8 h-8 ${dk ? "text-violet-400" : "text-violet-500"}`} />
              <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full" />
            </div>
            <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading pets…</span>
          </div>
        </div>
      ) : pets.length === 0 ? (
        <div className={`${card} flex flex-col items-center justify-center py-20 gap-4`}>
          <div className={`w-20 h-20 rounded-2xl ${dk ? "bg-zinc-800/60" : "bg-zinc-100"} flex items-center justify-center`}>
            <Icons.Paw className={`w-10 h-10 ${dk ? "text-zinc-600" : "text-zinc-300"}`} />
          </div>
          <div className="text-center">
            <p className={`font-bold ${dk ? "text-zinc-400" : "text-zinc-500"}`}>No pets found</p>
            <p className={`text-sm mt-1 ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Try adjusting your filters or add a new pet</p>
          </div>
          <button onClick={handleAdd}
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm rounded-xl shadow-lg hover:scale-[1.03] transition-all">
            <Icons.Plus className="w-4 h-4" /> Add First Pet
          </button>
        </div>
      ) : (
        <div className={`${card} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={dk ? "border-b border-zinc-800/80" : "border-b border-zinc-100"}>
                  {["Pet", "Type", "Breed", "Age", "Shelter", "Status", "Actions"].map(h => (
                    <th key={h} className={`text-left py-3.5 px-5 text-[10px] font-bold uppercase tracking-[0.15em] ${dk ? "text-zinc-500 bg-zinc-800/30" : "text-zinc-400 bg-zinc-50"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pets.map((pet, i) => (
                  <tr key={pet._id}
                    className={`transition-all duration-200 ${dk ? "border-b border-zinc-800/40 hover:bg-zinc-800/30" : "border-b border-zinc-100 hover:bg-zinc-50"}`}
                    style={{ animation: `riseIn 0.4s ease-out ${i * 0.04}s both` }}>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        {pet.image ? (
                          <img src={pet.image} alt={pet.name} className={`w-10 h-10 rounded-xl object-cover ring-2 ${dk ? "ring-zinc-700/50" : "ring-zinc-200"}`} />
                        ) : (
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${dk ? "bg-zinc-800" : "bg-zinc-100"}`}>
                            {petEmoji[pet.type] || "🐾"}
                          </div>
                        )}
                        <div>
                          <span className={`font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{pet.name}</span>
                          <p className={`text-[11px] ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{pet.gender} · {pet.color}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{petEmoji[pet.type] || "🐾"}</span>
                        <span className={dk ? "text-zinc-300" : "text-zinc-600"}>{pet.type}</span>
                      </div>
                    </td>
                    <td className={`py-3.5 px-5 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>{pet.breed}</td>
                    <td className={`py-3.5 px-5 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>{pet.age}</td>
                    <td className={`py-3.5 px-5 text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{pet.shelterName}</td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                        pet.isAdopted
                          ? dk ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-50 text-violet-600 border border-violet-200"
                          : dk ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${pet.isAdopted ? "bg-violet-500" : "bg-emerald-500"}`} />
                        {pet.isAdopted ? "Adopted" : "Available"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(pet)}
                          className={`p-2 rounded-xl transition-all duration-200 ${dk ? "hover:bg-violet-500/10 text-zinc-500 hover:text-violet-400" : "hover:bg-violet-50 text-zinc-400 hover:text-violet-600"}`} title="Edit">
                          <Icons.Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(pet._id)}
                          className={`p-2 rounded-xl transition-all duration-200 ${dk ? "hover:bg-red-500/10 text-zinc-500 hover:text-red-400" : "hover:bg-red-50 text-zinc-400 hover:text-red-500"}`} title="Delete">
                          <Icons.Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ═══ Enhanced Pagination ═══ */}
          {totalPages > 1 && (
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t ${dk ? "border-zinc-800/60" : "border-zinc-100"}`}>
              <p className={`text-xs font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>
                Showing <span className={dk ? "text-zinc-300" : "text-zinc-700"}>{startItem}</span> to <span className={dk ? "text-zinc-300" : "text-zinc-700"}>{endItem}</span> of <span className={dk ? "text-zinc-300" : "text-zinc-700"}>{totalCount}</span> pets
              </p>
              <div className="flex items-center gap-1.5">
                {/* Prev */}
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"}`}>
                  <Icons.ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Numbers */}
                {paginationRange.map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className={`px-1 text-sm ${dk ? "text-zinc-600" : "text-zinc-400"}`}>…</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p as number)}
                      className={`min-w-[36px] h-9 rounded-xl text-sm font-bold transition-all duration-200 ${
                        page === p
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
                          : dk
                            ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                      }`}>
                      {p}
                    </button>
                  )
                )}

                {/* Next */}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"}`}>
                  <Icons.ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ Add/Edit Modal ═══ */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className={`absolute inset-0 ${dk ? "bg-black/70" : "bg-black/30"} backdrop-blur-md`} onClick={() => setShowModal(false)} />
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 ${dk ? "bg-[#0c0c14]/98 border border-zinc-800" : "bg-white border border-zinc-200 shadow-2xl"} backdrop-blur-2xl`}
            style={{ animation: "fadeInScale 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
                  <Icons.Paw className="w-5 h-5 text-white" />
                </div>
                <h2 className={`text-xl font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{editingPet ? "Edit Pet" : "Add New Pet"}</h2>
              </div>
              <button onClick={() => setShowModal(false)} className={`p-2 rounded-xl ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"} transition-all`}>
                <Icons.X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Name *", key: "name", type: "text", required: true },
                  { label: "Breed *", key: "breed", type: "text", required: true },
                  { label: "Age *", key: "age", type: "text", required: true, placeholder: "e.g. 2 years" },
                  { label: "Color *", key: "color", type: "text", required: true },
                  { label: "Weight", key: "weight", type: "text", placeholder: "e.g. 10 kg" },
                  { label: "Shelter Name *", key: "shelterName", type: "text", required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{f.label}</label>
                    <input type={f.type} required={f.required} placeholder={f.placeholder}
                      value={(form as unknown as Record<string, string | boolean>)[f.key] as string}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className={inputClass} />
                  </div>
                ))}
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Type *</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className={inputClass}>
                    {petTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Gender *</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className={inputClass}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Image URL *</label>
                <input type="text" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..."
                  className={inputClass} />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Personality (comma separated)</label>
                <input type="text" value={form.personality} onChange={(e) => setForm({ ...form, personality: e.target.value })} placeholder="Friendly, Playful, Calm"
                  className={inputClass} />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Description *</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className={`${inputClass} resize-none`} />
              </div>

              <div className="flex items-center gap-6">
                {[
                  { label: "Vaccinated", key: "vaccinated" },
                  { label: "Neutered", key: "neutered" },
                ].map(c => (
                  <label key={c.key} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" checked={(form as unknown as Record<string, string | boolean>)[c.key] as boolean}
                        onChange={(e) => setForm({ ...form, [c.key]: e.target.checked })}
                        className="sr-only peer" />
                      <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 peer-checked:bg-gradient-to-br peer-checked:from-violet-600 peer-checked:to-fuchsia-600 peer-checked:border-transparent flex items-center justify-center ${dk ? "border-zinc-600 bg-zinc-800" : "border-zinc-300 bg-zinc-50"}`}>
                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{c.label}</span>
                  </label>
                ))}
              </div>

              <div className={`flex justify-end gap-3 pt-4 border-t ${dk ? "border-zinc-800" : "border-zinc-200"}`}>
                <button type="button" onClick={() => setShowModal(false)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${dk ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm shadow-lg shadow-violet-500/25 disabled:opacity-50 flex items-center gap-2 hover:scale-[1.02] transition-all">
                  {saving ? <><Icons.Loader className="w-4 h-4" /> Saving…</> : editingPet ? "Update Pet" : "Add Pet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}