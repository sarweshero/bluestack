import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import type { ChangeEvent } from 'react'

interface ImageUploadCardProps {
  id: string
  title: string
  subtitle: string
  value: string | null
  onChange: (fileUrl: string | null, file?: File) => void
  helperText?: string
  disabled?: boolean
}

const ImageUploadCard = ({ id, title, subtitle, value, onChange, helperText, disabled }: ImageUploadCardProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }
    const file = event.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      onChange(previewUrl, file)
    } else {
      onChange(null)
    }
  }

  return (
    <Box
      sx={{
        border: '2px dashed #C5D4FF',
        borderRadius: '24px',
        background: '#FAFCFF',
        p: 3,
        width: '100%',
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      {value ? (
        <Box
          component="img"
          src={value}
          alt={title}
          sx={{
            width: '100%',
            height: 140,
            objectFit: 'cover',
            borderRadius: '18px',
          }}
        />
      ) : (
        <Stack spacing={1} alignItems="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#E6EEFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CloudUploadOutlinedIcon sx={{ color: '#3F7CFF' }} />
          </Box>
          <Typography fontWeight={600}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Stack>
      )}

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          component="label"
          disabled={disabled}
          sx={{
            borderRadius: '999px',
            px: 3,
            background: 'linear-gradient(90deg, #3F7CFF 0%, #7A5CFF 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #7A5CFF 0%, #3F7CFF 100%)',
            },
          }}
        >
          Browse photo
          <input hidden type="file" accept="image/*" id={id} onChange={handleFileChange} disabled={disabled} />
        </Button>
        {value && (
          <Button variant="text" onClick={() => onChange(null)} disabled={disabled} sx={{ color: '#FF5F5F' }}>
            Remove
          </Button>
        )}
      </Stack>
      {helperText && (
        <Typography variant="caption" color="text.secondary">
          {helperText}
        </Typography>
      )}
    </Box>
  )
}

export default ImageUploadCard
