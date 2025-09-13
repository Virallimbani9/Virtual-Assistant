import exprees from 'express';
import { signUp, logIn, logOut } from '../controllers/auth.controller.js';

const userRouter = exprees.Router();


userRouter.post('/singUp',signUp);
userRouter.post('/logIn',logIn);
userRouter.get('logOut',logOut);

export default userRouter;