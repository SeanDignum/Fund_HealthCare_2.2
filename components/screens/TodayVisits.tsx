"use client"

import { useState } from "react"
import { Monitor, Play, FolderOpen, History, Filter, Download, RefreshCw } from "lucide-react"

interface TodayVisitsProps {
  onNavigate: (view: string) => void
}

type StatusType = "not started" | "in progress" | "requires verification"

interface Patient {
  id: number
  name: string
  time: string
  status: StatusType
  risk: "low" | "medium" | "high"
  diagnosis: string
  dob: string
}

const patients: Patient[] = [
  { id: 1, name: "Sarah Johnson", time: "9:00 AM", status: "in progress", risk: "medium", diagnosis: "Hypertension, T2DM", dob: "1978-03-14" },
  { id: 2, name: "Robert Chen", time: "9:30 AM", status: "requires verification", risk: "high", diagnosis: "Chest pain, COPD", dob: "1955-07-22" },
  { id: 3, name: "Emily Davis", time: "10:00 AM", status: "not started", risk: "low", diagnosis: "Routine check-up", dob: "1992-11-08" },
  { id: 4, name: "Marcus Williams", time: "10:30 AM", status: "not started", risk: "low", diagnosis: "Follow-up, Anxiety", dob: "1985-02-19" },
  { id: 5, name: "Linda Patel", time: "11:00 AM", status: "requires verification", risk: "medium", diagnosis: "Migraine, Hypothyroid", dob: "1968-09-30" },
  { id: 6, name: "James O'Brien", time: "11:30 AM", status: "in progress", risk: "high", diagnosis: "Post-op follow-up", dob: "1950-05-12" },
  { id: 7, name: "Aisha Thompson", time: "1:00 PM", status: "not started", risk: "low", diagnosis: "Preventive care", dob: "2001-06-25" },
  { id: 8, name: "David Kim", time: "1:30 PM", status: "not started", risk: "medium", diagnosis: "Back pain, Obesity", dob: "1975-12-03" },
]

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  "not started": { label: "Not Started", className: "bg-gray-100 text-gray-600" },
  "in progress": { label: "In Progress", className: "bg-blue-100 text-[#2563EB]" },
  "requires verification": { label: "Requires Verification", className: "bg-amber-100 text-amber-700" },
}

const riskConfig = {
  low: { color: "bg-[#16A34A]", label: "Low Risk" },
  medium: { color: "bg-[#F59E0B]", label: "Medium Risk" },
  high: { color: "bg-[#DC2626]", label: "High Risk" },
}

export default function TodayVisits({ onNavigate }: TodayVisitsProps) {
  const [filter, setFilter] = useState<"all" | StatusType>("all")

  const filtered = filter === "all" ? patients : patients.filter(p => p.status === filter)

  const counts = {
    all: patients.length,
    "not started": patients.filter(p => p.status === "not started").length,
    "in progress": patients.filter(p => p.status === "in progress").length,
    "requires verification": patients.filter(p => p.status === "requires verification").length,
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Today&apos;s Visits</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Thursday, April 24, 2026 &mdash; 8 scheduled appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => console.log("Refresh visits")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
          <button
            onClick={() => console.log("Export schedule")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "not started", "in progress", "requires verification"] as const).map(key => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filter === key
                ? "bg-[#2563EB] text-white border-[#2563EB]"
                : "bg-white text-[#6B7280] border-gray-200 hover:border-gray-300"
            }`}
          >
            {key === "all" ? "All Visits" : statusConfig[key as StatusType]?.label ?? key}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filter === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[key]}
            </span>
          </button>
        ))}
        <div className="ml-auto">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B7280] border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            <Filter className="w-3 h-3" />
            Filters
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Patient</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Time</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Risk</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(patient => {
              const status = statusConfig[patient.status]
              const risk = riskConfig[patient.risk]
              return (
                <tr key={patient.id} className="hover:bg-[#F7F9FC] transition-colors group">
                  <td className="px-5 py-4">
                    <button
                      onClick={() => onNavigate("visit")}
                      className="font-semibold text-[#2563EB] hover:underline text-left"
                    >
                      {patient.name}
                    </button>
                    <p className="text-xs text-[#6B7280] mt-0.5">{patient.diagnosis}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-medium text-[#111827]">{patient.time}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${risk.color}`}
                        title={risk.label}
                      />
                      <span className="text-xs text-[#6B7280]">{risk.label}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      {patient.status === "not started" && (
                        <button
                          onClick={() => onNavigate("visit")}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 hover:shadow-sm transition-all"
                        >
                          <Play className="w-3 h-3" />
                          Start
                        </button>
                      )}
                      {patient.status !== "not started" && (
                        <button
                          onClick={() => onNavigate("visit")}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#2563EB] border border-[#2563EB] rounded-lg hover:bg-blue-50 transition-all"
                        >
                          <FolderOpen className="w-3 h-3" />
                          Open Visit
                        </button>
                      )}
                      <button
                        onClick={() => console.log("View history", patient.name)}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <History className="w-3 h-3" />
                        History
                      </button>
                      <button
                        onClick={() => console.log("Open monitoring", patient.name)}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <Monitor className="w-3 h-3" />
                        Monitor
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
