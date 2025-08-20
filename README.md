# AI Email Generator

This is a full-stack web application that acts as an AI-powered email assistant. It uses a Large Language Model to generate professional emails based on user prompts.

## Features

- **AI-Powered Email Generation:** Provide a simple prompt, and the AI will generate a complete, professional email.
- **Suggested Follow-up Questions:** The AI provides suggestions for how to refine the generated email (e.g., make it more casual, add a call to action).
- **Chat Interface:** An intuitive chat-like interface to interact with the AI assistant.
- **Dark Mode:** A sleek dark mode for comfortable viewing in low-light environments.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.
- **Error Handling:** The application gracefully handles API errors and provides mock data for demonstration purposes.

## Tech Stack

### Backend

- **Python 3.11+**
- **FastAPI:** A modern, fast (high-performance) web framework for building APIs.
- **Uvicorn:** An ASGI server for running the FastAPI application.
- **google-genai:** The official Python library for the Google Generative AI API.
- **python-dotenv:** For managing environment variables.

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite:** A fast build tool and development server for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Lucide React:** A library of beautiful and consistent icons.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- **Node.js:** v18 or later. You can download it from [nodejs.org](https://nodejs.org/).
- **Python:** v3.11 or later. You can download it from [python.org](https://www.python.org/).
- **Google AI API Key:** You need an API key from Google AI Studio. You can get one [here](https://aistudio.google.com/app/apikey).

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    - On Windows:
      ```bash
      .\venv\Scripts\activate
      ```
    - On macOS and Linux:
      ```bash
      source venv/bin/activate
      ```

4.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Create a `.env` file:**
    - Copy the example file:
      ```bash
      cp .env.example .env
      ```
    - Open the `.env` file and add your Google AI API key and the model name:
      ```
      GOOGLE_API_KEY="YOUR_API_KEY"
      MODEL_NAME="gemini-1.5-flash"
      ```

6.  **Run the backend server:**
    ```bash
    uvicorn server:app --reload
    ```
    The server will be running at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env.local` file:**
    - Copy the example file:
      ```bash
      cp .env.example .env.local
      ```
    - Open the `.env.local` file and set the `VITE_API_HOSTNAME` to the address of your backend server:
      ```
      VITE_API_HOSTNAME="http://127.0.0.1:8000"
      ```

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
.
├── backend/            # Python/FastAPI backend
│   ├── .env.example
│   ├── llm_manager.py  # Manages interaction with the Google AI model
│   ├── requirements.txt
│   └── server.py       # FastAPI application and endpoints
└── frontend/           # React/TypeScript frontend
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── App.tsx     # Main application component
    │   ├── components/ # Reusable UI components
    │   ├── hooks/      # Custom React hooks
    │   └── services/   # API communication layer
    └── vite.config.ts
```

## API Endpoints

### `/process`

- **Method:** `POST`
- **Description:** Processes a user's message and returns a generated email.
- **Request Body:**
  ```json
  {
    "message": "string",
    "user_id": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "subject": "string",
    "email": "string",
    "suggested_questions": ["string", "string", "string"]
  }
  ```

### `/reset`

- **Method:** `POST`
- **Description:** Resets the conversation history for a given user.
- **Request Body:**
  ```json
  {
    "user_id": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "LLM session for user_id has been reset"
  }
  ```
