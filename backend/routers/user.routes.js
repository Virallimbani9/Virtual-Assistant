import exprees from 'express';
import { getUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const userRouter = exprees.Router();

userRouter.get('/getUser', authMiddleware, getUser);

export default userRouter;