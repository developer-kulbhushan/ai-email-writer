import { ApiResponse, ApiError } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_HOSTNAME || 'https://api.example.com';

export interface StreamingCallback {
  onSubjectUpdate?: (subject: string) => void;
  onEmailUpdate?: (email: string) => void;
  onComplete?: (data: ApiResponse) => void;
}

export class ApiService {
  static async processMessage(message: string, callbacks?: StreamingCallback): Promise<ApiResponse> {
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

      // If callbacks are provided, simulate streaming for demo
      if (callbacks) {
        // Stream subject
        const subjectWords = data.subject.split(' ');
        for (let i = 0; i <= subjectWords.length; i++) {
          const partialSubject = subjectWords.slice(0, i).join(' ');
          callbacks.onSubjectUpdate?.(partialSubject);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Stream email content
        const emailWords = data.email.split(' ');
        for (let i = 0; i <= emailWords.length; i++) {
          const partialEmail = emailWords.slice(0, i).join(' ');
          callbacks.onEmailUpdate?.(partialEmail);
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        callbacks.onComplete?.(data);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // For demo purposes, return mock data when API is not available
      const mockData = {
        subject: "Demo: " + message.substring(0, 50),
        email: `Dear [Recipient],\n\nI hope this email finds you well. Based on your request "${message}", I've crafted this professional email draft.\n\nBest regards,\n[Your Name]`,
        suggested_questions: [
          "Make this more formal",
          "Add a call to action",
          "Make it shorter and more direct"
        ]
      };

      // Simulate streaming for demo
      if (callbacks) {
        const subjectWords = mockData.subject.split(' ');
        for (let i = 0; i <= subjectWords.length; i++) {
          const partialSubject = subjectWords.slice(0, i).join(' ');
          callbacks.onSubjectUpdate?.(partialSubject);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        const emailWords = mockData.email.split(' ');
        for (let i = 0; i <= emailWords.length; i++) {
          const partialEmail = emailWords.slice(0, i).join(' ');
          callbacks.onEmailUpdate?.(partialEmail);
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        callbacks.onComplete?.(mockData);
      }

      return mockData;
    }
  }

  static async resetChat(): Promise<void> {
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
    } catch (error) {
      console.error('Reset API request failed:', error);
      // For demo purposes, we'll continue even if reset fails
    }
  }
}