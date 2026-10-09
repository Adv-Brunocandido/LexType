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

  it("deve converter LeiSecaItem em StudyItem com Virada de Chave tripartite e atualidades", () => {
    const item = LEI_SECA_BANK[0]!;
    const study = leiSecaToStudyItem(item);
    expect(study.linha).toBe(item.texto);
    expect(study.virada.titulo).toContain(item.dispositivo);
    expect(study.virada.conceito).toBe(item.explicacao);
    expect(study.virada.raciocinio.length).toBeGreaterThan(10);
    expect(study.virada.exemplo.length).toBeGreaterThan(10);
  });

  it("deve buscar o próximo artigo na base de dados de forma sequencial e respeitando o eixo", () => {
    const item1 = getNextLeiSecaItem("Direito Constitucional", []);
    expect(item1.eixo).toBe("Direito Constitucional");
    const item2 = getNextLeiSecaItem("Direito Constitucional", [item1.id]);
    expect(item2.id).not.toBe(item1.id);
    expect(item2.eixo).toBe("Direito Constitucional");
  });
});
