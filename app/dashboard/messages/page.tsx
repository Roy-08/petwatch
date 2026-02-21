"use client"
import { useState, type FormEvent } from "react";
import {
  MessageCircle, Plus, Send, Mail, Bell, FileText, Check, PawPrint,
  Calendar, Clock, Eye, X, Star, Filter, ChevronDown,
} from "lucide-react";
import { useDashboard, GlassCard, GradientButton, statusConfig } from "../layout";
import Link from "next/link";

type NotificationFilter = "all" | "form_submission" | "application_status" | "adoption_complete" | "visit_update" | "message";

export default function MessagesPage() {
  const { user, darkMode, messages, setMessages, fetchMessages, visits } = useDashboard();
  const d = darkMode;

  const unreadCount = messages.filter(m => !m.isRead && m.senderType !== "user").length;
  const [showCompose, setShowCompose] = useState(false);
  const [composeForm, setComposeForm] = useState({ recipientName: "", subject: "", content: "" });
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const inputClass = `w-full px-4 py-3.5 rounded-2xl border text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 ${
    d ? "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600"
      : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400"
  }`;

  /* ─── Build unified notifications list ─── */
  const getNotificationType = (msg: typeof messages[0]): NotificationFilter => {
    if (msg.notificationType === "form_submission") return "form_submission";
    if (msg.notificationType === "application_status") return "application_status";
    if (msg.notificationType === "adoption_complete") return "adoption_complete";
    if (msg.notificationType === "visit_update") return "visit_update";
    return "message";
  };

  const getNotificationIcon = (type: NotificationFilter) => {
    switch (type) {
      case "form_submission": return <FileText className="w-4 h-4 text-white" />;
      case "application_status": return <Eye className="w-4 h-4 text-white" />;
      case "adoption_complete": return <PawPrint className="w-4 h-4 text-white" />;
      case "visit_update": return <Calendar className="w-4 h-4 text-white" />;
      default: return <Mail className="w-4 h-4 text-white" />;
    }
  };

  const getNotificationGradient = (type: NotificationFilter) => {
    switch (type) {
      case "form_submission": return "from-blue-500 to-cyan-500";
      case "application_status": return "from-amber-500 to-orange-500";
      case "adoption_complete": return "from-emerald-500 to-green-500";
      case "visit_update": return "from-violet-500 to-purple-500";
      default: return "from-sky-500 to-blue-600";
    }
  };

  const getNotificationLabel = (type: NotificationFilter) => {
    switch (type) {
      case "form_submission": return "Form Submitted";
      case "application_status": return "Status Update";
      case "adoption_complete": return "Adoption Complete";
      case "visit_update": return "Visit Update";
      case "message": return "Message";
      default: return "All";
    }
  };

  const filterOptions: { value: NotificationFilter; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "All Notifications", icon: <Bell className="w-3.5 h-3.5" /> },
    { value: "form_submission", label: "Form Submissions", icon: <FileText className="w-3.5 h-3.5" /> },
    { value: "application_status", label: "Status Updates", icon: <Eye className="w-3.5 h-3.5" /> },
    { value: "adoption_complete", label: "Adoptions", icon: <PawPrint className="w-3.5 h-3.5" /> },
    { value: "visit_update", label: "Visit Updates", icon: <Calendar className="w-3.5 h-3.5" /> },
    { value: "message", label: "Messages", icon: <MessageCircle className="w-3.5 h-3.5" /> },
  ];

  const filteredMessages = activeFilter === "all"
    ? messages
    : messages.filter(msg => {
        const type = getNotificationType(msg);
        if (activeFilter === "message") {
          return type === "message" || msg.senderType === "user";
        }
        return type === activeFilter;
      });

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (user._id !== "demo123") {
      try {
        await fetch("/api/adopter/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: user._id, senderName: user.name, senderType: "user",
            recipient: user._id, recipientName: composeForm.recipientName,
            recipientType: "shelter", subject: composeForm.subject,
            content: composeForm.content,
          }),
        });
        fetchMessages();
      } catch (e) { console.error(e); }
    } else {
      setMessages(prev => {
        return [{
          _id: `m${Date.now()}`, senderName: user.name, senderType: "user",
          recipientName: composeForm.recipientName, subject: composeForm.subject,
          content: composeForm.content, isRead: true, createdAt: new Date().toISOString(),
          notificationType: "", relatedStatus: undefined, relatedPetName: undefined,
        }, ...prev];
      });
    }
    setShowCompose(false);
    setComposeForm({ recipientName: "", subject: "", content: "" });
  };

  /* ─── Notification counts by type ─── */
  const countByType = (type: NotificationFilter) => {
    if (type === "all") return messages.filter(m => !m.isRead && m.senderType !== "user").length;
    return messages.filter(m => {
      const t = getNotificationType(m);
      if (type === "message") return (t === "message" || m.senderType === "user") && !m.isRead;
      return t === type && !m.isRead;
    }).length;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-extrabold ${d ? "text-white" : "text-gray-900"}`}>
            Notifications & Messages
          </h2>
          <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up! ✨"}
          </p>
        </div>
        
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Submissions", count: messages.filter(m => m.notificationType === "form_submission").length, icon: <FileText className="w-4 h-4" />, gradient: "from-blue-500 to-cyan-500" },
          { label: "Status Updates", count: messages.filter(m => m.notificationType === "application_status").length, icon: <Eye className="w-4 h-4" />, gradient: "from-amber-500 to-orange-500" },
          { label: "Adoptions", count: messages.filter(m => m.notificationType === "adoption_complete").length, icon: <PawPrint className="w-4 h-4" />, gradient: "from-emerald-500 to-green-500" },
          { label: "Appointments", count: visits.length, icon: <Calendar className="w-4 h-4" />, gradient: "from-violet-500 to-purple-500" },
        ].map((stat) => (
          <GlassCard dark={d} key={stat.label} className="p-3">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}>
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

      {/* Filter Bar */}
      <div className="mb-4">
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all ${
              d ? "bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08]"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter className="w-4 h-4" />
            {filterOptions.find(f => f.value === activeFilter)?.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? "rotate-180" : ""}`} />
          </button>
          {showFilterDropdown && (
            <div className={`absolute top-full left-0 mt-2 w-64 rounded-2xl border shadow-xl z-20 overflow-hidden ${
              d ? "bg-[#0f0f15] border-white/[0.08]" : "bg-white border-gray-200"
            }`}>
              {filterOptions.map((opt) => {
                const count = countByType(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => { setActiveFilter(opt.value); setShowFilterDropdown(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                      activeFilter === opt.value
                        ? d ? "bg-white/[0.08] text-white" : "bg-orange-50 text-orange-700"
                        : d ? "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {opt.icon}
                    <span className="flex-1 text-left font-medium">{opt.label}</span>
                    {count > 0 && (
                      <span className={`min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        d ? "bg-rose-500/20 text-rose-400" : "bg-rose-100 text-rose-600"
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Compose Form */}
      {showCompose && (
        <GlassCard dark={d} className="mb-6 p-6">
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${d ? "text-white" : "text-gray-900"}`}>
            <Send className="w-4 h-4 text-orange-400" /> New Message
          </h3>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <input type="text" value={composeForm.recipientName}
              onChange={(e) => setComposeForm({ ...composeForm, recipientName: e.target.value })}
              placeholder="Shelter name" required className={inputClass} />
            <input type="text" value={composeForm.subject}
              onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
              placeholder="Subject" required className={inputClass} />
            <textarea value={composeForm.content}
              onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
              rows={4} placeholder="Your message..." required className={`${inputClass} resize-none`} />
            <div className="flex gap-3">
              <GradientButton dark={d} type="submit"><Send className="w-4 h-4" /> Send</GradientButton>
              <GradientButton dark={d} variant="outline" onClick={() => setShowCompose(false)}>Cancel</GradientButton>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Notifications List */}
      {filteredMessages.length === 0 ? (
        <GlassCard dark={d} className="py-16 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center border ${
            d ? "bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border-sky-500/10" : "bg-sky-50 border-sky-100"
          }`}>
            <Bell className="w-8 h-8 text-sky-400" />
          </div>
          <p className={`text-lg font-semibold ${d ? "text-gray-300" : "text-gray-700"}`}>
            {activeFilter === "all" ? "No notifications yet" : `No ${getNotificationLabel(activeFilter).toLowerCase()} notifications`}
          </p>
          <p className={`text-sm mt-2 ${d ? "text-gray-500" : "text-gray-500"}`}>
            You&apos;ll see updates about your applications, visits, and messages here.
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => {
            const isUnread = !msg.isRead && msg.senderType !== "user";
            const isSent = msg.senderType === "user";
            const isExpanded = expandedMsg === msg._id;
            const notifType = getNotificationType(msg);
            const notifGradient = isSent ? "from-rose-500 to-orange-500" : getNotificationGradient(notifType);
            const sc = msg.relatedStatus ? statusConfig[msg.relatedStatus] || statusConfig.pending : null;

            return (
              <GlassCard dark={d} key={msg._id}
                onClick={() => setExpandedMsg(isExpanded ? null : msg._id)}
                className={`p-4 transition-all duration-300 cursor-pointer ${
                  d
                    ? `hover:border-white/[0.12] ${isUnread ? "border-orange-500/20 bg-orange-500/[0.03]" : ""}`
                    : `hover:border-gray-300 ${isUnread ? "border-orange-200 bg-orange-50/50" : ""}`
                }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${notifGradient}`}>
                    {isSent ? <Send className="w-4 h-4 text-white" /> : getNotificationIcon(notifType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-bold text-sm ${d ? "text-white" : "text-gray-900"}`}>{msg.subject}</h3>
                          {!isSent && notifType !== "message" && (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              d ? "bg-white/[0.06] text-gray-400" : "bg-gray-100 text-gray-500"
                            }`}>
                              {getNotificationLabel(notifType)}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs ${d ? "text-gray-500" : "text-gray-500"}`}>
                          {isSent ? `To: ${msg.recipientName}` : `From: ${msg.senderName}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isUnread && <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 shadow-lg shadow-orange-500/40 animate-pulse" />}
                        <span className={`text-[10px] ${d ? "text-gray-600" : "text-gray-400"}`}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Status badge for application-related notifications */}
                    {sc && msg.relatedStatus && (
                      <div className="mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          d ? `${sc.bg} ${sc.color} ${sc.border}` : `${sc.lightBg} ${sc.lightColor} ${sc.lightBorder}`
                        }`}>
                          {sc.icon}
                          <span className="capitalize">{msg.relatedStatus}</span>
                          {msg.relatedPetName && <span>• {msg.relatedPetName}</span>}
                        </span>
                      </div>
                    )}

                    <p className={`text-sm leading-relaxed ${d ? "text-gray-400" : "text-gray-600"} ${isExpanded ? "" : "line-clamp-2"}`}>
                      {msg.content}
                    </p>

                    {/* Expanded actions */}
                    {isExpanded && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {notifType === "application_status" && msg.relatedStatus === "approved" && (
                          <Link href="/dashboard/visits" onClick={(e) => e.stopPropagation()}>
                            <GradientButton dark={d} variant="ghost" className="text-xs">
                              <Calendar className="w-3.5 h-3.5" /> Schedule Visit
                            </GradientButton>
                          </Link>
                        )}
                        {notifType === "form_submission" && (
                          <Link href="/dashboard/applications" onClick={(e) => e.stopPropagation()}>
                            <GradientButton dark={d} variant="ghost" className="text-xs">
                              <FileText className="w-3.5 h-3.5" /> View Application
                            </GradientButton>
                          </Link>
                        )}
                        {notifType === "adoption_complete" && (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                            d ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          }`}>
                            <PawPrint className="w-3.5 h-3.5" /> Adopted! 🎉
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}