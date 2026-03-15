import Header from "../components/Header";
import ErrorInput from "../components/ErrorInput";
import ResponseDisplay from "../components/ResponseDisplay";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const Home = () => {
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('errorHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('errorHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (error, language) => {
    const newHistoryItem = {
      error,
      language,
      timestamp: new Date().toISOString(),
    };
    setHistory([newHistoryItem, ...history.slice(0, 49)]); // Keep max 50 items
    // setCurrentError(error);
    setCurrentLanguage(language);
  };

  const selectFromHistory = (item) => {
    console.log(item);

    setCurrentChat(item);
    setCurrentLanguage(item.language);
    // You can add logic here to automatically analyze the selected error
    // if desired
  };

  const clearHistory = () => {
    setHistory([]);
    setResponse(null);
  };

  // Export setResponse to ErrorInput so it can also call addToHistory
  const handleSetResponse = (responseData) => {
    setResponse(responseData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">

      {/* Fixed Sidebar - Desktop only */}
      <div className="hidden md:fixed md:block md:left-0 md:top-0 md:w-80 md:h-screen md:z-30">
        <Sidebar
          history={history}
          onSelectHistory={selectFromHistory}
          onClearHistory={clearHistory}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          response={response}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar
          history={history}
          onSelectHistory={selectFromHistory}
          onClearHistory={clearHistory}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
      </div>

      {/* Main Content - Adjusted for fixed sidebar on desktop */}
      <div className="md:ml-80 min-h-screen flex flex-col">

        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none md:left-80">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        </div>

        {/* Header with Mobile Menu Toggle */}
        <div className="relative z-20 bg-gradient-to-b from-gray-900/80 to-transparent backdrop-blur-sm border-b border-gray-800/50 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-cyan-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-white">Debug Assistant</h1>
          </div>
          {history.length > 0 && (
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {history.length} error{history.length !== 1 ? 's' : ''} analyzed
            </div>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto relative z-10">
          <div className="p-6">
            <Header />

            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <div className="mb-12 mt-8">
                <div className="text-center mb-12 animate-fade-in">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Smart Error Debugging
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Paste your error message and get instant explanations, root causes, and fix steps powered by AI
                  </p>
                </div>

                {/* Main Grid */}
                <div className="grid md:grid-cols-2 gap-8">

                  {/* Left side - Error Input */}
                  <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <ErrorInput setResponse={handleSetResponse} currentChat={currentChat} addToHistory={addToHistory} />
                  </div>

                  {/* Right side - Response Display */}
                  <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <ResponseDisplay response={response} currentChat={currentChat} />
                  </div>

                </div>
              </div>

              {/* Footer Info */}
              <div className="max-w-6xl mx-auto mt-12 mb-8">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 flex-wrap justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Supports Python, JavaScript, Java, C++, Go, Rust, and 14+ more languages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

    </div>
  );
};

export default Home;