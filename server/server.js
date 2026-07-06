import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        reply: "Please enter a message.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(message);

    const reply = result.response.text();

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      reply: "AI is currently unavailable. Please try again later.",
    });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("✅ ConnectHub AI Backend Running...");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
