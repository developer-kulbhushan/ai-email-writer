import React from 'react';

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-1 justify-center items-center">
      <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  );
};