# Company Registration & Verification - Backend

This repository is a scaffolded Node.js + Express backend implementing the APIs described in the uploaded assignment PDF:
- User registration, login (Firebase + JWT), email & mobile verification
- Company profile create/read/update, image uploads to Cloudinary
- PostgreSQL database integration

Important: Fill `.env` from `.env.example` and import the provided `company_db.sql` into your local Postgres before running.

## Setup

```bash
npm install
cp .env.example .env
# edit .env with your configuration
```

## Run Development Server

```bash
npm run dev
```

## Run Production Server

```bash
npm start
```

## Run Tests

```bash
npm test
```
