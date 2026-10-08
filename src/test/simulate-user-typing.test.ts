import { describe, it, expect } from "vitest";
import { newEngine, typeChar, backspace, isComplete } from "../lib/engine";
import { generateText, applyModifiers } from "../lib/typing";
import { KEY_GROUPS } from "../lib/abnt2";
import { BANK } from "../lib/study-offline";

describe("Simulate Typing Experience", () => {
  it("types offline lesson text character by character", () => {
    const text = BANK[0]!.linha; // "fabrício responde..."
    const engine = newEngine(text);

    for (let i = 0; i < text.length; i++) {
      const ch = text[i]!;
      const outcome = typeChar(engine, ch, {
        stopOnError: true,
        caseSensitive: false,
        layout: "abnt2",
      });
      expect(outcome.kind).toBe("correct");
    }
    expect(isComplete(engine)).toBe(true);
  });

  it("fails if caseSensitive is true but user types lowercase on capitalized text", () => {
    const engine = newEngine("Fabrício");
    const out = typeChar(engine, "f", {
      stopOnError: true,
      caseSensitive: true,
      layout: "abnt2",
    });
    // If caseSensitive is true, 'f' !== 'F' -> wrong!
    expect(out.kind).toBe("wrong");
  });

  it("passes when caseSensitive is false even with different cases", () => {
    const engine = newEngine("Fabrício");
    const out = typeChar(engine, "f", {
      stopOnError: true,
      caseSensitive: false,
      layout: "abnt2",
    });
    expect(out.kind).toBe("correct");
  });

  it("generates and types automatic text", () => {
    const raw = generateText({ mode: "palavras", keys: KEY_GROUPS.Central, level: 3 });
    const text = applyModifiers(raw, { capitals: false, punctuation: false, symbols: false });
    const engine = newEngine(text);

    for (let i = 0; i < text.length; i++) {
      const ch = text[i]!;
      const outcome = typeChar(engine, ch, {
        stopOnError: true,
        caseSensitive: false,
        layout: "abnt2",
      });
      expect(outcome.kind).toBe("correct");
    }
    expect(isComplete(engine)).toBe(true);
  });
});
