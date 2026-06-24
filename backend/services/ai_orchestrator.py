from ai_engine.rag.vector_store import VectorStore
from ai_engine.scoring.ranker import ScholarshipRanker
from ai_engine.agents.finder_agent import FinderAgent
from ai_engine.agents.reasoning_agent import ReasoningAgent
from ai_engine.agents.strategy_agent import StrategyAgent
from ai_engine.agents.deadline_agent import DeadlineAgent
from backend.db import get_db_connection

class AIOrchestrator:
    def __init__(self):
        self.vector_store = VectorStore()
        self.ranker = ScholarshipRanker()
        self.finder = FinderAgent(self.vector_store, self.ranker)
        self.reasoning = ReasoningAgent()
        self.strategy = StrategyAgent()
        self.deadline = DeadlineAgent()

        self._initialize_vector_store()

    def _initialize_vector_store(self):
        conn = get_db_connection()
        rows = conn.execute("SELECT * FROM scholarships").fetchall()
        conn.close()
        scholarships = [dict(r) for r in rows]
        self.vector_store.build_index(scholarships)

    def process_application(self, user_query: str, user_profile: dict) -> dict:
        """
        The massive 4-layer AI workflow.
        """
        # 1. Semantic Search & Ranking
        ranked_scholarships = self.finder.find_and_rank(user_query, user_profile)
        
        # 2. Deadline Optimization
        time_optimized = self.deadline.prioritize_by_deadline(ranked_scholarships)
        
        if not time_optimized:
            return {"status": "no_matches", "strategy": "No scholarships matched your profile."}

        # 3. Deep Reasoning on top match
        top_match = time_optimized[0]
        reasoning = self.reasoning.evaluate_constraints(user_profile, top_match)
        
        # 4. Strategy Generation
        strategy_plan = self.strategy.suggest_strategy(time_optimized)

        return {
            "status": "success",
            "top_match": top_match,
            "reasoning": reasoning,
            "overall_strategy": strategy_plan["strategy"],
            "all_matches": time_optimized
        }
