import { useMemo, useState } from "react";
import {
  DICIONARIO_CATEGORIAS,
  DICIONARIO_JURIDICO,
  searchDicionario,
  type DicionarioEntry,
} from "@/lib/dicionario-juridico";
import { cn } from "@/lib/utils";

interface DicionarioPanelProps {
  onSelectForTyping?: (text: string, title: string) => void;
  onClose?: () => void;
  className?: string;
}

export function DicionarioPanel({
  onSelectForTyping,
  onClose,
  className,
}: DicionarioPanelProps) {
  const [selectedCategoria, setSelectedCategoria] = useState<string>("Todas as Categorias");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const entries = useMemo(() => {
    return searchDicionario(searchTerm, selectedCategoria);
  }, [searchTerm, selectedCategoria]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg", className)}>
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-2xl text-gold">
            📖
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Dicionário Jurídico & Semântica Avançada
            </h2>
            <p className="text-xs text-muted-foreground">
              Mais de 100 verbetes essenciais, brocardos latinos e teses com conceito, virada de chave e exemplo prático.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground text-sm"
            title="Voltar ao Treino"
          >
            ✕
          </button>
        )}
      </div>

      {/* Controles de Busca e Filtro */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Eixo / Categoria:</span>
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
          >
            {DICIONARIO_CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="relative min-w-56 sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por termo, instituto ou conceito..."
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Métricas do Dicionário */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Exibindo <strong className="text-foreground">{entries.length}</strong> de{" "}
          <strong className="text-foreground">{DICIONARIO_JURIDICO.length}</strong> verbetes doutrinários
        </span>
        {searchTerm && (
          <span className="rounded bg-gold/10 px-2 py-0.5 text-gold font-medium">
            Filtro ativo: "{searchTerm}"
          </span>
        )}
      </div>

      {/* Lista de Verbetes */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {entries.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <div
              key={entry.id}
              className={cn(
                "rounded-xl border transition-all duration-150",
                isExpanded
                  ? "border-gold/50 bg-gold/5 shadow-md"
                  : "border-border/80 bg-background/50 hover:border-gold/30 hover:bg-background",
              )}
            >
              <div
                onClick={() => toggleExpand(entry.id)}
                className="flex cursor-pointer items-center justify-between gap-3 p-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      {entry.termo}
                    </span>
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                      {entry.categoria}
                    </span>
                    {entry.etimologiaOuOrigem && (
                      <span className="text-[0.65rem] text-muted-foreground italic hidden sm:inline">
                        ({entry.etimologiaOuOrigem})
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {entry.significado}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {onSelectForTyping && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectForTyping(
                          `${entry.termo.toLowerCase()} - ${entry.viradaChave.toLowerCase()}`,
                          entry.termo,
                        );
                      }}
                      className="rounded-lg border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold transition hover:bg-gold/20"
                      title="Treinar digitação deste verbete"
                    >
                      ⌨️ Treinar
                    </button>
                  )}
                  <span className="text-muted-foreground text-sm">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {/* Detalhe Expandido com Formato Tripartite */}
              {isExpanded && (
                <div className="border-t border-border/60 p-4 space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-gold uppercase tracking-wide text-[0.7rem]">
                      📚 Conceito & Significado Técnico
                    </h4>
                    <p className="text-foreground leading-relaxed mt-1">
                      {entry.significado}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-emerald-500 uppercase tracking-wide text-[0.7rem]">
                      🔑 Virada de Chave (Critério Decisivo)
                    </h4>
                    <p className="text-foreground/90 leading-relaxed mt-1 bg-emerald-500/10 rounded-lg p-2.5 border border-emerald-500/20">
                      {entry.viradaChave}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sky-500 uppercase tracking-wide text-[0.7rem]">
                      ⚖️ Exemplo Prático Concreto
                    </h4>
                    <p className="text-foreground/90 leading-relaxed mt-1 bg-sky-500/10 rounded-lg p-2.5 border border-sky-500/20">
                      {entry.exemplo}
                    </p>
                  </div>

                  {entry.palavrasChave.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <span className="text-[0.65rem] text-muted-foreground">Termos correlatos:</span>
                      {entry.palavrasChave.map((pk) => (
                        <span
                          key={pk}
                          className="rounded bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground"
                        >
                          #{pk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
