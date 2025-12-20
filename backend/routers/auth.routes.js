import exprees from 'express';
import { signUp, logIn, logOut } from '../controllers/auth.controller.js';

const authRouter = exprees.Router();


authRouter.post('/singUp',signUp);
authRouter.post('/logIn',logIn);
authRouter.get('/logOut',logOut);

export default authRouter;