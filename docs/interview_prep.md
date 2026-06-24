# 🎤 FAANG Interview Q&A (Based on SamvaadAI)

**❓ Q1: What problem does your project solve?**
Answer: It solves inefficient scholarship discovery by replacing keyword-based filtering with an AI-driven reasoning and ranking system.

**❓ Q2: Why not use traditional filtering?**
Answer: Filtering cannot interpret eligibility constraints or user intent. My system converts both into structured representations and evaluates them intelligently using LLM reasoning.

**❓ Q3: What is your system architecture?**
Answer: It uses a layered FAANG-style architecture:
1. API Gateway (FastAPI)
2. AI Orchestration Layer (Multi-Agent System)
3. RAG-based retrieval system (FAISS Vector Search)
4. Data layer (PostgreSQL / SQLite)

**❓ Q4: What makes it scalable?**
Answer: 
- Modular AI agents
- Separated service layers (MVC design)
- Vector database integration
- Stateless API design (with Redis caching and Celery task queues)

**❓ Q5: How does ranking work?**
Answer: A weighted scoring system combining eligibility (40%), deadline urgency (25%), financial relevance (20%), and user preference alignment (15%).

**❓ Q6: How would you improve it further?**
Answer: By introducing:
- fully autonomous AI agents that apply for you
- a feedback-driven learning loop (RLHF)
- real-time web scraped scholarship updates
- multi-agent orchestration system for document collection
