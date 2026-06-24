import json
import os

class LoggerAgent:
    def __init__(self):
        self.logs_file = os.path.join(os.path.dirname(__file__), "..", "analytics.json")
        self.fraud_file = os.path.join(os.path.dirname(__file__), "..", "fraud_logs.json")
        
        self.logs = self._load_json(self.logs_file)
        self.fraud_cases = self._load_json(self.fraud_file)

    def _load_json(self, filepath):
        if os.path.exists(filepath):
            with open(filepath, "r") as f:
                try:
                    return json.load(f)
                except json.JSONDecodeError:
                    return []
        return []

    def _save_json(self, filepath, data):
        with open(filepath, "w") as f:
            json.dump(data, f, indent=4)

    def log_decision(self, data: dict, eligible: bool, explanation: str):
        self.logs.append({
            "input": data,
            "eligible": eligible,
            "explanation": explanation
        })
        self._save_json(self.logs_file, self.logs)

    def log_fraud(self, data: dict):
        self.fraud_cases.append(data)
        self._save_json(self.fraud_file, self.fraud_cases)

    def get_logs(self):
        return self.logs

    def get_fraud_cases(self):
        return self.fraud_cases
