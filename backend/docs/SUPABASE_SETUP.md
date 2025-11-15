# Setting Up Supabase for PostgreSQL Database

## Step 1: Create a Supabase Account

1. Go to https://supabase.com
2. Click **Start your project**
3. Sign up with GitHub, Google, or Email
4. Create a new organization (or use existing)

## Step 2: Create a New Project

1. Click **New Project**
2. Fill in:
   - **Name**: `company-backend` (or any name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to you (e.g., US East, Europe West)
   - **Pricing Plan**: Free (includes PostgreSQL)
3. Click **Create new project**
4. Wait 2-3 minutes for setup to complete

## Step 3: Get Database Connection Details

1. In your Supabase project dashboard, click **Settings** (gear icon in left sidebar)
2. Click **Database** in the settings menu
3. Scroll to **Connection String** section
4. Copy the **URI** connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```

## Step 4: Create Database Tables

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste this SQL and click **Run**:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    signup_type VARCHAR(10) DEFAULT 'e',
    gender VARCHAR(1) CHECK (gender IN ('m', 'f', 'o')),
    mobile_no VARCHAR(20),
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_mobile_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create company_profile table
CREATE TABLE IF NOT EXISTS company_profile (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    website VARCHAR(255),
    logo_url TEXT,
    banner_url TEXT,
    industry VARCHAR(100) NOT NULL,
    founded_date DATE,
    description TEXT,
    social_links JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_company_owner ON company_profile(owner_id);
```

## Step 5: Update Your .env File

Extract the details from your connection string:
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

Update your `.env` file with these values:

```env
# Postgres (Supabase)
PGHOST=db.xxxxxxxxxxxxx.supabase.co
PGPORT=5432
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=your_database_password_here
```

**Example:**
If your connection string is:
```
postgresql://postgres:MyPass123@db.abcdefghijk.supabase.co:5432/postgres
```

Then your .env should have:
```env
PGHOST=db.abcdefghijk.supabase.co
PGPORT=5432
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=MyPass123
```

## Step 6: Remove Mock Database

Once Supabase is configured, the app will automatically connect to the real database instead of the mock one.

## Step 7: Restart Your Server

```bash
npm start
```

You should see:
```
✅ PostgreSQL connected successfully
Server listening on port 5000
```

## 🎯 Quick Verification

Test in Postman:
```
POST http://localhost:5000/api/auth/register
```

Data will now persist in Supabase! You can view it in:
- Supabase Dashboard → **Table Editor** → `users` table

## 📊 View Your Data

In Supabase:
1. Click **Table Editor** (left sidebar)
2. Select `users` or `company_profile` table
3. See all registered users and companies!

## 🔒 Security Note

- Never commit `.env` file to Git (already in `.gitignore`)
- Keep your database password secure
- Supabase provides SSL encryption by default

## 💡 Free Tier Limits

Supabase Free Tier includes:
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth
- Unlimited API requests
- Perfect for development and small projects!

## 🆘 Troubleshooting

**Connection Error:**
- Check if PGHOST has `db.` prefix
- Verify password has no typos
- Ensure Supabase project is fully initialized (wait 2-3 min)

**SSL Error:**
- Supabase uses SSL by default, already configured in the app
