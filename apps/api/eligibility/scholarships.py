def school_scholarship_eligibility(student: dict):
    income = student.get("income")
    passed = student.get("passed")

    # DEBUG safety check
    if income is None or passed is None:
        return {
            "error": "Missing required fields",
            "received": student
        }

    if income <= 250000 and passed is True:
        return {
            "eligible": True,
            "reason": "Income below limit and student passed"
        }

    return {
        "eligible": False,
        "reason": "Does not meet criteria"
    }
