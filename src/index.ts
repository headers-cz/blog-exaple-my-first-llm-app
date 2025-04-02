// src/index.ts
import { OpenAI } from "openai";
import { CONFIG } from "./config";

// Inicializace OpenAI klienta
const openai = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
});

// Hlavní funkce pro komunikaci s LLM
async function generateResponse(prompt: string): Promise<string> {
  try {
    // Volání OpenAI API
    const response = await openai.chat.completions.create({
      model: CONFIG.MODEL_NAME,
      messages: [
        {
          role: "system",
          content: "Jsi užitečný asistent, který odpovídá stručně a přesně.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7, // Hodnota mezi 0 a 1, nižší = více deterministické odpovědi
    });

    // Získání a vrácení vygenerované odpovědi
    return response.choices[0].message.content || "Bez odpovědi";
  } catch (error) {
    console.error("Chyba při komunikaci s OpenAI:", error);
    return "Došlo k chybě při zpracování vašeho požadavku.";
  }
}

// Funkce pro spuštění ukázkového programu
async function runExample() {
  const prompt = "Vysvětli koncept API v jednoduchých pěti větách.";

  console.log(`Otázka: ${prompt}`);
  console.log("Čekám na odpověď...");

  const response = await generateResponse(prompt);

  console.log("\nOdpověď:");
  console.log(response);
}

// Spuštění ukázkového programu
runExample().catch(console.error);
