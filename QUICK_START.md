# 🎉 All Stars Helsinki - Quick Start Guide

## ✅ Current Status: RUNNING!

Your All Stars Helsinki application is now running in **MOCK MODE** for testing!

### 🖥️ **Access Your Application:**

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000
- **Players Page**: http://localhost:3001/players

### 🏃‍♂️ **What You Can Test:**

1. **View Players** - See the mock player roster
2. **Add New Players** - Use the add player form
3. **Edit Players** - Click the edit (✎) button on any player
4. **Delete Players** - Click the delete (✕) button on any player

### 📊 **Mock Data Included:**

- John Doe (#10, Forward)
- Jane Smith (#7, Midfielder)
- Mike Johnson (#1, Goalkeeper)

## 🔄 **Running Servers:**

### Backend (Port 5000)

```bash
cd backend
npm run mock        # Mock mode (no Firebase needed)
# OR
npm run dev:mock    # Mock mode with auto-restart
```

### Frontend (Port 3001)

```bash
cd frontend
npm run dev
```

## 🔥 **To Use Real Firebase Later:**

1. **Get your Firebase service account key** from Firebase Console
2. **Update `backend/.env`** with the real private key
3. **Run the real backend:**
   ```bash
   cd backend
   npm start    # Uses real Firebase
   ```

## 🎯 **Available API Endpoints:**

- `GET /api/players` - Get all players
- `POST /api/players` - Add new player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player
- `GET /api/health` - Health check

## 🚀 **You're Ready to Go!**

Open http://localhost:3001 in your browser and start testing your All Stars Helsinki team management system!

---

**Note**: Currently running in mock mode. All data is stored in memory and will reset when you restart the backend server.
