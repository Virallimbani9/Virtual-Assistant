import exprees from 'express';
import { getUser, updateAssistant } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.js';

const userRouter = exprees.Router();

userRouter.get('/getUser', authMiddleware, getUser);
userRouter.put('/updateAssistant', authMiddleware, upload.single("assistantImage"), updateAssistant);


export default userRouter;