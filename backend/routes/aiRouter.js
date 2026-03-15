import express from 'express';
import { explainErrorController } from '../controllers/ai.controller.js';
import { getChatHistory } from '../controllers/chatHistory.controller.js';

const router = express.Router();

router.post('/explain-error', explainErrorController);

router.get('/chat-history', getChatHistory)

export default router;