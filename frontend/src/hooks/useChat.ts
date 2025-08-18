import { useState, useCallback } from 'react';
import { Message, ApiResponse } from '../types/chat';
import { ApiService, StreamingCallback } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

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

    // Create initial assistant message for streaming
    const assistantMessageId = (Date.now() + 1).toString();
    const initialAssistantMessage: Message = {
      id: assistantMessageId,
      type: 'assistant',
      content: 'I\'m drafting your email...',
      timestamp: new Date(),
      isStreaming: true,
      emailData: {
        subject: '',
        email: '',
        suggested_questions: []
      }
    };

    setMessages(prev => [...prev, initialAssistantMessage]);
    setStreamingMessageId(assistantMessageId);

    const streamingCallbacks: StreamingCallback = {
      onSubjectUpdate: (subject: string) => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { 
                ...msg, 
                emailData: { 
                  ...msg.emailData!, 
                  subject 
                } 
              }
            : msg
        ));
      },
      onEmailUpdate: (email: string) => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { 
                ...msg, 
                emailData: { 
                  ...msg.emailData!, 
                  email 
                } 
              }
            : msg
        ));
      },
      onComplete: (apiResponse: ApiResponse) => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { 
                ...msg, 
                content: 'I\'ve drafted an email for you:',
                isStreaming: false,
                emailData: apiResponse
              }
            : msg
        ));
        setStreamingMessageId(null);
      }
    };

    try {
      await ApiService.processMessage(content, streamingCallbacks);
    } catch (err) {
      setError('Failed to process your message. Please try again.');
      setStreamingMessageId(null);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    // Call reset API endpoint
    ApiService.resetChat();
    
    setMessages([]);
    setError(null);
    setStreamingMessageId(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    streamingMessageId,
  };
};