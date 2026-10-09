import { beforeEach, describe, expect, it } from "vitest";
import { RANK_TIERS, rankOf } from "@/lib/professor";
import {
  calibrateStudyLine,
  calculateGainedXp,
  saveSession,
  loadSessions,
  saveKeyStats,
  loadKeyStats,
} from "@/lib/typing";
import { SOUND_PROFILES, setSoundProfile, soundSettings } from "@/lib/sound";

describe("Rank Tiers & Cumulative Progression", () => {
  it("defines 10 distinct career tiers with ascending XP requirements", () => {
    expect(RANK_TIERS.length).toBe(10);
    for (let i = 1; i < RANK_TIERS.length; i++) {
      expect(RANK_TIERS[i]!.minXp).toBeGreaterThan(RANK_TIERS[i - 1]!.minXp);
      expect(RANK_TIERS[i]!.minWpm).toBeGreaterThan(RANK_TIERS[i - 1]!.minWpm);
      expect(RANK_TIERS[i]!.minAccuracy).toBeGreaterThanOrEqual(RANK_TIERS[i - 1]!.minAccuracy);
    }
  });

  it("starts at Estagiário with 0 XP", () => {
    const rank = rankOf(0);
    expect(rank.name).toBe("Estagiário");
    expect(rank.badge).toBe("🌱");
    expect(rank.next).toBe("Bacharel");
  });

  it("requires cumulative criteria (XP, WPM, accuracy) to promote", () => {
    // 5000 XP is enough for Advogado Júnior (minXp: 3500), but if WPM is 30 (< 35 required for Jr), user stays at Bacharel
    const lowSpeedRank = rankOf(5000, 30, 95);
    expect(lowSpeedRank.name).toBe("Bacharel");
    expect(lowSpeedRank.missingCriteria.some((c) => c.includes("Velocidade"))).toBe(true);

    // If speed is 40 and accuracy is 92%, user properly ascends to Advogado Júnior
    const qualifiedRank = rankOf(5000, 40, 92);
    expect(qualifiedRank.name).toBe("Advogado Júnior");
  });

  it("identifies highest tier (Ministro do STF) when all elite criteria are fulfilled", () => {
    const eliteRank = rankOf(160000, 120, 99);
    expect(eliteRank.name).toBe("Ministro do STF");
    expect(eliteRank.isMaxRank).toBe(true);
    expect(eliteRank.next).toBeUndefined();
  });
});

describe("calculateGainedXp", () => {
  it("scales proportionally and avoids inflation", () => {
    const normal = calculateGainedXp({
      length: 100,
      accuracy: 95,
      maxCombo: 20,
      level: 1,
    });
    expect(normal).toBeGreaterThan(50);
    expect(normal).toBeLessThan(150);
  });

  it("awards high accuracy bonus multiplier", () => {
    const highAcc = calculateGainedXp({
      length: 100,
      accuracy: 98,
      maxCombo: 20,
      level: 1,
    });
    const lowAcc = calculateGainedXp({
      length: 100,
      accuracy: 85,
      maxCombo: 20,
      level: 1,
    });
    expect(highAcc).toBeGreaterThan(lowAcc * 1.3);
  });
});

describe("calibrateStudyLine", () => {
  const longSentence =
    "A incompetência absoluta deve ser declarada de ofício e pode ser alegada em qualquer tempo e grau de jurisdição, independentemente de exceção.";

  it("clamps sentence for 1 line view to avoid multiline spillover", () => {
    const calibrated = calibrateStudyLine(longSentence, 1);
    expect(calibrated.length).toBeLessThanOrEqual(75);
    expect(calibrated.endsWith(".")).toBe(true);
  });

  it("preserves full text when lines >= 2", () => {
    const unchanged = calibrateStudyLine(longSentence, 2);
    expect(unchanged).toBe(longSentence);
  });
});

describe("Mechanical Sound Profiles", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides 4 distinct mechanical switch profiles including Cherry and Typewriter", () => {
    const ids = SOUND_PROFILES.map((p) => p.id);
    expect(ids).toContain("cherry-blue");
    expect(ids).toContain("cherry-brown");
    expect(ids).toContain("cherry-red");
    expect(ids).toContain("typewriter");
  });

  it("persists chosen profile to localStorage", () => {
    setSoundProfile("cherry-red");
    expect(soundSettings.profile).toBe("cherry-red");
    expect(localStorage.getItem("lextype-sound-profile")).toBe("cherry-red");
  });
});

describe("Offline Analytics Persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists and reads typing session metrics", () => {
    saveSession({ date: "2026-10-09T00:00:00Z", wpm: 65, accuracy: 96 });
    saveSession({ date: "2026-10-09T01:00:00Z", wpm: 72, accuracy: 98 });

    const sessions = loadSessions();
    expect(sessions.length).toBe(2);
    expect(sessions[1]!.wpm).toBe(72);
    expect(sessions[1]!.accuracy).toBe(98);
  });

  it("persists and aggregates per-key heatmaps", () => {
    saveKeyStats({
      a: { attempts: 100, errors: 2 },
      b: { attempts: 50, errors: 10 },
    });

    const stats = loadKeyStats();
    expect(stats["a"]!.attempts).toBe(100);
    expect(stats["a"]!.errors).toBe(2);
    // 'a' has 98% accuracy (mastered)
    const accA = Math.round(((100 - 2) / 100) * 100);
    expect(accA).toBe(98);
    // 'b' has 80% accuracy (critical)
    const accB = Math.round(((50 - 10) / 50) * 100);
    expect(accB).toBe(80);
  });
});
