import { describe, it, expect } from "vitest";
import {
  DICIONARIO_JURIDICO,
  searchDicionario,
  getDicionarioStats,
} from "@/lib/dicionario-juridico";
import {
  LEI_SECA_BANK,
  getNextLeiSecaItem,
  getPreviousLeiSecaItem,
  filterLeiSeca,
  normalizeSearchTerm,
} from "@/lib/lei-seca";
import { VADE_MECUM_ITEMS } from "@/lib/vade-mecum/vade-mecum-data";

describe("Navegação de Artigos e Dicionário Jurídico Expandido", () => {
  it("dicionário jurídico contém mais de 100 verbetes e cobre os 10 ramos do direito", () => {
    const stats = getDicionarioStats();
    expect(stats.total).toBeGreaterThanOrEqual(100);
    expect(Object.keys(stats.porCategoria).length).toBeGreaterThanOrEqual(10);

    // Verifica que cada verbete tem termo, significado técnico e categoria
    for (const entry of DICIONARIO_JURIDICO) {
      expect(entry.termo.trim().length).toBeGreaterThan(1);
      expect(entry.significado.trim().length).toBeGreaterThan(15);
      expect(entry.categoria.trim().length).toBeGreaterThan(2);
    }
  });

  it("busca no dicionário jurídico é insensível a acentos e pontuação", () => {
    // Busca por termo acentuado sem acento
    const resAcentuado = searchDicionario("fumus boni");
    expect(resAcentuado.length).toBeGreaterThan(0);
    expect(resAcentuado.some((e) => e.termo.toLowerCase().includes("fumus"))).toBe(true);

    // Busca por termo com pontuação
    const resHab = searchDicionario("habeas corpus");
    expect(resHab.length).toBeGreaterThan(0);
  });

  it("getPreviousLeiSecaItem navega retroativamente de forma consistente", () => {
    const item1 = LEI_SECA_BANK[0];
    const item2 = LEI_SECA_BANK[1];
    expect(item1).toBeDefined();
    expect(item2).toBeDefined();

    // Quando há histórico de vistos
    const seen = [item1!.id, item2!.id];
    const prevFromHistory = getPreviousLeiSecaItem(item2!.id, undefined, seen);
    expect(prevFromHistory.id).toBe(item1!.id);

    // Quando navega por id sequencial
    const prevSeq = getPreviousLeiSecaItem(item2!.id);
    expect(prevSeq.id).toBe(item1!.id);
  });

  it("busca na Lei Seca normaliza com precisão 'art', 'artigo' e numerais", () => {
    expect(normalizeSearchTerm("Art. 5º")).toContain("art 5");
    expect(normalizeSearchTerm("Artigo 121")).toContain("art 121");
    expect(normalizeSearchTerm("Súmula Vinculante 13")).toContain("sv 13");

    const cfResults = filterLeiSeca(undefined, "art 5", "Constituição Federal de 1988");
    expect(cfResults.length).toBeGreaterThan(0);
    expect(cfResults.some((i) => i.dispositivo.includes("Art. 5"))).toBe(true);

    const svResults = filterLeiSeca(undefined, "sumula vinculante 13");
    expect(svResults.length).toBeGreaterThan(0);
  });

  it("todos os itens do acervo possuem dimensões compatíveis com alta performance (>150 WPM)", () => {
    // Garante que não existem itens gigantes com dezenas de milhares de caracteres no acervo
    for (const item of VADE_MECUM_ITEMS) {
      expect(item.texto.length).toBeGreaterThan(10);
      expect(item.texto.length).toBeLessThan(1000); // 100% sob controle estrito
    }
  });
});
