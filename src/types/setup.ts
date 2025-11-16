export type SetupStepKey = 'company' | 'founding' | 'social' | 'contact'

export interface CompanyInfo {
  logoUrl: string | null
  bannerUrl: string | null
  companyName: string
  about: string
}

export interface FoundingInfo {
  organizationType: string
  industryType: string
  teamSize: string
  yearOfEstablishment: string | null
  website: string
  vision: string
}

export interface SocialMediaInfo {
  linkedin: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string
}

export interface ContactInfo {
  mapLocation: string
  phone: string
  phoneCountryCode: string
  email: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface SetupState {
  stepOrder: SetupStepKey[]
  currentStep: SetupStepKey
  completedSteps: SetupStepKey[]
  companyInfo: CompanyInfo
  foundingInfo: FoundingInfo
  socialInfo: SocialMediaInfo
  contactInfo: ContactInfo
  isComplete: boolean
  companyId: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
