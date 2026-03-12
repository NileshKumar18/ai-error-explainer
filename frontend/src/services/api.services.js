import api from "./axios.js"

export const explainError = async (error, language) => {
   
    
    try {
        const res = await api.post('/api/ai/explain-error', { error, language })
        return res.data
    } catch (error) {
        throw error
    }
}