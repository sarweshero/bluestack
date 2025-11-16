import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SetupLayout from '../../components/layout/SetupLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { saveContactInfo } from '../../features/setup/setupSlice'
import { toast } from 'react-toastify'
import { submitSetup } from '../../features/setup/setupThunks'
import PhoneInput from '../../components/inputs/PhoneInputField'

interface ContactInfoForm {
  mapLocation: string
  phoneCountryCode: string
  phone: string
  email: string
  city: string
  state: string
  country: string
  postalCode: string
}

const ContactInfoPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { contactInfo, status } = useAppSelector((state) => state.setup)

  const { register, handleSubmit, control, setValue } = useForm<ContactInfoForm>({
    defaultValues: contactInfo,
  })

  useEffect(() => {
    register('phoneCountryCode')
  }, [register])

  const onSubmit = async (values: ContactInfoForm) => {
    const requiredFields = [
      { key: 'mapLocation', label: 'Map location' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'country', label: 'Country' },
      { key: 'postalCode', label: 'Postal code' },
    ] as const

    for (const field of requiredFields) {
      if (!values[field.key].trim()) {
        toast.error(`${field.label} is required`)
        return
      }
    }

    dispatch(saveContactInfo(values))

    try {
      await dispatch(submitSetup()).unwrap()
      toast.success('Contact info saved')
      navigate('/setup/complete')
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to submit company profile'
      toast.error(message)
    }
  }

  return (
    <SetupLayout activeStep="contact">
      <Stack spacing={4} maxWidth={720} mx="auto">
        <Typography variant="h5" fontWeight={600} color="text.primary">
          Contact
        </Typography>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              {...register('mapLocation')}
              label="Map Location"
              placeholder="Enter your office address or map location"
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('city')}
              label="City"
              placeholder="City"
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('state')}
              label="State"
              placeholder="State"
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('country')}
              label="Country"
              placeholder="Country"
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('postalCode')}
              label="Postal Code"
              placeholder="Postal Code"
              required
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => {
                const { ref, onChange, value, ...rest } = field
                return (
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
                      {...rest}
                      value={value}
                      onChange={(val: string, country?: { dialCode?: string }) => {
                        onChange(val)
                        const dialCode = country?.dialCode ? `+${country.dialCode}` : null
                        if (dialCode) {
                          setValue('phoneCountryCode', dialCode)
                        }
                      }}
                      country={value ? undefined : 'in'}
                      inputProps={{ name: 'phone', ref }}
                    />
                  </Box>
                )
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              {...register('email')}
              label="Email"
              placeholder="Email address"
              fullWidth
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            onClick={() => navigate('/setup/social')}
            sx={{ width: 160, height: 52, borderRadius: '999px' }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={status === 'loading'}
            sx={{
              width: 180,
              height: 56,
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #7A5CFF 0%, #3F7CFF 100%)',
              },
            }}
          >
            {status === 'loading' ? 'Saving…' : 'Finish Editing'}
          </Button>
        </Stack>
      </Stack>
    </SetupLayout>
  )
}

export default ContactInfoPage
