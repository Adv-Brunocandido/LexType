import { useMemo, useState } from "react";
import { FINGERS, TRAINABLE_KEYS } from "@/lib/abnt2";
import { RANK_TIERS, rankOf } from "@/lib/professor";
import {
  difficultyOf,
  loadSessions,
  masteryLabel,
  masteryOf,
  weakestKeys,
  type KeyStats,
  type SessionRecord,
} from "@/lib/typing";
import { cn } from "@/lib/utils";

interface AnalyticsDashboardProps {
  stats: KeyStats;
  xp: number;
  bestWpm: number;
  streak: number;
  practiceTodaySeconds: number;
  onTrainWeakKeys: (keys: string[]) => void;
  onSwitchToPractice: () => void;
}

export function AnalyticsDashboard({
  stats,
  xp,
  bestWpm,
  streak,
  practiceTodaySeconds,
  onTrainWeakKeys,
  onSwitchToPractice,
}: AnalyticsDashboardProps) {
  const [chartMetric, setChartMetric] = useState<"both" | "wpm" | "accuracy">("both");
  const sessions = useMemo(() => loadSessions(), []);

  // Análise global de sessões
  const sessionStats = useMemo(() => {
    if (!sessions.length) {
      return {
        avgWpm: 0,
        peakWpm: bestWpm,
        avgAccuracy: 100,
        totalSessions: 0,
        totalWords: 0,
        totalChars: 0,
        totalMinutes: Math.round(practiceTodaySeconds / 60),
      };
    }

    const totalWpm = sessions.reduce((acc, s) => acc + (s.wpm || 0), 0);
    const totalAcc = sessions.reduce((acc, s) => acc + (s.accuracy || 0), 0);
    const peak = Math.max(bestWpm, ...sessions.map((s) => s.wpm || 0));
    const avgWpm = Math.round(totalWpm / sessions.length);
    const avgAccuracy = Math.round(totalAcc / sessions.length);

    // Estimativa de caracteres e palavras digitadas
    const totalChars = sessions.reduce((acc, s) => acc + (s.wpm ? Math.round(s.wpm * 5 * 0.75) : 80), 0);
    const totalWords = Math.round(totalChars / 5);
    const totalMinutes = Math.max(
      Math.round(practiceTodaySeconds / 60),
      Math.round(sessions.length * 0.75),
    );

    return {
      avgWpm,
      peakWpm: peak,
      avgAccuracy,
      totalSessions: sessions.length,
      totalWords,
      totalChars,
      totalMinutes,
    };
  }, [sessions, bestWpm, practiceTodaySeconds]);

  // Status de patente
  const rankInfo = useMemo(() => {
    return rankOf(xp, sessionStats.peakWpm, sessionStats.avgAccuracy);
  }, [xp, sessionStats.peakWpm, sessionStats.avgAccuracy]);

  // Análise de teclas do teclado
  const keyAnalysis = useMemo(() => {
    const list: {
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

      const accuracy = masteryOf(s);
      const avgTime = timed > 0 ? Math.round(time / timed) : 0;
      const difficulty = difficultyOf(s);
      const label = masteryLabel(accuracy);
      const fingerInfo = FINGERS[key];

      list.push({
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

    // Teclas dominadas (verde): acurácia >= 95% e pelo menos 3 tentativas
    const mastered = list.filter((c) => c.attempts >= 3 && c.accuracy >= 95);
    // Teclas proficientes (azul): 88% a 94%
    const proficient = list.filter((c) => c.attempts >= 3 && c.accuracy >= 88 && c.accuracy < 95);
    // Teclas em prática: 70% a 87%
    const inProgress = list.filter((c) => c.attempts >= 3 && c.accuracy >= 70 && c.accuracy < 88);
    // Teclas críticas / com dificuldade (laranja/vermelho): acurácia < 70% ou alta dificuldade
    const critical = list
      .filter((c) => c.attempts >= 2 && (c.accuracy < 75 || c.difficulty > 5))
      .sort((a, b) => b.difficulty - a.difficulty);
    const untrained = list.filter((c) => c.attempts < 2);

    const topWeak = weakestKeys(stats, TRAINABLE_KEYS, 6);

    return {
      all: list,
      mastered,
      proficient,
      inProgress,
      critical,
      untrained,
      topWeak,
    };
  }, [stats]);

  // Preparação de pontos para o gráfico SVG (últimas 25 sessões)
  const chartData = useMemo(() => {
    const recent = sessions.slice(-25);
    if (recent.length < 2) return null;

    const maxWpm = Math.max(80, ...recent.map((s) => s.wpm));
    const minWpm = Math.max(0, Math.min(...recent.map((s) => s.wpm)) - 10);
    const wpmRange = Math.max(30, maxWpm - minWpm);

    const width = 760;
    const height = 220;
    const padding = 36;
    const plotWidth = width - padding * 2;
    const plotHeight = height - padding * 2;

    const points = recent.map((s, i) => {
      const x = padding + (i / (recent.length - 1)) * plotWidth;
      const yWpm = padding + plotHeight - ((s.wpm - minWpm) / wpmRange) * plotHeight;
      const yAcc = padding + plotHeight - (Math.max(50, s.accuracy - 50) / 50) * plotHeight;
      return { x, yWpm, yAcc, wpm: s.wpm, acc: s.accuracy, date: s.date };
    });

    const pathWpm = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yWpm.toFixed(1)}`).join(" ");
    const pathAcc = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yAcc.toFixed(1)}`).join(" ");

    return { points, pathWpm, pathAcc, width, height, maxWpm, minWpm };
  }, [sessions]);

  // Exportação de dados do usuário
  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      xp,
      bestWpm,
      streak,
      rank: rankInfo.name,
      sessions,
      keyStats: stats,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lextype-dados-desempenho-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-12 animate-fade-in">
      {/* 1. Header de Patente e Carreira Jurídica */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card/95 to-primary/5 p-6 shadow-xl backdrop-blur-md sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-3xl shadow-inner sm:h-20 sm:w-20 sm:text-4xl">
              {rankInfo.badge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-semibold tracking-wide text-primary uppercase">
                  Patente Atual
                </span>
                <span className="text-xs text-muted-foreground">Nível da Magistratura</span>
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {rankInfo.name}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {rankInfo.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-border/60 bg-background/50 p-4 sm:min-w-[280px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">
                Próxima Patente:{" "}
                <strong className="text-primary">{rankInfo.next || "Topo da Carreira"}</strong>
              </span>
              <span className="font-mono font-bold text-primary">
                {Math.round(rankInfo.progress * 100)}%
              </span>
            </div>

            {/* Barra de Progresso Gradual */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
                style={{ width: `${Math.min(100, Math.max(4, rankInfo.progress * 100))}%` }}
              />
            </div>

            {/* Requisitos Cumulativos */}
            {rankInfo.nextTier && (
              <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
                <span className="rounded bg-muted/80 px-1.5 py-0.5 font-mono">
                  XP: {xp.toLocaleString()} / {rankInfo.nextTier.minXp.toLocaleString()}
                </span>
                <span className="rounded bg-muted/80 px-1.5 py-0.5 font-mono">
                  Min. {rankInfo.nextTier.minWpm} WPM (Pico: {sessionStats.peakWpm})
                </span>
                <span className="rounded bg-muted/80 px-1.5 py-0.5 font-mono">
                  Min. {rankInfo.nextTier.minAccuracy}% Precisão
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Grid de Métricas Globais (KPI Cards) */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-primary/40">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            WPM Médio
          </span>
          <div className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
            {sessionStats.avgWpm}
            <span className="ml-1 text-xs font-normal text-muted-foreground">ppm</span>
          </div>
          <span className="text-[11px] text-emerald-500">Ritmo sustentado</span>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-primary/40">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Recorde (Pico)
          </span>
          <div className="mt-1 text-2xl font-black text-primary sm:text-3xl">
            {sessionStats.peakWpm}
            <span className="ml-1 text-xs font-normal text-muted-foreground">ppm</span>
          </div>
          <span className="text-[11px] text-muted-foreground">Melhor velocidade</span>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-primary/40">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Acurácia Média
          </span>
          <div className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
            {sessionStats.avgAccuracy}%
          </div>
          <span className="text-[11px] text-emerald-500">Precisão global</span>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-primary/40">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Tempo de Treino
          </span>
          <div className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
            {sessionStats.totalMinutes}
            <span className="ml-1 text-xs font-normal text-muted-foreground">min</span>
          </div>
          <span className="text-[11px] text-muted-foreground">Prática acumulada</span>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-primary/40">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Palavras
          </span>
          <div className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
            {sessionStats.totalWords.toLocaleString()}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {sessionStats.totalChars.toLocaleString()} caracteres
          </span>
        </div>

        <div className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition hover:border-primary/40">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Sequência (Streak)
          </span>
          <div className="mt-1 flex items-baseline gap-1 text-2xl font-black text-amber-500 sm:text-3xl">
            <span>🔥 {streak}</span>
            <span className="text-xs font-normal text-muted-foreground">dias</span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            {sessionStats.totalSessions} sessões totais
          </span>
        </div>
      </section>

      {/* 3. Gráfico Interativo de Evolução Temporal */}
      <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-md backdrop-blur-md">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Curva de Evolução Temporal
            </h3>
            <p className="text-xs text-muted-foreground">
              Desempenho de velocidade (WPM) e precisão (%) ao longo das últimas sessões concluídas
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Exibir:</span>
            <div className="inline-flex rounded-lg border border-border bg-background p-1 text-xs">
              <button
                onClick={() => setChartMetric("both")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium transition",
                  chartMetric === "both"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Ambos
              </button>
              <button
                onClick={() => setChartMetric("wpm")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium transition",
                  chartMetric === "wpm"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                WPM
              </button>
              <button
                onClick={() => setChartMetric("accuracy")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium transition",
                  chartMetric === "accuracy"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Precisão
              </button>
            </div>
          </div>
        </div>

        {chartData ? (
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[640px]">
              <svg
                viewBox={`0 0 ${chartData.width} ${chartData.height}`}
                className="w-full overflow-visible"
              >
                {/* Linhas de grade sutis */}
                <line
                  x1="36"
                  y1="36"
                  x2={chartData.width - 36}
                  y2="36"
                  stroke="currentColor"
                  className="text-border/40"
                  strokeDasharray="4 4"
                />
                <line
                  x1="36"
                  y1={chartData.height / 2}
                  x2={chartData.width - 36}
                  y2={chartData.height / 2}
                  stroke="currentColor"
                  className="text-border/40"
                  strokeDasharray="4 4"
                />
                <line
                  x1="36"
                  y1={chartData.height - 36}
                  x2={chartData.width - 36}
                  y2={chartData.height - 36}
                  stroke="currentColor"
                  className="text-border/40"
                />

                {/* Eixos com legendas */}
                <text x="12" y="42" className="fill-primary text-[10px] font-mono">
                  {chartData.maxWpm} ppm
                </text>
                <text x="12" y={chartData.height - 36} className="fill-muted-foreground text-[10px] font-mono">
                  {chartData.minWpm} ppm
                </text>

                {/* Linha de WPM */}
                {(chartMetric === "both" || chartMetric === "wpm") && (
                  <path
                    d={chartData.pathWpm}
                    fill="none"
                    stroke="var(--color-primary, #3b82f6)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-md"
                  />
                )}

                {/* Linha de Precisão */}
                {(chartMetric === "both" || chartMetric === "accuracy") && (
                  <path
                    d={chartData.pathAcc}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray={chartMetric === "both" ? "5 3" : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Pontos de dados interativos */}
                {chartData.points.map((p, i) => (
                  <g key={i} className="group cursor-pointer">
                    {(chartMetric === "both" || chartMetric === "wpm") && (
                      <circle
                        cx={p.x}
                        cy={p.yWpm}
                        r="4.5"
                        fill="var(--color-primary, #3b82f6)"
                        className="transition-transform group-hover:r-6"
                      />
                    )}
                    {(chartMetric === "both" || chartMetric === "accuracy") && (
                      <circle
                        cx={p.x}
                        cy={p.yAcc}
                        r="3.5"
                        fill="#10b981"
                        className="transition-transform group-hover:r-5"
                      />
                    )}
                    {/* Tooltip SVG nativo */}
                    <title>{`Sessão ${i + 1}\nVelocidade: ${p.wpm} WPM\nPrecisão: ${p.acc}%`}</title>
                  </g>
                ))}
              </svg>

              {/* Legenda do gráfico */}
              <div className="mt-3 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                  <span>Velocidade de Digitação (WPM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span>Acurácia (%)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <span className="text-3xl">📈</span>
            <p className="mt-2 text-sm font-medium">Dados de sessões insuficientes para traçar gráfico.</p>
            <p className="text-xs">Complete pelo menos 2 sessões para visualizar sua curva de evolução.</p>
          </div>
        )}
      </section>

      {/* 4. Diagnóstico de Teclado: Teclas Dominadas vs. Teclas Críticas */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Teclas Dominadas (Verde) */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                ✓
              </span>
              <div>
                <h4 className="font-bold text-foreground">Teclas Dominadas ({keyAnalysis.mastered.length})</h4>
                <p className="text-xs text-muted-foreground">Precisão superior a 95% e alta consistência muscular</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
              Excelente
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {keyAnalysis.mastered.length > 0 ? (
              keyAnalysis.mastered.map((k) => (
                <div
                  key={k.key}
                  className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-900/20 px-2.5 py-1 text-sm font-mono font-bold text-emerald-300 shadow-sm"
                  title={`${k.key.toUpperCase()}: ${k.accuracy}% precisão (${k.attempts} toques, ${k.avgTime}ms)`}
                >
                  <span>{k.key.toUpperCase()}</span>
                  <span className="text-[10px] font-normal text-emerald-400/80">{k.accuracy}%</span>
                </div>
              ))
            ) : (
              <p className="py-4 text-xs text-muted-foreground">
                Continue treinando para dominar suas primeiras teclas com precisão superior a 95%.
              </p>
            )}
          </div>
        </div>

        {/* Teclas Críticas / Com Dificuldade (Laranja/Vermelho) */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                ⚠
              </span>
              <div>
                <h4 className="font-bold text-foreground">Teclas em Atenção ({keyAnalysis.critical.length})</h4>
                <p className="text-xs text-muted-foreground">Teclas com maior incidência de erro ou hesitação</p>
              </div>
            </div>
            {keyAnalysis.topWeak.length > 0 && (
              <button
                onClick={() => {
                  onTrainWeakKeys(keyAnalysis.topWeak);
                  onSwitchToPractice();
                }}
                className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/30"
              >
                Treinar Agora
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {keyAnalysis.critical.length > 0 ? (
              keyAnalysis.critical.map((k) => (
                <div
                  key={k.key}
                  className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-900/20 px-2.5 py-1 text-sm font-mono font-bold text-amber-300 shadow-sm"
                  title={`${k.key.toUpperCase()}: ${k.accuracy}% precisão (${k.errors} erros em ${k.attempts} toques, latência ${k.avgTime}ms)`}
                >
                  <span>{k.key.toUpperCase()}</span>
                  <span className="text-[10px] font-normal text-amber-400/80">{k.accuracy}%</span>
                </div>
              ))
            ) : (
              <p className="py-4 text-xs text-muted-foreground">
                Nenhuma tecla crítica detectada. Sua precisão está uniforme e sob controle!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 5. Ações e Exportação de Dados */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
        <div className="text-xs text-muted-foreground">
          Todos os dados e métricas são armazenados <strong>100% localmente no seu navegador</strong> (privacidade absoluta, sem telemetria).
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-accent"
          >
            <span>📥</span> Exportar Histórico (JSON)
          </button>
          <button
            onClick={onSwitchToPractice}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <span>⌨️</span> Voltar ao Treino
          </button>
        </div>
      </section>
    </div>
  );
}
