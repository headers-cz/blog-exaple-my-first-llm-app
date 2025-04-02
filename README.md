# Blog Example: My First LLM App

Tento projekt je ukázkovou implementací jednoduché aplikace pro komunikaci s LLM (Large Language Model) API. Projekt slouží jako demonstrační příklad pro článek [První kroky s LLM API](https://blog.headers.cz/blog/2025-04-01-prvni-kroky-s-llm-api).

## Funkce

- Základní komunikace s OpenAI API
- Jednoduché webové rozhraní pro chat
- Konfigurovatelné parametry (temperature, systémová zpráva)
- TypeScript implementace

## Instalace

1. Klonování repozitáře:

```bash
git clone https://github.com/headers-cz/blog-example-my-first-llm-app.git
cd blog-example-my-first-llm-app
```

2. Instalace závislostí:

```bash
npm install
```

3. Vytvoření `.env` souboru s API klíčem:

```
OPENAI_API_KEY=sk-your-api-key-here
```

## Spuštění

Pro spuštění vývojového serveru:

```bash
npm run dev
```

Aplikace bude dostupná na `http://localhost:3000`

## Technologie

- TypeScript
- Node.js
- Express.js
- OpenAI API
- React (pro frontend)

## Licence

MIT
