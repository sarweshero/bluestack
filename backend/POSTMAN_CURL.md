# Postman cURL Commands - Ready to Import

## Method 1: Import cURL Directly into Postman

### 1. Register User
```bash
curl --location 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User",
    "gender": "m",
    "mobile_no": "+1234567890"
}'
```

**To Import:**
1. Open Postman
2. Click **Import** button (top left)
3. Select **Raw text** tab
4. Paste the cURL command above
5. Click **Import**

---

### 2. Login User
```bash
curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@example.com",
    "password": "password123"
}'
```

---

### 3. Verify Email
```bash
curl --location 'http://localhost:5000/api/auth/verify-email?email=test@example.com'
```

---

### 4. Get Company Profile (Replace YOUR_TOKEN with actual token from login)
```bash
curl --location 'http://localhost:5000/api/company/profile' \
--header 'Authorization: Bearer YOUR_TOKEN'
```

---

### 5. Register Company (Replace YOUR_TOKEN)
```bash
curl --location 'http://localhost:5000/api/company/register' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--data-raw '{
    "company_name": "Tech Innovations Inc",
    "address": "123 Business Street",
    "city": "San Francisco",
    "state": "California",
    "country": "USA",
    "postal_code": "94102",
    "website": "https://techinnovations.com",
    "industry": "Technology",
    "founded_date": "2020-01-15",
    "description": "Leading technology solutions provider"
}'
```

---

### 6. Update Company Profile (Replace YOUR_TOKEN)
```bash
curl --location --request PUT 'http://localhost:5000/api/company/profile' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--data-raw '{
    "company_name": "Tech Innovations International",
    "description": "Global technology solutions provider"
}'
```

---

### 7. Upload Logo (Replace YOUR_TOKEN and file path)
```bash
curl --location 'http://localhost:5000/api/company/upload-logo' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--form 'file=@"/path/to/your/logo.png"'
```

---

### 8. Upload Banner (Replace YOUR_TOKEN and file path)
```bash
curl --location 'http://localhost:5000/api/company/upload-banner' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--form 'file=@"/path/to/your/banner.jpg"'
```

---

## Method 2: Quick Import All at Once

Copy this entire collection and import into Postman:

```bash
# Health Check
curl --location 'http://localhost:5000/'

# Register User
curl --location 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"user1@test.com","password":"password123","full_name":"User One","gender":"f","mobile_no":"+1234567890"}'

# Login User
curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"user1@test.com","password":"password123"}'
```

---

## 📋 How to Import into Postman:

### Option A: Import Single cURL
1. Copy ONE cURL command above
2. Open Postman → Click **Import**
3. Select **Raw text** tab
4. Paste the cURL
5. Click **Import**
6. Request will appear in your collection

### Option B: Import Collection JSON (See POSTMAN_COLLECTION.json)
1. Go to Postman → **Import**
2. Click **Upload Files**
3. Select `POSTMAN_COLLECTION.json` from the `docs` folder
4. Click **Import**

---

## 🎯 Testing Flow:

**Step 1:** Import and run Register cURL
```bash
curl --location 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"test@example.com","password":"password123","full_name":"Test User","gender":"m","mobile_no":"+1234567890"}'
```

**Step 2:** Import and run Login cURL (copy the token from response)
```bash
curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"test@example.com","password":"password123"}'
```

**Step 3:** Replace `YOUR_TOKEN` in company requests with the token from Step 2

---

## 💡 Note:
- All requests use `http://localhost:5000` (not 4000)
- After login, save the `token` from the response
- Use that token in the `Authorization: Bearer YOUR_TOKEN` header
- For file uploads, replace `/path/to/your/file.png` with actual file path
