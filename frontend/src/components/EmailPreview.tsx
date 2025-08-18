import React from 'react';
import { Mail, Copy, Check, FileText } from 'lucide-react';
import { ApiResponse } from '../types/chat';

interface EmailPreviewProps {
  emailData: ApiResponse;
  isDarkMode: boolean;
  isStreaming?: boolean;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ emailData, isDarkMode, isStreaming = false }) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`border rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg backdrop-blur-sm ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-600' 
        : 'bg-gradient-to-br from-white to-blue-50 border-blue-100'
    }`}>
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className={`p-2 rounded-full ${
          isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
        }`}>
          <Mail className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <h3 className={`text-base md:text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Email Draft
        </h3>
        
        {/* Copy Toolbar */}
        <div className="ml-auto flex items-center gap-1 md:gap-2">
          {!isStreaming && <button
            onClick={() => copyToClipboard(emailData.subject, 'subject')}
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 text-xs md:text-sm rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {copiedField === 'subject' ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedField === 'subject' ? 'Copied!' : 'Copy Subject'}</span>
          </button>
          }
          <button
            onClick={() => copyToClipboard(emailData.email, 'email')}
            disabled={isStreaming}
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 text-xs md:text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {copiedField === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{isStreaming ? 'Writing...' : copiedField === 'email' ? 'Copied!' : 'Copy Body'}</span>
          </button>
        </div>
      </div>

      {/* Subject Section */}
      <div className="mb-4 md:mb-6">
        <label className={`text-sm font-medium block mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Subject
        </label>
        <div className={`border rounded-lg p-3 font-medium text-sm md:text-base ${
          isDarkMode 
            ? 'bg-gray-700/50 border-gray-600 text-gray-100' 
            : 'bg-white border-gray-200 text-gray-800'
        } ${isStreaming && !emailData.subject ? 'animate-pulse' : ''}`}>
          {emailData.subject || (isStreaming ? 'Generating subject...' : '')}
          {isStreaming && emailData.subject && <span className="animate-pulse">|</span>}
        </div>
      </div>

      {/* Email Body Section */}
      <div className="mb-4 md:mb-6">
        <label className={`text-sm font-medium block mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Email Body
        </label>
        <div className={`border rounded-lg p-3 md:p-4 whitespace-pre-wrap leading-relaxed text-sm md:text-base ${
          isDarkMode 
            ? 'bg-gray-700/50 border-gray-600 text-gray-100' 
            : 'bg-white border-gray-200 text-gray-700'
        } ${isStreaming && !emailData.email ? 'animate-pulse' : ''}`}>
          {emailData.email || (isStreaming ? 'Generating email content...' : '')}
          {isStreaming && emailData.email && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  );
};