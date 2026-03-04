export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/user/me',
  REFRESH: '/auth/refresh',
}

export const ADMIN_ENDPOINTS = {
  EMPLOYEE: '/employee',
  PATIENT: '/patient',
  DASHBOARD: '/admin/dashboard',
  PRESCRIPTION: '/prescription',
  MEDICATION: '/medication',
  AUDIO: '/audio',
  UPLOAD: '/upload',
}

export const ROLES = {
  ORGANISATION: 'organisation',
  EMPLOYEE: 'employee',
  PATIENT: 'patient',
}
