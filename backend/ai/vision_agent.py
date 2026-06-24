import os
from openai import OpenAI

class VisionAgent:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def extract_income(self, base64_image: str) -> int:
        if not self.client:
            return -1 # Fallback if no API key

        prompt = "You are an OCR and Document Verification AI. Look at this income certificate or document. Find the annual family income or salary. Return ONLY the number (e.g., 500000). If you cannot find it, return -1."
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}",
                                }
                            },
                        ],
                    }
                ],
                max_tokens=10,
            )
            result = response.choices[0].message.content.strip().replace(',', '')
            return int(result)
        except Exception as e:
            print(f"Vision API Error: {e}")
            return -1
