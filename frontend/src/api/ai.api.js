import api from '../config/axios.js'

export const explainError = async (errorText, language) => {
    try {
        const res = await api.post("/api/ai/explain-error", {
            error: errorText,
            language,
        })

        console.log(" from explain error" , res.data);
        
        return res.data
    } catch (err) {
        console.error("API Error:", err.response?.data || err.message)
        throw err
    }
}

export const pollResult = (jobId) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const res = await api.get(`/api/ai/status/${jobId}`)
                if (res.data.status == "completed") {
                    // console.log("Final Result:", res.data.data)
                    clearInterval(interval)
                    resolve(res.data.data)
                }
                if (res.data.status == "failed") {
                    console.log("Job failed");
                    clearInterval(interval)
                    reject("Job Failed")

                }
            } catch (err) {
                console.error("Polling error:", err.message)
                clearInterval(interval)
                reject(err)
            }
        }, 2000)
    })

}