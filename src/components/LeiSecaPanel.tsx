import { useMemo, useState } from "react";
import {
  LEI_SECA_BANK,
  LEI_SECA_EIXOS,
  checkAndSyncOfficialLegislation,
  filterLeiSeca,
  type LeiSecaEixo,
  type LeiSecaItem,
} from "@/lib/lei-seca";
import { cn } from "@/lib/utils";

interface LeiSecaPanelProps {
  onSelectForTyping: (item: LeiSecaItem) => void;
  onClose?: () => void;
  className?: string;
}

export function LeiSecaPanel({ onSelectForTyping, onClose, className }: LeiSecaPanelProps) {
  const [selectedEixo, setSelectedEixo] = useState<LeiSecaEixo>("Todos os Eixos");
  const [searchTerm, setSearchTerm] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(() => {
    if (typeof localStorage === "undefined") return null;
    const last = localStorage.getItem("lextype-leiseca-last-sync");
    return last ? `Última sincronização com portais oficiais: ${last}` : null;
  });

  const filteredItems = useMemo(() => {
    return filterLeiSeca(selectedEixo, searchTerm);
  }, [selectedEixo, searchTerm]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await checkAndSyncOfficialLegislation();
      setSyncMessage(res.message);
    } catch {
      setSyncMessage("Banco offline carregado com sucesso.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className={cn("space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg", className)}>
      {/* Cabeçalho do Painel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-2xl text-gold">
            📜
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Lei Seca Oficial
            </h2>
            <p className="text-xs text-muted-foreground">
              Artigos, incisos, parágrafos e súmulas vinculantes organizados por eixo temático para memorização e digitação por toque.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold/20 disabled:opacity-50"
            title="Conferir vigência e atualizar com os portais do Planalto e STF"
          >
            <span>{syncing ? "⏳" : "🔄"}</span>
            {syncing ? "Verificando Portais..." : "Sincronizar Legislação (Planalto/STF)"}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground text-sm"
              title="Fechar painel"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {syncMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3.5 py-2 text-xs text-success">
          <span>✅</span>
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Eixo Temático:</span>
          <select
            value={selectedEixo}
            onChange={(e) => setSelectedEixo(e.target.value as LeiSecaEixo)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
          >
            {LEI_SECA_EIXOS.map((eixo) => (
              <option key={eixo} value={eixo}>
                {eixo}
              </option>
            ))}
          </select>
        </div>

        <div className="relative min-w-56 sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por artigo, termo ou diploma..."
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

      {/* Contagem de Dispositivos */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Exibindo <strong>{filteredItems.length}</strong> dispositivo(s) normativo(s)
        </span>
        <span className="italic">Clique em "⌨️ Digitar Este Artigo" para praticar no motor de digitação</span>
      </div>

      {/* Grid de Dispositivos de Lei Seca */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background/50 p-4 transition-all hover:border-gold/60 hover:shadow-md"
          >
            <div>
              {/* Cabeçalho do Card */}
              <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-2.5">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-gold uppercase tracking-wider">
                      {item.dispositivo}
                    </span>
                    <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {item.diploma}
                    </span>
                  </div>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    Eixo: {item.eixo} • Fonte: {item.fonteOficial}
                  </span>
                </div>

                <button
                  onClick={() => onSelectForTyping(item)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold shadow-sm transition hover:scale-105 hover:bg-gold hover:text-gold-foreground"
                  title="Carregar o texto exato deste artigo na área de digitação"
                >
                  <span>⌨️</span> Digitar Artigo
                </button>
              </div>

              {/* Texto Oficial da Lei Seca */}
              <div className="mt-3">
                <p className="font-mono-type text-xs sm:text-sm leading-relaxed text-foreground select-text bg-card/60 rounded-lg p-3 border border-border/40">
                  {item.texto}
                </p>
              </div>

              {/* Explicação Prática & Contexto em Provas */}
              <div className="mt-3 text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">⚖️ Incidência & Prática: </strong>
                {item.explicacao}
              </div>

              {/* Semântica dos Termos Complexos */}
              {item.palavrasComplexas && item.palavrasComplexas.length > 0 && (
                <div className="mt-3 space-y-1.5 border-t border-border/30 pt-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                    📖 Semântica dos Termos Complexos:
                  </span>
                  {item.palavrasComplexas.map((tc) => (
                    <div key={tc.termo} className="rounded bg-gold/5 px-2 py-1 text-[11px] text-foreground">
                      <strong className="text-gold capitalize">{tc.termo}: </strong>
                      <span className="text-muted-foreground">{tc.semantica}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
