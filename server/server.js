import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: '50mb' })); // इमेज के लिए लिमिट बढ़ाई

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message, imageBuffer, mimeType } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let contentParts = [{ text: message }];

        // अगर इमेज है तो उसे जोड़ें
        if (imageBuffer) {
            const base64Data = imageBuffer.split(",")[1];
            contentParts.push({
                inlineData: { data: base64Data, mimeType: mimeType || "image/jpeg" }
            });
        }

        const result = await model.generateContent(contentParts);
        res.json({ reply: result.response.text() });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ reply: "Pipeline Disconnect: Check API Key or Server." });
    }
});

app.get('/', (req, res) => res.send("Backend server is live!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
