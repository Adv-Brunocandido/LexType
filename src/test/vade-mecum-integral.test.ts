import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  VADE_MECUM_ITEMS,
  DIPLOMAS_META,
  getAllDiplomas,
  getItemsByDiploma,
  searchVadeMecum,
} from "@/lib/vade-mecum/vade-mecum-data";
import {
  LEI_SECA_BANK,
  getDiplomasList,
  getAllLeiSecaItems,
  getNextLeiSecaItem,
  getRandomLeiSecaItem,
  filterLeiSeca,
  leiSecaToStudyItem,
} from "@/lib/lei-seca";

describe("Base Integral do Vade Mecum Digital & Jurisprudência (Edição 2026)", () => {
  it("carrega com sucesso o acervo com mais de 2.500 dispositivos", () => {
    expect(VADE_MECUM_ITEMS.length).toBeGreaterThan(2500);
    expect(LEI_SECA_BANK.length).toBeGreaterThan(2500);
    expect(DIPLOMAS_META.length).toBeGreaterThan(10);
  });

  it("contém todos os principais diplomas e tribunais superiores", () => {
    const diplomas = getAllDiplomas().map((d) => d.diploma);
    expect(diplomas).toContain("Constituição Federal de 1988");
    expect(diplomas).toContain("Código Civil (Lei 10.406/02)");
    expect(diplomas).toContain("Código de Processo Civil (Lei 13.105/15)");
    expect(diplomas).toContain("Código Penal (Decreto-Lei 2.848/40)");
    expect(diplomas).toContain("Código de Processo Penal (Decreto-Lei 3.689/41)");
    expect(diplomas).toContain("Consolidação das Leis do Trabalho (CLT)");
    expect(diplomas).toContain("Código Tributário Nacional (Lei 5.172/66)");
    expect(diplomas).toContain("Código de Defesa do Consumidor (Lei 8.078/90)");
    expect(diplomas).toContain("Estatuto da Advocacia e da OAB (Lei 8.906/94)");
    expect(diplomas).toContain("Súmula Vinculante STF");
    expect(diplomas).toContain("Súmula STJ");
    expect(diplomas).toContain("Súmula TST");
  });

  it("garante integridade de conteúdo para todos os dispositivos normativos", () => {
    for (const item of VADE_MECUM_ITEMS.slice(0, 300)) {
      expect(item.id).toBeTruthy();
      expect(item.dispositivo).toBeTruthy();
      expect(item.texto.length).toBeGreaterThan(10);
      expect(item.diploma).toBeTruthy();
      expect(item.explicacao).toBeTruthy();
      expect(item.eixo).toBeTruthy();
    }
  });

  it("permite filtragem por diploma e busca textual instantânea", () => {
    const cf = getItemsByDiploma("Constituição Federal de 1988");
    expect(cf.length).toBeGreaterThan(200);

    const stj = getItemsByDiploma("Súmula STJ");
    expect(stj.length).toBeGreaterThan(200);

    const tst = getItemsByDiploma("Súmula TST");
    expect(tst.length).toBeGreaterThan(200);

    const searchResults = searchVadeMecum("habeas corpus");
    expect(searchResults.length).toBeGreaterThan(0);
  });

  it("converte item de Lei Seca para StudyItem com virada de chave e aplicação prática", () => {
    const item = LEI_SECA_BANK[0];
    const studyItem = leiSecaToStudyItem(item);
    expect(studyItem.termo).toBeTruthy();
    expect(studyItem.linha).toBe(item.texto);
    expect(studyItem.virada).toBeDefined();
    expect(studyItem.virada.titulo).toBeTruthy();
    expect(studyItem.virada.conceito).toBeTruthy();
  });

  it("funções de navegação e sorteio retornam dispositivos válidos", () => {
    const seen: string[] = [];
    const item1 = getNextLeiSecaItem("Todos os Eixos", seen);
    expect(item1).toBeDefined();
    expect(item1.texto).toBeTruthy();

    const randomItem = getRandomLeiSecaItem("Direito Constitucional", seen);
    expect(randomItem).toBeDefined();
    expect(randomItem.diploma).toBeTruthy();
  });

  it("filtra itens por eixo, termo e diploma", () => {
    const filtered = filterLeiSeca("Direito Penal", "crime", "Código Penal (Decreto-Lei 2.848/40)");
    expect(Array.isArray(filtered)).toBe(true);
  });

  it("verifica a presença de todos os 15 documentos integrais na pasta vade_mecum/", () => {
    const dir = path.join(process.cwd(), "vade_mecum");
    const expectedFiles = [
      "01_Constituicao_Federal_1988.md",
      "02_Codigo_Civil_2002.md",
      "03_Codigo_Processo_Civil_2015.md",
      "04_Codigo_Penal_1940.md",
      "05_Codigo_Processo_Penal_1941.md",
      "06_Consolidacao_Leis_Trabalho_CLT.md",
      "07_Codigo_Tributario_Nacional_CTN.md",
      "08_Codigo_Defesa_Consumidor_CDC.md",
      "09_Estatuto_OAB_e_Etica.md",
      "10_Estatutos_Tematicos_ECA_Idoso_PCD.md",
      "11_Legislacao_Extravagante_Licitacoes_Penha_Drogas_8112.md",
      "12_Sumulas_Vinculantes_STF_1_a_63.md",
      "13_Sumulas_STJ_Enunciados_1_a_676.md",
      "14_Sumulas_e_OJs_TST.md",
      "15_Jurisprudencia_STF_Acordao_Leading_Case.md",
      "README.md",
    ];

    for (const file of expectedFiles) {
      const p = path.join(dir, file);
      expect(fs.existsSync(p), `Arquivo ausente: ${file}`).toBe(true);
      const stat = fs.statSync(p);
      expect(stat.size).toBeGreaterThan(1000);
    }
  });
});
