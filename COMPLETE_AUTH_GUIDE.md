# Complete Authentication Setup Guide - From Basics
## Leo Club of Pannipitiya Paradise Website

---

## 📚 Table of Contents
1. [Understanding What We're Building](#understanding)
2. [Prerequisites](#prerequisites)
3. [Step 1: Install Required Packages](#step-1)
4. [Step 2: Setup MongoDB Database](#step-2)
5. [Step 3: Configure Environment Variables](#step-3)
6. [Step 4: Create Your First User](#step-4)
7. [Step 5: Test the Login System](#step-5)
8. [Understanding the Code](#understanding-code)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Understanding What We're Building {#understanding}

### What is Authentication?
Authentication is the process of verifying who a user is. Think of it like:
- **Login** = Showing your ID card at a building entrance
- **Session** = Getting a visitor badge that lets you move around
- **Protected Pages** = Rooms that only people with badges can enter

### What We've Built:
1. **Login Page** (`/login`) - Where members enter email and password
2. **Dashboard** (`/dashboard`) - Protected area only logged-in members can see
3. **Database** - Stores user information securely
4. **Password Security** - Passwords are encrypted (not stored as plain text)

### Technologies Used:
- **Next.js** - The framework our website is built on
- **NextAuth.js** - Handles login/logout functionality
- **MongoDB** - Database that stores user information
- **bcrypt** - Encrypts passwords for security

---

## ✅ Prerequisites {#prerequisites}

Before starting, make sure you have:
- [x] Node.js installed (v18 or higher)
- [x] A code editor (VS Code)
- [x] Basic understanding of terminal/command prompt
- [x] Internet connection

Check Node.js version:
```bash
node --version
```
Should show v18.0.0 or higher.

---

## 📦 Step 1: Install Required Packages {#step-1}

### What are we installing?
- **bcryptjs** - Encrypts passwords
- **@types/bcryptjs** - Helps TypeScript understand bcryptjs

### How to Install:

1. **Open Terminal in VS Code:**
   - Press `Ctrl + `` (backtick) or go to Terminal > New Terminal

2. **Make sure you're in the project folder:**
   ```bash
   cd "d:\BrightBuy\Portfolio Website"
   ```

3. **Run the install command:**
   ```bash
   npm install bcryptjs @types/bcryptjs
   ```

4. **Wait for installation to complete** (about 10-30 seconds)

5. **Verify installation:**
   ```bash
   npm list bcryptjs
   ```
   Should show: `bcryptjs@2.x.x`

✅ **Step 1 Complete!**

---

## 🗄️ Step 2: Setup MongoDB Database {#step-2}

### What is MongoDB?
MongoDB is a database that stores all user information (like a digital filing cabinet).

### You have TWO options:

---

### **OPTION A: MongoDB Atlas (Recommended for Beginners - It's FREE!)**

This is a cloud database - no installation needed!

#### Step-by-Step:

1. **Go to MongoDB Atlas:**
   - Open browser: https://www.mongodb.com/cloud/atlas/register

2. **Create Account:**
   - Sign up with email
   - Choose "Free" tier (M0 Sandbox - 512 MB)

3. **Create Cluster:**
   - Click "Build a Database"
   - Choose "M0 FREE"
   - Select your nearest region (e.g., AWS Singapore)
   - Click "Create"
   - Wait 1-3 minutes for cluster creation

4. **Create Database User:**
   - On popup, or go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `leoclubadmin`
   - Password: Click "Autogenerate Secure Password" → **SAVE THIS PASSWORD!**
   - User Privileges: Select "Atlas admin"
   - Click "Add User"

5. **Allow Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

6. **Get Connection String:**
   - Go back to "Database" tab
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://leoclubadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - **IMPORTANT:** Replace `<password>` with your actual password (from step 4)

✅ **Save this connection string - you'll need it in Step 3!**

---

### **OPTION B: Local MongoDB (For Advanced Users)**

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Choose your OS (Windows/Mac/Linux)
   - Download and install

2. **Start MongoDB Service:**
   
   **Windows:**
   ```bash
   net start MongoDB
   ```
   
   **Mac/Linux:**
   ```bash
   sudo systemctl start mongod
   ```

3. **Your connection string will be:**
   ```
   mongodb://localhost:27017/leo_club
   ```

✅ **Step 2 Complete!**

---

## 🔐 Step 3: Configure Environment Variables {#step-3}

### What are Environment Variables?
Secret configuration values (like passwords) that aren't stored in your code.

### Create `.env.local` File:

1. **In VS Code, create new file:**
   - Right-click on project root folder
   - Select "New File"
   - Name it: `.env.local` (exactly, with the dot at the beginning)

2. **Add this content:**

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://leoclubadmin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/leo_club?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=REPLACE_THIS_WITH_GENERATED_SECRET

# Email (Optional - for future features)
EMAIL_FROM=noreply@leopannipitiyaparadise.org
```

3. **Replace the values:**

   **For MONGODB_URI:**
   - If using Atlas: Paste your connection string from Step 2
   - If using local: Use `mongodb://localhost:27017/leo_club`

   **For NEXTAUTH_SECRET:**
   - Generate a secure secret key

### Generate NEXTAUTH_SECRET:

**Option 1 - Online Generator (Easiest):**
1. Go to: https://generate-secret.vercel.app/32
2. Copy the generated string
3. Paste it as NEXTAUTH_SECRET value

**Option 2 - Using Terminal:**
```bash
openssl rand -base64 32
```
Copy output and paste as NEXTAUTH_SECRET value

**Option 3 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Final `.env.local` Example:

```env
MONGODB_URI=mongodb+srv://leoclubadmin:MySecurePass123@cluster0.abc123.mongodb.net/leo_club?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-32-character-secret-here-abc123xyz
EMAIL_FROM=noreply@leopannipitiyaparadise.org
```

### ⚠️ **IMPORTANT SECURITY NOTES:**
- **NEVER** commit `.env.local` to Git
- **NEVER** share your NEXTAUTH_SECRET or MongoDB password
- The `.gitignore` file already excludes `.env.local`

✅ **Step 3 Complete!**

---

## 👤 Step 4: Create Your First User {#step-4}

### Create Admin User Script:

1. **Create a new folder called `scripts`:**
   ```bash
   mkdir scripts
   ```

2. **Create file `scripts/createAdmin.js`:**

```javascript
// scripts/createAdmin.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const uri = 'PASTE_YOUR_MONGODB_URI_HERE';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('leo_club');
    const users = db.collection('users');

    // Check if admin already exists
    const existing = await users.findOne({ email: 'admin@leopannipitiyaparadise.org' });
    if (existing) {
      console.log('⚠️  Admin user already exists!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const adminUser = {
      name: 'Admin User',
      email: 'admin@leopannipitiyaparadise.org',
      password: hashedPassword,
      role: 'admin',
      membershipNumber: 'ADMIN001',
      phone: '',
      joinedDate: new Date(),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(adminUser);
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@leopannipitiyaparadise.org');
    console.log('🔑 Password: admin123');
    console.log('⚠️  CHANGE THIS PASSWORD AFTER FIRST LOGIN!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

createAdmin();
```

3. **Edit the script:**
   - Replace `PASTE_YOUR_MONGODB_URI_HERE` with your MongoDB URI from `.env.local`

4. **Run the script:**
   ```bash
   node scripts/createAdmin.js
   ```

5. **Expected Output:**
   ```
   ✅ Connected to MongoDB
   ✅ Admin user created successfully!
   📧 Email: admin@leopannipitiyaparadise.org
   🔑 Password: admin123
   ⚠️  CHANGE THIS PASSWORD AFTER FIRST LOGIN!
   ```

### Your First User Credentials:
- **Email:** `admin@leopannipitiyaparadise.org`
- **Password:** `admin123`

✅ **Step 4 Complete!**

---

## 🧪 Step 5: Test the Login System {#step-5}

### Start Development Server:

1. **In terminal, run:**
   ```bash
   npm run dev
   ```

2. **Wait for message:**
   ```
   ✓ Ready in 2.5s
   ○ Local:   http://localhost:3000
   ```

3. **Open browser and go to:**
   ```
   http://localhost:3000/login
   ```

### Test Login:

1. **Enter credentials:**
   - Email: `admin@leopannipitiyaparadise.org`
   - Password: `admin123`

2. **Click "Sign In"**

3. **You should be redirected to:**
   ```
   http://localhost:3000/dashboard
   ```

4. **You should see:**
   - Welcome message with your name
   - Member stats
   - Profile information
   - Upcoming events

### Test Protected Routes:

1. **Try accessing dashboard without login:**
   - Open new incognito/private window
   - Go to: `http://localhost:3000/dashboard`
   - You should be redirected to login page ✅

2. **Test Logout:**
   - Click browser back button
   - Close browser
   - Reopen `http://localhost:3000/dashboard`
   - Should still be logged in (session persists) ✅

✅ **Step 5 Complete! Your authentication system is working! 🎉**

---

## 💡 Understanding the Code {#understanding-code}

### How Does It Work?

```
User Types Email & Password
         ↓
[Login Page] sends to NextAuth
         ↓
[NextAuth] checks MongoDB for user
         ↓
Found user? → Compare passwords (bcrypt)
         ↓
Password Match? → Create JWT Session
         ↓
Redirect to Dashboard (with session cookie)
         ↓
[Dashboard] checks session → Show protected content
```

### Key Files Explained:

1. **`lib/auth.ts`** - NextAuth configuration
   - Defines how users log in
   - Creates sessions
   - Handles callbacks

2. **`lib/userService.ts`** - User management functions
   - `findUserByEmail()` - Look up user in database
   - `createUser()` - Add new user
   - `hashPassword()` - Encrypt passwords
   - `verifyPassword()` - Check if password is correct

3. **`lib/mongodb.ts`** - Database connection
   - Connects to MongoDB
   - Reuses connection (efficient)

4. **`app/api/auth/[...nextauth]/route.ts`** - NextAuth API endpoint
   - Handles login POST requests
   - Manages sessions
   - Provides logout functionality

5. **`app/login/page.tsx`** - Login form
   - Captures email/password
   - Sends to NextAuth
   - Shows errors if login fails

6. **`app/dashboard/page.tsx`** - Protected page
   - Checks if user is logged in
   - Redirects to login if not
   - Shows member information

### Database Structure:

**users collection:**
```javascript
{
  _id: ObjectId("..."),
  name: "Admin User",
  email: "admin@leopannipitiyaparadise.org",
  password: "$2a$10$encrypted...", // Encrypted!
  role: "admin",
  membershipNumber: "ADMIN001",
  phone: "",
  joinedDate: ISODate("2026-01-08"),
  active: true,
  createdAt: ISODate("2026-01-08"),
  updatedAt: ISODate("2026-01-08")
}
```

---

## 🔧 Troubleshooting {#troubleshooting}

### Problem: "Cannot find module 'bcryptjs'"

**Solution:**
```bash
npm install bcryptjs @types/bcryptjs
```

---

### Problem: "Invalid/Missing environment variable: MONGODB_URI"

**Solution:**
1. Check `.env.local` file exists in root folder
2. Verify `MONGODB_URI=` line is there
3. Restart dev server (`Ctrl+C`, then `npm run dev`)

---

### Problem: "Failed to connect to MongoDB"

**Solutions:**

**If using Atlas:**
1. Check IP whitelist in MongoDB Atlas
2. Verify password in connection string is correct (no `<` `>` symbols)
3. Ensure cluster is active (not paused)

**If using Local:**
1. Check MongoDB service is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

---

### Problem: "Invalid credentials" when logging in

**Solutions:**
1. Verify you created admin user (run createAdmin.js again)
2. Check email is exactly: `admin@leopannipitiyaparadise.org`
3. Check password is: `admin123`
4. Look for typos (case-sensitive!)

---

### Problem: Page shows "Loading..." forever

**Solution:**
1. Check browser console (F12) for errors
2. Verify NextAuth API is working:
   - Go to: `http://localhost:3000/api/auth/providers`
   - Should show JSON with credentials provider
3. Clear browser cache/cookies
4. Try incognito mode

---

### Problem: "Cannot read properties of undefined (reading 'user')"

**Solution:**
1. Make sure `<AuthProvider>` wraps your app in `layout.tsx`
2. Restart dev server
3. Clear browser cache

---

### Problem: Redirects to login but I just logged in

**Solutions:**
1. Check NEXTAUTH_URL in `.env.local` matches your URL
2. Check NEXTAUTH_SECRET is set
3. Clear cookies:
   - Chrome: Settings → Privacy → Clear browsing data → Cookies
4. Restart browser

---

## 🎓 Next Steps

Now that authentication is working:

### 1. **Create More Users**
Modify `scripts/createAdmin.js` to create regular members:
```javascript
role: 'member',  // instead of 'admin'
membershipNumber: 'MEM001',
```

### 2. **Customize Dashboard**
Edit `app/dashboard/page.tsx`:
- Add real project data
- Show actual service hours
- Display upcoming events from database

### 3. **Add Member Registration Form**
Update `/app/join/page.tsx` to:
- Call `/api/register` endpoint
- Let new members sign up
- Send confirmation email

### 4. **Add Password Reset**
Create forgot password flow:
- Email verification
- Reset token generation
- New password form

### 5. **Add Profile Editing**
Let users update their info:
- Name, phone, photo
- Change password
- Update preferences

### 6. **Role-Based Access**
Create admin-only pages:
- Manage all users
- Approve new members
- Add/edit projects

---

## 📞 Need Help?

If you're stuck:

1. **Check Console Errors:**
   - Browser: Press F12 → Console tab
   - Terminal: Look for error messages

2. **Verify Each Step:**
   - Go through checklist above
   - Don't skip steps!

3. **Common Issues:**
   - 90% of problems = environment variables
   - Check `.env.local` spelling
   - Restart server after changes

4. **Test MongoDB Connection:**
   ```bash
   node -e "require('./lib/mongodb.ts').then(() => console.log('Connected!'))"
   ```

---

## ✅ Checklist

- [ ] Node.js v18+ installed
- [ ] bcryptjs package installed
- [ ] MongoDB setup (Atlas or Local)
- [ ] `.env.local` file created with all variables
- [ ] NEXTAUTH_SECRET generated
- [ ] Admin user created via script
- [ ] Dev server running
- [ ] Successfully logged in
- [ ] Dashboard loads correctly
- [ ] Protected routes working

---

## 🎉 Congratulations!

You now have a fully functional authentication system!

**What you've achieved:**
✅ Secure password storage (bcrypt encryption)
✅ User login/logout functionality
✅ Protected member dashboard
✅ Session management (30-day expiry)
✅ Role-based access control
✅ MongoDB database integration

**Your website can now:**
- Let members log in securely
- Protect sensitive pages
- Track user sessions
- Store member information safely

---

**Happy Coding! 🚀**

*Leo Club of Pannipitiya Paradise - Leadership • Experience • Opportunity*
