import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini API if key is available
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Route: Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", geminiEnabled: !!apiKey });
  });

  // API Route: Gemini Merch Guide Chat
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history, context } = req.body;

      if (!apiKey || !ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured.",
          fallback: true,
        });
      }

      const systemInstruction = `You are the AI Gemini Merch Guide for GOOGLEVERSE ("WEAR THE INTERNET."), an innovative e-commerce experience for Google-inspired tech & creator merchandise.
Your goal is to give helpful, enthusiastic, stylish, and highly personalized product recommendations and shopping advice.

User Context:
- Style Profile: ${context?.styleProfile ? JSON.stringify(context.styleProfile) : "Not scanned yet"}
- Quiz Identity: ${context?.quizIdentity ? context.quizIdentity : "Not taken yet"}
- Shopping Cart: ${context?.cartItems ? context.cartItems.map((i: any) => i.name).join(", ") : "Empty"}
- Current Budget Preference: Indian Rupees (INR ₹)

Product Catalog Highlights:
1. GoogleVerse Classic Tee (₹1,499) - Minimal tech, 100% organic cotton
2. GoogleVerse Color Block Hoodie (₹3,499) - Iconic Google colors, relaxed fit
3. GoogleVerse Everyday Cap (₹999) - Embroidered GoogleVerse logo
4. GoogleVerse Canvas Tote (₹799) - Heavyweight canvas bag
5. GoogleVerse Daily Notebook (₹599) - Hardcover dot-grid journal
6. GoogleVerse Travel Mug (₹1,299) - Insulated stainless steel
7. Android Icon Tee (₹1,599) - Playful Bugdroid design
8. Android Mini Collectible (₹1,899) - Desk figurine
9. Android Sticker Pack (₹399) - Vinyl waterproof stickers
10. Android Tech Hoodie (₹3,899) - Cyber green accents, tech pocket
11. YouTube Creator Tee (₹1,699) - Creator studio inspired
12. YouTube Studio Hoodie (₹3,999) - Ultra-soft fleece for editing sessions
13. YouTube Creator Cap (₹1,099) - Red play-button embroidery
14. YouTube Notebook (₹649) - Content planning layout
15. Developer Mode Tee (₹1,799) - Binary & code syntax print
16. Developer Hoodie (₹4,199) - Midnight black with terminal code detail
17. AI Future Tee (₹1,899) - Neural network gradient graphic
18. AI Lab Hoodie (₹4,499) - Futuristic reflective print
19. Google Desk Mat (₹1,499) - Multi-device felt & rubber desk pad
20. Google Tech Bottle (₹1,599) - Smart temperature display bottle
21. Google Socks (₹499) - 3-pack classic Google colorway
22. Google Backpack (₹3,699) - Modular laptop & tech bag
23. Google Pen Set (₹799) - Matte finish gel pens
24. GoogleVerse Limited Hoodie (₹4,999) - Numbered drop edition

Guidelines:
- Keep responses concise (150-250 words), conversational, friendly, and tech-fashion savvy.
- Always quote prices in INR (₹).
- When suggesting products, explicitly mention exact product names from the list above so the frontend can highlight or recommend them.
- Format responses nicely with markdown bullet points if listing options.`;

      const prompt = `User query: "${message}"\nPrevious conversation context: ${
        history ? JSON.stringify(history.slice(-4)) : "None"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm here to help you discover your perfect GoogleVerse merchandise!";

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({
        error: err?.message || "Failed to generate response from Gemini API.",
        fallback: true,
      });
    }
  });

  // Vite Middleware in Dev vs Static in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GoogleVerse server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
