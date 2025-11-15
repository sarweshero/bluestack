# Quick cURL Commands - Copy & Paste

## 🔥 Quick Start (PowerShell)

### 1️⃣ Health Check
```powershell
curl http://localhost:4000/
```

### 2️⃣ Register User
```powershell
curl.exe -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"password123\",\"full_name\":\"Test User\",\"gender\":\"m\",\"mobile_no\":\"+1234567890\"}'
```

### 3️⃣ Login (Copy the token from response!)
```powershell
curl.exe -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

### 4️⃣ Set Token Variable (Replace with your actual token)
```powershell
$token = "PASTE_TOKEN_HERE"
```

### 5️⃣ Get Company Profile
```powershell
curl.exe -X GET http://localhost:4000/api/company/profile -H "Authorization: Bearer $token"
```

### 6️⃣ Register Company
```powershell
curl.exe -X POST http://localhost:4000/api/company/register -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d '{\"company_name\":\"My Company\",\"address\":\"123 Main St\",\"city\":\"New York\",\"state\":\"NY\",\"country\":\"USA\",\"postal_code\":\"10001\",\"industry\":\"Technology\"}'
```

### 7️⃣ Update Company Profile
```powershell
curl.exe -X PUT http://localhost:4000/api/company/profile -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d '{\"company_name\":\"Updated Company Name\",\"description\":\"Updated description\"}'
```

### 8️⃣ Upload Logo (Replace with your file path)
```powershell
curl.exe -X POST http://localhost:4000/api/company/upload-logo -H "Authorization: Bearer $token" -F "file=@C:\path\to\logo.png"
```

### 9️⃣ Upload Banner
```powershell
curl.exe -X POST http://localhost:4000/api/company/upload-banner -H "Authorization: Bearer $token" -F "file=@C:\path\to\banner.jpg"
```

### 🔟 Verify Email
```powershell
curl.exe "http://localhost:4000/api/auth/verify-email?email=test@example.com"
```

---

## 🎯 One-Liner Tests

### Complete Registration Flow
```powershell
# Register
curl.exe -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{\"email\":\"user1@test.com\",\"password\":\"pass12345\",\"full_name\":\"User One\",\"gender\":\"f\",\"mobile_no\":\"+9876543210\"}'

# Login and save token
$loginResp = curl.exe -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{\"email\":\"user1@test.com\",\"password\":\"pass12345\"}' | ConvertFrom-Json
$token = $loginResp.token

# Register company
curl.exe -X POST http://localhost:4000/api/company/register -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d '{\"company_name\":\"ABC Corp\",\"address\":\"456 Oak Ave\",\"city\":\"Boston\",\"state\":\"MA\",\"country\":\"USA\",\"postal_code\":\"02101\",\"industry\":\"Finance\"}'

# Get profile
curl.exe -X GET http://localhost:4000/api/company/profile -H "Authorization: Bearer $token"
```

---

## 🧪 Test Different Scenarios

### Invalid Email
```powershell
curl.exe -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{\"email\":\"not-an-email\",\"password\":\"password123\",\"full_name\":\"Test\",\"gender\":\"m\",\"mobile_no\":\"+1234567890\"}'
```

### Short Password
```powershell
curl.exe -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{\"email\":\"test@test.com\",\"password\":\"123\",\"full_name\":\"Test\",\"gender\":\"m\",\"mobile_no\":\"+1234567890\"}'
```

### Missing Required Fields
```powershell
curl.exe -X POST http://localhost:4000/api/company/register -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d '{\"company_name\":\"Test Co\"}'
```

### No Authorization Header
```powershell
curl.exe -X GET http://localhost:4000/api/company/profile
```

### Invalid Token
```powershell
curl.exe -X GET http://localhost:4000/api/company/profile -H "Authorization: Bearer invalid_token_xyz"
```

---

## 💡 Tips

1. **Save your token**: After login, save the token in a variable:
   ```powershell
   $token = "your_jwt_token_here"
   ```

2. **Pretty JSON output**: Pipe to `jq` if installed:
   ```powershell
   curl.exe http://localhost:4000/ | jq
   ```

3. **Run the automated script**:
   ```powershell
   .\test-api.ps1
   ```

4. **Check server logs**: Watch your server terminal for request logs

5. **Use different emails**: For multiple test users, change the email each time
