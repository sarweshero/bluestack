import { Box, Typography } from '@mui/material'

interface AuthIllustrationPaneProps {
  label?: string
}

const AuthIllustrationPane = ({ label }: AuthIllustrationPaneProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: { xs: '100%', md: 630 },
        minWidth: { xs: 'auto', md: 630 },
        minHeight: 520,
        borderRadius: '32px',
        background: 'linear-gradient(180deg, #F3CFFF 0%, #8468FF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.5)',
      }}
    >
      <Typography
        variant="h6"
        color="rgba(255,255,255,0.7)"
        sx={{
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}

export default AuthIllustrationPane
