"use client"
import { useState, type FormEvent } from "react";
import {
  Calendar, Clock, MapPin, Plus, Send, X, Check, Eye,
  PawPrint, MessageCircle, AlertTriangle, Star,
} from "lucide-react";
import { useDashboard, GlassCard, GradientButton, statusConfig } from "../layout";

export default function VisitsPage() {
  const { user, darkMode, visits, setVisits, fetchVisits, favorites, applications } = useDashboard();
  const d = darkMode;

  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    petId: "",
    petName: "",
    petImage: "",
    shelterName: "",
    date: "",
    timeSlot: "",
    message: "",
    userPhone: user?.phone || "",
  });

  const pendingVisits = visits.filter((v: { status: string; }) => v.status === "pending");
  const confirmedVisits = visits.filter((v: { status: string; }) => v.status === "confirmed");
  const pastVisits = visits.filter((v: { status: string; }) => v.status === "completed" || v.status === "cancelled" || v.status === "rejected");

  const inputClass = `w-full px-4 py-3.5 rounded-2xl border text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 ${
    d ? "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
  }`;

  const selectClass = `${inputClass} appearance-none`;

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  /* ─── Available pets for visit (from favorites + applications) ─── */
  const availablePets = [
    ...favorites.map(p => ({ id: p._id, name: p.name, image: p.image, shelterName: p.shelterName })),
    ...applications
      .filter(a => a.status !== "rejected" && a.status !== "completed")
      .map(a => ({ id: a._id, name: a.petName, image: a.petImage, shelterName: a.shelterName })),
  ].filter((pet, index, self) =>
    index === self.findIndex(p => p.name === pet.name && p.shelterName === pet.shelterName)
  );

  const handlePetSelect = (petKey: string) => {
    const pet = availablePets.find(p => `${p.name}-${p.shelterName}` === petKey);
    if (pet) {
      setScheduleForm(prev => ({
        ...prev,
        petId: pet.id,
        petName: pet.name,
        petImage: pet.image,
        shelterName: pet.shelterName,
      }));
    }
  };

  const handleScheduleVisit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const visitData = {
      user: user._id,
      userName: user.name,
      userEmail: user.email,
      userPhone: scheduleForm.userPhone,
      petId: scheduleForm.petId,
      petName: scheduleForm.petName,
      petImage: scheduleForm.petImage,
      shelterName: scheduleForm.shelterName,
      date: scheduleForm.date,
      timeSlot: scheduleForm.timeSlot,
      message: scheduleForm.message,
      status: "pending",
    };

    if (user._id !== "demo123") {
      try {
        const res = await fetch("/api/adopter/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(visitData),
        });
        const data = await res.json();
        if (data.success) {
          await fetchVisits();
        } else {
          console.error("Failed to create visit:", data.error);
        }
      } catch (e) { console.error(e); }
    } else {
      setVisits((prev: any) => [{
        _id: `v${Date.now()}`,
        ...visitData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, ...prev]);
    }

    setShowSchedule(false);
    setScheduleForm({
      petId: "", petName: "", petImage: "", shelterName: "",
      date: "", timeSlot: "", message: "", userPhone: user?.phone || "",
    });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const renderVisitCard = (visit: typeof visits[0]) => {
    const sc = statusConfig[visit.status] || statusConfig.pending;
    const visitDate = new Date(visit.date);
    const isPast = visitDate < new Date();

    return (
      <GlassCard dark={d} key={visit._id} className={`transition-all duration-300 ${
        d ? "hover:border-white/[0.12]" : "hover:border-gray-300"
      }`}>
        <div className="p-5">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Pet Image */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 group">
              <img src={visit.petImage} alt={visit.petName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className={`font-bold text-lg ${d ? "text-white" : "text-gray-900"}`}>
                    Meet {visit.petName}
                  </h3>
                  <p className={`text-sm flex items-center gap-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
                    <MapPin className="w-3 h-3" /> {visit.shelterName}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  d ? `${sc.bg} ${sc.color} ${sc.border}` : `${sc.lightBg} ${sc.lightColor} ${sc.lightBorder}`
                }`}>
                  {sc.icon}
                  <span className="capitalize">{visit.status}</span>
                </span>
              </div>

              {/* Date & Time */}
              <div className="flex flex-wrap gap-3 mb-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                  d ? "bg-white/[0.03] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                }`}>
                  <Calendar className={`w-3.5 h-3.5 ${d ? "text-amber-400" : "text-amber-500"}`} />
                  <span className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>
                    {visitDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                  d ? "bg-white/[0.03] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                }`}>
                  <Clock className={`w-3.5 h-3.5 ${d ? "text-sky-400" : "text-sky-500"}`} />
                  <span className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>
                    {visit.timeSlot}
                  </span>
                </div>
              </div>

              {/* Message */}
              {visit.message && (
                <p className={`text-sm mb-2 ${d ? "text-gray-400" : "text-gray-600"}`}>
                  <MessageCircle className="w-3 h-3 inline mr-1" />
                  {visit.message}
                </p>
              )}

              {/* Admin Notes */}
              {visit.adminNotes && (
                <div className={`p-3 rounded-xl border mt-2 ${
                  d ? "bg-amber-500/[0.04] border-amber-500/10" : "bg-amber-50 border-amber-200"
                }`}>
                  <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${d ? "text-amber-400/80" : "text-amber-600"}`}>
                    Admin Response
                  </p>
                  <p className={`text-sm ${d ? "text-gray-400" : "text-gray-600"}`}>{visit.adminNotes}</p>
                </div>
              )}

              {/* Timestamps */}
              <div className={`flex items-center gap-4 text-xs mt-2 ${d ? "text-gray-600" : "text-gray-400"}`}>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Requested: {new Date(visit.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>
            Pet Appointments
          </h2>
          <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
            Schedule visits to meet pets at shelters
          </p>
        </div>
        <GradientButton dark={d} onClick={() => setShowSchedule(!showSchedule)}>
          <Plus className="w-4 h-4" /> Schedule Visit
        </GradientButton>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Pending", count: pendingVisits.length, gradient: "from-amber-500 to-orange-500", icon: <Clock className="w-4 h-4 text-white" /> },
          { label: "Confirmed", count: confirmedVisits.length, gradient: "from-emerald-500 to-green-500", icon: <Check className="w-4 h-4 text-white" /> },
          { label: "Total", count: visits.length, gradient: "from-violet-500 to-purple-500", icon: <Calendar className="w-4 h-4 text-white" /> },
        ].map((stat) => (
          <GlassCard dark={d} key={stat.label} className="p-3">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className={`text-lg font-bold ${d ? "text-white" : "text-gray-900"}`}>{stat.count}</p>
                <p className={`text-[10px] font-medium uppercase tracking-wider ${d ? "text-gray-500" : "text-gray-400"}`}>{stat.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Schedule Form */}
      {showSchedule && (
        <GlassCard dark={d} className="mb-6 p-6">
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${d ? "text-white" : "text-gray-900"}`}>
            <Calendar className="w-4 h-4 text-orange-400" /> Schedule a Pet Visit
          </h3>

          {availablePets.length === 0 ? (
            <div className={`text-center py-8 ${d ? "text-gray-400" : "text-gray-600"}`}>
              <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-amber-400" />
              <p className="font-medium mb-1">No pets available for visit</p>
              <p className="text-sm">Add pets to your favorites or submit an application first to schedule a visit.</p>
            </div>
          ) : (
            <form onSubmit={handleScheduleVisit} className="space-y-4">
              {/* Pet Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${d ? "text-gray-400" : "text-gray-600"}`}>
                  Select Pet
                </label>
                <select
                  value={scheduleForm.petName ? `${scheduleForm.petName}-${scheduleForm.shelterName}` : ""}
                  onChange={(e) => handlePetSelect(e.target.value)}
                  required
                  className={selectClass}
                >
                  <option value="" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Choose a pet to visit...</option>
                  {availablePets.map((pet) => (
                    <option key={`${pet.name}-${pet.shelterName}`} value={`${pet.name}-${pet.shelterName}`} className={d ? "bg-[#0a0a0f]" : "bg-white"}>
                      {pet.name} — {pet.shelterName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Pet Preview */}
              {scheduleForm.petName && (
                <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
                  d ? "bg-white/[0.03] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                }`}>
                  <img src={scheduleForm.petImage} alt={scheduleForm.petName} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className={`font-bold text-sm ${d ? "text-white" : "text-gray-900"}`}>{scheduleForm.petName}</p>
                    <p className={`text-xs flex items-center gap-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
                      <MapPin className="w-3 h-3" /> {scheduleForm.shelterName}
                    </p>
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${d ? "text-gray-400" : "text-gray-600"}`}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                    min={getMinDate()}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${d ? "text-gray-400" : "text-gray-600"}`}>
                    Preferred Time
                  </label>
                  <select
                    value={scheduleForm.timeSlot}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, timeSlot: e.target.value })}
                    required
                    className={selectClass}
                  >
                    <option value="" className={d ? "bg-[#0a0a0f]" : "bg-white"}>Select time slot...</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className={d ? "bg-[#0a0a0f]" : "bg-white"}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${d ? "text-gray-400" : "text-gray-600"}`}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={scheduleForm.userPhone}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, userPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${d ? "text-gray-400" : "text-gray-600"}`}>
                  Message to Shelter (Optional)
                </label>
                <textarea
                  value={scheduleForm.message}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, message: e.target.value })}
                  rows={3}
                  placeholder="Any special requests or questions for the shelter..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Info Note */}
              <div className={`flex items-start gap-3 p-3 rounded-2xl border ${
                d ? "bg-sky-500/[0.04] border-sky-500/10" : "bg-sky-50 border-sky-200"
              }`}>
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${d ? "text-sky-400" : "text-sky-500"}`} />
                <p className={`text-xs leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>
                  Your visit request will be sent to the shelter admin for approval. You&apos;ll receive a notification once it&apos;s confirmed or if any changes are needed.
                </p>
              </div>

              <div className="flex gap-3">
                <GradientButton dark={d} type="submit">
                  <Send className="w-4 h-4" /> Request Visit
                </GradientButton>
                <GradientButton dark={d} variant="outline" onClick={() => setShowSchedule(false)}>
                  Cancel
                </GradientButton>
              </div>
            </form>
          )}
        </GlassCard>
      )}

      {/* Visits List */}
      {visits.length === 0 && !showSchedule ? (
        <GlassCard dark={d} className="py-16 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center border ${
            d ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/10" : "bg-amber-50 border-amber-100"
          }`}>
            <Calendar className="w-8 h-8 text-amber-400" />
          </div>
          <p className={`text-lg font-semibold mb-2 ${d ? "text-gray-300" : "text-gray-700"}`}>No appointments yet</p>
          <p className={`text-sm mb-6 ${d ? "text-gray-500" : "text-gray-500"}`}>
            Schedule a visit to meet your favorite pets at their shelter
          </p>
          <GradientButton dark={d} onClick={() => setShowSchedule(true)}>
            <Calendar className="w-4 h-4" /> Schedule Your First Visit
          </GradientButton>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {/* Confirmed Visits */}
          {confirmedVisits.length > 0 && (
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${d ? "text-emerald-400" : "text-emerald-600"}`}>
                <Check className="w-4 h-4" /> Confirmed Visits ({confirmedVisits.length})
              </h3>
              <div className="space-y-3">
                {confirmedVisits.map(renderVisitCard)}
              </div>
            </div>
          )}

          {/* Pending Visits */}
          {pendingVisits.length > 0 && (
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${d ? "text-amber-400" : "text-amber-600"}`}>
                <Clock className="w-4 h-4" /> Pending Approval ({pendingVisits.length})
              </h3>
              <div className="space-y-3">
                {pendingVisits.map(renderVisitCard)}
              </div>
            </div>
          )}

          {/* Past Visits */}
          {pastVisits.length > 0 && (
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${d ? "text-gray-500" : "text-gray-400"}`}>
                <Star className="w-4 h-4" /> Past Visits ({pastVisits.length})
              </h3>
              <div className="space-y-3">
                {pastVisits.map(renderVisitCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}