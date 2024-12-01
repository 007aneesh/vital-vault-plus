// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User } from '../types'

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        user: User
        accessToken: string
        refreshToken: string
      }>,
    ) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload
    },
  },
})

export const { loginSuccess, logout, setAccessToken, setRefreshToken } =
  authSlice.actions

export default authSlice.reducer
