from aiogram import types
import sqlite3
import time

conn = sqlite3.connect("db/crypto_royale.db")
cursor = conn.cursor()

async def tap_to_earn(message: types.Message):
    user_id = message.from_user.id
    current_time = int(time.time())

    # Foydalanuvchi ma'lumotlarini olish
    cursor.execute("SELECT energy, dubaicoins, last_tap, vip_status, streak_days, last_streak_check FROM users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    if not user:
        cursor.execute("INSERT INTO users (user_id, energy, dubaicoins) VALUES (?, ?, ?)", (user_id, 1000, 0))
        conn.commit()
        user = (1000, 0, 0, 0, 0, 0)

    energy, dubaicoins, last_tap, vip_status, streak_days, last_streak_check = user

    # Anti-cheat: Tez bosishni cheklash
    if current_time - last_tap < 0.33:
        await message.reply("Juda tez bosyapsiz!")
        return

    # Energiya tekshiruvi
    if energy > 0:
        coins_earned = 10 if vip_status else 5
        new_energy = energy - 1
        new_dubaicoins = dubaicoins + coins_earned

        # Streak tekshiruvi
        if current_time - last_streak_check >= 86400:  # 24 soat
            if current_time - last_tap <= 86400:
                streak_days += 1
                if streak_days == 7:
                    new_dubaicoins += 500  # 7 kunlik bonus
                    await message.reply("7 kunlik bonus: 500 Dubaicoin!")
            else:
                streak_days = 1
            last_streak_check = current_time

        cursor.execute("""
            UPDATE users
            SET energy = ?, dubaicoins = ?, last_tap = ?, streak_days = ?, last_streak_check = ?
            WHERE user_id = ?
        """, (new_energy, new_dubaicoins, current_time, streak_days, last_streak_check, user_id))
        conn.commit()

        await message.reply(f"{coins_earned} Dubaicoin oldingiz! Energiya: {new_energy}")

        # Promo kod sharti
        if new_dubaicoins >= 1000:
            cursor.execute("SELECT code, discount, description FROM promocodes WHERE limit > used AND expiry > ? LIMIT 1", (current_time,))
            promo = cursor.fetchone()
            if promo:
                cursor.execute("UPDATE promocodes SET used = used + 1 WHERE code = ?", (promo[0],))
                conn.commit()
                await message.reply(f"Yangi promo kod: {promo[0]}\nChegirma: {promo[1]}\nIzoh: {promo[2]}")
    else:
        await message.reply("Energiyangiz tugadi! Soatiga 100 energiya tiklanadi.")