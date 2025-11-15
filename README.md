# Jobpilot Employer Portal (Front-end)

Pixel-perfect implementation of the Jobpilot employer onboarding, verification, and dashboard experience using **React 19 + Vite** with **Redux Toolkit**, **React Query**, and **MUI**. The UI mirrors the provided Figma screens for login, registration, OTP verification, four-step company setup, completion state, and the dashboard settings view.

> **What's new:** The front-end now calls the Company Registration Backend (register/login, OTP verification, company profile CRUD, logo/banner uploads). Configure `VITE_API_BASE_URL` to point at your API (e.g. `http://localhost:5000`).

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
- **Axios** service layer in `src/services` wired to auth + company endpoints, auto-attaching bearer tokens
- **Firebase Auth** placeholders remain for real OTP flow (`src/config/firebase.ts`)

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
VITE_API_BASE_URL=http://localhost:5000
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

1. Connect Firebase Phone Auth to obtain the `firebaseUid` required by `/api/auth/verify-mobile` (currently the entered OTP value is sent; swap with the verified UID when Firebase is ready).
2. Extend validation + error surfaces as real backend rules become available (e.g. stronger password policy, address breakdown).
3. Replace placeholder gradients/images with production assets.
4. Expand Redux/React Query coverage for additional backend modules (e.g. dashboard widgets, team management).
