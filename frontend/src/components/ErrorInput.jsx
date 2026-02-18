import React, { useState } from 'react'
import api from '../services/axios.js'
import { explainError } from '../services/api.services.js'
import toast from 'react-hot-toast'


const ErrorInput = ({ setResponse }) => {
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false)

    const handleExplainError = async (errorText) => {
        if (!errorText.trim()) {
            toast.error("Please enter an error message.")
            return
        }
        if (loading) return
        setLoading(true)

        try {
            const response = await toast.promise(explainError(errorText), {
                loading: 'Analyzing error...',
                success: "Explanation ready 🚀",
                error: "Something went wrong ❌"
            })


            setResponse(response.data)

            console.log(response)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
                Paste Error
            </h2>

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
