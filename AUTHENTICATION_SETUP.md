# Authentication & Database Setup Guide

## 🔧 Installation

Install the required package for password hashing:

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB on your machine
2. Start MongoDB service
3. Create `.env.local` file with:
```
MONGODB_URI=mongodb://localhost:27017/leo_club
NEXTAUTH_SECRET=your-secret-key-generate-using-openssl
NEXTAUTH_URL=http://localhost:3000
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string
4. Create `.env.local` file with:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leo_club?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-secret-key-generate-using-openssl
NEXTAUTH_URL=http://localhost:3000
```

## 🔐 Generate Secret Key

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Copy the output and use it as NEXTAUTH_SECRET in your `.env.local` file.

## 📝 Create First Admin User

Use this script to create your first admin user. Create a file `scripts/createAdmin.ts`:

```typescript
import { createUser } from '../lib/userService';

async function createAdmin() {
  const admin = await createUser({
    name: 'Admin User',
    email: 'admin@leopannipitiyaparadise.org',
    password: 'admin123',  // Change this!
    role: 'admin',
    phone: '',
    membershipNumber: 'ADMIN001',
    joinedDate: new Date(),
    active: true,
  });

  console.log('Admin created:', admin);
}

createAdmin().catch(console.error);
```

Run it with:
```bash
npx tsx scripts/createAdmin.ts
```

## 🚀 Testing Authentication

1. Start the dev server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/login`

3. Login with your admin credentials

4. You'll be redirected to `/dashboard`

## 📁 Files Created

### Core Files:
- `/lib/models.ts` - Database models (User, Project, Donation)
- `/lib/userService.ts` - User management functions
- `/lib/auth.ts` - NextAuth configuration
- `/lib/mongodb.ts` - MongoDB connection

### API Routes:
- `/app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- `/app/api/register/route.ts` - User registration endpoint

### Pages:
- `/app/login/page.tsx` - Login page with NextAuth integration
- `/app/dashboard/page.tsx` - Protected member dashboard

### Components:
- `/components/AuthProvider.tsx` - Session provider wrapper

## 🔒 Features Implemented

✅ User authentication with NextAuth
✅ Password hashing with bcrypt
✅ MongoDB integration
✅ Protected routes
✅ Session management (JWT)
✅ User registration API
✅ Member dashboard
✅ Role-based access (member/admin/officer)

## 📊 Database Collections

### users
- name, email, password (hashed)
- role (member/admin/officer)
- membershipNumber, phone
- joinedDate, active status
- timestamps

### projects (to be used)
- title, date, description
- category, images, participants
- year, impact
- created by user

### donations (to be used)
- donorName, email, amount
- message, paymentStatus
- timestamps

## 🔐 Security Features

- Passwords are hashed with bcrypt (10 salt rounds)
- JWT sessions (30 day expiry)
- Protected API routes
- Email validation
- Password minimum length (6 characters)
- Active/inactive user status

## 📝 Next Steps

1. **Install dependencies**: `npm install bcryptjs @types/bcryptjs`
2. **Setup MongoDB** (local or Atlas)
3. **Create .env.local** with credentials
4. **Create first admin user**
5. **Test login** at /login
6. **Customize dashboard** with real data

## 🎨 Customization

- Update dashboard stats with real data from MongoDB
- Add project management for admins
- Implement password reset functionality
- Add email verification
- Create member profile editing
- Add file upload for profile pictures
