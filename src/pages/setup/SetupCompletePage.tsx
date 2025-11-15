import { Box, Button, Stack, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import SetupLayout from '../../components/layout/SetupLayout'
import { useNavigate } from 'react-router-dom'

const SetupCompletePage = () => {
  const navigate = useNavigate()

  return (
    <SetupLayout activeStep="contact">
      <Stack spacing={4} alignItems="center" sx={{ py: 8 }}>
        <Box
          sx={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: '#E7F1FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3F7CFF',
            boxShadow: '0 20px 40px rgba(63, 124, 255, 0.2)',
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 48 }} />
        </Box>
        <Typography variant="h4" fontWeight={700} textAlign="center" color="text.primary">
          🎉 Congratulations, Your profile is 100% complete!
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: 540 }}
        >
          Donec hendrerit, ante mattis pellentesque eleifend, tortor urna malesuada ante, eget aliquam
          nunc augue hendrerit ligula. Nunc mauris arcu, mattis sed sem vitae.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <Button
            variant="contained"
            sx={{
              width: 180,
              height: 56,
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #7A5CFF 0%, #3F7CFF 100%)',
              },
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 180, height: 56, borderRadius: '999px', fontWeight: 600 }}
            onClick={() => navigate('/dashboard/settings')}
          >
            View Dashboard
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 160, height: 56, borderRadius: '999px', fontWeight: 600 }}
            onClick={() => navigate('/dashboard/settings')}
          >
            View Profile
          </Button>
        </Stack>
      </Stack>
    </SetupLayout>
  )
}

export default SetupCompletePage
