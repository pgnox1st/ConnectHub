import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORTANT: API KEY CHECK
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("✅ ConnectHub Backend Running");
});

// ✅ CHAT API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.json({
      reply: text,
    });

  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      reply: "AI is currently unavailable",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
