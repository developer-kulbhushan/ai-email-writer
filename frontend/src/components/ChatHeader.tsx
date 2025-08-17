import React from 'react';
import { Mail, RefreshCw, Moon, Sun } from 'lucide-react';

interface ChatHeaderProps {
  onClearChat: () => void;
  messageCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onClearChat, 
  messageCount, 
  isDarkMode, 
  onToggleDarkMode 
}) => {
  return (
    <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm ${
      isDarkMode 
        ? 'border-gray-700 bg-gray-900/80' 
        : 'border-gray-200 bg-white/80'
    }`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Email Draft Assistant
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Professional email drafting made simple
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {messageCount > 0 && (
          <button
            onClick={onClearChat}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            New Chat
          </button>
        )}
      </div>
    </div>
  );
};