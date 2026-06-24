from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.services.ai_orchestrator import AIOrchestrator

router = APIRouter()
orchestrator = AIOrchestrator()

class OrchestratorRequest(BaseModel):
    query: str
    profile: dict
    language: str = "English"

@router.post("/evaluate")
def evaluate_scholarship(req: OrchestratorRequest):
    try:
        result = orchestrator.process_application(req.query, req.profile, req.language)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
