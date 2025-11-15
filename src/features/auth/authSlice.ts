import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthUser {
  email: string
  companyName?: string
  mobile?: string
}

interface AuthState {
  isAuthenticated: boolean
  otpVerified: boolean
  user: AuthUser | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  otpVerified: false,
  user: null,
}

interface RegisterPayload {
  email: string
  password: string
  mobile?: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action: PayloadAction<RegisterPayload>) {
      state.user = {
        email: action.payload.email,
        mobile: action.payload.mobile,
      }
      state.isAuthenticated = true
      state.otpVerified = false
    },
    login(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.isAuthenticated = true
      state.otpVerified = true
    },
    setOtpVerified(state, action: PayloadAction<boolean>) {
      state.otpVerified = action.payload
    },
    logout() {
      return initialState
    },
    updateUser(state, action: PayloadAction<Partial<AuthUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { register, login, setOtpVerified, logout, updateUser } =
  authSlice.actions

export default authSlice.reducer
