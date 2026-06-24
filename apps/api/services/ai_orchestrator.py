from packages.ai_core.rag.vector_store import VectorStore
from packages.ai_core.scoring.ranker import ScholarshipRanker
from packages.ai_core.agents.finder_agent import FinderAgent
from packages.ai_core.agents.reasoning_agent import ReasoningAgent
from packages.ai_core.agents.strategy_agent import StrategyAgent
from packages.ai_core.agents.deadline_agent import DeadlineAgent
from apps.api.db import get_db_connection

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

    def process_application(self, user_query: str, user_profile: dict, language: str = "English") -> dict:
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
        reasoning = self.reasoning.evaluate_constraints(user_profile, top_match, language)
        
        # 4. Strategy Generation
        strategy_plan = self.strategy.suggest_strategy(time_optimized)

        return {
            "status": "success",
            "top_match": top_match,
            "reasoning": reasoning,
            "overall_strategy": strategy_plan["strategy"],
            "all_matches": time_optimized
        }
