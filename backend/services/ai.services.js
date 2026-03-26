

import { GoogleGenAI } from "@google/genai";



const explainError = async (error, language ) => {


    
    const ai = new GoogleGenAI({
        apiKey: process.env.API_KEY,
    });
    // console.log("API KEY:", process.env.API_KEY);
    // const models = await ai.models.list();
    // console.log("Available models:", models);
    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents:  `
                    You are a senior software engineer and debugging expert.

                    Your task is to analyze a real error and provide a FIX-FIRST response.

                    Language/Framework: ${language}

                    Error Message:
                    ${error}

                    Code Context:
                   Try to find the code if it is given to you take the refernce of the code i 
                    - Since no code is provided, generate a realistic example that causes this error and fix it.

                    IMPORTANT:
                    - You MUST prioritize fixing the error over explaining it.
                    - If code is provided, you MUST return a corrected, working version.
                    - Do NOT give generic advice. Be specific to the given error and code.
                    - If multiple fixes are possible, choose the most practical one.

                    Return ONLY valid JSON. No markdown. No extra text.

                    {
                    "errorType": "string",
                    "severity": "critical | warning | info",

                    "explanation": "Explain in 1-2 simple sentences what went wrong",

                    "rootCause": "Exact technical reason of failure",

                    "fixSteps": [
                        {
                        "step": "Clear actionable step",
                        "code": "Working code snippet for this step (must not be empty if fix involves code)"
                        }
                    ],

                    "correctedCode": "FULL corrected code. MUST be complete and runnable if code was provided. If not possible, return best possible fix snippet instead of empty string.",

                    "codeDiff": [
                        {
                        "before": "buggy line",
                        "after": "fixed line"
                        }
                    ],

                    "commonMistakes": [
                        "Closely related real mistakes developers make"
                    ],

                    "learningTip": "One core concept to understand to avoid this error",

                    "confidence": "high | medium | low"
                    }

                    STRICT RULES:
                    - NEVER return empty correctedCode if code is provided
                    - Code must be syntactically correct and realistic
                    - Avoid placeholders like 'yourVariable'
                    - Keep explanation short, focus on fix
                    `
        });
        // console.log(response.text);

        return response.text;
    } catch (err) {
        throw new Error("Failed to generate explanation for error: " + err.message);
    }
}



export default explainError;



