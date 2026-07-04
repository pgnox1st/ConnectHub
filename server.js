import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Gemini API setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {
    const { message, imageBuffer, mimeType } = req.body;

    if (!message && !imageBuffer) {
      return res.status(400).json({ reply: "Message required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    let contentParts = [];

    // Text input
    if (message) {
      contentParts.push(message);
    }

    // Image input (optional)
    if (imageBuffer && mimeType) {
      contentParts.push({
        inlineData: {
          data: imageBuffer.split(",")[1],
          mimeType: mimeType,
        },
      });
    }

    const result = await model.generateContent(contentParts);
    const response = await result.response.text();

    return res.json({ reply: response });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    // ✅ quota / rate limit handling
    if (error?.status === 429) {
      return res.status(429).json({
        reply: "AI limit reached. Please try again after some time.",
      });
    }

    return res.status(500).json({
      reply: "Server error. Please check API key or try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI Backend running on port ${PORT}`);
});
