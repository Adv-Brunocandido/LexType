// Motor de digitação puro (sem React): estado da sessão, modo estrito e modo fluido.
import { charToKeys, strip, type KeyboardLayout } from "./abnt2";

export interface Engine {
  text: string;
  pos: number;
  errors: number;
  errorMap: Record<string, number>;
  hitMap: Record<string, number>;
  timeMap: Record<string, number>;
  timedMap: Record<string, number>;
  combo: number;
  maxCombo: number;
  startedAt: number | null;
  lastAt: number | null;
  errStreak: number;
  /** Posição exibida em vermelho no modo estrito (cursor travado). */
  wrongAt: number | null;
  /** Modo fluido: índices digitados incorretamente que aguardam correção via Backspace. */
  marks: boolean[];
}

export const newEngine = (text: string): Engine => ({
  text,
  pos: 0,
  errors: 0,
  errorMap: {},
  hitMap: {},
  timeMap: {},
  timedMap: {},
  combo: 0,
  maxCombo: 0,
  startedAt: null,
  lastAt: null,
  errStreak: 0,
  wrongAt: null,
  marks: [],
});

export interface TypeOptions {
  stopOnError: boolean;
  caseSensitive?: boolean;
  layout?: KeyboardLayout;
  now?: number;
}

export type TypeOutcome =
  | { kind: "ignored"; started: false }
  | { kind: "correct"; started: boolean; keys: string[]; finished: boolean }
  | { kind: "wrong"; started: boolean; keys: string[]; expected: string };

const MAX_HESITATION_MS = 3000;

export const pendingErrors = (e: Engine): number => e.marks.filter(Boolean).length;

export const isComplete = (e: Engine): boolean =>
  e.text.length > 0 && e.pos >= e.text.length && pendingErrors(e) === 0;

export function normalizeCompare(c: string): string {
  if (c === "\u00A0" || c === "\u200B") return " ";
  if (c === "“" || c === "”") return '"';
  if (c === "‘" || c === "’") return "'";
  if (c === "–" || c === "—") return "-";
  return c;
}

export function matches(typed: string, expected: string, caseSensitive = false): boolean {
  const tNorm = normalizeCompare(typed);
  const eNorm = normalizeCompare(expected);
  if (tNorm === eNorm) return true;
  return caseSensitive
    ? strip(tNorm) === strip(eNorm)
    : strip(tNorm).toLowerCase() === strip(eNorm).toLowerCase();
}

export function typeChar(e: Engine, ch: string, o: TypeOptions): TypeOutcome {
  if (!e.text || e.pos >= e.text.length) return { kind: "ignored", started: false };
  const expected = e.text[e.pos]!;
  const now = o.now ?? Date.now();
  const started = e.startedAt === null;
  if (started) {
    e.startedAt = now;
    e.lastAt = now;
  }
  const layout = o.layout ?? "abnt2";
  const keys = charToKeys(expected, layout);

  if (matches(ch, expected, o.caseSensitive ?? false)) {
    const dt = now - (e.lastAt ?? now);
    for (const k of keys) {
      e.hitMap[k] = (e.hitMap[k] ?? 0) + 1;
      if (dt > 0 && dt < MAX_HESITATION_MS) {
        e.timeMap[k] = (e.timeMap[k] ?? 0) + dt;
        e.timedMap[k] = (e.timedMap[k] ?? 0) + 1;
      }
    }
    e.lastAt = now;
    e.marks[e.pos] = false;
    e.pos++;
    e.combo++;
    e.maxCombo = Math.max(e.maxCombo, e.combo);
    e.errStreak = 0;
    e.wrongAt = null;
    return { kind: "correct", started, keys, finished: isComplete(e) };
  }

  e.errors++;
  for (const k of keys) e.errorMap[k] = (e.errorMap[k] ?? 0) + 1;
  e.combo = 0;
  e.errStreak++;
  if (o.stopOnError) {
    e.wrongAt = e.pos;
  } else {
    e.marks[e.pos] = true;
    e.pos++;
    e.lastAt = now;
    e.wrongAt = null;
  }
  return { kind: "wrong", started, keys, expected };
}

/** Volta um caractere. Só tem efeito no modo fluido. */
export function backspace(e: Engine, stopOnError: boolean): boolean {
  if (stopOnError || e.pos === 0) return false;
  e.pos--;
  e.marks[e.pos] = false;
  e.wrongAt = e.marks.lastIndexOf(true) >= 0 ? e.marks.lastIndexOf(true) : null;
  return true;
}

/** Modo rigor: recomeça a linha do zero, preservando a contagem de erros. */
export function restartLine(e: Engine): void {
  e.pos = 0;
  e.startedAt = null;
  e.lastAt = null;
  e.combo = 0;
  e.marks = [];
  e.wrongAt = null;
}
