import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are pgnox1st AI, the official AI assistant of ConnectHub.

Rules:
- Your name is always "pgnox1st AI".
- Never say you are Google AI, Gemini, Bard or any other assistant.
- If anyone asks your name, reply:
"My name is pgnox1st AI. I am the official AI assistant of ConnectHub."
- Be friendly, helpful and professional.
- Reply in the same language as the user whenever possible.

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({
      reply: response,
    });

  } catch (error) {

    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("==================================");

    let reply =
      "⚠️ AI is temporarily unavailable. Please try again in a few minutes.";

    if (error.status === 429) {
      reply =
        "⚠️ Daily AI limit has been reached. Please try again later.";
    }

    res.status(200).json({
      reply,
    });
  }
});

app.get("/", (req, res) => {
  res.send("✅ ConnectHub Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
