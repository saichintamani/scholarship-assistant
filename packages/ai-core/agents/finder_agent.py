from ai_engine.rag.vector_store import VectorStore
from ai_engine.scoring.ranker import ScholarshipRanker

class FinderAgent:
    def __init__(self, vector_store: VectorStore, ranker: ScholarshipRanker):
        self.vector_store = vector_store
        self.ranker = ranker

    def find_and_rank(self, user_query: str, user_profile: dict) -> list:
        """
        Orchestrates semantic retrieval and mathematical ranking.
        """
        # 1. Semantic Retrieval via FAISS
        retrieved_scholarships = self.vector_store.search(user_query, top_k=5)
        
        # 2. Ranking via AI Scoring Model
        ranked_scholarships = self.ranker.rank_scholarships(user_profile, retrieved_scholarships)
        
        return ranked_scholarships
