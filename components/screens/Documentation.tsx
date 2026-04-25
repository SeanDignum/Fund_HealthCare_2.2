"use client"

import { useState } from "react"
import {
  Pencil, RefreshCw, Check, AlertTriangle, Scale, ChevronDown,
  Plus, X, Info, ArrowRight, Send, FileText, ShieldCheck, CheckCircle2,
} from "lucide-react"

interface DocumentationProps {
  onNavigate: (view: string) => void
}

const initialNote = {
  chiefComplaint: "Patient presents with chest pain for 3 days, pressure-like, radiating to left arm, worse at night and on exertion.",
  history: "48-year-old female with history of hypertension, type 2 diabetes mellitus, and hyperlipidemia. Currently on aspirin 81mg and metoprolol 25mg BID. No known allergies. Non-smoker. Denies ETOH use.",
  assessment: "1. Chest pain – likely anginal, rule out ACS. 2. Hypertension – suboptimally controlled (BP 148/92). 3. Type 2 DM – chronic management ongoing.",
  plan: "1. Obtain 12-lead EKG and troponin levels. 2. Refer to cardiology for stress test. 3. Adjust antihypertensive regimen. 4. Continue current diabetes management. 5. Patient education on cardiac risk factors. Return in 1 week.",
}

const warnings = [
  { id: 1, text: "Missing duration of symptoms for all diagnoses", severity: "warning", dismissed: false },
  { id: 2, text: "Weak diagnosis justification – ACS not ruled out with documented evidence", severity: "warning", dismissed: false },
  { id: 3, text: "Medication dosage not confirmed for metoprolol", severity: "info", dismissed: false },
]

const legalAlerts = [
  { id: 1, text: "Potential compliance risk: Referral order not documented in the note", type: "risk" },
  { id: 2, text: "Billing code complexity may not match documented complexity level", type: "risk" },
]

interface IcdCode {
  code: string
  description: string
  confidence: number
  risk: "low" | "medium" | "high"
  confirmed: boolean
}

const initialCodes: IcdCode[] = [
  { code: "R07.9", description: "Chest pain, unspecified", confidence: 92, risk: "medium", confirmed: false },
  { code: "I10", description: "Essential (primary) hypertension", confidence: 98, risk: "low", confirmed: false },
  { code: "E11.9", description: "Type 2 diabetes mellitus without complications", confidence: 95, risk: "low", confirmed: false },
  { code: "E78.5", description: "Hyperlipidemia, unspecified", confidence: 88, risk: "low", confirmed: false },
]

const cptInitial = [
  { code: "99214", description: "Office visit, moderate complexity", confidence: 87, risk: "medium" as const, confirmed: false },
  { code: "93000", description: "Electrocardiogram, routine (EKG)", confidence: 94, risk: "low" as const, confirmed: false },
]

const riskBadge: Record<string, string> = {
  low: "bg-green-100 text-[#16A34A]",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-[#DC2626]",
}

export default function Documentation({ onNavigate }: DocumentationProps) {
  const [note, setNote] = useState(initialNote)
  const [editing, setEditing] = useState<keyof typeof initialNote | null>(null)
  const [editBuffer, setEditBuffer] = useState("")
  const [warningList, setWarningList] = useState(warnings)
  const [legalAlertList, setLegalAlertList] = useState(legalAlerts)
  const [icdCodes, setIcdCodes] = useState<IcdCode[]>(initialCodes)
  const [cptCodes, setCptCodes] = useState(cptInitial)
  const [noteConfirmed, setNoteConfirmed] = useState(false)
  const [explainOpen, setExplainOpen] = useState<string | null>(null)
  const [replaceOpen, setReplaceOpen] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const activeWarnings = warningList.filter(w => !w.dismissed)

  const handleEdit = (section: keyof typeof initialNote) => {
    setEditing(section)
    setEditBuffer(note[section])
  }

  const handleSaveEdit = () => {
    if (!editing) return
    setNote(prev => ({ ...prev, [editing]: editBuffer }))
    setEditing(null)
  }

  const handleRegenerate = (section: keyof typeof initialNote) => {
    console.log("Regenerate section:", section)
    setNote(prev => ({ ...prev, [section]: prev[section] + " [AI-regenerated content appended]" }))
  }

  const confirmCode = (code: string, type: "icd" | "cpt") => {
    if (type === "icd") setIcdCodes(prev => prev.map(c => c.code === code ? { ...c, confirmed: !c.confirmed } : c))
    else setCptCodes(prev => prev.map(c => c.code === code ? { ...c, confirmed: !c.confirmed } : c))
  }

  const sectionLabels: Record<keyof typeof initialNote, string> = {
    chiefComplaint: "Chief Complaint",
    history: "History of Present Illness",
    assessment: "Assessment",
    plan: "Plan",
  }

  return (
    <div className="grid grid-cols-[1fr_380px] gap-5 items-start">
      {/* LEFT COLUMN */}
      <div className="space-y-4">
        {/* Medical Note Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2563EB]" />
              <h2 className="text-sm font-semibold text-[#111827]">Medical Note</h2>
              {noteConfirmed && (
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-green-100 text-[#16A34A] rounded-full font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  Confirmed
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setNoteConfirmed(!noteConfirmed)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  noteConfirmed
                    ? "bg-green-50 text-[#16A34A] border-green-200"
                    : "border-gray-200 text-[#6B7280] hover:bg-gray-50"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                {noteConfirmed ? "Confirmed" : "Confirm Note"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {(Object.keys(sectionLabels) as Array<keyof typeof initialNote>).map(section => (
              <div key={section} className="border border-gray-100 rounded-xl p-4 group">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{sectionLabels[section]}</h3>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(section)}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleRegenerate(section)}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-[#6B7280] hover:text-[#2563EB] hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Regenerate
                    </button>
                  </div>
                </div>
                {editing === section ? (
                  <div>
                    <textarea
                      value={editBuffer}
                      onChange={e => setEditBuffer(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 text-sm border border-[#2563EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 text-[#111827] resize-none"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-[#6B7280] hover:bg-gray-50">Cancel</button>
                      <button onClick={handleSaveEdit} className="px-3 py-1.5 text-xs bg-[#2563EB] text-white rounded-lg hover:bg-blue-700">Save</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#111827] leading-relaxed">{note[section]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Completeness Check */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-sm font-semibold text-[#111827]">Completeness Check</h2>
            {activeWarnings.length > 0 && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-semibold">{activeWarnings.length} issues</span>
            )}
          </div>
          {activeWarnings.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-[#16A34A] bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4" />
              All completeness checks passed.
            </div>
          ) : (
            <div className="space-y-2">
              {activeWarnings.map(w => (
                <div key={w.id} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${w.severity === "info" ? "bg-blue-50 border-blue-100" : "bg-amber-50 border-amber-100"}`}>
                  <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${w.severity === "info" ? "text-[#2563EB]" : "text-[#F59E0B]"}`} />
                  <p className="text-sm text-[#111827] flex-1 leading-relaxed">{w.text}</p>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => console.log("Add note for:", w.text)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded-lg text-[#6B7280] hover:bg-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setWarningList(prev => prev.map(x => x.id === w.id ? { ...x, dismissed: true } : x))}
                      className="text-xs px-2 py-1 border border-gray-200 rounded-lg text-[#6B7280] hover:bg-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legal Block */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-4 h-4 text-[#DC2626]" />
            <h2 className="text-sm font-semibold text-[#111827]">Legal & Compliance</h2>
          </div>
          <div className="space-y-2">
            {legalAlertList.map(a => (
              <div key={a.id} className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                <Scale className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <p className="text-sm text-[#111827] flex-1 leading-relaxed">{a.text}</p>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => console.log("View details:", a.text)}
                    className="text-xs px-2.5 py-1 border border-red-200 text-[#DC2626] rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => { setLegalAlertList(prev => prev.filter(x => x.id !== a.id)); console.log("Apply fix:", a.text) }}
                    className="text-xs px-2.5 py-1 bg-[#DC2626] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Fix
                  </button>
                </div>
              </div>
            ))}
            {legalAlertList.length === 0 && (
              <div className="flex items-center gap-2 text-sm text-[#16A34A] bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <ShieldCheck className="w-4 h-4" />
                No compliance issues detected.
              </div>
            )}
          </div>
        </div>

        {/* Continue Visit */}
        <div className="flex justify-start">
          <button
            onClick={() => onNavigate("visit")}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-sm font-medium text-[#6B7280] rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Continue Visit
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-4">
        {/* ICD Codes */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-[#111827]">ICD-10 Codes</h2>
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-[#6B7280] rounded-full">{icdCodes.length} codes</span>
          </div>
          <div className="space-y-2">
            {icdCodes.map(c => (
              <div key={c.code} className={`flex items-center gap-3 px-3 py-3 rounded-xl border transition-all ${c.confirmed ? "bg-green-50 border-green-200" : "bg-[#F7F9FC] border-gray-100 hover:border-gray-200"}`}>
                <button
                  onClick={() => confirmCode(c.code, "icd")}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    c.confirmed ? "bg-[#16A34A] border-[#16A34A]" : "border-gray-300 hover:border-[#2563EB]"
                  }`}
                  aria-label={c.confirmed ? "Unconfirm" : "Confirm"}
                >
                  {c.confirmed && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#2563EB] font-mono">{c.code}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${riskBadge[c.risk]}`}>
                      {c.risk} risk
                    </span>
                  </div>
                  <p className="text-xs text-[#111827] mt-0.5 leading-snug truncate">{c.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[10px] font-semibold text-[#16A34A]">{c.confidence}%</span>
                    <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#16A34A] rounded-full" style={{ width: `${c.confidence}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-0.5 ml-1">
                    <button
                      onClick={() => setExplainOpen(explainOpen === c.code ? null : c.code)}
                      className="p-1 rounded-md text-[#6B7280] hover:bg-gray-200 transition-colors"
                      title="Explain"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setReplaceOpen(replaceOpen === c.code ? null : c.code)}
                        className="p-1 rounded-md text-[#6B7280] hover:bg-gray-200 transition-colors"
                        title="Replace"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      {replaceOpen === c.code && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 min-w-48">
                          <p className="px-3 py-1.5 text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">Replace with</p>
                          {["R07.89 – Other chest pain", "I20.9 – Angina pectoris, unspecified", "R07.1 – Chest pain on breathing"].map(opt => (
                            <button
                              key={opt}
                              onClick={() => { console.log("Replace", c.code, "with:", opt); setReplaceOpen(null) }}
                              className="w-full text-left px-3 py-2 text-xs text-[#111827] hover:bg-[#F7F9FC] transition-colors font-mono"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {explainOpen === c.code && (
                  <div className="col-span-full w-full mt-2 text-xs text-[#6B7280] bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 leading-relaxed">
                    This code was selected based on documented symptoms and clinical presentation. Confidence score reflects pattern match against current documentation.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CPT Codes */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-[#111827]">CPT Codes</h2>
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-[#6B7280] rounded-full">{cptCodes.length} codes</span>
          </div>
          <div className="space-y-2">
            {cptCodes.map(c => (
              <div key={c.code} className={`flex items-center gap-3 px-3 py-3 rounded-xl border transition-all ${c.confirmed ? "bg-green-50 border-green-200" : "bg-[#F7F9FC] border-gray-100 hover:border-gray-200"}`}>
                <button
                  onClick={() => confirmCode(c.code, "cpt")}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    c.confirmed ? "bg-[#16A34A] border-[#16A34A]" : "border-gray-300 hover:border-[#2563EB]"
                  }`}
                >
                  {c.confirmed && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#2563EB] font-mono">{c.code}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${riskBadge[c.risk]}`}>
                      {c.risk} risk
                    </span>
                  </div>
                  <p className="text-xs text-[#111827] mt-0.5">{c.description}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-semibold text-[#16A34A]">{c.confidence}%</span>
                  <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#16A34A] rounded-full" style={{ width: `${c.confidence}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Zone */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h2 className="text-sm font-semibold text-[#111827]">Submit Documentation</h2>
          <div className="p-3 bg-[#F7F9FC] rounded-xl border border-gray-100 text-xs text-[#6B7280] leading-relaxed">
            <span className="font-medium text-[#111827]">{icdCodes.filter(c => c.confirmed).length} ICD</span> and{" "}
            <span className="font-medium text-[#111827]">{cptCodes.filter(c => c.confirmed).length} CPT</span> codes confirmed.{" "}
            {activeWarnings.length > 0
              ? <span className="text-amber-600 font-medium">{activeWarnings.length} warning(s) remaining.</span>
              : <span className="text-[#16A34A] font-medium">All checks passed.</span>}
          </div>
          {submitted ? (
            <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-[#16A34A] font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Documentation submitted successfully!
            </div>
          ) : (
            <>
              <button
                onClick={() => setSubmitted(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 hover:shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                Confirm &amp; Submit
              </button>
              <button
                onClick={() => console.log("Draft saved")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-[#6B7280] text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
