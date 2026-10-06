import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard } from "@/components/Keyboard";
import { KEY_GROUPS, TRAINABLE_KEYS, charToKeys, strip } from "@/lib/abnt2";
import { professorSays, rankOf, type Mood } from "@/lib/professor";
import { playCombo, playError, playKey, playWin, soundSettings } from "@/lib/sound";
import { generateStudy, type StudyItem } from "@/lib/study.functions";
import {
  adaptiveRoute,
  coachingTip,
  generateText,
  loadKeyStats,
  loadNum,
  loadSessions,
  saveKeyStats,
  saveNum,
  saveSession,
  sessionsToday,
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
          "Digitação por toque com vocabulário jurídico, teclado ABNT2 completo, modo adaptativo inteligente e um professor implacável.",
      },
      { property: "og:title", content: "LexType — Treino de Digitação Jurídica" },
      {
        property: "og:description",
        content: "Digitação por toque para advogados e juízes: teclas-alvo, modo adaptativo, estudos jurídicos avançados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type FullMode = Mode | "estudos";

const MODES: { id: FullMode; label: string; hint: string }[] = [
  { id: "automatico", label: "⚡ Automático", hint: "O professor detecta suas fraquezas e ajusta rota e dificuldade" },
  { id: "estudos", label: "🎓 Estudos avançados", hint: "Digite linhas de uma área do Direito e aprenda viradas de chave" },
  { id: "aquecimento", label: "Aquecimento", hint: "Bigramas e trigramas com as teclas-alvo" },
  { id: "palavras", label: "Palavras jurídicas", hint: "Termos do Direito filtrados pelas teclas" },
  { id: "frases", label: "Frases", hint: "Frases jurídicas completas" },
];

const AREAS = [
  "Processo Civil", "Direito Civil", "Direito Penal", "Processo Penal", "Constitucional",
  "Administrativo", "Tributário", "Trabalho", "Empresarial", "Consumidor",
];

const FALLBACK_STUDY: StudyItem[] = [
  {
    linha: "o juiz homologou os cálculos e extinguiu a execução por sentença",
    termo: "sentença",
    semantica: "Pronunciamento judicial que, com fundamento nos arts. 485 ou 487 do CPC, põe fim à fase cognitiva ou extingue a execução (art. 203, §1º).",
    virada: {
      titulo: "Natureza do ato judicial",
      raciocinio: "A natureza de um ato judicial é definida pelo seu conteúdo (arts. 485/487 do CPC) e pela sua finalidade (encerrar ou não a fase processual), jamais pelo nome que o juiz lhe deu.",
      exemplo: "O juiz redige \"Despacho: homologo os cálculos e dou por satisfeita a execução.\" Não é despacho, é sentença. Cabe Apelação, não Agravo. Quem agrava perde o prazo da Apelação.",
    },
  },
];

interface Engine {
  text: string;
  pos: number;
  errors: number;
  errorMap: Record<string, number>;
  hitMap: Record<string, number>;
  timeMap: Record<string, number>;
  timedMap: Record<string, number>;
  combo: number;
  maxCombo: number;
  startedAt: number | null;
  lastAt: number | null;
  errStreak: number;
  wrongAt: number | null;
}

const newEngine = (text: string): Engine => ({
  text, pos: 0, errors: 0, errorMap: {}, hitMap: {}, timeMap: {}, timedMap: {},
  combo: 0, maxCombo: 0, startedAt: null, lastAt: null, errStreak: 0, wrongAt: null,
});

interface SessionResult {
  wpm: number;
  accuracy: number;
  errors: number;
  maxCombo: number;
  xp: number;
  levelChange: number;
  study?: StudyItem;
}

const COMBO_MILESTONES = [10, 25, 50, 75, 100, 150, 200];
const DAILY_GOAL = 5;

function Index() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(KEY_GROUPS.Central!);
  const [mode, setMode] = useState<FullMode>("automatico");
  const [area, setArea] = useState(AREAS[0]!);
  const eng = useRef<Engine>(newEngine(""));
  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<SessionResult | null>(null);
  const [keyStats, setKeyStats] = useState<KeyStats>({});
  const [streak, setStreak] = useState(0);
  const [today, setToday] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(3);
  const [route, setRoute] = useState<{ target: string[]; detected: string[] } | null>(null);
  const [quote, setQuote] = useState<{ text: string; mood: Mood; id: number }>({ text: "", mood: "start", id: 0 });
  const [flash, setFlash] = useState<{ key: string; type: "ok" | "err" } | null>(null);
  const [comboPulse, setComboPulse] = useState(0);
  const [muted, setMuted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [studyQueue, setStudyQueue] = useState<StudyItem[]>([]);
  const [currentStudy, setCurrentStudy] = useState<StudyItem | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);
  const [studyError, setStudyError] = useState<string | null>(null);
  const seenTerms = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const composing = useRef(false);
  const consumed = useRef(0);
  const fetchStudy = useServerFn(generateStudy);

  const say = useCallback((mood: Mood, vars?: { k?: string; n?: number }) => {
    setQuote((q) => ({ text: professorSays(mood, vars), mood, id: q.id + 1 }));
  }, []);

  const loadText = useCallback(
    (text: string) => {
      eng.current = newEngine(text);
      consumed.current = 0;
      if (inputRef.current) inputRef.current.value = "";
      setElapsed(0);
      setRunning(false);
      setResult(null);
      rerender();
    },
    [],
  );

  const nextStudy = useCallback(
    async (queue: StudyItem[], keys: string[], ar: string) => {
      if (queue.length) {
        const [item, ...rest] = queue;
        setStudyQueue(rest);
        setCurrentStudy(item!);
        loadText(item!.linha);
        return;
      }
      setStudyLoading(true);
      setStudyError(null);
      loadText("");
      try {
        const r = await fetchStudy({ data: { area: ar, keys, seen: seenTerms.current.slice(-20) } });
        const items = r.itens.length ? r.itens : FALLBACK_STUDY;
        if (r.error) setStudyError(`${r.error} Usando conteúdo offline.`);
        items.forEach((i) => seenTerms.current.push(i.termo));
        const [item, ...rest] = items;
        setStudyQueue(rest);
        setCurrentStudy(item!);
        loadText(item!.linha);
      } catch {
        setStudyError("Sem conexão com a IA. Usando conteúdo offline.");
        setCurrentStudy(FALLBACK_STUDY[0]!);
        loadText(FALLBACK_STUDY[0]!.linha);
      } finally {
        setStudyLoading(false);
      }
    },
    [fetchStudy, loadText],
  );

  const reset = useCallback(
    (m: FullMode, keys: string[], stats: KeyStats, lvl: number, opts?: { area?: string; freshStudy?: boolean }) => {
      if (m === "estudos") {
        const q = opts?.freshStudy ? [] : studyQueue;
        void nextStudy(q, keys, opts?.area ?? area);
        return;
      }
      setCurrentStudy(null);
      if (m === "automatico") {
        const r = adaptiveRoute(keys, stats);
        setRoute(r);
        loadText(generateText({ mode: "palavras", keys: r.target, weak: r.weak, level: lvl }));
      } else {
        setRoute(null);
        loadText(generateText({ mode: m, keys, weak: weakestKeys(stats, keys), level: lvl }));
      }
    },
    [area, loadText, nextStudy, studyQueue],
  );

  // Carrega progresso e gera o primeiro texto somente no navegador (evita divergência de hidratação).
  useEffect(() => {
    const st = loadKeyStats();
    const lvl = loadNum("lextype-level", 3);
    setKeyStats(st);
    setStreak(streakDays());
    setToday(sessionsToday());
    setBestWpm(Math.max(0, ...loadSessions().map((s) => s.wpm)));
    setXp(loadNum("lextype-xp", 0));
    setLevel(lvl);
    const m = localStorage.getItem("lextype-muted") === "1";
    setMuted(m);
    soundSettings.enabled = !m;
    reset("automatico", KEY_GROUPS.Central!, st, lvl);
    say("start");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const s = eng.current.startedAt;
      if (s) setElapsed((Date.now() - s) / 1000);
    }, 250);
    return () => clearInterval(t);
  }, [running]);

  const finish = useCallback(() => {
    const e = eng.current;
    const now = Date.now();
    setRunning(false);
    const len = e.text.length;
    const minutes = (now - (e.startedAt ?? now)) / 60000;
    const wpm = Math.max(0, Math.round(len / 5 / Math.max(minutes, 0.01)));
    const accuracy = Math.max(0, Math.round((len / (len + e.errors)) * 100));

    const stats = loadKeyStats();
    const keys = new Set([...Object.keys(e.hitMap), ...Object.keys(e.errorMap)]);
    for (const k of keys) {
      const s = (stats[k] ??= { attempts: 0, errors: 0, time: 0, timed: 0 });
      s.attempts += (e.hitMap[k] ?? 0) + (e.errorMap[k] ?? 0);
      s.errors += e.errorMap[k] ?? 0;
      s.time = (s.time ?? 0) + (e.timeMap[k] ?? 0);
      s.timed = (s.timed ?? 0) + (e.timedMap[k] ?? 0);
    }
    saveKeyStats(stats);
    setKeyStats(stats);

    let levelChange = 0;
    if (mode === "automatico") {
      if (accuracy >= 96 && wpm >= 12 + level * 3) levelChange = 1;
      else if (accuracy < 88) levelChange = -1;
      const nl = Math.min(10, Math.max(1, level + levelChange));
      if (nl === level) levelChange = 0;
      setLevel(nl);
      saveNum("lextype-level", nl);
    }

    const gained = Math.round(len * (accuracy / 100) * (1 + e.maxCombo / 40) * (mode === "automatico" ? 1 + level / 10 : 1));
    const newXp = xp + gained;
    setXp(newXp);
    saveNum("lextype-xp", newXp);
    saveSession({ date: new Date().toISOString(), wpm, accuracy });
    setStreak(streakDays());
    setToday(sessionsToday());
    setBestWpm((b) => Math.max(b, wpm));

    setResult({ wpm, accuracy, errors: e.errors, maxCombo: e.maxCombo, xp: gained, levelChange, study: currentStudy ?? undefined });
    playWin();
    if (levelChange > 0) say("levelUp");
    else if (levelChange < 0) say("levelDown");
    else say(accuracy >= 96 ? "finishGreat" : accuracy >= 90 ? "finishOk" : "finishBad");
  }, [currentStudy, level, mode, say, xp]);

  const processChar = useCallback(
    (ch: string) => {
      const e = eng.current;
      if (result || !e.text || e.pos >= e.text.length) return;
      const expected = e.text[e.pos]!;
      const now = Date.now();
      if (!e.startedAt) {
        e.startedAt = now;
        e.lastAt = now;
        setRunning(true);
      }
      const correct = ch === expected || strip(ch).toLowerCase() === strip(expected).toLowerCase();
      const keys = charToKeys(expected);
      if (correct) {
        const dt = now - (e.lastAt ?? now);
        for (const k of keys) {
          e.hitMap[k] = (e.hitMap[k] ?? 0) + 1;
          if (dt > 0 && dt < 3000) {
            e.timeMap[k] = (e.timeMap[k] ?? 0) + dt;
            e.timedMap[k] = (e.timedMap[k] ?? 0) + 1;
          }
        }
        e.lastAt = now;
        e.pos++;
        e.combo++;
        e.errStreak = 0;
        e.wrongAt = null;
        e.maxCombo = Math.max(e.maxCombo, e.combo);
        playKey();
        if (COMBO_MILESTONES.includes(e.combo) || (e.combo > 200 && e.combo % 50 === 0)) {
          playCombo();
          setComboPulse((p) => p + 1);
          say("combo", { n: e.combo });
        }
        setFlash(null);
        if (e.pos >= e.text.length) finish();
      } else {
        e.errors++;
        for (const k of keys) e.errorMap[k] = (e.errorMap[k] ?? 0) + 1;
        e.combo = 0;
        e.errStreak++;
        e.wrongAt = e.pos;
        playError();
        setFlash({ key: keys[keys.length - 1]!, type: "err" });
        if (e.errStreak === 3) say("errorStreak");
        else if (e.errStreak === 1 && Math.random() < 0.45) say("error", { k: expected });
      }
      rerender();
    },
    [finish, result, say],
  );

  const handleInput = (el: HTMLInputElement, final: boolean) => {
    const v = el.value;
    if (v.length < consumed.current) {
      consumed.current = v.length;
      return;
    }
    let fresh = v.slice(consumed.current);
    // Durante composição, uma tecla morta (´ ~ ^ `) fica pendente até a vogal chegar.
    if (!final && composing.current && /[´`~^¨]$/.test(fresh)) fresh = fresh.slice(0, -1);
    for (const ch of fresh) processChar(ch);
    consumed.current += fresh.length;
    if (final || !composing.current) {
      el.value = "";
      consumed.current = 0;
    }
  };

  // Qualquer tecla fora de um campo traz o foco para a área de digitação.
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const t = ev.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA") return;
      if (ev.key === "Enter" && result) {
        ev.preventDefault();
        reset(mode, selectedKeys, keyStats, level);
        return;
      }
      if (ev.key.length === 1 && !ev.metaKey && !ev.ctrlKey) inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyStats, level, mode, reset, result, selectedKeys]);

  const applyKeys = (keys: string[]) => {
    setSelectedKeys(keys);
    if (mode !== "estudos") reset(mode, keys, keyStats, level);
  };
  const toggleKey = (k: string) =>
    applyKeys(selectedKeys.includes(k) ? selectedKeys.filter((x) => x !== k) : [...selectedKeys, k]);
  const toggleGroup = (g: string[]) => {
    const allOn = g.every((k) => selectedKeys.includes(k));
    applyKeys(allOn ? selectedKeys.filter((k) => !g.includes(k)) : [...new Set([...selectedKeys, ...g])]);
  };
  const changeMode = (m: FullMode) => {
    setMode(m);
    reset(m, selectedKeys, keyStats, level, { freshStudy: true });
  };
  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    soundSettings.enabled = !m;
    localStorage.setItem("lextype-muted", m ? "1" : "0");
  };

  const e = eng.current;
  const pos = e.pos;
  const liveWpm = e.startedAt && pos > 0 && elapsed > 0 ? Math.round(pos / 5 / (elapsed / 60)) : 0;
  const liveAcc = pos > 0 ? Math.round((pos / (pos + e.errors)) * 100) : 100;
  const nextKeys = !result && e.text[pos] ? charToKeys(e.text[pos]!) : [];
  const weak = useMemo(() => weakestKeys(keyStats, TRAINABLE_KEYS, 3), [keyStats]);
  const rank = rankOf(xp);
  const inFlow = running && !result;
  const progress = e.text.length ? pos / e.text.length : 0;

  return (
    <div className="min-h-screen bg-background">
      {result && result.accuracy >= 90 && <Confetti key={quote.id} />}
      <header className={cn("border-b border-border transition-opacity duration-500", inFlow && "opacity-25 hover:opacity-100")}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-mono-type text-lg font-bold text-gold-foreground">§</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">LexType</h1>
              <p className="text-xs text-muted-foreground">Digitação por toque para o Direito</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm sm:gap-6">
            <div className="min-w-36">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gold">{rank.name}</span>
                <span className="font-mono-type text-muted-foreground">{xp} XP</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-gold transition-all duration-700" style={{ width: `${rank.progress * 100}%` }} />
              </div>
              {rank.next && <div className="mt-0.5 text-[0.65rem] text-muted-foreground">próx.: {rank.next}</div>}
            </div>
            <div className="text-center">
              <div className="flex gap-1">
                {Array.from({ length: DAILY_GOAL }, (_, i) => (
                  <span key={i} className={cn("h-2.5 w-2.5 rounded-full", i < today ? "bg-success" : "bg-secondary")} />
                ))}
              </div>
              <div className="mt-1 text-[0.65rem] text-muted-foreground">meta do dia</div>
            </div>
            <Stat value={`${streak}🔥`} label="dias" gold />
            <Stat value={bestWpm} label="melhor PPM" />
            <button
              onClick={toggleMute}
              className="rounded-md border border-border px-2 py-1 text-base"
              aria-label={muted ? "Ativar som" : "Silenciar"}
              title={muted ? "Ativar som" : "Silenciar"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {/* Modos */}
        <div className={cn("flex flex-wrap gap-2 transition-opacity duration-500", inFlow && "opacity-25 hover:opacity-100")}>
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => changeMode(m.id)}
              title={m.hint}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                mode === m.id ? "border-gold bg-gold text-gold-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Professor */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-card text-2xl" title="Prof. Dr. Rigoroso">
            👨‍⚖️
          </div>
          <div
            key={quote.id}
            className={cn(
              "animate-pop-in relative rounded-xl rounded-tl-none border px-4 py-2.5 text-sm",
              ["error", "errorStreak", "finishBad", "levelDown"].includes(quote.mood)
                ? "border-destructive/50 bg-destructive/10"
                : ["combo", "finishGreat", "levelUp"].includes(quote.mood)
                  ? "border-success/50 bg-success/10"
                  : "border-border bg-card",
            )}
          >
            <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold">Prof. Dr. Rigoroso</div>
            {quote.text || "…"}
          </div>
        </div>

        {/* Info do modo */}
        {mode === "automatico" && route && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm">
            <span>
              Nível <span className="font-mono-type font-bold text-gold">{level}/10</span>
            </span>
            <span className="flex items-center gap-2">
              Rota atual:
              <span className="font-mono-type font-bold uppercase tracking-widest text-gold">{route.target.join(" ")}</span>
            </span>
            {route.detected.length > 0 && (
              <span className="text-muted-foreground">
                detectadas pelo professor: <span className="font-mono-type uppercase text-destructive">{route.detected.join(" ")}</span>
              </span>
            )}
          </div>
        )}
        {mode === "estudos" && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm">
            <label htmlFor="area" className="font-medium">Área do Direito:</label>
            <select
              id="area"
              value={area}
              onChange={(ev) => {
                setArea(ev.target.value);
                setStudyQueue([]);
                void nextStudy([], selectedKeys, ev.target.value);
              }}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
            >
              {AREAS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <span className="text-xs text-muted-foreground">Termine a linha para receber a semântica do termo e uma virada de chave.</span>
            {studyError && <span className="text-xs text-destructive">{studyError}</span>}
          </div>
        )}

        {/* Área de digitação */}
        <section
          className={cn(
            "relative rounded-xl border bg-card p-5 transition-shadow sm:p-8",
            focused ? "border-gold/50 ring-2 ring-ring/30" : "border-border",
          )}
        >
          {result ? (
            <ResultView
              result={result}
              weak={weak}
              onNext={() => reset(mode, selectedKeys, keyStats, level)}
            />
          ) : (
            <>
              <div className="mb-2 h-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-gold transition-all duration-150" style={{ width: `${progress * 100}%` }} />
              </div>
              <div className="mb-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono-type text-sm">
                <span className="text-muted-foreground">PPM <span className="font-bold text-gold">{liveWpm}</span></span>
                <span className="text-muted-foreground">Precisão <span className="font-bold text-foreground">{liveAcc}%</span></span>
                <span className="text-muted-foreground">Tempo <span className="font-bold text-foreground">{elapsed.toFixed(0)}s</span></span>
                <span key={comboPulse} className={cn("animate-combo text-muted-foreground", e.combo >= 10 && "text-gold")}>
                  Combo <span className="font-bold">{e.combo}</span>
                  {e.combo >= 25 ? " 🔥" : ""}
                  {e.combo >= 50 ? "🔥" : ""}
                </span>
              </div>
              {studyLoading ? (
                <p className="py-6 text-center text-muted-foreground">O professor está preparando a aula de {area}…</p>
              ) : (
                <p className="font-mono-type text-xl leading-relaxed tracking-wide sm:text-2xl">
                  {e.text.split("").map((ch, i) => (
                    <span
                      key={i}
                      className={cn(
                        i < pos && "text-muted-foreground/40",
                        i === pos && (e.wrongAt === i ? "rounded-sm bg-destructive/40 text-destructive-foreground animate-shake" : "rounded-sm bg-gold/30 text-gold animate-caret"),
                        i > pos && "text-foreground",
                      )}
                    >
                      {ch === " " && i === pos ? "␣" : ch}
                    </span>
                  ))}
                </p>
              )}
              <p className="mt-5 text-center text-xs text-muted-foreground">
                {focused ? "Errou? Você só avança quando acertar a tecla." : "Toque ou clique aqui e comece a digitar"}
              </p>
              <input
                ref={inputRef}
                aria-label="Área de digitação"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="next"
                className="absolute inset-0 h-full w-full cursor-text opacity-0"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onCompositionStart={() => (composing.current = true)}
                onCompositionEnd={(ev) => {
                  composing.current = false;
                  handleInput(ev.currentTarget, true);
                }}
                onInput={(ev) => handleInput(ev.currentTarget, false)}
              />
            </>
          )}
        </section>

        {/* Teclado */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <Keyboard nextKeys={nextKeys} stats={keyStats} selectedKeys={[]} flash={flash} />
          <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
            <Legend cls="bg-success/40" label="dominada" />
            <Legend cls="bg-gold/30" label="em progresso" />
            <Legend cls="bg-destructive/40" label="precisa de treino" />
          </div>
        </section>

        {/* Seleção de teclas */}
        <section className={cn("rounded-xl border border-border bg-card p-4 transition-opacity duration-500 sm:p-6", inFlow && "opacity-25 hover:opacity-100")}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {mode === "automatico" ? "Marque as teclas em que você tem mais dificuldade" : "Teclas-alvo do treino"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(KEY_GROUPS).map(([name, g]) => (
                <button
                  key={name}
                  onClick={() => toggleGroup(g)}
                  className={cn(
                    "rounded-md border px-3 py-1 text-xs font-medium transition-colors",
                    g.every((k) => selectedKeys.includes(k)) ? "border-gold bg-gold/15 text-gold" : "border-border bg-secondary text-secondary-foreground hover:text-gold",
                  )}
                >
                  {name}
                </button>
              ))}
              <button onClick={() => applyKeys(TRAINABLE_KEYS)} className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-medium hover:text-gold">
                Todas
              </button>
              <button onClick={() => applyKeys([])} className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-medium hover:text-destructive">
                Limpar
              </button>
            </div>
          </div>
          <Keyboard stats={keyStats} selectedKeys={selectedKeys} onToggle={toggleKey} compact />
        </section>
      </main>
    </div>
  );
}

function Stat({ value, label, gold }: { value: string | number; label: string; gold?: boolean }) {
  return (
    <div className="text-center">
      <div className={cn("font-mono-type font-bold", gold && "text-gold")}>{value}</div>
      <div className="text-[0.65rem] text-muted-foreground">{label}</div>
    </div>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("h-3 w-3 rounded-sm", cls)} /> {label}
    </span>
  );
}

function ResultView({ result, weak, onNext }: { result: SessionResult; weak: string[]; onNext: () => void }) {
  return (
    <div className="animate-pop-in space-y-6 text-center">
      <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
        <Big value={result.wpm} label="PPM" cls="text-gold text-glow-gold" />
        <Big value={`${result.accuracy}%`} label="Precisão" />
        <Big value={result.errors} label="Erros" cls="text-destructive" />
        <Big value={result.maxCombo} label="Maior combo" />
        <Big value={`+${result.xp}`} label="XP" cls="text-success" />
      </div>
      {result.levelChange !== 0 && (
        <p className={cn("text-sm font-semibold", result.levelChange > 0 ? "text-success" : "text-destructive")}>
          {result.levelChange > 0 ? "▲ Subiu de nível — a próxima rota será mais pesada" : "▼ Nível reduzido — de volta ao básico"}
        </p>
      )}

      {result.study && (
        <div className="mx-auto max-w-2xl space-y-4 rounded-xl border border-gold/40 bg-gold/5 p-5 text-left">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold">Semântica</div>
            <p className="mt-1 text-sm">
              <span className="font-mono-type font-bold">{result.study.termo}</span> — {result.study.semantica}
            </p>
          </div>
          <div className="border-t border-gold/20 pt-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-gold">Virada de chave · {result.study.virada.titulo}</div>
            <p className="mt-2 text-sm"><span className="font-semibold">Raciocínio: </span>{result.study.virada.raciocinio}</p>
            <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Exemplo: </span>{result.study.virada.exemplo}</p>
          </div>
        </div>
      )}

      {!result.study && (
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-gold">Parecer técnico: </span>
          {coachingTip(weak)}
        </p>
      )}
      {weak.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Teclas que precisam de atenção:{" "}
          <span className="font-mono-type font-bold uppercase text-destructive">{weak.join("  ")}</span>
        </p>
      )}
      <button
        onClick={onNext}
        className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground transition-transform hover:scale-105"
      >
        Próxima sessão <span className="opacity-60">(Enter)</span>
      </button>
    </div>
  );
}

function Big({ value, label, cls }: { value: string | number; label: string; cls?: string }) {
  return (
    <div>
      <div className={cn("font-mono-type text-4xl font-bold sm:text-5xl", cls)}>{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        size: 6 + Math.random() * 6,
        cls: ["bg-gold", "bg-success", "bg-primary", "bg-destructive"][i % 4],
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className={cn("animate-confetti absolute top-0 rounded-sm", p.cls)}
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.5, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}
