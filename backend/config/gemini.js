import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const baseUrl = process.env.GEMINI_URL;
    const url = `${baseUrl}?key=${apiKey}`;
    
    const prompt = `You are ${assistantName}, a helpful voice assistant created by ${userName}.

CRITICAL: You MUST respond with ONLY a valid JSON object. No markdown, no code blocks, no explanations.

Your task: Analyze the user's command and return a JSON response in this EXACT format:
{
  "type": "<intent_type>",
  "userInput": "<cleaned_input>",
  "response": "<voice_response>"
}

INTENT TYPES AND RULES:

1. "general" - For conversations, questions, facts, or chat
   - Example: "What is AI?", "Tell me a joke", "How are you?"
   - userInput: Keep the full question
   - response: A friendly, conversational answer

2. "google_search" - When user wants to search on Google
   - Triggers: "search on google", "google search", "find on google"
   - userInput: ONLY the search query (remove "search on google", "${assistantName}", etc.)
   - response: "Searching Google for [query]"

3. "youtube_search" - When user wants to search YouTube
   - Triggers: "search on youtube", "youtube search", "find on youtube"
   - userInput: ONLY the search query
   - response: "Searching YouTube for [query]"

4. "youtube_play" - When user wants to play/watch a video
   - Triggers: "play", "watch", "show me video"
   - userInput: ONLY the video/song name
   - response: "Playing [name] on YouTube"

5. "calculator_open" - Open calculator
   - Triggers: "open calculator", "calculator", "calculate"
   - userInput: "calculator"
   - response: "Opening calculator"

6. "instagram_open" - Open Instagram
   - Triggers: "open instagram", "instagram"
   - userInput: "instagram"
   - response: "Opening Instagram"

7. "facebook_open" - Open Facebook
   - Triggers: "open facebook", "facebook"
   - userInput: "facebook"
   - response: "Opening Facebook"

8. "weather_show" - Get weather information
   - Triggers: "weather", "temperature", "how's the weather"
   - userInput: Keep the location if mentioned, otherwise "current location"
   - response: "Getting weather information"

9. "get_time" - Current time
   - Triggers: "what time", "current time", "time now"
   - userInput: "time"
   - response: "Let me check the time"

10. "get_date" - Current date
    - Triggers: "what's the date", "today's date", "date"
    - userInput: "date"
    - response: "Let me tell you today's date"

11. "get_day" - Current day
    - Triggers: "what day", "which day", "day today"
    - userInput: "day"
    - response: "Let me check what day it is"

12. "get_month" - Current month
    - Triggers: "what month", "which month", "current month"
    - userInput: "month"
    - response: "Let me tell you the current month"

SPECIAL RULES:
- If user asks "who created you" or "who made you": type = "general", response mentions "${userName}"
- Remove "${assistantName}" from userInput if present
- For search queries, extract ONLY the search term, remove all command words
- Keep responses short, natural, and voice-friendly
- NEVER include markdown formatting like \`\`\`json in your response

Examples:

Input: "Hey ${assistantName}, search cat videos on google"
Output: {"type":"google_search","userInput":"cat videos","response":"Searching Google for cat videos"}

Input: "Play shape of you on youtube"
Output: {"type":"youtube_play","userInput":"shape of you","response":"Playing shape of you on YouTube"}

Input: "What is the capital of France?"
Output: {"type":"general","userInput":"What is the capital of France?","response":"The capital of France is Paris"}

Input: "Open calculator"
Output: {"type":"calculator_open","userInput":"calculator","response":"Opening calculator"}

Input: "What time is it?"
Output: {"type":"get_time","userInput":"time","response":"Let me check the time"}

Now process this command: "${command}"

Remember: Respond with ONLY the JSON object, nothing else.`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 256,
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Extract and clean the response
    let generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Remove markdown code blocks if present
    generatedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse and return JSON
    const parsedResponse = JSON.parse(generatedText);
    return parsedResponse;
    
  } catch (err) {
    console.log("Error in Gemini API call:", err.response?.data || err.message);
    
    // Return a fallback response
    return {
      type: "general",
      userInput: command,
      response: "Sorry, I couldn't process that request. Please try again."
    };
  }
};

export default geminiResponse;