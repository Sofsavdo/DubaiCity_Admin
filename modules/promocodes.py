from aiogram import types
import sqlite3
import pandas as pd
from datetime import datetime

conn = sqlite3.connect("db/crypto_royale.db")
cursor = conn.cursor()

def load_promocodes_from_excel(file_path):
    df = pd.read_excel(file_path)
    for _, row in df.iterrows():
        cursor.execute("""
            INSERT OR REPLACE INTO promocodes (code, discount, expiry, limit, description)
            VALUES (?, ?, ?, ?, ?)
        """, (row['code'], row['discount'], row['expiry'], row['limit'], row['description']))
    conn.commit()

async def give_promocode(message: types.Message):
    user_id = message.from_user.id
    current_time = int(datetime.now().timestamp())

    cursor.execute("SELECT dubaicoins FROM users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    if user and user[0] >= 1000:
        cursor.execute("SELECT code, discount, description FROM promocodes WHERE limit > used AND expiry > ? LIMIT 1", (current_time,))
        promo = cursor.fetchone()
        if promo:
            cursor.execute("UPDATE promocodes SET used = used + 1 WHERE code = ?", (promo[0],))
            conn.commit()
            await message.reply(f"Promo kod: {promo[0]}\nChegirma: {promo[1]}\nIzoh: {promo[2]} (Uzum Market’da ishlatishingiz mumkin)")
        else:
            await message.reply("Hozirda promo kod mavjud emas!")
    else:
        await message.reply("Promo kod olish uchun kamida 1000 Dubaicoin yig‘ing!")