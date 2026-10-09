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
    const sequence: CardWidth[] = ["50%", "70%", "85%", "100%"];
    const currentIdx = sequence.indexOf(width);
    let nextIdx = currentIdx;

    if (direction === "left") {
      // Alargar pela esquerda: expande largura e alinha à esquerda ou centro
      nextIdx = Math.min(sequence.length - 1, currentIdx + 1);
      setAlign("left");
      localStorage.setItem(`lextype-card-align-${id}`, "left");
    } else {
      // Alargar pela direita: expande largura e alinha à direita ou centro
      nextIdx = Math.min(sequence.length - 1, currentIdx + 1);
      setAlign("right");
      localStorage.setItem(`lextype-card-align-${id}`, "right");
    }

    const nextWidth = sequence[nextIdx]!;
    setWidth(nextWidth);
    localStorage.setItem(`lextype-card-width-${id}`, nextWidth);
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
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2.5 border-b border-border/50 pb-2.5">
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
              <span className="rounded bg-gold/15 px-1.5 py-0.2 text-[10px] font-bold text-gold">
                {width}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {extraHeaderControls}

            {/* Controles de Alargamento (Esquerda / Direita) */}
            <div className="flex items-center rounded-md border border-border bg-background text-[11px]">
              <button
                onClick={() => handleWidthCycle("left")}
                className="px-2 py-0.5 hover:bg-secondary border-r border-border font-semibold text-muted-foreground hover:text-foreground"
                title="Alargar caixa pela esquerda"
              >
                ◀ Esquerda
              </button>
              <button
                onClick={handleToggleFullWidth}
                className="px-2 py-0.5 hover:bg-secondary border-r border-border font-semibold text-gold"
                title="Alternar largura total (100%)"
              >
                {width === "100%" ? "↔ 70%" : "↔ 100%"}
              </button>
              <button
                onClick={() => handleWidthCycle("right")}
                className="px-2 py-0.5 hover:bg-secondary font-semibold text-muted-foreground hover:text-foreground"
                title="Alargar caixa pela direita"
              >
                Direita ▶
              </button>
            </div>

            {/* Controles de Mover e Reposicionar (Subir / Descer) */}
            <div className="flex items-center rounded-md border border-border bg-background text-[11px]">
              <button
                onClick={onMoveUp}
                disabled={!canMoveUp}
                className="px-2 py-0.5 hover:bg-secondary border-r border-border disabled:opacity-30 font-bold"
                title="Mover caixa para cima"
              >
                ▲
              </button>
              <button
                onClick={onMoveDown}
                disabled={!canMoveDown}
                className="px-2 py-0.5 hover:bg-secondary disabled:opacity-30 font-bold"
                title="Mover caixa para baixo"
              >
                ▼
              </button>
            </div>

            {/* Minimizar / Expandir */}
            <button
              onClick={() => setIsMinimized((m) => !m)}
              className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground"
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
