class FraudDetector:
    def is_fraud(self, data: dict) -> bool:
        # Simple fraud rules (can be ML later)
        if data.get("attempts", 0) > 3:
            return True
        if data.get("income", 0) < 0:
            return True
        return False
