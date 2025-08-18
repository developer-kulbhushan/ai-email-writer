import React from 'react';
import { MessageSquare } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
  isDarkMode: boolean;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  questions,
  onQuestionClick,
  disabled = false,
  isDarkMode,
}) => {
  return (
    <div className="mt-3 md:mt-4">
      <div className="flex items-center gap-2 mb-2 md:mb-3">
        <MessageSquare className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Suggestions
        </span>
      </div>
      <div className="grid gap-2 md:gap-3">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            disabled={disabled}
            className={`text-left p-2 md:p-3 border rounded-lg md:rounded-xl text-xs md:text-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 hover:from-purple-800/40 hover:to-blue-800/40 border-purple-700 text-gray-200' 
                : 'bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200 text-gray-700'
            }`}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};