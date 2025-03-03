import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ENDPOINTS } from '@/configs/constant'
import axios from '@/lib/axios'

interface AuthState {
  user: any
  accessToken: string | null
  isAuthenticated: boolean
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

      login: async (username: string, password: string) => {
        try {
          const res = await axios.post(ENDPOINTS.LOGIN, { username, password })

          set(() => ({
            accessToken: res?.data?.data,
          }))

          await get().fetchUser()
        } catch (error) {
          console.error('❌ Login failed:', error)
          throw error
        }
      },

      fetchUser: async () => {
        try {
          const res = await axios.get(ENDPOINTS.ME, {
            headers: { Authorization: `Bearer ${get().accessToken}` },
          })

          set(() => ({
            user: res?.data?.data,
            isAuthenticated: true,
          }))
        } catch (error) {
          console.error('❌ Failed to fetch user:', error)
          get().logout()
        }
      },

      logout: () => {
        set(() => ({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }))

        document.cookie = 'refreshToken=; Max-Age=0; path=/'
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
