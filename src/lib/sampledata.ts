export const patient = {
  patient_id: 'PAT12345678',
  aadhar_card: '1234-5678-9123',
  personal_info: {
    first_name: 'John',
    last_name: 'Doe',
    date_of_birth: '1990-01-15',
    age: 34,
    gender: 'male',
    blood_group: 'O+',
    weight: 72.5,
    height: 175,
    contact_number: '+91-9876543210',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      postal_code: '400001',
      country: 'India',
    },
    emergency_contact: {
      name: 'Jane Doe',
      relationship: 'spouse',
      contact_number: '+91-9876543211',
    },
  },
  medical_history: {
    allergies: ['peanuts', 'penicillin'],
    chronic_diseases: ['hypertension', 'diabetes'],
    past_surgeries: [
      {
        surgery_name: 'appendectomy',
        surgery_date: '2015-06-12',
        hospital_name: 'Global Health Hospital, Delhi',
      },
    ],
    vaccination_records: [
      {
        vaccine_name: 'COVID-19 Vaccine',
        doses_received: 2,
        last_dose_date: '2021-08-20',
      },
    ],
    family_history: {
      diabetes: true,
      hypertension: true,
      heart_disease: false,
    },
  },
  visit_history: [
    {
      visit_id: 'VIS20231124001',
      visit_date: '2023-11-24',
      reason_for_visit: 'Chest pain',
      doctor_name: 'Dr. Arjun Singh',
      department: 'cardiology',
      hospital_name: 'Apollo Hospitals, Bangalore',
      notes:
        'Patient reports mild chest discomfort; ordered ECG and blood tests',
      prescriptions: [
        {
          prescription_id: 'PRSC20231124001',
          prescribed_by: 'Dr. Arjun Singh',
          prescription_date: '2023-11-24',
          notes: 'To control blood pressure and sugar levels',
          medications: [
            {
              medication_id: 'MED001',
              name: 'Amlodipine',
              dose: '5mg',
              frequency: 'Once daily',
              duration: '30 days',
              notes: 'Take in the morning',
            },
            {
              medication_id: 'MED002',
              name: 'Metformin',
              dose: '500mg',
              frequency: 'Twice daily',
              duration: '30 days',
              notes: 'Take after meals',
            },
            {
              medication_id: 'MED003',
              name: 'Atorvastatin',
              dose: '10mg',
              frequency: 'Once daily',
              duration: '30 days',
              notes: 'Take before bedtime',
            },
          ],
        },
      ],
    },
    {
      visit_id: 'VIS20231015001',
      visit_date: '2023-10-15',
      reason_for_visit: 'Routine check-up',
      doctor_name: 'Dr. Priya Sharma',
      department: 'general medicine',
      hospital_name: 'Fortis Healthcare, Gurgaon',
      notes: 'No major health concerns; advised annual flu vaccine',
    },
  ],
  insurance_details: {
    policy_number: 'POL456789',
    provider: 'Star Health Insurance',
    valid_till: '2025-03-31',
    coverage_amount: 500000,
  },
  documents: [
    {
      document_id: 'DOC001',
      name: 'MRI Scan Report',
      uploaded_on: '2023-09-15',
      uploaded_by: 'hospital_staff',
      url: 'https://example.com/documents/mri-scan-report.pdf',
    },
    {
      document_id: 'DOC002',
      name: 'Blood Test Report',
      uploaded_on: '2023-11-24',
      uploaded_by: 'hospital_staff',
      url: 'https://example.com/documents/blood-test-report.pdf',
    },
  ],
  appointments: [
    {
      appointment_id: 'APT20231201001',
      appointment_date: '2023-12-01',
      appointment_time: '10:30 AM',
      doctor_name: 'Dr. Arjun Singh',
      department: 'cardiology',
      notes: 'Follow-up on hypertension',
    },
  ],
  metadata: {
    created_at: '2023-01-01T10:00:00Z',
    updated_at: '2023-11-20T15:30:00Z',
    created_by: 'admin',
    updated_by: 'hospital_staff',
  },
}
