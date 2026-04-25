"use client"

import { useState } from "react"
import {
  FolderOpen,
  GitCompare,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react"

interface HistoryVisit {
  id: number
  date: string
  diagnosis: string
  icdCodes: string[]
  status: "completed" | "requires verification" | "in progress"
  provider: string
  note: string
}

type StatusType = "completed" | "requires verification" | "in progress"

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-green-100 text-green-700" },
  "requires verification": { label: "Requires Verification", className: "bg-amber-100 text-amber-700" },
  "in progress": { label: "In Progress", className: "bg-blue-100 text-[#2563EB]" },
}

const visits: HistoryVisit[] = [
  {
    id: 1,
    date: "Apr 10, 2026",
    diagnosis: "Hypertension, Type 2 Diabetes Mellitus",
    icdCodes: ["I10", "E11.9"],
    status: "completed",
    provider: "Dr. A. Rivera",
    note: `CHIEF COMPLAINT: Follow-up for hypertension and diabetes management.\n\nSUBJECTIVE: Patient reports blood pressure has been well-controlled at home. Blood glucose readings averaging 130-145 mg/dL. Denies chest pain, shortness of breath, or lower extremity edema. Adherent to metformin and lisinopril. Diet improving with reduced sodium intake.\n\nOBJECTIVE: BP 134/82 mmHg, HR 72 bpm, Wt 198 lbs. BG 138 mg/dL. HbA1c 7.2%. Lungs clear. No peripheral edema. Fundoscopic exam unremarkable.\n\nASSESSMENT: 1. Hypertension — well-controlled on current regimen. 2. T2DM — moderate control, HbA1c improving.\n\nPLAN: Continue lisinopril 10mg daily. Continue metformin 1000mg BID. Recheck HbA1c in 3 months. Dietary consult referral placed. Follow-up in 3 months.`,
  },
  {
    id: 2,
    date: "Mar 18, 2026",
    diagnosis: "Acute Sinusitis, Allergic Rhinitis",
    icdCodes: ["J01.90", "J30.1"],
    status: "completed",
    provider: "Dr. A. Rivera",
    note: `CHIEF COMPLAINT: 7-day history of facial pressure, nasal congestion, and yellow discharge.\n\nSUBJECTIVE: Patient presents with worsening sinus pressure around the left maxillary area. Greenish nasal discharge for 4 days. Low-grade fever of 99.4°F yesterday. No improvement with OTC decongestants. History of seasonal allergies.\n\nOBJECTIVE: Temp 98.8°F, BP 122/78 mmHg. Tenderness over left maxillary sinus on palpation. Nasal mucosa erythematous and edematous. Throat mildly erythematous. Tympanic membranes clear bilaterally.\n\nASSESSMENT: 1. Acute bacterial sinusitis, left maxillary. 2. Allergic rhinitis, seasonal.\n\nPLAN: Amoxicillin 875mg BID x 10 days. Saline nasal irrigation BID. Continue loratadine 10mg daily. Nasal steroid spray added. Return if no improvement in 5 days or worsening symptoms.`,
  },
  {
    id: 3,
    date: "Feb 24, 2026",
    diagnosis: "Lower Back Pain, Obesity",
    icdCodes: ["M54.5", "E66.01"],
    status: "requires verification",
    provider: "Dr. A. Rivera",
    note: `CHIEF COMPLAINT: Persistent lower back pain for 3 weeks.\n\nSUBJECTIVE: Patient reports onset of lower back pain after lifting at work 3 weeks ago. Radiates to left buttock but does not go below the knee. Pain rated 5-6/10 at rest, 8/10 with activity. No bowel or bladder changes. No saddle anesthesia. Ibuprofen provides partial relief.\n\nOBJECTIVE: BP 138/86 mmHg, Wt 232 lbs, BMI 34.1. Lumbar ROM restricted in flexion and left lateral bend. Positive SLR on left at 60 degrees. Negative FABER. Muscle spasm present L3-L5 paraspinals bilaterally.\n\nASSESSMENT: 1. Mechanical lower back pain with possible L4-L5 disc involvement. 2. Obesity, class I.\n\nPLAN: Lumbar MRI ordered. Physical therapy referral placed. Cyclobenzaprine 5mg TID PRN. Continue ibuprofen with food. Weight management counseling. Follow-up after MRI results.`,
  },
  {
    id: 4,
    date: "Jan 30, 2026",
    diagnosis: "Annual Wellness Exam",
    icdCodes: ["Z00.01"],
    status: "completed",
    provider: "Dr. A. Rivera",
    note: `CHIEF COMPLAINT: Annual preventive wellness examination.\n\nSUBJECTIVE: Patient presents for routine annual exam. No acute complaints. Reports feeling generally well. Exercises 2-3x per week. Non-smoker. Social drinker (3-4 drinks per week). Family history of coronary artery disease (father, age 62). Up to date on most vaccinations.\n\nOBJECTIVE: BP 118/74 mmHg, HR 68 bpm, Temp 98.6°F, Wt 195 lbs, BMI 28.1. General: well-appearing, no acute distress. HEENT: normal. CV: RRR, no murmurs. Resp: clear bilaterally. Abdomen: soft, NT. Neuro: intact.\n\nASSESSMENT: Healthy adult, annual wellness exam. Cardiovascular risk assessment performed. BMI in overweight range.\n\nPLAN: Labs ordered: CMP, CBC, lipid panel, TSH, HbA1c. Colonoscopy referral (age 45). Influenza vaccine administered. Discussed diet and exercise. Follow-up with lab results.`,
  },
  {
    id: 5,
    date: "Dec 12, 2025",
    diagnosis: "Migraine without Aura",
    icdCodes: ["G43.009"],
    status: "in progress",
    provider: "Dr. A. Rivera",
    note: `CHIEF COMPLAINT: Recurring migraines, 3-4 per month.\n\nSUBJECTIVE: Patient reports migraines occurring 3-4 times monthly for the past 6 months. Throbbing, unilateral headache, left-sided. Associated nausea and photophobia. No visual aura. Episodes last 6-18 hours. Triggered by stress and poor sleep. Ibuprofen only partially effective.\n\nOBJECTIVE: BP 126/80 mmHg. Neurological exam normal. No papilledema. No meningeal signs. Cranial nerves II-XII intact. No focal deficits.\n\nASSESSMENT: Migraine without aura, episodic, moderate-to-severe. Frequency meets criteria for prophylaxis consideration.\n\nPLAN: Sumatriptan 100mg PRN for acute attacks. Topiramate 25mg daily initiated for prophylaxis (titrating to 50mg over 4 weeks). Headache diary to be kept. Sleep hygiene counseling. Avoid known triggers. Follow-up in 6 weeks to assess prophylaxis tolerance.`,
  },
  {
    id: 6,
    date: "Nov 5, 2025",
    diagnosis: "URI, Pharyngitis",
    icdCodes: ["J06.9", "J02.9"],
    status: "completed",
    provider: "Dr. A. Rivera",
    note: `CHIEF COMPLAINT: Sore throat and cold symptoms x 4 days.\n\nSUBJECTIVE: Patient presents with sore throat, congestion, and mild cough for 4 days. Low-grade fever of 99.8°F on day 2 (resolved). No ear pain. No difficulty swallowing solids. No rash. No sick contacts at home.\n\nOBJECTIVE: Temp 98.4°F. Throat: erythematous, no exudate, no tonsillar enlargement. Anterior cervical nodes mildly tender. Ears: clear. Lungs: clear to auscultation. Rapid strep: negative.\n\nASSESSMENT: 1. Acute viral URI. 2. Viral pharyngitis. Strep negative.\n\nPLAN: Supportive care. Honey-lemon tea, throat lozenges, saline gargles. Acetaminophen PRN for discomfort. Encourage hydration and rest. Return if fever returns, difficulty swallowing, or symptoms worsen beyond 10 days.`,
  },
]

const currentVisit = visits[0]

interface CompareModalProps {
  visit: HistoryVisit
  onClose: () => void
}

function CompareView({ visit, onClose }: CompareModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <GitCompare className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">Visit Comparison</h2>
              <p className="text-xs text-[#6B7280]">{visit.date} &mdash; {visit.diagnosis}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Close Comparison
          </button>
        </div>

        {/* Split panels */}
        <div className="flex flex-1 overflow-hidden divide-x divide-gray-100">
          {/* Left: selected visit (read-only) */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Last Visit</p>
                <p className="text-sm font-semibold text-[#111827] mt-0.5">{visit.date} &mdash; {visit.diagnosis}</p>
              </div>
              <div className="flex gap-1.5">
                {visit.icdCodes.map(code => (
                  <span key={code} className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-500 rounded-full">{code}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <pre className="text-xs text-[#374151] leading-relaxed whitespace-pre-wrap font-sans">{visit.note}</pre>
            </div>
          </div>

          {/* Right: current visit */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-5 py-3 bg-blue-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-wide">Current Visit</p>
                <p className="text-sm font-semibold text-[#111827] mt-0.5">{currentVisit.date} &mdash; {currentVisit.diagnosis}</p>
              </div>
              <div className="flex gap-1.5">
                {currentVisit.icdCodes.map(code => (
                  <span key={code} className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-[#2563EB] rounded-full">{code}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <pre className="text-xs text-[#374151] leading-relaxed whitespace-pre-wrap font-sans">{currentVisit.note}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface HistoryProps {
  onNavigate: (view: string) => void
}

export default function History({ onNavigate }: HistoryProps) {
  const [compareVisit, setCompareVisit] = useState<HistoryVisit | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 5

  const filtered = visits.filter(v =>
    v.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
    v.date.toLowerCase().includes(search.toLowerCase()) ||
    v.icdCodes.some(c => c.toLowerCase().includes(search.toLowerCase()))
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      {compareVisit && (
        <CompareView visit={compareVisit} onClose={() => setCompareVisit(null)} />
      )}

      <div className="space-y-5">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Patient History</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Sarah Johnson &mdash; {visits.length} recorded visits</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export Records
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by diagnosis, date, or code..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white text-[#111827] placeholder:text-gray-400"
          />
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Diagnosis</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">ICD Codes</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-[#6B7280]">No records match your search.</td>
                </tr>
              )}
              {paginated.map(visit => {
                const status = statusConfig[visit.status]
                return (
                  <tr key={visit.id} className="hover:bg-[#F7F9FC] transition-colors group">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-[#111827]">{visit.date}</span>
                      <p className="text-xs text-[#6B7280] mt-0.5">{visit.provider}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[#111827]">{visit.diagnosis}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {visit.icdCodes.map(code => (
                          <span
                            key={code}
                            className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-600 rounded-full"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onNavigate("documentation")}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#2563EB] border border-[#2563EB] rounded-lg hover:bg-blue-50 transition-all"
                        >
                          <FolderOpen className="w-3 h-3" />
                          Open Visit
                        </button>
                        <button
                          onClick={() => setCompareVisit(visit)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                        >
                          <GitCompare className="w-3 h-3" />
                          Compare
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination footer */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-[#6B7280]">
                Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} records
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-7 h-7 text-xs font-medium rounded-lg transition-colors ${
                      page === i + 1 ? "bg-[#2563EB] text-white" : "text-[#6B7280] hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
