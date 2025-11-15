import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F7CFF',
      light: '#74A3FF',
      dark: '#2D5AE2',
    },
    secondary: {
      main: '#7A5CFF',
    },
    background: {
      default: '#F2F6FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0A1440',
      secondary: '#5C698B',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
        notchedOutline: {
          borderColor: '#C5D4FF',
        },
      },
    },
  },
})

export default theme
