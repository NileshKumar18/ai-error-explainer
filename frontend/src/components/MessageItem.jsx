import React from 'react';

export default function MessageItem({ role, content }) {
  const isAi = role === 'assistant';

  return (
    <div className={`w-full py-9 border-b border-[#161616] ${isAi ? 'bg-[#0f0f0f]' : 'bg-transparent'}`}>
      <div className="max-w-3xl mx-auto px-6 flex gap-6">
        
        {/* Avatar / Icon */}
        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold tracking-tighter
          ${isAi ? 'bg-indigo-600 text-white' : 'bg-[#2a2a2a] text-slate-400'}`}>
          {isAi ? 'AI' : 'ERR'}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-3 overflow-hidden">
          <header className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {isAi ? 'AI Explainer' : 'Input Trace'}
            </span>
          </header>

          <div className="text-sm leading-relaxed text-slate-300">
            {isAi ? (
              // AI Response: Use Monospace for technical clarity
              <div className="font-mono bg-[#1a1a1a] p-5 rounded-xl border border-[#262626] text-indigo-300 whitespace-pre-wrap shadow-inner">
                {content}
              </div>
            ) : (
              // User Input: Simple text
              <p className="text-slate-400 italic">
                "{content}"
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}