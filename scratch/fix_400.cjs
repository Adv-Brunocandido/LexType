const fs = require("fs");

const path = "c:\\FOLDER APPS\\LexType\\src\\lib\\study.functions.ts";
let content = fs.readFileSync(path, "utf8");

// The original prompt is already there. Let's find the models array and replace it.
const regex = /const models = \[[^\]]*\];/m;
const newModels = `const models = [
      "openai/gpt-6-astra", // Alias original / prioritário
      "openai/gpt-4o",
      "openai/gpt-4o-mini",
      "anthropic/claude-3-5-sonnet",
      "google/gemini-1.5-pro",
      "deepseek/deepseek-chat"
    ];`;

content = content.replace(regex, newModels);

// Add reasoning back if the model supports it to avoid 400 on gpt-6-astra if it expects it
const fetchCallRegex = /body: JSON\.stringify\(\{[\s\S]*?\}\),/m;
const newFetchCall = `body: JSON.stringify({
            model: model,
            stream: true,
            store: false,
            ...(model.includes("astra") || model.includes("o3") ? { reasoning: { effort: "low" } } : {}),
            instructions: "Você é um professor catedrático de Direito brasileiro, preciso e técnico. Forneça apenas informações com segurança jurídica absoluta.",
            input: prompt,
            // Alguns modelos no gateway podem rejeitar json_schema strict. Se falhar, tentamos o próximo.
            text: { format: { type: "json_schema", name: "estudo", strict: true, schema } },
          }),`;

content = content.replace(fetchCallRegex, newFetchCall);

fs.writeFileSync(path, content, "utf8");
console.log("Done fix 400");
