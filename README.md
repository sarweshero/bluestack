# Jobpilot Employer Portal (Front-end)

Pixel-perfect implementation of the Jobpilot employer onboarding, verification, and dashboard experience using **React 19 + Vite** with **Redux Toolkit**, **React Query**, and **MUI**. The UI mirrors the provided Figma screens for login, registration, OTP verification, four-step company setup, completion state, and the dashboard settings view.

## Getting Started

```bash
npm install
npm run dev
```

- Dev server: `http://localhost:5173`
- Production build: `npm run build`
- Preview production build: `npm run preview`

## Tech Stack

- **React 19 / Vite / TypeScript**
- **Redux Toolkit** for auth + setup state, typed hooks in `src/store`
- **@tanstack/react-query** for future data fetching, pre-wired in `main.tsx`
- **MUI 6** + custom theme (`src/styles/theme.ts`) for pixel-perfect styling
- **react-hook-form** powering every form + stepper
- **react-phone-input-2**, **react-datepicker**, **react-toastify** integrated as in designs
- **Firebase Auth** and **Axios/Cloudinary** placeholders prepared for API wiring (`src/config/firebase.ts`, `src/services/apiClient.ts`)

## Project Structure

```
src/
  components/      // Shared layouts, upload cards, guards, etc.
  config/          // Firebase bootstrap
  features/        // Redux slices for auth, setup, ui
  pages/           // Route-aligned screens (auth, setup, dashboard)
  routes/          // Router + guards
  services/        // Axios client
  store/           // Redux store + typed hooks
  styles/          // Theme + global styles
  types/           // Shared TypeScript contracts
```

Key flows:

- `LoginPage` / `RegisterPage` match auth designs with gradient art panel and interactive pieces.
- `OtpVerificationPage` mimics modal verification card with resend + close actions.
- `SetupLayout` orchestrates the four setup sections with automatic progress and step icons.
- `SettingsPage` under dashboard lets employers edit every setup section post-completion.

## Environment Variables

Copy `.env.example` (add one if missing) with the following keys before integrating real services:

```
VITE_API_BASE_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Available Scripts

- `npm run dev` – start Vite dev server with hot reload
- `npm run build` – type-check + create production bundle
- `npm run preview` – serve built assets locally
- `npm run lint` – run ESLint across the codebase

## Next Steps

1. Hook the prepared Firebase auth helpers for real login/register/OTP.
2. Wire API endpoints via React Query + Axios (`apiClient`).
3. Replace placeholder gradients/images with real assets.
4. Expand Redux slices or React Query cache as backend contracts solidify.
