from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import json
import os
import sqlite3
from dotenv import load_dotenv
from typing import Optional
from apscheduler.schedulers.background import BackgroundScheduler

from backend.db import get_db_connection
from backend.auth import verify_password, get_password_hash, create_access_token, decode_access_token
from backend.ai.fraud_detector import FraudDetector
from backend.ai.explanation_agent import ExplanationAgent
from backend.ai.logger_agent import LoggerAgent
from backend.ai.vision_agent import VisionAgent
from backend.ai.rag_agent import RagAgent
from backend.scraper import run_automated_scraper

load_dotenv()

app = FastAPI(title="SamvaadAI – National Level Agentic System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start Background Scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(run_automated_scraper, 'interval', days=7) # Run every week
scheduler.start()

# Initialize Agents
fraud_agent = FraudDetector()
explanation_agent = ExplanationAgent()
logger_agent = LoggerAgent()
vision_agent = VisionAgent()
rag_agent = RagAgent()

# ---------- AUTHENTICATION ----------

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/register")
def register(user: UserCreate):
    conn = get_db_connection()
    hashed_pw = get_password_hash(user.password)
    try:
        conn.execute("INSERT INTO users (email, hashed_password) VALUES (?, ?)", (user.email, hashed_pw))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    conn.close()
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin):
    conn = get_db_connection()
    db_user = conn.execute("SELECT * FROM users WHERE email = ?", (user.email,)).fetchone()
    conn.close()
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": str(db_user["id"])})
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str):
    user_id = decode_access_token(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user_id

# ---------- SCHOLARSHIP ELIGIBILITY ----------

class ScholarshipRequest(BaseModel):
    category: str
    income: int
    passed: bool
    attempts: int
    language: str = "English"

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

    # Fetch from SQLite instead of JSON
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM scholarships").fetchall()
    conn.close()
    scholarships = [dict(r) for r in rows]

    eligible_scholarships = []

    if data.passed and data.attempts <= 2:
        for scholarship in scholarships:
            if data.category == scholarship["category"] and data.income <= scholarship["max_income"]:
                eligible_scholarships.append(scholarship)

    explanation = explanation_agent.generate_explanation(data_dict, eligible_scholarships, data.language)
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

# ---------- USER DASHBOARD ----------

class SaveApplicationRequest(BaseModel):
    scholarship_name: str
    token: str

@app.post("/applications/save")
def save_application(req: SaveApplicationRequest):
    user_id = get_current_user(req.token)
    conn = get_db_connection()
    conn.execute(
        "INSERT INTO saved_applications (user_id, scholarship_name) VALUES (?, ?)",
        (user_id, req.scholarship_name)
    )
    conn.commit()
    conn.close()
    return {"message": "Application saved successfully"}

@app.get("/applications")
def get_applications(token: str):
    user_id = get_current_user(token)
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM saved_applications WHERE user_id = ?", (user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]

class ProfileRequest(BaseModel):
    token: str
    category: str
    income: int

@app.post("/profile")
def update_profile(req: ProfileRequest):
    user_id = get_current_user(req.token)
    conn = get_db_connection()
    conn.execute("INSERT OR REPLACE INTO user_profiles (user_id, category, income) VALUES (?, ?, ?)", 
                 (user_id, req.category, req.income))
    conn.commit()
    conn.close()
    return {"message": "Profile updated successfully"}

@app.get("/alerts")
def get_alerts(token: str):
    user_id = get_current_user(token)
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM alerts WHERE user_id = ? ORDER BY id DESC", (user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]

# ---------- ADVANCED AI CAPABILITIES ----------

class VerifyDocumentRequest(BaseModel):
    token: str
    image_base64: str

@app.post("/verify-document")
def verify_document(req: VerifyDocumentRequest):
    user_id = get_current_user(req.token)
    income = vision_agent.extract_income(req.image_base64)
    
    if income == -1:
        return {"verified": False, "message": "Could not read income from document. Please try a clearer image."}
        
    # Auto-update profile and verify user
    conn = get_db_connection()
    conn.execute("UPDATE users SET is_verified = TRUE WHERE id = ?", (user_id,))
    # Assuming category is not verified via income cert, we just update income
    conn.execute("INSERT OR REPLACE INTO user_profiles (user_id, category, income) VALUES (?, (SELECT category FROM user_profiles WHERE user_id = ?), ?)", 
                 (user_id, user_id, income))
    conn.commit()
    conn.close()
    
    return {"verified": True, "message": f"Successfully verified income: ₹{income}"}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def rag_chat(req: ChatRequest):
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM scholarships").fetchall()
    conn.close()
    scholarships = [dict(r) for r in rows]
    
    response = rag_agent.chat(req.message, scholarships)
    return {"response": response}

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

@app.get("/admin/scholarships")
def get_scholarships():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM scholarships").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/admin/scholarships")
def add_scholarship(entry: ScholarshipEntry):
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO scholarships (name, category, max_income, portal) VALUES (?, ?, ?, ?)",
            (entry.name, entry.category, entry.max_income, entry.portal)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        pass # Already exists
    finally:
        conn.close()
    return {"message": "Scholarship added successfully"}

@app.delete("/admin/scholarships/{name}")
def delete_scholarship(name: str):
    conn = get_db_connection()
    conn.execute("DELETE FROM scholarships WHERE name = ?", (name,))
    conn.commit()
    conn.close()
    return {"message": "Scholarship deleted successfully"}

# Serve frontend directly from FastAPI
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
