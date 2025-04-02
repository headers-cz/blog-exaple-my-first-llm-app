import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  MODEL_NAME: "gpt-4o-mini", // můžete změnit na jiný model podle potřeby
};

// Ověření, že API klíč je nastaven
if (!CONFIG.OPENAI_API_KEY) {
  console.error("Chyba: OPENAI_API_KEY není nastaven v .env souboru");
  process.exit(1);
}
