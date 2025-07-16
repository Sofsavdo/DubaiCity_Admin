# 🚀 Dubai City Bot Production Deploy Guide

## 📋 Deploy Ketma-ketligi

### 1️⃣ BACKEND API (Render) - Birinchi
**Holat:** ⏳ Tayyorlanmoqda

#### Qadam 1: Backend Kodni Tayyorlash
```javascript
// server.js asosiy fayl
const express = require('express');
const cors = require('cors');
const app = express();

// CORS konfiguratsiya
app.use(cors({
  origin: ['https://your-admin-panel.vercel.app', 'https://t.me'],
  credentials: true
}));

// API endpoints
app.get('/api/admin/stats', (req, res) => {
  // Dashboard statistika
});

app.get('/api/admin/users', (req, res) => {
  // Foydalanuvchilar ro'yxati
});

// Boshqa endpoint'lar...

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`);
});
```

#### Qadam 2: Render.com Deploy
- [ ] Render.com'da yangi **Web Service** yaratish
- [ ] GitHub repository bog'lash
- [ ] Environment Variables:
  ```
  DATABASE_URL=postgresql://...
  JWT_SECRET=your-secret-key
  NODE_ENV=production
  PORT=3001
  ```
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`

#### Qadam 3: Database Sozlash
- [ ] Render'da PostgreSQL database yaratish
- [ ] Migration'larni ishga tushirish
- [ ] Test data qo'shish

**Natija:** Backend API `https://your-backend.onrender.com` da ishlaydi

---

### 2️⃣ TELEGRAM BOT (Render/Vercel) - Ikkinchi
**Holat:** ⏳ Backend tayyor bo'lgandan keyin

#### Qadam 1: Bot Yaratish
- [ ] @BotFather orqali yangi bot yaratish
- [ ] Bot token olish
- [ ] Bot username sozlash

#### Qadam 2: Web App Yaratish
```javascript
// telegram-webapp/index.html
<!DOCTYPE html>
<html>
<head>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
</head>
<body>
  <div id="game-app">
    <!-- O'yin interfeysi -->
  </div>
  
  <script>
    // Telegram Web App initialization
    window.Telegram.WebApp.ready();
    
    // Backend API bilan bog'lanish
    const API_URL = 'https://your-backend.onrender.com/api';
  </script>
</body>
</html>
```

#### Qadam 3: Bot Deploy
- [ ] Webhook URL sozlash: `https://api.telegram.org/bot{token}/setWebhook`
- [ ] SSL certificate tekshirish
- [ ] Bot commands sozlash

**Natija:** Bot `@YourDubaiCityBot` da ishlaydi

---

### 3️⃣ ADMIN PANEL (Vercel) - Oxirgi
**Holat:** ✅ Tayyor

#### Qadam 1: Environment Variables Yangilash
```bash
# .env.production
VITE_API_URL=https://your-backend.onrender.com/api/admin
VITE_ADMIN_API_URL=https://your-backend.onrender.com/api/admin
```

#### Qadam 2: Vercel Deploy
- [ ] GitHub repository bog'lash
- [ ] Environment Variables qo'shish
- [ ] Custom domain sozlash (ixtiyoriy)

#### Qadam 3: Integration Test
- [ ] Admin panel ↔️ Backend API ulanishi
- [ ] Backend API ↔️ Telegram Bot ulanishi
- [ ] To'liq tizim test qilish

**Natija:** Admin panel `https://dubai-city-admin.vercel.app` da ishlaydi

---

## 🔧 Hozirgi Admin Panel Konfiguratsiya

### Frontend (Tayyor)
- ✅ React 18 + TypeScript
- ✅ Tailwind CSS styling
- ✅ 18+ admin components
- ✅ API integration layer
- ✅ Fallback mock data
- ✅ Error handling
- ✅ Production build ready

### API Endpoints (Backend uchun)
```
GET  /api/admin/stats          - Dashboard statistika
GET  /api/admin/users          - Foydalanuvchilar
POST /api/admin/users          - Yangi foydalanuvchi
PUT  /api/admin/users/:id      - Foydalanuvchi yangilash
GET  /api/admin/tasks          - Vazifalar
POST /api/admin/tasks          - Yangi vazifa
GET  /api/admin/skins          - Skinlar
GET  /api/admin/businesses     - Bizneslar
GET  /api/admin/promocodes     - Promo kodlar
GET  /api/admin/notifications  - Bildirishnomalar
```

### Database Schema (PostgreSQL)
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  dubai_coin BIGINT DEFAULT 0,
  tap_profit INTEGER DEFAULT 1,
  hourly_income INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  energy INTEGER DEFAULT 100,
  premium_status BOOLEAN DEFAULT false,
  referral_code VARCHAR(50),
  language VARCHAR(10) DEFAULT 'uz',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_uz VARCHAR(255),
  title_ru VARCHAR(255),
  description TEXT,
  type VARCHAR(50), -- 'instagram', 'youtube', 'telegram', 'twitter'
  reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Boshqa tablular...
```

---

## 🎯 Keyingi Qadamlar

1. **Backend API yaratish** - Express.js + PostgreSQL
2. **Telegram Bot yaratish** - Bot token + Web App
3. **Production deploy** - Render + Vercel

**Admin panel to'liq tayyor va production uchun optimizatsiya qilingan!** 🎉