"use client"

import { useState, useEffect, useRef } from "react"
import {
  Mic, MicOff, Square, StickyNote, Tag, PauseCircle, PlayCircle,
  ChevronDown, X, Check, AlertCircle, User, Calendar, Stethoscope,
} from "lucide-react"

interface ActiveVisitProps {
  onNavigate: (view: string) => void
}

const TRANSCRIPTION_LINES = [
  { text: "Patient presents with ", highlight: null },
  { text: "chest pain", highlight: "symptom" },
  { text: " that started approximately ", highlight: null },
  { text: "3 days ago", highlight: "symptom" },
  { text: ". The pain is described as pressure-like, radiating to the left arm. Patient reports pain is ", highlight: null },
  { text: "worse at night", highlight: "symptom" },
  { text: " and during physical activity. Currently taking ", highlight: null },
  { text: "aspirin 81mg", highlight: "medicine" },
  { text: " daily and ", highlight: null },
  { text: "metoprolol 25mg", highlight: "medicine" },
  { text: " twice daily. Denies fever, cough, or shortness of breath at rest. Blood pressure today is 148/92 mmHg. Oxygen saturation 97% on room air.", highlight: null },
]

const SYMPTOMS = ["Chest pain", "Headache", "Fatigue", "Shortness of breath", "Nausea", "Dizziness"]
const SUGGESTION_CHIPS = ["chest pain", "3 days", "worse at night", "radiating to arm", "on exertion", "at rest"]

export default function ActiveVisit({ onNavigate }: ActiveVisitProps) {
  const [visitType, setVisitType] = useState<"live" | "record">("live")
  const [recording, setRecording] = useState(false)
  const [paused, setPaused] = useState(false)
  const [transcriptionPaused, setTranscriptionPaused] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [symptomOpen, setSymptomOpen] = useState(false)
  const [addedSymptoms, setAddedSymptoms] = useState<string[]>([])
  const [quickNote, setQuickNote] = useState("")
  const [transcriptionText, setTranscriptionText] = useState("")
  const [recordingTime, setRecordingTime] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(t => t + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [recording, paused])

  useEffect(() => {
    if (recording && !transcriptionPaused) {
      const full = TRANSCRIPTION_LINES.map(l => l.text).join("")
      let i = transcriptionText.length
      if (i >= full.length) return
      const interval = setInterval(() => {
        i++
        setTranscriptionText(full.slice(0, i))
        if (i >= full.length) clearInterval(interval)
      }, 30)
      return () => clearInterval(interval)
    }
  }, [recording, transcriptionPaused])

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  const handleMarkSymptom = (symptom: string) => {
    if (!addedSymptoms.includes(symptom)) {
      setAddedSymptoms(prev => [...prev, symptom])
    }
    setSymptomOpen(false)
    console.log("Marked symptom:", symptom)
  }

  const handleSaveNote = () => {
    console.log("Note saved:", noteText)
    setNoteOpen(false)
    setNoteText("")
  }

  const highlightTranscription = (text: string) => {
    const symptomWords = ["chest pain", "3 days ago", "worse at night", "shortness of breath", "fever", "cough"]
    const medicineWords = ["aspirin 81mg", "metoprolol 25mg"]
    let result = text
    const parts: { text: string; type: "plain" | "symptom" | "medicine" }[] = []
    let remaining = text

    while (remaining.length > 0) {
      let found = false
      for (const word of symptomWords) {
        if (remaining.toLowerCase().startsWith(word.toLowerCase())) {
          parts.push({ text: remaining.slice(0, word.length), type: "symptom" })
          remaining = remaining.slice(word.length)
          found = true
          break
        }
      }
      if (!found) {
        for (const word of medicineWords) {
          if (remaining.toLowerCase().startsWith(word.toLowerCase())) {
            parts.push({ text: remaining.slice(0, word.length), type: "medicine" })
            remaining = remaining.slice(word.length)
            found = true
            break
          }
        }
      }
      if (!found) {
        if (parts.length === 0 || parts[parts.length - 1].type !== "plain") {
          parts.push({ text: remaining[0], type: "plain" })
        } else {
          parts[parts.length - 1].text += remaining[0]
        }
        remaining = remaining.slice(1)
      }
    }

    return parts
  }

  const transcriptionParts = highlightTranscription(transcriptionText)

  return (
    <div className="space-y-4">
      {/* Patient Header Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-[#2563EB]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#111827]">Sarah Johnson</h2>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-[#2563EB] rounded-full font-medium">Active</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Age 48 &bull; DOB 03/14/1978
                </span>
                <span className="flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Dr. Reynolds
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Hypertension", "Type 2 Diabetes", "Hyperlipidemia"].map(dx => (
                  <span key={dx} className="text-xs px-2 py-0.5 bg-gray-100 text-[#6B7280] rounded-full">{dx}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Visit Type Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#6B7280]">Visit Type:</span>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setVisitType("live")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  visitType === "live" ? "bg-white text-[#2563EB] shadow-sm" : "text-[#6B7280]"
                }`}
              >
                Live Visit
              </button>
              <button
                onClick={() => setVisitType("record")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  visitType === "record" ? "bg-white text-[#2563EB] shadow-sm" : "text-[#6B7280]"
                }`}
              >
                Treatment Record
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls + Quick Notes Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Control Unit */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">Recording Controls</h3>
          <div className="flex flex-wrap gap-2">
            {!recording ? (
              <button
                onClick={() => { setRecording(true); setPaused(false) }}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#16A34A] text-white text-sm font-medium rounded-lg hover:bg-green-700 hover:shadow-sm transition-all"
              >
                <Mic className="w-4 h-4" />
                Start Recording
              </button>
            ) : (
              <>
                <button
                  onClick={() => setPaused(!paused)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 hover:shadow-sm transition-all"
                >
                  {paused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                  {paused ? "Resume" : "Pause"}
                </button>
                <button
                  onClick={() => { setRecording(false); setPaused(false) }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#DC2626] text-white text-sm font-medium rounded-lg hover:bg-red-700 hover:shadow-sm transition-all"
                >
                  <Square className="w-4 h-4" />
                  Stop
                </button>
              </>
            )}
            <button
              onClick={() => setNoteOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-[#6B7280] text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <StickyNote className="w-4 h-4" />
              Add Note
            </button>
            <div className="relative">
              <button
                onClick={() => setSymptomOpen(!symptomOpen)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-[#6B7280] text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <Tag className="w-4 h-4" />
                Mark Symptom
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {symptomOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1.5 min-w-44">
                  {SYMPTOMS.map(s => (
                    <button
                      key={s}
                      onClick={() => handleMarkSymptom(s)}
                      className="w-full text-left px-4 py-2 text-sm text-[#111827] hover:bg-[#F7F9FC] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recording Status */}
          {recording && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${paused ? "bg-amber-400" : "bg-red-500 animate-pulse"}`} />
              <span className={`font-mono font-semibold ${paused ? "text-amber-600" : "text-[#DC2626]"}`}>
                {paused ? "PAUSED" : "REC"} {formatTime(recordingTime)}
              </span>
            </div>
          )}

          {/* Marked Symptoms */}
          {addedSymptoms.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {addedSymptoms.map(s => (
                <span key={s} className="flex items-center gap-1 text-xs px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-medium">
                  <Tag className="w-3 h-3" />
                  {s}
                  <button onClick={() => setAddedSymptoms(prev => prev.filter(x => x !== s))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Notes */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">Quick Notes</h3>
          <input
            type="text"
            value={quickNote}
            onChange={e => setQuickNote(e.target.value)}
            placeholder="Type a quick note or click a suggestion..."
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] text-[#111827] placeholder-gray-400"
          />
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {SUGGESTION_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => setQuickNote(prev => prev ? `${prev}, ${chip}` : chip)}
                className="text-xs px-2.5 py-1 bg-[#F7F9FC] border border-gray-200 rounded-full text-[#6B7280] hover:bg-blue-50 hover:border-blue-200 hover:text-[#2563EB] transition-colors font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
          {quickNote && (
            <button
              onClick={() => { console.log("Quick note saved:", quickNote); setQuickNote("") }}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Save Note
            </button>
          )}
        </div>
      </div>

      {/* Live Transcription */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#111827]">Live Transcription</h3>
            {recording && (
              <span className="text-xs px-2 py-0.5 bg-red-50 text-[#DC2626] border border-red-200 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#DC2626] rounded-full animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">
              <span className="text-amber-500 font-medium">Yellow</span> = Symptoms &nbsp;
              <span className="text-[#2563EB] font-medium">Blue</span> = Medications
            </span>
            <button
              onClick={() => setTranscriptionPaused(!transcriptionPaused)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-[#6B7280] hover:bg-gray-50 transition-colors"
            >
              {transcriptionPaused ? <PlayCircle className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
              {transcriptionPaused ? "Resume display" : "Pause display"}
            </button>
          </div>
        </div>
        <div className="min-h-28 bg-[#F7F9FC] border border-gray-100 rounded-xl p-4 text-sm leading-relaxed text-[#111827] font-mono">
          {transcriptionText.length === 0 ? (
            <span className="text-gray-400 italic">
              {recording ? "Listening..." : "Start recording to see live transcription here..."}
            </span>
          ) : (
            <>
              {transcriptionParts.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.type === "symptom"
                      ? "bg-amber-100 text-amber-800 px-0.5 rounded"
                      : part.type === "medicine"
                      ? "bg-blue-100 text-[#2563EB] px-0.5 rounded"
                      : ""
                  }
                >
                  {part.text}
                </span>
              ))}
              <span className="animate-pulse">|</span>
            </>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-end">
        <button
          onClick={() => onNavigate("documentation")}
          className="flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-blue-700 hover:shadow-md transition-all"
        >
          <AlertCircle className="w-4 h-4" />
          End the Reception
        </button>
      </div>

      {/* Add Note Modal */}
      {noteOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-semibold text-[#111827]">Add Clinical Note</h3>
              </div>
              <button onClick={() => setNoteOpen(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="p-5">
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Enter your clinical note here..."
                rows={5}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] text-[#111827] placeholder-gray-400 resize-none"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setNoteOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-lg text-[#6B7280] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="flex-1 px-4 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
