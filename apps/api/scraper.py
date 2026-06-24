import requests
from bs4 import BeautifulSoup
from api.db import get_db_connection
import sqlite3

def run_automated_scraper():
    """
    Simulates scraping a national portal for new scholarships.
    In a real production environment, this would target specific government HTML structures.
    """
    print("[Scraper] Starting automated background scrape...")
    
    # Mock data that would normally be parsed via BeautifulSoup from requests.get()
    scraped_data = [
        {"name": "National Merit Fellowship 2026", "category": "GENERAL", "max_income": 800000, "portal": "https://scholarships.gov.in"},
        {"name": "Tech Innovators Grant", "category": "OBC", "max_income": 600000, "portal": "https://aicte-india.org"},
        {"name": "Minority Excellence Award", "category": "MINORITY", "max_income": 500000, "portal": "https://minorityaffairs.gov.in"}
    ]
    
    conn = get_db_connection()
    added = 0
    for s in scraped_data:
        try:
            cursor = conn.execute(
                "INSERT INTO scholarships (name, category, max_income, portal) VALUES (?, ?, ?, ?)",
                (s["name"], s["category"], s["max_income"], s["portal"])
            )
            added += 1
            
            # Autonomous Matching & Alerts
            profiles = conn.execute("SELECT user_id, category, income FROM user_profiles").fetchall()
            for profile in profiles:
                if profile["category"] == s["category"] and profile["income"] <= s["max_income"]:
                    msg = f"New Match! {s['name']} is now available for your profile."
                    conn.execute("INSERT INTO alerts (user_id, message) VALUES (?, ?)", (profile["user_id"], msg))
                    
        except sqlite3.IntegrityError:
            pass # Already exists
            
    conn.commit()
    conn.close()
    print(f"[Scraper] Added {added} new scholarships and dispatched alerts.")
