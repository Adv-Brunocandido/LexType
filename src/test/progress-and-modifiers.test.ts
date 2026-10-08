import { beforeEach, describe, expect, it } from "vitest";
import {
  DAILY_CHALLENGE_SECONDS,
  addPracticeSeconds,
  applyModifiers,
  practiceSecondsToday,
  practiceStreak,
  precisionBonus,
  toLocalDateString,
} from "@/lib/typing";

const always = (v: number) => () => v;

describe("applyModifiers", () => {
  const base = "ação de cobrança contra o devedor";

  it("returns the text untouched when no module is active", () => {
    const out = applyModifiers(base, { capitals: false, punctuation: false, symbols: false });
    expect(out).toBe(base);
  });

  it("capitalizes the first word of each sentence", () => {
    const out = applyModifiers(
      base,
      { capitals: true, punctuation: false, symbols: false },
      { random: always(0.99) },
    );
    expect(out).toBe("Ação de cobrança contra o devedor");
  });

  it("closes the text with terminal punctuation", () => {
    const out = applyModifiers(
      base,
      { capitals: false, punctuation: true, symbols: false },
      { random: always(0.99) },
    );
    expect(out.endsWith(".")).toBe(true);
  });

  it("capitalizes the word that follows terminal punctuation", () => {
    // random 0.1 => punctuation is injected after every word; index 0.1*5 -> ","? we force "." by kind order
    const out = applyModifiers(
      "prazo fatal hoje",
      { capitals: true, punctuation: true, symbols: false },
      { random: always(0.5) },
    );
    const words = out.split(" ");
    for (let i = 1; i < words.length; i++) {
      if (/[.?!]$/.test(words[i - 1]!)) expect(words[i]![0]).toBe(words[i]![0]!.toUpperCase());
    }
  });

  it("injects special symbols when enabled", () => {
    const out = applyModifiers(
      base,
      { capitals: false, punctuation: false, symbols: true },
      { random: always(0) },
    );
    expect(out).toMatch(/[@#$_§]/);
  });

  it("never injects § when the layout has no section key", () => {
    for (let i = 0; i < 200; i++) {
      const out = applyModifiers(
        base,
        { capitals: false, punctuation: false, symbols: true },
        { allowSection: false },
      );
      expect(out).not.toContain("§");
    }
  });
});

describe("Daily 5-minute challenge", () => {
  beforeEach(() => localStorage.clear());

  it("accumulates practice seconds for today", () => {
    addPracticeSeconds(90);
    addPracticeSeconds(60.4);
    expect(practiceSecondsToday()).toBe(150);
  });

  it("ignores invalid or negative durations", () => {
    addPracticeSeconds(-10);
    addPracticeSeconds(Number.NaN);
    expect(practiceSecondsToday()).toBe(0);
  });

  it("counts consecutive days that reached the 5-minute goal", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    addPracticeSeconds(DAILY_CHALLENGE_SECONDS, twoDaysAgo);
    addPracticeSeconds(DAILY_CHALLENGE_SECONDS + 10, yesterday);
    addPracticeSeconds(120, today); // today not complete yet: streak still alive
    expect(practiceStreak()).toBe(2);

    addPracticeSeconds(200, today);
    expect(practiceStreak()).toBe(3);
  });

  it("breaks the streak when a day misses the goal", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    addPracticeSeconds(DAILY_CHALLENGE_SECONDS, threeDaysAgo);
    addPracticeSeconds(100, yesterday);
    expect(practiceStreak()).toBe(0);
    expect(toLocalDateString(yesterday)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("precisionBonus", () => {
  it("rewards precision instead of raw speed", () => {
    expect(precisionBonus(94)).toBe(0);
    expect(precisionBonus(95)).toBe(25);
    expect(precisionBonus(96.9)).toBe(25);
    expect(precisionBonus(97)).toBe(50);
    expect(precisionBonus(100)).toBe(50);
  });
});
