export const CATEGORIES = {
  PATIENT_RECORDS: 'Patient Records',
  APPOINTMENTS: 'Appointments',
  PHARMACY: 'Pharmacy',
  BILLING: 'Billing & Payments',
  REPORTS: 'Reports & Analytics',
  STAFF_MANAGEMENT: 'Staff Management',
}

export const PERMISSIONS = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  CREATE: 'CREATE',
  APPROVE: 'APPROVE',
  CANCEL: 'CANCEL',
  EXPORT: 'EXPORT',
}

export const rolesData = [
  {
    id: 1,
    role_name: 'Administrator',
    role_type: 'Admin',
    description: 'Manages the entire hospital system.',
    access_permissions: [
      {
        category: CATEGORIES.STAFF_MANAGEMENT,
        permissions: [PERMISSIONS.VIEW, PERMISSIONS.EDIT, PERMISSIONS.CREATE],
      },
      {
        category: CATEGORIES.REPORTS,
        permissions: [PERMISSIONS.VIEW, PERMISSIONS.EXPORT],
      },
    ],
  },
  {
    id: 2,
    role_name: 'Doctor',
    role_type: 'Doctor',
    description: 'Handles patient care and diagnoses.',
    access_permissions: [
      {
        category: CATEGORIES.PATIENT_RECORDS,
        permissions: [PERMISSIONS.VIEW, PERMISSIONS.EDIT],
      },
    ],
  },
]

export const ROLES = {
  ADMIN: 'Administrator',
  DOCTOR: 'Doctor',
  NURSE: 'Nurse',
  RECEPTIONIST: 'Receptionist',
  PHARMACIST: 'Pharmacist',
  LAB_TECHNICIAN: 'Lab Technician',
  BILLING_STAFF: 'Billing Staff',
  STAFF: 'Staff',
}
