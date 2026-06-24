class VerificationAgent:
    def verify(self, user_data: dict):

        issues = []
        verification_score = 1.0

        # Income verification logic
        income = user_data.get("income", 0)
        if income <= 0:
            issues.append("Income value invalid")
            verification_score -= 0.4

        # Category verification
        if user_data.get("category") not in ["SC", "ST", "OBC"]:
            issues.append("Category certificate required")
            verification_score -= 0.3

        # Attempt history
        if user_data.get("attempts", 1) > 2:
            issues.append("Multiple applications detected")
            verification_score -= 0.3

        status = "VERIFIED"
        if verification_score < 0.7:
            status = "VERIFICATION_REQUIRED"

        return {
            "verification_status": status,
            "verification_score": round(verification_score, 2),
            "issues": issues
        }
