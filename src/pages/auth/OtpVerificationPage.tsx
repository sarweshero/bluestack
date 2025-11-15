import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { verifyOtpThunk } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'

interface OtpFormValues {
  otp: string
}

const cardShadow = '0 34px 80px rgba(63, 124, 255, 0.25)'

const OtpVerificationPage = () => {
  const { control, handleSubmit } = useForm<OtpFormValues>({ defaultValues: { otp: '' } })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.auth)
  const isSubmitting = status === 'loading'

  const onSubmit = async ({ otp }: OtpFormValues) => {
    try {
      await dispatch(verifyOtpThunk({ otp })).unwrap()
      toast.success('OTP verified successfully')
      navigate('/setup/company')
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to verify OTP'
      toast.error(message)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6,
        background: 'rgba(10, 20, 64, 0.45)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(180deg, rgba(243,207,255,0.92) 0%, rgba(132,104,255,0.88) 100%)',
          filter: 'blur(18px)',
        }}
      />
      <Paper
        elevation={12}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: 640,
          borderRadius: '32px',
          p: 5,
          background: '#FFFFFF',
          boxShadow: cardShadow,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600} color="text.primary">
            Great! Almost done!<br />
            Please verify your mobile no
          </Typography>
          <Divider sx={{ borderColor: '#E0E7FF' }} />
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '16px',
                background: '#E9F1FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}
            >
              📧
            </Box>
            <Box>
              <Typography fontWeight={600} color="text.primary">
                A verification link has been sent to your email. Please check your inbox and verify.
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '16px',
                background: '#E9F1FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              💬
            </Box>
            <Box>
              <Typography fontWeight={600} color="text.primary">
                Enter the One Time Password (OTP) which has been sent to {user?.mobile ?? 'your mobile'}
              </Typography>
            </Box>
          </Stack>
          <Controller
            control={control}
            name="otp"
            rules={{ required: true, minLength: 4 }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter Your OTP Here"
                fullWidth
                inputProps={{
                  maxLength: 6,
                  style: { textAlign: 'center', fontSize: 24, letterSpacing: 6 },
                }}
                sx={{
                  height: 72,
                  '& .MuiOutlinedInput-root': {
                    height: 72,
                    borderRadius: '22px',
                    fontWeight: 600,
                  },
                }}
              />
            )}
          />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color="text.secondary">
              Didn&apos;t receive OTP ?{' '}
              <Link component="button" type="button" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Resend OTP
              </Link>
            </Typography>
            <Link component="button" type="button" sx={{ color: '#FF5F5F' }}>
              Report Issue
            </Link>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Button
              variant="outlined"
              onClick={() => navigate('/register')}
              sx={{
                borderRadius: '999px',
                width: 160,
                height: 56,
                fontWeight: 600,
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              sx={{
                width: 220,
                height: 56,
                fontSize: 18,
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #7A5CFF 0%, #3F7CFF 100%)',
                },
              }}
            >
              {isSubmitting ? 'Verifying…' : 'Verify Mobile'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default OtpVerificationPage
