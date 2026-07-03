import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for frontend connection
app.use(cors());

// Increase JSON payload limit to handle large Base64 image streams smoothly
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Validate the presence of the Google Gemini API Key
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  console.error("CRITICAL ERROR: GEMINI_API_KEY is missing in your environment variables!");
}

// Initialize the official Google Gen AI Client SDK
const aiStudio = new GoogleGenAI({ apiKey: geminiApiKey });

// Main Chat Endpoint to handle Multimodal (Text + Image) requests
app.post('/api/chat', async (req, res) => {
  try {
    const { message, imageBuffer, mimeType } = req.body;

    // Return bad request if both text input and image attachment are absent
    if (!message && !imageBuffer) {
      return res.status(400).json({ reply: "Payload Error: Please provide either a text message or an image asset." });
    }

    // Prepare structured array container for Gemini API content processing
    const requestContents = [];

    // Parse and append image data if sent by the client operator
    if (imageBuffer && mimeType) {
      // Strip out the Base64 metadata prefix if present
      const cleanBase64Data = imageBuffer.includes(',') ? imageBuffer.split(',')[1] : imageBuffer;
      
      requestContents.push({
        inlineData: {
          data: cleanBase64Data,
          mimeType: mimeType
        }
      });
    }

    // Append text prompt query if provided by the client operator
    if (message) {
      requestContents.push({ text: message });
    }

    console.log("Sending optimized payload request to gemini-1.5-flash model...");

    // Execute generation using the high-performance Gemini 1.5 Flash model
    const aiResponse = await aiStudio.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: requestContents,
    });

    // Safely extract text output response and send back to frontend client
    const generatedReply = aiResponse.text || "I processed the request but no text output was generated.";
    return res.status(200).json({ reply: generatedReply });

  } catch (error) {
    console.error("Comprehensive Gemini Backend Core Failure:", error);
    return res.status(500).json({ 
      reply: "System Error: The AI backend encountered an issue processing this request. Please ensure Render Environment Variables are correct." 
    });
  }
});

// Root checking status endpoint
app.get('/', (req, res) => {
  res.send("pgnox1st AI Core Backend Web Service is fully operational.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[DEPLOY SUCCESS] Server initialized on network port: ${PORT}`));
