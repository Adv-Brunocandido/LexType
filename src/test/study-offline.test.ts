import { describe, it, expect } from "vitest";
import { BANK, offlineStudy, normalizeArea } from "../lib/study-offline";

describe("Study Offline 2,206 Bank Integration", () => {
  const UI_AREAS = [
    "Ética Profissional (Estatuto da OAB)",
    "Filosofia do Direito",
    "Direitos Humanos",
    "Direito Constitucional",
    "Direito Eleitoral",
    "Direito Internacional",
    "Direito Financeiro",
    "Direito Tributário",
    "Direito Administrativo",
    "Direito Ambiental",
    "Direito Civil",
    "Estatuto da Criança e do Adolescente",
    "Direito do Consumidor",
    "Direito Empresarial",
    "Direito Processual Civil",
    "Direito Penal",
    "Direito Processual Penal",
    "Direito Previdenciário",
    "Direito do Trabalho",
    "Direito Processual do Trabalho",
  ];

  it("should contain at least 2,000 items overall (actual: " + BANK.length + ")", () => {
    expect(BANK.length).toBeGreaterThanOrEqual(2000);
  });

  it("normalizeArea maps all 20 UI labels accurately to valid bank categories", () => {
    for (const label of UI_AREAS) {
      const normalized = normalizeArea(label);
      expect(normalized).toBeTruthy();
      const matchCount = BANK.filter((b) => b.area.toLowerCase() === normalized).length;
      expect(matchCount).toBeGreaterThanOrEqual(100);
    }
  });

  it("offlineStudy directly responds with 10 items for every single UI dropdown option", () => {
    for (const label of UI_AREAS) {
      const items = offlineStudy(label, 10, []);
      expect(items).toHaveLength(10);
      for (const item of items) {
        expect(typeof item.linha).toBe("string");
        expect(item.linha.length).toBeGreaterThan(0);
        expect(typeof item.termo).toBe("string");
        expect(item.termo.length).toBeGreaterThan(0);
        expect(typeof item.semantica).toBe("string");
        expect(item.virada).toBeDefined();
        expect(typeof item.virada.titulo).toBe("string");
        expect(typeof item.virada.raciocinio).toBe("string");
        expect(typeof item.virada.exemplo).toBe("string");
      }
    }
  });

  it("rotates seen items without repeating", () => {
    const first5 = offlineStudy("Direito Penal", 5, []);
    const seenTermos = first5.map((i) => i.termo);
    const next5 = offlineStudy("Direito Penal", 5, seenTermos);
    for (const item of next5) {
      expect(seenTermos).not.toContain(item.termo);
    }
  });
});
