import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize the Google Generative AI client
const aiStudio = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message, imageBuffer, mimeType } = req.body;

    if (!message && !imageBuffer) {
      return res.status(400).json({ reply: "Please provide a message or an image." });
    }

    const contents = [];

    // Handle image input
    if (imageBuffer && mimeType) {
      const base64Data = imageBuffer.split(',')[1] || imageBuffer;
      contents.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
    }

    // Handle text input
    if (message) {
      contents.push({ text: message });
    }

    // Call the Gemini 1.5 Flash model
    const response = await aiStudio.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: contents,
    });

    res.json({ reply: response.text });

  } catch (err) {
    console.error("Gemini Backend Error:", err);
    res.status(500).json({ reply: "Error processing your request with Gemini AI." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
      
