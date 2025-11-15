import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

interface DashboardLayoutProps {
  activeItem?: string
  children: ReactNode
}

const sidebarItems = [
  { label: 'Overview', path: '/dashboard' },
  { label: 'Employers Profile', path: '/dashboard/profile' },
  { label: 'Post a Job', path: '/dashboard/post-job' },
  { label: 'My Jobs', path: '/dashboard/my-jobs' },
  { label: 'Saved Candidate', path: '/dashboard/saved' },
  { label: 'Plans & Billing', path: '/dashboard/plans' },
  { label: 'All Companies', path: '/dashboard/companies' },
  { label: 'Settings', path: '/dashboard/settings' },
]

const topNavItems = ['Home', 'Find Candidate', 'Dashboard', 'My Jobs', 'Applications', 'Customer Supports']

const DashboardLayout = ({ activeItem = '/dashboard/settings', children }: DashboardLayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#F7F9FF' }}>
      <Box
        component="header"
        sx={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E3E8F5',
          px: { xs: 2, lg: 6 },
          py: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={4}>
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
          <Stack direction="row" spacing={3} sx={{ flex: 1 }}>
            {topNavItems.map((item) => (
              <Typography key={item} variant="body2" color="text.secondary" sx={{
                cursor: 'pointer',
                fontWeight: item === 'Dashboard' ? 600 : 500,
                color: item === 'Dashboard' ? 'primary.main' : '#5C698B',
              }}>
                {item}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              +1-202-555-0178
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
                px: 3,
              }}
            >
              Post A Jobs
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: 48,
                borderRadius: '50%',
                background: 'linear-gradient(90deg, #FF7A7A 0%, #FF3F8E 100%)',
              }}
            >
              <Typography color="#FFFFFF">IG</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Stack direction="row" sx={{ minHeight: 'calc(100vh - 80px)' }}>
        <Box
          component="nav"
          sx={{
            width: 260,
            background: '#FFFFFF',
            borderRight: '1px solid #E3E8F5',
            p: 3,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" mb={2}>
            Employers Dashboard
          </Typography>
          <List disablePadding>
            {sidebarItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                selected={item.path === activeItem}
                sx={{
                  borderRadius: '12px',
                  mb: 0.5,
                  '&.Mui-selected': {
                    background: 'linear-gradient(90deg, rgba(63,124,255,0.12) 0%, rgba(122,92,255,0.12) 100%)',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 3 }} />
          <Button variant="text" color="error" sx={{ fontWeight: 600 }}>
            Log-out
          </Button>
        </Box>

        <Box sx={{ flex: 1, p: { xs: 2, lg: 6 } }}>{children}</Box>
      </Stack>

      <Box sx={{ textAlign: 'center', py: 3, color: '#94A0C1', borderTop: '1px solid #E3E8F5' }}>
        © 2025 Jobpilot - Job Board. All rights reserved
      </Box>
    </Box>
  )
}

export default DashboardLayout
