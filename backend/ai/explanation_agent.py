import os
import json
from openai import OpenAI

class ExplanationAgent:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def generate_explanation(self, user_data: dict, eligible_scholarships: list, language: str = "English") -> str:
        if self.client:
            try:
                prompt = f"""
        You are an empathetic, national-level scholarship advisor for Indian students.
        The user is a student trying to find scholarships. They provided the following details:
        - Category: {user_data['category']}
        - Annual Family Income: ₹{user_data['income']}
        - Passed Last Exam: {'Yes' if user_data['passed'] else 'No'}
        - Application Attempts: {user_data['attempts']}
        
        Based on our database, they are eligible for the following scholarships:
        {[s['name'] for s in eligible_scholarships]} if the list is empty, they are not eligible for any.
        
        Provide a concise, empathetic explanation (2-3 sentences max) to the student.
        CRITICAL: You MUST write your response entirely in the {language} language.
        """
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.7
                )
                return response.choices[0].message.content.strip()
            except Exception:
                pass

        if eligible_scholarships:
            names = [s["name"] for s in eligible_scholarships]
            return (
                f"You are eligible for the following scholarship(s): {', '.join(names)}. "
                f"This is because you belong to the {data['category']} category, "
                f"your annual income of ₹{data['income']} is within the limits, "
                f"and your academic record meets the criteria."
            )
        else:
            reasons = []
            if not data["passed"]:
                reasons.append("you have not passed the previous examination")
            if data["attempts"] > 2:
                reasons.append("you have exceeded the maximum allowed attempts")
            
            if not reasons:
                reasons.append("no available scholarships match your category and income criteria")

            return "You are not eligible because " + " and ".join(reasons) + "."
