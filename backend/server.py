from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Tuple
from llm_manager import LLMManager

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to specific domains ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global LLM client
llm_client = LLMManager()

# Input schema
class UserInput(BaseModel):
    message: str


@app.post("/process")
def process_input(user_input: UserInput):
    subject, email, suggested_questions = llm_client.send_message(user_input.message)
    return {
        "subject": subject,
        "email": email,
        "suggested_questions": suggested_questions
    }


@app.post("/reset")
def reset_llm_client():
    """Re-initialize the global LLM client."""
    global llm_client
    llm_client = LLMManager()
    return {"status": "success", "message": "LLM client has been re-initialized"}
