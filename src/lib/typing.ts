import { LEGAL_PHRASES, LEGAL_WORDS } from "./legal-words";
import { KEY_GROUPS, TRAINABLE_KEYS, charToKeys, keyToChar } from "./abnt2";

export type Mode = "automatico" | "aquecimento" | "palavras" | "frases";

const rand = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;

function weightedPick<T>(items: [T, number][]): T {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [it, w] of items) {
    r -= w;
    if (r <= 0) return it;
  }
  return items[items.length - 1]![0];
}

function citations(target: Set<string>): string[] {
  const digits = "0123456789".split("").filter((d) => target.has(d));
  const pool = digits.length ? digits : "0123456789".split("");
  const n = (len = 1 + Math.floor(Math.random() * 3)) =>
    Array.from({ length: len }, () => rand(pool)).join("");
  return Array.from({ length: 14 }, () =>
    rand([
      () => `art. ${n()}`,
      () => `lei ${n(4)}/${n(2)}`,
      () => `fls. ${n()}`,
      () => `r$ ${n()},${n(2)}`,
      () => `inc. ${n(1)}`,
      () => `processo ${n(4)}-${n(2)}.${n(4)}`,
      () => `súmula ${n()};`,
      () => `${n(2)}/${n(2)}/${n(4)}`,
      () => `§ ${n(1)}`.replace("§ ", "par. "),
    ])(),
  );
}

function score(text: string, target: Set<string>, weak: Set<string>): number {
  const keys = [...text].filter((c) => c !== " ").flatMap(charToKeys);
  if (!keys.length) return 0;
  const hits = keys.filter((k) => target.has(k)).length;
  if (!hits) return 0;
  const weakHits = keys.filter((k) => weak.has(k)).length;
  return (hits / keys.length) ** 2 * (1 + weakHits * 0.8) + hits * 0.04;
}

export function generateText(opts: { mode: Exclude<Mode, "automatico">; keys: string[]; weak?: string[]; level?: number }): string {
  const { mode, weak = [], level = 3 } = opts;
  const keys = opts.keys.length ? opts.keys : KEY_GROUPS.Central!;
  const target = new Set(keys);
  const weakSet = new Set(weak);
  const count = 5 + level;

  const drill = () => {
    const len = 2 + Math.floor(Math.random() * (1 + Math.floor(level / 3)));
    return Array.from({ length: len }, () =>
      keyToChar(weightedPick(keys.map((k) => [k, weakSet.has(k) ? 3 : 1] as [string, number]))),
    ).join("");
  };

  if (mode === "aquecimento") {
    return Array.from({ length: Math.round(count * 1.4) }, drill).join(" ");
  }

  if (mode === "frases") {
    const ranked = LEGAL_PHRASES.map((p) => [p, score(p, target, weakSet) + 0.01] as [string, number])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const n = level >= 6 ? 3 : 2;
    const out = new Set<string>();
    while (out.size < n) out.add(weightedPick(ranked));
    return [...out].join(" ");
  }

  const ranked = [...LEGAL_WORDS, ...citations(target)]
    .map((w) => [w, score(w, target, weakSet)] as [string, number])
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, Math.max(14, count * 2));

  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    // Sem vocabulário suficiente para as teclas: intercala drills com as próprias teclas.
    if (ranked.length < 5 && i % 2 === 1) out.push(drill());
    else if (ranked.length) {
      let w = weightedPick(ranked);
      if (out[out.length - 1] === w) w = weightedPick(ranked);
      out.push(w);
    } else out.push(drill());
  }
  return out.join(" ");
}

// ---------------- estatísticas ----------------

export interface KeyStat {
  attempts: number;
  errors: number;
  time?: number; // ms acumulados até acertar
  timed?: number;
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

/** Dificuldade combina taxa de erro e hesitação (tempo médio por acerto). */
export function difficultyOf(s?: KeyStat): number {
  if (!s || s.attempts === 0) return 0;
  const err = (s.errors / s.attempts) * 100;
  const avg = s.timed ? (s.time ?? 0) / s.timed : 0;
  return err + Math.max(0, avg - 250) / 40;
}

export function weakestKeys(stats: KeyStats, pool: string[], n = 3): string[] {
  return pool
    .filter((k) => (stats[k]?.attempts ?? 0) >= 3)
    .sort((a, b) => difficultyOf(stats[b]) - difficultyOf(stats[a]))
    .filter((k) => difficultyOf(stats[k]) > 4)
    .slice(0, n);
}

/** Rota adaptativa: mistura as teclas que o aluno indicou com as que o histórico acusa. */
export function adaptiveRoute(seed: string[], stats: KeyStats) {
  const detected = TRAINABLE_KEYS.filter((k) => (stats[k]?.attempts ?? 0) >= 8)
    .map((k) => [k, difficultyOf(stats[k])] as [string, number])
    .filter(([, d]) => d > 6)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k]) => k);
  let target = [...new Set([...detected, ...seed])].slice(0, 9);
  if (!target.length) target = KEY_GROUPS.Central!;
  const weak = [...new Set([...detected.slice(0, 3), ...seed.filter((k) => difficultyOf(stats[k]) > 6 || !stats[k])])].slice(0, 4);
  return { target, weak, detected };
}

export function coachingTip(weak: string[]): string {
  if (weak.length === 0)
    return "Mantenha os dedos ancorados na fileira central (asdf / jklç) e deixe apenas o dedo responsável se mover — o pulso fica estático.";
  const k = weak[0]!;
  if (KEY_GROUPS.Números!.includes(k))
    return `A tecla "${k}" está na fileira de números: é o salto mais longo. Estenda o dedo sem tirar o pulso do lugar e volte à fileira central a cada toque.`;
  if (["´", "~"].includes(k))
    return `"${k}" é tecla morta: pressione-a com o mínimo direito e depois a vogal. Não espere ver o acento antes da vogal — o ritmo é um único movimento.`;
  if (KEY_GROUPS.Superior!.includes(k))
    return `A tecla "${k.toUpperCase()}" está na fileira superior: estenda o dedo a partir da articulação e retorne imediatamente à tecla de repouso.`;
  if (KEY_GROUPS.Inferior!.includes(k))
    return `A tecla "${k.toUpperCase()}" está na fileira inferior: não deixe a mão "viajar" com o dedo. Mantenha os demais dedos ancorados.`;
  return `A tecla "${k.toUpperCase()}": reduza a velocidade em 20% e priorize precisão — velocidade é consequência de repetições corretas.`;
}

// ---------------- sessões / progresso ----------------

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
  localStorage.setItem("lextype-sessions", JSON.stringify(all.slice(-200)));
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

export function sessionsToday(): number {
  const today = new Date().toISOString().slice(0, 10);
  return loadSessions().filter((s) => s.date.slice(0, 10) === today).length;
}

export const loadNum = (key: string, def: number) => {
  const v = Number(localStorage.getItem(key));
  return Number.isFinite(v) && localStorage.getItem(key) !== null ? v : def;
};
export const saveNum = (key: string, v: number) => localStorage.setItem(key, String(v));
