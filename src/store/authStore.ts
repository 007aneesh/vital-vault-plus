import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AUTH_ENDPOINTS } from '@/configs/constant'
import axios from '@/lib/axios'
import type { User } from '@/@types/authStore'

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isInitialized: boolean
  initialize: () => Promise<void>
  login: (username: string, password: string) => Promise<void>
  fetchUser: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitialized: false,

      initialize: async () => {
        const token = get().accessToken
        if (token) {
          await get().fetchUser().catch(() => {
            // Ignore errors during initialization
          })
        }
        set({ isInitialized: true })
      },

      login: async (username: string, password: string) => {
        try {
          const res = await axios.post(AUTH_ENDPOINTS.LOGIN, {
            username,
            password,
          })

          set(() => ({
            accessToken: res?.data?.data,
          }))

          await get().fetchUser()
        } catch (error) {
          console.error('Login failed:', error)
          throw error
        }
      },

      fetchUser: async () => {
        const token = get().accessToken
        if (!token) return // Don't clear store before rehydration or when no token

        try {
          const res = await axios.get(AUTH_ENDPOINTS.ME, {
            headers: { Authorization: `Bearer ${token}` },
          })

          set(() => ({
            user: res?.data?.data,
            isAuthenticated: true,
          }))
        } catch (error: any) {
          console.error('Failed to fetch user:', error)
          // Only clear auth on 401 Unauthorized, not on network errors or missing token
          if (error?.response?.status === 401) {
            get().logout()
          }
        }
      },

      logout: () => {
        set(() => ({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isInitialized: false,
        }))

        document.cookie = 'refreshToken=; Max-Age=0; path=/'
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        // isInitialized is NOT persisted - always starts false
      }),
    },
  ),
)
