"use client"
import { useRouter } from "next/navigation";
import { Clock, ArrowRight, Check, X, Eye, Star, FileText, PawPrint, MapPin, Phone, Mail, FileCheck } from "lucide-react";
import { useDashboard, GlassCard, GradientButton, statusConfig } from "../layout";
import { useState } from "react";

interface ApplicationDetail {
  _id: string;
  petName: string;
  petImage: string;
  shelterName: string;
  status: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  documentType?: string;
  documentNumber?: string;
  addressProof?: string;
  fullAddress?: string;
  livingArrangement?: string;
  hasExperience?: boolean;
  reasonForAdoption?: string;
  undertakingAccepted?: boolean;
  applicantName?: string;
  applicantPhone?: string;
  applicantEmail?: string;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const { darkMode, applications } = useDashboard();
  const d = darkMode;
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const getStepProgress = (status: string) => {
    const steps = ["pending", "reviewing", "approved", "completed"];
    const idx = steps.indexOf(status);
    if (status === "rejected") return 50;
    return idx >= 0 ? ((idx + 1) / steps.length) * 100 : 0;
  };

  const toggleExpand = (appId: string) => {
    setExpandedApp(prev => prev === appId ? null : appId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>Adoption Applications</h2>
          <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>{applications.length} total applications</p>
        </div>
      </div>
      {applications.length === 0 ? (
        <GlassCard dark={d} className="py-16 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center border ${
            d ? "bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/10" : "bg-violet-50 border-violet-100"
          }`}>
            <FileText className="w-8 h-8 text-violet-400" />
          </div>
          <p className={`text-lg font-semibold mb-2 ${d ? "text-gray-300" : "text-gray-700"}`}>No applications yet</p>
          <p className={`text-sm mb-6 ${d ? "text-gray-500" : "text-gray-500"}`}>Find your perfect companion and start the adoption process</p>
          <GradientButton dark={d} onClick={() => router.push("/pets")}><PawPrint className="w-4 h-4" /> Find a Pet</GradientButton>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const typedApp = app as unknown as ApplicationDetail;
            const sc = statusConfig[app.status] || statusConfig.pending;
            const progress = getStepProgress(app.status);
            const isExpanded = expandedApp === app._id;
            return (
              <GlassCard dark={d} key={app._id} className={`transition-all duration-300 ${
                d ? "hover:border-white/[0.12]" : "hover:border-gray-300"
              }`}>
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 group">
                      <img src={app.petImage} alt={app.petName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className={`font-bold text-lg ${d ? "text-white" : "text-gray-900"}`}>{app.petName}</h3>
                          <p className={`text-sm flex items-center gap-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
                            <MapPin className="w-3 h-3" /> {app.shelterName}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          d ? `${sc.bg} ${sc.color} ${sc.border}` : `${sc.lightBg} ${sc.lightColor} ${sc.lightBorder}`
                        }`}>
                          {sc.icon}
                          <span className="capitalize">{app.status}</span>
                        </span>
                      </div>
                      <p className={`text-sm mb-3 line-clamp-2 ${d ? "text-gray-400" : "text-gray-600"}`}>{app.message}</p>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className={`h-2 rounded-full overflow-hidden ${d ? "bg-white/[0.04]" : "bg-gray-100"}`}>
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              app.status === "rejected"
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : "bg-gradient-to-r from-rose-500 via-orange-500 to-emerald-500"
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className={`flex justify-between text-[10px] font-medium mb-3 ${d ? "text-gray-600" : "text-gray-400"}`}>
                        <span>Pending</span><span>Review</span><span>Approved</span><span>Done</span>
                      </div>

                      <div className={`flex items-center gap-4 text-xs ${d ? "text-gray-600" : "text-gray-400"}`}>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Updated: {new Date(app.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpand(app._id)}
                    className={`mt-3 w-full py-2 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-1 ${
                      d ? "bg-white/[0.04] hover:bg-white/[0.08] text-gray-400" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isExpanded ? (
                      <>Hide Details <X className="w-3.5 h-3.5" /></>
                    ) : (
                      <>View Application Details <Eye className="w-3.5 h-3.5" /></>
                    )}
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className={`mt-4 pt-4 border-t space-y-4 ${d ? "border-white/[0.06]" : "border-gray-200"}`}>
                      {/* Pet Info Row */}
                      <div className="flex items-center gap-4">
                        <img src={app.petImage} alt={app.petName} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <p className={`font-bold ${d ? "text-white" : "text-gray-900"}`}>{app.petName}</p>
                          <p className={`text-sm ${d ? "text-gray-400" : "text-gray-600"}`}>{app.shelterName}</p>
                          <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            d ? `${sc.bg} ${sc.color} ${sc.border}` : `${sc.lightBg} ${sc.lightColor} ${sc.lightBorder}`
                          }`}>
                            {sc.icon} <span className="capitalize">{app.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Applicant Details */}
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3`}>
                        {typedApp.applicantName && (
                          <div className={`p-3 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${d ? "text-gray-500" : "text-gray-400"}`}>Applicant</p>
                            <p className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.applicantName}</p>
                          </div>
                        )}
                        {typedApp.applicantEmail && (
                          <div className={`p-3 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 flex items-center gap-1 ${d ? "text-gray-500" : "text-gray-400"}`}><Mail className="w-3 h-3" /> Email</p>
                            <p className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.applicantEmail}</p>
                          </div>
                        )}
                        {typedApp.applicantPhone && (
                          <div className={`p-3 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 flex items-center gap-1 ${d ? "text-gray-500" : "text-gray-400"}`}><Phone className="w-3 h-3" /> Phone</p>
                            <p className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.applicantPhone}</p>
                          </div>
                        )}
                        {typedApp.documentType && (
                          <div className={`p-3 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 flex items-center gap-1 ${d ? "text-gray-500" : "text-gray-400"}`}><FileCheck className="w-3 h-3" /> Document</p>
                            <p className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.documentType}: {typedApp.documentNumber}</p>
                          </div>
                        )}
                        {typedApp.fullAddress && (
                          <div className={`p-3 rounded-xl border sm:col-span-2 ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 flex items-center gap-1 ${d ? "text-gray-500" : "text-gray-400"}`}><MapPin className="w-3 h-3" /> Address</p>
                            <p className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.fullAddress}</p>
                          </div>
                        )}
                        {typedApp.livingArrangement && (
                          <div className={`p-3 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${d ? "text-gray-500" : "text-gray-400"}`}>Living Arrangement</p>
                            <p className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.livingArrangement}</p>
                          </div>
                        )}
                        {typedApp.addressProof && (
                          <div className={`p-3 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${d ? "text-gray-500" : "text-gray-400"}`}>Address Proof</p>
                            <p className={`text-sm font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.addressProof}</p>
                          </div>
                        )}
                      </div>

                      {/* Reason & Message */}
                      {typedApp.reasonForAdoption && (
                        <div className={`p-3 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                          <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${d ? "text-gray-500" : "text-gray-400"}`}>Reason for Adoption</p>
                          <p className={`text-sm ${d ? "text-gray-300" : "text-gray-700"}`}>{typedApp.reasonForAdoption}</p>
                        </div>
                      )}

                      {typedApp.undertakingAccepted && (
                        <div className={`flex items-center gap-2 p-3 rounded-xl border ${d ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"}`}>
                          <Check className={`w-4 h-4 ${d ? "text-emerald-400" : "text-emerald-600"}`} />
                          <span className={`text-sm font-medium ${d ? "text-emerald-400" : "text-emerald-700"}`}>Undertaking form accepted and signed</span>
                        </div>
                      )}

                      {/* Status Timeline */}
                      <div className={`p-4 rounded-xl border ${d ? "bg-white/[0.02] border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
                        <p className={`text-[10px] uppercase tracking-wider font-semibold mb-3 ${d ? "text-gray-500" : "text-gray-400"}`}>Application Timeline</p>
                        <div className="flex items-center gap-2">
                          {["pending", "reviewing", "approved", "completed"].map((step, idx) => {
                            const steps = ["pending", "reviewing", "approved", "completed"];
                            const currentIdx = steps.indexOf(app.status);
                            const isRejected = app.status === "rejected";
                            const isActive = idx <= currentIdx && !isRejected;
                            const isCurrentRejected = isRejected && idx === 1;
                            return (
                              <div key={step} className="flex items-center gap-2 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isCurrentRejected
                                    ? "bg-red-500 text-white"
                                    : isActive
                                      ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white"
                                      : d ? "bg-white/[0.06] text-gray-600" : "bg-gray-200 text-gray-400"
                                }`}>
                                  {isActive ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                                </div>
                                {idx < 3 && (
                                  <div className={`flex-1 h-1 rounded-full ${
                                    isActive && idx < currentIdx
                                      ? "bg-gradient-to-r from-rose-500 to-orange-500"
                                      : d ? "bg-white/[0.04]" : "bg-gray-200"
                                  }`} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className={`flex justify-between text-[10px] font-medium mt-2 ${d ? "text-gray-600" : "text-gray-400"}`}>
                          <span>Pending</span><span>Review</span><span>Approved</span><span>Done</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}