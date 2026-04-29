"use client"

import {
  CalendarDays,
  Stethoscope,
  FileText,
  Clock,
  BarChart2,
  UserCircle,
  Activity,
} from "lucide-react"

interface SidebarProps {
  activeView: string
  onNavigate: (view: string) => void
}

const navItems = [
  { id: "today", label: "Today Visits", icon: CalendarDays, badge: "8" },
  { id: "visit", label: "Active Visit", icon: Stethoscope, badge: null },
  { id: "documentation", label: "Documentation", icon: FileText, badge: null },
  { id: "history", label: "History", icon: Clock, badge: null },
  { id: "risk", label: "Risk Profile", icon: Activity, badge: "New" },
  { id: "analytics", label: "Analytics", icon: BarChart2, badge: null },
  { id: "profile", label: "Profile", icon: UserCircle, badge: null },
]

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-56 bg-white border-r border-gray-200 flex flex-col z-40">
      {/* Status indicator */}
      <div className="mx-4 mt-4 mb-2 px-3 py-2.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
        <Activity className="w-3.5 h-3.5 text-[#16A34A]" />
        <div>
          <p className="text-xs font-semibold text-[#16A34A]">System Active</p>
          <p className="text-[10px] text-green-600">AI Ready</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5" role="navigation" aria-label="Main navigation">
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeView === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md shadow-blue-500/20"
                  : "text-[#6B7280] hover:bg-[#F0F4F8] hover:text-[#111827]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"
                }`}
              />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] text-gray-400 font-medium">MediClear AI v2.4.1</p>
          <p className="text-[10px] text-gray-300">HIPAA Compliant</p>
        </div>
      </div>
    </aside>
  )
}
