// src/server.ts
import cors from "cors";
import express, { Request, RequestHandler, Response } from "express";
import { OpenAI } from "openai";
import { CONFIG } from "./config";

// Inicializace Express aplikace
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Inicializace OpenAI klienta
const openai = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
});

// API endpoint pro získání odpovědi
const chatHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      systemMessage = "Jsi užitečný asistent.",
      temperature = 0.7,
    } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Chybí parametr "prompt"' });
      return;
    }

    // Volání OpenAI API
    const response = await openai.chat.completions.create({
      model: CONFIG.MODEL_NAME,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature,
    });

    // Vrácení odpovědi
    res.json({
      response: response.choices[0].message.content,
      usage: response.usage,
    });
  } catch (error) {
    console.error("Chyba:", error);
    res.status(500).json({ error: "Interní chyba serveru" });
  }
};

app.post("/api/chat", chatHandler);

// Spuštění serveru
app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});
