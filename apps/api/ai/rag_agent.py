import os
import json
from openai import OpenAI

class RagAgent:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def chat(self, user_query: str, db_scholarships: list) -> str:
        if not self.client:
            return "RAG Chat is offline because OPENAI_API_KEY is missing."

        context = json.dumps([{"name": s["name"], "category": s["category"], "max_income": s["max_income"]} for s in db_scholarships])
        
        prompt = f"""
        You are 'Samvaad Guide', an expert AI scholarship assistant.
        The user has asked: "{user_query}"
        
        Here is the current live database of scholarships:
        {context}
        
        Answer their question naturally, concisely, and helpfully based ONLY on the scholarships provided above.
        If they mention their category or income, match them accordingly.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=200,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"RAG API Error: {e}")
            return "I am currently unable to process your request."
