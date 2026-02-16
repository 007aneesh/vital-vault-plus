import { ROLES } from '@/configs/constant'
import type { User } from '@/@types/authStore'

export function isAdmin(user: User | null): boolean {
  return user?.type === ROLES.ORGANISATION
}

export function isEmployee(user: User | null): boolean {
  return user?.type === ROLES.EMPLOYEE
}

export function isPatient(user: User | null): boolean {
  return user?.type === ROLES.PATIENT
}

/** Default redirect path after login based on role. */
export function getDefaultRedirect(user: User | null): string {
  if (!user) return '/admin'
  if (user.type === ROLES.ORGANISATION || user.type === ROLES.EMPLOYEE) return '/admin'
  if (user.type === ROLES.PATIENT) return '/user'
  return '/admin'
}
