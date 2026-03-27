
import explainError from "../services/ai.services.js";
import { extractError } from "../utils/extractError.js";
import generateTitle from "../utils/generatetitle.js";
import Chat from "../models/chatModel.js";
import { generateKey } from '../utils/generateKey.js'
import redis from "../config/redis.js";
import { aiQueue } from "../config/queue.js";




export const explainErrorController = async (req, res) => {
    // console.log("the request body is", req.body);
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
        const job = await aiQueue.add("explain-error", {
            error,
            extractedError,
            language,
            title,
            key
        })

        return res.status(200).json({
            success: true,
            jobId: job.id,
            message: "Processing started"
        })
    } catch (err) {
        console.log("AI error", err);

        return res.status(500).json({
            message: "error in processing request",
            success: false
        })
    }
}

