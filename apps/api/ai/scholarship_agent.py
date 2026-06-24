import csv

class ScholarshipAgent:
    def recommend(self, student: dict):

        best_match = None

        with open("backend/data/schemes.csv", newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if (
                    row["category"].lower() == student["category"].lower()
                    and int(row["min_class"]) <= student["student_class"] <= int(row["max_class"])
                    and student["income"] <= int(row["max_income"])
                ):
                    best_match = row
                    break

        if best_match:
            return {
                "scheme_name": best_match["scheme_name"],
                "website": best_match["website"],
                "status": "MATCH_FOUND"
            }

        return {
            "status": "NO_MATCH"
        }
