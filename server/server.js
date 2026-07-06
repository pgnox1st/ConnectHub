import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ================= API KEYS =================
const API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean);

// ================= DEBUG =================
console.log("========== API KEY STATUS ==========");
console.log("Total Keys Loaded:", API_KEYS.length);
API_KEYS.forEach((k, i) => {
  console.log(`Key ${i + 1}:`, !!k);
});
console.log("====================================");

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.send("✅ ConnectHub Backend Running");
});

// ================= CHAT API =================
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    const prompt = `
You are pgnox1st AI, the official AI assistant of ConnectHub.

Rules:
- Your name is "pgnox1st AI"
- Never say Google, Gemini, or Bard
- Reply naturally in user's language

User: ${message}
`;

    let lastError = null;

    for (let i = 0; i < API_KEYS.length; i++) {
      try {
        console.log(\`🚀 Trying API Key \${i + 1}\`);

        const genAI = new GoogleGenerativeAI(API_KEYS[i]);

        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        console.log(\`✅ Success with API Key \${i + 1}\`);

        return res.json({
          reply: text,
        });

      } catch (error) {
        lastError = error;

        const status = error?.status || error?.response?.status;

        console.log(\`❌ API Key \${i + 1} failed\`);

        if (status === 429 || status === 403) {
          console.log("⚠️ Switching to next API key...");
          continue;
        }

        console.error("❌ Critical Error:", error);
        break;
      }
    }

    console.error("========== FINAL ERROR ==========");
    console.error(lastError);
    console.error("=================================");

    return res.status(500).json({
      reply: "⚠️ AI temporarily unavailable. Please try again later.",
    });

  } catch (err) {
    console.error("Server Crash:", err);

    return res.status(500).json({
      reply: "Server error occurred",
    });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
