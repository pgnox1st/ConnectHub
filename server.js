import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// जेमिनी AI इंजन कनेक्शन
const aiKey = process.env.GEMINI_API_KEY;
const aiStudio = new GoogleGenAI({ apiKey: aiKey });

app.post('/api/chat', async (req, res) => {
  try {
    const { message, imageBuffer, mimeType } = req.body;
    
    // सबसे एडवांस्ड और फ़ास्ट जेमिनी मॉडल का उपयोग
    const model = aiStudio.getGenerativeModel({ model: "gemini-1.5-flash" });
    let promptContents = [message || "Analyze this context"];

    // अगर यूजर ने कोई फोटो अपलोड की है, तो उसे AI के समझने लायक बाइनरी में बदलना
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
    res.status(500).json({ reply: "कनेक्शन में थोड़ी दिक्कत है। कृपया एक बार अपनी API Key चेक करें या दोबारा मैसेज भेजें।" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI Backend Operational on Port ${PORT}`));
      
