// routers/index.router.js
import express from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import geminiRouter from './gemini.routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/gemini', geminiRouter);

export default router;