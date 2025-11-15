import {
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
  MenuItem,
  Stack,
  InputAdornment,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import DashboardLayout from '../../components/layout/DashboardLayout'
import ImageUploadCard from '../../components/inputs/ImageUploadCard'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  saveCompanyInfo,
  saveContactInfo,
  saveFoundingInfo,
  saveSocialInfo,
} from '../../features/setup/setupSlice'
import type {
  CompanyInfo,
  ContactInfo,
  FoundingInfo,
  SocialMediaInfo,
} from '../../types/setup'
import { toast } from 'react-toastify'

const tabConfig = [
  { label: 'Company Info', value: 'company' },
  { label: 'Founding Info', value: 'founding' },
  { label: 'Social Media Profile', value: 'social' },
  { label: 'Account Setting', value: 'account' },
] as const

type TabKey = (typeof tabConfig)[number]['value']

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('company')
  const dispatch = useAppDispatch()
  const { companyInfo, foundingInfo, socialInfo, contactInfo } = useAppSelector(
    (state) => state.setup,
  )

  const organizationOptions = useMemo(
    () => ['Private Limited', 'Public Limited', 'Partnership', 'Startup'],
    [],
  )
  const industryOptions = useMemo(
    () => ['Technology', 'Finance', 'Healthcare', 'Education'],
    [],
  )
  const teamSizeOptions = useMemo(
    () => ['1-10', '11-50', '51-200', '200+'],
    [],
  )

  type FoundingFormValues = Omit<FoundingInfo, 'yearOfEstablishment'> & {
    yearOfEstablishment: Date | null
  }

  const companyForm = useForm<CompanyInfo>({ defaultValues: companyInfo })
  const foundingForm = useForm<FoundingFormValues>({
    defaultValues: {
      ...foundingInfo,
      yearOfEstablishment: foundingInfo.yearOfEstablishment
        ? new Date(foundingInfo.yearOfEstablishment)
        : null,
    },
  })
  const socialForm = useForm<SocialMediaInfo>({ defaultValues: socialInfo })
  const contactForm = useForm<ContactInfo>({ defaultValues: contactInfo })
  const { register: registerContact } = contactForm
  const accountForm = useForm({ defaultValues: { password: '', confirmPassword: '' } })

  useEffect(() => {
    registerContact('phoneCountryCode')
  }, [registerContact])

  const renderCompanyTab = () => (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            control={companyForm.control}
            name="logoUrl"
            render={({ field }) => (
              <ImageUploadCard
                id="settings-logo"
                title="Upload Logo"
                subtitle="Browse photo or drop here"
                value={field.value}
                onChange={(url) => field.onChange(url)}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            control={companyForm.control}
            name="bannerUrl"
            render={({ field }) => (
              <ImageUploadCard
                id="settings-banner"
                title="Banner Image"
                subtitle="Browse photo or drop here"
                value={field.value}
                onChange={(url) => field.onChange(url)}
              />
            )}
          />
        </Grid>
      </Grid>
      <TextField
        {...companyForm.register('companyName')}
        label="Company name"
        placeholder="Company name"
        fullWidth
      />
      <TextField
        {...companyForm.register('about')}
        label="About us"
        placeholder="Write down about your company here."
        multiline
        minRows={6}
        fullWidth
      />
      <Button
        variant="contained"
        sx={{ alignSelf: 'flex-start', borderRadius: '999px', px: 4 }}
        onClick={companyForm.handleSubmit((values) => {
          dispatch(saveCompanyInfo(values))
          toast.success('Company info updated')
        })}
      >
        Save Change
      </Button>
    </Stack>
  )

  const renderFoundingTab = () => (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField select label="Organization Type" {...foundingForm.register('organizationType')}>
            {organizationOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField select label="Industry Types" {...foundingForm.register('industryType')}>
            {industryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField select label="Team Size" {...foundingForm.register('teamSize')}>
            {teamSizeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            control={foundingForm.control}
            name="yearOfEstablishment"
            render={({ field }) => (
              <Box
                sx={{
                  position: 'relative',
                  '& .react-datepicker-wrapper': { width: '100%' },
                  '& .react-datepicker__input-container input': {
                    width: '100%',
                    height: 56,
                    padding: '0 52px 0 20px',
                    borderRadius: '18px',
                    border: '1px solid #C5D4FF',
                  },
                }}
              >
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="dd/mm/yyyy"
                  dateFormat="dd/MM/yyyy"
                />
                <CalendarMonthOutlinedIcon
                  sx={{
                    position: 'absolute',
                    right: 18,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#5C698B',
                  }}
                />
              </Box>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            {...foundingForm.register('website')}
            label="Company Website"
            placeholder="Website url..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LanguageOutlinedIcon sx={{ color: '#5C698B' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <TextField
        {...foundingForm.register('vision')}
        label="Company Vision"
        multiline
        minRows={6}
      />
      <Button
        variant="contained"
        sx={{ alignSelf: 'flex-start', borderRadius: '999px', px: 4 }}
        onClick={foundingForm.handleSubmit((values) => {
          dispatch(
            saveFoundingInfo({
              ...values,
              yearOfEstablishment: values.yearOfEstablishment
                ? values.yearOfEstablishment.toISOString()
                : null,
            }),
          )
          toast.success('Founding info updated')
        })}
      >
        Save Change
      </Button>
    </Stack>
  )

  const renderSocialTab = () => (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...socialForm.register('linkedin')}
            label="LinkedIn"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedInIcon sx={{ color: '#3F7CFF' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...socialForm.register('facebook')}
            label="Facebook"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FacebookOutlinedIcon sx={{ color: '#1877F2' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...socialForm.register('twitter')}
            label="Twitter"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TwitterIcon sx={{ color: '#1DA1F2' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...socialForm.register('instagram')}
            label="Instagram"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InstagramIcon sx={{ color: '#FF4D67' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...socialForm.register('youtube')}
            label="YouTube"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon sx={{ color: '#FF0000' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ alignSelf: 'flex-start', borderRadius: '999px', px: 4 }}
        onClick={socialForm.handleSubmit((values) => {
          dispatch(saveSocialInfo(values))
          toast.success('Social profiles updated')
        })}
      >
        Save Change
      </Button>
    </Stack>
  )

  const renderAccountTab = () => (
    <Stack spacing={3} maxWidth={420}>
      <TextField
        {...accountForm.register('password')}
        label="Password"
        type="password"
        placeholder="Password"
      />
      <TextField
        {...accountForm.register('confirmPassword')}
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
      />
      <Button
        variant="contained"
        sx={{ alignSelf: 'flex-start', borderRadius: '999px', px: 4 }}
        onClick={accountForm.handleSubmit(() => {
          toast.success('Account settings updated')
          accountForm.reset()
        })}
      >
        Save Change
      </Button>
    </Stack>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company':
        return renderCompanyTab()
      case 'founding':
        return renderFoundingTab()
      case 'social':
        return renderSocialTab()
      case 'account':
        return (
          <Stack spacing={4}>
            {renderAccountTab()}
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight={600} color="text.primary">
                Contact Details
              </Typography>
              <Controller
                control={contactForm.control}
                name="phone"
                render={({ field }) => (
                  <Box
                    sx={{
                      '.react-tel-input .form-control': {
                        width: '100%',
                        height: 60,
                        borderRadius: '18px',
                        border: '1px solid #C5D4FF',
                        paddingLeft: '80px',
                      },
                      '.react-tel-input .flag-dropdown': {
                        border: 'none',
                        borderRadius: '18px 0 0 18px',
                      },
                    }}
                  >
                    <PhoneInput
                      {...field}
                      country="in"
                      value={field.value}
                      onChange={(value, data) => {
                        field.onChange(value)
                        contactForm.setValue('phoneCountryCode', `+${(data as { dialCode: string }).dialCode}`)
                      }}
                    />
                  </Box>
                )}
              />
              <TextField
                {...contactForm.register('email')}
                label="Email"
                placeholder="Email address"
              />
              <TextField
                {...contactForm.register('mapLocation')}
                label="Map Location"
                placeholder="Enter your office address or map location"
              />
              <Button
                variant="contained"
                sx={{ alignSelf: 'flex-start', borderRadius: '999px', px: 4 }}
                onClick={contactForm.handleSubmit((values) => {
                  dispatch(saveContactInfo(values))
                  toast.success('Contact details updated')
                })}
              >
                Save Contact
              </Button>
            </Stack>
          </Stack>
        )
      default:
        return null
    }
  }

  return (
    <DashboardLayout activeItem="/dashboard/settings">
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Settings
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              color: '#5C698B',
            },
            '& .Mui-selected': {
              color: '#3F7CFF !important',
            },
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
              height: 3,
              borderRadius: 99,
            },
          }}
        >
          {tabConfig.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Box sx={{ background: '#FFFFFF', borderRadius: '24px', p: 4, boxShadow: '0 30px 60px rgba(63,124,255,0.12)' }}>
          {renderTabContent()}
        </Box>
      </Stack>
    </DashboardLayout>
  )
}

export default SettingsPage
