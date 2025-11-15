import { apiClient } from './apiClient'

export interface RegisterUserRequest {
  fullName: string
  email: string
  password: string
  gender: 'male' | 'female' | 'other'
  mobile: string
  signupType?: 'e' | 'g'
}

export interface RegisterUserResponse {
  success: boolean
  message: string
  data: {
    user_id: number
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  token: string
  user: {
    id: number
    email: string
    full_name?: string
    gender?: string
    mobile_no?: string
  }
}

export interface VerifyMobileRequest {
  uid: string
}

export interface VerifyEmailResponse {
  success: boolean
  message?: string
}

const genderMap: Record<RegisterUserRequest['gender'], 'm' | 'f' | 'o'> = {
  male: 'm',
  female: 'f',
  other: 'o',
}

export const registerUser = async (
  payload: RegisterUserRequest,
): Promise<RegisterUserResponse> => {
  const response = await apiClient.post<RegisterUserResponse>('/api/auth/register', {
    email: payload.email,
    password: payload.password,
    full_name: payload.fullName,
    gender: genderMap[payload.gender],
    mobile_no: payload.mobile,
    signup_type: payload.signupType ?? 'e',
  })

  return response.data
}

export const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', payload)
  return response.data
}

export const verifyMobile = async (payload: VerifyMobileRequest) => {
  const response = await apiClient.post('/api/auth/verify-mobile', payload)
  return response.data as { success: boolean; message?: string }
}

export const verifyEmail = async (email: string): Promise<VerifyEmailResponse> => {
  const response = await apiClient.get<VerifyEmailResponse>('/api/auth/verify-email', {
    params: { email },
  })

  return response.data
}

export const healthCheck = async () => {
  const response = await apiClient.get<{ ok: boolean; message: string }>('/')
  return response.data
}
