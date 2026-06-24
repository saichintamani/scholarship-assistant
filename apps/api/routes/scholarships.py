from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.ai_orchestrator import AIOrchestrator

router = APIRouter()
orchestrator = AIOrchestrator()

class OrchestratorRequest(BaseModel):
    query: str
    profile: dict

@router.post("/evaluate")
def evaluate_scholarship(req: OrchestratorRequest):
    try:
        result = orchestrator.process_application(req.query, req.profile)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
