"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import TodayVisits from "@/components/screens/TodayVisits"
import ActiveVisit from "@/components/screens/ActiveVisit"
import Documentation from "@/components/screens/Documentation"
import History from "@/components/screens/History"
import Analytics from "@/components/screens/Analytics"
import DoctorRiskProfile from "@/components/screens/DoctorRiskProfile"
import Login from "@/components/screens/Login"

type View = "today" | "visit" | "documentation" | "history" | "analytics" | "profile" | "risk"

function PlaceholderScreen({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <span className="text-2xl text-gray-400">—</span>
      </div>
      <h2 className="text-lg font-semibold text-[#111827]">{title}</h2>
      <p className="text-sm text-[#6B7280] mt-1 max-w-xs">{description}</p>
    </div>
  )
}

export default function MediClearApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState<View>("today")

  const navigate = (view: string) => setActiveView(view as View)

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Header onNavigate={navigate} />
      <Sidebar activeView={activeView} onNavigate={navigate} />

      <main
        className="pt-16 pl-56 min-h-screen"
        role="main"
        aria-label="Main content"
      >
        <div className="p-6 max-w-[1400px]">
          {activeView === "today" && <TodayVisits onNavigate={navigate} />}
          {activeView === "visit" && <ActiveVisit onNavigate={navigate} />}
          {activeView === "documentation" && <Documentation onNavigate={navigate} />}
          {activeView === "history" && <History onNavigate={navigate} />}
          {activeView === "analytics" && <Analytics />}
          {activeView === "risk" && <DoctorRiskProfile onNavigate={navigate} />}
          {activeView === "profile" && (
            <PlaceholderScreen
              title="Doctor Profile"
              description="Manage your profile, preferences, specialty settings, and credentials."
            />
          )}
        </div>
      </main>
    </div>
  )
}
