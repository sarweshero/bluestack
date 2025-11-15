import { Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SetupLayout from '../../components/layout/SetupLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { saveSocialInfo } from '../../features/setup/setupSlice'
import { toast } from 'react-toastify'
import { updateCompanyFromState } from '../../features/setup/setupThunks'

interface SocialMediaForm {
  linkedin: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string
}

const SocialMediaPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { socialInfo, companyId } = useAppSelector((state) => state.setup)

  const { register, handleSubmit } = useForm<SocialMediaForm>({
    defaultValues: socialInfo,
  })

  const onSubmit = async (values: SocialMediaForm) => {
    dispatch(saveSocialInfo(values))

    if (companyId) {
      try {
        await dispatch(updateCompanyFromState()).unwrap()
        toast.success('Social profiles updated')
      } catch (error) {
        const message = typeof error === 'string' ? error : 'Unable to update social profiles'
        toast.error(message)
        return
      }
    } else {
      toast.success('Social profiles updated')
    }

    navigate('/setup/contact')
  }

  return (
    <SetupLayout activeStep="social">
      <Stack spacing={4} maxWidth={900} mx="auto">
        <Typography variant="h5" fontWeight={600} color="text.primary">
          Social Media Profiles
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('linkedin')}
              label="LinkedIn"
              placeholder="https://linkedin.com/company/jobpilot"
              fullWidth
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
              {...register('facebook')}
              label="Facebook"
              placeholder="https://facebook.com/jobpilot"
              fullWidth
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
              {...register('twitter')}
              label="Twitter"
              placeholder="https://x.com/jobpilot"
              fullWidth
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
              {...register('instagram')}
              label="Instagram"
              placeholder="https://instagram.com/jobpilot"
              fullWidth
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
              {...register('youtube')}
              label="YouTube"
              placeholder="https://youtube.com/jobpilot"
              fullWidth
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

        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            onClick={() => navigate('/setup/founding')}
            sx={{ width: 160, height: 52, borderRadius: '999px' }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
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
            Save &amp; Next
          </Button>
        </Stack>
      </Stack>
    </SetupLayout>
  )
}

export default SocialMediaPage
