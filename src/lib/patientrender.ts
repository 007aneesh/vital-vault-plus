import { faker } from '@faker-js/faker'

export function get_patient_data() {
  const patientId = faker.string.uuid()
  const aadharCard = faker.number.int({
    min: 1000000000000,
    max: 9999999999999,
  })

  const personalInfo = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    date_of_birth: faker.date
      .birthdate({ min: 18, max: 90, mode: 'age' })
      .toISOString()
      .split('T')[0],
    age: faker.number.int({ min: 18, max: 90 }),
    gender: faker.helpers.arrayElement(['male', 'female', 'other']),
    blood_group: faker.helpers.arrayElement([
      'A+',
      'A-',
      'B+',
      'B-',
      'AB+',
      'AB-',
      'O+',
      'O-',
    ]),
    weight: faker.number.int({ min: 50, max: 100 }),
    height: faker.number.int({ min: 140, max: 200 }),
    contact: faker.number.int({ min: 1000000000, max: 9999999999 }),
    email: faker.internet.email(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postal_code: faker.location.zipCode(),
      country: faker.location.country(),
    },
    emergency_contact: {
      name: faker.person.fullName(),
      relationship: faker.helpers.arrayElement([
        'spouse',
        'parent',
        'sibling',
        'friend',
      ]),
      contact_number: faker.number.int({ min: 1000000000, max: 9999999999 }),
    },
    image: faker.string.alpha(30),
    occupation: faker.string.alpha(10),
    habits: [faker.helpers.arrayElement(['smoker', 'alcoholic'])],
  }

  const medicalHistory = {
    allergies: faker.helpers.arrayElements(
      ['peanuts', 'dust', 'penicillin', 'pollen'],
      faker.number.int({ min: 1, max: 3 }),
    ),
    chronic_diseases: faker.helpers.arrayElements(
      ['hypertension', 'diabetes', 'asthma'],
      faker.number.int({ min: 0, max: 2 }),
    ),
    past_surgeries: Array.from(
      { length: faker.number.int({ min: 0, max: 2 }) },
      () => ({
        surgery_name: faker.string.alpha(10),
        surgery_date: faker.date.past().toISOString().split('T')[0],
        hospital_name: faker.company.name(),
      }),
    ),
    vaccination_records: Array.from(
      { length: faker.number.int({ min: 0, max: 3 }) },
      () => ({
        vaccine_name: faker.string.alpha(10),
        doses_received: faker.number.int({ min: 1, max: 3 }),
        last_dose_date: faker.date.past().toISOString().split('T')[0],
      }),
    ),
    family_history: {
      diabetes: faker.datatype.boolean(),
      hypertension: faker.datatype.boolean(),
      heart_disease: faker.datatype.boolean(),
    },
  }

  const visitHistory = Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      visit_id: faker.string.uuid(),
      visit_date: faker.date.recent().toISOString().split('T')[0],
      reason_for_visit: faker.string.alpha(10),
      doctor_name: faker.person.fullName(),
      department: faker.helpers.arrayElement([
        'cardiology',
        'general medicine',
        'pediatrics',
        'orthopedics',
      ]),
      hospital_name: faker.company.name(),
      notes: faker.lorem.sentences(2),
      prescriptions: Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () => ({
          prescription_id: faker.string.uuid(),
          prescribed_by: faker.person.fullName(),
          prescription_date: faker.date.recent().toISOString().split('T')[0],
          notes: faker.lorem.sentences(1),
          medications: Array.from(
            { length: faker.number.int({ min: 1, max: 5 }) },
            () => ({
              medication_id: faker.string.uuid(),
              name: faker.commerce.productName(),
              dose: `${faker.number.int({ min: 5, max: 500 })}mg`,
              frequency: faker.helpers.arrayElement([
                'Once daily',
                'Twice daily',
                'Thrice daily',
              ]),
              duration: `${faker.number.int({ min: 7, max: 30 })} days`,
              notes: faker.lorem.sentence(),
            }),
          ),
        }),
      ),
    }),
  )

  const insuranceDetails = {
    policy_number: faker.string.uuid(),
    provider: faker.company.name(),
    valid_till: faker.date.future().toISOString().split('T')[0],
    coverage_amount: faker.number.int({ min: 100000, max: 1000000 }),
  }

  const documents = Array.from(
    { length: faker.number.int({ min: 0, max: 3 }) },
    () => ({
      document_id: faker.string.uuid(),
      name: faker.string.alpha(10),
      uploaded_on: faker.date.past().toISOString().split('T')[0],
      uploaded_by: faker.helpers.arrayElement(['hospital_staff', 'patient']),
      url: faker.internet.url(),
    }),
  )

  const appointments = Array.from(
    { length: faker.number.int({ min: 0, max: 2 }) },
    () => ({
      appointment_id: faker.string.uuid(),
      appointment_date: faker.date.future().toISOString().split('T')[0],
      appointment_time: `${faker.number.int({ min: 9, max: 17 })}:${faker.helpers.arrayElement(['00', '15', '30', '45'])}`,
      doctor_name: faker.person.fullName(),
      department: faker.helpers.arrayElement([
        'cardiology',
        'orthopedics',
        'pediatrics',
        'ENT',
      ]),
      notes: faker.lorem.sentence(),
    }),
  )

  const metadata = {
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    created_by: faker.helpers.arrayElement(['admin', 'hospital_staff']),
    updated_by: faker.helpers.arrayElement(['admin', 'hospital_staff']),
  }

  return {
    patient_id: patientId,
    aadhar_number: aadharCard,
    personal_info: { ...personalInfo, aadhar_number: aadharCard },
    medical_history: medicalHistory,
    visit_history: visitHistory,
    insurance_details: insuranceDetails,
    documents: documents,
    appointments: appointments,
    metadata: metadata,
  }
}
