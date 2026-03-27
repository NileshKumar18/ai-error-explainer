import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import ErrorInput from './components/ErrorInput';
import Header from './components/Header';

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSendError = (errorText) => {
    const userMsg = { role: 'user', content: errorText };
    setMessages((prev) => [...prev, userMsg]);

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "DEBUG: This error is caused by a race condition in your useEffect hook. \n\nSUGGESTION: Add a cleanup function." }
      ]);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-slate-200 overflow-hidden">
      {/* 1. Sidebar on the left */}
      <Sidebar />

      {/* 2. Main Content Area on the right */}
      <div className="flex-1 flex flex-col relative">
        <Header />
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <ChatContainer messages={messages} />
          
          {/* Input anchored at the bottom */}
          <div className="w-full bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent pt-10 pb-6 px-4">
            <div className="max-w-3xl mx-auto">
              <ErrorInput onSend={handleSendError} />
              <p className="text-[10px] text-center text-slate-600 mt-4 tracking-tight">
                AI-Powered Error Explainer • v1.0.4
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}