export const API_BASE_URL = 'https://vital-vault-backend.vercel.app/api/v1'

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  ME: '/user/me',
  REFRESH: '/auth/refresh-token',
}

export const ROLES = {
  ORGANISATION: 'organisation',
  EMPLOYEE: 'employee',
  PATIENT: 'patient',
}