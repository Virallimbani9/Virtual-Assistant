import geminiResponse from "../config/gemini.js";
import User from "../models/user.model.js";
import moment from "moment";

export const getGeminiResponse = async (req, res) => {
    try {
        const command = req.body.command;
        
        if (!command || command.trim() === "") {
            return res.status(400).json({ message: "Please provide a command" });
        }

        const user = await User.findById(req.user.userId);
        const userName = user.name || "Viral ";
        const userAssistantName = user.assistantName || "AI Assistant";

        // Get parsed JSON response directly from geminiResponse
        const geminiData = await geminiResponse(command, userAssistantName, userName);

        // Check if response is valid
        if (!geminiData || !geminiData.type) {
            return res.status(400).json({ 
                message: "Sorry Buddy, I can't understand that" 
            });
        }

        const type = geminiData.type;

        // Handle different intent types
        switch (type) {
            case "get_date":
                return res.json({
                    type,
                    userInput: geminiData.userInput,
                    response: `Today's date is ${moment().format('MMMM Do, YYYY')}`,
                });

            case "get_time":
                return res.json({
                    type,
                    userInput: geminiData.userInput,
                    response: `Current time is ${moment().format('h:mm A')}`,
                });

            case "get_day":
                return res.json({
                    type,
                    userInput: geminiData.userInput,
                    response: `Today is ${moment().format('dddd')}`,
                });

            case "get_month":
                return res.json({
                    type,
                    userInput: geminiData.userInput,
                    response: `Current month is ${moment().format('MMMM')}`,
                });

            case "general":
            case "google_search":
            case "youtube_search":
            case "youtube_play":
            case "calculator_open":
            case "instagram_open":
            case "facebook_open":
            case "weather_show":
                return res.json({
                    type,
                    userInput: geminiData.userInput,
                    response: geminiData.response,
                });

            default:
                return res.status(400).json({ 
                    message: "Sorry Buddy, I can't understand that" 
                });
        }

    } catch (err) {
        console.log("Error getting Gemini response:", err);
        res.status(500).json({ 
            message: "Sorry, something went wrong. Please try again." 
        });
    }
};