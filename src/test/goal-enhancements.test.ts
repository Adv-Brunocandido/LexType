import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  calculateTribunalScore,
  getRandomTribunalAcordao,
  TRIBUNAL_EXAM_BANK,
  TRIBUNAL_PASSING_SCORE,
} from "@/lib/tribunal-simulado";
import { LATIM_FORENSE_BANK } from "@/lib/latim-forense-data";
import { normalizeArea, offlineStudy, BANK } from "@/lib/study-offline";
import { validateBackup, restoreBackupData, type LexTypeBackupData } from "@/lib/backup";
import { getMetronomeBpm, setMetronome } from "@/lib/sound";
import { getStudyOfflineModule, getLeiSecaModule } from "@/lib/lazy-modules";

describe("Goal Enhancements - Simulado de Tribunal & Avaliação Oficial", () => {
  it("carrega banco de acórdãos de tribunais com jurisprudência real (STF, STJ, TST)", () => {
    expect(TRIBUNAL_EXAM_BANK.length).toBeGreaterThanOrEqual(4);
    const item = getRandomTribunalAcordao();
    expect(item).toBeDefined();
    expect(["STF", "STJ", "TST"]).toContain(item.tribunal);
    expect(item.texto.length).toBeGreaterThan(100);
    expect(item.ementa.length).toBeGreaterThan(20);
    expect(item.relator).toBeTruthy();
  });

  it("calcula pontuação com base na fórmula de concurso: Caracteres Líquidos = Brutos - (Erros * 2)", () => {
    // 1500 brutos, 10 erros => 1500 - 20 = 1480 líquidos
    const res = calculateTribunalScore(1500, 10, 300);
    expect(res.grossChars).toBe(1500);
    expect(res.errors).toBe(10);
    expect(res.netChars).toBe(1480);
    expect(res.score).toBe(9.9);
    expect(res.isApproved).toBe(true);
    expect(res.verdict).toContain("APROVADO");
  });

  it("reprova candidatos com nota líquida inferior ao corte (8.0)", () => {
    // 1100 brutos, 30 erros => 1100 - 60 = 1040 líquidos => (1040/1500)*10 = 6.9 < 8.0
    const res = calculateTribunalScore(1100, 30, 300);
    expect(res.score).toBeLessThan(TRIBUNAL_PASSING_SCORE);
    expect(res.isApproved).toBe(false);
    expect(res.verdict).toContain("REPROVADO");
  });
});

describe("Goal Enhancements - Brocardos e Latim Forense", () => {
  it("contém brocardos clássicos e recorrentes com estrutura tripartite completa", () => {
    expect(LATIM_FORENSE_BANK.length).toBe(12);
    for (const b of LATIM_FORENSE_BANK) {
      expect(b.area).toBe("latim forense");
      expect(b.termo).toBeTruthy();
      expect(b.virada.conceito).toBeTruthy();
      expect(b.virada.raciocinio).toBeTruthy();
      expect(b.virada.exemplo).toBeTruthy();
    }
  });

  it("reconhece 'Brocardos e Latim Forense' na normalização de área", () => {
    expect(normalizeArea("Brocardos e Latim Forense")).toBe("latim forense");
    expect(normalizeArea("latim forense")).toBe("latim forense");
    expect(normalizeArea("Brocardos")).toBe("latim forense");
  });

  it("retorna itens dedicados de latim forense ao selecionar a matéria", () => {
    const items = offlineStudy("Brocardos e Latim Forense", 5, []);
    expect(items.length).toBe(5);
    for (const i of items) {
      expect(i.semantica.toLowerCase()).toContain("brocardo");
      expect(i.virada.conceito).toBeTruthy();
    }
  });
});

describe("Goal Enhancements - Sistema de Backup e Restauração (.json)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("valida rigorosamente arquivos corrompidos ou schemas inválidos", () => {
    expect(validateBackup("not-json").valid).toBe(false);
    expect(validateBackup("{}").valid).toBe(false);
    expect(
      validateBackup(JSON.stringify({ schemaVersion: 2, profiles: "not-an-array" })).valid,
    ).toBe(false);
  });

  it("valida com sucesso backups estruturados corretos", () => {
    const validData = {
      appName: "LexType" as const,
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
      data: {
        "lextype-profiles-v1": JSON.stringify([{ id: "p1", name: "Advogado Teste" }]),
        "lextype-xp": "1500",
        "lextype-layout-mode": "widescreen",
        "lextype-font-family": "serif",
      },
    };

    const res = validateBackup(JSON.stringify(validData));
    expect(res.valid).toBe(true);
    expect(res.payload?.appName).toBe("LexType");
    expect(res.payload?.data["lextype-xp"]).toBe("1500");
  });

  it("restaura atomicamente dados locais a partir do JSON de backup", () => {
    const validData = {
      appName: "LexType" as const,
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
      data: {
        "lextype-profiles-v1": JSON.stringify([{ id: "restored-1", name: "Dra. Restauração" }]),
        "lextype-xp": "3200",
        "lextype-layout-mode": "widescreen",
        "lextype-font-family": "serif",
      },
    };

    const restoreRes = restoreBackupData(JSON.stringify(validData));
    expect(restoreRes.success).toBe(true);
    expect(localStorage.getItem("lextype-xp")).toBe("3200");
    expect(localStorage.getItem("lextype-layout-mode")).toBe("widescreen");
    expect(localStorage.getItem("lextype-font-family")).toBe("serif");
  });
});

describe("Goal Enhancements - Metrônomo Rítmico de Cadência", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("carrega 'off' por padrão e persiste alterações de BPM (60, 80, 100)", () => {
    expect(getMetronomeBpm()).toBe("off");
    setMetronome(80);
    expect(getMetronomeBpm()).toBe(80);
    expect(localStorage.getItem("lextype-metronome")).toBe("80");
    setMetronome("off");
    expect(getMetronomeBpm()).toBe("off");
  });
});

describe("Goal Enhancements - Lazy Module Dynamic Loaders", () => {
  it("carrega o módulo de estudos offline sob demanda e armazena em cache", async () => {
    const mod1 = await getStudyOfflineModule();
    expect(mod1).toBeDefined();
    expect(typeof mod1.offlineStudy).toBe("function");

    const mod2 = await getStudyOfflineModule();
    expect(mod2).toBe(mod1); // Instância idêntica em cache de memória
  });

  it("carrega o módulo da Lei Seca sob demanda e armazena em cache", async () => {
    const mod1 = await getLeiSecaModule();
    expect(mod1).toBeDefined();
    expect(typeof mod1.getRandomLeiSecaItem).toBe("function");

    const mod2 = await getLeiSecaModule();
    expect(mod2).toBe(mod1); // Instância idêntica em cache de memória
  });
});
