class ReasoningAgent:
    def generate_reasoning(self, eligibility, fraud):

        reasoning = []

        if eligibility["status"] == "ELIGIBLE":
            reasoning.append(
                "The applicant satisfies category and academic eligibility rules."
            )
        else:
            reasoning.append(
                "The applicant does not satisfy basic eligibility criteria."
            )

        if fraud["risk_level"] == "LOW":
            reasoning.append(
                "No abnormal patterns were detected in the application."
            )
        elif fraud["risk_level"] == "MEDIUM":
            reasoning.append(
                "Some risk indicators were observed, but not severe."
            )
        else:
            reasoning.append(
                "High-risk fraud indicators were detected."
            )

        reasoning.append(
            "The final decision was made by combining outputs from multiple AI agents."
        )

        return " ".join(reasoning)

