import exprees from "express";
import { getGeminiResponse } from "../controllers/gemini.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const geminiRouter = exprees.Router();

geminiRouter.post("/askToAssistant", authMiddleware, getGeminiResponse);

export default geminiRouter;
