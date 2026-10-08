import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface StudyItem {
  linha: string;
  termo: string;
  semantica: string;
  virada: { titulo: string; raciocinio: string; exemplo: string };
}

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["itens"],
  properties: {
    itens: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["linha", "termo", "semantica", "virada"],
        properties: {
          linha: { type: "string" },
          termo: { type: "string" },
          semantica: { type: "string" },
          virada: {
            type: "object",
            additionalProperties: false,
            required: ["titulo", "raciocinio", "exemplo"],
            properties: {
              titulo: { type: "string" },
              raciocinio: { type: "string" },
              exemplo: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export const generateStudy = createServerFn({ method: "POST" })
  .validator((d) =>
    z
      .object({
        area: z.string().min(2).max(120),
        keys: z.array(z.string().max(2)).max(60),
        seen: z.array(z.string().max(120)).max(30),
        count: z.number().int().min(2).max(10),
        reference: z.string().max(30000).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }): Promise<{ itens: StudyItem[]; error?: string }> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { itens: [], error: "IA não configurada." };

    const prompt = `Área do Direito: ${data.area}.
Teclas que o aluno está treinando: ${data.keys.join(" ") || "todas"}.
Termos já estudados (não repita): ${data.seen.join(", ") || "nenhum"}.
${data.reference ? `MATERIAL DE REFERÊNCIA DO ALUNO (baseie o conteúdo nele, priorizando seus temas e diretrizes):\n"""\n${data.reference}\n"""\n` : ""}
Gere exatamente ${data.count} itens. Cada item:
- linha: frase jurídica em português, minúsculas, 40 a 90 caracteres, sem aspas nem travessões, usando preferencialmente palavras ricas nas teclas treinadas, contendo o termo.
- termo: o termo técnico central da linha.
- semantica: significado técnico-jurídico preciso do termo e sua etimologia quando útil (máx. 2 frases).
- virada: uma "virada de chave" extremamente avançada e prática da área, que mesmo advogados experientes erram, com base legal real e absolutamente segura (artigos de lei vigentes, súmulas vinculantes do STF/STJ, temas repetitivos). titulo curto; raciocinio (2-3 frases, o princípio que define a questão com citação expressa da lei/súmula); exemplo (caso concreto curto mostrando a consequência prática do erro).
ATENÇÃO: Sua base de conhecimento deve ser estritamente segura. Não invente súmulas ou jurisprudência. Utilize apenas fontes consolidadas. Responda em JSON.`;

    const models = [
      "google/gemini-2.5-pro",
      "deepseek/deepseek-chat",
      "anthropic/claude-3-7-sonnet",
      "openai/gpt-4o",
      "openai/gpt-4o-mini",
    ];

    let res;
    let lastError = "";

    for (const model of models) {
      try {
        res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: model,
            stream: true,
            store: false,
            instructions:
              "Você é um professor catedrático de Direito brasileiro, preciso e técnico. Forneça apenas informações com segurança jurídica absoluta.",
            input: prompt,
            text: { format: { type: "json_schema", name: "estudo", strict: true, schema } },
          }),
        });

        if (res.ok && res.body) {
          break; // Sucesso, sair do fallback loop
        } else {
          lastError = `${res.status}`;
          console.warn(`Model ${model} failed with status ${res.status}`);
        }
      } catch (err) {
        lastError = err.message;
        console.warn(`Model ${model} fetch failed: ${err.message}`);
      }
    }

    if (!res || !res.ok || !res.body) {
      const msg = lastError.includes("429")
        ? "Muitas requisições, tente em instantes."
        : lastError.includes("402")
          ? "Créditos de IA esgotados em todos os modelos."
          : `Falha ao gerar conteúdo após tentar todos os modelos (${lastError}).`;
      return { itens: [], error: msg };
    }

    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let out = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const ev = JSON.parse(payload);
          if (ev.type === "response.output_text.delta") out += ev.delta;
        } catch {
          /* frame incompleto */
        }
      }
    }
    try {
      const parsed = JSON.parse(out) as { itens: StudyItem[] };
      return { itens: parsed.itens.slice(0, data.count) };
    } catch {
      return { itens: [], error: "Resposta da IA inválida." };
    }
  });
