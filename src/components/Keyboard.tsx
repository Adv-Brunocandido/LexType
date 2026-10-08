import { getKeyRows, getFingers, type KeyboardLayout, type KeyDef } from "@/lib/abnt2";
import { masteryLabel, masteryOf, type KeyStats } from "@/lib/typing";
import { cn } from "@/lib/utils";

export type KeyboardScale = "compact" | "normal" | "large";

interface Props {
  stats: KeyStats;
  selectedKeys: string[];
  nextKeys?: string[];
  flash?: { key: string; type: "ok" | "err" } | null;
  onToggle?: (key: string) => void;
  compact?: boolean;
  scale?: KeyboardScale;
  layout?: KeyboardLayout;
  mode?: "heatmap" | "rainbow";
}


function fingerClass(key: string, layout: KeyboardLayout, isNext: boolean): string {
  const info = getFingers(layout)[key];
  if (!info) return "bg-keycap text-keycap-foreground border-border";
  
  const h = info.hand;
  const f = info.finger.toLowerCase();
  
  const opBg = isNext ? "90" : "30";
  const opBorder = isNext ? "80" : "30";
  const textClr = isNext ? "text-[#2D2638]" : "text-[#3A3238]";
  
  let baseColor = "";
  let borderColor = "";
  
  if (h === "E" && f.includes("nimo")) { baseColor = "bg-[#F4D4D4]"; borderColor = "border-[#D98A8A]"; }
  else if (h === "E" && f.includes("anelar")) { baseColor = "bg-[#F5C6B8]"; borderColor = "border-[#E5A698]"; }
  else if (h === "E" && f.includes("dio")) { baseColor = "bg-[#F6E8B6]"; borderColor = "border-[#DCD6CD]"; }
  else if (h === "E" && f.includes("indicador")) { baseColor = "bg-[#CBE4D6]"; borderColor = "border-[#AACFBC]"; }
  else if (h === "D" && f.includes("indicador")) { baseColor = "bg-[#B6D8F6]"; borderColor = "border-[#98BCE5]"; }
  else if (h === "D" && f.includes("dio")) { baseColor = "bg-[#F6E8B6]"; borderColor = "border-[#DCD6CD]"; }
  else if (h === "D" && f.includes("anelar")) { baseColor = "bg-[#F5C6B8]"; borderColor = "border-[#E5A698]"; }
  else if (h === "D" && f.includes("nimo")) { baseColor = "bg-[#F4D4D4]"; borderColor = "border-[#D98A8A]"; }
  else return "bg-keycap text-keycap-foreground border-border";
  
  return `${baseColor}/${opBg} ${borderColor}/${opBorder} ${textClr}`;
}

function heatClass(key: string, stats: KeyStats): string {
  const s = stats[key];
  if (!s || s.attempts < 3) return "";
  const m = masteryOf(s);
  if (m >= 95) return "bg-success/20 border-success/50";
  if (m >= 88) return "bg-gold/15 border-gold/40";
  return "bg-destructive/20 border-destructive/50";
}

export function Keyboard({
  stats,
  selectedKeys,
  nextKeys = [],
  flash,
  onToggle,
  compact,
  scale = "normal",
  layout = "abnt2",
  mode = "heatmap",
}: Props) {
  const scaleClass =
    scale === "compact" || compact
      ? "[--u:1.4rem] sm:[--u:2.0rem] md:[--u:2.2rem]"
      : scale === "large"
        ? "[--u:1.9rem] sm:[--u:2.8rem] md:[--u:3.2rem]"
        : "[--u:1.6rem] sm:[--u:2.4rem] md:[--u:2.7rem]";

  const rows = getKeyRows(layout);
  const fingers = getFingers(layout);

  return (
    <div className="overflow-x-auto pb-1">
      <div className={cn("mx-auto flex w-max flex-col gap-1 select-none", scaleClass)}>
        {rows.map((row: KeyDef[], i: number) => (
          <div key={i} className={cn("flex gap-1", i === 4 && "justify-center")}>
            {row.map((d: KeyDef) => {
              const isNext = nextKeys.includes(d.id);
              const isSel = selectedKeys.includes(d.id);
              const info = fingers[d.id];
              const st = stats[d.id];
              const isFlash = flash?.key === d.id;
              const title = d.trainable
                ? [
                    info && `Mão ${info.hand === "E" ? "esquerda" : "direita"} - ${info.finger}`,
                    st?.attempts
                      ? `${masteryLabel(masteryOf(st))} (${masteryOf(st)}%)`
                      : "Ainda não treinada",
                  ]
                    .filter(Boolean)
                    .join(" • ")
                : undefined;
              const Tag = onToggle && d.trainable ? "button" : "div";
              return (
                <Tag
                  key={d.id}
                  type={Tag === "button" ? "button" : undefined}
                  title={title}
                  onClick={onToggle && d.trainable ? () => onToggle(d.id) : undefined}
                  style={{
                    width: `calc(var(--u) * ${d.w ?? 1} + ${((d.w ?? 1) - 1) * 0.25}rem)`,
                    height: "var(--u)",
                  }}
                  className={cn(
                    "relative flex items-center justify-center rounded-md border border-border font-mono-type font-semibold transition-all duration-100 keycap-shadow",
                    "bg-keycap text-keycap-foreground",
                    d.trainable
                      ? "text-[0.6rem] sm:text-sm"
                      : "text-[0.5rem] text-muted-foreground sm:text-[0.65rem]",
                    onToggle && d.trainable && "cursor-pointer hover:border-gold/60",
                    !onToggle && mode === "heatmap" && heatClass(d.id, stats),
                    !onToggle && mode === "rainbow" && d.trainable && fingerClass(d.id, layout, isNext),
                    !onToggle && mode === "rainbow" && !d.trainable && "bg-keycap text-keycap-foreground",
                    isSel && "border-gold bg-gold/15 text-gold",
                    isNext && mode !== "rainbow" &&
                      "z-10 scale-110 border-gold bg-gold text-gold-foreground shadow-[0_0_18px] shadow-gold/40",
                    isNext && mode === "rainbow" &&
                      "z-10 scale-110 shadow-[0_0_18px] shadow-primary/40",
                    isFlash &&
                      flash?.type === "err" &&
                      "animate-shake border-destructive bg-destructive text-destructive-foreground",,
                  )}
                >
                  {d.shift && (
                    <span className="absolute left-1 top-0 hidden text-[0.55rem] opacity-60 sm:block">
                      {d.shift}
                    </span>
                  )}
                  <span className={cn(d.trainable && "uppercase")}>{d.label ?? d.id}</span>
                </Tag>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
