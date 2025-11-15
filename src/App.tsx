import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'
import { useAppDispatch } from './store/hooks'
import { hydrateSession } from './features/auth/authSlice'
import { fetchCompanyProfile } from './features/setup/setupThunks'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(hydrateSession())
    if (typeof window !== 'undefined' && window.localStorage.getItem('auth_token')) {
      dispatch(fetchCompanyProfile())
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
    </BrowserRouter>
  )
}

export default App
