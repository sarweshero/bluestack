import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import type { RootState } from '../../store'
import type { SetupState } from '../../types/setup'
import {
  getCompanyProfile,
  registerCompany,
  updateCompanyProfile,
  uploadBanner,
  uploadLogo,
  type CompanyProfile,
  type RegisterCompanyPayload,
  type UpdateCompanyPayload,
} from '../../services/companyService'

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

const emptyToUndefined = (value: string | null | undefined) => {
  if (value === null || value === undefined) return undefined
  const trimmed = value.toString().trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const buildCompanyPayload = (setup: SetupState): RegisterCompanyPayload => ({
  company_name: setup.companyInfo.companyName,
  description: emptyToUndefined(setup.companyInfo.about),
  website: emptyToUndefined(setup.foundingInfo.website),
  industry: emptyToUndefined(setup.foundingInfo.industryType),
  founded_date: setup.foundingInfo.yearOfEstablishment,
  social_links: {
    linkedin: emptyToUndefined(setup.socialInfo.linkedin),
    facebook: emptyToUndefined(setup.socialInfo.facebook),
    twitter: emptyToUndefined(setup.socialInfo.twitter),
    instagram: emptyToUndefined(setup.socialInfo.instagram),
    youtube: emptyToUndefined(setup.socialInfo.youtube),
  },
  logo_url: emptyToUndefined(setup.companyInfo.logoUrl ?? undefined),
  banner_url: emptyToUndefined(setup.companyInfo.bannerUrl ?? undefined),
  address: emptyToUndefined(setup.contactInfo.mapLocation),
  city: emptyToUndefined(setup.contactInfo.city),
  state: emptyToUndefined(setup.contactInfo.state),
  country: emptyToUndefined(setup.contactInfo.country),
  postal_code: emptyToUndefined(setup.contactInfo.postalCode),
  phone_country_code: emptyToUndefined(setup.contactInfo.phoneCountryCode),
  phone: emptyToUndefined(setup.contactInfo.phone),
  contact_email: emptyToUndefined(setup.contactInfo.email),
})

export const fetchCompanyProfile = createAsyncThunk<
  CompanyProfile | null,
  void,
  { rejectValue: string }
>('setup/fetchCompanyProfile', async (_, thunkAPI) => {
  try {
    const response = await getCompanyProfile()
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return thunkAPI.rejectWithValue('NOT_FOUND')
    }
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

export const submitSetup = createAsyncThunk<
  CompanyProfile | null,
  void,
  { state: RootState; rejectValue: string }
>('setup/submit', async (_, thunkAPI) => {
  const state = thunkAPI.getState().setup
  const payload = buildCompanyPayload(state)

  try {
    if (state.companyId) {
      const response = await updateCompanyProfile(payload as UpdateCompanyPayload)
      return response.data
    }
    const response = await registerCompany(payload)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

export const updateCompanyFromState = createAsyncThunk<
  CompanyProfile | null,
  void,
  { state: RootState; rejectValue: string }
>('setup/updateFromState', async (_, thunkAPI) => {
  const state = thunkAPI.getState().setup
  const payload = buildCompanyPayload(state) as UpdateCompanyPayload
  try {
    const response = await updateCompanyProfile(payload)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

export const uploadLogoThunk = createAsyncThunk<
  string,
  File,
  { rejectValue: string }
>('setup/uploadLogo', async (file, thunkAPI) => {
  try {
    const response = await uploadLogo(file)
    return response.data.url
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})

export const uploadBannerThunk = createAsyncThunk<
  string,
  File,
  { rejectValue: string }
>('setup/uploadBanner', async (file, thunkAPI) => {
  try {
    const response = await uploadBanner(file)
    return response.data.url
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error))
  }
})
