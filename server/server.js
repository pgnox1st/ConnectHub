import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: '50mb' }));

// API Key चेक करना
if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message, imageBuffer, mimeType } = req.body;
        
        // मॉडल का नाम यहाँ सेट है - इसे 'gemini-1.5-flash' रहने दें
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let contentParts = [{ text: message || "Hello" }];

        if (imageBuffer) {
            // यह सुनिश्चित करता है कि बेस64 डेटा सही से प्रोसेस हो
            const base64Data = imageBuffer.includes(",") ? imageBuffer.split(",")[1] : imageBuffer;
            contentParts.push({
                inlineData: { data: base64Data, mimeType: mimeType || "image/jpeg" }
            });
        }

        const result = await model.generateContent(contentParts);
        const response = await result.response;
        res.json({ reply: response.text() });
        
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ reply: "Pipeline Disconnect: Failed to communicate with AI model." });
    }
});

app.get('/', (req, res) => res.send("Backend server is live!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
