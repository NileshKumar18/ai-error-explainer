import { Worker } from 'bullmq'
import dotenv from "dotenv";
dotenv.config();
import explainError from './services/ai.services.js';
import Chat from './models/chatModel.js';
import redis from './config/redis.js';
import connect from './utils/connection.js';    

connect()


const worker = new Worker("ai-queue", async (job) => {
    const { extractedError, error, title, key, language } = job.data;


    try {
        const rawAnswer = await explainError(extractedError, language)
        const cleanedAnwer = rawAnswer
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        const answer = JSON.parse(cleanedAnwer);
        const newExplain = await Chat.create({
            title: title,
            errorText: error,
            errorExplanation: answer
        })
        await redis.set(key, JSON.stringify(newExplain), "EX", 3600)

        console.log("Job completed:", job.id);

        return newExplain;


    } catch (err) {

        console.log("Worker error:", err);
        throw err;
    }

},
    {
        connection: {
            host: "127.0.0.1",
            port: 6379
        }
    })