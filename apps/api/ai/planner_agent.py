class PlannerAgent:
    def decide(self, eligibility, fraud, verification):

        if fraud["risk_level"] == "HIGH":
            return "BLOCK"

        if verification["verification_status"] == "VERIFICATION_REQUIRED":
            return "MANUAL_REVIEW"

        if eligibility["status"] == "ELIGIBLE":
            return "AUTO_REDIRECT"

        if eligibility["status"] == "REVIEW_REQUIRED":
            return "MANUAL_REVIEW"

        return "BLOCK"
