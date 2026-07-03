import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// CORS को "*" कर दिया है ताकि फ्रंटएंड और बैकएंड आराम से बात कर सकें
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: '50mb' }));

// Google Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        // gemini-pro का इस्तेमाल जारी है
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(message);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ reply: "Gemini Error: Check your API Key or Model access." });
    }
});

app.get('/', (req, res) => res.send("Backend server is live!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
