import sqlite3

def init_db():
    conn = sqlite3.connect("db/crypto_royale.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            energy INTEGER DEFAULT 1000,
            dubaicoins INTEGER DEFAULT 0,
            vip_status INTEGER DEFAULT 0,
            streak_days INTEGER DEFAULT 0,
            last_tap INTEGER DEFAULT 0,
            last_streak_check INTEGER DEFAULT 0
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS promocodes (
            code TEXT PRIMARY KEY,
            discount TEXT,
            expiry INTEGER,
            limit INTEGER,
            used INTEGER DEFAULT 0,
            description TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ads (
            link TEXT PRIMARY KEY,
            reward INTEGER,
            click_limit INTEGER,
            clicks INTEGER DEFAULT 0
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS nfts (
            nft_id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            price INTEGER,
            owner INTEGER
        )
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()