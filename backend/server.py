from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from llm_manager import LLMManager
from uuid import UUID, uuid4

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to specific domains ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sessions: Dict[str, LLMManager] = {}

# Input schema
class UserInput(BaseModel):
    message: str
    user_id: str  # client must send a unique ID


@app.post("/process")
def process_input(user_input: UserInput):
    # Get or create session for user
    if user_input.user_id not in sessions:
        sessions[user_input.user_id] = LLMManager()

    llm_client = sessions[user_input.user_id]
    subject, email, suggested_questions = llm_client.send_message(user_input.message)

    return {
        "subject": subject,
        "email": email,
        "suggested_questions": suggested_questions
    }

@app.post("/reset")
def reset_llm_client(user_id: str):
    if user_id in sessions:
        del sessions[user_id]
    return {"status": "success", "message": f"LLM session for {user_id} has been reset"}