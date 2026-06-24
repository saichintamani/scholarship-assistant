import os
import json
from openai import OpenAI

class FraudDetector:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def is_fraud(self, data: dict) -> bool:
        if data.get("attempts", 0) > 3:
            return True
        if data.get("income", 0) < 0:
            return True
            
        if not self.client:
            return False

        try:
            prompt = f"Analyze the following scholarship application data for logical inconsistencies or potential fraud: {json.dumps(data)}. Respond ONLY with the exact word 'FRAUD' if it is highly suspicious, otherwise 'CLEAN'."
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.0
            )
            return "FRAUD" in response.choices[0].message.content.upper()
        except Exception:
            return False
