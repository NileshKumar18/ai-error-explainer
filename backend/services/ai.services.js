

import { GoogleGenAI } from "@google/genai";



const explainError = async (error) => {
    const ai = new GoogleGenAI({
        apiKey: process.env.API_KEY,
    });
    // console.log("API KEY:", process.env.API_KEY);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
                                You are an expert programming assistant that explains coding errors to beginner developers.

                                Return ONLY valid JSON.
                                Do NOT include markdown.
                                Do NOT include explanations outside JSON.

                                JSON format:

                                {
                                "explanation": "string",
                                "rootCause": "string",
                                "fixSteps": ["step1", "step2"],
                                "learningTip": "string"
                                }

                                Instructions:
                                - Explain the error in simple language.
                                - Identify the root cause.
                                - Provide step-by-step fixes.
                                - Include a short learning tip.

                                Error to explain:

                                ${error}
`

        });
        return response.text;
    } catch (err) {
        throw new Error("Failed to generate explanation for error: " + err.message);
    }
}



export default explainError;



