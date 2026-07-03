import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware to allow cross-origin requests
app.use(cors({
  origin: "*" 
}));
app.use(express.json());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Use Gemini 1.5 Flash model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(message);
        const response = await result.response;
        
        // Send back the AI response
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ reply: "Sorry, I am having trouble connecting to AI." });
    }
});

// Root endpoint for status check
app.get('/', (req, res) => {
    res.send("Backend server is live and running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});
