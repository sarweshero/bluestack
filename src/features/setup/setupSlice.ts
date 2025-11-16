import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CompanyProfile } from '../../services/companyService'
import type {
  CompanyInfo,
  ContactInfo,
  FoundingInfo,
  SetupState,
  SetupStepKey,
  SocialMediaInfo,
} from '../../types/setup'
import {
  fetchCompanyProfile,
  submitSetup,
  updateCompanyFromState,
  uploadBannerThunk,
  uploadLogoThunk,
} from './setupThunks'

const stepOrder: SetupStepKey[] = ['company', 'founding', 'social', 'contact']

const createInitialState = (): SetupState => ({
  stepOrder,
  currentStep: 'company',
  completedSteps: [],
  companyInfo: {
    logoUrl: null,
    bannerUrl: null,
    companyName: '',
    about: '',
  },
  foundingInfo: {
    organizationType: '',
    industryType: '',
    teamSize: '',
    yearOfEstablishment: null,
    website: '',
    vision: '',
  },
  socialInfo: {
    linkedin: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
  },
  contactInfo: {
    mapLocation: '',
    phone: '',
    phoneCountryCode: '+91',
    email: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  },
  isComplete: false,
  companyId: null,
  status: 'idle',
  error: null,
})

const initialState: SetupState = createInitialState()

const getNextStep = (current: SetupStepKey) => {
  const idx = stepOrder.indexOf(current)
  return idx >= 0 && idx < stepOrder.length - 1 ? stepOrder[idx + 1] : null
}

const markStepComplete = (state: SetupState, step: SetupStepKey) => {
  if (!state.completedSteps.includes(step)) {
    state.completedSteps.push(step)
  }
  const next = getNextStep(step)
  if (next) {
    state.currentStep = next
  }
}

const applyProfileToState = (state: SetupState, profile: CompanyProfile | null) => {
  if (!profile) {
    state.companyId = null
    return
  }

  state.companyId = profile.id
  state.companyInfo = {
    ...state.companyInfo,
    companyName: profile.company_name ?? state.companyInfo.companyName,
    about: profile.description ?? state.companyInfo.about,
    logoUrl: profile.logo_url ?? null,
    bannerUrl: profile.banner_url ?? null,
  }

  state.foundingInfo = {
    ...state.foundingInfo,
    industryType: profile.industry ?? state.foundingInfo.industryType,
    website: profile.website ?? state.foundingInfo.website,
    yearOfEstablishment: profile.founded_date ?? state.foundingInfo.yearOfEstablishment,
  }

  if (profile.social_links) {
    state.socialInfo = {
      ...state.socialInfo,
      ...profile.social_links,
    }
  }

  state.contactInfo = {
    ...state.contactInfo,
    mapLocation: profile.address ?? state.contactInfo.mapLocation,
    phone: profile.phone ?? state.contactInfo.phone,
    phoneCountryCode: profile.phone_country_code ?? state.contactInfo.phoneCountryCode,
    email: profile.contact_email ?? state.contactInfo.email,
    city: profile.city ?? state.contactInfo.city,
    state: profile.state ?? state.contactInfo.state,
    country: profile.country ?? state.contactInfo.country,
    postalCode: profile.postal_code ?? state.contactInfo.postalCode,
  }
}

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    saveCompanyInfo(state, action: PayloadAction<CompanyInfo>) {
      state.companyInfo = action.payload
      markStepComplete(state, 'company')
    },
    saveFoundingInfo(state, action: PayloadAction<FoundingInfo>) {
      state.foundingInfo = action.payload
      markStepComplete(state, 'founding')
    },
    saveSocialInfo(state, action: PayloadAction<SocialMediaInfo>) {
      state.socialInfo = action.payload
      markStepComplete(state, 'social')
    },
    saveContactInfo(state, action: PayloadAction<ContactInfo>) {
      state.contactInfo = action.payload
      markStepComplete(state, 'contact')
    },
    setCurrentStep(state, action: PayloadAction<SetupStepKey>) {
      state.currentStep = action.payload
    },
    resetSetup() {
      return createInitialState()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        applyProfileToState(state, action.payload)
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        if (action.payload === 'NOT_FOUND') {
          state.status = 'idle'
          state.error = null
          return
        }
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to fetch company profile'
      })
      .addCase(submitSetup.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(submitSetup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        applyProfileToState(state, action.payload)
        state.isComplete = true
      })
      .addCase(submitSetup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to submit setup'
      })
      .addCase(updateCompanyFromState.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateCompanyFromState.fulfilled, (state, action) => {
        state.status = 'succeeded'
        applyProfileToState(state, action.payload)
      })
      .addCase(updateCompanyFromState.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to update company profile'
      })
      .addCase(uploadLogoThunk.fulfilled, (state, action) => {
        state.companyInfo.logoUrl = action.payload
      })
      .addCase(uploadBannerThunk.fulfilled, (state, action) => {
        state.companyInfo.bannerUrl = action.payload
      })
  },
})

export const {
  saveCompanyInfo,
  saveFoundingInfo,
  saveSocialInfo,
  saveContactInfo,
  setCurrentStep,
  resetSetup,
} = setupSlice.actions

export default setupSlice.reducer
