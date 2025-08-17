import { useState, useCallback } from 'react';
import { Message, ApiResponse } from '../types/chat';
import { ApiService } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const apiResponse = await ApiService.processMessage(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I\'ve drafted an email for you:',
        timestamp: new Date(),
        emailData: apiResponse,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Failed to process your message. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(async () => {
    setMessages([]);
    setError(null);

    try {
      await ApiService.resetClient(); // Call backend /reset
    } catch (err) {
      console.error('Failed to reset LLM client:', err);
      setError('Failed to reset assistant. Please try again.');
    }
    
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};