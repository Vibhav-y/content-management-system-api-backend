# API Endpoints

## Authentication Routes

### Signup Initiation
**Endpoint:** `POST /signup/initiate`

**Description:** Initiates the signup process by generating and sending an OTP to the provided email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP generated successfully",
  "otp": "123456",
  "expiresIn": "5 minutes"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email is required"
}
```
or
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### Verify Signup OTP
**Endpoint:** `POST /signup/verify`

**Description:** Verifies the OTP and completes user registration.

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "name": "John Doe",
  "password": "securePassword123",
  "role": "viewer"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User signed up successfully",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

### Login
**Endpoint:** `POST /login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt.token.here",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "viewer"
  }
}
```

---

## Notes

- All endpoints are now accessible at the root level (no `/auth` prefix)
- OTP expires after 5 minutes
- Passwords are automatically hashed using bcrypt
- Available roles: `admin`, `editor`, `viewer` (default: `viewer`)
