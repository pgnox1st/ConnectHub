import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const aiKey = process.env.GEMINI_API_KEY;
const aiStudio = new GoogleGenAI({ apiKey: aiKey });

app.post('/api/chat', async (req, res) => {
  try {
    const { message, imageBuffer, mimeType } = req.body;
    const model = aiStudio.getGenerativeModel({ model: "gemini-1.5-flash" });
    let promptContents = [message || "Analyze this context"];

    if (imageBuffer && mimeType) {
      promptContents.unshift({
        inlineData: {
          data: imageBuffer.split(',')[1],
          mimeType: mimeType
        }
      });
    }

    const aiResult = await model.generateContent(promptContents);
    const aiResponseText = await aiResult.response.text();
    res.json({ reply: aiResponseText });
  } catch (error) {
    console.error("AI Core Error:", error);
    res.status(500).json({ reply: "कनेक्शन में थोड़ी दिक्कत है। कृपया दोबारा प्रयास करें।" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI Backend Operational on Port ${PORT}`));
  
