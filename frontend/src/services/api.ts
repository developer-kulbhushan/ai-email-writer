import { ApiResponse, ApiError, ResetResponse  } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_HOSTNAME || 'https://api.example.com';

export class ApiService {
  static async processMessage(message: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data.subject || !data.email || !Array.isArray(data.suggested_questions)) {
        throw new Error('Invalid response format from API');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // For demo purposes, return mock data when API is not available
      return {
        subject: "Demo: " + message.substring(0, 50),
        email: `Dear [Recipient],\n\nI hope this email finds you well. Based on your request "${message}", I've crafted this professional email draft.\n\nBest regards,\n[Your Name]`,
        suggested_questions: [
          "Make this more formal",
          "Add a call to action",
          "Make it shorter and more direct"
        ]
      };
    }
  }

  static async resetClient(): Promise<ResetResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json() as ResetResponse;
    } catch (error) {
      console.error('API reset failed:', error);

      // Fallback mock response
      return {
        status: "demo",
        message: "LLM client reset (mock response)."
      };
    }
  }
}