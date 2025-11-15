import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom'
import AuthShell from '../../components/layout/AuthShell'
import AuthIllustrationPane from '../../components/layout/AuthIllustrationPane'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { registerUserThunk } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'

interface RegisterFormValues {
  fullName: string
  mobile: string
  email: string
  gender: string
  password: string
  confirmPassword: string
}

const GenderToggle = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const buttons = useMemo(
    () => [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
    [],
  )

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, v) => v && onChange(v)}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        background: '#EEF3FF',
        borderRadius: '18px',
        p: 0.5,
      }}
    >
      {buttons.map((button) => (
        <ToggleButton
          key={button.value}
          value={button.value}
          sx={{
            border: 'none',
            borderRadius: '14px !important',
            textTransform: 'none',
            fontWeight: 600,
            color: value === button.value ? '#FFFFFF' : '#5C698B',
            background:
              value === button.value
                ? 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)'
                : 'transparent',
            '&:hover': {
              background:
                value === button.value
                  ? 'linear-gradient(90deg, #7A5CFF 0%, #3F7CFF 100%)'
                  : '#E0E7FF',
            },
          }}
        >
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

const RegisterPage = () => {
  const { register, handleSubmit, control } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      gender: 'male',
      password: '',
      confirmPassword: '',
    },
  })
  const [gender, setGender] = useState('male')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authStatus = useAppSelector((state) => state.auth.status)
  const isSubmitting = authStatus === 'loading'

  const onSubmit = async (values: RegisterFormValues) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!values.mobile) {
      toast.error('Mobile number is required')
      return
    }

    const normalizedMobile = values.mobile.startsWith('+')
      ? values.mobile
      : `+${values.mobile}`

    try {
      await dispatch(
        registerUserThunk({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          gender: values.gender as 'male' | 'female' | 'other',
          mobile: normalizedMobile,
        }),
      ).unwrap()
      toast.success('Registration successful! Verify your OTP to continue.')
      navigate('/verify-otp')
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to register'
      toast.error(message)
    }
  }

  return (
    <AuthShell>
      <AuthIllustrationPane label="IMG Placeholder" />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 460,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600} color="text.primary">
          Register as a Company
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="caption" color="text.secondary">
            Full Name
          </Typography>
          <TextField {...register('fullName')} placeholder="Enter Your Full Name" fullWidth />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="caption" color="text.secondary">
            Mobile No
          </Typography>
          <Controller
            control={control}
            name="mobile"
            render={({ field }) => (
              <Box
                sx={{
                  '.react-tel-input .form-control': {
                    width: '100%',
                    height: 64,
                    borderRadius: '18px',
                    border: '1px solid #C5D4FF',
                    paddingLeft: '72px',
                  },
                  '.react-tel-input .flag-dropdown': {
                    border: 'none',
                    borderRadius: '18px 0 0 18px',
                  },
                }}
              >
                <PhoneInput
                  {...field}
                  country={field.value ? undefined : 'in'}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Box>
            )}
          />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="caption" color="text.secondary">
            Official Email
          </Typography>
          <TextField {...register('email')} placeholder="Official Email" fullWidth />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="caption" color="text.secondary">
            Gender
          </Typography>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <GenderToggle
                value={gender}
                onChange={(value) => {
                  setGender(value)
                  field.onChange(value)
                }}
              />
            )}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Password
            </Typography>
            <TextField
              {...register('password')}
              placeholder="Password"
              type="password"
              fullWidth
            />
          </Stack>
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Confirm Password
            </Typography>
            <TextField
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              type="password"
              fullWidth
            />
          </Stack>
        </Stack>
        <Box
          sx={{
            p: 2,
            background: '#EEF4FF',
            borderRadius: '18px',
            fontSize: 12,
            color: '#5C698B',
            lineHeight: 1.6,
          }}
        >
          All your information is securely processed as per our data processing guidelines, by
          signing on Hireart, you agree to our <strong>privacy policy</strong> and <strong>terms of use</strong>.
        </Box>
        <Button
          type="submit"
          size="large"
          disabled={isSubmitting}
          sx={{
            mt: 1,
            height: 56,
            fontSize: 18,
            background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
            borderRadius: '20px',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(90deg, #7A5CFF 0%, #3F7CFF 100%)',
            },
          }}
        >
          {isSubmitting ? 'Registering…' : 'Register'}
        </Button>
        <Typography textAlign="center" color="text.secondary">
          Already have an account?{' '}
          <Link
            component="button"
            type="button"
            onClick={() => navigate('/login')}
            sx={{ color: 'primary.main', fontWeight: 600 }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </AuthShell>
  )
}

export default RegisterPage
