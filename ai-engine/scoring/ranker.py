class ScholarshipRanker:
    def __init__(self):
        pass

    def rank_scholarships(self, user_profile: dict, retrieved_scholarships: list) -> list:
        """
        Ranks retrieved scholarships based on FAANG-style weighted scoring.
        Score = eligibility_match_score + financial_need_alignment + historical_success
        """
        ranked = []
        for s in retrieved_scholarships:
            score = 0.0
            
            # 1. Eligibility Match Score (Category Match)
            if user_profile.get('category') == s.get('category'):
                score += 40.0
            elif s.get('category') == 'GENERAL':
                score += 20.0
                
            # 2. Financial Need Alignment
            user_income = user_profile.get('income', 9999999)
            max_income = s.get('max_income', 9999999)
            
            if user_income <= max_income:
                score += 30.0
                # Give extra weight if they are well below the max income (higher financial need)
                need_ratio = (max_income - user_income) / max_income
                score += (need_ratio * 15.0)
            
            # 3. Historical Success Probability (Mocked for now)
            score += 10.0 # Placeholder for ML model prediction based on past applications

            s['ranking_score'] = round(score, 2)
            ranked.append(s)

        # Sort by score descending
        return sorted(ranked, key=lambda x: x['ranking_score'], reverse=True)
