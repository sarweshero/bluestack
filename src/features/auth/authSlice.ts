import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import {
  loginUser as loginUserRequest,
  registerUser as registerUserRequest,
  verifyEmail,
  verifyMobile,
  type LoginRequest,
  type LoginResponse,
  type RegisterUserRequest,
} from '../../services/authService'
import { apiClient } from '../../services/apiClient'
import { fetchCompanyProfile } from '../setup/setupThunks'

export interface AuthUser {
  id: number | null
  email: string
  fullName?: string
  companyName?: string
  mobile?: string
  gender?: string
}

interface AuthState {
  isAuthenticated: boolean
  otpVerified: boolean
  user: AuthUser | null
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  pendingUserId: number | null
  pendingCredentials: { email: string; password: string } | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  otpVerified: false,
  user: null,
  token: null,
  status: 'idle',
  error: null,
  pendingUserId: null,
  pendingCredentials: null,
}

const isBrowser = typeof window !== 'undefined'

const persistToken = (token: string | null) => {
  if (!isBrowser) return
  if (token) {
    window.localStorage.setItem('auth_token', token)
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    window.localStorage.removeItem('auth_token')
    delete apiClient.defaults.headers.common.Authorization
  }
}

const persistUser = (user: AuthUser | null) => {
  if (!isBrowser) return
  if (user) {
    window.localStorage.setItem('auth_user', JSON.stringify(user))
  } else {
    window.localStorage.removeItem('auth_user')
  }
}

const buildUser = (payload: LoginResponse['user'], overrides?: Partial<AuthUser>): AuthUser => ({
  id: payload.id ?? null,
  email: payload.email,
  fullName: payload.full_name,
  mobile: payload.mobile_no,
  gender: payload.gender,
  ...overrides,
})

const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined
    return data?.message ?? data?.error ?? error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

type RejectValue = string

export const registerUserThunk = createAsyncThunk<
  {
    userId: number
    email: string
    fullName: string
    mobile: string
    gender: RegisterUserRequest['gender']
    password: string
  },
  RegisterUserRequest,
  { rejectValue: RejectValue }
>('auth/register', async (payload, thunkAPI) => {
  try {
    const response = await registerUserRequest(payload)
    return {
      userId: response.data.user_id,
      email: payload.email,
      fullName: payload.fullName,
      mobile: payload.mobile,
      gender: payload.gender,
      password: payload.password,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

export const loginUserThunk = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: RejectValue }
>('auth/login', async (payload, thunkAPI) => {
  try {
    const response = await loginUserRequest(payload)
    const authUser = buildUser(response.user)
    persistToken(response.token)
    persistUser(authUser)
    thunkAPI.dispatch(fetchCompanyProfile())
    return { ...response, user: { ...response.user } }
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

export const verifyOtpThunk = createAsyncThunk<
  LoginResponse,
  { otp: string; firebaseUid?: string },
  { state: RootState; rejectValue: RejectValue }
>('auth/verifyOtp', async ({ otp, firebaseUid }, thunkAPI) => {
  const state = thunkAPI.getState()
  const credentials = state.auth.pendingCredentials
  const user = state.auth.user

  if (!credentials) {
    return thunkAPI.rejectWithValue('Missing credentials for verification')
  }

  try {
    const uid = firebaseUid ?? otp
    if (uid) {
      await verifyMobile({ uid })
    }
    if (user?.email) {
      await verifyEmail(user.email)
    }
    const response = await loginUserRequest({
      email: credentials.email,
      password: credentials.password,
    })
    const authUser = buildUser(response.user)
    persistToken(response.token)
    persistUser(authUser)
    thunkAPI.dispatch(fetchCompanyProfile())
    return { ...response, user: { ...response.user } }
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      persistToken(null)
      persistUser(null)
      return { ...initialState }
    },
    updateUser(state, action: PayloadAction<Partial<AuthUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        persistUser(state.user)
      }
    },
    hydrateSession(state) {
      if (!isBrowser) return
      const token = window.localStorage.getItem('auth_token')
      const storedUser = window.localStorage.getItem('auth_user')
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as AuthUser
          state.token = token
          state.user = parsedUser
          state.isAuthenticated = true
          state.otpVerified = true
          state.pendingCredentials = null
          state.pendingUserId = parsedUser.id
          state.status = 'succeeded'
          persistToken(token)
        } catch (error) {
          console.warn('Failed to parse stored user session', error)
          window.localStorage.removeItem('auth_user')
          window.localStorage.removeItem('auth_token')
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.otpVerified = false
        state.pendingUserId = action.payload.userId
        state.pendingCredentials = {
          email: action.payload.email,
          password: action.payload.password,
        }
        state.user = {
          id: action.payload.userId,
          email: action.payload.email,
          fullName: action.payload.fullName,
          mobile: action.payload.mobile,
          gender: action.payload.gender,
        }
        persistUser(state.user)
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to register user'
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.otpVerified = true
        state.token = action.payload.token
        state.user = buildUser(action.payload.user, {
          companyName: state.user?.companyName,
        })
        state.pendingCredentials = null
        state.pendingUserId = action.payload.user.id
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to login'
      })
      .addCase(verifyOtpThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.otpVerified = true
        state.token = action.payload.token
        state.user = buildUser(action.payload.user, {
          companyName: state.user?.companyName,
        })
        state.pendingCredentials = null
        state.pendingUserId = action.payload.user.id
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to verify OTP'
      })
  },
})

export const { logout, updateUser, hydrateSession } = authSlice.actions

export default authSlice.reducer
