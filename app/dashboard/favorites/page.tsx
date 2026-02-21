"use client"
import { useRouter } from "next/navigation";
import { Heart, Trash2, MapPin, ArrowRight, Search } from "lucide-react";
import { useDashboard, GlassCard, GradientButton } from "../layout";

export default function FavoritesPage() {
  const router = useRouter();
  const { user, darkMode, favorites, setFavorites } = useDashboard();
  const d = darkMode;

  const handleRemoveFavorite = async (petId: string) => {
    if (!user) return;
    // Optimistic removal
    setFavorites(prev => prev.filter(p => p._id !== petId));
    if (user._id !== "demo123") {
      try {
        await fetch("/api/adopter/favorites", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, petId }),
        });
      } catch (e) { console.error(e); }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>Saved Pets</h2>
          <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>{favorites.length} pets in your collection</p>
        </div>
      </div>
      {favorites.length === 0 ? (
        <GlassCard dark={d} className="py-16 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center border ${
            d ? "bg-gradient-to-br from-rose-500/10 to-orange-500/10 border-rose-500/10" : "bg-rose-50 border-rose-100"
          }`}>
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <p className={`text-lg font-semibold mb-2 ${d ? "text-gray-300" : "text-gray-700"}`}>No favorites yet</p>
          <p className={`text-sm mb-6 ${d ? "text-gray-500" : "text-gray-500"}`}>Start browsing pets to add them to your collection</p>
          <GradientButton dark={d} onClick={() => router.push("/pets")}><Search className="w-4 h-4" /> Browse Pets</GradientButton>
        </GlassCard>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {favorites.map((pet) => (
            <GlassCard dark={d} key={pet._id} className={`overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
              d ? "hover:border-white/[0.12] hover:shadow-rose-500/5" : "hover:border-gray-300 hover:shadow-rose-500/10"
            }`}>
              <div className="relative h-52 overflow-hidden">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${d ? "from-[#06060a] via-[#06060a]/20" : "from-black/60 via-black/10"} to-transparent`} />
                <button onClick={() => handleRemoveFavorite(pet._id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-black/40 backdrop-blur-xl text-white/70 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 border border-white/10 hover:border-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xl text-white text-xs font-medium border border-white/10">{pet.type}</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xl text-white text-xs font-medium border border-white/10">{pet.age}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-bold ${d ? "text-white" : "text-gray-900"}`}>{pet.name}</h3>
                  <span className={`text-xs ${d ? "text-gray-500" : "text-gray-500"}`}>{pet.gender}</span>
                </div>
                <p className={`text-sm mb-1 ${d ? "text-gray-400" : "text-gray-600"}`}>{pet.breed}</p>
                <div className={`flex items-center gap-1.5 text-xs mb-4 ${d ? "text-gray-500" : "text-gray-500"}`}>
                  <MapPin className="w-3 h-3" />{pet.shelterName}
                </div>
                {pet.personality && pet.personality.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pet.personality.map((p) => (
                      <span key={p} className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                        d ? "bg-white/[0.04] text-gray-400 border-white/[0.06]" : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}>{p}</span>
                    ))}
                  </div>
                )}
                <GradientButton dark={d} className="w-full text-sm" onClick={() => router.push(`/pets/${pet._id}`)}>
                  View Details <ArrowRight className="w-4 h-4" />
                </GradientButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}