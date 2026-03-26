import React, { useState, useEffect } from 'react'
import { getChatHiostory } from '../services/api.services'


const Sidebar = ({ history, onSelectHistory, onClearHistory, isOpen, setIsOpen, response }) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const titles = await getChatHiostory();

      // console.log(titles?.data);

      setChatHistory(titles.data);
      // console.log(chatHistory);

    }
    fetchHistory()
  }, [response])
 

 

  const formatTime = (timestamp) => {
    if (!timestamp) return 'just now'
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    if (diff < 60000) return 'just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  const truncateError = (text, maxLength = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed md:fixed md:left-0 md:top-0 md:w-80 w-72 h-screen bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 overflow-hidden flex flex-col z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

        {/* Header */}
        <div className="p-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">History</h3>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className=" p-1 hover:bg-gray-800 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {chatHistory.length} {chatHistory.length === 1 ? 'error' : 'errors'} analyzed
          </p>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto">
          {chatHistory.length === 0 ? (
            <div className="p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-gray-800 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm font-medium">No history yet</p>
              <p className="text-gray-600 text-xs mt-2">Analyze errors to see them here</p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {chatHistory.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => {
                    
                    onSelectHistory(chat)
                    setIsOpen(false)
                  }}
                  className="w-full text-left p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="p-1.5 bg-cyan-500/20 rounded border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-colors flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-300 truncate group-hover:text-cyan-400 transition-colors">
                        {chat.title}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-xs text-gray-400 line-clamp-2 pl-6 mb-2 leading-relaxed">
                    {truncateError(chat.error, 60)}
                  </p>
                  <p className="text-xs text-gray-600 pl-6 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTime(chat.timestamp)}
                  </p> */}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Custom scrollbar */}
        <style>{`
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: rgb(55, 65, 81);
            border-radius: 3px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: rgb(75, 85, 99);
          }
        `}</style>

        {/* Footer - Clear History */}
        {history.length > 0 && (
          <div className="p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky bottom-0">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all history?')) {
                  onClearHistory()
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all duration-200 font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear History
            </button>
          </div>
        )}

      </div>
    </>
  )
}

export default Sidebar