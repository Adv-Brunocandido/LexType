import { describe, it, expect } from "vitest";
import {
  LEI_SECA_BANK,
  filterLeiSeca,
  checkAndSyncOfficialLegislation,
  leiSecaToStudyItem,
  getNextLeiSecaItem,
} from "@/lib/lei-seca";
import {
  extractComplexLegalTerm,
  calculateFgvRecurrence,
  offlineStudy,
  LEGAL_TERMS_GLOSSARY,
} from "@/lib/study-offline";
import { SOUND_PROFILES } from "@/lib/sound";

describe("Novas Funcionalidades: Lei Seca, FGV Recorrente, Semântica e Áudio", () => {
  it("deve conter artigos da legislação oficial (CF/88, EAOAB, CPC, CP, CPP, CLT, CTN e Súmulas Vinculantes)", () => {
    expect(LEI_SECA_BANK.length).toBeGreaterThan(15);
    const eixos = new Set(LEI_SECA_BANK.map((item) => item.eixo));
    expect(eixos.has("Direito Constitucional")).toBe(true);
    expect(eixos.has("Ética e Prerrogativas (OAB)")).toBe(true);
    expect(eixos.has("Direito Processual Civil")).toBe(true);
    expect(eixos.has("Direito Penal")).toBe(true);
    expect(eixos.has("Direito do Trabalho")).toBe(true);
    expect(eixos.has("Direito Tributário")).toBe(true);
    expect(eixos.has("Súmulas Vinculantes do STF")).toBe(true);
  });

  it("deve filtrar a Lei Seca por eixo e por termo de busca", () => {
    const etica = filterLeiSeca("Ética e Prerrogativas (OAB)");
    expect(etica.length).toBeGreaterThan(0);
    expect(etica.every((i) => i.eixo === "Ética e Prerrogativas (OAB)")).toBe(true);

    const busca = filterLeiSeca("Todos os Eixos", "inviolabilidade");
    expect(busca.length).toBeGreaterThan(0);
    expect(busca.some((i) => i.texto.toLowerCase().includes("inviolabilidade"))).toBe(true);
  });

  it("deve simular verificação e sincronização governamental de legislação com sucesso", async () => {
    const res = await checkAndSyncOfficialLegislation();
    expect(["success", "offline", "up-to-date"]).toContain(res.status);
    expect(res.updatedCount).toBeGreaterThan(0);
    expect(res.source.length).toBeGreaterThan(0);
    expect(res.message.length).toBeGreaterThan(0);
  });

  it("deve ordenar as questões do banco priorizando as mais recorrentes da FGV", () => {
    const highYieldEntry = {
      area: "ética",
      linha: "o advogado tem direito a honorários sucumbenciais e inviolabilidade do escritório",
      termo: "honorários advocatícios",
      semantica: "FGV Exame",
      virada: {
        titulo: "Honorários",
        conceito: "Honorários advocatícios",
        raciocinio: "Critério decisivo",
        exemplo: "Exemplo prático",
      },
    };
    const rec = calculateFgvRecurrence(highYieldEntry);
    expect(rec.score).toBeGreaterThanOrEqual(95);
    expect(rec.tag).toBeDefined();
  });

  it("deve extrair com precisão a semântica de termos jurídicos complexos", () => {
    const sample = "O juiz concedeu a tutela de urgência inaudita altera parte no processo.";
    const complex = extractComplexLegalTerm(sample);
    expect(complex).not.toBeNull();
    if (complex) {
      expect(["tutela de urgência", "inaudita altera parte"]).toContain(complex.termo);
      expect(complex.significado.length).toBeGreaterThan(10);
      expect(complex.categoria).toBeDefined();
    }
  });

  it("deve processar arquivo de referência educacional fornecido pelo usuário no offlineStudy", () => {
    const refFile = `A presunção de inocência é garantia constitucional fundamental. 
Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.
As provas obtidas por meios ilícitos são inadmissíveis no processo judicial.`;

    const items = offlineStudy("constitucional", 3, [], refFile);
    expect(items.length).toBe(3);
    expect(items[0]!.semantica).toContain("Documento de Referência enviado pelo Usuário");
    expect(items[0]!.virada.exemplo.length).toBeGreaterThan(15);
  });

  it("deve conter perfis de som numerados e descritos claramente (pelo menos 3 tipos mais famosos)", () => {
    expect(SOUND_PROFILES.length).toBeGreaterThanOrEqual(3);
    expect(SOUND_PROFILES[0]!.number).toBe(1);
    expect(SOUND_PROFILES[0]!.label).toContain("1.");
    expect(SOUND_PROFILES[1]!.number).toBe(2);
    expect(SOUND_PROFILES[1]!.label).toContain("2.");
    expect(SOUND_PROFILES[2]!.number).toBe(3);
    expect(SOUND_PROFILES[2]!.label).toContain("3.");
    expect(SOUND_PROFILES.some((p) => p.name.includes("Blue"))).toBe(true);
    expect(SOUND_PROFILES.some((p) => p.name.includes("Brown"))).toBe(true);
    expect(SOUND_PROFILES.some((p) => p.name.includes("Red") || p.name.includes("Linear"))).toBe(true);
  });

  it("deve converter LeiSecaItem em StudyItem com Virada de Chave tripartite e omitir exemplo genérico quando ausente", () => {
    const itemWithExample = LEI_SECA_BANK.find((i) => i.casoConcreto && i.casoConcreto.length > 0)!;
    const studyWithExample = leiSecaToStudyItem(itemWithExample);
    expect(studyWithExample.linha).toBe(itemWithExample.texto);
    expect(studyWithExample.virada.titulo).toContain(itemWithExample.dispositivo);
    expect(studyWithExample.virada.conceito).toBe(itemWithExample.explicacao);
    expect(studyWithExample.virada.raciocinio.length).toBeGreaterThan(10);
    expect(studyWithExample.virada.exemplo).toBe(itemWithExample.casoConcreto!.trim());

    // Se o artigo não possui caso concreto específico, o exemplo deve ser vazio (sem template genérico artificial)
    const itemWithoutExample = LEI_SECA_BANK.find((i) => !i.casoConcreto)!;
    const studyWithoutExample = leiSecaToStudyItem(itemWithoutExample);
    expect(studyWithoutExample.virada.exemplo).toBe("");
  });

  it("deve conter Súmulas do STJ com dispositivo, conceito, virada de chave e exemplo prático", () => {
    const stjItems = filterLeiSeca("Súmulas do Superior Tribunal de Justiça (STJ)");
    expect(stjItems.length).toBeGreaterThanOrEqual(8);
    const sumulasIds = stjItems.map((s) => s.id);
    expect(sumulasIds).toContain("stj-sum-387");
    expect(sumulasIds).toContain("stj-sum-385");
    expect(sumulasIds).toContain("stj-sum-543");
    expect(sumulasIds).toContain("stj-sum-410");
    expect(sumulasIds).toContain("stj-sum-599");

    const sum387 = stjItems.find((s) => s.id === "stj-sum-387");
    expect(sum387).toBeDefined();
    expect(sum387!.texto).toContain("dano estético e dano moral");
    expect(sum387!.casoConcreto).toBeDefined();
  });

  it("deve recuperar artigo inicial específico ou aleatório no banco de Lei Seca", async () => {
    const { getLeiSecaItemById, getAllLeiSecaItems, getRandomLeiSecaItem } = await import(
      "@/lib/lei-seca"
    );
    const item = getLeiSecaItemById("cf-art5-caput");
    expect(item).toBeDefined();
    expect(item!.dispositivo).toBe("Art. 5º, caput");

    const allConstitucional = getAllLeiSecaItems("Direito Constitucional");
    expect(allConstitucional.length).toBeGreaterThan(0);

    const randomItem = getRandomLeiSecaItem("Direito Constitucional");
    expect(randomItem).toBeDefined();
    expect(randomItem.eixo).toBe("Direito Constitucional");
  });

  it("deve fornecer um vasto dicionário jurídico com busca e estrutura tripartite completa", async () => {
    const { DICIONARIO_JURIDICO, searchDicionario, getRandomDicionarioEntry } = await import(
      "@/lib/dicionario-juridico"
    );
    expect(DICIONARIO_JURIDICO.length).toBeGreaterThanOrEqual(20);

    const venire = searchDicionario("venire");
    expect(venire.length).toBeGreaterThan(0);
    expect(venire[0]!.termo).toContain("Venire contra factum proprium");
    expect(venire[0]!.viradaChave.length).toBeGreaterThan(10);
    expect(venire[0]!.exemplo.length).toBeGreaterThan(10);

    const latim = searchDicionario("", "Latim & Brocardos");
    expect(latim.length).toBeGreaterThanOrEqual(10);

    const randomEntry = getRandomDicionarioEntry();
    expect(randomEntry.termo).toBeDefined();
    expect(randomEntry.significado).toBeDefined();
  });
});

