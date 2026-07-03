import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint to communicate with Gemini
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ reply: "Message is required." });
        }
        
        // Select the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content based on user message
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        // Send the AI response back to the frontend
        res.json({ reply: text });
        
    } catch (error) {
        console.error("Error processing AI request:", error);
        res.status(500).json({ reply: "Error: Could not get a response from the AI." });
    }
});

// Root endpoint for status check
app.get('/', (req, res) => {
    res.send("Backend server is running successfully.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
