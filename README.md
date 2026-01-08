# Leo Club of Pannipitiya Paradise Website

Official website for the Leo Club of Pannipitiya Paradise, featuring member authentication, club information, projects, and donation capabilities.

## Features

- ✅ **Home Page** - Welcome section with club overview
- ✅ **About Page** - Mission, vision, awards, and club officers
- ✅ **Projects Page** - Showcase of community service projects
- ✅ **Parent Club Page** - Information about Lions Club of Pannipitiya Paradise
- ✅ **Join/Donate Page** - Membership application and donation options
- ✅ **Member Login** - Authentication for club members (to be configured)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js (to be configured)
- **Database:** MongoDB (to be configured)
- **Payments:** Stripe (future integration)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── join/              # Join/Donate page
│   ├── login/             # Member login
│   ├── parent-club/       # Parent club info
│   ├── projects/          # Projects showcase
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation bar
│   └── Footer.tsx        # Footer component
├── .github/              # GitHub configuration
└── public/               # Static assets
```

## Next Steps

### 1. Configure MongoDB
- Set up MongoDB Atlas account or local MongoDB
- Update `MONGODB_URI` in `.env.local`
- Create user schema and models

### 2. Set Up NextAuth.js
- Configure authentication providers
- Create API routes for auth
- Set up session management
- Add protected routes

### 3. Implement Member Dashboard
- Create dashboard layout
- Add member profile page
- Implement role-based access

### 4. Add Payment Gateway
- Integrate Stripe
- Create donation flow
- Add membership payment

### 5. Customize Content
- Replace placeholder text with actual club information
- Add officer names and photos
- Update project details
- Add club logo and images

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Customization Guide

### Update Club Officers
Edit the officer information in:
- `app/about/page.tsx` - Leo Club officers
- `app/parent-club/page.tsx` - Lions Club officers

### Add New Projects
Edit the projects array in:
- `app/projects/page.tsx`

### Modify Colors
Update theme colors in:
- `tailwind.config.ts`

### Change Contact Information
Update contact details in:
- `components/Footer.tsx`
- `app/parent-club/page.tsx`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## Contributing

This is a club project. Members can contribute by:
1. Updating content
2. Adding features
3. Fixing bugs
4. Improving documentation

## Support

For questions or support:
- Email: leoclub.pannipitiya@example.com
- Contact club officers

## License

© 2026 Leo Club of Pannipitiya Paradise. All rights reserved.
