class LLMExplainer:
    def explain_decision(self, data: dict, eligibility: dict) -> str:
        return (
            f"Based on your category ({data['category']}), "
            f"income ({data['income']}), and academic status, "
            f"you are eligible for {eligibility['scholarship']}."
        )
