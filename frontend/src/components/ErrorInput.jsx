import React, { useState } from 'react';
import {explainError, pollResult} from '../api/ai.api.js';

export default function ErrorInput({ onSend }) {
  const [result , setResult] = useState(null)
  const [input, setInput] = useState('');
  const [language , setLanguage] = useState("")

  const handleSubmit = async() => {
    if (!input.trim()) return;

    try {
      const res =  await explainError(input , language )
    const jobId = res.jobId

    // console.log("Job id" , jobId);
    
    if(jobId){
      const answer = pollResult(jobId)
      setResult(answer)
    }else{
      setResult(res.data)
    }
    // console.log(result);
    
   
    setInput('');
    } catch (err) {
       console.error(err)
    }
  };

  
  

  return (
    <div className="sticky bottom-6 w-full max-w-2xl mx-auto px-4">
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl shadow-2xl p-2 focus-within:border-[#3f3f3f] transition-all">
        <textarea
          rows="3"
          className="w-full bg-transparent border-none focus:ring-0 text-gray-200 placeholder-gray-500 text-sm resize-none"
          placeholder="Paste your trace stack or error message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.metaKey || e.ctrlKey) && e.key === 'Enter' && handleSubmit()}
        />
        <div className="flex justify-between items-center mt-2 px-2 pb-1">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
            Press ⌘ + Enter
          </span>
          <button
            onClick={handleSubmit}
            className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
          >
            Explain
          </button>
        </div>
      </div>
    </div>
  );
}