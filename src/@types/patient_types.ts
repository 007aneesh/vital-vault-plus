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
  a1c: string
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
  status: string
  sig: string
  start_date: string
  assigned_by: string
  note: string
}

export type {
  PatientProfileConfig,
  TimelineEntry,
  MedicalHistoryConfig,
  Medication,
}