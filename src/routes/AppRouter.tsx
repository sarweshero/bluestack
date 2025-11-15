import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import OtpVerificationPage from '../pages/auth/OtpVerificationPage'
import CompanyInfoPage from '../pages/setup/CompanyInfoPage'
import FoundingInfoPage from '../pages/setup/FoundingInfoPage'
import SocialMediaPage from '../pages/setup/SocialMediaPage'
import ContactInfoPage from '../pages/setup/ContactInfoPage'
import SetupCompletePage from '../pages/setup/SetupCompletePage'
import SettingsPage from '../pages/dashboard/SettingsPage'
import ProtectedRoute from './guards/ProtectedRoute'
import SetupStepGuard from './guards/SetupStepGuard'
import { useAppSelector } from '../store/hooks'

const AppRouter = () => {
  const { isAuthenticated, otpVerified } = useAppSelector((state) => state.auth)
  const setupState = useAppSelector((state) => state.setup)

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={setupState.isComplete ? '/dashboard/settings' : '/setup/company'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/verify-otp"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && !otpVerified && !setupState.isComplete}
            redirectPath={isAuthenticated ? '/setup/company' : '/login'}
          >
            <OtpVerificationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setup/company"
        element={
          <SetupStepGuard step="company">
            <CompanyInfoPage />
          </SetupStepGuard>
        }
      />
      <Route
        path="/setup/founding"
        element={
          <SetupStepGuard step="founding">
            <FoundingInfoPage />
          </SetupStepGuard>
        }
      />
      <Route
        path="/setup/social"
        element={
          <SetupStepGuard step="social">
            <SocialMediaPage />
          </SetupStepGuard>
        }
      />
      <Route
        path="/setup/contact"
        element={
          <SetupStepGuard step="contact">
            <ContactInfoPage />
          </SetupStepGuard>
        }
      />
      <Route
        path="/setup/complete"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && otpVerified && setupState.isComplete}
            redirectPath={isAuthenticated ? '/setup/company' : '/login'}
          >
            <SetupCompletePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && otpVerified && setupState.isComplete}
            redirectPath={isAuthenticated ? '/setup/company' : '/login'}
          >
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
