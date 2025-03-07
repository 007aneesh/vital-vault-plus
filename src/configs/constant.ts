export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  ME: '/user/me',
  REFRESH: '/auth/refresh',
}

export const ADMIN_ENDPOINTS = {
  EMPLOYEE: '/employee',
}

export const ROLES = {
  ORGANISATION: 'organisation',
  EMPLOYEE: 'employee',
  PATIENT: 'patient',
}
