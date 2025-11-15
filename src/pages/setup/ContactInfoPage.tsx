import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SetupLayout from '../../components/layout/SetupLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { saveContactInfo } from '../../features/setup/setupSlice'
import { toast } from 'react-toastify'
import { submitSetup } from '../../features/setup/setupThunks'

interface ContactInfoForm {
  mapLocation: string
  phoneCountryCode: string
  phone: string
  email: string
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
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
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
                      setValue('phoneCountryCode', `+${(data as { dialCode: string }).dialCode}`)
                    }}
                  />
                </Box>
              )}
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
