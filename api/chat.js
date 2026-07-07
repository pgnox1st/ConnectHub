import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method Not Allowed",
    });
  }

  try {

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        reply: "GEMINI_API_KEY is missing in Vercel Environment Variables",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(message);

    const response = await result.response;

    const reply = response.text();

    return res.status(200).json({
      reply,
    });

  } catch (error) {

    console.error("Gemini API Error:", error);

    return res.status(500).json({
      reply: error.message || "Gemini API Error",
    });

  }
}
