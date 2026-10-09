import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardWidth = "100%" | "85%" | "70%" | "50%";
export type CardAlign = "center" | "left" | "right";

interface MovableCardProps {
  id: string;
  title: string;
  children: ReactNode;
  icon?: string;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  extraHeaderControls?: ReactNode;
  className?: string;
  defaultWidth?: CardWidth;
}

export function MovableCard({
  id,
  title,
  children,
  icon,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
  extraHeaderControls,
  className,
  defaultWidth = "100%",
}: MovableCardProps) {
  const [width, setWidth] = useState<CardWidth>(() => {
    if (typeof localStorage === "undefined") return defaultWidth;
    return (localStorage.getItem(`lextype-card-width-${id}`) as CardWidth) || defaultWidth;
  });

  const [align, setAlign] = useState<CardAlign>(() => {
    if (typeof localStorage === "undefined") return "center";
    return (localStorage.getItem(`lextype-card-align-${id}`) as CardAlign) || "center";
  });

  const [isMinimized, setIsMinimized] = useState(false);

  const handleWidthCycle = (direction: "left" | "right") => {
    if (direction === "left") {
      if (width === "100%") {
        setWidth("85%");
        setAlign("left");
        localStorage.setItem(`lextype-card-width-${id}`, "85%");
        localStorage.setItem(`lextype-card-align-${id}`, "left");
      } else if (align === "right") {
        setAlign("center");
        localStorage.setItem(`lextype-card-align-${id}`, "center");
      } else if (align === "center") {
        setAlign("left");
        localStorage.setItem(`lextype-card-align-${id}`, "left");
      } else {
        const widths: CardWidth[] = ["85%", "70%", "50%"];
        const curr = widths.indexOf(width);
        const next = widths[(curr + 1) % widths.length]!;
        setWidth(next);
        localStorage.setItem(`lextype-card-width-${id}`, next);
      }
    } else {
      if (width === "100%") {
        setWidth("85%");
        setAlign("right");
        localStorage.setItem(`lextype-card-width-${id}`, "85%");
        localStorage.setItem(`lextype-card-align-${id}`, "right");
      } else if (align === "left") {
        setAlign("center");
        localStorage.setItem(`lextype-card-align-${id}`, "center");
      } else if (align === "center") {
        setAlign("right");
        localStorage.setItem(`lextype-card-align-${id}`, "right");
      } else {
        const widths: CardWidth[] = ["85%", "70%", "50%"];
        const curr = widths.indexOf(width);
        const next = widths[(curr + 1) % widths.length]!;
        setWidth(next);
        localStorage.setItem(`lextype-card-width-${id}`, next);
      }
    }
  };

  const handleToggleFullWidth = () => {
    const nextWidth: CardWidth = width === "100%" ? "70%" : "100%";
    setWidth(nextWidth);
    setAlign("center");
    localStorage.setItem(`lextype-card-width-${id}`, nextWidth);
    localStorage.setItem(`lextype-card-align-${id}`, "center");
  };

  return (
    <div
      style={{
        width: width,
        marginLeft: align === "right" ? "auto" : align === "center" ? "auto" : "0",
        marginRight: align === "left" ? "auto" : align === "center" ? "auto" : "0",
      }}
      className={cn(
        "transition-all duration-300 resize overflow-auto",
        className,
      )}
    >
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
        {/* Barra Superior de Reposicionamento e Alargamento */}
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-gold text-xs select-none"
              title="Alça de reposicionamento (arraste para ordenar ou use as setas)"
            >
              ⋮⋮
            </span>
            {icon && <span className="text-sm">{icon}</span>}
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </span>
            {width !== "100%" && (
              <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[10px] font-bold text-gold">
                {width} ({align})
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {extraHeaderControls}

            {/* Controles de Alinhamento e Largura (Esquerda / Centro / Direita) */}
            <div className="flex items-center gap-0.5 rounded-lg border border-border bg-background p-0.5 text-[11px] shadow-sm">
              <button
                onClick={() => handleWidthCycle("left")}
                className={cn(
                  "px-2.5 py-1 rounded font-medium transition hover:bg-secondary",
                  align === "left" && width !== "100%" ? "bg-gold/15 text-gold font-bold" : "text-muted-foreground hover:text-foreground"
                )}
                title="Mover caixa para a esquerda"
              >
                ◀ Esquerda
              </button>
              <button
                onClick={handleToggleFullWidth}
                className={cn(
                  "px-2 py-1 rounded font-semibold transition hover:bg-secondary",
                  width === "100%" ? "text-gold font-bold" : "text-muted-foreground hover:text-foreground"
                )}
                title="Alternar largura total (100% ou centralizada)"
              >
                {width === "100%" ? "↔ 100%" : "↔ 70%"}
              </button>
              <button
                onClick={() => handleWidthCycle("right")}
                className={cn(
                  "px-2.5 py-1 rounded font-medium transition hover:bg-secondary",
                  align === "right" && width !== "100%" ? "bg-gold/15 text-gold font-bold" : "text-muted-foreground hover:text-foreground"
                )}
                title="Mover caixa para a direita"
              >
                Direita ▶
              </button>
            </div>

            {/* Controles de Subir / Descer */}
            <div className="flex items-center gap-0.5 rounded-lg border border-border bg-background p-0.5 text-[11px] shadow-sm">
              <button
                onClick={onMoveUp}
                disabled={!canMoveUp}
                className="px-2 py-1 rounded hover:bg-secondary disabled:opacity-30 font-bold transition text-muted-foreground hover:text-foreground"
                title="Mover caixa para cima"
              >
                ▲
              </button>
              <button
                onClick={onMoveDown}
                disabled={!canMoveDown}
                className="px-2 py-1 rounded hover:bg-secondary disabled:opacity-30 font-bold transition text-muted-foreground hover:text-foreground"
                title="Mover caixa para baixo"
              >
                ▼
              </button>
            </div>

            {/* Minimizar / Expandir */}
            <button
              onClick={() => setIsMinimized((m) => !m)}
              className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition shadow-sm font-bold"
              title={isMinimized ? "Expandir caixa" : "Recolher caixa"}
            >
              {isMinimized ? "＋" : "−"}
            </button>
          </div>
        </div>

        {/* Conteúdo da Caixa */}
        {!isMinimized && children}
      </div>
    </div>
  );
}
