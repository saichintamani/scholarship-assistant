import os
from openai import OpenAI

class ReasoningAgent:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def evaluate_constraints(self, user_profile: dict, scholarship: dict) -> str:
        """
        Uses LLM to logically reason if a user strictly meets the constraints of a specific scholarship.
        """
        if not self.client:
            return "Unable to reason without OPENAI_API_KEY."

        prompt = f"""
        You are a strict Eligibility Reasoning Agent. 
        User Profile: {user_profile}
        Scholarship Constraints: {scholarship}
        
        Evaluate logically if this user perfectly matches the scholarship. 
        Return a short paragraph explaining exactly why or why not they are eligible.
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=150,
                temperature=0.2
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"Reasoning Error: {str(e)}"
