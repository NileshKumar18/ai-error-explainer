
import explainError from "../services/ai.services.js";
import { extractError } from "../utils/extractError.js";
import generateTitle from "../utils/generatetitle.js";
import Chat from "../models/chatModel.js";




export const explainErrorController = async (req, res) => {
    console.log("the request body is" , req.body);  
    const { error , language } = req.body;
    console.log(language);

    const extractedError = extractError(error);
    const title = generateTitle(error);
    console.log("The title is" , title);
    console.log("the extracted error is" , extractedError);

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
        console.log("the answer is" , answer);

        const newExplain = await Chat.create({
            title:title,
            errorText:error,
            errorExplanation:answer
        })
        console.log("the new explain is" , newExplain);
        
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

