import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types/chat';
import { EmailPreview } from './EmailPreview';
import { SuggestedQuestions } from './SuggestedQuestions';

interface ChatMessageProps {
  message: Message;
  onSuggestedQuestionClick: (question: string) => void;
  isLatest: boolean;
  isLoading: boolean;
  isDarkMode: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onSuggestedQuestionClick,
  isLatest,
  isLoading,
  isDarkMode,
}) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex gap-3 md:gap-4 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
          : 'bg-gradient-to-r from-green-500 to-teal-600'
      }`}>
        {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-xs sm:max-w-md md:max-w-3xl ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block p-3 md:p-4 shadow-sm ${
          isUser 
            ? isDarkMode
              ? 'bg-gray-700 border border-gray-600 text-gray-100 rounded-2xl md:rounded-3xl'
              : 'bg-white border border-gray-200 text-gray-800 rounded-2xl md:rounded-3xl shadow-md'
            : isDarkMode
              ? 'bg-gray-800/60 border border-gray-600 text-gray-100 rounded-2xl md:rounded-3xl backdrop-blur-sm'
              : 'bg-white/80 border border-gray-200 text-gray-800 rounded-2xl md:rounded-3xl backdrop-blur-sm'
        }`}>
          <p className="whitespace-pre-wrap text-sm md:text-base">{message.content}</p>
        </div>
        
        <div className={`text-xs mt-1 md:mt-2 px-1 text-right ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* Email Preview and Suggestions for assistant messages */}
        {!isUser && message.emailData && (
          <div className="mt-3 md:mt-4">
            <EmailPreview emailData={message.emailData} isDarkMode={isDarkMode} />
            <SuggestedQuestions
              questions={message.emailData.suggested_questions}
              onQuestionClick={onSuggestedQuestionClick}
              disabled={isLoading}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};