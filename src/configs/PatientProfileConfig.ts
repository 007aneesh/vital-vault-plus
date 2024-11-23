import { MedicalHistoryConfig, Medication, PatientProfileConfig, TimelineEntry } from "@/@types/patient_types"


export const patient_profile_config: PatientProfileConfig = {
  name: 'Demo Doe',
  gender: 'Male',
  location: 'Elshiekh Zayed, Giza',
  occupation: 'Accountant',
  dob: '12 Dec 1992',
  bmi: 22.4,
  bmi_change: '+10',
  weight: 92,
  weight_change: '+10kg',
  height: 175,
  blood_pressure: '124/80',
  bp_change: '+10',
  habits: ['Alcohol', 'Smoker', 'BOOM', 'KAi'],
}

export const timeline_config: TimelineEntry[] = [
  { date: 'Dec 2022', label: 'Pre-diabetic', a1c: '10.4' },
  { date: 'Jan 2022', label: 'Type 2', a1c: '10.4' },
  { date: 'Jul 2021', label: 'Chronic thyroid disorder', a1c: '10.4' },
  { date: 'Jul 2021', label: 'Angina Pectoris', a1c: '10.4' },
  { date: 'Jul 2021', label: 'Stroke', a1c: '10.4' },
]

export const medical_history_config: MedicalHistoryConfig = {
  chronic_diseases: ['IHD', 'Obesity', 'Chronic thyroid disorder'],
  diabetes_emergencies: ['Diabetic Ketoacidosis'],
  surgeries: ['Liposuction'],
  family_diseases: ['Obesity (Father)'],
  diabetes_complications: [
    'Nephropathy',
    'Neuropathy',
    'Retinopathy',
    'Diabetic foot',
    'Sexual dysfunction',
  ],
}

export const medications_config: Medication[] = [
  {
    name: 'ACTRAPID ® HM 1',
    status: 'Adherent',
    sig: '--',
    start_date: '--',
    assigned_by: 'Patient',
    note: '--',
  },
  {
    name: 'Amaryl 1 mg',
    status: 'Adherent',
    sig: '--',
    start_date: '--',
    assigned_by: 'Patient',
    note: '--',
  },
]
