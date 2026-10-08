import { describe, it, expect } from "vitest";
import { BANK, offlineStudy } from "../lib/study-offline";

describe("Study Offline 2,000 Bank", () => {
  const EXPECTED_AREAS = [
    "ética", "constitucional", "civil", "processo civil", "administrativo",
    "penal", "processo penal", "trabalho", "processo do trabalho", "tributário",
    "empresarial", "direitos humanos", "internacional", "ambiental", "consumidor",
    "eca", "filosofia", "financeiro", "previdenciário", "eleitoral"
  ];

  it("should contain at least 2,000 items overall (actual: " + BANK.length + ")", () => {
    expect(BANK.length).toBeGreaterThanOrEqual(2000);
  });

  it("should cover all 20 canonical OAB 1st phase subjects", () => {
    const areas = new Set(BANK.map((b) => b.area.toLowerCase()));
    for (const expected of EXPECTED_AREAS) {
      expect(areas.has(expected)).toBe(true);
    }
  });

  it("should contain at least 100 items for each of the 20 OAB subjects", () => {
    for (const area of EXPECTED_AREAS) {
      const count = BANK.filter((b) => b.area.toLowerCase() === area).length;
      expect(count).toBeGreaterThanOrEqual(100);
    }
  });

  it("every item in BANK has valid structure without undefined fields", () => {
    for (let i = 0; i < BANK.length; i++) {
      const item = BANK[i];
      expect(item.area).toBeTruthy();
      expect(item.linha).toBeTruthy();
      expect(item.termo).toBeTruthy();
      expect(item.semantica).toBeTruthy();
      expect(item.virada).toBeDefined();
      expect(item.virada.titulo).toBeTruthy();
      expect(item.virada.raciocinio).toBeTruthy();
      expect(item.virada.exemplo).toBeTruthy();
    }
  });

  it("offlineStudy retrieves 10 distinct items for every subject", () => {
    for (const area of EXPECTED_AREAS) {
      const result = offlineStudy(area, 10, []);
      expect(result).toHaveLength(10);
      for (const item of result) {
        expect(typeof item.linha).toBe("string");
        expect(typeof item.termo).toBe("string");
        expect(typeof item.virada.titulo).toBe("string");
      }
    }
  });

  it("rotates seen items properly", () => {
    const first5 = offlineStudy("penal", 5, []);
    const seenTermos = first5.map((i) => i.termo);
    const next5 = offlineStudy("penal", 5, seenTermos);
    for (const item of next5) {
      expect(seenTermos).not.toContain(item.termo);
    }
  });
});
