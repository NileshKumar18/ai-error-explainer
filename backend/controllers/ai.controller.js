
import explainError from "../services/ai.services.js";
import { extractError } from "../utils/extractError.js";
import generateTitle from "../utils/generatetitle.js";
import Chat from "../models/chatModel.js";
import { generateKey } from '../utils/generateKey.js'
import redis from "../config/redis.js";
import { json } from "express";




export const explainErrorController = async (req, res) => {
    console.log("the request body is", req.body);
    const { error, language } = req.body;
    // console.log(language);

    const key = `ai:${generateKey(error)}`;
   
    

    const extractedError = extractError(error);
    const title = generateTitle(error);
    // console.log("The title is", title);
    // console.log("the extracted error is", extractedError);

    if (!extractedError) {
        return res.status(400).json({
            message: "error description required",
            success: false
        })
    }
    try {
        const cachedData = await redis.get(key);
      
        
        if (cachedData) {
            console.log("Cached Hit");
            return res.status(200).json({
                data: JSON.parse(cachedData),
                success: true
            })

        }
        const rawAnswer = await explainError(extractedError, language)
        const cleanedAnswer = rawAnswer.replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // console.log("the raw answer is", rawAnswer);
        const answer = JSON.parse(cleanedAnswer);
        // console.log("the answer is", answer);

        const newExplain = await Chat.create({
            title: title,
            errorText: error,
            errorExplanation: answer
        })
        await redis.set(key , JSON.stringify(newExplain) , "EX" , 3600)
        // console.log("Store in the redis" , key);
        
        // console.log("the new explain is", newExplain);

        return res.status(200).json({
            data: newExplain,
            success: true
        })
    } catch (err) {
        console.log("AI error", err);

        return res.status(500).json({
            message: "error in communicating with open ai",
            success: false
        })
    }
}

