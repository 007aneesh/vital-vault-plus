import { faker } from '@faker-js/faker'

export function get_employee_data() {
  const employeeId = faker.string.uuid()
  const employeeCode = `EMP-${faker.number.int({ min: 1000, max: 9999 })}`

  const personalInfo = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    date_of_birth: faker.date
      .birthdate({ min: 22, max: 60, mode: 'age' })
      .toISOString()
      .split('T')[0],
    age: faker.number.int({ min: 22, max: 60 }),
    gender: faker.helpers.arrayElement(['male', 'female', 'other']),
    contact_number: faker.number.int({ min: 1000000000, max: 9999999999 }),
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
  }

  const employmentDetails = {
    employee_code: employeeCode,
    department: faker.helpers.arrayElement([
      'cardiology',
      'orthopedics',
      'pediatrics',
      'general medicine',
      'administration',
    ]),
    role: faker.helpers.arrayElement([
      'doctor',
      'nurse',
      'technician',
      'admin',
    ]),
    access_level: faker.helpers.arrayElement(['read', 'write', 'modify']),
    date_of_joining: faker.date.past({ years: 10 }).toISOString().split('T')[0],
    experience_years: faker.number.int({ min: 1, max: 30 }),
    status: faker.helpers.arrayElement(['active', 'on_leave', 'retired']),
  }

  const certificationsAndTraining = {
    certifications: Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      () => ({
        certification_name: faker.company.buzzPhrase(),
        certification_date: faker.date.past().toISOString().split('T')[0],
        issuing_organization: faker.company.name(),
      }),
    ),
    ongoing_training: Array.from(
      { length: faker.number.int({ min: 0, max: 2 }) },
      () => ({
        training_name: faker.company.catchPhrase(),
        start_date: faker.date.past().toISOString().split('T')[0],
        end_date: faker.date.future().toISOString().split('T')[0],
      }),
    ),
  }

  const assignedPatients = Array.from(
    { length: faker.number.int({ min: 0, max: 5 }) },
    () => ({
      patient_id: faker.string.uuid(),
      patient_name: faker.person.fullName(),
      last_visit_date: faker.date.recent().toISOString().split('T')[0],
    }),
  )

  const workHistory = Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => ({
      organization_name: faker.company.name(),
      role: faker.helpers.arrayElement([
        'doctor',
        'nurse',
        'technician',
        'admin',
      ]),
      duration: `${faker.number.int({ min: 1, max: 10 })} years`,
      reason_for_leaving: faker.lorem.words(5),
    }),
  )

  const shiftDetails = {
    shift_type: faker.helpers.arrayElement(['morning', 'evening', 'night']),
    shift_start: `${faker.number.int({ min: 6, max: 22 })}:${faker.helpers.arrayElement(['00', '30'])}`,
    shift_end: `${faker.number.int({ min: 7, max: 23 })}:${faker.helpers.arrayElement(['00', '30'])}`,
    shift_days: faker.helpers.arrayElements(
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      faker.number.int({ min: 4, max: 6 }),
    ),
  }

  const payrollAndBenefits = {
    salary: faker.number.int({ min: 30000, max: 200000 }),
    insurance_policy_number: faker.string.uuid(),
    benefits: faker.helpers.arrayElements(
      ['health insurance', 'paid leave', 'retirement plan'],
      faker.number.int({ min: 1, max: 3 }),
    ),
    last_salary_increment: faker.date.past().toISOString().split('T')[0],
  }

  const metadata = {
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    created_by: faker.helpers.arrayElement(['admin', 'supervisor']),
    updated_by: faker.helpers.arrayElement(['admin', 'supervisor']),
  }

  return {
    employee_id: employeeId,
    personal_info: personalInfo,
    employment_details: employmentDetails,
    certifications_and_training: certificationsAndTraining,
    assigned_patients: assignedPatients,
    work_history: workHistory,
    shift_details: shiftDetails,
    payroll_and_benefits: payrollAndBenefits,
    metadata: metadata,
  }
}
