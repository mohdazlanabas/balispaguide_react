# How to Start Locally - WORKING GUIDE

## ✅ Fixed! You Can Now Run From Root

The root `package.json` has been updated. You can now run everything from the project root.

---

## 🚀 Quick Start (3 Steps)

### 1. Start Backend (from root)
```bash
cd /Users/rogerwoolie/Documents/Managed_Website/new_balispaguide
npm run dev:backend
```

**You should see:**
```
Backend running on http://localhost:4000
```

### 2. Start Frontend (new terminal, from root)
```bash
cd /Users/rogerwoolie/Documents/Managed_Website/new_balispaguide
npm run dev:frontend
```

**You should see:**
```
VITE v7.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3. Open Browser
```bash
open http://localhost:5173
```

---

## 🔧 If Frontend Shows Blank Screen

This usually means the API isn't responding. Try these fixes:

### Fix 1: Check Backend is Running
Open http://localhost:4000 in browser

**Should see:**
```
Bali Spa Directory API is running. Use /api/filters, /api/spas, or start the frontend at http://localhost:5173.
```

### Fix 2: Test API Endpoint
```bash
curl http://localhost:4000/api/filters
```

**Should return JSON with locations and treatments**

### Fix 3: Check Browser Console
1. Open http://localhost:5173
2. Press `F12` or `Cmd+Option+I` (Mac)
3. Click "Console" tab
4. Look for errors (red text)

**Common errors:**
- `Failed to fetch` - Backend not running
- `CORS error` - Backend CORS issue (shouldn't happen)
- `404 Not Found` - Wrong API URL

### Fix 4: Hard Refresh
```bash
# In browser on http://localhost:5173
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R
```

---

## 📋 Available Commands (from root)

```bash
# Backend
npm run dev:backend          # Start backend server
npm run backend              # Same as above

# Frontend
npm run dev:frontend         # Start frontend dev server
npm run frontend             # Same as above

# Both (experimental)
npm run dev                  # Start both at once

# Install
npm run install:all          # Install all dependencies
```

---

## 🧪 Testing Each Part

### Test Backend:
```bash
# Terminal 1
npm run dev:backend

# Terminal 2 - Test it
curl http://localhost:4000
curl http://localhost:4000/api/filters
curl "http://localhost:4000/api/spas?page=1"
```

### Test Frontend:
```bash
# Start both servers
npm run dev:backend          # Terminal 1
npm run dev:frontend         # Terminal 2

# Open in browser
open http://localhost:5173

# Should see: Bali Spa Directory with search bar and spa listings
```

---

## ⚠️ Troubleshooting

### "Port 4000 is already in use"
```bash
# Find what's using port 4000
lsof -i :4000

# Kill it
kill -9 <PID>

# Or use different port
PORT=4001 npm run dev:backend
```

### "Port 5173 is already in use"
```bash
# Find and kill process
lsof -i :5173
kill -9 <PID>
```

### Backend won't start from root
```bash
# Make sure backend/package.json has "start" script
cat backend/package.json | grep start

# Should see: "start": "node server.js"

# If missing, add it or run directly:
cd backend && node server.js
```

### Frontend shows blank screen
1. **Check backend is running**: http://localhost:4000
2. **Check browser console** for errors (F12)
3. **Hard refresh** browser (Cmd+Shift+R)
4. **Check API response**: `curl http://localhost:4000/api/spas`

---

## 📊 What Should Work

Once both servers are running:

✅ **Homepage** - Browse all spas with filters
✅ **Locations** - Filter by location
✅ **Treatments** - Filter by treatment type
✅ **Shopping Cart** - Add items to cart
✅ **Payment Page** - Review bookings

**Note:** Login/Database features are not built yet (Days 1-10 in references/plan.md)

---

## 🎯 Next Steps

Once you see spas loading on http://localhost:5173:

1. ✅ Test the shopping cart
2. ✅ Try adding a booking
3. 📝 Start building authentication (references/plan.md Day 1)

---

## 💡 Pro Tips

### One-Line Startup
```bash
# Start both in background
npm run dev:backend &
npm run dev:frontend
```

### Check if servers are running
```bash
# Backend
curl -s http://localhost:4000 && echo "✅ Backend is running"

# Frontend
curl -s http://localhost:5173 && echo "✅ Frontend is running"
```

### Clean restart
```bash
# Kill all node processes
killall node

# Start fresh
npm run dev:backend
npm run dev:frontend
```

---

**Last Updated**: December 15, 2025
**Status**: ✅ Root scripts now working
