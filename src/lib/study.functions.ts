import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface StudyItem {
  linha: string;
  termo: string;
  semantica: string;
  virada: {
    titulo: string;
    conceito?: string;
    raciocinio: string;
    exemplo: string;
  };
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
              conceito: { type: "string" },
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
        count: z.number().int().min(1).max(10),
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
- virada: uma "virada de chave" extremamente avançada e prática da área, que mesmo advogados experientes erram, com base legal real e precisa (artigos de lei, súmulas, temas repetitivos). titulo curto; raciocinio (2-3 frases, o princípio que define a questão); exemplo (caso concreto curto mostrando a consequência prática do erro).
Seja rigorosamente correto quanto à legislação brasileira vigente. Responda em JSON.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions: "Você é um professor catedrático de Direito brasileiro, preciso e técnico.",
        input: prompt,
        text: { format: { type: "json_schema", name: "estudo", strict: true, schema } },
      }),
    });

    if (!res.ok || !res.body) {
      const body = await res.text().catch(() => "");
      console.error(`AI gateway error [${res.status}]: ${body}`);
      const msg =
        res.status === 429
          ? "Muitas requisições, tente em instantes."
          : res.status === 402
            ? "Créditos de IA esgotados."
            : `Falha ao gerar conteúdo (${res.status}).`;
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
