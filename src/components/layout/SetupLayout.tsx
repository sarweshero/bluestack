import {
  AppBar,
  Box,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
import type { ReactNode } from 'react'
import type { SetupStepKey } from '../../types/setup'

const stepMeta: Record<SetupStepKey, { label: string; icon: ReactNode }> = {
  company: { label: 'Company Info', icon: <BusinessCenterOutlinedIcon fontSize="small" /> },
  founding: { label: 'Founding Info', icon: <EmojiObjectsOutlinedIcon fontSize="small" /> },
  social: { label: 'Social Media Profile', icon: <ShareOutlinedIcon fontSize="small" /> },
  contact: { label: 'Contact', icon: <ContactMailOutlinedIcon fontSize="small" /> },
}

interface SetupLayoutProps {
  activeStep: SetupStepKey
  children: ReactNode
}

const stepOrder: SetupStepKey[] = ['company', 'founding', 'social', 'contact']

const SetupLayout = ({ activeStep, children }: SetupLayoutProps) => {
  const stepIndex = stepOrder.indexOf(activeStep)
  const progress = stepIndex >= 0 ? ((stepIndex + 1) / stepOrder.length) * 100 : 25

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: '1px solid #E3E8F5' }}
      >
        <Toolbar sx={{ px: { xs: 2, lg: 8 } }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: '#EDF3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              💼
            </Box>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Jobpilot
            </Typography>
          </Stack>
          <Box sx={{ flex: 1 }} />
          <Stack spacing={0.5} alignItems="flex-end">
            <Typography variant="caption" color="text.secondary">
              Setup Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 220 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 99,
                    backgroundColor: '#E9EEFF',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 99,
                      background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" fontWeight={600} color="primary.main">
                {Math.round(progress)}% Completed
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ px: { xs: 2, lg: 8 }, py: 6 }}>
        <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {stepOrder.map((step) => {
            const { label, icon } = stepMeta[step]
            const isActive = step === activeStep
            return (
              <Stack key={step} spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)' : '#E9EEFF',
                    color: isActive ? '#FFFFFF' : '#5C698B',
                    boxShadow: isActive ? '0 12px 24px rgba(63, 124, 255, 0.35)' : 'none',
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={isActive ? 600 : 500}
                  color={isActive ? 'text.primary' : 'text.secondary'}
                >
                  {label}
                </Typography>
              </Stack>
            )
          })}
        </Stack>

        <Box>
          {children}
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', py: 4, borderTop: '1px solid #E3E8F5', color: '#94A0C1' }}>
        © 2025 Jobpilot - Job Board. All rights reserved
      </Box>
    </Box>
  )
}

export default SetupLayout
