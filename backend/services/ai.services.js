

import { GoogleGenAI } from "@google/genai";



const explainError = async (error, language) => {

    const ai = new GoogleGenAI({
        apiKey: process.env.API_KEY,
    });
    // console.log("API KEY:", process.env.API_KEY);
    const models = await ai.models.list();
    console.log("Available models:", models);
    try {

        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: `
        You are a senior software engineer and debugging expert helping developers fix errors quickly and learn from them.

        Language/Framework: ${language}

        Error Message:
        ${error}

        Code Context (where the error occurred):
      Not provided

        Please provide a detailed explanation of this error in the following JSON format:

        Return ONLY valid JSON. No markdown. No extra text outside JSON.

        {
            "errorType": "string (e.g. TypeError, SyntaxError, RuntimeError)",
            "severity": "string (critical | warning | info)",
            "explanation": "string (simple 2-3 sentence explanation for beginners)",
            "rootCause": "string (technical reason why this error occurred)",
            "fixSteps": [
                {
                    "step": "string (what to do)",
                    "code": "string (actual code example for this step, empty string if not applicable)"
                }
            ],
            "correctedCode": "string (the full corrected version of the user's code if code was provided, otherwise empty string)",
            "commonMistakes": ["string (other common mistakes related to this error)"],
            "learningTip": "string (one key concept to learn to avoid this in future)",
            "relatedErrors": ["string (similar errors they might encounter)"]
        }

        Rules:
        - Be specific to the actual code provided, not generic
        - correctedCode must be the actual fixed version of their code
        - Keep explanation beginner friendly but fixSteps can be technical
        - If no code is provided, make fixSteps as specific as possible to the error
    `
        });
        console.log(response.text);

        return response.text;
    } catch (err) {
        throw new Error("Failed to generate explanation for error: " + err.message);
    }
}



export default explainError;



