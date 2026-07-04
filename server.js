import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, imageBuffer, mimeType } = req.body;

    if (!message && !imageBuffer) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const contentParts = [];

    if (message) {
      contentParts.push(message);
    }

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

    return res.json({
      reply: response,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        reply: "AI rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      reply: "Internal server error. Please check API key or server.",
    });
  }
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
