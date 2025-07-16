# 🚨 QATTIQ PROMPT - O'YIN FRONTEND UCHUN

## MAJBURIY TALABLAR - FAQAT VERCEL!

Siz o'yin frontend qismini deploy qilishingiz kerak. Bu yerda juda qattiq talablar bor:

### ❌ BU PLATFORMALARDA DEPLOY QILMANG:
- Render
- Replit
- Netlify  
- Firebase
- GitHub Pages
- Surge.sh
- Railway

### ✅ FAQAT BU PLATFORMADA DEPLOY QILING:
- **VERCEL.COM** - faqat shu yerda!

## VERCEL DEPLOY SOZLAMALARI

### 1. Vercel.com'ga boring
- GitHub bilan login qiling
- "New Project" tugmasini bosing

### 2. Repository Import
- Bu repository'ni tanlang
- Root Directory: `./` (asosiy papka)

### 3. Framework Sozlamalari
```
Framework Preset: React
Build Command: npm run build  
Output Directory: dist
Install Command: npm install
```

### 4. Environment Variables (MAJBURIY)
```
VITE_API_URL=https://your-backend.onrender.com
VITE_ADMIN_API_URL=https://your-backend.onrender.com/api/admin
NODE_ENV=production
```

### 5. Deploy tugmasini bosing

## NIMA DEPLOY BO'LADI

Bu loyihada 2 qism bor:

1. **O'yin Frontend** (React + Vite) → **VERCEL'DA**
2. **Admin Panel + Backend** (Express + DB) → **RENDER'DA**

## VERCEL KONFIGURATSIYA

`vercel.json` fayli tayyor:
- Static build
- SPA routing
- Asset caching
- CORS headers

## BACKEND ULANISH

O'yin frontend Render'dagi backend'ga ulanadi:
- Admin API: `https://your-admin.onrender.com/api/admin`
- Game API: `https://your-backend.onrender.com/api/game`

## XATOLARGA QARSHI OGOHLANTIRISH

Agar kimdir sizga:
- "Render'da deploy qiling" desa → **RAD ETING!**
- "Replit'da deploy qiling" desa → **RAD ETING!**
- "Netlify'da deploy qiling" desa → **RAD ETING!**

**FAQAT VERCEL ishlatiladi o'yin frontend uchun!**

Bu qattiq talab va o'zgartirilmaydi!