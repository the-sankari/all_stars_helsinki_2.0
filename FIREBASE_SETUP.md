# 🔥 Firebase Setup Instructions for All Stars Helsinki

## ✅ Frontend Configuration - COMPLETE

Your frontend Firebase config is already set up in `frontend/.env.local`

## ⚠️ Backend Configuration - NEEDS SERVICE ACCOUNT KEY

### Step 1: Get Your Firebase Admin SDK Private Key

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `all-stars-helsinki`
3. **Go to Project Settings** (gear icon) → **Service Accounts**
4. **Click "Generate new private key"**
5. **Download the JSON file**

### Step 2: Extract the Required Information

From the downloaded JSON file, you need:

- `private_key` (the long string starting with "-----BEGIN PRIVATE KEY-----")
- `client_email` (something like `firebase-adminsdk-xxxxx@all-stars-helsinki.iam.gserviceaccount.com`)

### Step 3: Update backend/.env

Replace these values in your `backend/.env` file:

```env
FIREBASE_CLIENT_EMAIL=your-actual-service-account-email@all-stars-helsinki.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Actual-Private-Key-Here\n-----END PRIVATE KEY-----"
```

### Step 4: Test the Setup

```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

## 🚨 Important Security Notes

- ✅ **Never commit the real private key** to git
- ✅ **Keep your service account JSON file secure**
- ✅ **The .env files are already in .gitignore**

## 🔧 Current Status

- ✅ Frontend: Ready to go
- ⚠️ Backend: Needs service account private key
- ✅ Project ID: `all-stars-helsinki`
- ✅ Dependencies: Installed

Your project is 90% ready! Just need that service account key! 🚀
