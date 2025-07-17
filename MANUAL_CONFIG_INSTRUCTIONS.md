# 🔧 QAYSI FAYLLARNI O'ZGARTIRISH KERAK - VERCEL UCHUN

## 1. VERCEL.JSON FAYLI (tayyor)
Fayl: `vercel.json`
Status: ✅ Tayyor, o'zgartirishga hojat yo'q

## 2. PACKAGE.JSON SCRIPTS QISMI
Fayl: `package.json`
**O'zgartirishingiz kerak:**

```json
"scripts": {
  "dev": "vite",
  "build": "vite build", 
  "lint": "eslint .",
  "preview": "vite preview",
  "vercel-build": "npm run build"
}
```

`"vercel-build": "npm run build"` qatorini qo'shing.

## 3. VITE.CONFIG.TS FAYLI
Fayl: `vite.config.ts`
**Hozirgi kodi:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**O'zgartiring:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  base: '/'
})
```

## 4. .ENV FAYLI
Fayl: `.env`
**Qo'shing:**
```
VITE_API_URL=https://your-backend.onrender.com
VITE_ADMIN_API_URL=https://your-backend.onrender.com/api/admin
```

## 5. API SOZLAMALARI
Fayl: `src/lib/api.ts` (agar bor bo'lsa)
**Backend URL'ni o'zgartiring:**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:3001/api/admin';
```

## 6. VERCEL DEPLOYMENT SETTINGS
Vercel dashboard'da:
- Framework Preset: **React**
- Build Command: **npm run build**
- Output Directory: **dist**
- Install Command: **npm install**

## 7. ENVIRONMENT VARIABLES (Vercel dashboard'da)
```
VITE_API_URL=https://your-backend.onrender.com
VITE_ADMIN_API_URL=https://your-backend.onrender.com/api/admin
NODE_ENV=production
```

## MUHIM ESLATMA:
Bu o'zgarishlardan keyin loyiha faqat Vercel'ga mo'ljallangan bo'ladi va boshqa platformalarda ishlamaydi.

Qaysi faylni birinchi o'zgartirish kerak?