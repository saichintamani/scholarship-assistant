class ExplanationAgent:
    def generate_explanation(self, data: dict, eligible_scholarships: list) -> str:
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
