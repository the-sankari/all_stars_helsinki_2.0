# Environment Setup Guide

## Backend Environment Setup

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Get your Firebase Admin SDK credentials:**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

3. **Update the `.env` file with your Firebase credentials:**
   ```
   FIREBASE_PROJECT_ID=your-actual-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-actual-private-key\n-----END PRIVATE KEY-----"
   ```

## Frontend Environment Setup

1. **Copy the example file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Get your Firebase Web App config:**

   - Go to Firebase Console > Project Settings > General
   - Scroll down to "Your apps" section
   - Click on your web app or create one
   - Copy the config object values

3. **Update the `.env.local` file:**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

## Quick Start (After Environment Setup)

1. **Start Backend:**

   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Common Issues

- **Private Key Format**: Make sure the private key includes `\n` for line breaks
- **Quotes**: Wrap the private key in double quotes
- **Project ID**: Must match exactly from Firebase Console
- **Client Email**: Should be the service account email

## Security Notes

- Never commit `.env` files to git
- Add `.env` to your `.gitignore`
- Use different Firebase projects for development and production
