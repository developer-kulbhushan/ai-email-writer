import React from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomeMessageProps {
  onQuickStart: (message: string) => void;
  isDarkMode: boolean;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onQuickStart, isDarkMode }) => {
  const quickStartExamples = [
    "Draft a professional follow-up email after a job interview",
    "Write a meeting request email to discuss project updates",
    "Compose an apology email for missing a deadline",
    "Create a thank you email for a client referral"
  ];

  return (
    <div className="text-center py-8 md:py-12">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40' 
          : 'bg-gradient-to-r from-blue-100 to-purple-100'
      }`}>
        <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <span className={`font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
          Welcome to Email Draft Assistant
        </span>
      </div>
      
      <h2 className={`text-xl md:text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        Let's craft the perfect email together
      </h2>
      
      <p className={`mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Describe the email you need to write, and I'll help you create a professional, 
        well-structured message that gets results.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
        {quickStartExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => onQuickStart(example)}
            className={`p-3 md:p-4 text-left border rounded-lg md:rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 text-sm md:text-base ${
              isDarkMode 
                ? 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-purple-900/30 border-gray-600 hover:border-blue-500 text-gray-200' 
                : 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-gray-200 hover:border-blue-300 text-gray-700'
            }`}
          >
            <span className="font-medium">{example}</span>
          </button>
        ))}
      </div>
    </div>
  );
};