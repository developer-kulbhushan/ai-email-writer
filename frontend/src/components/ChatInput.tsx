import React, { useState, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  isDarkMode: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  disabled = false,
  isDarkMode,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3 items-end">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Describe the email you'd like me to draft..."
          disabled={disabled}
          className={`w-full px-3 md:px-4 py-2 md:py-3 pr-12 border rounded-xl md:rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] md:min-h-[50px] max-h-32 text-sm md:text-base ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          rows={1}
        />
      </div>
      
      <button
        type="submit"
        disabled={!message.trim() || isLoading || disabled}
        className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:transform-none"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
        ) : (
          <Send className="w-4 h-4 md:w-5 md:h-5" />
        )}
      </button>
    </form>
  );
};