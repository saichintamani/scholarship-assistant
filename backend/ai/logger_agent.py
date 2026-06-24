import json
import os
from backend.db import get_db_connection

class LoggerAgent:
    def __init__(self):
        pass

    def log_decision(self, data: dict, eligible: bool, explanation: str):
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO decisions (eligible, category, income, explanation) VALUES (?, ?, ?, ?)",
            (eligible, data['category'], data['income'], explanation)
        )
        conn.commit()
        conn.close()

    def log_fraud(self, data: dict):
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO fraud_logs (category, income, attempts) VALUES (?, ?, ?)",
            (data['category'], data['income'], data.get('attempts', 1))
        )
        conn.commit()
        conn.close()

    def get_logs(self):
        conn = get_db_connection()
        rows = conn.execute("SELECT * FROM decisions ORDER BY id DESC").fetchall()
        conn.close()
        return [{"eligible": bool(r["eligible"]), "input": {"category": r["category"], "income": r["income"]}, "explanation": r["explanation"]} for r in rows]

    def get_fraud_cases(self):
        conn = get_db_connection()
        rows = conn.execute("SELECT * FROM fraud_logs ORDER BY id DESC").fetchall()
        conn.close()
        return [{"category": r["category"], "income": r["income"], "attempts": r["attempts"]} for r in rows]
