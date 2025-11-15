-- Company Backend Database Schema for Supabase
-- Run this SQL in Supabase SQL Editor

-- ============================================
-- Users Table
-- ============================================
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

-- ============================================
-- Company Profile Table
-- ============================================
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

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile_no);
CREATE INDEX IF NOT EXISTS idx_company_owner ON company_profile(owner_id);

-- ============================================
-- Updated At Trigger Function
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- Apply Triggers
-- ============================================
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_company_updated_at ON company_profile;
CREATE TRIGGER update_company_updated_at 
    BEFORE UPDATE ON company_profile 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Verification
-- ============================================
SELECT 'Users table created' as status WHERE EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'users'
);

SELECT 'Company profile table created' as status WHERE EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'company_profile'
);
