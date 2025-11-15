# API Testing Guide - cURL Commands

Base URL: `http://localhost:4000`

## 1. Health Check

### Check if server is running
```bash
curl http://localhost:4000/
```

---

## 2. Authentication APIs

### 2.1 Register New User
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"john.doe@example.com\",
    \"password\": \"password123\",
    \"full_name\": \"John Doe\",
    \"gender\": \"m\",
    \"mobile_no\": \"+1234567890\",
    \"signup_type\": \"e\"
  }"
```

**PowerShell Version:**
```powershell
curl.exe -X POST http://localhost:4000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"john.doe@example.com\",\"password\":\"password123\",\"full_name\":\"John Doe\",\"gender\":\"m\",\"mobile_no\":\"+1234567890\",\"signup_type\":\"e\"}'
```

### 2.2 Login User
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"john.doe@example.com\",
    \"password\": \"password123\"
  }"
```

**PowerShell Version:**
```powershell
curl.exe -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"john.doe@example.com\",\"password\":\"password123\"}'
```

**Save the token from response for authenticated requests!**

### 2.3 Verify Mobile (Firebase UID required)
```bash
curl -X POST http://localhost:4000/api/auth/verify-mobile \
  -H "Content-Type: application/json" \
  -d "{
    \"uid\": \"firebase_uid_here\"
  }"
```

### 2.4 Verify Email
```bash
curl "http://localhost:4000/api/auth/verify-email?email=john.doe@example.com"
```

---

## 3. Company Profile APIs

**Note:** Replace `YOUR_JWT_TOKEN` with the actual token received from login.

### 3.1 Register Company Profile
```bash
curl -X POST http://localhost:4000/api/company/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d "{
    \"company_name\": \"Tech Innovations Inc\",
    \"address\": \"123 Business Street\",
    \"city\": \"San Francisco\",
    \"state\": \"California\",
    \"country\": \"USA\",
    \"postal_code\": \"94102\",
    \"website\": \"https://techinnovations.com\",
    \"industry\": \"Technology\",
    \"founded_date\": \"2020-01-15\",
    \"description\": \"Leading technology solutions provider\",
    \"social_links\": {
      \"linkedin\": \"https://linkedin.com/company/techinnovations\",
      \"twitter\": \"https://twitter.com/techinnovations\"
    }
  }"
```

**PowerShell Version:**
```powershell
$token = "YOUR_JWT_TOKEN"
curl.exe -X POST http://localhost:4000/api/company/register `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer $token" `
  -d '{\"company_name\":\"Tech Innovations Inc\",\"address\":\"123 Business Street\",\"city\":\"San Francisco\",\"state\":\"California\",\"country\":\"USA\",\"postal_code\":\"94102\",\"website\":\"https://techinnovations.com\",\"industry\":\"Technology\",\"founded_date\":\"2020-01-15\",\"description\":\"Leading technology solutions provider\"}'
```

### 3.2 Get Company Profile
```bash
curl -X GET http://localhost:4000/api/company/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**PowerShell Version:**
```powershell
curl.exe -X GET http://localhost:4000/api/company/profile `
  -H "Authorization: Bearer $token"
```

### 3.3 Update Company Profile
```bash
curl -X PUT http://localhost:4000/api/company/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d "{
    \"company_name\": \"Tech Innovations International\",
    \"description\": \"Global technology solutions provider\",
    \"website\": \"https://techinnovations-global.com\"
  }"
```

**PowerShell Version:**
```powershell
curl.exe -X PUT http://localhost:4000/api/company/profile `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer $token" `
  -d '{\"company_name\":\"Tech Innovations International\",\"description\":\"Global technology solutions provider\"}'
```

### 3.4 Upload Company Logo
```bash
curl -X POST http://localhost:4000/api/company/upload-logo \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/logo.png"
```

**PowerShell Version:**
```powershell
curl.exe -X POST http://localhost:4000/api/company/upload-logo `
  -H "Authorization: Bearer $token" `
  -F "file=@C:\path\to\logo.png"
```

### 3.5 Upload Company Banner
```bash
curl -X POST http://localhost:4000/api/company/upload-banner \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/banner.jpg"
```

**PowerShell Version:**
```powershell
curl.exe -X POST http://localhost:4000/api/company/upload-banner `
  -H "Authorization: Bearer $token" `
  -F "file=@C:\path\to\banner.jpg"
```

---

## 4. Complete Test Workflow

### Step 1: Register a new user
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test12345","full_name":"Test User","gender":"m","mobile_no":"+1234567890"}'
```

### Step 2: Login and get token
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test12345"}'
```

### Step 3: Use the token to register company
```bash
# Replace TOKEN_FROM_STEP_2 with actual token
curl -X POST http://localhost:4000/api/company/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_FROM_STEP_2" \
  -d '{"company_name":"Test Company","address":"123 Test St","city":"Test City","state":"Test State","country":"Test Country","postal_code":"12345","industry":"Technology"}'
```

### Step 4: Get company profile
```bash
curl -X GET http://localhost:4000/api/company/profile \
  -H "Authorization: Bearer TOKEN_FROM_STEP_2"
```

---

## 5. Import to Postman

You can import this collection to Postman using the following JSON:

1. Open Postman
2. Click "Import" button
3. Paste the content from `POSTMAN_COLLECTION.json` (create this file separately)
4. Set up environment variable `{{baseUrl}}` = `http://localhost:4000`
5. Set up environment variable `{{token}}` after login

---

## Error Testing

### Test with invalid email
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid-email","password":"test12345","full_name":"Test","gender":"m","mobile_no":"+1234567890"}'
```

### Test with short password
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"short","full_name":"Test","gender":"m","mobile_no":"+1234567890"}'
```

### Test without authentication
```bash
curl -X GET http://localhost:4000/api/company/profile
```

### Test with invalid token
```bash
curl -X GET http://localhost:4000/api/company/profile \
  -H "Authorization: Bearer invalid_token"
```

---

## Notes

- Replace `YOUR_JWT_TOKEN` with the actual token from login response
- Replace file paths with actual paths to your images
- Ensure the server is running on port 4000
- Make sure PostgreSQL, Firebase, and Cloudinary are properly configured
- Phone numbers must be in international format (e.g., +1234567890)
- Gender values: `m` (male), `f` (female), `o` (other)
