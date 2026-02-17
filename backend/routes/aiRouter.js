import express from 'express';
import { explainErrorController } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/explain-error', explainErrorController);

export default router;