import React, { useState } from 'react'
import api from '../services/axios.js'
import { explainError } from '../services/api.services.js'
import toast from 'react-hot-toast'


const ErrorInput = ({ setResponse }) => {
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [language, setLanguage] = useState("Select language")
    const languages = ["Python", "Java", "Java script", "C++", "C", "C#", "Node js", "Express", "Swift", "Kotlin", "Ruby", "Go", "PHP", "Rust", "Dart", "Flutter", "React", "Angular", "Vue", "Other"]

    const handleExplainError = async (errorText) => {
        if (!errorText.trim()) {
            toast.error("Please enter an error message.")
            return
        }
        if (loading) return
        setLoading(true)

        try {
            const response = await toast.promise(explainError(errorText , language), {
                loading: 'Analyzing error...',
                success: "Explanation ready 🚀",
                error: "Something went wrong ❌"
            })

            setResponse(response.data)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">

            {/* Header with Icon */}
            <div className="w-full flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30">
                        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Debug Assistant
                    </h2>
                </div>

                {/* Language Selector */}
                <div className="relative inline-block">
                    <button
                        onClick={() => setOpen(!open)}
                        className="group px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 font-semibold rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 17v-6m4 6v-6m7-4h-2.5a2.5 2.5 0 00-5 0V5a2 2 0 00-4 0v2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z" />
                        </svg>
                        {language}
                        <svg className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>

                    {open && (
                        <div className="absolute top-full mt-2 w-56 max-h-72 overflow-y-auto bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-10 backdrop-blur-sm">
                            <div className="p-2 border-b border-gray-700">
                                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold px-3 py-2">Select Programming Language</div>
                            </div>
                            {languages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => {
                                        setLanguage(lang)
                                        setOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-700/50 cursor-pointer text-gray-200 hover:text-cyan-400 transition-colors duration-150 text-sm font-medium border-b border-gray-700/30 last:border-0 hover:pl-6 transition-all"
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Textarea with Icon */}
            <div className="relative mb-6">
                <div className="absolute top-4 left-4 text-gray-500 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <textarea
                    value={errorText}
                    onChange={(e) => setErrorText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleExplainError(errorText)
                        }
                    }}
                    placeholder="Paste your error message here... (Press Shift+Enter for new lines)"
                    className="w-full h-64 resize-none bg-gray-800/50 border border-gray-700 rounded-xl p-4 pl-12 outline-none text-gray-100 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 font-mono text-sm leading-relaxed"
                />
            </div>

            {/* Submit Button */}
            <button 
                onClick={() => handleExplainError(errorText)} 
                disabled={loading}
                className={`w-full font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                    loading 
                        ? "bg-gray-700 cursor-not-allowed text-gray-400" 
                        : "bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white hover:from-cyan-600 hover:via-blue-700 hover:to-cyan-600 hover:shadow-2xl hover:shadow-cyan-500/30 active:scale-95"
                }`}
            >
                {loading ? (
                    <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m10-10H2" />
                        </svg>
                        Analyzing Error...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Explain Error
                    </>
                )}
            </button>

            {/* Info text */}
            <p className="text-xs text-gray-500 mt-4 text-center">
                💡 Tip: Press Enter to submit, Shift+Enter for new lines
            </p>

        </div>
    )
}

export default ErrorInput