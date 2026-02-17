

import { GoogleGenAI } from "@google/genai";



const explainError = async (error) => {
    const ai = new GoogleGenAI({
        apiKey: process.env.API_KEY,
    });
    // console.log("API KEY:", process.env.API_KEY);
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are an expert programming assistant that explains coding errors to beginner developers.

             Your task:
                     - Explain the error in simple and clear language.
                     - Identify the root cause.
                     - Provide step-by-step fix instructions.
                     - Include a short learning tip to help avoid this mistake in the future.

                 Rules:
                     - Avoid advanced jargon unless necessary.
                   - Keep explanations concise and structured.
                    - Format the response using clear sections:

            Explanation:
                     Root Cause:
                     Fix Steps:
                    Learning Tip:
                     ${error}`,
        });
        return response.text;
    } catch (err) {
        throw new Error("Failed to generate explanation for error: " + err.message);
    }
}



export default explainError;



