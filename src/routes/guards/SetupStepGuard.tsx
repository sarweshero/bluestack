import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAppSelector } from '../../store/hooks'
import type { SetupStepKey } from '../../types/setup'

interface SetupStepGuardProps {
  step: SetupStepKey
  children: ReactElement
}

const stepOrder: SetupStepKey[] = ['company', 'founding', 'social', 'contact']
const stepPathMap: Record<SetupStepKey, string> = {
  company: '/setup/company',
  founding: '/setup/founding',
  social: '/setup/social',
  contact: '/setup/contact',
}

const SetupStepGuard = ({ step, children }: SetupStepGuardProps) => {
  const { isComplete, currentStep } = useAppSelector((state) => state.setup)
  const { otpVerified, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!otpVerified) {
    return <Navigate to="/verify-otp" replace />
  }

  if (isComplete) {
    return <Navigate to="/setup/complete" replace />
  }

  const currentIdx = stepOrder.indexOf(currentStep)
  const requiredIdx = stepOrder.indexOf(step)

  if (requiredIdx > currentIdx) {
    return <Navigate to={stepPathMap[currentStep]} replace />
  }

  return children
}

export default SetupStepGuard
