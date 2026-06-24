from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

from backend.ai.fraud_detector import FraudDetector
from backend.ai.explanation_agent import ExplanationAgent
from backend.ai.logger_agent import LoggerAgent

app = FastAPI(title="SamvaadAI – National Level Agentic System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScholarshipRequest(BaseModel):
    category: str
    income: int
    passed: bool
    attempts: int

fraud_agent = FraudDetector()
explanation_agent = ExplanationAgent()
logger_agent = LoggerAgent()

@app.post("/check-scholarship")
def check_scholarship(data: ScholarshipRequest):
    data_dict = data.dict()

    if fraud_agent.is_fraud(data_dict):
        logger_agent.log_fraud(data_dict)
        return {
            "eligible": False,
            "reason": "Fraud detected",
            "explanation": "AI fraud agent flagged suspicious behavior.",
            "scholarships": []
        }

    with open(os.path.join(os.path.dirname(__file__), "scholarships.json"), "r") as f:
        scholarships = json.load(f)

    eligible_scholarships = []

    if data.passed and data.attempts <= 2:
        for scholarship in scholarships:
            if data.category == scholarship["category"] and data.income <= scholarship["max_income"]:
                eligible_scholarships.append(scholarship)

    explanation = explanation_agent.generate_explanation(data_dict, eligible_scholarships)
    logger_agent.log_decision(data_dict, len(eligible_scholarships) > 0, explanation)

    if eligible_scholarships:
        return {
            "eligible": True,
            "explanation": explanation,
            "scholarships": eligible_scholarships
        }

    return {
        "eligible": False,
        "reason": "Eligibility conditions not met",
        "explanation": explanation,
        "scholarships": []
    }

# ---------- ADMIN APIs ----------

@app.get("/admin/logs")
def get_logs():
    return logger_agent.get_logs()

@app.get("/admin/fraud-cases")
def get_fraud_cases():
    return logger_agent.get_fraud_cases()

class ScholarshipEntry(BaseModel):
    name: str
    category: str
    max_income: int
    portal: str

SCHOLARSHIPS_FILE = os.path.join(os.path.dirname(__file__), "scholarships.json")

@app.get("/admin/scholarships")
def get_scholarships():
    if not os.path.exists(SCHOLARSHIPS_FILE):
        return []
    with open(SCHOLARSHIPS_FILE, "r") as f:
        return json.load(f)

@app.post("/admin/scholarships")
def add_scholarship(entry: ScholarshipEntry):
    scholarships = get_scholarships()
    scholarships.append(entry.dict())
    with open(SCHOLARSHIPS_FILE, "w") as f:
        json.dump(scholarships, f, indent=4)
    return {"message": "Scholarship added successfully"}

@app.delete("/admin/scholarships/{name}")
def delete_scholarship(name: str):
    scholarships = get_scholarships()
    scholarships = [s for s in scholarships if s["name"] != name]
    with open(SCHOLARSHIPS_FILE, "w") as f:
        json.dump(scholarships, f, indent=4)
    return {"message": "Scholarship deleted successfully"}
