# Admin PDF Upload & AI Project Creation Guide

## Overview
The LCPP website now includes a powerful AI-driven project management system that allows admins to upload PDF documents and automatically generate project summaries using OpenAI's GPT-4.

## 🚀 Quick Start

### 1. Setup OpenAI API Key

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

Add to your `.env.local` file:
```env
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

### 2. Access Admin Panel

1. Login as admin user:
   - Email: `jvishula35@gmail.com`
   - Password: `Leo@2026`

2. From your dashboard, click **"🛠️ Admin Panel - Manage Projects"**

   Or navigate directly to: `http://localhost:3000/admin/projects`

### 3. Upload a PDF

1. Select a PDF file (project report, activity summary, etc.)
2. Choose the project year (2025-26, 2024-25, 2023-24)
3. Select a category:
   - Community Service
   - Environmental
   - Educational
   - Health & Wellness
   - Fundraising
4. Click **"🤖 Upload & Generate AI Summary"**

### 4. AI Processing

The system will:
- Extract text from your PDF using `pdf-parse`
- Send the content to OpenAI GPT-4
- Generate a structured summary with:
  - Project Title
  - Date
  - Description
  - Key Activities
  - Impact/Outcomes
  - Participant Count

## 📋 API Endpoints

### Upload Project (Admin Only)
```
POST /api/admin/projects/upload
Content-Type: multipart/form-data

Body:
- pdf: File (required)
- year: string (optional, default: 2025-26)
- category: string (optional, default: Community Service)

Response:
{
  "success": true,
  "message": "Project created successfully with AI summary",
  "project": {
    "id": "...",
    "title": "...",
    "description": "...",
    "category": "...",
    "year": "...",
    "participants": 0,
    "impact": "...",
    "createdAt": "..."
  }
}
```

### Get All Projects (Admin Only)
```
GET /api/admin/projects/upload

Response:
{
  "success": true,
  "count": 5,
  "projects": [...]
}
```

### Get Public Projects
```
GET /api/projects?year=2024-25&category=Community%20Service

Response:
{
  "success": true,
  "count": 3,
  "projects": [...]
}
```

## 🛡️ Security Features

- **Admin-only access**: Middleware checks `session.user.role === 'admin'`
- **File validation**: Only PDF files accepted
- **Content validation**: Requires minimum 50 characters of readable text
- **Error handling**: Graceful failures with detailed error messages

## 💾 Database Schema

Projects are stored in the `projects` collection with:

```typescript
{
  title: string,
  date: string,
  description: string,
  category: string,
  activities: array,
  impact: string,
  participants: number,
  year: string,
  pdfFileName: string,
  pdfText: string (first 5000 chars),
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Frontend Features

### Admin Projects Page (`/admin/projects`)
- Upload form with drag-and-drop support
- Real-time upload progress
- Success/error notifications
- List of all uploaded projects
- Project cards with metadata

### Public Projects Page (`/projects`)
- Fetches from MongoDB instead of static data
- Year-based filtering (2025-26, 2024-25, 2023-24)
- Category filtering
- Fallback to hardcoded projects if database is empty
- Beautiful tree-branch layout

### Dashboard Enhancement
- Admin users see **"Admin Panel"** button
- Quick access to project management
- Role-based UI rendering

## 🧪 Testing

### Test the Upload Feature

1. **Prepare a test PDF**:
   - Create a simple project report
   - Include: title, date, description, activities, impact
   - Save as PDF

2. **Login as admin**:
   ```
   Email: jvishula35@gmail.com
   Password: Leo@2026
   ```

3. **Upload**:
   - Go to `/admin/projects`
   - Select your PDF
   - Choose year and category
   - Submit

4. **Verify**:
   - Check the uploaded projects list on the admin page
   - Visit `/projects` to see it in the public view
   - Check MongoDB Compass: `leo_club` database → `projects` collection

### Test the Public API

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Filter by year
curl http://localhost:3000/api/projects?year=2024-25

# Filter by category
curl "http://localhost:3000/api/projects?category=Community%20Service"
```

## 🔍 Troubleshooting

### OpenAI API Errors

**Error**: "OpenAI API key not configured"
- **Fix**: Add `OPENAI_API_KEY` to `.env.local` and restart dev server

**Error**: "Insufficient quota" or "Rate limit exceeded"
- **Fix**: Check your OpenAI account billing and usage limits

### PDF Processing Issues

**Error**: "PDF does not contain enough readable text"
- **Fix**: Ensure PDF has extractable text (not scanned images)
- Use PDFs with at least 50 characters of text content

**Error**: "File must be a PDF"
- **Fix**: Only upload files with `.pdf` extension and correct MIME type

### Authorization Issues

**Error**: "Unauthorized - Admin access required"
- **Fix**: Login with admin account (jvishula35@gmail.com)
- Check session with `console.log(session)` in your code

## 📊 Cost Estimation

OpenAI pricing (as of 2024):
- **GPT-4**: ~$0.03 per 1K tokens
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens

Estimated cost per PDF:
- Average PDF: 2,000 words = ~2,600 tokens
- Using GPT-4: ~$0.08 per upload
- Using GPT-3.5-turbo: ~$0.005 per upload

💡 **Tip**: Start with `gpt-3.5-turbo` for testing, then upgrade to `gpt-4` for production.

## 🎯 Next Steps

1. **Customize AI Prompts**: Edit the system message in `/app/api/admin/projects/upload/route.ts`
2. **Add Image Upload**: Extend the form to accept project photos
3. **Edit Projects**: Add PUT/DELETE endpoints for project management
4. **Bulk Upload**: Support multiple PDFs at once
5. **Export**: Add PDF generation for project reports

## 📚 Related Documentation

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [MEMBER_DATABASE.md](./MEMBER_DATABASE.md) - Member data structure
- [QUICK_START.md](./QUICK_START.md) - Initial setup guide
