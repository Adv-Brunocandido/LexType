// Layouts de teclado: ABNT2 (Brasil) e ANSI (EUA / Internacional sem Ç).

export type KeyboardLayout = "abnt2" | "ansi";

export interface KeyDef {
  id: string; // caractere base (ou nome da tecla especial)
  shift?: string;
  label?: string;
  w?: number; // largura relativa
  trainable?: boolean;
}

const k = (id: string, shift?: string, w?: number): KeyDef => {
  const def: KeyDef = { id, trainable: true };
  if (shift !== undefined) def.shift = shift;
  if (w !== undefined) def.w = w;
  return def;
};
const sp = (id: string, label: string, w: number): KeyDef => ({ id, label, w, trainable: false });

export const ABNT2_ROWS: KeyDef[][] = [
  [
    k("'", '"'),
    k("1", "!"),
    k("2", "@"),
    k("3", "#"),
    k("4", "$"),
    k("5", "%"),
    k("6", "¨"),
    k("7", "&"),
    k("8", "*"),
    k("9", "("),
    k("0", ")"),
    k("-", "_"),
    k("=", "+"),
    sp("Backspace", "⌫", 2),
  ],
  [
    sp("Tab", "Tab", 1.5),
    k("q"),
    k("w"),
    k("e"),
    k("r"),
    k("t"),
    k("y"),
    k("u"),
    k("i"),
    k("o"),
    k("p"),
    k("´", "`"),
    k("[", "{"),
    sp("Enter", "Enter", 1.5),
  ],
  [
    sp("Caps", "Caps", 1.75),
    k("a"),
    k("s"),
    k("d"),
    k("f"),
    k("g"),
    k("h"),
    k("j"),
    k("k"),
    k("l"),
    k("ç"),
    k("~", "^"),
    k("]", "}"),
    sp("Enter2", "↵", 1.25),
  ],
  [
    sp("ShiftL", "Shift", 1.25),
    k("\\", "|"),
    k("z"),
    k("x"),
    k("c"),
    k("v"),
    k("b"),
    k("n"),
    k("m"),
    k(",", "<"),
    k(".", ">"),
    k(";", ":"),
    k("/", "?"),
    sp("ShiftR", "Shift", 1.75),
  ],
  [{ id: " ", label: "espaço", w: 7, trainable: false }],
];

export const ANSI_ROWS: KeyDef[][] = [
  [
    k("`", "~"),
    k("1", "!"),
    k("2", "@"),
    k("3", "#"),
    k("4", "$"),
    k("5", "%"),
    k("6", "^"),
    k("7", "&"),
    k("8", "*"),
    k("9", "("),
    k("0", ")"),
    k("-", "_"),
    k("=", "+"),
    sp("Backspace", "⌫", 2),
  ],
  [
    sp("Tab", "Tab", 1.5),
    k("q"),
    k("w"),
    k("e"),
    k("r"),
    k("t"),
    k("y"),
    k("u"),
    k("i"),
    k("o"),
    k("p"),
    k("[", "{"),
    k("]", "}"),
    k("\\", "|", 1.5),
  ],
  [
    sp("Caps", "Caps", 1.75),
    k("a"),
    k("s"),
    k("d"),
    k("f"),
    k("g"),
    k("h"),
    k("j"),
    k("k"),
    k("l"),
    k(";", ":"),
    k("'", '"'),
    sp("Enter", "Enter", 2.25),
  ],
  [
    sp("ShiftL", "Shift", 2.25),
    k("z"),
    k("x"),
    k("c"),
    k("v"),
    k("b"),
    k("n"),
    k("m"),
    k(",", "<"),
    k(".", ">"),
    k("/", "?"),
    sp("ShiftR", "Shift", 2.75),
  ],
  [{ id: " ", label: "espaço", w: 7, trainable: false }],
];

export function getKeyRows(layout: KeyboardLayout = "abnt2"): KeyDef[][] {
  return layout === "ansi" ? ANSI_ROWS : ABNT2_ROWS;
}

export const TRAINABLE_KEYS = ABNT2_ROWS.flat()
  .filter((d) => d.trainable)
  .map((d) => d.id);

export const TRAINABLE_KEYS_ANSI = ANSI_ROWS.flat()
  .filter((d) => d.trainable)
  .map((d) => d.id);

export function getTrainableKeys(layout: KeyboardLayout = "abnt2"): string[] {
  return layout === "ansi" ? TRAINABLE_KEYS_ANSI : TRAINABLE_KEYS;
}

export interface KeyGroups {
  Números: string[];
  Superior: string[];
  Central: string[];
  Inferior: string[];
  Acentos: string[];
  Pontuação: string[];
}

export const KEY_GROUPS: KeyGroups = {
  Números: "1234567890".split(""),
  Superior: "qwertyuiop".split(""),
  Central: "asdfghjklç".split(""),
  Inferior: "zxcvbnm".split(""),
  Acentos: ["´", "~", "ç"],
  Pontuação: [",", ".", ";", "/", "-", "=", "'", "[", "]", "\\"],
};

export const KEY_GROUPS_ANSI: KeyGroups = {
  Números: "1234567890".split(""),
  Superior: "qwertyuiop".split(""),
  Central: "asdfghjkl;".split(""),
  Inferior: "zxcvbnm".split(""),
  Acentos: [],
  Pontuação: [",", ".", ";", "/", "-", "=", "'", "[", "]", "\\", "`"],
};

export function getKeyGroups(layout: KeyboardLayout = "abnt2"): KeyGroups {
  return layout === "ansi" ? KEY_GROUPS_ANSI : KEY_GROUPS;
}

const SHIFT_TO_ID_ABNT2: Record<string, string> = {};
for (const d of ABNT2_ROWS.flat()) if (d.shift) SHIFT_TO_ID_ABNT2[d.shift] = d.id;

const SHIFT_TO_ID_ANSI: Record<string, string> = {};
for (const d of ANSI_ROWS.flat()) if (d.shift) SHIFT_TO_ID_ANSI[d.shift] = d.id;

const ACUTE = "áéíóúà";
const TILDE = "ãõâêô";
export const strip = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** Teclas físicas necessárias para produzir um caractere. */
export function charToKeys(raw: string, layout: KeyboardLayout = "abnt2"): string[] {
  const ch = raw.toLowerCase();
  if (ch === " ") return [" "];

  if (layout === "ansi") {
    if (ch === "ç") return ["c"];
    if (SHIFT_TO_ID_ANSI[raw]) return [SHIFT_TO_ID_ANSI[raw]!];
    if (TRAINABLE_KEYS_ANSI.includes(ch)) return [ch];
    // Se for acentuado no ANSI, simplifica para tecla base
    const unaccented = strip(ch);
    if (TRAINABLE_KEYS_ANSI.includes(unaccented)) return [unaccented];
    return [unaccented];
  }

  // ABNT2
  if (ACUTE.includes(ch)) return ["´", strip(ch)];
  if (TILDE.includes(ch)) return ["~", strip(ch)];
  if (TRAINABLE_KEYS.includes(ch)) return [ch];
  if (SHIFT_TO_ID_ABNT2[raw]) return [SHIFT_TO_ID_ABNT2[raw]!];
  return [strip(ch)];
}

/** Caractere digitável que exercita a tecla (teclas mortas viram vogal acentuada). */
export function keyToChar(id: string): string {
  if (id === "´") return "áéíóú"[Math.floor(Math.random() * 5)]!;
  if (id === "~") return "ãõ"[Math.floor(Math.random() * 2)]!;
  return id;
}

export type Finger = { hand: "E" | "D"; finger: string };

const F_ABNT2: Record<string, Finger> = {};
const assignAbnt2 = (keys: string, hand: "E" | "D", finger: string) => {
  for (const c of keys) F_ABNT2[c] = { hand, finger };
};
assignAbnt2("'1qaz\\", "E", "mínimo");
assignAbnt2("2wsx", "E", "anelar");
assignAbnt2("3edc", "E", "médio");
assignAbnt2("45rtfgvb", "E", "indicador");
assignAbnt2("67yuhjnm", "D", "indicador");
assignAbnt2("8ik,", "D", "médio");
assignAbnt2("9ol.", "D", "anelar");
assignAbnt2("0-=p´[ç~];/", "D", "mínimo");

const F_ANSI: Record<string, Finger> = {};
const assignAnsi = (keys: string, hand: "E" | "D", finger: string) => {
  for (const c of keys) F_ANSI[c] = { hand, finger };
};
assignAnsi("`1qaz", "E", "mínimo");
assignAnsi("2wsx", "E", "anelar");
assignAnsi("3edc", "E", "médio");
assignAnsi("45rtfgvb", "E", "indicador");
assignAnsi("67yuhjnm", "D", "indicador");
assignAnsi("8ik,", "D", "médio");
assignAnsi("9ol.", "D", "anelar");
assignAnsi("0-=p[]\\;'/ ", "D", "mínimo");

export const FINGERS = F_ABNT2;

export function getFingers(layout: KeyboardLayout = "abnt2"): Record<string, Finger> {
  return layout === "ansi" ? F_ANSI : F_ABNT2;
}
