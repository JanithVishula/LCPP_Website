# Quick Start: Test the AI Project Upload Feature

## Prerequisites Checklist
- ✅ MongoDB running on localhost:27017
- ✅ Dev server running (`npm run dev`)
- ⚠️ OpenAI API key (need to add)

## Step 1: Get OpenAI API Key (5 minutes)

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-proj-...`)
5. Open `.env.local` file
6. Add this line:
   ```
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```
7. **Save the file**
8. **Restart your dev server**: Stop (Ctrl+C) and run `npm run dev` again

## Step 2: Login as Admin (1 minute)

1. Open http://localhost:3000/login
2. Enter credentials:
   - **Email**: `jvishula35@gmail.com`
   - **Password**: `Leo@2026`
3. Click **Sign In**

## Step 3: Access Admin Panel (30 seconds)

From your dashboard, you should see a **gold button** that says:
```
🛠️ Admin Panel - Manage Projects
```

Click it to go to `/admin/projects`

**OR** navigate directly to: http://localhost:3000/admin/projects

## Step 4: Create a Test PDF (2 minutes)

Create a simple text file with project info:

```
Leo Club Beach Cleanup Project

Date: December 15, 2024

Description:
Our Leo Club organized a beach cleanup project at Negombo Beach. 
Over 50 volunteers participated in collecting plastic waste and 
other debris from the shoreline.

Activities:
- Collected 200kg of plastic waste
- Distributed eco-friendly bags to beachgoers
- Conducted awareness session on marine pollution

Impact:
The project helped clean 2km of beach area and raised awareness 
among 100+ beach visitors about ocean conservation.

Participants: 52 Leo members and volunteers
```

**Save as PDF** (in Microsoft Word, Google Docs, or any editor):
- File → Save As → Choose PDF format
- Name it: `beach_cleanup_2024.pdf`

## Step 5: Upload the PDF (1 minute)

On the admin page:

1. Click **"Choose File"** and select your PDF
2. Select **Year**: `2024-25`
3. Select **Category**: `Environmental`
4. Click the **gold button**: `🤖 Upload & Generate AI Summary`

You'll see:
- ⏳ Processing animation
- ✅ Success message: "Project created successfully with AI summary!"
- 📋 Your project appears in the list below

## Step 6: Verify Results (2 minutes)

### Check Admin Panel
Scroll down on `/admin/projects` - you should see your uploaded project with:
- Title (extracted by AI)
- Date and category
- AI-generated description
- PDF filename
- Participant count

### Check Public Projects Page
1. Go to http://localhost:3000/projects
2. Click on **"2024-25"** year tab
3. You should see your project in the tree layout
4. Click on it to view details

### Check MongoDB
1. Open **MongoDB Compass**
2. Connect to `mongodb://localhost:27017`
3. Open database: `leo_club`
4. Open collection: `projects`
5. You should see 1 document with your project data

## 🎉 Success Criteria

You know it's working when:
- ✅ Upload completes without errors
- ✅ AI generates a meaningful summary
- ✅ Project appears in admin panel
- ✅ Project visible on public `/projects` page
- ✅ Data saved in MongoDB `projects` collection

## 🐛 Troubleshooting

### "OpenAI API key not configured"
- **Fix**: Make sure you added `OPENAI_API_KEY` to `.env.local`
- **Fix**: Restart dev server after adding the key
- **Check**: The key should start with `sk-proj-`

### "PDF does not contain enough readable text"
- **Fix**: Make sure your PDF has actual text (not scanned image)
- **Fix**: Try a different PDF with more content
- **Check**: Open PDF in a reader - can you select/copy text?

### "Unauthorized - Admin access required"
- **Fix**: Make sure you're logged in as admin
- **Fix**: Email must be `jvishula35@gmail.com`
- **Fix**: Try logging out and logging back in

### Upload button stuck on "Processing..."
- **Check**: Open browser console (F12) for errors
- **Check**: OpenAI API might be slow (can take 5-10 seconds)
- **Fix**: Wait a bit longer, then refresh page

### Project not showing on `/projects` page
- **Fix**: Make sure you selected the correct year in the filter
- **Fix**: Hard refresh the page (Ctrl + Shift + R)
- **Check**: Verify in MongoDB that the `year` field matches

## 📝 Testing Tips

### Test Different Categories
Try uploading PDFs for different categories:
- Community Service
- Environmental
- Educational
- Health & Wellness
- Fundraising

### Test Different Years
Upload projects for different years to test the filtering:
- 2025-26 (current)
- 2024-25
- 2023-24

### Test AI Quality
Try PDFs with different content to see AI extraction quality:
- Well-structured reports → Better AI summaries
- Bullet points and headers → Easier extraction
- Plain paragraphs → Still works but may be less accurate

## 🚀 What to Try Next

1. **Upload multiple projects** - Build your projects library
2. **Test the public view** - See how projects appear to visitors
3. **Edit project data** - Modify projects in MongoDB Compass
4. **Share with team** - Show other admins how to use it

## 📊 Expected Performance

- **Upload Time**: 2-5 seconds (file processing)
- **AI Processing**: 3-8 seconds (OpenAI API call)
- **Total Time**: 5-15 seconds per PDF
- **Cost**: ~$0.01-0.05 per upload (OpenAI pricing)

## ✅ Completion Checklist

- [ ] OpenAI API key configured
- [ ] Logged in as admin
- [ ] Admin panel accessible
- [ ] Test PDF created
- [ ] PDF uploaded successfully
- [ ] AI summary generated
- [ ] Project in admin list
- [ ] Project on public page
- [ ] Verified in MongoDB

---

**Need Help?**
- Check [ADMIN_PROJECTS_GUIDE.md](./ADMIN_PROJECTS_GUIDE.md) for detailed documentation
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API reference
- Review [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for technical details

**Ready to start? Begin with Step 1! 🚀**
