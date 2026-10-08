import { useMemo } from "react";
import { TRAINABLE_KEYS, FINGERS, KEY_GROUPS } from "@/lib/abnt2";
import { masteryOf, masteryLabel, difficultyOf, weakestKeys, type KeyStats } from "@/lib/typing";
import { cn } from "@/lib/utils";

interface DiagnosticMapProps {
  stats: KeyStats;
  onClose: () => void;
  onTrainWeakKeys: (keys: string[]) => void;
}

export function DiagnosticMap({ stats, onClose, onTrainWeakKeys }: DiagnosticMapProps) {
  const analysis = useMemo(() => {
    let totalAttempts = 0;
    let totalErrors = 0;
    let totalTime = 0;
    let totalTimed = 0;

    const classified: {
      key: string;
      attempts: number;
      errors: number;
      accuracy: number;
      avgTime: number;
      difficulty: number;
      label: string;
      hand: string;
      finger: string;
    }[] = [];

    for (const key of TRAINABLE_KEYS) {
      const s = stats[key];
      const attempts = s?.attempts ?? 0;
      const errors = s?.errors ?? 0;
      const time = s?.time ?? 0;
      const timed = s?.timed ?? 0;

      totalAttempts += attempts;
      totalErrors += errors;
      totalTime += time;
      totalTimed += timed;

      const accuracy = masteryOf(s);
      const avgTime = timed > 0 ? Math.round(time / timed) : 0;
      const difficulty = difficultyOf(s);
      const label = masteryLabel(accuracy);
      const fingerInfo = FINGERS[key];

      classified.push({
        key,
        attempts,
        errors,
        accuracy,
        avgTime,
        difficulty,
        label,
        hand: fingerInfo?.hand === "E" ? "Esquerda" : "Direita",
        finger: fingerInfo?.finger ?? "desconhecido",
      });
    }

    const masters = classified.filter((c) => c.attempts >= 3 && c.accuracy >= 95);
    const proficient = classified.filter(
      (c) => c.attempts >= 3 && c.accuracy >= 88 && c.accuracy < 95,
    );
    const practicing = classified.filter(
      (c) => c.attempts >= 3 && c.accuracy >= 70 && c.accuracy < 88,
    );
    const critical = classified
      .filter((c) => c.attempts >= 3 && (c.accuracy < 70 || c.difficulty > 5))
      .sort((a, b) => b.difficulty - a.difficulty);
    const untrained = classified.filter((c) => c.attempts < 3);

    const overallAccuracy =
      totalAttempts > 0 ? Math.round(((totalAttempts - totalErrors) / totalAttempts) * 100) : 0;
    const overallAvgTime = totalTimed > 0 ? Math.round(totalTime / totalTimed) : 0;

    const topWeak = weakestKeys(stats, TRAINABLE_KEYS, 6);

    return {
      totalAttempts,
      totalErrors,
      overallAccuracy,
      overallAvgTime,
      masters,
      proficient,
      practicing,
      critical,
      untrained,
      topWeak,
      allKeys: classified,
    };
  }, [stats]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl animate-pop-in">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Mapa Diagnóstico de Domínio Muscular
              </h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Análise biomecânica baseada no seu histórico de digitação ABNT2 (amostras locais no
              navegador).
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Fechar diagnóstico"
          >
            ✕
          </button>
        </div>

        {/* Global Summary Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-secondary/50 p-3">
            <span className="text-xs text-muted-foreground">Toques Registrados</span>
            <div className="mt-1 text-2xl font-bold text-foreground font-mono-type">
              {analysis.totalAttempts.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-secondary/50 p-3">
            <span className="text-xs text-muted-foreground">Precisão Geral</span>
            <div className="mt-1 text-2xl font-bold text-foreground font-mono-type">
              {analysis.overallAccuracy}%
            </div>
          </div>
          <div className="rounded-xl border border-border bg-secondary/50 p-3">
            <span className="text-xs text-muted-foreground">Hesitação Média</span>
            <div className="mt-1 text-2xl font-bold text-foreground font-mono-type">
              {analysis.overallAvgTime} ms
            </div>
          </div>
          <div className="rounded-xl border border-border bg-secondary/50 p-3">
            <span className="text-xs text-muted-foreground">Teclas Críticas</span>
            <div className="mt-1 text-2xl font-bold text-destructive font-mono-type">
              {analysis.critical.length}
            </div>
          </div>
        </div>

        {/* Action Button for Weak Keys */}
        {analysis.topWeak.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold/40 bg-gold/10 p-4">
            <div>
              <h3 className="text-sm font-semibold text-gold">
                Plano de Recuperação Personalizado
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Foram identificadas {analysis.topWeak.length} teclas que concentram maior índice de
                erro ou hesitação:{" "}
                <span className="font-mono-type font-bold text-foreground uppercase">
                  {analysis.topWeak.join(", ")}
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                onTrainWeakKeys(analysis.topWeak);
                onClose();
              }}
              className="rounded-lg bg-gold px-4 py-2 text-xs font-semibold text-gold-foreground transition-transform hover:scale-105"
            >
              🎯 Focar Treino Nestas Teclas
            </button>
          </div>
        )}

        {/* Detailed Key Categorization */}
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Status por Nível de Domínio
          </h3>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Critical Keys */}
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-destructive">
                  🔴 Teclas Críticas / Fracas ({analysis.critical.length})
                </span>
                <span className="text-[0.65rem] text-muted-foreground">
                  Precisão &lt; 70% ou alta hesitação
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {analysis.critical.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">
                    Nenhuma tecla em estado crítico!
                  </span>
                ) : (
                  analysis.critical.map((c) => (
                    <span
                      key={c.key}
                      title={`${c.key.toUpperCase()}: ${c.accuracy}% acertos, ${c.attempts} tentativas, ${c.avgTime}ms`}
                      className="flex items-center gap-1 rounded-md border border-destructive/40 bg-card px-2 py-1 font-mono-type text-xs font-bold text-destructive"
                    >
                      <span className="uppercase">{c.key}</span>
                      <span className="text-[0.6rem] font-normal opacity-80">{c.accuracy}%</span>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Masters */}
            <div className="rounded-xl border border-success/30 bg-success/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-success">
                  🏆 Teclas Mestre ({analysis.masters.length})
                </span>
                <span className="text-[0.65rem] text-muted-foreground">Precisão &ge; 95%</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {analysis.masters.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">
                    Continue treinando para atingir maestria!
                  </span>
                ) : (
                  analysis.masters.map((c) => (
                    <span
                      key={c.key}
                      title={`${c.key.toUpperCase()}: ${c.accuracy}% acertos`}
                      className="rounded-md border border-success/40 bg-card px-2 py-1 font-mono-type text-xs font-bold text-success uppercase"
                    >
                      {c.key}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Proficient */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  🟢 Proficientes ({analysis.proficient.length})
                </span>
                <span className="text-[0.65rem] text-muted-foreground">88% a 94% precisão</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {analysis.proficient.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">Nenhuma nesta faixa.</span>
                ) : (
                  analysis.proficient.map((c) => (
                    <span
                      key={c.key}
                      className="rounded-md border border-border bg-secondary px-2 py-1 font-mono-type text-xs font-semibold uppercase text-foreground"
                    >
                      {c.key}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Practicing / In Progress */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  🟡 Praticantes ({analysis.practicing.length})
                </span>
                <span className="text-[0.65rem] text-muted-foreground">70% a 87% precisão</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {analysis.practicing.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">Nenhuma nesta faixa.</span>
                ) : (
                  analysis.practicing.map((c) => (
                    <span
                      key={c.key}
                      className="rounded-md border border-border bg-secondary px-2 py-1 font-mono-type text-xs font-medium uppercase text-muted-foreground"
                    >
                      {c.key}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-[0.65rem] text-muted-foreground">
            🔒 <strong>Privacidade:</strong> Todos os dados de digitação e métricas diagnósticas são
            processados e armazenados exclusivamente no seu navegador (localStorage). Nenhuma tecla
            ou histórico é transferido para servidores de publicidade ou terceiros.
          </p>
        </div>
      </div>
    </div>
  );
}
