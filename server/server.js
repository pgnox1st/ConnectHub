import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
];

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  const prompt = `
You are pgnox1st AI, the official AI assistant of ConnectHub.

Rules:
- Your name is always "pgnox1st AI".
- Never say you are Google AI, Gemini or Bard.
- Reply in the user's language whenever possible.

User: ${message}
`;

  let lastError = null;

  for (const key of API_KEYS) {
    if (!key) continue;

    try {
      const genAI = new GoogleGenerativeAI(key);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(prompt);

      return res.json({
        reply: result.response.text(),
      });

    } catch (error) {
      lastError = error;

      if (error.status === 429) {
        console.log("Key limit reached. Trying next key...");
        continue;
      }

      break;
    }
  }

  console.error(lastError);

  return res.json({
    reply:
      "⚠️ All AI API keys have reached their limit. Please try again later.",
  });
});

app.get("/", (req, res) => {
  res.send("✅ ConnectHub Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
