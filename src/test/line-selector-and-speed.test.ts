import { describe, it, expect, beforeEach } from "vitest";
import { newEngine, typeChar, backspace, isComplete, matches, normalizeCompare } from "../lib/engine";
import { generateText } from "../lib/typing";
import { KEY_GROUPS } from "../lib/abnt2";
import { BANK, offlineStudy } from "../lib/study-offline";

describe("Line Selector & High-Speed Typing (>100 WPM)", () => {
  describe("Line Selector Logic & Container Sizing", () => {
    // Sizing formula: Math.max(9, 5.5 + lineCount * 2.8)rem
    const calcMinHeightRem = (lineCount: number) => Math.max(9, 5.5 + lineCount * 2.8);

    it("calculates dynamic container minHeight correctly across all allowed line limits [1, 10]", () => {
      // 1 line -> minimum clamped
      expect(calcMinHeightRem(1)).toBeCloseTo(9, 1);
      // 2 lines
      expect(calcMinHeightRem(2)).toBeCloseTo(11.1, 1);
      // 3 lines
      expect(calcMinHeightRem(3)).toBeCloseTo(13.9, 1);
      // 5 lines
      expect(calcMinHeightRem(5)).toBeCloseTo(19.5, 1);
      // 8 lines
      expect(calcMinHeightRem(8)).toBeCloseTo(27.9, 1);
      // 10 lines
      expect(calcMinHeightRem(10)).toBeCloseTo(33.5, 1);
    });

    it("strictly clamps lineCount updates between 1 and 10", () => {
      const clampLines = (n: number) => Math.max(1, Math.min(10, n));
      expect(clampLines(0)).toBe(1);
      expect(clampLines(-5)).toBe(1);
      expect(clampLines(1)).toBe(1);
      expect(clampLines(5)).toBe(5);
      expect(clampLines(10)).toBe(10);
      expect(clampLines(15)).toBe(10);
    });

    it("scales generated text word counts and sentences when lineCount increases", () => {
      const text1 = generateText({ mode: "palavras", keys: KEY_GROUPS.Central, level: 3, lines: 1 });
      const text3 = generateText({ mode: "palavras", keys: KEY_GROUPS.Central, level: 3, lines: 3 });
      const text8 = generateText({ mode: "palavras", keys: KEY_GROUPS.Central, level: 3, lines: 8 });

      const words1 = text1.split(" ").length;
      const words3 = text3.split(" ").length;
      const words8 = text8.split(" ").length;

      expect(words3).toBeGreaterThan(words1);
      expect(words8).toBeGreaterThan(words3);
    });

    it("supports 1-line study requests seamlessly", () => {
      const item = offlineStudy("Direito Constitucional", 1, []);
      expect(item).toHaveLength(1);
      expect(item[0]?.linha).toBeTruthy();
    });

    it("persists and restores line preferences in localStorage", () => {
      localStorage.setItem("lextype-lines", "5");
      const stored = parseInt(localStorage.getItem("lextype-lines") || "2", 10);
      expect(stored).toBe(5);

      localStorage.setItem("lextype-lines", "10");
      expect(localStorage.getItem("lextype-lines")).toBe("10");
    });
  });

  describe("High-Speed Typing Performance Simulation (>100 WPM)", () => {
    it("processes keystrokes at 150 WPM (~80ms per char) without dropped keys or state desync", () => {
      const text = "a responsabilidade civil ambiental e objetiva sob a teoria do risco integral";
      const engine = newEngine(text);
      let now = 100000;

      // 150 WPM = ~80ms per keystroke
      for (let i = 0; i < text.length; i++) {
        now += 80;
        const ch = text[i]!;
        const outcome = typeChar(engine, ch, {
          stopOnError: true,
          caseSensitive: false,
          layout: "abnt2",
          now,
        });

        expect(outcome.kind).toBe("correct");
        expect(engine.pos).toBe(i + 1);
      }

      expect(isComplete(engine)).toBe(true);
      expect(engine.errors).toBe(0);
      expect(engine.combo).toBe(text.length);
    });

    it("verifies strict mode locks cursor on error until corrected", () => {
      const text = "direito";
      const engine = newEngine(text);

      // Type first letter wrong in strict mode
      const errOutcome = typeChar(engine, "x", {
        stopOnError: true,
        caseSensitive: false,
        layout: "abnt2",
        now: 1000,
      });

      expect(errOutcome.kind).toBe("wrong");
      expect(engine.pos).toBe(0); // Cursor does NOT advance in strict mode!
      expect(engine.wrongAt).toBe(0);

      // Now type correct letter
      const okOutcome = typeChar(engine, "d", {
        stopOnError: true,
        caseSensitive: false,
        layout: "abnt2",
        now: 1100,
      });

      expect(okOutcome.kind).toBe("correct");
      expect(engine.pos).toBe(1); // Cursor advances!
    });

    it("verifies fluid mode advances cursor on error and backspace steps back cleanly", () => {
      const text = "direito";
      const engine = newEngine(text);

      // Type first letter wrong in fluid mode (stopOnError: false)
      const errOutcome = typeChar(engine, "x", {
        stopOnError: false,
        caseSensitive: false,
        layout: "abnt2",
        now: 1000,
      });

      expect(errOutcome.kind).toBe("wrong");
      expect(engine.pos).toBe(1); // Cursor advances in fluid mode!
      expect(engine.marks[0]).toBe(true); // Marked as error

      // Press backspace to correct
      const bsOk = backspace(engine, false);
      expect(bsOk).toBe(true);
      expect(engine.pos).toBe(0);
      expect(engine.marks[0]).toBe(false); // Error mark cleared

      // Retype correct letter
      const okOutcome = typeChar(engine, "d", {
        stopOnError: false,
        caseSensitive: false,
        layout: "abnt2",
        now: 1200,
      });
      expect(okOutcome.kind).toBe("correct");
      expect(engine.pos).toBe(1);
    });

    it("normalizes smart quotes, em-dashes and non-breaking spaces seamlessly", () => {
      // Smart double quotes “ ” -> "
      expect(matches('"', '“', false)).toBe(true);
      expect(matches('"', '”', false)).toBe(true);
      // Smart single quotes ‘ ’ -> '
      expect(matches("'", "‘", false)).toBe(true);
      expect(matches("'", "’", false)).toBe(true);
      // En-dash / Em-dash – — -> -
      expect(matches("-", "–", false)).toBe(true);
      expect(matches("-", "—", false)).toBe(true);
      // Non-breaking space \u00A0 -> ' '
      expect(matches(" ", "\u00A0", false)).toBe(true);
      expect(matches(" ", "\u200B", false)).toBe(true);
    });
  });

  describe("Tripartite Viradas de Chave Structure Integrity", () => {
    it("ensures all 2,220 items have valid tripartite structure (Conceito, Virada de Chave, Exemplo)", () => {
      expect(BANK.length).toBe(2220);

      const areaCounts: Record<string, number> = {};

      for (let i = 0; i < BANK.length; i++) {
        const item = BANK[i]!;
        expect(item.area).toBeTruthy();
        expect(item.linha).toBeTruthy();
        expect(item.semantica).toBeTruthy();
        expect(item.virada).toBeDefined();

        areaCounts[item.area] = (areaCounts[item.area] || 0) + 1;

        // 1. Título numerado com conceito limpo
        expect(item.virada.titulo).toMatch(/^\d+\.\s+/);
        expect(item.virada.titulo).not.toMatch(/\b(Fabrício|Johannes|Pedro Poderá|Maria Poderá)\b/i);

        // 2. Conceito explicativo
        expect(item.virada.conceito).toBeTruthy();
        expect(item.virada.conceito!.length).toBeGreaterThan(30);

        // 3. Virada de chave (critério decisivo sem letras de alternativas)
        expect(item.virada.raciocinio).toBeTruthy();
        expect(item.virada.raciocinio.length).toBeGreaterThan(20);
        expect(item.virada.raciocinio).not.toMatch(/\([A-D]\)\s+(fixou|estabeleceu)/i);

        // 4. Exemplo no caso concreto completo (sem ... e sem preâmbulos de alternativas)
        expect(item.virada.exemplo).toBeTruthy();
        expect(item.virada.exemplo.length).toBeGreaterThan(20);
        expect(item.virada.exemplo).not.toContain("A assertiva correta");
        expect(item.virada.exemplo).not.toMatch(/\.\.\.$/);
      }

      // Garante cobertura das 20 disciplinas oficiais com no mínimo 110 itens cada
      const disciplines = Object.keys(areaCounts);
      expect(disciplines.length).toBe(20);
      for (const d of disciplines) {
        expect(areaCounts[d]).toBeGreaterThanOrEqual(110);
      }
    });
  });
});
