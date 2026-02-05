# 🚀 Developer Quick Reference Guide

Quick reference for working with the LCPP Website codebase.

## 📍 Where to Find Things

### Need to add a new page?
- **Public page**: Create `app/page-name/page.tsx`
- **Member page**: Create in `app/page-name/` (add auth check)
- **Admin page**: Create in `app/admin/feature-name/page.tsx`

### Need to create an API endpoint?
- **Location**: `app/api/resource-name/route.ts`
- **Methods**: Export `GET`, `POST`, `PUT`, `DELETE` functions
- **Dynamic routes**: Use `[id]` folder for single resource operations

### Need to add a component?
- **Location**: `components/ComponentName.tsx`
- **Export**: Use default export
- **Import**: `import Component from '@/components/ComponentName'`

### Need to add database logic?
- **Models**: Add to `lib/models.ts`
- **Services**: Add to `lib/userService.ts` or create new service file
- **Connection**: Use `lib/mongodb.ts` connection

## 🛠️ Common Tasks

### Adding a New Feature

#### 1. Database Model (if needed)
```typescript
// lib/models.ts
export interface NewFeature {
  _id?: ObjectId;
  name: string;
  description: string;
  createdAt: Date;
}
```

#### 2. API Route
```typescript
// app/api/features/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('leo_club');
  const features = await db.collection('features').find({}).toArray();
  return NextResponse.json(features);
}

export async function POST(request: Request) {
  const data = await request.json();
  const client = await clientPromise;
  const db = client.db('leo_club');
  const result = await db.collection('features').insertOne(data);
  return NextResponse.json({ id: result.insertedId });
}
```

#### 3. Page Component
```typescript
// app/features/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function FeaturesPage() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch('/api/features')
      .then(res => res.json())
      .then(data => setFeatures(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Features</h1>
      {/* Your UI here */}
    </div>
  );
}
```

### Protecting a Route

```typescript
// app/protected-page/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  // Admin only
  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return <div>Protected Content</div>;
}
```

### Adding Authentication to API

```typescript
// app/api/protected/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Your protected logic here
  return NextResponse.json({ data: 'Protected data' });
}
```

## 📝 Code Patterns

### Database Query Pattern
```typescript
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const client = await clientPromise;
const db = client.db('leo_club');

// Find all
const items = await db.collection('collection_name').find({}).toArray();

// Find one
const item = await db.collection('collection_name').findOne({ _id: new ObjectId(id) });

// Insert
const result = await db.collection('collection_name').insertOne(data);

// Update
const result = await db.collection('collection_name').updateOne(
  { _id: new ObjectId(id) },
  { $set: data }
);

// Delete
const result = await db.collection('collection_name').deleteOne({ _id: new ObjectId(id) });
```

### Session Access (Client Component)
```typescript
'use client';
import { useSession } from 'next-auth/react';

export default function ClientComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Please log in</div>;

  return <div>Welcome, {session?.user?.name}</div>;
}
```

### Session Access (Server Component)
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {session.user.name}</div>;
}
```

## 🎨 Styling Patterns

### Container
```tsx
<div className="container mx-auto px-4 py-8">
  {/* Content */}
</div>
```

### Card
```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  {/* Card content */}
</div>
```

### Button
```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
  Click Me
</button>
```

### Form Input
```tsx
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Enter text"
/>
```

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

## 🔧 Useful Scripts

### Development
```bash
# Start dev server
npm run dev

# Check for TypeScript errors
npm run build

# Lint code
npm run lint
```

### Database
```bash
# Seed initial users
npm run seed

# Import members from CSV
npm run import-members

# Check database connection
npx tsx scripts/checkDatabase.ts

# Make user admin
node scripts/makeJanithAdmin.js

# Set officer roles
node scripts/setOfficers.js
```

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution**: 
1. Check `MONGODB_URI` in `.env.local`
2. Ensure MongoDB is running
3. Check network/firewall settings

### Issue: NextAuth Session Not Working
**Solution**:
1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Clear browser cookies and try again

### Issue: TypeScript Errors
**Solution**:
1. Run `npm install` to ensure dependencies
2. Check `tsconfig.json` configuration
3. Restart TypeScript server in VS Code

### Issue: Tailwind Classes Not Working
**Solution**:
1. Check `tailwind.config.ts` content paths
2. Ensure `globals.css` imports Tailwind
3. Restart dev server

## 📊 Database Collections

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `users` | Member accounts | name, email, password, role, membershipNumber |
| `events` | Club events | title, date, description, rsvps |
| `projects` | Service projects | name, description, images, date |
| `serviceHours` | Service tracking | userId, hours, activity, status |
| `announcements` | Club news | title, content, author, date |
| `blog` | Blog posts | title, slug, content, author |
| `minutes` | Meeting minutes | date, content, attendees |
| `suggestions` | Member suggestions | title, description, status, votes |
| `payments` | Payment records | userId, amount, type, status |
| `attendance` | Event attendance | eventId, userId, checkInTime |

## 🔐 User Roles

| Role | Access Level | Permissions |
|------|-------------|-------------|
| `member` | Basic | View content, RSVP, log hours, submit suggestions |
| `officer` | Elevated | Member permissions + approve hours, manage events |
| `admin` | Full | All permissions + user management, content creation |

## 🎯 Testing Checklist

### Before Committing
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] Responsive on mobile/tablet/desktop
- [ ] Authentication works correctly
- [ ] API endpoints return expected data
- [ ] Database operations complete successfully

### Before Deploying
- [ ] All environment variables set in production
- [ ] Production MongoDB configured
- [ ] `NEXTAUTH_URL` updated to production domain
- [ ] Test all critical user flows
- [ ] Check page load performance
- [ ] Verify SSL/HTTPS working

## 📚 Additional Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Helpful Commands
```bash
# Generate NextAuth secret
openssl rand -base64 32

# Check Node version
node --version

# Clear Next.js cache
rm -rf .next

# Install specific package
npm install package-name

# Update dependencies
npm update
```

---

**Last Updated**: February 4, 2026  
**Need Help?** Check README.md or contact the development team
