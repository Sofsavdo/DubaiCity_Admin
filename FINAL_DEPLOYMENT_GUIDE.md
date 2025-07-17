# Dubai City - Final Deployment Guide

## Overview
Bu loyiha ikkita alohida repositorydan iborat:

1. **DubaiCity_Admin** - Backend (Express.js) + Admin Panel (React)
   - Render.com da deploy qilinadi
   - PostgreSQL database
   - Telegram bot server
   - API endpoints

2. **DubaiCity** - Frontend Telegram Web App (React)
   - Vercel.com da deploy qilinadi
   - API proxy orqali backend bilan bog'lanadi

## Architecture

```
Telegram Bot → DubaiCity_Admin (Render) ← DubaiCity (Vercel)
                     ↑
               PostgreSQL Database
```

## 1. Backend Deployment (DubaiCity_Admin)

### Render.com Setup

1. **Repository Connection**
   - Render.com ga kiring
   - DubaiCity_Admin repository ni connect qiling
   - Web Service sifatida setup qiling

2. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://username:password@host:port/database
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TON_WALLET_ADDRESS=your_ton_wallet_address
   ```

3. **Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Node Version: 18.x yoki yuqori

4. **Health Check**
   - Health Check Path: `/api/health`

### Database Setup

1. **PostgreSQL Database**
   - Render da PostgreSQL service yarating
   - Database URL ni Backend environment variables ga qo'shing

2. **Migrations**
   ```bash
   npm run db:generate  # Schema dan migration generate qilish
   npm run db:migrate   # Migration larni ishga tushirish
   npm run db:seed      # Test data qo'shish (optional)
   ```

## 2. Frontend Deployment (DubaiCity)

### Vercel.com Setup

1. **Repository Connection**
   - Vercel.com ga kiring
   - DubaiCity repository ni connect qiling

2. **Environment Variables**
   ```env
   NODE_ENV=production
   BACKEND_URL=https://your-backend-url.onrender.com
   ```

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 3. Telegram Bot Configuration

### BotFather Setup

1. **Bot Creation**
   ```
   /newbot
   Your Bot Name
   your_bot_username
   ```

2. **Web App Setup**
   ```
   /setmenubutton
   @your_bot_username
   Play Game
   https://your-app.vercel.app
   ```

3. **Bot Token**
   - Bot tokenni DubaiCity_Admin environment variables ga qo'shing

## 4. Production Checklist

### Backend (DubaiCity_Admin)
- [ ] Database connection configured
- [ ] Environment variables set
- [ ] Health check working: `/api/health`
- [ ] Telegram bot token configured
- [ ] CORS properly configured
- [ ] SSL/HTTPS enabled

### Frontend (DubaiCity)
- [ ] Backend URL configured
- [ ] API proxy working
- [ ] Build successful
- [ ] Static files serving correctly
- [ ] Responsive design working

### Integration Testing
- [ ] Telegram authentication working
- [ ] API calls from frontend to backend working
- [ ] Database operations working
- [ ] Bot commands responding
- [ ] Web app opens in Telegram

## 5. Environment Variables

### DubaiCity_Admin (Backend)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:pass@host:port/db
TELEGRAM_BOT_TOKEN=1234567890:ABCDEFghijklmnopqrstuvwxyz
TON_WALLET_ADDRESS=UQCyQs9OCWvwYqwfcWE5rDkH0T9B4iJyp52_6Bv64_uNyVg6
```

### DubaiCity (Frontend)
```env
NODE_ENV=production
BACKEND_URL=https://dubai-city-backend.onrender.com
```

## 6. API Endpoints

### Authentication
- `POST /api/telegram/auth` - Telegram Web App authentication

### User Management
- `GET /api/users` - Barcha userlar
- `POST /api/users` - Yangi user yaratish
- `GET /api/users/:id` - User malumotlari
- `PUT /api/users/:id` - User yangilash

### Game Content
- `GET /api/tasks` - Vazifalar
- `GET /api/skins` - Skinlar
- `GET /api/businesses` - Bizneslar
- `GET /api/empire-levels` - Empire darajalari

### Admin Features
- `GET /api/notifications` - Bildirishnomalar
- `GET /api/promo-codes` - Promo kodlar
- `GET /api/teams` - Jamoalar
- `GET /api/projects` - Loyihalar
- `GET /api/settings` - Sozlamalar

## 7. Troubleshooting

### Database Issues
```bash
# Connection check
curl https://your-backend.onrender.com/api/health

# Database reset (development only)
npm run db:reset
```

### API Issues
```bash
# Frontend proxy test
curl https://your-app.vercel.app/api/health

# Direct backend test
curl https://your-backend.onrender.com/api/health
```

### Bot Issues
- Bot token to'g'ri ekanligini tekshiring
- Web app URL to'g'ri ekanligini tekshiring
- HTTPS ishlatilganligini tekshiring

## 8. Performance Optimization

### Backend
- Database connection pooling
- Response caching
- Request rate limiting
- Gzip compression

### Frontend
- Code splitting
- Image optimization
- Bundle size minimization
- CDN usage (Vercel automatic)

## 9. Security

### Backend
- Environment variables xavfsizligi
- CORS to'g'ri konfiguratsiya
- SQL injection prevention (Drizzle ORM)
- Input validation

### Frontend
- API endpoint validation
- Secure token handling
- XSS prevention

## 10. Monitoring

### Health Checks
- Backend: `https://your-backend.onrender.com/api/health`
- Frontend: `https://your-app.vercel.app`

### Logs
- Render: Real-time logs available
- Vercel: Function logs in dashboard

Bu qo'llanma orqali loyihani to'liq deploy qilish va production da ishlatish mumkin.