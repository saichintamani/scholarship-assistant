class AgentOrchestrator:

    def run(self, student_data: dict):
        trace = []

        eligibility_result = student_data["income"] <= 200000
        trace.append(f"EligibilityAgent → income check = {eligibility_result}")

        if not eligibility_result:
            return {
                "final_decision": "REJECTED",
                "reason": "Income exceeds limit",
                "trace": trace
            }

        fraud_check = student_data["passed"] is True
        trace.append(f"FraudAgent → academic status valid = {fraud_check}")

        if not fraud_check:
            return {
                "final_decision": "REJECTED",
                "reason": "Academic validation failed",
                "trace": trace
            }

        trace.append("PlannerAgent → Scholarship approved")

        return {
            "final_decision": "APPROVED",
            "action": "AUTO_REDIRECT",
            "portal": "https://scholarships.gov.in/",
            "trace": trace,
            "confidence": 0.93
        }
