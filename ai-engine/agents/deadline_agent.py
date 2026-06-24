from datetime import datetime

class DeadlineAgent:
    def __init__(self):
        pass

    def prioritize_by_deadline(self, scholarships: list) -> list:
        """
        Prioritizes scholarships that are closing soon.
        Assuming 'deadline' is a YYYY-MM-DD string in the DB.
        """
        def parse_date(date_str):
            try:
                return datetime.strptime(date_str, "%Y-%m-%d")
            except (ValueError, TypeError):
                # Put unknown deadlines at the bottom
                return datetime.strptime("2099-12-31", "%Y-%m-%d")

        # Sort ascending by deadline date (closest first)
        return sorted(scholarships, key=lambda s: parse_date(s.get('deadline')))
