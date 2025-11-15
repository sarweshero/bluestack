import { Box, Paper } from '@mui/material'
import type { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

interface AuthShellProps {
  children: ReactNode
}

const AuthShell = ({ children }: AuthShellProps) => {
  const isMobile = useMediaQuery({ maxWidth: 900 })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, md: 6 },
        background: 'linear-gradient(180deg, #eef4ff 0%, #f7f9ff 100%)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 1240,
          borderRadius: '40px',
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 6 },
          background: '#f2f6ff',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: { xs: 3, md: 6 },
          boxShadow:
            '0 40px 80px rgba(63, 124, 255, 0.2), 0 4px 20px rgba(63, 124, 255, 0.08)',
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}

export default AuthShell
