class ScholarshipRanker:
    def __init__(self):
        pass

    def rank_scholarships(self, user_profile: dict, retrieved_scholarships: list) -> list:
        """
        Ranks retrieved scholarships based on FAANG-style weighted scoring.
        Final Score = (Eligibility x 0.40) + (Deadline x 0.25) + (Financial Fit x 0.20) + (User Preference x 0.15)
        """
        ranked = []
        for s in retrieved_scholarships:
            # 1. Eligibility (max 100)
            eligibility_score = 100.0 if user_profile.get('category') == s.get('category') else (50.0 if s.get('category') == 'GENERAL' else 0.0)
            
            # 2. Financial Fit (max 100)
            user_income = user_profile.get('income', 9999999)
            max_income = s.get('max_income', 9999999)
            financial_score = 0.0
            if user_income <= max_income:
                need_ratio = (max_income - user_income) / max_income
                financial_score = 50.0 + (need_ratio * 50.0)
                
            # 3. Deadline Urgency (max 100 - mocked for this class)
            deadline_score = 80.0
            
            # 4. User Preference Alignment (max 100)
            preference_score = 75.0 

            # Calculate Final Score
            final_score = (eligibility_score * 0.40) + (deadline_score * 0.25) + (financial_score * 0.20) + (preference_score * 0.15)

            s['ranking_score'] = round(final_score, 2)
            ranked.append(s)

        # Sort by score descending
        return sorted(ranked, key=lambda x: x['ranking_score'], reverse=True)
