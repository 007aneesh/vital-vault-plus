import type { ROLES } from '@/configs/constant'

/** User shape from auth API. Extend with additional fields as your API returns them. */
export interface User {
  id?: string
  type: string
  [key: string]: unknown
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  fetchUser: () => Promise<void>
  logout: () => void
}
