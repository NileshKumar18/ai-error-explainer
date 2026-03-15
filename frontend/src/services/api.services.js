import api from "./axios.js"

export const explainError = async (error, language) => {
   
    
    try {
        const res = await api.post('/api/ai/explain-error', { error, language })
        return res.data
    } catch (error) {
        throw error
    }
}

export const getChatHiostory = async () => {
    try {
        const res = await api.get('/api/ai/chat-history')
        return res.data 
    } catch (error) {
        throw error;
    }
}