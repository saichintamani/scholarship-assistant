import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

class VectorStore:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)
        self.dimension = self.model.get_sentence_embedding_dimension()
        self.index = faiss.IndexFlatL2(self.dimension)
        self.documents = []

    def build_index(self, scholarships: list):
        """
        Embeds scholarship metadata into the FAISS index.
        """
        if not scholarships:
            return
        
        self.documents = scholarships
        texts = [f"{s['name']} - Category: {s['category']}, Max Income: {s['max_income']}" for s in scholarships]
        embeddings = self.model.encode(texts)
        
        self.index.reset()
        self.index.add(np.array(embeddings).astype("float32"))

    def search(self, query: str, top_k: int = 3) -> list:
        """
        Retrieves the top_k semantically similar scholarships for a given query.
        """
        if self.index.ntotal == 0:
            return []

        query_embedding = self.model.encode([query])
        distances, indices = self.index.search(np.array(query_embedding).astype("float32"), top_k)
        
        results = []
        for i in indices[0]:
            if i != -1 and i < len(self.documents):
                results.append(self.documents[i])
        return results
