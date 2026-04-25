"use client"

import { useState } from "react"
import { Bell, Scale, Search, X, MessageSquare, ChevronDown } from "lucide-react"

interface HeaderProps {
  onNavigate: (view: string) => void
}

export default function Header({ onNavigate }: HeaderProps) {
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalMessage, setLegalMessage] = useState("")
  const [legalResponse, setLegalResponse] = useState<string | null>(null)
  const [notifOpen, setNotifOpen] = useState(false)

  const handleLegalSubmit = () => {
    if (!legalMessage.trim()) return
    setLegalResponse(
      "Based on the documentation reviewed, this appears compliant with CMS guidelines. Ensure all diagnoses are supported by clinical evidence in the note."
    )
  }

  const notifications = [
    { id: 1, text: "Visit with Sarah Johnson requires verification", time: "5m ago", unread: true },
    { id: 2, text: "ICD code updated for Robert Chen", time: "22m ago", unread: true },
    { id: 3, text: "Documentation submitted for Emily Davis", time: "1h ago", unread: false },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 w-56 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span className="text-[#111827] font-semibold text-lg tracking-tight">MediClear AI</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search patients by name, DOB, or ID..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-[#F7F9FC] border border-gray-200 rounded-lg text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setLegalOpen(false) }}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#111827]">Notifications</span>
                <button onClick={() => setNotifOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="divide-y divide-gray-100">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 items-start ${n.unread ? "bg-blue-50/50" : ""}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? "bg-[#2563EB]" : "bg-gray-300"}`} />
                    <div className="flex-1">
                      <p className="text-sm text-[#111827] leading-relaxed">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Legal Assistant */}
        <div className="relative">
          <button
            onClick={() => { setLegalOpen(!legalOpen); setNotifOpen(false) }}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Legal Assistant"
          >
            <Scale className="w-5 h-5 text-gray-500" />
          </button>
          {legalOpen && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-sm font-semibold text-[#111827]">Legal Assistant</span>
                </div>
                <button onClick={() => { setLegalOpen(false); setLegalResponse(null); setLegalMessage("") }}>
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {legalResponse ? (
                  <div className="bg-blue-50 rounded-lg p-3 text-sm text-[#111827] leading-relaxed border border-blue-100">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span className="text-xs font-medium text-[#2563EB]">AI Legal Review</span>
                    </div>
                    {legalResponse}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Ask about compliance, billing regulations, or documentation requirements.</p>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Is this compliant?"
                    value={legalMessage}
                    onChange={e => setLegalMessage(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleLegalSubmit()}
                    className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                  />
                  <button
                    onClick={handleLegalSubmit}
                    className="px-3 py-2 bg-[#2563EB] text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ask
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Doctor Profile */}
        <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">DR</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-[#111827] leading-none">Dr. Reynolds</p>
            <p className="text-xs text-gray-400 leading-none mt-0.5">Internal Medicine</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  )
}
