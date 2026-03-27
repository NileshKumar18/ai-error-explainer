import express from 'express';
import { explainErrorController } from '../controllers/ai.controller.js';
import { getChatHistory } from '../controllers/chatHistory.controller.js';
import rateLimiter from '../middlewares/rate-limiter.js';
import { getJobStatus } from '../controllers/getJobStatus.controller.js';

const router = express.Router();

router.post('/explain-error', rateLimiter, explainErrorController);

router.get('/chat-history', getChatHistory)

router.get('/status/:jobId', getJobStatus)

export default router;