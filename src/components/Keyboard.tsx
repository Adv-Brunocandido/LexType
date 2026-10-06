import { FINGER_INFO } from "@/lib/legal-words";
import { KEY_ROWS, masteryOf, type KeyStats } from "@/lib/typing";
import { cn } from "@/lib/utils";

interface Props {
  nextChar: string | null;
  stats: KeyStats;
  selectedKeys: string[];
}

const ROWS: string[][] = [
  KEY_ROWS.superior.split(""),
  KEY_ROWS.central.split(""),
  KEY_ROWS.inferior.split(""),
];

function heatClass(key: string, stats: KeyStats): string {
  const s = stats[key];
  if (!s || s.attempts < 3) return "";
  const m = masteryOf(s);
  if (m >= 95) return "bg-success/25 border-success/50";
  if (m >= 88) return "bg-gold/20 border-gold/40";
  return "bg-destructive/25 border-destructive/50";
}

export function Keyboard({ nextChar, stats, selectedKeys }: Props) {
  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5" style={{ paddingLeft: i * 14 }}>
          {row.map((key) => {
            const isNext = nextChar === key;
            const isSelected = selectedKeys.includes(key);
            const info = FINGER_INFO[key];
            return (
              <div
                key={key}
                title={info ? `Mão ${info.hand === "E" ? "esquerda" : "direita"} — dedo ${info.finger}` : undefined}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-md border font-mono-type text-sm font-semibold uppercase transition-all duration-150 keycap-shadow",
                  "bg-keycap text-keycap-foreground",
                  isSelected && "border-gold/60 text-gold",
                  heatClass(key, stats),
                  isNext && "scale-110 border-gold bg-gold text-gold-foreground shadow-[0_0_18px] shadow-gold/40",
                )}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
