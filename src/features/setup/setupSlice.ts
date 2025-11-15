import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  CompanyInfo,
  ContactInfo,
  FoundingInfo,
  SetupState,
  SetupStepKey,
  SocialMediaInfo,
} from '../../types/setup'

const stepOrder: SetupStepKey[] = ['company', 'founding', 'social', 'contact']

const initialState: SetupState = {
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
  },
  isComplete: false,
}

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
  } else {
    state.isComplete = true
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
      return initialState
    },
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
