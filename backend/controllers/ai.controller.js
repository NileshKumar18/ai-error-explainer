
import explainError from "../services/ai.services.js";
import { extractError } from "../utils/extractError.js";




export const explainErrorController = async (req, res) => {
    const { error , language } = req.body;
    console.log(language);

    const extractedError = extractError(error);

    if (!extractedError) {
        return res.status(400).json({
            message: "error description required",
            success: false
        })
    }
    try {
        const rawAnswer = await explainError(extractedError , language)
        const cleanedAnswer = rawAnswer.replace(/[\r\n]+/g, '').trim();
        const answer = JSON.parse(cleanedAnswer);
        return res.status(200).json({
            data: answer,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "error in communicating with open ai",
            success: false
        })
    }
}

