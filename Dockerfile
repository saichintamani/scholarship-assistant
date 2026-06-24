FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Start the server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
