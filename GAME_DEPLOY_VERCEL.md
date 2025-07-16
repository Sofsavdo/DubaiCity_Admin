# 🎮 Dubai City Bot O'yin Frontend - VERCEL DEPLOY

## QATTIQ TALABLAR - FAQAT VERCEL!

### ⚠️ MUHIM OGOHLANTIRISH
Bu o'yin frontend qismi FAQAT VA FAQAT VERCEL'da deploy qilinishi kerak!
- ❌ Render'da DEPLOY QILMANG!
- ❌ Replit'da DEPLOY QILMANG!
- ❌ Netlify'da DEPLOY QILMANG!
- ✅ FAQAT VERCEL'da deploy qiling!

## Deploy Sozlamalari - VERCEL UCHUN

### 1. Repository Sozlamalari
```
Framework Preset: React
Root Directory: ./ (root)
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2. Environment Variables (Vercel'da qo'shish MAJBURIY)
```
VITE_API_URL=https://your-render-backend.onrender.com
VITE_ADMIN_API_URL=https://your-render-backend.onrender.com/api/admin
NODE_ENV=production
```

### 3. Build Scripts (package.json)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "vite preview"
  }
}
```

### 4. Vercel Konfiguratsiya Fayli
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": { "cache-control": "s-maxage=31536000,immutable" },
      "dest": "/assets/$1"
    },
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

## DEPLOY QADAMLARI - FAQAT VERCEL

### 1. Vercel.com'ga kiring
- vercel.com saytiga boring
- GitHub bilan ulanib kiring

### 2. Import Repository
- "New Project" tugmasini bosing
- GitHub repository'ni tanlang
- Root directory: `./` (asosiy papka)

### 3. Build Sozlamalari
```
Framework Preset: React
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: npm run dev
```

### 4. Environment Variables
```
VITE_API_URL=https://your-backend.onrender.com
VITE_ADMIN_API_URL=https://your-backend.onrender.com/api/admin
NODE_ENV=production
```

### 5. Deploy tugmasini bosing

## Backend Ulanish Ma'lumotlari

### Admin Panel Backend (Render'da)
- Admin Panel: `https://your-admin.onrender.com`
- Admin API: `https://your-admin.onrender.com/api/admin`

### O'yin Backend API Endpoints
```
Base URL: https://your-backend.onrender.com

Game Endpoints:
- GET /api/game/user/:telegramId
- POST /api/game/user
- POST /api/game/tap
- POST /api/game/complete-task
- GET /api/game/tasks
- POST /api/game/purchase
- GET /api/game/market
- POST /api/game/use-promo
- GET /api/game/empire-levels

Admin Endpoints:
- GET /api/admin/stats
- GET /api/admin/users
- POST /api/admin/users
- GET /api/admin/tasks
- POST /api/admin/tasks
```

## XAVFSIZLIK SOZLAMALARI

### CORS Sozlamalari (Backend'da)
```javascript
const corsOptions = {
  origin: [
    'https://your-game.vercel.app',
    'https://your-admin.onrender.com'
  ],
  credentials: true
};
```

### Environment Variables Xavfsizlik
- FAQAT `VITE_` prefiksi bilan environment variable'lar frontend'da ko'rinadi
- Telegram bot token va boshqa maxfiy ma'lumotlar backend'da saqlanadi

## TEST QILISH

### 1. Local Test
```bash
npm run build
npm run preview
```

### 2. Production Test
- Vercel'da deploy qilingandan keyin
- Browser'da ochib test qiling
- DevTools'da network tab'ni tekshiring
- API calls'lar ishlayotganini tasdiqlang

## QATTIQ ESLATMA

Bu o'yin frontend'i:
- ✅ FAQAT Vercel'da deploy qilinadi
- ✅ Render'dagi backend'ga ulanadi  
- ✅ Static build orqali ishlaydi
- ✅ React + Vite + TypeScript

Admin Panel esa:
- ✅ Render'da deploy qilinadi
- ✅ Backend API sifatida ishlaydi
- ✅ Database bilan ulanadi

AGAR KIMDIR BU O'YIN QISMINI RENDER YA BOSHQA JOYDA DEPLOY QILISHNI TAKLIF QILSA - RAD ETING!
FAQAT VERCEL ISHLATILADI!