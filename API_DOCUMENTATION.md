# API Documentation - Leo Club Website

## Authentication System

### Overview
The website uses **NextAuth.js** for authentication with credential-based login.

### Auth Endpoints

#### 1. **POST /api/auth/callback/credentials**
Login with email and password

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "member"
  }
}
```

#### 2. **GET /api/auth/session**
Get current user session

**Response:**
```json
{
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "member"
  },
  "expires": "..."
}
```

#### 3. **POST /api/auth/signout**
Logout current user

---

## User Management

### POST /api/register
Register new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "0771234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully"
}
```

---

## User Data

### GET /api/user/stats
Get logged-in user's statistics (Protected Route)

**Headers:**
```
Cookie: next-auth.session-token=...
```

**Response:**
```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member",
    "membershipNumber": "LCPP-123456"
  },
  "stats": {
    "projectsParticipated": 12,
    "serviceHours": 45,
    "eventsAttended": 20,
    "monthsMember": 24
  },
  "upcomingEvents": [...],
  "recentActivities": [...]
}
```

---

## Middleware & Protection

### Authentication Middleware
All protected routes use `getServerSession(authOptions)` to verify authentication.

**Protected Routes:**
- `/dashboard` - Member dashboard
- `/api/user/*` - User data endpoints
- `/api/admin/*` - Admin-only endpoints (coming soon)

### Role-Based Access
- **Admin**: Full access to all features
- **Officer**: Access to member features + some management tools
- **Member**: Basic member features

---

## Current API Structure

```
/api
├── /auth
│   └── /[...nextauth]
│       └── route.ts          # NextAuth handler
├── /register
│   └── route.ts              # User registration
└── /user
    └── /stats
        └── route.ts          # User statistics
```

---

## Error Handling

All APIs return standard error responses:

**401 Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## Testing

### Test Authentication
```bash
# Login
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"leo.thavishab@gmail.com","password":"Leo@2026"}'

# Get Session
curl http://localhost:3000/api/auth/session
```

### Test User Stats
```bash
# Must be authenticated first
curl http://localhost:3000/api/user/stats \
  -H "Cookie: next-auth.session-token=..."
```

---

## Next.js App Router Features

- ✅ **Server Components** - Fast rendering
- ✅ **Route Handlers** - API endpoints
- ✅ **Middleware** - Authentication checks
- ✅ **Server Actions** - Form submissions (future)

---

**Status:** ✅ All current APIs are working correctly!
