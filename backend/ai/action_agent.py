class ActionRecommendationAgent:
    def recommend(self, eligibility_result: dict):

        if eligibility_result.get("eligible") is True:
            return {
                "action_type": "AUTO_REDIRECT",
                "scholarship_portal": eligibility_result.get(
                    "portal", "https://scholarships.gov.in"
                ),
                "confidence": 0.92
            }

        return {
            "action_type": "SHOW_MESSAGE",
            "message": eligibility_result.get(
                "reason", "Not eligible"
            ),
            "confidence": 0.35
        }
