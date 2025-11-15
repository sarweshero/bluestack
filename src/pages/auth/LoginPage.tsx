import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginUserThunk } from '../../features/auth/authSlice'
import AuthShell from '../../components/layout/AuthShell'
import AuthIllustrationPane from '../../components/layout/AuthIllustrationPane'
import { toast } from 'react-toastify'

interface LoginFormValues {
  email: string
  password: string
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  })
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((state) => state.auth.status)
  const isSubmitting = authStatus === 'loading'
  const navigate = useNavigate()

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(loginUserThunk(values)).unwrap()
      toast.success('Welcome back!')
      navigate('/dashboard/settings')
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to login'
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
          Login as a Company
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="caption" color="text.secondary">
            Email ID
          </Typography>
          <TextField
            {...register('email')}
            placeholder="Enter email"
            fullWidth
          />
          <Link
            component="button"
            type="button"
            variant="body2"
            sx={{ alignSelf: 'flex-start', color: 'primary.main' }}
          >
            Login with OTP
          </Link>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="caption" color="text.secondary">
            Enter your password
          </Typography>
          <TextField
            {...register('password')}
            placeholder="Enter password"
            type="password"
            fullWidth
          />
          <Link
            component="button"
            type="button"
            variant="body2"
            sx={{ alignSelf: 'flex-start', color: '#F5B308' }}
          >
            Forgot Password ?
          </Link>
        </Stack>
        <Button
          type="submit"
          size="large"
          disabled={isSubmitting}
          sx={{
            mt: 1,
            height: 64,
            fontSize: 20,
            background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
            borderRadius: '20px',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(90deg, #7A5CFF 0%, #3F7CFF 100%)',
            },
          }}
        >
          {isSubmitting ? 'Logging in…' : 'Login'}
        </Button>
        <Typography textAlign="center" color="text.secondary">
          Don&apos;t have an account ?{' '}
          <Link
            component="button"
            type="button"
            onClick={() => navigate('/register')}
            sx={{ color: 'primary.main', fontWeight: 600 }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </AuthShell>
  )
}

export default LoginPage
