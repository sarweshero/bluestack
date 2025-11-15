import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import setupReducer from '../features/setup/setupSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    setup: setupReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
