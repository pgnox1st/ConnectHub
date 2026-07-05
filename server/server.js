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

// ================= DEBUG =================
console.log("========== API KEY STATUS ==========");
console.log("Key 1 Loaded:", !!process.env.GEMINI_API_KEY);
console.log("Key 2 Loaded:", !!process.env.GEMINI_API_KEY_2);
console.log("Key 3 Loaded:", !!process.env.GEMINI_API_KEY_3);
console.log("Total Keys:", API_KEYS.filter(Boolean).length);
console.log("====================================");
// =========================================

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

  for (let i = 0; i < API_KEYS.length; i++) {
    const key = API_KEYS[i];

    if (!key) continue;

    try {
      console.log(`Trying API Key ${i + 1}...`);

      const genAI = new GoogleGenerativeAI(key);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(prompt);

      console.log(`✅ API Key ${i + 1} Success`);

      return res.json({
        reply: result.response.text(),
      });

    } catch (error) {
      lastError = error;

      console.error(`❌ API Key ${i + 1} Failed`);

      if (error.status === 429) {
        console.log(`⚠️ API Key ${i + 1} quota exceeded. Trying next key...`);
        continue;
      }

      console.error(error);
      break;
    }
  }

  console.error("========== FINAL ERROR ==========");
  console.error(lastError);
  console.error("=================================");

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
