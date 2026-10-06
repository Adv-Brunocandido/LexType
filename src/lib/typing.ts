import { LEGAL_PHRASES, LEGAL_WORDS } from "./legal-words";

export const KEY_ROWS = {
  superior: "qwertyuiop",
  central: "asdfghjklç",
  inferior: "zxcvbnm",
} as const;

export type Mode = "aquecimento" | "palavras" | "frases";

const VOWELS = "aeiou";

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateText(mode: Mode, keys: string[]): string {
  const pool = keys.length > 0 ? keys : KEY_ROWS.central.split("");
  if (mode === "aquecimento") {
    const parts: string[] = [];
    while (parts.join(" ").length < 56) {
      const len = Math.random() < 0.5 ? 2 : 3;
      let s = "";
      for (let i = 0; i < len; i++) s += rand(pool);
      parts.push(s);
    }
    return parts.join(" ");
  }
  if (mode === "palavras") {
    const allowed = new Set([...pool, ...VOWELS.split("")]);
    const strict = LEGAL_WORDS.filter((w) =>
      w.split("").every((c) => c === " " || allowed.has(c)),
    );
    const loose = LEGAL_WORDS.filter((w) =>
      w.split("").some((c) => pool.includes(c)),
    );
    const source = strict.length >= 8 ? strict : loose.length >= 8 ? loose : LEGAL_WORDS;
    const picked = new Set<string>();
    while (picked.size < 8 && picked.size < source.length) picked.add(rand(source));
    return [...picked].join(" ");
  }
  const picked = new Set<string>();
  while (picked.size < 2) picked.add(rand(LEGAL_PHRASES));
  return [...picked].join(" ");
}

export interface KeyStat {
  attempts: number;
  errors: number;
}

export type KeyStats = Record<string, KeyStat>;

export function loadKeyStats(): KeyStats {
  try {
    return JSON.parse(localStorage.getItem("lextype-keystats") ?? "{}");
  } catch {
    return {};
  }
}

export function saveKeyStats(s: KeyStats) {
  localStorage.setItem("lextype-keystats", JSON.stringify(s));
}

export function masteryOf(stat?: KeyStat): number {
  if (!stat || stat.attempts === 0) return 0;
  return Math.round((1 - stat.errors / stat.attempts) * 100);
}

export function masteryLabel(m: number): string {
  if (m >= 97) return "Mestre";
  if (m >= 92) return "Proficiente";
  if (m >= 85) return "Praticante";
  if (m > 0) return "Aprendiz";
  return "Novo";
}

export function weakestKeys(stats: KeyStats, keys: string[], n = 3): string[] {
  return keys
    .filter((k) => (stats[k]?.attempts ?? 0) >= 3)
    .sort((a, b) => masteryOf(stats[a]) - masteryOf(stats[b]))
    .slice(0, n);
}

export function coachingTip(weak: string[]): string {
  if (weak.length === 0)
    return "Mantenha os dedos ancorados na fileira central (asdf / jklç) e deixe apenas o dedo responsável se mover — o pulso fica estático.";
  const k = weak[0];
  const sup = KEY_ROWS.superior.includes(k);
  const inf = KEY_ROWS.inferior.includes(k);
  if (sup)
    return `A tecla "${k.toUpperCase()}" está na fileira superior: estenda o dedo a partir da articulação e retorne imediatamente à tecla de repouso — não deixe a mão inteira subir.`;
  if (inf)
    return `A tecla "${k.toUpperCase()}" está na fileira inferior: o erro comum é a mão "viajar" junto com o dedo. Mantenha médio, anelar e mínimo ancorados na fileira central.`;
  return `A tecla "${k.toUpperCase()}" está na fileira central: reduza a velocidade em 20% e priorize precisão — velocidade é consequência de repetições corretas.`;
}

export interface SessionRecord {
  date: string;
  wpm: number;
  accuracy: number;
}

export function loadSessions(): SessionRecord[] {
  try {
    return JSON.parse(localStorage.getItem("lextype-sessions") ?? "[]");
  } catch {
    return [];
  }
}

export function saveSession(r: SessionRecord) {
  const all = loadSessions();
  all.push(r);
  localStorage.setItem("lextype-sessions", JSON.stringify(all.slice(-50)));
}

export function streakDays(): number {
  const days = new Set(loadSessions().map((s) => s.date.slice(0, 10)));
  let streak = 0;
  const d = new Date();
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (days.has(d.toISOString().slice(0, 10))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}
