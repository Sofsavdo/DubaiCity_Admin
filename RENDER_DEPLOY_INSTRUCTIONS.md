# Render Deployment Instructions

## Backend Deployment on Render

### Step 1: Create Render Service
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" -> "Web Service"
3. Connect your GitHub repository
4. Configure the service:

### Step 2: Service Configuration
- **Name**: `dubai-city-backend`
- **Runtime**: `Node`
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `tsx backend/index.ts`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:

```
NODE_ENV=production
DATABASE_URL=your_postgresql_database_url
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
PORT=10000
```

### Step 4: Health Check
- **Health Check Path**: `/api/health`
- The health endpoint will respond with server status

### Step 5: Database Setup
1. Create PostgreSQL database on Render or use external provider
2. Add DATABASE_URL to environment variables
3. Run database migration: `npm run db:push`

## Important Notes

✅ **Ready for deployment:**
- Health check endpoint configured at `/api/health`
- PORT environment variable properly handled
- Database connection with SSL support
- CORS configured for production
- All API endpoints working correctly

⚠️ **"Cannot GET /" is NORMAL:**
- Backend only serves API routes (`/api/*`)
- Frontend will be deployed separately on Vercel
- Main page (/) is not supposed to work on backend

✅ **Testing before deploy:**
```bash
# Test health endpoint
curl https://your-app.onrender.com/api/health

# Test admin API
curl https://your-app.onrender.com/api/admin/stats
```

✅ **After deployment:**
- Update frontend `.env.production` with your Render URL
- Test all API endpoints
- Verify database connection

## Troubleshooting

**Common issues:**
1. **Build fails**: Check Node.js version compatibility
2. **Database connection**: Verify DATABASE_URL and SSL settings
3. **Port issues**: Render automatically assigns PORT, ensure it's used correctly
4. **CORS errors**: Verify frontend domain is allowed

**Logs access:**
- Check Render dashboard for real-time logs
- Monitor startup messages and error logs