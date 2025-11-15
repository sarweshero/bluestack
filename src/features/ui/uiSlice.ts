import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ToastState {
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
}

interface UiState {
  isLoading: boolean
  toast: ToastState | null
}

const initialState: UiState = {
  isLoading: false,
  toast: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    showToast(state, action: PayloadAction<ToastState>) {
      state.toast = action.payload
    },
    clearToast(state) {
      state.toast = null
    },
  },
})

export const { setLoading, showToast, clearToast } = uiSlice.actions

export default uiSlice.reducer
