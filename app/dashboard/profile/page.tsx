"use client"
import { useState, type FormEvent } from "react";
import { Check, X, Loader2, User, Phone, MapPin, Home, PawPrint, FileText, Mail } from "lucide-react";
import { useDashboard, GlassCard, GradientButton } from "../layout";

export default function ProfilePage() {
  const { user, setUser, darkMode } = useDashboard();
  const d = darkMode;

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "", email: user?.email || "", phone: user?.phone || "",
    address: user?.address || "", city: user?.city || "", state: user?.state || "",
    bio: user?.bio || "", housingType: user?.housingType || "",
    hasYard: user?.hasYard || false, otherPets: user?.otherPets || "",
    experience: user?.experience || "",
  });

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true); setSaveMsg("");
    try {
      if (user._id === "demo123") {
        const updated = { ...user, ...profileForm };
        setUser(updated);
        setSaveMsg("Profile updated successfully!");
        setIsEditing(false);
      } else {
        const res = await fetch("/api/adopter/profile", {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, ...profileForm }),
        });
        const data = await res.json();
        if (data.success) {
          const updated = { ...user, ...profileForm };
          setUser(updated);
          localStorage.setItem("pawmatch_user", JSON.stringify(updated));
          setSaveMsg("Profile updated successfully!");
          setIsEditing(false);
        } else { setSaveMsg("Failed to update profile"); }
      }
    } catch { setSaveMsg("Error updating profile"); }
    finally { setSaving(false); setTimeout(() => setSaveMsg(""), 3000); }
  };

  const handleStartEditing = () => {
    if (!user) return;
    setProfileForm({
      name: user.name || "", email: user.email || "", phone: user.phone || "",
      address: user.address || "", city: user.city || "", state: user.state || "",
      bio: user.bio || "", housingType: user.housingType || "",
      hasYard: user.hasYard || false, otherPets: user.otherPets || "",
      experience: user.experience || "",
    });
    setIsEditing(true);
  };

  const inputClass = `w-full px-4 py-3.5 rounded-2xl border text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 ${
    d ? "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
  }`;
  const labelClass = `block text-sm font-medium mb-2 ${d ? "text-gray-400" : "text-gray-600"}`;

  if (!user) return null;

  /* ─── Profile Detail Row ─── */
  function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
      <div className={`flex items-start gap-4 py-4 border-b ${d ? "border-white/[0.05]" : "border-gray-100"}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          d ? "bg-white/[0.04]" : "bg-gray-100"
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${d ? "text-gray-500" : "text-gray-400"}`}>{label}</p>
          <p className={`text-sm font-medium ${d ? "text-white" : "text-gray-900"}`}>{value || "—"}</p>
        </div>
      </div>
    );
  }

  /* ─── Read-only Profile View ─── */
  if (!isEditing) {
    return (
      <GlassCard dark={d} className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-2xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>My Profile</h2>
            <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>Your personal information and preferences</p>
          </div>
          <div className="flex items-center gap-3">
            {user.isVerified && (
              <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                d ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-200"
              }`}>
                ✓ Verified
              </div>
            )}
            <GradientButton dark={d} variant="ghost" onClick={handleStartEditing}>
              Edit Profile
            </GradientButton>
          </div>
        </div>

        {saveMsg && (
          <div className={`mb-6 p-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${
            saveMsg.includes("success")
              ? d ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border border-emerald-200 text-emerald-600"
              : d ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-red-50 border border-red-200 text-red-600"
          }`}>
            {saveMsg.includes("success") ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {saveMsg}
          </div>
        )}

        {/* Profile Header Card */}
        <div className={`p-6 rounded-2xl border mb-6 ${
          d ? "bg-gradient-to-br from-rose-500/[0.06] to-orange-500/[0.06] border-white/[0.05]"
            : "bg-gradient-to-br from-rose-50 to-orange-50 border-orange-100"
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-rose-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className={`text-xl font-bold ${d ? "text-white" : "text-gray-900"}`}>{user.name}</h3>
              <p className={`text-sm ${d ? "text-gray-400" : "text-gray-600"}`}>{user.email}</p>
              {user.bio && (
                <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>{user.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-x-8">
          <DetailRow
            icon={<Phone className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Phone"
            value={user.phone || ""}
          />
          <DetailRow
            icon={<Mail className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Email"
            value={user.email}
          />
          <DetailRow
            icon={<MapPin className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Address"
            value={user.address || ""}
          />
          <DetailRow
            icon={<MapPin className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Location"
            value={[user.city, user.state].filter(Boolean).join(", ")}
          />
          <DetailRow
            icon={<Home className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Housing Type"
            value={user.housingType || ""}
          />
          <DetailRow
            icon={<Home className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Has Yard/Garden"
            value={user.hasYard ? "Yes 🌿" : "No"}
          />
          <DetailRow
            icon={<PawPrint className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Other Pets"
            value={user.otherPets || ""}
          />
          <DetailRow
            icon={<FileText className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} />}
            label="Pet Experience"
            value={user.experience || ""}
          />
        </div>
      </GlassCard>
    );
  }

  /* ─── Edit Mode ─── */
  return (
    <GlassCard dark={d} className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-2xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>Edit Profile</h2>
          <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>Update your personal information and preferences</p>
        </div>
        <GradientButton dark={d} variant="outline" onClick={() => setIsEditing(false)}>
          Cancel
        </GradientButton>
      </div>

      {saveMsg && (
        <div className={`mb-6 p-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${
          saveMsg.includes("success")
            ? d ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border border-emerald-200 text-emerald-600"
            : d ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-red-50 border border-red-200 text-red-600"
        }`}>
          {saveMsg.includes("success") ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {saveMsg}
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={profileForm.email} disabled
              className={`${inputClass} opacity-50 cursor-not-allowed`} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              placeholder="+91 98765 43210" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input type="text" value={profileForm.city}
              onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
              placeholder="Mumbai" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input type="text" value={profileForm.state}
              onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
              placeholder="Maharashtra" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Housing Type</label>
            <select value={profileForm.housingType}
              onChange={(e) => setProfileForm({ ...profileForm, housingType: e.target.value })}
              className={inputClass}>
              <option value="" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Select</option>
              <option value="Apartment" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Apartment</option>
              <option value="House" className={d ? "bg-[#0a0a0f]" : "bg-white"}>House</option>
              <option value="Villa" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Villa</option>
              <option value="Farm" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Farm</option>
              <option value="Other" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Pet Experience</label>
            <select value={profileForm.experience}
              onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
              className={inputClass}>
              <option value="" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Select</option>
              <option value="None" className={d ? "bg-[#0a0a0f]" : "bg-white"}>None</option>
              <option value="Beginner" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Beginner</option>
              <option value="Intermediate" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Intermediate</option>
              <option value="Experienced" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Experienced</option>
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                profileForm.hasYard
                  ? "bg-gradient-to-br from-rose-500 to-orange-500 border-orange-500"
                  : d ? "border-white/20 hover:border-white/40" : "border-gray-300 hover:border-gray-400"
              }`}>
                {profileForm.hasYard && <Check className="w-4 h-4 text-white" />}
              </div>
              <input type="checkbox" checked={profileForm.hasYard}
                onChange={(e) => setProfileForm({ ...profileForm, hasYard: e.target.checked })}
                className="sr-only" />
              <span className={`text-sm font-medium transition-colors ${
                d ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900"
              }`}>I have a yard/garden 🌿</span>
            </label>
          </div>
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input type="text" value={profileForm.address}
            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
            placeholder="Full address" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Other Pets</label>
          <input type="text" value={profileForm.otherPets}
            onChange={(e) => setProfileForm({ ...profileForm, otherPets: e.target.value })}
            placeholder="e.g., 1 dog, 2 cats" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Bio</label>
          <textarea value={profileForm.bio}
            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
            rows={3} placeholder="Tell us about yourself and why you want to adopt..."
            className={`${inputClass} resize-none`} />
        </div>
        <div className="flex gap-3">
          <GradientButton dark={d} type="submit" disabled={saving}>
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> Save Profile</>}
          </GradientButton>
          <GradientButton dark={d} variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </GradientButton>
        </div>
      </form>
    </GlassCard>
  );
}