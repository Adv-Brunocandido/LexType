const fs = require("fs");

const path = "c:\\FOLDER APPS\\LexType\\src\\lib\\study.functions.ts";
let content = fs.readFileSync(path, "utf8");

// Replace the single API call with a fallback loop
const fallbackCode = `
    const prompt = \`Área do Direito: \${data.area}.
Teclas que o aluno está treinando: \${data.keys.join(" ") || "todas"}.
Termos já estudados (não repita): \${data.seen.join(", ") || "nenhum"}.
\${data.reference ? \`MATERIAL DE REFERÊNCIA DO ALUNO (baseie o conteúdo nele, priorizando seus temas e diretrizes):\\n"""\\n\${data.reference}\\n"""\\n\` : ""}
Gere exatamente \${data.count} itens. Cada item:
- linha: frase jurídica em português, minúsculas, 40 a 90 caracteres, sem aspas nem travessões, usando preferencialmente palavras ricas nas teclas treinadas, contendo o termo.
- termo: o termo técnico central da linha.
- semantica: significado técnico-jurídico preciso do termo e sua etimologia quando útil (máx. 2 frases).
- virada: uma "virada de chave" extremamente avançada e prática da área, que mesmo advogados experientes erram, com base legal real e absolutamente segura (artigos de lei vigentes, súmulas vinculantes do STF/STJ, temas repetitivos). titulo curto; raciocinio (2-3 frases, o princípio que define a questão com citação expressa da lei/súmula); exemplo (caso concreto curto mostrando a consequência prática do erro).
ATENÇÃO: Sua base de conhecimento deve ser estritamente segura. Não invente súmulas ou jurisprudência. Utilize apenas fontes consolidadas. Responda em JSON.\`;

    const models = [
      "google/gemini-2.5-pro",
      "deepseek/deepseek-chat",
      "anthropic/claude-3-7-sonnet",
      "openai/gpt-4o",
      "openai/gpt-4o-mini"
    ];

    let res;
    let lastError = "";
    
    for (const model of models) {
      try {
        res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: {
            Authorization: \`Bearer \${apiKey}\`,
            "Content-Type": "application/json",
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: model,
            stream: true,
            store: false,
            instructions: "Você é um professor catedrático de Direito brasileiro, preciso e técnico. Forneça apenas informações com segurança jurídica absoluta.",
            input: prompt,
            text: { format: { type: "json_schema", name: "estudo", strict: true, schema } },
          }),
        });

        if (res.ok && res.body) {
          break; // Sucesso, sair do fallback loop
        } else {
          lastError = \`\${res.status}\`;
          console.warn(\`Model \${model} failed with status \${res.status}\`);
        }
      } catch (err) {
        lastError = err.message;
        console.warn(\`Model \${model} fetch failed: \${err.message}\`);
      }
    }

    if (!res || !res.ok || !res.body) {
      const msg = lastError.includes("429")
        ? "Muitas requisições, tente em instantes."
        : lastError.includes("402")
          ? "Créditos de IA esgotados em todos os modelos."
          : \`Falha ao gerar conteúdo após tentar todos os modelos (\${lastError}).\`;
      return { itens: [], error: msg };
    }
`;

content = content.replace(
  /const prompt = `([\s\S]*?)const res = await fetch\([\s\S]*?\}\);?\s*if \(\!res\.ok \|\| \!res\.body\) \{[\s\S]*?return \{ itens: \[\], error: msg \};\s*\}/m,
  fallbackCode,
);

fs.writeFileSync(path, content, "utf8");
console.log("Done study function fallback");
