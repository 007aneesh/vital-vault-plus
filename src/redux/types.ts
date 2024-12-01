// types.ts
export interface User {
  id: string
  username: string
  role: 'admin' | 'employee' | 'user'
  permissions: string[]
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

export interface SettingsState {
  userPermissions: string[]
  appSettings: {
    theme: string
    language: string
  }
}

export interface RootState {
  auth: AuthState
  settings: SettingsState
}
