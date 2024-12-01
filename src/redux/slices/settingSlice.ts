// redux/slices/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingsState } from '../types'

const initialState: SettingsState = {
  userPermissions: [],
  appSettings: {
    theme: 'light',
    language: 'en',
  },
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<string[]>) {
      state.userPermissions = action.payload
    },
    updateAppSettings(
      state,
      action: PayloadAction<{ theme: string; language: string }>,
    ) {
      state.appSettings = { ...state.appSettings, ...action.payload }
    },
  },
})

export const { setPermissions, updateAppSettings } = settingsSlice.actions

export default settingsSlice.reducer
