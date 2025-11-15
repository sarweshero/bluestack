# How to Fix the JSON Error in Postman

## The Problem
You're getting a JSON parse error because the body format is incorrect.

## Solution - Step by Step:

### Step 1: In Postman, go to the Body tab
1. Click on **Body** tab (below the URL bar)
2. Select **raw** radio button
3. From the dropdown on the right, select **JSON** (NOT Text!)

### Step 2: Clear everything in the body field and paste this EXACT text:

```
{
  "email": "test@example.com",
  "password": "password123",
  "full_name": "Test User",
  "gender": "m",
  "mobile_no": "+1234567890"
}
```

### Step 3: Make sure your request settings are:
- **Method**: POST
- **URL**: http://localhost:3000/api/auth/register
- **Headers** tab should show:
  - Content-Type: application/json (this is added automatically when you select JSON)

### Step 4: Click Send

---

## ⚠️ Common Mistakes:

❌ **WRONG** - Don't use this format (this is for cURL, not Postman):
```
{\"email\":\"test@example.com\",\"password\":\"password123\"...}
```

❌ **WRONG** - Don't select "Text" from dropdown
❌ **WRONG** - Don't add extra quotes or backslashes

✅ **CORRECT** - Use clean JSON with proper formatting:
```json
{
  "email": "test@example.com",
  "password": "password123",
  "full_name": "Test User",
  "gender": "m",
  "mobile_no": "+1234567890"
}
```

---

## Quick Visual Check:
Your Postman should look like this:

```
POST http://localhost:3000/api/auth/register

Params | Authorization | Headers | Body | Pre-request Script | Tests | Settings
                                   [●] none
                                   [●] form-data
                                   [●] x-www-form-urlencoded
                                   [●] raw              [JSON ▼]
                                   [ ] binary
                                   [ ] GraphQL

{
  "email": "test@example.com",
  "password": "password123",
  "full_name": "Test User",
  "gender": "m",
  "mobile_no": "+1234567890"
}
```

The dropdown next to 'raw' MUST say **JSON** (orange color), not Text!
