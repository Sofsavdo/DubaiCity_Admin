# Dubai City Bot Backend

Bu loyihada Dubai City Bot uchun backend API va Telegram bot servislari mavjud.

## Tuzilish

```
backend/
├── services/           # Asosiy xizmatlar
│   ├── dataStorage.js  # Ma'lumotlar bazasi xizmati
│   ├── gameService.js  # O'yin mantiqiy xizmati
│   └── telegramBot.js  # Telegram bot xizmati
├── routes/             # API marshrut fayllari
│   ├── admin.js        # Admin panel API
│   ├── bot.js          # Bot API
│   └── webhook.js      # Webhook marshrut
├── middleware/         # Middleware funksiyalari
│   ├── auth.js         # Autentifikatsiya
│   └── errorHandler.js # Xato boshqarish
├── data/              # Local ma'lumotlar fayllari
├── server.js          # Asosiy server fayl
└── package.json       # Dependencies
```

## Xususiyatlari

### Admin Panel API (`/api/admin`)
- ✅ Foydalanuvchilar boshqaruvi
- ✅ Vazifalar boshqaruvi
- ✅ Skinlar boshqaruvi
- ✅ Bozor mahsulotlari boshqaruvi
- ✅ Promo kodlar boshqaruvi
- ✅ Dashboard statistikasi

### Bot API (`/api/bot`)
- ✅ Foydalanuvchi autentifikatsiyasi
- ✅ Profil ma'lumotlari
- ✅ Tap o'yini
- ✅ Soatlik daromad yig'ish
- ✅ Vazifalar bajarish
- ✅ Mahsulot sotib olish
- ✅ Empire darajasini oshirish
- ✅ Kunlik bonus
- ✅ Referral tizimi

### Telegram Bot Features
- ✅ Inline keyboard bilan interaktiv interfeys
- ✅ Vazifalar va mukofotlar
- ✅ Biznes sotib olish
- ✅ Reyting jadval
- ✅ Profil ma'lumotlari
- ✅ Kunlik va soatlik bonuslar

## O'rnatish

1. Dependencies o'rnatish:
```bash
npm install
```

2. Environment variables sozlash:
```bash
cp .env.example .env
# .env faylda qiymatlarni to'ldiring
```

3. Serverni ishga tushirish:
```bash
npm start
```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server porti (default: 3001)
- `TELEGRAM_BOT_TOKEN` - Asosiy bot token
- `TELEGRAM_ADMIN_BOT_TOKEN` - Admin bot token
- `JWT_SECRET` - JWT maxfiy kalit
- `DATABASE_URL` - Database URL (production uchun)

## Deploy (Render)

1. GitHub repository yarating
2. Render.com'da yangi Web Service yarating
3. Environment variables qo'shing
4. Deploy tugmasini bosing

## API Endpoints

### Admin Panel
- `GET /api/admin/stats` - Dashboard statistikasi
- `GET /api/admin/users` - Foydalanuvchilar ro'yxati
- `POST /api/admin/users` - Yangi foydalanuvchi
- `PUT /api/admin/users/:id` - Foydalanuvchini yangilash
- `DELETE /api/admin/users/:id` - Foydalanuvchini o'chirish

### Bot API
- `POST /api/bot/auth` - Foydalanuvchi autentifikatsiyasi
- `GET /api/bot/profile/:telegramId` - Profil ma'lumotlari
- `POST /api/bot/tap` - Tap o'yini
- `POST /api/bot/tasks/:id/complete` - Vazifani bajarish
- `POST /api/bot/purchase` - Mahsulot sotib olish

### Webhook
- `POST /webhook/telegram` - Telegram bot webhook
- `POST /webhook/admin` - Admin bot webhook

## Telegram Bot Commands

- `/start` - Botni ishga tushirish
- `/profile` - Profil ma'lumotlari
- `/tasks` - Vazifalar ro'yxati
- `/market` - Biznes bozori
- `/leaderboard` - Reyting jadval
- `/help` - Yordam

## Xavfsizlik

- ✅ Helmet.js bilan xavfsizlik
- ✅ Rate limiting
- ✅ CORS sozlanishi
- ✅ JWT autentifikatsiya
- ✅ Input validation
- ✅ Error handling

## Monitoring

- ✅ Morgan logging
- ✅ Health check endpoint (`/health`)
- ✅ Error tracking
- ✅ Performance monitoring