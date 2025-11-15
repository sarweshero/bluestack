import { apiClient } from './apiClient'

export interface SocialLinksPayload {
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
}

export interface RegisterCompanyPayload {
  company_name: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  website?: string
  industry?: string
  founded_date?: string | null
  description?: string
  social_links?: SocialLinksPayload
  logo_url?: string | null
  banner_url?: string | null
  phone_country_code?: string
  phone?: string
  contact_email?: string
}

export type UpdateCompanyPayload = Partial<RegisterCompanyPayload>

export interface CompanyProfile {
  id: number
  owner_id: number
  company_name: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  website?: string
  logo_url: string | null
  banner_url: string | null
  industry?: string
  founded_date?: string | null
  description?: string
  social_links?: SocialLinksPayload | null
  phone_country_code?: string
  phone?: string
  contact_email?: string
  created_at?: string
  updated_at?: string
}

export interface CompanyResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface UploadResponse {
  success: boolean
  data: {
    url: string
    public_id: string
  }
}

export const registerCompany = async (
  payload: RegisterCompanyPayload,
): Promise<CompanyResponse<CompanyProfile>> => {
  const response = await apiClient.post<CompanyResponse<CompanyProfile>>(
    '/api/company/register',
    payload,
  )

  return response.data
}

export const updateCompanyProfile = async (
  payload: UpdateCompanyPayload,
): Promise<CompanyResponse<CompanyProfile>> => {
  const response = await apiClient.put<CompanyResponse<CompanyProfile>>(
    '/api/company/profile',
    payload,
  )

  return response.data
}

export const getCompanyProfile = async (): Promise<CompanyResponse<CompanyProfile>> => {
  const response = await apiClient.get<CompanyResponse<CompanyProfile>>('/api/company/profile')
  return response.data
}

const uploadAsset = async (endpoint: string, file: File): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<UploadResponse>(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}

export const uploadLogo = (file: File) => uploadAsset('/api/company/upload-logo', file)

export const uploadBanner = (file: File) => uploadAsset('/api/company/upload-banner', file)
