"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"

/* ── Data ─────────────────────────────────────────────── */

const codingAccuracyData = [
  { day: "Apr 18", accuracy: 87 },
  { day: "Apr 19", accuracy: 91 },
  { day: "Apr 20", accuracy: 89 },
  { day: "Apr 21", accuracy: 94 },
  { day: "Apr 22", accuracy: 92 },
  { day: "Apr 23", accuracy: 96 },
  { day: "Apr 24", accuracy: 97 },
]

const docTimeData = [
  { day: "Mon", minutes: 18 },
  { day: "Tue", minutes: 22 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 20 },
  { day: "Fri", minutes: 12 },
  { day: "Sat", minutes: 9 },
  { day: "Sun", minutes: 7 },
]

const denialRateData = [
  { month: "Nov", rate: 8.4 },
  { month: "Dec", rate: 7.1 },
  { month: "Jan", rate: 6.3 },
  { month: "Feb", rate: 5.8 },
  { month: "Mar", rate: 4.2 },
  { month: "Apr", rate: 3.1 },
]

/* ── Custom tooltip ───────────────────────────────────── */

function ChartTooltip({
  active,
  payload,
  label,
  unit,
  color,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
  unit: string
  color: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="text-[#6B7280] mb-0.5">{label}</p>
      <p className="font-semibold" style={{ color }}>
        {payload[0].value}
        {unit}
      </p>
    </div>
  )
}

/* ── Stat badge ───────────────────────────────────────── */

function StatBadge({
  value,
  direction,
  label,
}: {
  value: string
  direction: "up" | "down"
  label: string
}) {
  const isUp = direction === "up"
  return (
    <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? "text-green-600" : "text-red-500"}`}>
      {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
      {value} {label}
    </div>
  )
}

/* ── Gauge (Coding Accuracy) ──────────────────────────── */

function AccuracyGauge({ value }: { value: number }) {
  const radius = 70
  const stroke = 10
  const circumference = Math.PI * radius // half circle
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-2">
      <svg width="180" height="100" viewBox="0 0 180 100" aria-label={`Coding accuracy: ${value}%`}>
        {/* Background arc */}
        <path
          d={`M 10 90 A ${radius} ${radius} 0 0 1 170 90`}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M 10 90 A ${radius} ${radius} 0 0 1 170 90`}
          fill="none"
          stroke="#2563EB"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        {/* Ticks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = (tick / 100) * Math.PI - Math.PI
          const x1 = 90 + (radius - stroke) * Math.cos(angle)
          const y1 = 90 + (radius - stroke) * Math.sin(angle)
          const x2 = 90 + (radius - stroke + 6) * Math.cos(angle)
          const y2 = 90 + (radius - stroke + 6) * Math.sin(angle)
          return (
            <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D1D5DB" strokeWidth={1.5} />
          )
        })}
        {/* Center text */}
        <text x="90" y="82" textAnchor="middle" className="font-bold" fontSize="26" fill="#111827" fontWeight="700">
          {value}%
        </text>
        <text x="90" y="96" textAnchor="middle" fontSize="9" fill="#6B7280">
          Accuracy
        </text>
      </svg>
      {/* Tick labels */}
      <div className="flex justify-between w-44 -mt-1 px-1">
        <span className="text-[9px] text-gray-400">0%</span>
        <span className="text-[9px] text-gray-400">50%</span>
        <span className="text-[9px] text-gray-400">100%</span>
      </div>
    </div>
  )
}

/* ── Summary stats row ────────────────────────────────── */

const summaryStats = [
  {
    label: "Visits Documented",
    value: "142",
    sub: "This month",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    trend: <StatBadge value="+12%" direction="up" label="vs last month" />,
  },
  {
    label: "Avg. Doc Time",
    value: "14.7 min",
    sub: "Per encounter",
    icon: Clock,
    iconColor: "text-[#2563EB]",
    iconBg: "bg-blue-50",
    trend: <StatBadge value="-3.2 min" direction="down" label="vs last month" />,
  },
  {
    label: "Denial Rate",
    value: "3.1%",
    sub: "This month",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    trend: <StatBadge value="-1.1%" direction="down" label="vs last month" />,
  },
  {
    label: "Coding Accuracy",
    value: "97%",
    sub: "7-day avg",
    icon: TrendingUp,
    iconColor: "text-[#2563EB]",
    iconBg: "bg-blue-50",
    trend: <StatBadge value="+5%" direction="up" label="vs last week" />,
  },
]

/* ── Main component ───────────────────────────────────── */

export default function Analytics() {
  const latestAccuracy = codingAccuracyData[codingAccuracyData.length - 1].accuracy

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Analytics Dashboard</h1>
        <p className="text-sm text-[#6B7280] mt-0.5">Performance metrics &mdash; April 2026</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.iconColor}`} size={18} />
              </div>
              {stat.trend}
            </div>
            <p className="text-2xl font-bold text-[#111827] leading-none">{stat.value}</p>
            <p className="text-xs font-medium text-[#6B7280] mt-1">{stat.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart 1: Coding Accuracy */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">Coding Accuracy</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Last 7 days</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +10%
            </span>
          </div>

          {/* Gauge */}
          <AccuracyGauge value={latestAccuracy} />

          {/* Sparkline below gauge */}
          <div className="mt-3 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={codingAccuracyData}>
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#2563EB", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
                <Tooltip
                  content={<ChartTooltip unit="%" color="#2563EB" />}
                  cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-1">
            {codingAccuracyData.map(d => (
              <span key={d.day} className="text-[9px] text-gray-400">{d.day.split(" ")[1]}</span>
            ))}
          </div>
        </div>

        {/* Chart 2: Avg Documentation Time */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">Avg. Documentation Time</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Minutes per encounter &mdash; this week</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <TrendingDown className="w-3 h-3" />
              &minus;18%
            </span>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={docTimeData} barSize={22}>
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 30]}
                  tickFormatter={(v) => `${v}m`}
                />
                <ReferenceLine y={15} stroke="#E5E7EB" strokeDasharray="4 2" />
                <Tooltip
                  content={<ChartTooltip unit=" min" color="#2563EB" />}
                  cursor={{ fill: "#F3F4F6" }}
                />
                <Bar dataKey="minutes" fill="#2563EB" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-6 border-t border-dashed border-gray-300" />
            <span className="text-[10px] text-gray-400">15 min target</span>
          </div>
        </div>

        {/* Chart 3: Denial Rate */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">Denial Rate Trend</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Last 6 months</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <TrendingDown className="w-3 h-3" />
              &minus;63%
            </span>
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={denialRateData}>
                <defs>
                  <linearGradient id="denialGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 12]}
                  tickFormatter={(v) => `${v}%`}
                />
                <ReferenceLine y={5} stroke="#F59E0B" strokeDasharray="4 2" />
                <Tooltip
                  content={<ChartTooltip unit="%" color="#DC2626" />}
                  cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#DC2626"
                  strokeWidth={2}
                  fill="url(#denialGradient)"
                  dot={{ r: 4, fill: "#DC2626", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-6 border-t border-dashed border-amber-400" />
            <span className="text-[10px] text-gray-400">5% target threshold</span>
          </div>
        </div>
      </div>
    </div>
  )
}
