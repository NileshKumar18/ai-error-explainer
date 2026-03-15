import React from 'react'

const ResponseDisplay = ({ response, currentChat }) => {
  console.log("Current chat from the responseDisplay", currentChat.errorExplanation);
  const aiResponse = response?.errorExplanation || currentChat?.errorExplanation;
  console.log("Ai res", aiResponse);


  if (!response && !currentChat) {
    return (
      <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800 flex flex-col items-center justify-center h-full min-h-96">
        <div className="text-center">
          <div className="mb-4 inline-block p-4 bg-gray-800 rounded-2xl">
            <svg className="w-8 h-8 text-gray-500 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg font-medium">Awaiting error analysis...</p>
          <p className="text-gray-600 text-sm mt-2">Paste an error message to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">

      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-800">
        <div className="p-2.5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Analysis Results
        </h2>
      </div>

      <div className="h-96 overflow-y-auto text-gray-300 space-y-6 pr-3">

        {/* Explanation Section */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30 mt-0.5">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-blue-400 text-lg">What Happened</h3>
          </div>

          <p className="leading-relaxed text-gray-200 ml-9">


            {aiResponse?.explanation || "AI response will appear here..."}

          </p>
        </div>

        {/* Root Cause Section */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 bg-red-500/20 rounded-lg border border-red-500/30 mt-0.5">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-red-400 text-lg">Root Cause</h3>
          </div>
          <p className="text-gray-200 ml-9 leading-relaxed">
            {response.errorExplanation?.rootCause || "AI response will appear here..."}
          </p>
        </div>

        {/* Fix Steps Section */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-1.5 bg-cyan-500/20 rounded-lg border border-cyan-500/30 mt-0.5">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-cyan-400 text-lg">How to Fix</h3>
          </div>
          <div className="space-y-2 ml-9">
            {response.errorExplanation?.fixSteps && response.errorExplanation.fixSteps.length > 0 ? (
              response.errorExplanation.fixSteps.map((step, index) => (
                <div key={index} className="flex gap-3 group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                    {index + 1}
                  </div>
                  <p className="text-gray-200 leading-relaxed pt-0.5">{step.step}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">AI response will appear here...</p>
            )}
          </div>
        </div>

        {/* Learning Tip Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/30 hover:border-purple-500/50 transition-colors">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-1.5 bg-purple-500/30 rounded-lg border border-purple-500/50 mt-0.5">
              <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-bold text-purple-300 text-lg">💡 Learning Tip</h3>
          </div>
          <p className="text-gray-200 ml-9 leading-relaxed italic">
            {response.errorExplanation?.learningTip || "AI response will appear here..."}
          </p>
        </div>

      </div>

      {/* Custom scrollbar styling */}
      <style>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgb(55, 65, 81);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgb(75, 85, 99);
        }
      `}</style>

    </div>
  )
}

export default ResponseDisplay