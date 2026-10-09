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
        userApiKey: z.string().max(300).optional(),
        userApiProvider: z
          .enum(["gemini", "openai", "claude", "deepseek", "grok", "lovable"])
          .optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }): Promise<{ itens: StudyItem[]; error?: string }> => {
    // 1. Identifica provedor e chave de API
    const geminiKey =
      (data.userApiProvider === "gemini" && data.userApiKey) ||
      process.env["GEMINI_API_KEY"] ||
      process.env["GOOGLE_API_KEY"];

    const openaiKey =
      (data.userApiProvider === "openai" && data.userApiKey) ||
      process.env["OPENAI_API_KEY"];

    const claudeKey =
      (data.userApiProvider === "claude" && data.userApiKey) ||
      process.env["ANTHROPIC_API_KEY"] ||
      process.env["CLAUDE_API_KEY"];

    const deepseekKey =
      (data.userApiProvider === "deepseek" && data.userApiKey) ||
      process.env["DEEPSEEK_API_KEY"];

    const grokKey =
      (data.userApiProvider === "grok" && data.userApiKey) ||
      process.env["GROK_API_KEY"] ||
      process.env["XAI_API_KEY"];

    const lovableKey =
      (data.userApiProvider === "lovable" && data.userApiKey) ||
      process.env["LOVABLE_API_KEY"];

    const prompt = `Área do Direito: ${data.area}.
Teclas que o aluno está treinando: ${data.keys.join(" ") || "todas"}.
Termos já estudados (não repita): ${data.seen.join(", ") || "nenhum"}.

${data.reference ? `MATERIAL DE REFERÊNCIA DO ALUNO (baseie o conteúdo nele, priorizando seus temas e diretrizes):\n"""\n${data.reference}\n"""\n` : ""}
Gere exatamente ${data.count} itens. Cada item:
- linha: frase jurídica em português, minúsculas, 40 a 90 caracteres, sem aspas nem travessões, usando preferencialmente palavras ricas nas teclas treinadas, contendo o termo.
- termo: o termo técnico central da linha.
- semantica: significado técnico-jurídico preciso do termo e sua etimologia quando útil (máx. 2 frases).
- virada: uma "virada de chave" extremamente prática e técnica da área da FGV OAB:
  - titulo: nome do conceito em Title Case sem nomes de pessoas fictícias;
  - conceito: explica o instituto e diferencia de figuras próximas;
  - raciocinio: o critério jurídico decisivo que resolve o caso e exceções;
  - exemplo: caso prático curto e completo mostrando a consequência concreta.
Seja rigorosamente correto quanto à legislação brasileira vigente. Responda em JSON válido com formato { "itens": [...] }.`;

    // 2. Chamada via Google Gemini
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.3,
              },
            }),
          },
        );

        if (geminiRes.ok) {
          const geminiData = (await geminiRes.json()) as any;
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text) as { itens: StudyItem[] };
            if (Array.isArray(parsed.itens) && parsed.itens.length > 0) {
              return { itens: parsed.itens.slice(0, data.count) };
            }
          }
        }
      } catch (err) {
        console.warn("Falha na chamada Gemini API:", err);
      }
    }

    // 3. Chamada via OpenAI
    if (openaiKey) {
      try {
        const oaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content: "Você é um professor catedrático de Direito brasileiro, preciso e técnico.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.3,
          }),
        });

        if (oaiRes.ok) {
          const oaiData = (await oaiRes.json()) as any;
          const content = oaiData.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content) as { itens: StudyItem[] };
            if (Array.isArray(parsed.itens) && parsed.itens.length > 0) {
              return { itens: parsed.itens.slice(0, data.count) };
            }
          }
        }
      } catch (err) {
        console.warn("Falha na chamada OpenAI API:", err);
      }
    }

    // 4. Chamada via Anthropic Claude
    if (claudeKey) {
      try {
        const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": claudeKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 2500,
            temperature: 0.3,
            system:
              "Você é um professor catedrático de Direito brasileiro, preciso e técnico. Responda estritamente em formato JSON válido contendo o objeto {\"itens\": [...] } com os campos solicitados.",
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (claudeRes.ok) {
          const claudeData = (await claudeRes.json()) as any;
          const textBlock = claudeData.content?.[0]?.text;
          if (textBlock) {
            const jsonMatch = textBlock.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]) as { itens: StudyItem[] };
              if (Array.isArray(parsed.itens) && parsed.itens.length > 0) {
                return { itens: parsed.itens.slice(0, data.count) };
              }
            }
          }
        }
      } catch (err) {
        console.warn("Falha na chamada Anthropic Claude API:", err);
      }
    }

    // 5. Chamada via DeepSeek
    if (deepseekKey) {
      try {
        const dsRes = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${deepseekKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content:
                  "Você é um professor catedrático de Direito brasileiro, preciso e técnico. Responda estritamente em JSON com a chave 'itens'.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.3,
          }),
        });

        if (dsRes.ok) {
          const dsData = (await dsRes.json()) as any;
          const content = dsData.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content) as { itens: StudyItem[] };
            if (Array.isArray(parsed.itens) && parsed.itens.length > 0) {
              return { itens: parsed.itens.slice(0, data.count) };
            }
          }
        }
      } catch (err) {
        console.warn("Falha na chamada DeepSeek API:", err);
      }
    }

    // 6. Chamada via xAI Grok
    if (grokKey) {
      try {
        const grokRes = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${grokKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "grok-2-latest",
            messages: [
              {
                role: "system",
                content:
                  "Você é um professor catedrático de Direito brasileiro, preciso e técnico. Responda estritamente em JSON válido com a chave 'itens'.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.3,
          }),
        });

        if (grokRes.ok) {
          const grokData = (await grokRes.json()) as any;
          const content = grokData.choices?.[0]?.message?.content;
          if (content) {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]) as { itens: StudyItem[] };
              if (Array.isArray(parsed.itens) && parsed.itens.length > 0) {
                return { itens: parsed.itens.slice(0, data.count) };
              }
            }
          }
        }
      } catch (err) {
        console.warn("Falha na chamada xAI Grok API:", err);
      }
    }

    // 7. Chamada via Lovable Gateway
    if (lovableKey) {
      try {
        const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
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

        if (res.ok && res.body) {
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
          const parsed = JSON.parse(out) as { itens: StudyItem[] };
          if (Array.isArray(parsed.itens) && parsed.itens.length > 0) {
            return { itens: parsed.itens.slice(0, data.count) };
          }
        }
      } catch (err) {
        console.warn("Falha na chamada Lovable Gateway:", err);
      }
    }

    // 8. Se nenhuma chave for encontrada ou falhar
    const anyKeyConfigured =
      Boolean(geminiKey || openaiKey || claudeKey || deepseekKey || grokKey || lovableKey);
    const errorMsg = !anyKeyConfigured
      ? "Nenhuma chave de IA detectada. Você pode inserir sua chave nas configurações do app ou rodar localmente com .env. Usando banco offline da OAB."
      : "Provedor de IA temporariamente indisponível. Usando o banco offline da OAB.";

    return { itens: [], error: errorMsg };
  });
