import React, { useState } from 'react'
import api from '../services/axios.js'

const ErrorInput = () => {
    const [errorText, setErrorText] = useState('')

    const handleExplainError = async () => {
        console.log(errorText);
        const res = await api.get('/' )
        console.log(res.data);
        
        // try {
        //     const response = await explainError(errorText)
        //     console.log(response)
        // } catch (error) {
        //     console.error(error)
        // }

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
                        handleExplainError()
                    }
                }}
                placeholder="Paste your error here..."
                className="w-full h-60 resize-none border rounded-lg p-3 outline-none"
            />

            <button onClick={handleExplainError} className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
                Explain Error
            </button>

        </div>
    )
}

export default ErrorInput
