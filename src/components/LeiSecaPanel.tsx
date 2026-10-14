import { useState, useMemo, useEffect } from "react";
import {
  LEI_SECA_EIXOS,
  type LeiSecaEixo,
  type LeiSecaItem,
} from "@/lib/lei-seca-types";
import { getLeiSecaModule } from "@/lib/lazy-modules";
import { cn } from "@/lib/utils";

interface LeiSecaPanelProps {
  onSelectForTyping: (item: LeiSecaItem) => void;
  onClose?: () => void;
  className?: string;
}

export function LeiSecaPanel({ onSelectForTyping, onClose, className }: LeiSecaPanelProps) {
  const [mod, setMod] = useState<typeof import("@/lib/lei-seca") | null>(null);
  const [selectedEixo, setSelectedEixo] = useState<LeiSecaEixo>("Todos os Eixos");
  const [selectedDiploma, setSelectedDiploma] = useState<string>("Todos os Diplomas");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(40);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(() => {
    if (typeof localStorage === "undefined") return null;
    const last = localStorage.getItem("lextype-leiseca-last-sync");
    return last ? `Última sincronização com portais oficiais: ${last}` : null;
  });

  useEffect(() => {
    void getLeiSecaModule().then(setMod);
  }, []);

  // Reseta paginação quando o usuário altera filtros de busca
  useEffect(() => {
    setVisibleCount(40);
  }, [selectedEixo, selectedDiploma, searchTerm]);

  const availableDiplomas = useMemo(
    () => (mod ? mod.getDiplomasList() : ["Todos os Diplomas"]),
    [mod],
  );

  const filteredItems = useMemo(() => {
    if (!mod) return [];
    return mod.filterLeiSeca(selectedEixo, searchTerm, selectedDiploma);
  }, [mod, selectedEixo, searchTerm, selectedDiploma]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleSync = async () => {
    if (!mod) return;
    setSyncing(true);
    try {
      const res = await mod.checkAndSyncOfficialLegislation();
      setSyncMessage(res.message);
    } catch {
      setSyncMessage("Banco offline carregado com sucesso.");
    } finally {
      setSyncing(false);
    }
  };

  if (!mod) {
    return (
      <div
        className={cn(
          "space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg animate-pulse",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gold/20" />
          <div className="space-y-2">
            <div className="h-5 w-48 bg-gold/20 rounded" />
            <div className="h-3 w-80 bg-gold/10 rounded" />
          </div>
        </div>
        <div className="h-10 w-full bg-secondary/30 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-44 rounded-xl bg-secondary/20 border border-border/40" />
          <div className="h-44 rounded-xl bg-secondary/20 border border-border/40" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg",
        className,
      )}
    >
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
              Artigos, incisos, parágrafos e súmulas vinculantes organizados por eixo temático para
              memorização e digitação por toque.
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
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground">📜 Diploma:</span>
            <select
              value={selectedDiploma}
              onChange={(e) => setSelectedDiploma(e.target.value)}
              className="max-w-[200px] truncate rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:border-gold focus:outline-none"
            >
              {availableDiplomas.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground">⚖️ Eixo:</span>
            <select
              value={selectedEixo}
              onChange={(e) => setSelectedEixo(e.target.value as LeiSecaEixo)}
              className="max-w-[180px] truncate rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:border-gold focus:outline-none"
            >
              {LEI_SECA_EIXOS.map((eixo) => (
                <option key={eixo} value={eixo}>
                  {eixo}
                </option>
              ))}
            </select>
          </div>
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
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          Exibindo <strong>{visibleItems.length}</strong> de{" "}
          <strong>{filteredItems.length}</strong> dispositivo(s) normativo(s)
          {selectedDiploma !== "Todos os Diplomas" && ` em ${selectedDiploma}`}
        </span>
        <span className="italic">
          Clique em "⌨️ Digitar Artigo" para praticar no motor de digitação
        </span>
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center space-y-3 bg-secondary/20">
          <p className="text-sm font-semibold text-foreground">
            Nenhum dispositivo encontrado para "{searchTerm}" com os filtros atuais.
          </p>
          {(selectedDiploma !== "Todos os Diplomas" || selectedEixo !== "Todos os Eixos") && (
            <button
              onClick={() => {
                setSelectedDiploma("Todos os Diplomas");
                setSelectedEixo("Todos os Eixos");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold hover:bg-gold/20 transition shadow-sm"
            >
              🔍 Buscar "{searchTerm}" em Todos os Diplomas e Eixos
            </button>
          )}
        </div>
      )}

      {/* Grid de Dispositivos de Lei Seca */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visibleItems.map((item) => (
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
                    <span className="text-xs font-semibold text-foreground">{item.diploma}</span>
                  </div>
                  <span className="mt-1 inline-block text-[11px] text-muted-foreground">
                    ⚖️ {item.eixo}
                  </span>
                </div>
                <button
                  onClick={() => onSelectForTyping(item)}
                  className="rounded-lg bg-gold px-3 py-1.5 text-xs font-bold text-gold-foreground transition hover:opacity-90 active:scale-95 shadow-sm"
                  title="Carregar este dispositivo legal na área de digitação"
                >
                  ⌨️ Digitar Artigo
                </button>
              </div>

              {/* Texto do Dispositivo */}
              <p className="mt-3 text-xs leading-relaxed text-foreground sm:text-sm font-serif italic">
                "{item.texto}"
              </p>

              {/* Explicação Didática / Tese Vinculante */}
              <div className="mt-3 rounded-lg bg-secondary/40 p-2.5 text-xs text-muted-foreground">
                <strong className="text-foreground">💡 Razão Decisória / Síntese: </strong>
                {item.explicacao}
              </div>

              {/* Semântica dos Termos Complexos */}
              {item.palavrasComplexas && item.palavrasComplexas.length > 0 && (
                <div className="mt-3 space-y-1.5 border-t border-border/30 pt-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                    📖 Semântica dos Termos Complexos:
                  </span>
                  {item.palavrasComplexas.map((tc: { termo: string; semantica: string }) => (
                    <div
                      key={tc.termo}
                      className="rounded bg-gold/5 px-2 py-1 text-[11px] text-foreground"
                    >
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

      {/* Botão Carregar Mais */}
      {visibleItems.length < filteredItems.length && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setVisibleCount((prev) => prev + 40)}
            className="rounded-lg border border-border bg-secondary/50 px-6 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition"
          >
            Carregar mais dispositivos (+40)
          </button>
        </div>
      )}
    </div>
  );
}
