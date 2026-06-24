import json
import os

class LoggerAgent:
    def __init__(self):
        self.logs_file = os.path.join(os.path.dirname(__file__), "..", "analytics.json")
        self.fraud_file = os.path.join(os.path.dirname(__file__), "..", "fraud_logs.json")
        
        self.logs = self._load_json(self.logs_file)
        self.fraud_cases = self._load_json(self.fraud_file)

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
