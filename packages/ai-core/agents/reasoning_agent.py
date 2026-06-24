import os
import google.generativeai as genai

class ReasoningAgent:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    def evaluate_constraints(self, user_profile: dict, scholarship: dict, language: str = "English") -> str:
        """
        Uses LLM to logically reason if a user strictly meets the constraints of a specific scholarship.
        """
        if not self.model:
            return "Unable to reason without GEMINI_API_KEY."

        prompt = f"""
        You are a strict Eligibility Reasoning Agent. 
        User Profile: {user_profile}
        Scholarship Constraints: {scholarship}
        
        Evaluate logically if this user perfectly matches the scholarship. 
        Pay special attention to the 'category' or 'caste' requirements (e.g. SC, ST, OBC, General). 
        If the user's category does not match the scholarship's required category, explicitly state they are ineligible due to caste constraints.

        IMPORTANT: You MUST write your entire response in {language}. Do NOT write in English unless {language} is English.
        Return a short paragraph explaining exactly why or why not they are eligible in {language}.
        """

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Reasoning Error: {str(e)}"
