import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SetupLayout from '../../components/layout/SetupLayout'
import ImageUploadCard from '../../components/inputs/ImageUploadCard'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { saveCompanyInfo } from '../../features/setup/setupSlice'
import { updateUser } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import { uploadLogoThunk, uploadBannerThunk, updateCompanyFromState } from '../../features/setup/setupThunks'
import { useState } from 'react'

interface CompanyInfoForm {
  logoUrl: string | null
  bannerUrl: string | null
  companyName: string
  about: string
}

const toolbarIcons = [
  { icon: <FormatBoldIcon fontSize="small" />, label: 'Bold' },
  { icon: <FormatItalicIcon fontSize="small" />, label: 'Italic' },
  { icon: <FormatUnderlinedIcon fontSize="small" />, label: 'Underline' },
  { icon: <LinkOutlinedIcon fontSize="small" />, label: 'Link' },
  { icon: <FormatListBulletedIcon fontSize="small" />, label: 'Bullet List' },
  { icon: <FormatListNumberedIcon fontSize="small" />, label: 'Numbered List' },
]

const CompanyInfoPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { companyInfo, companyId } = useAppSelector((state) => state.setup)
  const [logoUploading, setLogoUploading] = useState(false)
  const [bannerUploading, setBannerUploading] = useState(false)

  const { control, register, handleSubmit } = useForm<CompanyInfoForm>({
    defaultValues: companyInfo,
  })

  const onSubmit = async (values: CompanyInfoForm) => {
    dispatch(saveCompanyInfo(values))
    dispatch(updateUser({ companyName: values.companyName }))

    if (companyId) {
      try {
        await dispatch(updateCompanyFromState()).unwrap()
        toast.success('Company info saved')
      } catch (error) {
        const message = typeof error === 'string' ? error : 'Unable to update company info'
        toast.error(message)
        return
      }
    } else {
      toast.success('Company info saved')
    }

    navigate('/setup/founding')
  }

  return (
    <SetupLayout activeStep="company">
      <Stack spacing={4}>
        <Box>
          <Typography variant="h5" fontWeight={600} color="text.primary" mb={2}>
            Logo &amp; Banner Image
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="logoUrl"
                render={({ field }) => (
                  <ImageUploadCard
                    id="company-logo"
                    title="Upload Logo"
                    subtitle="Browse photo or drop here"
                    value={field.value}
                    disabled={logoUploading}
                    onChange={async (url, file) => {
                      if (!file) {
                        field.onChange(null)
                        return
                      }

                      const previousValue = field.value
                      field.onChange(url)
                      setLogoUploading(true)
                      try {
                        const uploadedUrl = await dispatch(uploadLogoThunk(file)).unwrap()
                        field.onChange(uploadedUrl)
                        toast.success('Logo uploaded')
                      } catch (error) {
                        field.onChange(previousValue)
                        const message = typeof error === 'string' ? error : 'Unable to upload logo'
                        toast.error(message)
                      } finally {
                        setLogoUploading(false)
                      }
                    }}
                    helperText="A photo larger than 400 pixels works best. Max photo size 5 MB."
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="bannerUrl"
                render={({ field }) => (
                  <ImageUploadCard
                    id="company-banner"
                    title="Banner Image"
                    subtitle="Browse photo or drop here"
                    value={field.value}
                    disabled={bannerUploading}
                    onChange={async (url, file) => {
                      if (!file) {
                        field.onChange(null)
                        return
                      }

                      const previousValue = field.value
                      field.onChange(url)
                      setBannerUploading(true)
                      try {
                        const uploadedUrl = await dispatch(uploadBannerThunk(file)).unwrap()
                        field.onChange(uploadedUrl)
                        toast.success('Banner uploaded')
                      } catch (error) {
                        field.onChange(previousValue)
                        const message = typeof error === 'string' ? error : 'Unable to upload banner'
                        toast.error(message)
                      } finally {
                        setBannerUploading(false)
                      }
                    }}
                    helperText="Banner images optimal dimension 1520×400. Supported format JPEG, PNG. Max photo size 5 MB."
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            Company name
          </Typography>
          <TextField
            {...register('companyName')}
            placeholder="Company name"
            fullWidth
            sx={{ maxWidth: 640 }}
          />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            About Us
          </Typography>
          <Box
            sx={{
              border: '1px solid #D6DEFF',
              borderRadius: '24px',
              overflow: 'hidden',
              background: '#FFFFFF',
              maxWidth: 900,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                px: 3,
                py: 1.5,
                borderBottom: '1px solid #E6ECFF',
                background: '#F6F8FF',
              }}
            >
              {toolbarIcons.map(({ icon, label }) => (
                <Box
                  key={label}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5C698B',
                    cursor: 'pointer',
                    '&:hover': {
                      background: '#E7EEFF',
                      color: '#3F7CFF',
                    },
                  }}
                >
                  {icon}
                </Box>
              ))}
            </Stack>
            <TextField
              {...register('about')}
              placeholder="Write down about your company here. Let the candidate know who we are..."
              multiline
              minRows={8}
              fullWidth
              variant="standard"
              InputProps={{ disableUnderline: true, sx: { px: 3, py: 2 } }}
            />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={logoUploading || bannerUploading}
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
            {logoUploading || bannerUploading ? 'Uploading…' : 'Save & Next'}
          </Button>
        </Stack>
      </Stack>
    </SetupLayout>
  )
}

export default CompanyInfoPage
