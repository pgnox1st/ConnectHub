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

// API ROUTE
app.post("/api/chat", async (req, res) => {
  try {
    const { message, imageBuffer, mimeType } = req.body;

    // validation
    if (!message && !imageBuffer) {
      return res.status(400).json({
        reply: "Message required",
      });
    }

    // model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // content builder
    const contentParts = [];

    // text
    if (message) {
      contentParts.push(message);
    }

    // image
    if (imageBuffer && mimeType) {
      contentParts.push({
        inlineData: {
          data: imageBuffer.split(",")[1],
          mimeType: mimeType,
        },
      });
    }

    // generate response
    const result = await model.generateContent(contentParts);
    const response = await result.response.text();

    return res.json({
      reply: response,
    });

  } catch (error) {
    console.error("GEMINI ERROR:", error);

    // 🔴 RATE LIMIT ERROR (429)
    if (error?.status === 429) {
      return res.status(429).json({
        reply: "AI limit खत्म हो गया है. थोड़ी देर बाद try करो.",
      });
    }

    // 🔴 GENERAL ERROR
    return res.status(500).json({
      reply: "Server error. API key या server check करो.",
    });
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI Backend running on port ${PORT}`);
});
