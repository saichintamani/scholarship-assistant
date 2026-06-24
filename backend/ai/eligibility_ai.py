class EligibilityAgent:
    def check_eligibility(self, data: dict) -> dict:
        if data["income"] <= 250000 and data["passed"]:
            return {
                "eligible": True,
                "scholarship": "Government SC Scholarship",
                "website": "https://scholarships.gov.in"
            }

        return {
            "eligible": False,
            "reason": "Income too high or not passed"
        }
