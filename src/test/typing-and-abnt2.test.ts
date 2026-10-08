import { describe, expect, it, beforeEach } from "vitest";
import {
  charToKeys,
  keyToChar,
  strip,
  ABNT2_ROWS,
  TRAINABLE_KEYS,
  KEY_GROUPS,
  getKeyRows,
  getKeyGroups,
} from "@/lib/abnt2";
import {
  masteryOf,
  masteryLabel,
  difficultyOf,
  weakestKeys,
  adaptiveRoute,
  generateText,
  toLocalDateString,
  streakDays,
  sessionsToday,
  saveSession,
  loadSessions,
  type KeyStats,
} from "@/lib/typing";

describe("ABNT2 Layout & Character Mapping", () => {
  it("strips accents properly", () => {
    expect(strip("áéíóúãõç")).toBe("aeiouaoc");
  });

  it("maps regular and special characters to keys", () => {
    expect(charToKeys(" ")).toEqual([" "]);
    expect(charToKeys("a")).toEqual(["a"]);
    expect(charToKeys("ç")).toEqual(["ç"]);
  });

  it("handles acute dead keys and tildes correctly", () => {
    expect(charToKeys("á")).toEqual(["´", "a"]);
    expect(charToKeys("É")).toEqual(["´", "e"]);
    expect(charToKeys("ã")).toEqual(["~", "a"]);
    expect(charToKeys("Õ")).toEqual(["~", "o"]);
  });

  it("maps shifted symbols to physical keys", () => {
    expect(charToKeys('"')).toEqual(["'"]);
    expect(charToKeys("!")).toEqual(["1"]);
    expect(charToKeys("@")).toEqual(["2"]);
    expect(charToKeys("$")).toEqual(["4"]);
  });

  it("generates valid practice characters for keys", () => {
    expect(keyToChar("a")).toBe("a");
    const acuteChar = keyToChar("´");
    expect("áéíóú").toContain(acuteChar);
    const tildeChar = keyToChar("~");
    expect("ãõ").toContain(tildeChar);
  });

  it("has central row keys defined and trainable", () => {
    expect(KEY_GROUPS.Central).toContain("a");
    expect(KEY_GROUPS.Central).toContain("ç");
    expect(TRAINABLE_KEYS.length).toBeGreaterThan(30);
  });
});

describe("Typing Engine Metrics & Adaptivity", () => {
  it("calculates mastery score and labels", () => {
    expect(masteryOf(undefined)).toBe(0);
    expect(masteryOf({ attempts: 0, errors: 0 })).toBe(0);
    expect(masteryOf({ attempts: 100, errors: 0 })).toBe(100);
    expect(masteryLabel(100)).toBe("Mestre");
    expect(masteryLabel(95)).toBe("Proficiente");
    expect(masteryLabel(88)).toBe("Praticante");
    expect(masteryLabel(70)).toBe("Aprendiz");
    expect(masteryLabel(0)).toBe("Novo");
  });

  it("calculates difficulty score combining errors and hesitation", () => {
    expect(difficultyOf(undefined)).toBe(0);
    const lowDiff = difficultyOf({ attempts: 20, errors: 0, time: 2000, timed: 10 }); // avg 200ms
    const highDiff = difficultyOf({ attempts: 20, errors: 5, time: 8000, timed: 10 }); // avg 800ms + 25% errors
    expect(highDiff).toBeGreaterThan(lowDiff);
  });

  it("detects weakest keys based on threshold attempts", () => {
    const stats: KeyStats = {
      a: { attempts: 10, errors: 0, time: 2000, timed: 10 },
      b: { attempts: 2, errors: 2 }, // under 3 attempts, should not qualify
      c: { attempts: 10, errors: 6, time: 5000, timed: 10 }, // high difficulty
      d: { attempts: 10, errors: 3, time: 4000, timed: 10 },
    };
    const weak = weakestKeys(stats, ["a", "b", "c", "d"]);
    expect(weak).toContain("c");
    expect(weak).not.toContain("b");
  });

  it("builds an adaptive route falling back to central row if empty", () => {
    const route = adaptiveRoute([], {});
    expect(route.target).toEqual(KEY_GROUPS.Central);
  });

  it("builds an adaptive route including detected hard keys", () => {
    const stats: KeyStats = {
      z: { attempts: 15, errors: 8, time: 10000, timed: 15 },
    };
    const route = adaptiveRoute(["a", "s"], stats);
    expect(route.target).toContain("z");
    expect(route.target).toContain("a");
    expect(route.target.length).toBeLessThanOrEqual(9);
  });

  it("generates text for warmup, legal words, and phrases", () => {
    const warmup = generateText({ mode: "aquecimento", keys: ["a", "s", "d"], level: 1 });
    expect(warmup.length).toBeGreaterThan(0);

    const words = generateText({ mode: "palavras", keys: ["a", "s", "d", "f"], level: 2 });
    expect(words.length).toBeGreaterThan(0);

    const phrases = generateText({ mode: "frases", keys: ["a", "s", "d"], level: 3 });
    expect(phrases.length).toBeGreaterThan(0);
  });
});

describe("Local Timezone & Session Streaks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("formats dates to local YYYY-MM-DD", () => {
    const d = new Date(2026, 9, 7); // Oct 7, 2026
    expect(toLocalDateString(d)).toBe("2026-10-07");
  });

  it("calculates streak correctly across consecutive local days", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    saveSession({ date: yesterday.toISOString(), wpm: 40, accuracy: 95 });
    saveSession({ date: today.toISOString(), wpm: 45, accuracy: 98 });

    expect(loadSessions().length).toBe(2);
    expect(sessionsToday()).toBe(1);
    expect(streakDays()).toBe(2);
  });
});

describe("ANSI US Layout & Multi-layout Support", () => {
  it("provides ANSI US rows without ç", () => {
    const ansiRows = getKeyRows("ansi");
    const allIds = ansiRows.flat().map((k) => k.id);
    expect(allIds).not.toContain("ç");
    expect(allIds).toContain(";");
    expect(allIds).toContain("'");
    expect(allIds).toContain("`");
  });

  it("maps characters in ANSI layout correctly", () => {
    expect(charToKeys("a", "ansi")).toEqual(["a"]);
    expect(charToKeys("ç", "ansi")).toEqual(["c"]);
    expect(charToKeys(";", "ansi")).toEqual([";"]);
  });

  it("returns appropriate key groups for ANSI", () => {
    const ansiGroups = getKeyGroups("ansi");
    expect(ansiGroups.Central).toContain(";");
    expect(ansiGroups.Central).not.toContain("ç");
    expect(ansiGroups.Acentos).toHaveLength(0);
    expect(ansiGroups.Superior).toEqual("qwertyuiop".split(""));
  });
});
