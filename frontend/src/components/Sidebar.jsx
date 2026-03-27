import React from 'react';

export default function Sidebar() {
  const history = ["ReferenceError: x is not...", "TypeError: Cannot read...", "React Hook Order Error"];

  return (
    <aside className="w-64 bg-[#080808] border-r border-[#1a1a1a] flex flex-col hidden md:flex">
      <div className="p-6">
        <button className="w-full py-2 px-4 border border-[#333] rounded-lg text-xs font-medium hover:bg-[#1a1a1a] transition-all text-slate-300">
          + New Analysis
        </button>
      </div>
      
      <div className="flex-1 px-4 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-bold text-slate-600 uppercase px-2 mb-4">Recent Traces</p>
        {history.map((item, i) => (
          <div key={i} className="p-2 text-xs text-slate-400 hover:bg-[#111] hover:text-white rounded-md cursor-pointer truncate">
            {item}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
          <span className="text-xs font-medium text-slate-300">Developer Mode</span>
        </div>
      </div>
    </aside>
  );
}