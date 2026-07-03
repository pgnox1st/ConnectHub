import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();

// यहाँ CORS को सुरक्षित तरीके से सेट करें
app.use(cors({
  origin: "https://connect-hub-silk.vercel.app" // सिर्फ आपकी वेबसाइट को अनुमति दें
}));

app.use(express.json({ limit: '50mb' }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }],
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ reply: "OpenAI Error: Check your API Key." });
    }
});

app.get('/', (req, res) => res.send("Backend server is live!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
