import sqlite3
import os

# Use an environment variable for the data directory if it exists, otherwise use local directory
DATA_DIR = os.environ.get("DATA_DIR", os.path.dirname(__file__))
DB_PATH = os.path.join(DATA_DIR, "samvaadai.db")

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
    
    # Users Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        hashed_password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Saved Applications Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS saved_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        scholarship_name TEXT,
        status TEXT DEFAULT 'Saved',
        saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
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
