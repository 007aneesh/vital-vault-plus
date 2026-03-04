interface PatientProfileConfig {
  name: string
  gender: string
  location: string
  occupation: string
  dob: string
  bmi: number
  bmi_change: string
  weight: number
  weight_change: string
  height: number
  blood_pressure: string
  bp_change: string
  habits: string[]
}

interface TimelineEntry {
  date: string
  label: string
}

interface MedicalHistoryConfig {
  chronic_diseases: string[]
  diabetes_emergencies: string[]
  surgeries: string[]
  family_diseases: string[]
  diabetes_complications: string[]
}

interface Medication {
  name: string
  start_date: string
  assigned_by: string
  note: string
  date: string
}

interface Prescription {
  id: string
  prescribed_by: string
  prescription_date: string
  notes?: string
  visit_id: string
  medications?: MedicationRecord[]
  created_at?: string
  updated_at?: string
}

interface MedicationRecord {
  id?: string
  name: string
  dose: string
  frequency?: string
  duration?: string
  notes?: string
  prescription_id?: string
  created_at?: string
  updated_at?: string
}

interface VisitHistory {
  id: string
  visit_date: string
  reason_for_visit?: string
  doctor_name?: string
  department?: string
  hospital_name?: string
  notes?: string
  patient_id: string
  prescriptions?: Prescription[]
}

interface TranscriptionResponse {
  transcript: {
    text: string
    confidence: number
    duration: number
    wordCount: number
  }
  medications: Array<{
    name: string
    dose: string
    frequency: string
    duration: string
    notes: string
  }>
}

/** Response from POST /audio/parse-transcript (transcript done on frontend) */
interface ParseTranscriptResponse {
  transcript: string
  medications: Array<{
    name: string
    dose: string
    frequency: string
    duration: string
    notes: string
  }>
}

export type {
  PatientProfileConfig,
  TimelineEntry,
  MedicalHistoryConfig,
  Medication,
  Prescription,
  MedicationRecord,
  VisitHistory,
  TranscriptionResponse,
  ParseTranscriptResponse,
}