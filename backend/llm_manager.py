from google import genai
from google.genai import types
from dotenv import load_dotenv
from pydantic import BaseModel
import os

load_dotenv(override=True)

class Response(BaseModel):
    subject: str
    email: str
    suggested_questions: list[str]

class LLMManager:
    def __init__(self):
        self.model_name = os.getenv("MODEL_NAME")
        self.chat_object = self.get_chat_client()

    def get_chat_client(self):
        client = genai.Client()

        chat = client.chats.create(
            model=self.model_name,
            config=types.GenerateContentConfig(
                system_instruction="You are an assistant that turns user request into polished professional emails, apart from that you also generate a list of 3 suggested actions user may ask to improve the format/content of generated email. (For example: Make it more casual, make it more professional etc)",
                response_mime_type="application/json",
                response_schema=list[Response],
            ),
        )

        return chat
    
    def send_message(self, message: str):
        response = self.chat_object.send_message(message).parsed
        return response[0].subject, response[0].email, response[0].suggested_questions