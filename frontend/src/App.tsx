import React, { useRef, useEffect } from 'react';
import { useChat } from './hooks/useChat';
import { useDarkMode } from './hooks/useDarkMode';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { WelcomeMessage } from './components/WelcomeMessage';
import { LoadingDots } from './components/LoadingDots';

function App() {
  const { messages, isLoading, error, sendMessage, clearChat, streamingMessageId } = useChat();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="max-w-6xl mx-auto flex flex-col h-screen mobile-padding">
        <ChatHeader 
          onClearChat={clearChat} 
          messageCount={messages.length}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
            {messages.length === 0 ? (
              <WelcomeMessage onQuickStart={sendMessage} isDarkMode={isDarkMode} />
            ) : (
              <>
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onSuggestedQuestionClick={sendMessage}
                    isLatest={index === messages.length - 1}
                    isLoading={isLoading && !streamingMessageId}
                    isStreaming={message.isStreaming || false}
                    isDarkMode={isDarkMode}
                  />
                ))}
                
                {isLoading && !streamingMessageId && (
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                      <div className="w-5 h-5 text-white flex items-center justify-center">
                        <LoadingDots />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`inline-block p-4 rounded-2xl rounded-bl-md ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-600' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          Crafting your email...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {error && (
              <div className={`border rounded-lg p-4 ${
                isDarkMode 
                  ? 'bg-red-900/20 border-red-800 text-red-300' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className={`p-6 backdrop-blur-sm border-t ${
            isDarkMode 
              ? 'bg-gray-900/80 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          } mobile-padding`}>
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;