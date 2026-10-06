import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard } from "@/components/Keyboard";
import {
  KEY_ROWS,
  coachingTip,
  generateText,
  loadKeyStats,
  loadSessions,
  masteryLabel,
  masteryOf,
  saveKeyStats,
  saveSession,
  streakDays,
  weakestKeys,
  type KeyStats,
  type Mode,
} from "@/lib/typing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LexType — Treino de Digitação Jurídica" },
      {
        name: "description",
        content:
          "Treino de digitação por toque com vocabulário jurídico: escolha as teclas-alvo, pratique com palavras e frases do Direito e acompanhe sua maestria por tecla.",
      },
      { property: "og:title", content: "LexType — Treino de Digitação Jurídica" },
      {
        property: "og:description",
        content:
          "Digitação por toque para advogados e juízes: teclas-alvo personalizáveis, vocabulário jurídico e progressão inteligente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "aquecimento", label: "Aquecimento", hint: "Bigramas e trigramas com as teclas-alvo" },
  { id: "palavras", label: "Palavras jurídicas", hint: "Termos do Direito filtrados pelas teclas" },
  { id: "frases", label: "Frases", hint: "Frases jurídicas completas" },
];

interface SessionResult {
  wpm: number;
  accuracy: number;
  errors: number;
  chars: number;
}

function Index() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(KEY_ROWS.central.split(""));
  const [mode, setMode] = useState<Mode>("palavras");
  const [text, setText] = useState(() => generateText("palavras", KEY_ROWS.central.split("")));
  const [pos, setPos] = useState(0);
  const [errors, setErrors] = useState(0);
  const [errorMap, setErrorMap] = useState<Record<string, number>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<SessionResult | null>(null);
  const [keyStats, setKeyStats] = useState<KeyStats>({});
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setKeyStats(loadKeyStats());
    setStreak(streakDays());
    setMounted(true);
  }, []);

  const reset = useCallback((m: Mode, keys: string[]) => {
    setText(generateText(m, keys));
    setPos(0);
    setErrors(0);
    setErrorMap({});
    setStartedAt(null);
    setElapsed(0);
    setResult(null);
  }, []);

  useEffect(() => {
    if (!startedAt || result) return;
    const t = setInterval(() => setElapsed((Date.now() - startedAt) / 1000), 500);
    return () => clearInterval(t);
  }, [startedAt, result]);

  const finish = useCallback(
    (finalErrors: number, finalErrorMap: Record<string, number>, start: number, len: number) => {
      const minutes = (Date.now() - start) / 60000;
      const wpm = Math.max(0, Math.round(len / 5 / Math.max(minutes, 0.01)));
      const accuracy = Math.round(((len - finalErrors) / len) * 100);
      setResult({ wpm, accuracy, errors: finalErrors, chars: len });

      const stats = loadKeyStats();
      for (const ch of text.toLowerCase()) {
        if (!/[a-zç]/.test(ch)) continue;
        stats[ch] = stats[ch] ?? { attempts: 0, errors: 0 };
        stats[ch].attempts += 1;
        stats[ch].errors += finalErrorMap[ch] ?? 0;
      }
      saveKeyStats(stats);
      setKeyStats(stats);
      saveSession({ date: new Date().toISOString(), wpm, accuracy });
      setStreak(streakDays());
    },
    [text],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (result || e.key.length !== 1) return;
      e.preventDefault();
      const expected = text[pos]!;
      const start = startedAt ?? Date.now();
      if (!startedAt) setStartedAt(start);

      let newErrors = errors;
      let newMap = errorMap;
      if (e.key !== expected) {
        newErrors = errors + 1;
        const exp = expected.toLowerCase();
        newMap = { ...errorMap, [exp]: (errorMap[exp] ?? 0) + 1 };
        setErrors(newErrors);
        setErrorMap(newMap);
      }
      const next = pos + 1;
      setPos(next);
      if (next >= text.length) finish(newErrors, newMap, start, text.length);
    },
    [result, text, pos, startedAt, errors, errorMap, finish],
  );

  const toggleKey = (k: string) => {
    const next = selectedKeys.includes(k)
      ? selectedKeys.filter((x) => x !== k)
      : [...selectedKeys, k];
    setSelectedKeys(next);
    reset(mode, next);
  };

  const setRow = (row: keyof typeof KEY_ROWS) => {
    const keys = KEY_ROWS[row].split("");
    setSelectedKeys(keys);
    reset(mode, keys);
  };

  const changeMode = (m: Mode) => {
    setMode(m);
    reset(m, selectedKeys);
  };

  const liveWpm =
    startedAt && pos > 0 ? Math.round(pos / 5 / Math.max((Date.now() - startedAt) / 60000, 0.01)) : 0;
  const liveAcc = pos > 0 ? Math.round(((pos - errors) / pos) * 100) : 100;
  const nextChar = text[pos]?.toLowerCase() ?? null;
  const weak = useMemo(() => weakestKeys(keyStats, selectedKeys), [keyStats, selectedKeys]);
  const sessions = mounted ? loadSessions() : [];
  const bestWpm = sessions.length ? Math.max(...sessions.map((s) => s.wpm)) : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-mono-type text-lg font-bold text-gold-foreground">
              §
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">LexType</h1>
              <p className="text-xs text-muted-foreground">Digitação por toque para o Direito</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <div className="font-mono-type font-bold text-gold">{streak}🔥</div>
              <div className="text-xs text-muted-foreground">dias seguidos</div>
            </div>
            <div className="text-right">
              <div className="font-mono-type font-bold">{bestWpm}</div>
              <div className="text-xs text-muted-foreground">melhor PPM</div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        {/* Seleção de teclas */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Teclas-alvo do treino
            </h2>
            <div className="flex gap-2">
              {(Object.keys(KEY_ROWS) as (keyof typeof KEY_ROWS)[]).map((row) => (
                <button
                  key={row}
                  onClick={() => setRow(row)}
                  className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-gold/50 hover:text-gold"
                >
                  Fileira {row}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {"qwertyuiopasdfghjklçzxcvbnm".split("").map((k) => {
              const on = selectedKeys.includes(k);
              const m = masteryOf(keyStats[k]);
              return (
                <button
                  key={k}
                  onClick={() => toggleKey(k)}
                  title={keyStats[k]?.attempts ? `${masteryLabel(m)} — ${m}% de precisão` : "Ainda não treinada"}
                  className={cn(
                    "h-9 w-9 rounded-md border font-mono-type text-sm font-semibold uppercase transition-all keycap-shadow",
                    on
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-border bg-keycap text-muted-foreground hover:text-foreground",
                  )}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </section>

        {/* Modos */}
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => changeMode(m.id)}
              title={m.hint}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                mode === m.id
                  ? "border-gold bg-gold text-gold-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Área de digitação */}
        <section
          ref={containerRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onClick={() => containerRef.current?.focus()}
          className="cursor-text rounded-xl border border-border bg-card p-8 outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
        >
          {result ? (
            <div className="animate-pop-in space-y-6 text-center">
              <div className="flex justify-center gap-10">
                <div>
                  <div className="font-mono-type text-5xl font-bold text-gold text-glow-gold">{result.wpm}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">PPM</div>
                </div>
                <div>
                  <div className="font-mono-type text-5xl font-bold">{result.accuracy}%</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Precisão</div>
                </div>
                <div>
                  <div className="font-mono-type text-5xl font-bold text-destructive">{result.errors}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Erros</div>
                </div>
              </div>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-gold">Parecer técnico: </span>
                {coachingTip(weak)}
              </p>
              {weak.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Teclas que precisam de atenção:{" "}
                  <span className="font-mono-type font-bold uppercase text-destructive">
                    {weak.join("  ")}
                  </span>
                </p>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reset(mode, selectedKeys);
                }}
                className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground transition-transform hover:scale-105"
              >
                Próxima sessão
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-center gap-8 font-mono-type text-sm">
                <span className="text-muted-foreground">
                  PPM <span className="font-bold text-gold">{liveWpm}</span>
                </span>
                <span className="text-muted-foreground">
                  Precisão <span className="font-bold text-foreground">{liveAcc}%</span>
                </span>
                <span className="text-muted-foreground">
                  Tempo <span className="font-bold text-foreground">{elapsed.toFixed(0)}s</span>
                </span>
              </div>
              <p className="font-mono-type text-2xl leading-relaxed tracking-wide">
                {text.split("").map((ch, i) => (
                  <span
                    key={i}
                    className={cn(
                      i < pos && "text-muted-foreground/50",
                      i === pos && "rounded-sm bg-gold/30 text-gold animate-caret",
                      i > pos && "text-foreground",
                    )}
                  >
                    {ch}
                  </span>
                ))}
              </p>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Clique na área e comece a digitar — o cronômetro inicia na primeira tecla
              </p>
            </>
          )}
        </section>

        {/* Teclado */}
        <section className="rounded-xl border border-border bg-card p-6">
          <Keyboard nextChar={result ? null : nextChar} stats={keyStats} selectedKeys={selectedKeys} />
          <div className="mt-4 flex justify-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-success/40" /> dominada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-gold/30" /> em progresso
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-destructive/40" /> precisa de treino
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
