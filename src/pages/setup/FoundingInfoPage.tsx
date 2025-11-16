import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import { Controller, useForm } from 'react-hook-form'
import { useMemo } from 'react'
import DatePicker from '../../components/inputs/DatePickerField'
import SetupLayout from '../../components/layout/SetupLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { saveFoundingInfo } from '../../features/setup/setupSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateCompanyFromState } from '../../features/setup/setupThunks'

interface FoundingInfoForm {
  organizationType: string
  industryType: string
  teamSize: string
  yearOfEstablishment: Date | null
  website: string
  vision: string
}

const FoundingInfoPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { foundingInfo, companyId } = useAppSelector((state) => state.setup)

  const { register, handleSubmit, control } = useForm<FoundingInfoForm>({
    defaultValues: {
      organizationType: foundingInfo.organizationType,
      industryType: foundingInfo.industryType,
      teamSize: foundingInfo.teamSize,
      yearOfEstablishment: foundingInfo.yearOfEstablishment
        ? new Date(foundingInfo.yearOfEstablishment)
        : null,
      website: foundingInfo.website,
      vision: foundingInfo.vision,
    },
  })

  const organizationOptions = useMemo(
    () => ['Private Limited', 'Public Limited', 'Partnership', 'Startup'],
    [],
  )
  const industryOptions = useMemo(
    () => ['Technology', 'Finance', 'Healthcare', 'Education'],
    [],
  )
  const teamSizeOptions = useMemo(
    () => ['1-10', '11-50', '51-200', '200+'],
    [],
  )

  const onSubmit = async (values: FoundingInfoForm) => {
    dispatch(
      saveFoundingInfo({
        ...values,
        yearOfEstablishment: values.yearOfEstablishment
          ? values.yearOfEstablishment.toISOString()
          : null,
      }),
    )

    if (companyId) {
      try {
        await dispatch(updateCompanyFromState()).unwrap()
        toast.success('Founding info saved')
      } catch (error) {
        const message = typeof error === 'string' ? error : 'Unable to update founding info'
        toast.error(message)
        return
      }
    } else {
      toast.success('Founding info saved')
    }

    navigate('/setup/social')
  }

  return (
    <SetupLayout activeStep="founding">
      <Stack spacing={4} maxWidth={940} mx="auto">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField select label="Organization Type" {...register('organizationType')} fullWidth>
              {organizationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField select label="Industry Types" {...register('industryType')} fullWidth>
              {industryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField select label="Team Size" {...register('teamSize')} fullWidth>
              {teamSizeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              control={control}
              name="yearOfEstablishment"
              render={({ field }) => (
                <Box
                  sx={{
                    position: 'relative',
                    '& .react-datepicker-wrapper': { width: '100%' },
                    '& .react-datepicker__input-container input': {
                      width: '100%',
                      height: 56,
                      padding: '0 52px 0 20px',
                      borderRadius: '18px',
                      border: '1px solid #C5D4FF',
                      fontFamily: 'Poppins',
                      fontSize: 16,
                    },
                  }}
                >
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    customInput={<input />}
                  />
                  <CalendarMonthOutlinedIcon
                    sx={{
                      position: 'absolute',
                      right: 18,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#5C698B',
                      pointerEvents: 'none',
                    }}
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'relative' }}>
              <TextField
                {...register('website')}
                label="Company Website"
                placeholder="Website url..."
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LanguageOutlinedIcon sx={{ color: '#5C698B' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Stack spacing={1.5}>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            Company Vision
          </Typography>
          <TextField
            {...register('vision')}
            placeholder="Tell us about your company vision..."
            multiline
            minRows={8}
            fullWidth
            sx={{ borderRadius: '24px' }}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            onClick={() => navigate('/setup/company')}
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

export default FoundingInfoPage
