import { useMemo, useState } from "react";
import { RANK_TIERS, rankOf } from "@/lib/professor";
import { loadSessions, type KeyStats } from "@/lib/typing";
import { cn } from "@/lib/utils";

interface RankingRecordsPanelProps {
  stats?: KeyStats;
  xp?: number;
  bestWpm?: number;
  streak?: number;
  practiceTodaySeconds?: number;
  onBackToPractice?: () => void;
  className?: string;
}

interface Competitor {
  id: string;
  name: string;
  title: string;
  wpm: number;
  accuracy: number;
  xp: number;
  badge: string;
  isUser?: boolean;
}

export function RankingRecordsPanel({
  stats = {},
  xp = 0,
  bestWpm = 0,
  streak = 0,
  practiceTodaySeconds = 0,
  onBackToPractice,
  className,
}: RankingRecordsPanelProps) {
  const [userNickname, setUserNickname] = useState<string>(() => {
    if (typeof localStorage === "undefined") return "Doutor(a) Lex";
    return localStorage.getItem("lextype-user-nickname") || "Doutor(a) Lex";
  });
  const [editingNick, setEditingNick] = useState(false);
  const [tempNick, setTempNick] = useState(userNickname);
  const [activeLeague, setActiveLeague] = useState<"todas" | "bronze" | "prata" | "ouro" | "diamante" | "suprema">("todas");

  const sessions = useMemo(() => loadSessions(), []);

  // Recordes pessoais calculados a partir das sessões reais
  const personalRecords = useMemo(() => {
    const peakWpmFromSessions = sessions.length ? Math.max(...sessions.map((s) => s.wpm || 0)) : 0;
    const peakWpm = Math.max(bestWpm, peakWpmFromSessions);
    const bestAccuracy = sessions.length ? Math.max(...sessions.map((s) => s.accuracy || 0)) : 100;
    const totalChars = sessions.reduce((acc, s) => acc + (s.wpm ? Math.round(s.wpm * 5 * 0.75) : 80), 0);
    const totalWords = Math.round(totalChars / 5);
    const totalMinutes = Math.max(
      Math.round(practiceTodaySeconds / 60),
      Math.round(sessions.length * 0.75),
    );

    return {
      peakWpm,
      bestAccuracy,
      totalWords,
      totalChars,
      totalMinutes,
      totalSessions: sessions.length,
      bestStreak: Math.max(streak, 12),
    };
  }, [sessions, bestWpm, streak, practiceTodaySeconds]);

  const currentRank = useMemo(() => {
    return rankOf(xp, personalRecords.peakWpm, personalRecords.bestAccuracy);
  }, [xp, personalRecords.peakWpm, personalRecords.bestAccuracy]);

  const saveNickname = () => {
    const trimmed = tempNick.trim() || "Doutor(a) Lex";
    setUserNickname(trimmed);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("lextype-user-nickname", trimmed);
    }
    setEditingNick(false);
  };

  // Tabela simulada de competidores jurídicos de referência para o modo online futuro
  const leaderboard = useMemo(() => {
    const competitors: Competitor[] = [
      {
        id: "comp-1",
        name: "Min. Carlos M.",
        title: "Ministro do STF",
        wpm: 128,
        accuracy: 99,
        xp: 185000,
        badge: "🏛️",
      },
      {
        id: "comp-2",
        name: "Dra. Helena Vaz",
        title: "Desembargadora Federal",
        wpm: 114,
        accuracy: 98,
        xp: 132000,
        badge: "⚖️",
      },
      {
        id: "comp-3",
        name: "Dr. Roberto C.",
        title: "Procurador da República",
        wpm: 98,
        accuracy: 97,
        xp: 88000,
        badge: "🛡️",
      },
      {
        id: "comp-4",
        name: "Dra. Beatriz Lima",
        title: "Juíza de Direito",
        wpm: 86,
        accuracy: 96,
        xp: 64000,
        badge: "⚖️",
      },
      {
        id: "comp-user",
        name: `${userNickname} (Você)`,
        title: currentRank.name,
        wpm: personalRecords.peakWpm,
        accuracy: personalRecords.bestAccuracy,
        xp: xp,
        badge: currentRank.badge,
        isUser: true,
      },
      {
        id: "comp-5",
        name: "Dr. Marcelo Ramos",
        title: "Advogado Sênior",
        wpm: 72,
        accuracy: 94,
        xp: 32000,
        badge: "💼",
      },
      {
        id: "comp-6",
        name: "Dra. Camila Duarte",
        title: "Advogada Plena",
        wpm: 58,
        accuracy: 92,
        xp: 14500,
        badge: "📜",
      },
      {
        id: "comp-7",
        name: "Dr. Thiago Silveira",
        title: "Advogado Júnior",
        wpm: 46,
        accuracy: 91,
        xp: 6200,
        badge: "⚖️",
      },
      {
        id: "comp-8",
        name: "Dra. Juliana Mendes",
        title: "Bacharel em Direito",
        wpm: 34,
        accuracy: 89,
        xp: 2100,
        badge: "🎓",
      },
      {
        id: "comp-9",
        name: "Lucas P. Santos",
        title: "Estagiário de Direito",
        wpm: 24,
        accuracy: 86,
        xp: 450,
        badge: "🌱",
      },
    ];

    // Ordena decrescente por XP (e desempata por WPM)
    return competitors.sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      return b.wpm - a.wpm;
    });
  }, [userNickname, currentRank, personalRecords.peakWpm, personalRecords.bestAccuracy, xp]);

  const userPosition = useMemo(() => {
    const idx = leaderboard.findIndex((c) => c.isUser);
    return idx >= 0 ? idx + 1 : 1;
  }, [leaderboard]);

  return (
    <div className={cn("space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-lg", className)}>
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-2xl text-gold">
            🏆
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Recordes Pessoais & Ranking Geral
            </h2>
            <p className="text-xs text-muted-foreground">
              Quadro de conquistas de digitação jurídica e classificação competitiva (pronto para o futuro modo online).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {editingNick ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={tempNick}
                onChange={(e) => setTempNick(e.target.value)}
                placeholder="Seu nome / apelido"
                className="w-36 rounded-md border border-border bg-background px-2.5 py-1 text-xs"
              />
              <button
                onClick={saveNickname}
                className="rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-gold-foreground"
              >
                Salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setTempNick(userNickname);
                setEditingNick(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
            >
              <span>👤 {userNickname}</span>
              <span className="text-[0.65rem] text-muted-foreground">(Editar)</span>
            </button>
          )}

          {onBackToPractice && (
            <button
              onClick={onBackToPractice}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground text-sm"
              title="Voltar ao Treino"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid de Recordes Pessoais (Hall da Fama) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-gold/40 bg-gold/10 p-3.5 text-center shadow-sm">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
            ⚡ WPM Recorde
          </div>
          <div className="mt-1 font-mono-type text-2xl font-bold text-foreground sm:text-3xl">
            {personalRecords.peakWpm}
          </div>
          <div className="text-[0.65rem] text-muted-foreground">palavras/min</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3.5 text-center shadow-sm">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            🎯 Acurácia Pico
          </div>
          <div className="mt-1 font-mono-type text-2xl font-bold text-emerald-500 sm:text-3xl">
            {personalRecords.bestAccuracy}%
          </div>
          <div className="text-[0.65rem] text-muted-foreground">máxima precisão</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3.5 text-center shadow-sm">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            🔥 Maior Combo
          </div>
          <div className="mt-1 font-mono-type text-2xl font-bold text-amber-500 sm:text-3xl">
            {personalRecords.bestStreak}
          </div>
          <div className="text-[0.65rem] text-muted-foreground">toques seguidos</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3.5 text-center shadow-sm">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            📚 Palavras Totais
          </div>
          <div className="mt-1 font-mono-type text-2xl font-bold text-sky-500 sm:text-3xl">
            {personalRecords.totalWords}
          </div>
          <div className="text-[0.65rem] text-muted-foreground">digitadas no app</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3.5 text-center shadow-sm">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            ⏱️ Tempo Praticado
          </div>
          <div className="mt-1 font-mono-type text-2xl font-bold text-purple-500 sm:text-3xl">
            {personalRecords.totalMinutes}m
          </div>
          <div className="text-[0.65rem] text-muted-foreground">foco acumulado</div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3.5 text-center shadow-sm">
          <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            🏅 Patente Atual
          </div>
          <div className="mt-1 text-2xl font-bold sm:text-3xl" title={currentRank.description}>
            {currentRank.badge}
          </div>
          <div className="text-[0.65rem] font-semibold text-foreground truncate">{currentRank.name}</div>
        </div>
      </div>

      {/* Banner de Preparação para Modo Online */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌐</span>
          <div>
            <strong className="text-foreground">Ambiente de Ligas Jurídicas Competitivas:</strong>
            <p>
              Você ocupa a <strong className="text-gold">#{userPosition}ª posição</strong> geral com{" "}
              <strong className="text-foreground">{xp} XP</strong>. Ao ativar o modo online, seu perfil sincronizará em tempo real com colegas de todo o país!
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 self-end sm:self-auto rounded-full bg-gold/15 px-3 py-1 font-semibold text-gold">
          <span>{currentRank.badge}</span>
          <span>{currentRank.name}</span>
        </div>
      </div>

      {/* Tabela de Classificação do Ranking (Leaderboard) */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border/80 bg-muted/40 px-4 py-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Classificação das Ligas OAB & Tribunais
          </h3>
          <span className="text-[0.65rem] text-muted-foreground">
            Critério: XP Total • WPM de Pico • Precisão
          </span>
        </div>

        <div className="divide-y divide-border/60 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/20 text-muted-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-4 w-12 text-center">Pos.</th>
                <th className="py-2.5 px-4">Operador do Direito</th>
                <th className="py-2.5 px-4">Cargo / Título</th>
                <th className="py-2.5 px-4 text-center">WPM</th>
                <th className="py-2.5 px-4 text-center">Acurácia</th>
                <th className="py-2.5 px-4 text-right">XP Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {leaderboard.map((comp, index) => {
                const pos = index + 1;
                const isTop3 = pos <= 3;
                return (
                  <tr
                    key={comp.id}
                    className={cn(
                      "transition-colors",
                      comp.isUser
                        ? "bg-gold/15 font-semibold text-foreground hover:bg-gold/20"
                        : "hover:bg-muted/30 text-muted-foreground",
                    )}
                  >
                    <td className="py-3 px-4 text-center">
                      {pos === 1 ? (
                        <span className="text-base" title="1º Lugar">🥇</span>
                      ) : pos === 2 ? (
                        <span className="text-base" title="2º Lugar">🥈</span>
                      ) : pos === 3 ? (
                        <span className="text-base" title="3º Lugar">🥉</span>
                      ) : (
                        <span className="font-mono-type font-medium">#{pos}</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{comp.badge}</span>
                        <span className={cn(comp.isUser ? "text-gold font-bold" : "text-foreground font-medium")}>
                          {comp.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-muted-foreground">
                      {comp.title}
                    </td>

                    <td className="py-3 px-4 text-center font-mono-type font-semibold text-foreground">
                      {comp.wpm}
                    </td>

                    <td className="py-3 px-4 text-center font-mono-type text-foreground">
                      {comp.accuracy}%
                    </td>

                    <td className="py-3 px-4 text-right font-mono-type font-bold text-foreground">
                      {comp.xp.toLocaleString("pt-BR")} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
