# Company Backend API Testing - PowerShell Script
# Make sure the server is running on http://localhost:4000

$baseUrl = "http://localhost:4000"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Company Backend API Testing" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# 1. Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
curl.exe $baseUrl/
Write-Host ""

# 2. Register User
Write-Host "2. Registering New User..." -ForegroundColor Yellow
$registerResponse = curl.exe -X POST "$baseUrl/api/auth/register" `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"testuser@example.com\",\"password\":\"password123\",\"full_name\":\"Test User\",\"gender\":\"m\",\"mobile_no\":\"+1234567890\",\"signup_type\":\"e\"}' `
  --silent
Write-Host $registerResponse
Write-Host ""

# 3. Login User
Write-Host "3. Logging In..." -ForegroundColor Yellow
$loginResponse = curl.exe -X POST "$baseUrl/api/auth/login" `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"testuser@example.com\",\"password\":\"password123\"}' `
  --silent
Write-Host $loginResponse

# Extract token (you'll need to copy this manually for next requests)
Write-Host ""
Write-Host "IMPORTANT: Copy the token from above response!" -ForegroundColor Green
Write-Host ""

# Store token (replace with actual token from login response)
$token = "PASTE_YOUR_TOKEN_HERE"

# 4. Get Company Profile (will be null initially)
Write-Host "4. Getting Company Profile..." -ForegroundColor Yellow
curl.exe -X GET "$baseUrl/api/company/profile" `
  -H "Authorization: Bearer $token" `
  --silent
Write-Host ""

# 5. Register Company
Write-Host "5. Registering Company..." -ForegroundColor Yellow
curl.exe -X POST "$baseUrl/api/company/register" `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer $token" `
  -d '{\"company_name\":\"Tech Innovations Inc\",\"address\":\"123 Business Street\",\"city\":\"San Francisco\",\"state\":\"California\",\"country\":\"USA\",\"postal_code\":\"94102\",\"website\":\"https://techinnovations.com\",\"industry\":\"Technology\",\"founded_date\":\"2020-01-15\",\"description\":\"Leading technology solutions provider\"}' `
  --silent
Write-Host ""

# 6. Get Company Profile (should have data now)
Write-Host "6. Getting Updated Company Profile..." -ForegroundColor Yellow
curl.exe -X GET "$baseUrl/api/company/profile" `
  -H "Authorization: Bearer $token" `
  --silent
Write-Host ""

# 7. Update Company Profile
Write-Host "7. Updating Company Profile..." -ForegroundColor Yellow
curl.exe -X PUT "$baseUrl/api/company/profile" `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer $token" `
  -d '{\"company_name\":\"Tech Innovations International\",\"description\":\"Global technology solutions provider\"}' `
  --silent
Write-Host ""

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Testing Complete!" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
