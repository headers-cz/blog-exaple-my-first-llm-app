import { OpenAI } from "openai";
import * as readline from "readline";
import { CONFIG } from "./config";

// Inicializace OpenAI klienta
const openai = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
});

// Vytvoření readline interface pro interakci v konzoli
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Udržování historie konverzace
const conversationHistory: {
  role: "system" | "user" | "assistant";
  content: string;
}[] = [
  {
    role: "system",
    content: "Jsi užitečný, přátelský a stručný asistent. Odpovídej česky.",
  },
];

// Funkce pro získání odpovědi od LLM
async function chatWithAI(userInput: string): Promise<string> {
  try {
    // Přidání vstupu uživatele do historie
    conversationHistory.push({ role: "user", content: userInput });

    // Volání OpenAI API s celou historií konverzace
    const response = await openai.chat.completions.create({
      model: CONFIG.MODEL_NAME,
      messages: conversationHistory,
      temperature: 0.7,
    });

    // Získání odpovědi
    const assistantResponse =
      response.choices[0].message.content || "Bez odpovědi";

    // Přidání odpovědi asistenta do historie
    conversationHistory.push({ role: "assistant", content: assistantResponse });

    return assistantResponse;
  } catch (error) {
    console.error("Chyba při komunikaci s OpenAI:", error);
    return "Došlo k chybě při zpracování vašeho požadavku.";
  }
}

// Funkce pro spuštění interaktivního chatu
function startChat() {
  console.log('Vítejte v chatbotu! Napište zprávu nebo "exit" pro ukončení.');

  function askQuestion() {
    rl.question("> ", async (input) => {
      // Ukončení programu při zadání "exit"
      if (input.toLowerCase() === "exit") {
        console.log("Děkuji za konverzaci. Na shledanou!");
        rl.close();
        return;
      }

      // Získání odpovědi od LLM
      console.log("Čekám na odpověď...");
      const response = await chatWithAI(input);

      // Zobrazení odpovědi
      console.log(`\nAsistent: ${response}\n`);

      // Pokračování v konverzaci
      askQuestion();
    });
  }

  // Zahájení cyklu otázek
  askQuestion();
}

// Spuštění interaktivního chatu
startChat();
