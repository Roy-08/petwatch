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
  Mail: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  MailOpen: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
  ),
  Reply: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
  ),
  Send: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  User: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Chat: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
  ),
  ChevronLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
  ),
  ChevronRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  ),
  Eye: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
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

interface Message {
  _id: string; senderName: string; senderEmail?: string;
  recipientName: string; recipientEmail?: string;
  subject: string; content: string; isRead: boolean;
  createdAt: string; updatedAt?: string;
  sender?: { name: string; email: string };
  recipient?: { name: string; email: string };
}

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

export default function AdminMessagesPage() {
  const dk = useDk();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [sending, setSending] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", String(page));
      params.set("limit", "20");
      const res = await fetch(`/api/admin/messages?${params}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, page]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: "Admin", senderEmail: "admin@pawmatch.com",
          recipientName: selectedMessage.senderName,
          recipientEmail: selectedMessage.senderEmail,
          subject: `Re: ${selectedMessage.subject}`,
          content: replyContent,
        }),
      });
      const data = await res.json();
      if (data.success) { setReplyContent(""); fetchMessages(); }
    } catch (e) { console.error(e); }
    finally { setSending(false); }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  const card = dk
    ? "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm"
    : "rounded-2xl border border-zinc-200/80 bg-white shadow-sm";

  const inputClass = dk
    ? "w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all duration-300"
    : "w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-300 focus:bg-white transition-all duration-300";

  const avatarColors = [
    "from-violet-500 to-purple-600",
    "from-rose-500 to-pink-600",
    "from-sky-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-cyan-500 to-teal-600",
    "from-fuchsia-500 to-pink-600",
  ];

  const getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  return (
    <div className="space-y-6">
      {/* ═══ Hero Header ═══ */}
      <div className={`relative overflow-hidden rounded-2xl ${dk ? "bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-800/50 border-zinc-800/60" : "bg-gradient-to-br from-white via-white to-zinc-50 border-zinc-200/80"} border`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/25">
                <Icons.Chat className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 opacity-20 blur-xl" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dk ? "text-white" : "text-zinc-900"}`}>Messages</h1>
              <p className={`text-sm mt-1 ${dk ? "text-zinc-400" : "text-zinc-500"}`}>
                {unreadCount > 0 ? (
                  <><span className={`font-bold ${dk ? "text-emerald-400" : "text-emerald-600"}`}>{unreadCount} unread</span> message{unreadCount > 1 ? "s" : ""} to review</>
                ) : "All messages read ✓"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${dk ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {unreadCount} New
            </div>
          )}
        </div>
      </div>

      {/* ═══ Search ═══ */}
      <div className="relative group">
        <Icons.Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500 group-focus-within:text-violet-400" : "text-zinc-400 group-focus-within:text-violet-500"} transition-colors`} />
        <input type="text" placeholder="Search messages by sender, recipient, subject..." value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className={`pl-10 pr-4 ${inputClass}`} />
      </div>

      {/* ═══ Messages List ═══ */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Icons.Loader className={`w-8 h-8 ${dk ? "text-violet-400" : "text-violet-500"}`} />
              <div className="absolute inset-0 blur-xl bg-violet-500/20 rounded-full" />
            </div>
            <span className={`text-sm font-medium ${dk ? "text-zinc-500" : "text-zinc-400"}`}>Loading messages…</span>
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className={`${card} flex flex-col items-center justify-center py-20 gap-4`}>
          <div className={`w-20 h-20 rounded-2xl ${dk ? "bg-zinc-800/60" : "bg-zinc-100"} flex items-center justify-center`}>
            <Icons.Mail className={`w-10 h-10 ${dk ? "text-zinc-600" : "text-zinc-300"}`} />
          </div>
          <p className={`font-bold ${dk ? "text-zinc-400" : "text-zinc-500"}`}>No messages found</p>
          <p className={`text-sm ${dk ? "text-zinc-600" : "text-zinc-400"}`}>Messages will appear here once received</p>
        </div>
      ) : (
        <div className={`${card} overflow-hidden`}>
          <div className={`divide-y ${dk ? "divide-zinc-800/50" : "divide-zinc-100"}`}>
            {messages.map((msg, i) => {
              const senderName = msg.sender?.name || msg.senderName;
              return (
                <div key={msg._id} onClick={() => setSelectedMessage(msg)}
                  className={`flex items-start gap-4 px-5 py-4 cursor-pointer transition-all duration-200 ${
                    !msg.isRead
                      ? dk ? "bg-violet-500/[0.04] hover:bg-violet-500/[0.08]" : "bg-violet-50/50 hover:bg-violet-50"
                      : dk ? "hover:bg-zinc-800/30" : "hover:bg-zinc-50"
                  }`}
                  style={{ animation: `riseIn 0.4s ease-out ${i * 0.03}s both` }}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white shadow-md ${
                    !msg.isRead
                      ? `bg-gradient-to-br ${getAvatarColor(senderName)}`
                      : dk ? "bg-zinc-800" : "bg-zinc-200"
                  }`}>
                    {!msg.isRead ? senderName.charAt(0).toUpperCase() : (
                      <Icons.User className={`w-4 h-4 ${dk ? "text-zinc-500" : "text-zinc-400"}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-sm font-bold truncate ${!msg.isRead ? (dk ? "text-white" : "text-zinc-900") : (dk ? "text-zinc-300" : "text-zinc-600")}`}>
                          {senderName}
                        </span>
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 animate-pulse" />
                        )}
                      </div>
                      <span className={`text-[11px] flex-shrink-0 tabular-nums ${dk ? "text-zinc-600" : "text-zinc-400"}`}>{timeAgo(msg.createdAt)}</span>
                    </div>
                    <p className={`text-sm truncate mb-0.5 ${!msg.isRead ? (dk ? "text-zinc-200 font-semibold" : "text-zinc-800 font-semibold") : (dk ? "text-zinc-400" : "text-zinc-500")}`}>
                      {msg.subject || "(No Subject)"}
                    </p>
                    <p className={`text-xs truncate ${dk ? "text-zinc-600" : "text-zinc-400"}`}>
                      {msg.content}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0 self-center">
                    <div className={`p-2 rounded-lg transition-all ${dk ? "hover:bg-zinc-700/50" : "hover:bg-zinc-100"}`}>
                      <Icons.Eye className={`w-4 h-4 ${dk ? "text-zinc-600 hover:text-violet-400" : "text-zinc-400 hover:text-violet-500"}`} />
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* ═══ Message Detail Modal ═══ */}
      {selectedMessage && (() => {
        const senderName = selectedMessage.sender?.name || selectedMessage.senderName;
        return (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <div className={`absolute inset-0 ${dk ? "bg-black/70" : "bg-black/30"} backdrop-blur-md`} onClick={() => { setSelectedMessage(null); setReplyContent(""); }} />
            <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 ${dk ? "bg-[#0c0c14]/98 border border-zinc-800" : "bg-white border border-zinc-200 shadow-2xl"} backdrop-blur-2xl`}
              style={{ animation: "fadeInScale 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${dk ? "text-white" : "text-zinc-900"}`}>Message Details</h2>
                <button onClick={() => { setSelectedMessage(null); setReplyContent(""); }}
                  className={`p-2 rounded-xl ${dk ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-500"} transition-all`}>
                  <Icons.X />
                </button>
              </div>

              <div className="space-y-5">
                {/* Message Meta */}
                <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getAvatarColor(senderName)} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {senderName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${dk ? "text-white" : "text-zinc-900"}`}>{senderName}</p>
                        <p className={`text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{selectedMessage.sender?.email || selectedMessage.senderEmail || "N/A"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs ${dk ? "text-zinc-500" : "text-zinc-400"}`}>{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                      <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${
                        selectedMessage.isRead
                          ? dk ? "bg-zinc-800 text-zinc-500 border-zinc-700" : "bg-zinc-100 text-zinc-400 border-zinc-200"
                          : dk ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-violet-50 text-violet-600 border-violet-200"
                      }`}>
                        {selectedMessage.isRead ? <><Icons.MailOpen className="w-3 h-3" /> Read</> : <><Icons.Mail className="w-3 h-3" /> Unread</>}
                      </span>
                    </div>
                  </div>
                  <div className={`grid grid-cols-2 gap-3 text-sm pt-3 border-t ${dk ? "border-zinc-700/40" : "border-zinc-200"}`}>
                    <div><span className={dk ? "text-zinc-500" : "text-zinc-400"}>To:</span> <span className={`ml-2 font-medium ${dk ? "text-zinc-300" : "text-zinc-700"}`}>{selectedMessage.recipient?.name || selectedMessage.recipientName}</span></div>
                    <div><span className={dk ? "text-zinc-500" : "text-zinc-400"}>Email:</span> <span className={`ml-2 font-medium ${dk ? "text-zinc-300" : "text-zinc-700"}`}>{selectedMessage.recipient?.email || selectedMessage.recipientEmail || "N/A"}</span></div>
                  </div>
                </div>

                {/* Subject & Content */}
                <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Subject</h3>
                  <p className={`font-semibold ${dk ? "text-white" : "text-zinc-900"}`}>{selectedMessage.subject || "(No Subject)"}</p>
                  <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] pt-2 ${dk ? "text-violet-400" : "text-violet-600"}`}>Content</h3>
                  <p className={`text-sm whitespace-pre-wrap leading-relaxed ${dk ? "text-zinc-300" : "text-zinc-600"}`}>{selectedMessage.content}</p>
                </div>

                {/* Reply Section */}
                <div className={`rounded-2xl p-5 space-y-3 ${dk ? "bg-zinc-800/40 border border-zinc-700/40" : "bg-zinc-50 border border-zinc-100"}`}>
                  <div className="flex items-center gap-2">
                    <Icons.Reply className={`w-4 h-4 ${dk ? "text-violet-400" : "text-violet-600"}`} />
                    <h3 className={`text-[11px] font-bold uppercase tracking-[0.2em] ${dk ? "text-violet-400" : "text-violet-600"}`}>Reply</h3>
                  </div>
                  <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} rows={4}
                    placeholder="Type your reply here..."
                    className={`${dk ? "bg-zinc-800/60 border-zinc-700/60 text-white placeholder-zinc-600 focus:bg-zinc-800" : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:bg-white"} w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition-all duration-300 border`} />
                  <div className="flex justify-end">
                    <button onClick={handleReply} disabled={sending || !replyContent.trim()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm shadow-lg shadow-violet-500/25 hover:scale-[1.02] transition-all disabled:opacity-50">
                      {sending ? <><Icons.Loader className="w-4 h-4" /> Sending…</> : <><Icons.Send className="w-4 h-4" /> Send Reply</>}
                    </button>
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