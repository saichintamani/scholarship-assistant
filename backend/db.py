import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "samvaadai.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Scholarships Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS scholarships (
        name TEXT PRIMARY KEY,
        category TEXT,
        max_income INTEGER,
        portal TEXT
    )
    ''')
    
    # Decisions Log Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS decisions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eligible BOOLEAN,
        category TEXT,
        income INTEGER,
        explanation TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Fraud Log Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS fraud_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        income INTEGER,
        attempts INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the tables if they don't exist
init_db()
