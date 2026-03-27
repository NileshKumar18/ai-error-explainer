import React from 'react';
import MessageItem from './MessageItem';

export default function ChatContainer({ messages }) {
  return (
    <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
      {messages.length === 0 ? (
        // Empty State / Welcome Screen
        <div className="h-full flex flex-col items-center justify-center text-center px-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl mb-6 blur-[1px] opacity-80" />
          <h1 className="text-2xl font-semibold text-white mb-2">Error Explainer AI</h1>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
            Paste your console errors, stack traces, or broken code snippets below to get a simplified breakdown.
          </p>
        </div>
      ) : (
        // Chat List
        <div className="pb-32"> {/* Bottom padding so input doesn't cover last message */}
          {messages.map((msg, index) => (
            <MessageItem 
              key={index} 
              role={msg.role} 
              content={msg.content} 
            />
          ))}
        </div>
      )}
    </div>
  );
}