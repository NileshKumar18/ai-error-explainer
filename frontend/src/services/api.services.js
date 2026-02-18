import api from "./axios.js"

export const explainError = async (error) => {
    try {
        const res = await api.post('/api/ai/explain-error', { error })
        return res.data
    } catch (error) {
        throw error
    }
}