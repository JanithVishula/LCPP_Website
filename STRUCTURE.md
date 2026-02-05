# 📂 Project File Structure Documentation

This document provides a comprehensive overview of the file organization in the Leo Club of Pannipitiya Paradise website.

## 🌳 Directory Tree

```
LCPP_Website/
│
├── 📄 Configuration Files (Root)
│   ├── next.config.mjs          # Next.js framework configuration
│   ├── next-env.d.ts            # Next.js TypeScript declarations
│   ├── tailwind.config.ts       # Tailwind CSS utility configuration
│   ├── tsconfig.json            # TypeScript compiler options
│   ├── postcss.config.mjs       # PostCSS transformation config
│   ├── package.json             # Dependencies and npm scripts
│   ├── README.md                # Main project documentation
│   ├── STRUCTURE.md             # This file - detailed structure guide
│   └── GUEST_FEATURES_RECOMMENDATIONS.md  # Feature recommendations
│
├── 📁 app/                      # Next.js App Router (Pages & APIs)
│   │
│   ├── 🏠 Root Level
│   │   ├── layout.tsx           # Root layout (Navbar + Footer wrapper)
│   │   ├── page.tsx             # Home page (landing)
│   │   └── globals.css          # Global styles and Tailwind directives
│   │
│   ├── 🌐 Public Pages
│   │   ├── about/
│   │   │   └── page.tsx         # About us, mission, vision, officers
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual blog post (dynamic route)
│   │   ├── contact/
│   │   │   └── page.tsx         # Contact form
│   │   ├── donate/
│   │   │   ├── page.tsx         # Donation page
│   │   │   └── success/
│   │   │       └── page.tsx     # Donation success confirmation
│   │   ├── events/
│   │   │   └── page.tsx         # Public events listing
│   │   ├── faq/
│   │   │   └── page.tsx         # Frequently asked questions
│   │   ├── join/
│   │   │   └── page.tsx         # Membership application
│   │   ├── login/
│   │   │   └── page.tsx         # Member login form
│   │   ├── parent-club/
│   │   │   └── page.tsx         # Lions Club parent info
│   │   └── projects/
│   │       └── page.tsx         # Public project showcase
│   │
│   ├── 👤 Member Pages (Authentication Required)
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Personalized member dashboard
│   │   ├── announcements/
│   │   │   └── page.tsx         # View club announcements
│   │   ├── attendance/
│   │   │   └── page.tsx         # Event attendance tracking
│   │   ├── members/
│   │   │   └── page.tsx         # Member directory
│   │   ├── minutes/
│   │   │   └── page.tsx         # Meeting minutes archive
│   │   ├── projects/
│   │   │   └── submit/
│   │   │       └── page.tsx     # Submit new project
│   │   ├── service-hours/
│   │   │   ├── page.tsx         # Log service hours
│   │   │   └── leaderboard/
│   │   │       └── page.tsx     # Service hours rankings
│   │   └── suggestions/
│   │       └── create/
│   │           └── page.tsx     # Submit suggestions
│   │
│   ├── 🔐 Admin Pages (Admin/Officer Only)
│   │   ├── admin/
│   │   │   ├── page.tsx         # Admin control panel
│   │   │   └── projects/        # Project management section
│   │   ├── announcements/
│   │   │   └── create/
│   │   │       └── page.tsx     # Create announcements
│   │   ├── events/
│   │   │   └── create/
│   │   │       └── page.tsx     # Create events
│   │   ├── members/
│   │   │   └── create/
│   │   │       └── page.tsx     # Add new members
│   │   ├── minutes/
│   │   │   └── create/
│   │   │       └── page.tsx     # Upload meeting minutes
│   │   ├── service-hours/
│   │   │   └── approve/
│   │   │       └── page.tsx     # Approve service hours
│   │   └── suggestions/
│   │       └── review/
│   │           └── page.tsx     # Review member suggestions
│   │
│   └── 🔌 API Routes (Backend Endpoints)
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts     # NextAuth authentication handler
│       ├── register/
│       │   └── route.ts         # User registration endpoint
│       ├── members/
│       │   ├── route.ts         # GET all members, search
│       │   └── update/
│       │       └── route.ts     # PUT update member info
│       ├── user/
│       │   └── stats/
│       │       └── route.ts     # GET user statistics
│       ├── events/
│       │   ├── route.ts         # GET/POST events
│       │   └── [id]/
│       │       ├── route.ts     # GET/PUT/DELETE single event
│       │       ├── rsvp/
│       │       │   └── route.ts # POST RSVP to event
│       │       └── attendance/
│       │           └── route.ts # POST record attendance
│       ├── attendance/
│       │   └── route.ts         # Attendance management
│       ├── service-hours/
│       │   ├── route.ts         # GET/POST service hours
│       │   ├── [id]/
│       │   │   └── approve/
│       │   │       └── route.ts # PUT approve hours
│       │   └── leaderboard/
│       │       └── route.ts     # GET rankings
│       ├── announcements/
│       │   ├── route.ts         # GET/POST announcements
│       │   └── [id]/
│       │       └── route.ts     # GET/PUT/DELETE announcement
│       ├── blog/
│       │   └── route.ts         # Blog posts CRUD
│       ├── minutes/
│       │   └── route.ts         # Meeting minutes CRUD
│       ├── projects/
│       │   └── route.ts         # Projects CRUD
│       ├── admin/
│       │   └── projects/
│       │       └── upload/
│       │           └── route.ts # POST upload project images
│       ├── contact/
│       │   └── route.ts         # POST contact form
│       ├── payments/
│       │   └── route.ts         # Payment tracking
│       ├── suggestions/
│       │   └── route.ts         # Suggestions CRUD
│       └── summarize/
│           └── route.ts         # AI document summarization
│
├── 📁 components/               # Reusable React Components
│   ├── Navbar.tsx               # Main navigation with auth state
│   ├── Footer.tsx               # Site footer
│   ├── AuthProvider.tsx         # NextAuth session wrapper
│   ├── AccessibilityControls.tsx # Font size & contrast controls
│   ├── BackButton.tsx           # Navigation back button
│   ├── ScrollReveal.tsx         # Scroll animation wrapper
│   └── Timeline3D.tsx           # 3D timeline visualization
│
├── 📁 lib/                      # Core Library & Business Logic
│   ├── mongodb.ts               # MongoDB connection manager
│   ├── auth.ts                  # NextAuth configuration
│   ├── models.ts                # Database schemas and models
│   └── userService.ts           # User-related database operations
│
├── 📁 scripts/                  # Utility Scripts & Tools
│   ├── seedUsers.ts             # Seed initial users (npm run seed)
│   ├── importMembers.ts         # Legacy member import (CSV)
│   ├── importRealMembers.ts     # Import actual members (npm run import-members)
│   ├── checkDatabase.ts         # Verify DB connection & data
│   ├── makeJanithAdmin.js       # Grant admin to specific user
│   ├── setOfficers.js           # Assign officer roles
│   └── updateMemberDetails.js   # Bulk update member info
│
├── 📁 types/                    # TypeScript Type Definitions
│   └── next-auth.d.ts           # Extended NextAuth types
│
└── 📁 public/                   # Static Assets (Images, Fonts)
    ├── Fonts/                   # Custom web fonts
    ├── Project Images/          # Project photo gallery
    │   ├── ELITE 25/
    │   ├── General Images/
    │   ├── International Tree Plantation Drive/
    │   ├── Paradisaye Sahurda Yathra/
    │   ├── Sadaham Puja 2025/
    │   └── Senehe Piruna Pitu/
    └── Member_Contact_Information_2026-01-08.csv  # Member import data
```

## 📋 File Naming Conventions

### Pages (`/app` directory)
- **Static Routes**: Folder names in lowercase (e.g., `about/`, `contact/`)
- **Dynamic Routes**: Square brackets for params (e.g., `[id]/`, `[slug]/`)
- **Catch-All Routes**: Triple dots (e.g., `[...nextauth]/`)
- **Page Files**: Always named `page.tsx`
- **Layout Files**: Always named `layout.tsx`

### API Routes (`/app/api` directory)
- **HTTP Methods**: Defined in `route.ts` files
- **RESTful**: Organized by resource (e.g., `/api/events`, `/api/members`)
- **Nested Resources**: Hierarchical structure (e.g., `/api/events/[id]/rsvp`)

### Components
- **PascalCase**: Component files use PascalCase (e.g., `Navbar.tsx`)
- **Descriptive**: Names clearly indicate purpose

### Scripts
- **camelCase**: Script files use camelCase (e.g., `seedUsers.ts`)
- **Action-oriented**: Names describe what they do

## 🎯 Purpose by Directory

### `/app` - Application Layer
**Purpose**: All user-facing pages and API endpoints
- **Routes**: URL structure matches folder structure
- **Server Components**: Default in Next.js 15
- **Client Components**: Marked with `'use client'` directive

### `/components` - UI Layer
**Purpose**: Reusable React components used across multiple pages
- **Shared**: Used by multiple pages
- **Stateless/Stateful**: Mix of both types
- **Exportable**: Can be imported anywhere

### `/lib` - Data Layer
**Purpose**: Core business logic and database interactions
- **Database**: MongoDB connection and models
- **Authentication**: NextAuth configuration
- **Services**: Reusable business logic

### `/scripts` - Utilities
**Purpose**: Database management and maintenance tasks
- **One-time**: Scripts for setup/migration
- **Maintenance**: Regular database operations
- **Development**: Helper tools

### `/types` - Type Safety
**Purpose**: TypeScript type definitions and extensions
- **Custom Types**: Application-specific types
- **Extended Types**: Augmenting third-party types

### `/public` - Static Assets
**Purpose**: Images, fonts, and files served directly
- **No Processing**: Served as-is by Next.js
- **Direct Access**: Available at `/filename.ext`

## 🔄 Data Flow

```
User Request
    ↓
Navbar/Layout (app/layout.tsx)
    ↓
Page Component (app/*/page.tsx)
    ↓
API Route (app/api/*/route.ts) ← Uses lib/userService.ts
    ↓                              ↓
Database (MongoDB) ← lib/mongodb.ts + lib/models.ts
    ↓
Response to User
```

## 🛡️ Route Protection

### Public Routes
- Home (`/`)
- About (`/about`)
- Projects (`/projects`)
- Events (`/events`)
- Blog (`/blog`)
- Contact (`/contact`)
- Join (`/join`)
- Login (`/login`)
- FAQ (`/faq`)
- Parent Club (`/parent-club`)

### Protected Routes (Member)
- Dashboard (`/dashboard`)
- Service Hours (`/service-hours`)
- Members (`/members`)
- Announcements (`/announcements`)
- Attendance (`/attendance`)
- Minutes (`/minutes`)
- Suggestions Create (`/suggestions/create`)

### Admin Routes (Admin/Officer)
- Admin Dashboard (`/admin`)
- Create Events (`/events/create`)
- Create Announcements (`/announcements/create`)
- Create Members (`/members/create`)
- Approve Service Hours (`/service-hours/approve`)
- Review Suggestions (`/suggestions/review`)
- Upload Minutes (`/minutes/create`)

## 📦 Key Dependencies by Directory

### `/app`
- `next` - Framework
- `next-auth` - Authentication
- `react` - UI library

### `/lib`
- `mongodb` - Database client
- `bcryptjs` - Password hashing
- `next-auth` - Auth configuration

### `/scripts`
- `csv-parser` - CSV processing
- `bcryptjs` - Password generation
- `mongodb` - Direct DB access

### `/components`
- `react` - Component library
- `next/navigation` - Routing
- `next-auth/react` - Client-side auth

## 🎨 Styling Structure

### Global Styles
- `app/globals.css` - Base styles, Tailwind directives

### Component Styles
- Inline Tailwind classes (utility-first)
- No separate CSS files per component

### Configuration
- `tailwind.config.ts` - Tailwind customization
- `postcss.config.mjs` - CSS processing

## 📚 Import Patterns

### Absolute Imports (configured in tsconfig.json)
```typescript
import { authOptions } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import User from '@/lib/models'
```

### Relative Imports
```typescript
import Component from '../components/Component'
import { helper } from './utils'
```

## 🔍 Finding Files Quickly

### By Feature
- **Events**: `/app/events`, `/app/api/events`
- **Members**: `/app/members`, `/app/api/members`
- **Service Hours**: `/app/service-hours`, `/app/api/service-hours`

### By Type
- **Pages**: All in `/app/**/page.tsx`
- **APIs**: All in `/app/api/**/route.ts`
- **Components**: All in `/components/*.tsx`
- **DB Logic**: All in `/lib/*.ts`

### By Access Level
- **Public**: Root level app folders
- **Protected**: Nested app folders requiring auth
- **Admin**: Folders with `admin/`, `create/`, `approve/` in path

---

**Last Updated**: February 4, 2026  
**Maintainer**: Leo Club of Pannipitiya Paradise Dev Team
