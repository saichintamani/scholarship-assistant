class StrategyAgent:
    def __init__(self):
        pass

    def suggest_strategy(self, ranked_scholarships: list) -> dict:
        """
        Takes the ranked list and formulates an actionable strategy for the student.
        """
        if not ranked_scholarships:
            return {"strategy": "No highly matching scholarships found. Focus on improving academic profile."}
            
        top_match = ranked_scholarships[0]
        strategy = f"Focus your immediate effort on '{top_match['name']}'. Your profile is a strong match. "
        
        if len(ranked_scholarships) > 1:
            strategy += f"Use '{ranked_scholarships[1]['name']}' as your solid backup option."
            
        return {"strategy": strategy, "primary_target": top_match['name']}
