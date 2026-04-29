"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { 
  ShieldCheck, 
  ShieldAlert, 
  User, 
  Database, 
  ExternalLink, 
  AlertCircle,
  FileSearch,
  ChevronRight
} from "lucide-react"

/* ── Mock Data ────────────────────────────────────────── */

const utilizationData = [
  { code: "99213", count: 450, color: "#94a3b8" },
  { code: "99214", count: 320, color: "#64748b" },
  { code: "99215", count: 120, color: "#475569" },
  { code: "99203", count: 85, color: "#cbd5e1" },
  { code: "99204", count: 60, color: "#94a3b8" },
]

const signals = [
  { id: 1, type: "High Frequency", signal: "Upcoding Pattern", severity: "Medium", date: "2026-04-20" },
  { id: 2, type: "Billing", signal: "Unbundled services", severity: "High", date: "2026-04-18" },
  { id: 3, type: "Time Analysis", signal: "Overlapping visits", severity: "Low", date: "2026-04-15" },
]

const recentCases = [
  { id: "V-8291", patient: "Sarah Johnson", date: "Apr 24, 2026", status: "Flagged", amount: "$240.00" },
  { id: "V-8288", patient: "Robert Chen", date: "Apr 23, 2026", status: "Verified", amount: "$185.50" },
  { id: "V-8285", patient: "Emily Davis", date: "Apr 23, 2026", status: "Verified", amount: "$310.00" },
  { id: "V-8282", patient: "Michael Brown", date: "Apr 22, 2026", status: "Audit Pending", amount: "$125.00" },
]

/* ── Components ───────────────────────────────────────── */

interface DoctorRiskProfileProps {
  onNavigate: (view: string) => void
}

export default function DoctorRiskProfile({ onNavigate }: DoctorRiskProfileProps) {
  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctor Risk Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Comprehensive audit and risk assessment dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Initiate Review
          </button>
        </div>
      </div>

      {/* ── Top Section: General Info & Integration ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-blue-100 shadow-sm">
              <User className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900">Dr. Jonathan Reynolds</h2>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider border border-slate-200">
                  Internal Medicine
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">NPI Number</p>
                  <p className="text-sm font-semibold text-slate-700">1293847560</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Years in System</p>
                  <p className="text-sm font-semibold text-slate-700">8.5 Years</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Compliance Score</p>
                  <p className="text-sm font-semibold text-slate-700">84/100</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Status</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-semibold text-slate-700">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-60 pointer-events-none" />
          <div className="flex items-center gap-3 mb-5 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
              <Database className="w-4 h-4 text-slate-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">System Integration</h3>
          </div>
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm text-slate-600">CMS Database</span>
              <div className="flex items-center gap-1.5 text-blue-600 font-medium text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Connected
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm text-slate-600">NPI Registry</span>
              <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                Disconnected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle Section: Service Utilization & Anomalies ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Utilization */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Service Utilization (CMS Codes)</h3>
              <p className="text-xs text-slate-500 mt-1">Distribution of primary CPT codes over last 6 months</p>
            </div>
            <div className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md text-xs font-medium text-slate-600">Last 6 Months</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData} layout="vertical" margin={{ left: 0, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="code" 
                  type="category" 
                  tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {utilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Summary (iSignals) */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Anomaly Summary
                <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full">AI Powered</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">Suspicious patterns detected by AI engine</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200/60 flex items-center gap-1.5 shadow-sm shadow-amber-100">
              <ShieldAlert className="w-3.5 h-3.5" />
              3 Action Items
            </span>
          </div>
          <div className="space-y-4">
            {signals.map((sig) => (
              <div key={sig.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-slate-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    sig.severity === "High" ? "bg-red-50 text-red-600" : 
                    sig.severity === "Medium" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                  }`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{sig.signal}</p>
                    <p className="text-xs text-slate-500">{sig.type} &bull; {sig.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    sig.severity === "High" ? "bg-red-100 text-red-700" : 
                    sig.severity === "Medium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {sig.severity}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors border-t border-slate-100 pt-4">
            View All Audit Logs
          </button>
        </div>
      </div>

      {/* ── Bottom Section: Recent Cases Table ── */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Cases & Visits</h3>
            <p className="text-xs text-slate-500 mt-1">Audit-ready documentation for detailed review</p>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors">
            View History
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Case ID</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Service Date</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audit Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.patient}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      c.status === "Flagged" ? "bg-red-50 text-red-600 border border-red-100" :
                      c.status === "Verified" ? "bg-green-50 text-green-600 border border-green-100" :
                      "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onNavigate("visit")}
                      className="text-xs font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      <FileSearch className="w-3.5 h-3.5" />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
