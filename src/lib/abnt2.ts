// Layout ABNT2 brasileiro completo.

export interface KeyDef {
  id: string; // caractere base (ou nome da tecla especial)
  shift?: string;
  label?: string;
  w?: number; // largura relativa
  trainable?: boolean;
}

const k = (id: string, shift?: string): KeyDef => ({ id, shift, trainable: true });
const sp = (id: string, label: string, w: number): KeyDef => ({ id, label, w, trainable: false });

export const ABNT2_ROWS: KeyDef[][] = [
  [
    k("'", '"'), k("1", "!"), k("2", "@"), k("3", "#"), k("4", "$"), k("5", "%"), k("6", "¨"),
    k("7", "&"), k("8", "*"), k("9", "("), k("0", ")"), k("-", "_"), k("=", "+"),
    sp("Backspace", "⌫", 2),
  ],
  [
    sp("Tab", "Tab", 1.5), k("q"), k("w"), k("e"), k("r"), k("t"), k("y"), k("u"), k("i"), k("o"),
    k("p"), k("´", "`"), k("[", "{"), sp("Enter", "Enter", 1.5),
  ],
  [
    sp("Caps", "Caps", 1.75), k("a"), k("s"), k("d"), k("f"), k("g"), k("h"), k("j"), k("k"), k("l"),
    k("ç"), k("~", "^"), k("]", "}"), sp("Enter2", "↵", 1.25),
  ],
  [
    sp("ShiftL", "Shift", 1.25), k("\\", "|"), k("z"), k("x"), k("c"), k("v"), k("b"), k("n"), k("m"),
    k(",", "<"), k(".", ">"), k(";", ":"), k("/", "?"), sp("ShiftR", "Shift", 1.75),
  ],
  [{ id: " ", label: "espaço", w: 7, trainable: false }],
];

export const TRAINABLE_KEYS = ABNT2_ROWS.flat().filter((d) => d.trainable).map((d) => d.id);

export const KEY_GROUPS: Record<string, string[]> = {
  Números: "1234567890".split(""),
  Superior: "qwertyuiop".split(""),
  Central: "asdfghjklç".split(""),
  Inferior: "zxcvbnm".split(""),
  Acentos: ["´", "~", "ç"],
  Pontuação: [",", ".", ";", "/", "-", "=", "'", "[", "]", "\\"],
};

const SHIFT_TO_ID: Record<string, string> = {};
for (const d of ABNT2_ROWS.flat()) if (d.shift) SHIFT_TO_ID[d.shift] = d.id;

const ACUTE = "áéíóúà";
const TILDE = "ãõâêô";
export const strip = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** Teclas físicas necessárias para produzir um caractere. */
export function charToKeys(raw: string): string[] {
  const ch = raw.toLowerCase();
  if (ch === " ") return [" "];
  if (ACUTE.includes(ch)) return ["´", strip(ch)];
  if (TILDE.includes(ch)) return ["~", strip(ch)];
  if (TRAINABLE_KEYS.includes(ch)) return [ch];
  if (SHIFT_TO_ID[raw]) return [SHIFT_TO_ID[raw]];
  return [strip(ch)];
}

/** Caractere digitável que exercita a tecla (teclas mortas viram vogal acentuada). */
export function keyToChar(id: string): string {
  if (id === "´") return "áéíóú"[Math.floor(Math.random() * 5)]!;
  if (id === "~") return "ãõ"[Math.floor(Math.random() * 2)]!;
  return id;
}

type Finger = { hand: "E" | "D"; finger: string };
const F: Record<string, Finger> = {};
const assign = (keys: string, hand: "E" | "D", finger: string) => {
  for (const c of keys) F[c] = { hand, finger };
};
assign("'1qaz\\", "E", "mínimo");
assign("2wsx", "E", "anelar");
assign("3edc", "E", "médio");
assign("45rtfgvb", "E", "indicador");
assign("67yuhjnm", "D", "indicador");
assign("8ik,", "D", "médio");
assign("9ol.", "D", "anelar");
assign("0-=p´[ç~];/", "D", "mínimo");
export const FINGERS = F;
