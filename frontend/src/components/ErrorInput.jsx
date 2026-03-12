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

            // console.log(response)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">

            <div className="  w-full flex justify-between px-4 py-1 rounded-full mb-4">
                <h2 className="text-xl font-semibold mb-4">
                    Paste Error 
                </h2>
                <div className="relative inline-block">

                    <button
                        onClick={() => setOpen(!open)}
                        className="px-4 min-w-6 py-2 bg-linear-to-b from-cyan-200 via-violet-400 to-purple-500 text-white rounded-2xl"
                    >
                        {language}
                    </button>

                    {open && (
                        <div className="absolute mt-2 w-40 max-h-[50vh] overflow-y-auto bg-white border rounded shadow">
                            {languages.map((lang) => (
                                <div
                                    key={lang}
                                    onClick={() => {
                                        setLanguage(lang)
                                        setOpen(false)
                                    }}
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                >
                                    {lang}
                                </div>
                            ))}
                        </div>
                    )}

                </div>
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
                placeholder="Paste your error here..."
                className="w-full h-60 resize-none border rounded-lg p-3 outline-none"
            />

            <button onClick={() => handleExplainError(errorText)} className={`mt-4 w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500"} text-white py-2 rounded-lg hover:bg-purple-600 transition`}>
                {loading ? "Analyzing..." : "Explain Error"}
            </button>

        </div>
    )
}

export default ErrorInput
