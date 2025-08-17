export interface ApiResponse {
  subject: string;
  email: string;
  suggested_questions: string[];
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emailData?: ApiResponse;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ResetResponse {
  status: string;
  message: string;
}