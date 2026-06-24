import json

class RankingAgent:
    def rank(self, user):
        with open("backend/scholarships.json", "r") as f:
            schemes = json.load(f)

        eligible = []

        for s in schemes:
            if user["category"] == s["category"] and user["income"] <= s["max_income"]:
                eligible.append(s)

        eligible.sort(key=lambda x: x["max_income"])
        return eligible
