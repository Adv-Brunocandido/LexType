import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { Keyboard, type KeyboardScale } from "@/components/Keyboard";
import { KEY_GROUPS, TRAINABLE_KEYS, charToKeys, strip, type KeyboardLayout } from "@/lib/abnt2";
import { professorSays, rankOf, type Mood } from "@/lib/professor";
import {
  playCombo,
  playError,
  playKey,
  playWin,
  setSoundProfile,
  soundSettings,
  SOUND_PROFILES,
  type SoundProfile,
} from "@/lib/sound";
import { generateStudy, type StudyItem } from "@/lib/study.functions";
import { offlineStudy, extractComplexLegalTerm } from "@/lib/study-offline";
import { LeiSecaPanel } from "@/components/LeiSecaPanel";
import { MovableCard } from "@/components/MovableCard";
import type { LeiSecaItem } from "@/lib/lei-seca";
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
  applyModifiers,
  calibrateStudyLine,
  calculateGainedXp,
  type TextModifiers,
  type KeyStats,
  type Mode,
} from "@/lib/typing";
import { cn } from "@/lib/utils";
import {
  type Engine,
  newEngine,
  typeChar,
  backspace,
  restartLine,
  isComplete,
  pendingErrors,
} from "@/lib/engine";

export type ThemeMode = "dark" | "light" | "sepia" | "oled" | "aquarela";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LexType — Treino de Digitação Jurídica" },
      {
        name: "description",
        content:
          "Digitação por toque com vocabulário jurídico, teclado ABNT2/ANSI, modo adaptativo inteligente e estudos jurídicos com viradas de chave.",
      },
      { property: "og:title", content: "LexType — Treino de Digitação Jurídica" },
      {
        property: "og:description",
        content:
          "Digitação por toque para advogados e juízes: teclas-alvo, modo adaptativo, estudos jurídicos avançados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type FullMode = Mode | "estudos";

const MODES: { id: FullMode; label: string; hint: string }[] = [
  {
    id: "automatico",
    label: "⚡ Automático",
    hint: "O professor detecta suas fraquezas e ajusta rota e dificuldade",
  },
  {
    id: "estudos",
    label: "🎓 Estudos avançados",
    hint: "Digite linhas de uma área do Direito e aprenda viradas de chave",
  },
  { id: "aquecimento", label: "Aquecimento", hint: "Bigramas e trigramas com as teclas-alvo" },
  { id: "palavras", label: "Palavras jurídicas", hint: "Termos do Direito filtrados pelas teclas" },
  { id: "frases", label: "Frases", hint: "Frases jurídicas completas" },
];

// Matérias do Exame da OAB (1ª fase).
const AREAS = [
  "Ética Profissional (Estatuto da OAB)",
  "Filosofia do Direito",
  "Direitos Humanos",
  "Direito Constitucional",
  "Direito Eleitoral",
  "Direito Internacional",
  "Direito Financeiro",
  "Direito Tributário",
  "Direito Administrativo",
  "Direito Ambiental",
  "Direito Civil",
  "Estatuto da Criança e do Adolescente",
  "Direito do Consumidor",
  "Direito Empresarial",
  "Direito Processual Civil",
  "Direito Penal",
  "Direito Processual Penal",
  "Direito Previdenciário",
  "Direito do Trabalho",
  "Direito Processual do Trabalho",
];
const CUSTOM = "__custom__";

interface Prefs {
  stopOnError: boolean;
  caps: boolean;
  punct: boolean;
  symbols: boolean;
}
const DEFAULT_PREFS: Prefs = { stopOnError: true, caps: false, punct: false, symbols: false };
const DAILY_SECONDS = 300;
const todayKey = () => `lextype-practice-${new Date().toISOString().slice(0, 10)}`;

interface SessionResult {
  wpm: number;
  accuracy: number;
  errors: number;
  maxCombo: number;
  xp: number;
  levelChange: number;
  bonus: number;
  study?: StudyItem;
}

const COMBO_MILESTONES = [10, 25, 50, 75, 100, 150, 200];

const TYPING_FONT_CLASSES: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-2xl sm:text-3xl",
  xl: "text-3xl sm:text-4xl",
};

const STUDY_FONT_CLASSES: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm: "text-xs sm:text-sm leading-relaxed",
  md: "text-sm sm:text-base leading-relaxed",
  lg: "text-base sm:text-lg leading-relaxed",
  xl: "text-lg sm:text-xl leading-relaxed",
};

function Index() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(KEY_GROUPS.Central);
  const [mode, setMode] = useState<FullMode>("automatico");
  const [area, setArea] = useState(AREAS[0]!);
  const [customArea, setCustomArea] = useState("");
  const [lineCount, setLineCount] = useState<number>(() => {
    if (typeof localStorage === "undefined") return 2;
    try {
      const s = localStorage.getItem("lextype-lines");
      if (s) {
        const n = parseInt(s, 10);
        if (!isNaN(n) && n >= 1 && n <= 10) return n;
      }
    } catch {}
    return 2;
  });
  const [reference, setReference] = useState<{
    name: string;
    text: string;
    sentences: string[];
    activeSentenceIdx: number;
  } | null>(null);
  const [repeat, setRepeat] = useState(false);
  const [pinned, setPinned] = useState<StudyItem | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<"treino" | "leiseca" | "desempenho">("treino");

  // Ordem das caixas movíveis e reposicionáveis na tela
  const [boxOrder, setBoxOrder] = useState<string[]>(() => {
    if (typeof localStorage === "undefined") return ["typing", "lesson", "keyboard", "keys"];
    try {
      const s = localStorage.getItem("lextype-box-order");
      if (s) {
        const p = JSON.parse(s);
        if (Array.isArray(p) && p.length >= 2) return p;
      }
    } catch {}
    return ["typing", "lesson", "keyboard", "keys"];
  });

  const moveBox = (id: string, dir: "up" | "down") => {
    setBoxOrder((prev) => {
      const idx = prev.indexOf(id);
      if (idx === -1) return prev;
      const target = dir === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const item = next[idx]!;
      next[idx] = next[target]!;
      next[target] = item;
      localStorage.setItem("lextype-box-order", JSON.stringify(next));
      return next;
    });
  };

  const resetBoxes = () => {
    const def = ["typing", "lesson", "keyboard", "keys"];
    setBoxOrder(def);
    localStorage.setItem("lextype-box-order", JSON.stringify(def));
  };

  // Tamanhos de fonte individuais por caixa
  const [fontTyping, setFontTyping] = useState<"sm" | "md" | "lg" | "xl">(() => {
    if (typeof localStorage === "undefined") return "md";
    return (localStorage.getItem("lextype-font-typing") as any) || "md";
  });
  const [fontStudy, setFontStudy] = useState<"sm" | "md" | "lg" | "xl">(() => {
    if (typeof localStorage === "undefined") return "md";
    return (localStorage.getItem("lextype-font-study") as any) || "md";
  });

  // Layout modular desacoplado (lado a lado vs empilhado)
  const [layoutSplit, setLayoutSplit] = useState<boolean>(() => {
    if (typeof localStorage === "undefined") return false;
    return localStorage.getItem("lextype-layout-split") === "1";
  });

  // Perfil de som de teclado mecânico
  const [soundProfile, setSoundProfileState] = useState<SoundProfile>(() => soundSettings.profile);

  // Configurações locais de IA
  const [aiProvider, setAiProvider] = useState<"gemini" | "openai" | "lovable">(() => {
    if (typeof localStorage === "undefined") return "gemini";
    return (localStorage.getItem("lextype-ai-provider") as any) || "gemini";
  });
  const [aiKey, setAiKey] = useState<string>(() => {
    if (typeof localStorage === "undefined") return "";
    return localStorage.getItem("lextype-ai-key") || "";
  });

  // Customizações de visual e teclado
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof localStorage === "undefined") return "dark";
    return (localStorage.getItem("lextype-theme") as ThemeMode) || "dark";
  });
  const [keyboardLayout, setKeyboardLayout] = useState<KeyboardLayout>(() => {
    if (typeof localStorage === "undefined") return "abnt2";
    return (localStorage.getItem("lextype-layout") as KeyboardLayout) || "abnt2";
  });
  const [keyboardMode, setKeyboardMode] = useState<"heatmap" | "rainbow">(() => {
    if (typeof localStorage === "undefined") return "heatmap";
    return (localStorage.getItem("lextype-keyboard-mode") as any) || "heatmap";
  });
  const [uiScale, setUiScale] = useState<KeyboardScale>(() => {
    if (typeof localStorage === "undefined") return "normal";
    return (localStorage.getItem("lextype-scale") as KeyboardScale) || "normal";
  });

  const [prefs, setPrefs] = useState<Prefs>(() => {
    if (typeof localStorage === "undefined") return DEFAULT_PREFS;
    try {
      const p = localStorage.getItem("lextype-prefs");
      return p ? { ...DEFAULT_PREFS, ...JSON.parse(p) } : DEFAULT_PREFS;
    } catch {
      return DEFAULT_PREFS;
    }
  });
  const prefsRef = useRef(prefs);
  prefsRef.current = prefs;

  const [practiceToday, setPracticeToday] = useState(0);
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
  const [quote, setQuote] = useState<{ text: string; mood: Mood; id: number }>({
    text: "",
    mood: "start",
    id: 0,
  });
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
  const goNextRef = useRef<() => void>(() => {});
  const composing = useRef(false);
  const consumed = useRef(0);
  const fetchStudy = useServerFn(generateStudy);
  const effectiveArea = area === CUSTOM ? customArea.trim() || "Direito em geral" : area;

  const say = useCallback((mood: Mood, vars?: { k?: string; n?: number }) => {
    setQuote((q) => ({ text: professorSays(mood, vars), mood, id: q.id + 1 }));
  }, []);

  const loadText = useCallback((text: string) => {
    const cleanText = text
      .replace(/[\u00A0\u200B]/g, " ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
    eng.current = newEngine(cleanText);
    consumed.current = 0;
    if (inputRef.current) inputRef.current.value = "";
    setElapsed(0);
    setRunning(false);
    setResult(null);
    setFlash(null);
    rerender();
  }, []);

  const enrichText = useCallback((text: string, p: Prefs) => {
    const modifiers: TextModifiers = {
      capitals: p.caps,
      punctuation: p.punct,
      symbols: p.symbols,
    };
    return applyModifiers(text, modifiers);
  }, []);

  const nextStudy = useCallback(
    async (queue: StudyItem[], keys: string[], ar: string, countOverride?: number) => {
      const activeCount = countOverride ?? lineCount;
      if (queue.length) {
        if (activeCount > 1 && queue.length >= 2) {
          const batch = queue.slice(0, activeCount);
          const rest = queue.slice(activeCount);
          setStudyQueue(rest);
          setCurrentStudy(batch[0]!);
          loadText(batch.map((b) => b.linha).join(" "));
          return;
        }
        const [item, ...rest] = queue;
        setStudyQueue(rest);
        setCurrentStudy(item!);
        const lineToLoad = activeCount === 1 ? calibrateStudyLine(item!.linha, 1) : item!.linha;
        loadText(lineToLoad);
        return;
      }
      setStudyLoading(true);
      setStudyError(null);
      loadText("");
      try {
        const r = await fetchStudy({
          data: {
            area: ar,
            keys,
            seen: seenTerms.current.slice(-20),
            count: activeCount,
            reference: reference?.text,
            userApiKey: aiKey || undefined,
            userApiProvider: aiProvider || undefined,
          },
        });
        const items = r.itens.length
          ? r.itens
          : offlineStudy(ar, activeCount, seenTerms.current, reference?.text);
        if (r.error || !r.itens.length)
          setStudyError(`${r.error ?? "IA indisponível."} Usando o banco offline do professor.`);
        items.forEach((i) => seenTerms.current.push(i.termo));
        if (activeCount > 1 && items.length >= 2) {
          const batch = items.slice(0, activeCount);
          const rest = items.slice(activeCount);
          setStudyQueue(rest);
          setCurrentStudy(batch[0]!);
          loadText(batch.map((b) => b.linha).join(" "));
        } else {
          const [item, ...rest] = items;
          setStudyQueue(rest);
          setCurrentStudy(item!);
          const lineToLoad = activeCount === 1 ? calibrateStudyLine(item!.linha, 1) : item!.linha;
          loadText(lineToLoad);
        }
      } catch {
        setStudyError("Sem conexão com a IA. Usando o banco offline do professor.");
        const items = offlineStudy(ar, activeCount, seenTerms.current);
        items.forEach((i) => seenTerms.current.push(i.termo));
        if (activeCount > 1 && items.length >= 2) {
          const batch = items.slice(0, activeCount);
          const rest = items.slice(activeCount);
          setStudyQueue(rest);
          setCurrentStudy(batch[0]!);
          loadText(batch.map((b) => b.linha).join(" "));
        } else {
          const [item, ...rest] = items;
          setStudyQueue(rest);
          setCurrentStudy(item!);
          const lineToLoad = activeCount === 1 ? calibrateStudyLine(item!.linha, 1) : item!.linha;
          loadText(lineToLoad);
        }
      } finally {
        setStudyLoading(false);
      }
    },
    [fetchStudy, loadText, lineCount, reference, aiKey, aiProvider],
  );

  const reset = useCallback(
    (
      m: FullMode,
      keys: string[],
      stats: KeyStats,
      lvl: number,
      opts?: { area?: string; freshStudy?: boolean; lines?: number },
    ) => {
      const activeLines = opts?.lines ?? lineCount;
      if (m === "estudos") {
        const q = opts?.freshStudy ? [] : studyQueue;
        void nextStudy(q, keys, opts?.area ?? effectiveArea, activeLines);
        return;
      }
      setCurrentStudy(null);
      if (m === "automatico") {
        const r = adaptiveRoute(keys, stats);
        setRoute(r);
        loadText(
          enrichText(
            generateText({ mode: "palavras", keys: r.target, weak: r.weak, level: lvl, lines: activeLines }),
            prefsRef.current,
          ),
        );
      } else {
        setRoute(null);
        loadText(
          enrichText(
            generateText({ mode: m, keys, weak: weakestKeys(stats, keys), level: lvl, lines: activeLines }),
            prefsRef.current,
          ),
        );
      }
    },
    [effectiveArea, enrichText, lineCount, loadText, nextStudy, studyQueue],
  );

  useEffect(() => {
    const st = loadKeyStats();
    const lvl = loadNum("lextype-level", 3);
    setKeyStats(st);
    setStreak(streakDays());
    setToday(sessionsToday());
    setBestWpm(Math.max(0, ...loadSessions().map((s) => s.wpm)));
    setXp(loadNum("lextype-xp", 0));
    setLevel(lvl);
    setPracticeToday(loadNum(todayKey(), 0));
    const isMuted = localStorage.getItem("lextype-muted") === "1";
    setMuted(isMuted);
    soundSettings.enabled = !isMuted;

    // Inicia o primeiro texto
    reset("automatico", KEY_GROUPS.Central, st, lvl);
    say("start");
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  // Timer de sessão
  useEffect(() => {
    if (!running || result) return;
    const id = setInterval(() => {
      if (eng.current.startedAt) {
        setElapsed((Date.now() - eng.current.startedAt) / 1000);
      }
    }, 100);
    return () => clearInterval(id);
  }, [running, result]);

  const finish = useCallback(() => {
    const e = eng.current;
    const now = Date.now();
    const minutes = Math.max(0.05, (now - (e.startedAt ?? now)) / 60000);
    const len = e.text.length;
    const wpm = Math.round(len / 5 / minutes);
    const totalHits = Object.values(e.hitMap).reduce((a, b) => a + b, 0);
    const accuracy =
      totalHits + e.errors > 0 ? Math.round((totalHits / (totalHits + e.errors)) * 100) : 100;
    setRunning(false);

    // Atualiza estatísticas persistidas
    const stats = { ...loadKeyStats() };
    const allKeys = new Set([...Object.keys(e.hitMap), ...Object.keys(e.errorMap)]);
    for (const k of allKeys) {
      const s = stats[k] ?? { attempts: 0, errors: 0 };
      s.attempts += (e.hitMap[k] ?? 0) + (e.errorMap[k] ?? 0);
      s.errors += e.errorMap[k] ?? 0;
      s.time = (s.time ?? 0) + (e.timeMap[k] ?? 0);
      s.timed = (s.timed ?? 0) + (e.timedMap[k] ?? 0);
      stats[k] = s;
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

    const secs = Math.round(minutes * 60);
    const practiced = loadNum(todayKey(), 0) + secs;
    saveNum(todayKey(), practiced);
    setPracticeToday(practiced);
    const bonus = accuracy >= 97 ? 1.5 : accuracy >= 95 ? 1.25 : 1;
    const gained = calculateGainedXp({
      length: len,
      accuracy,
      maxCombo: e.maxCombo,
      level: mode === "automatico" ? level : 1,
    });
    const newXp = xp + gained;
    setXp(newXp);
    saveNum("lextype-xp", newXp);
    saveSession({ date: new Date().toISOString(), wpm, accuracy });
    setStreak(streakDays());
    setToday(sessionsToday());
    setBestWpm((b) => Math.max(b, wpm));

    if (currentStudy) setPinned(currentStudy);
    setResult({
      wpm,
      accuracy,
      errors: e.errors,
      maxCombo: e.maxCombo,
      xp: gained,
      levelChange,
      bonus,
      ...(currentStudy ? { study: currentStudy } : {}),
    });
    playWin();
    if (levelChange > 0) say("levelUp");
    else if (levelChange < 0) say("levelDown");
    else say(accuracy >= 96 ? "finishGreat" : accuracy >= 90 ? "finishOk" : "finishBad");
  }, [currentStudy, level, mode, say, xp]);

  const processChar = useCallback(
    (ch: string) => {
      const e = eng.current;
      if (result || !e.text || e.pos >= e.text.length) return;
      const outcome = typeChar(e, ch, {
        stopOnError: prefsRef.current.stopOnError,
        caseSensitive: prefsRef.current.caps,
        layout: keyboardLayout,
        now: Date.now(),
      });

      if (outcome.started) setRunning(true);

      if (outcome.kind === "correct") {
        playKey();
        if (COMBO_MILESTONES.includes(e.combo) || (e.combo > 200 && e.combo % 50 === 0)) {
          playCombo();
          setComboPulse((p) => p + 1);
          say("combo", { n: e.combo });
        }
        setFlash(null);
        if (outcome.finished) finish();
      } else if (outcome.kind === "wrong") {
        playError();
        const errKey = outcome.keys[outcome.keys.length - 1] ?? "";
        setFlash({ key: errKey, type: "err" });
        if (e.errStreak === 3) say("errorStreak");
        else if (e.errStreak === 1 && Math.random() < 0.45) say("error", { k: outcome.expected });
      }
      rerender();
    },
    [finish, keyboardLayout, result, say],
  );

  const handleBackspace = () => {
    const e = eng.current;
    if (result) return;
    const ok = backspace(e, prefsRef.current.stopOnError);
    if (ok) {
      playKey();
      rerender();
    }
  };

  const handleRestartLine = () => {
    const e = eng.current;
    if (!e.text) return;
    restartLine(e);
    consumed.current = 0;
    if (inputRef.current) inputRef.current.value = "";
    setElapsed(0);
    setRunning(false);
    setResult(null);
    setFlash(null);
    rerender();
  };

  const handleInput = (el: HTMLInputElement, final: boolean) => {
    const v = el.value;
    if (!v) return;
    if (v.length < consumed.current) {
      consumed.current = v.length;
      return;
    }
    let fresh = v.slice(consumed.current);
    if (!final && /[´`~^¨]$/.test(fresh)) fresh = fresh.slice(0, -1);
    for (const ch of fresh) processChar(ch);
    consumed.current += fresh.length;
    if (final || !composing.current) {
      el.value = "";
      consumed.current = 0;
    }
  };

  const handleLineCountChange = useCallback(
    (updater: number | ((prev: number) => number)) => {
      setLineCount((prev) => {
        const nextVal = typeof updater === "function" ? updater(prev) : updater;
        const clamped = Math.max(1, Math.min(10, nextVal));
        if (typeof localStorage !== "undefined") {
          try {
            localStorage.setItem("lextype-lines", String(clamped));
          } catch {}
        }
        if (!running) {
          setTimeout(() => {
            reset(mode, selectedKeys, keyStats, level, { lines: clamped });
          }, 0);
        }
        return clamped;
      });
    },
    [keyStats, level, mode, reset, running, selectedKeys],
  );

  const processCharRef = useRef(processChar);
  processCharRef.current = processChar;
  const handleBackspaceRef = useRef(handleBackspace);
  handleBackspaceRef.current = handleBackspace;
  const handleRestartLineRef = useRef(handleRestartLine);
  handleRestartLineRef.current = handleRestartLine;

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const t = ev.target as HTMLElement;
      if (t.tagName === "SELECT" || t.tagName === "TEXTAREA" || (t.tagName === "INPUT" && t !== inputRef.current)) return;
      if (ev.key === "Enter" && result) {
        ev.preventDefault();
        goNextRef.current();
        return;
      }
      if (ev.key === "Backspace") {
        ev.preventDefault();
        handleBackspaceRef.current();
        return;
      }
      if (ev.key === "Tab") {
        ev.preventDefault();
        handleRestartLineRef.current();
        return;
      }
      if (ev.key.length === 1 && !ev.metaKey && !ev.ctrlKey && !ev.altKey && !ev.isComposing) {
        ev.preventDefault();
        if (inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        }
        processCharRef.current(ev.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result]);

  const applyTheme = (t: ThemeMode) => {
    setTheme(t);
    document.documentElement.classList.remove("dark", "light", "sepia", "oled", "aquarela");
    document.documentElement.classList.add(t);
    localStorage.setItem("lextype-theme", t);
  };

  const updatePrefs = (patch: Partial<Prefs>) => {
    const next = { ...prefsRef.current, ...patch };
    setPrefs(next);
    prefsRef.current = next;
    localStorage.setItem("lextype-prefs", JSON.stringify(next));
    if (mode !== "estudos" && ("caps" in patch || "punct" in patch || "symbols" in patch)) {
      reset(mode, selectedKeys, keyStats, level);
    }
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!/\.(txt|md|csv|json|html?|pdf)$/i.test(file.name) && !file.type.startsWith("text/")) {
      setStudyError("Envie um arquivo educacional (.txt, .md, .csv, .json).");
      return;
    }
    const raw = (await file.text()).slice(0, 50000);
    const cleaned = raw.replace(/[\u00A0\u200B]/g, " ").replace(/\r\n/g, "\n").trim();
    const extracted = cleaned
      .split(/(?<=[.?!;\n])\s+/)
      .map((s) => s.replace(/\s+/g, " ").trim())
      .filter((s) => s.length >= 15 && s.length <= 180);

    const sentences = extracted.length ? extracted : [cleaned.slice(0, 120)];
    setReference({
      name: file.name,
      text: cleaned,
      sentences,
      activeSentenceIdx: 0,
    });
    setStudyError(null);
  };

  const practiceReferenceSentence = () => {
    if (!reference || !reference.sentences.length) return;
    const idx = reference.activeSentenceIdx % reference.sentences.length;
    const sent = reference.sentences[idx]!;
    loadText(sent);
    setReference((prev) => (prev ? { ...prev, activeSentenceIdx: idx + 1 } : null));
  };

  const applyKeys = (keys: string[]) => {
    setSelectedKeys(keys);
    if (mode !== "estudos") reset(mode, keys, keyStats, level);
  };
  const toggleKey = (k: string) =>
    applyKeys(
      selectedKeys.includes(k) ? selectedKeys.filter((x) => x !== k) : [...selectedKeys, k],
    );
  const toggleGroup = (g: string[]) => {
    const allOn = g.every((k) => selectedKeys.includes(k));
    applyKeys(
      allOn ? selectedKeys.filter((k) => !g.includes(k)) : [...new Set([...selectedKeys, ...g])],
    );
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

  const goNext = () =>
    repeat && eng.current.text
      ? loadText(eng.current.text)
      : reset(mode, selectedKeys, keyStats, level);
  goNextRef.current = goNext;

  const e = eng.current;
  const pos = e.pos;
  const liveWpm = e.startedAt && pos > 0 && elapsed > 0 ? Math.round(pos / 5 / (elapsed / 60)) : 0;
  const liveAcc = pos > 0 ? Math.round((pos / (pos + e.errors)) * 100) : 100;
  const nextKeys = !result && e.text[pos] ? charToKeys(e.text[pos]!, keyboardLayout) : [];
  const weak = useMemo(() => weakestKeys(keyStats, TRAINABLE_KEYS, 3), [keyStats]);
  const rank = rankOf(xp, bestWpm, liveAcc);
  const inFlow = running && !result;
  const progress = e.text.length ? pos / e.text.length : 0;
  const complexTerm = useMemo(() => {
    return extractComplexLegalTerm(e.text || "");
  }, [e.text]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {result && result.accuracy >= 90 && <Confetti key={quote.id} />}
      <header
        className={cn(
          "border-b border-border transition-opacity duration-500",
          inFlow && "opacity-25 hover:opacity-100",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-mono-type text-lg font-bold text-gold-foreground">
                §
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">LexType</h1>
                <p className="text-xs text-muted-foreground">Digitação por toque para o Direito</p>
              </div>
            </div>
            <div className="flex items-center rounded-lg border border-border bg-card p-0.5 sm:p-1">
              <button
                onClick={() => setActiveTab("treino")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors",
                  activeTab === "treino"
                    ? "bg-gold text-gold-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                ⌨️ Treino
              </button>
              <button
                onClick={() => setActiveTab("leiseca")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors",
                  activeTab === "leiseca"
                    ? "bg-gold text-gold-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                📜 Lei Seca
              </button>
              <button
                onClick={() => setActiveTab("desempenho")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors",
                  activeTab === "desempenho"
                    ? "bg-gold text-gold-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                📊 Desempenho
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm sm:gap-6">
            <div className="min-w-36">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gold">
                  {rank.badge} {rank.name}
                </span>
                <span className="font-mono-type text-muted-foreground">{xp} XP</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-gold transition-all duration-700"
                  style={{ width: `${rank.progress * 100}%` }}
                />
              </div>
              {rank.next && (
                <div
                  className="mt-0.5 text-[0.65rem] text-muted-foreground truncate max-w-44"
                  title={rank.missingCriteria.length ? rank.missingCriteria.join(" | ") : undefined}
                >
                  próx.: {rank.nextBadge} {rank.next}
                </div>
              )}
            </div>
            <div
              className="min-w-32"
              title="5 minutos diários consistentes aumentam significativamente seu PPM em poucas semanas."
            >
              <div className="flex justify-between text-xs">
                <span className="font-semibold">
                  {practiceToday >= DAILY_SECONDS ? "✅ Meta 5 min feita!" : "Meta Diária 5 min"}
                </span>
                <span className="font-mono-type text-muted-foreground">
                  {Math.floor(Math.min(practiceToday, DAILY_SECONDS) / 60)}:
                  {String(Math.min(practiceToday, DAILY_SECONDS) % 60).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-success transition-all duration-700"
                  style={{ width: `${Math.min(1, practiceToday / DAILY_SECONDS) * 100}%` }}
                />
              </div>
              <div className="mt-0.5 text-[0.65rem] text-muted-foreground">
                {today} sessões hoje
              </div>
            </div>
            <Stat value={`${streak}🔥`} label="dias" gold />
            <Stat value={bestWpm} label="melhor PPM" />
            <button
              onClick={() => setShowSettings((v) => !v)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-sm font-medium transition-colors",
                showSettings
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border hover:bg-secondary",
              )}
              aria-label="Configurações"
              title="Configurações e Preferências"
            >
              ⚙️ Opções
            </button>
          </div>
        </div>
      </header>

      {showSettings && (
        <div className="animate-pop-in border-b border-border bg-card p-4 sm:p-6 shadow-md">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                Painel de Ajustes & Ergonomia
              </span>
              <button
                onClick={() => window.open("/keyboard", "LexTypeKeyboard", "width=920,height=520")}
                className="rounded-md border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold hover:bg-gold/20"
                title="Abre o teclado e o estudo numa janela flutuante para o segundo monitor"
              >
                ↗ Desprender Teclado (2º Monitor)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tema */}
              <div className="space-y-2">
                <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Tema Visual
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      { id: "dark", label: "🌙 Escuro" },
                      { id: "light", label: "☀️ Claro" },
                      { id: "sepia", label: "📜 Sépia" },
                      { id: "oled", label: "🖤 OLED" },
                      { id: "aquarela", label: "🎨 Aquarela" },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => applyTheme(t.id)}
                      className={cn(
                        "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                        theme === t.id
                          ? "border-gold bg-gold text-gold-foreground"
                          : "border-border hover:bg-secondary",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout e Escala do Teclado */}
              <div className="space-y-2">
                <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Teclado & Ergonomia
                </span>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={keyboardLayout}
                    onChange={(ev) => {
                      const l = ev.target.value as KeyboardLayout;
                      setKeyboardLayout(l);
                      localStorage.setItem("lextype-layout", l);
                    }}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs"
                  >
                    <option value="abnt2">ABNT2</option>
                    <option value="ansi">ANSI US</option>
                  </select>
                  <select
                    value={uiScale}
                    onChange={(ev) => {
                      const s = ev.target.value as KeyboardScale;
                      setUiScale(s);
                      localStorage.setItem("lextype-scale", s);
                    }}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs"
                  >
                    <option value="compact">Compacto</option>
                    <option value="normal">Normal</option>
                    <option value="large">Expandido</option>
                  </select>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => {
                      const next = keyboardMode === "heatmap" ? "rainbow" : "heatmap";
                      setKeyboardMode(next);
                      localStorage.setItem("lextype-keyboard-mode", next);
                    }}
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                      keyboardMode === "rainbow"
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-border hover:bg-secondary text-muted-foreground",
                    )}
                  >
                    {keyboardMode === "rainbow"
                      ? "🌈 Guia de Dedos (Colorido)"
                      : "🔥 Mapa de Desempenho"}
                  </button>
                </div>
              </div>

              {/* Comportamento do Cursor */}
              <div className="space-y-2">
                <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Controle de Erros
                </span>
                <Toggle
                  on={prefs.stopOnError}
                  onChange={(v) => updatePrefs({ stopOnError: v })}
                  label={
                    prefs.stopOnError
                      ? "Modo Estrito (cursor trava no erro)"
                      : "Modo Fluido (corrige com Backspace)"
                  }
                />
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="rounded-md border border-border px-2.5 py-1 text-xs hover:bg-secondary"
                    >
                      {muted ? "🔇 Mudo" : "🔊 Som"}
                    </button>
                    <select
                      value={soundProfile}
                      onChange={(ev) => {
                        const p = ev.target.value as SoundProfile;
                        setSoundProfile(p);
                        setSoundProfileState(p);
                        playKey();
                      }}
                      disabled={muted}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium disabled:opacity-40"
                      title="Perfil sonoro das teclas"
                    >
                      {SOUND_PROFILES.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="text-[0.65rem] text-muted-foreground">
                    {SOUND_PROFILES.find((p) => p.id === soundProfile)?.description}
                  </span>
                </div>
              </div>

              {/* Complexidade do Texto */}
              <div className="space-y-2">
                <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Módulos de Prática Real
                </span>
                <div className="space-y-1.5">
                  <Toggle
                    on={prefs.caps}
                    onChange={(v) => updatePrefs({ caps: v })}
                    label="Maiúsculas (Capitalização)"
                  />
                  <Toggle
                    on={prefs.punct}
                    onChange={(v) => updatePrefs({ punct: v })}
                    label="Pontuação (. , ? !)"
                  />
                  <Toggle
                    on={prefs.symbols}
                    onChange={(v) => updatePrefs({ symbols: v })}
                    label="Símbolos (@ # $ § _)"
                  />
                </div>
              </div>
            </div>

            {/* Conexão com IAs & Chave Local */}
            <div className="rounded-lg border border-gold/30 bg-gold/5 p-3.5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-xs uppercase tracking-wider text-gold">
                  🤖 Conexão com IAs (Gemini / OpenAI / Lovable)
                </span>
                <span className="text-[0.65rem] text-muted-foreground">
                  🔒 Salva com segurança apenas no seu navegador (localStorage)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={aiProvider}
                  onChange={(ev) => {
                    const p = ev.target.value as any;
                    setAiProvider(p);
                    localStorage.setItem("lextype-ai-provider", p);
                  }}
                  className="rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium"
                >
                  <option value="gemini">Google Gemini (Recomendado)</option>
                  <option value="openai">OpenAI (GPT-4o)</option>
                  <option value="lovable">Lovable Cloud</option>
                </select>
                <input
                  type="password"
                  value={aiKey}
                  onChange={(ev) => {
                    const k = ev.target.value;
                    setAiKey(k);
                    localStorage.setItem("lextype-ai-key", k);
                  }}
                  placeholder="Cole sua API Key do Gemini ou OpenAI..."
                  className="min-w-64 flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs"
                />
                {aiKey && (
                  <button
                    onClick={() => {
                      setAiKey("");
                      localStorage.removeItem("lextype-ai-key");
                    }}
                    className="rounded-md border border-destructive/40 bg-destructive/10 px-2 py-1 text-xs text-destructive hover:bg-destructive/20"
                  >
                    Remover
                  </button>
                )}
              </div>
              <p className="text-[0.7rem] text-muted-foreground">
                Se você não informar uma chave de IA ou estiver sem rede, o LexType funciona 100% autônomo com as 2.220 viradas de chave e questões da OAB incorporadas no app.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "desempenho" ? (
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <AnalyticsDashboard
            stats={keyStats}
            xp={xp}
            bestWpm={bestWpm}
            streak={streak}
            practiceTodaySeconds={practiceToday}
            onTrainWeakKeys={(keys) => {
              applyKeys(keys);
              setActiveTab("treino");
            }}
            onSwitchToPractice={() => setActiveTab("treino")}
            onBackToPractice={() => setActiveTab("treino")}
          />
        </main>
      ) : activeTab === "leiseca" ? (
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <LeiSecaPanel
            onSelectForTyping={(item) => {
              loadText(item.texto);
              setActiveTab("treino");
            }}
            onClose={() => setActiveTab("treino")}
          />
        </main>
      ) : (
        <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {/* Modos */}
        <div
          className={cn(
            "flex flex-wrap gap-2 transition-opacity duration-500",
            inFlow && "opacity-25 hover:opacity-100",
          )}
        >
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

        {/* Professor */}
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-card text-2xl shadow-sm"
            title="Prof. Dr. Rigoroso"
          >
            👨‍⚖️
          </div>
          <div
            key={quote.id}
            className={cn(
              "animate-pop-in relative rounded-xl rounded-tl-none border px-4 py-2.5 text-sm transition-all",
              ["error", "errorStreak", "finishBad", "levelDown"].includes(quote.mood)
                ? "border-destructive/50 bg-destructive/10"
                : ["combo", "finishGreat", "levelUp"].includes(quote.mood)
                  ? "border-success/50 bg-success/10"
                  : "border-border bg-card",
            )}
          >
            <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
              Prof. Dr. Rigoroso
            </div>
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
              <span className="font-mono-type font-bold uppercase tracking-widest text-gold">
                {route.target.join(" ")}
              </span>
            </span>
            {route.detected.length > 0 && (
              <span className="text-muted-foreground">
                detectadas pelo professor:{" "}
                <span className="font-mono-type uppercase text-destructive font-bold">
                  {route.detected.join(" ")}
                </span>
              </span>
            )}
          </div>
        )}
        {mode === "estudos" && (
          <div className="space-y-3 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm">
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="area" className="font-medium">
                Matéria (OAB):
              </label>
              <select
                id="area"
                value={area}
                onChange={(ev) => setArea(ev.target.value)}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
              >
                {AREAS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
                <option value={CUSTOM}>Outra matéria…</option>
              </select>
              {area === CUSTOM && (
                <input
                  value={customArea}
                  onChange={(ev) => setCustomArea(ev.target.value.slice(0, 120))}
                  placeholder="Ex.: recursos no STJ, LGPD, contratos bancários…"
                  className="min-w-64 flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm"
                />
              )}
              <label htmlFor="lines" className="font-medium">
                Linhas:
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleLineCountChange((n) => Math.max(1, n - 1))}
                  className="h-7 w-7 rounded-md border border-border bg-card hover:bg-secondary transition-colors"
                  aria-label="Menos linhas"
                >
                  −
                </button>
                <span id="lines" className="w-6 text-center font-mono-type font-bold text-gold">
                  {lineCount}
                </span>
                <button
                  onClick={() => handleLineCountChange((n) => Math.min(10, n + 1))}
                  className="h-7 w-7 rounded-md border border-border bg-card hover:bg-secondary transition-colors"
                  aria-label="Mais linhas"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-md border border-dashed border-gold/50 bg-card px-3 py-1.5 text-xs hover:border-gold">
                📎{" "}
                {reference
                  ? `Referência: ${reference.name}`
                  : "Enviar arquivo de referência (.txt, .md)"}
                <input
                  type="file"
                  accept=".txt,.md,.csv,.json,.html,text/*"
                  className="hidden"
                  onChange={(ev) => void onFile(ev.target.files?.[0])}
                />
              </label>
              {reference && (
                <button
                  onClick={() => setReference(null)}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  remover
                </button>
              )}
              <button
                onClick={() => {
                  setStudyQueue([]);
                  void nextStudy([], selectedKeys, effectiveArea);
                }}
                disabled={studyLoading}
                className="rounded-md bg-gold px-4 py-1.5 text-xs font-semibold text-gold-foreground disabled:opacity-50"
              >
                {studyLoading ? "Gerando…" : "Gerar nova aula"}
              </button>
              {studyQueue.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {studyQueue.length} linha(s) restante(s)
                </span>
              )}
              {studyError && <span className="text-xs text-destructive">{studyError}</span>}
            </div>
            {reference && reference.sentences.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gold/20 pt-2 text-xs">
                <span className="text-muted-foreground">
                  📄 <strong>{reference.name}</strong>: {reference.sentences.length} frases prontas para treino.
                </span>
                <button
                  onClick={practiceReferenceSentence}
                  className="rounded bg-gold/20 hover:bg-gold hover:text-gold-foreground text-gold px-3 py-1 font-semibold transition-colors"
                  title="Carregar a próxima frase do seu arquivo para praticar imediatamente"
                >
                  ⚡ Digitar Frase do Arquivo ({reference.activeSentenceIdx + 1}/{reference.sentences.length})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Barra de Status e Restauração dos Painéis Independentes */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>📐 <strong>Painéis Modulares:</strong> use ▲▼ para reposicionar e ◀ Esquerda / Direita ▶ para alargar as caixas.</span>
          </div>
          <button
            onClick={resetBoxes}
            className="hover:text-gold text-[11px] underline transition-colors"
            title="Restaurar posições originais das caixas"
          >
            ↺ Restaurar ordem padrão
          </button>
        </div>

        {/* Blocos Modulares e Reposicionáveis */}
        <div className="space-y-6">
          {boxOrder.map((boxId) => {
            if (boxId === "typing") {
              return (
                <MovableCard
                  key="typing"
                  id="typing"
                  title="Área de Digitação"
                  icon="⌨️"
                  canMoveUp={boxOrder.indexOf("typing") > 0}
                  canMoveDown={boxOrder.indexOf("typing") < boxOrder.length - 1}
                  onMoveUp={() => moveBox("typing", "up")}
                  onMoveDown={() => moveBox("typing", "down")}
                  extraHeaderControls={
                    <div className="flex items-center gap-2">
                      {lineCount === 1 && (
                        <span className="rounded bg-gold/15 px-2 py-0.5 text-[0.65rem] font-bold text-gold">
                          Linha Única
                        </span>
                      )}
                      <div className="flex items-center rounded-md border border-border bg-card text-xs">
                        <span className="px-2 py-0.5 text-[0.65rem] text-muted-foreground">Fonte:</span>
                        <button
                          onClick={() => {
                            const sizes: ("sm" | "md" | "lg" | "xl")[] = ["sm", "md", "lg", "xl"];
                            const idx = Math.max(0, sizes.indexOf(fontTyping) - 1);
                            setFontTyping(sizes[idx]!);
                            localStorage.setItem("lextype-font-typing", sizes[idx]!);
                          }}
                          disabled={fontTyping === "sm"}
                          className="px-2 py-0.5 hover:bg-secondary disabled:opacity-30 border-r border-border font-bold"
                          title="Diminuir fonte da digitação"
                        >
                          A−
                        </button>
                        <button
                          onClick={() => {
                            const sizes: ("sm" | "md" | "lg" | "xl")[] = ["sm", "md", "lg", "xl"];
                            const idx = Math.min(sizes.length - 1, sizes.indexOf(fontTyping) + 1);
                            setFontTyping(sizes[idx]!);
                            localStorage.setItem("lextype-font-typing", sizes[idx]!);
                          }}
                          disabled={fontTyping === "xl"}
                          className="px-2 py-0.5 hover:bg-secondary disabled:opacity-30 font-bold"
                          title="Aumentar fonte da digitação"
                        >
                          A+
                        </button>
                      </div>
                    </div>
                  }
                >
                  <section
                    onClick={() => inputRef.current?.focus()}
                    style={{
                      minHeight: lineCount === 1 ? "5.5rem" : `${Math.max(8.5, 4.5 + lineCount * 2.8)}rem`,
                      maxHeight: lineCount === 1 ? "8.5rem" : "75vh",
                    }}
                    className={cn(
                      "relative rounded-lg p-2 transition-all duration-300 overflow-auto",
                      focused ? "ring-1 ring-gold/30" : "",
                    )}
                  >
                    {result ? (
                      <ResultView result={result} weak={weak} repeat={repeat} onNext={goNext} />
                    ) : (
                      <>
                        <div className="mb-2 h-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-gold transition-all duration-150"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                        <div className="mb-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono-type text-sm">
                          <span className="text-muted-foreground">
                            PPM <span className="font-bold text-gold">{liveWpm}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Precisão <span className="font-bold text-foreground">{liveAcc}%</span>
                          </span>
                          <span className="text-muted-foreground">
                            Tempo <span className="font-bold text-foreground">{elapsed.toFixed(0)}s</span>
                          </span>
                          <span
                            key={comboPulse}
                            className={cn(
                              "animate-combo text-muted-foreground",
                              e.combo >= 10 && "text-gold",
                            )}
                          >
                            Combo <span className="font-bold">{e.combo}</span>
                            {e.combo >= 25 ? " 🔥" : ""}
                            {e.combo >= 50 ? "🔥" : ""}
                          </span>
                        </div>
                        {studyLoading ? (
                          <p className="py-6 text-center text-muted-foreground">
                            O professor está preparando a aula de {effectiveArea}…
                          </p>
                        ) : (
                          <p
                            className={cn(
                              "font-mono-type leading-relaxed tracking-wide transition-all",
                              TYPING_FONT_CLASSES[fontTyping],
                              lineCount === 1 && "overflow-hidden",
                            )}
                          >
                            {e.text.split("").map((ch, i) => {
                              const isErrorMark = e.marks[i] === true;
                              return (
                                <span
                                  key={i}
                                  className={cn(
                                    i < pos &&
                                      (isErrorMark
                                        ? "rounded-sm bg-destructive/25 text-destructive font-bold underline"
                                        : "text-muted-foreground/40"),
                                    i === pos &&
                                      (prefs.stopOnError && e.wrongAt === i
                                        ? "rounded-sm bg-destructive/40 text-destructive-foreground animate-shake"
                                        : "rounded-sm bg-gold/30 text-gold animate-caret"),
                                    i > pos && "text-foreground",
                                  )}
                                >
                                  {ch === " " && i === pos ? "␣" : ch}
                                </span>
                              );
                            })}
                          </p>
                        )}

                        {/* Semântica e Impacto Prático do Termo Mais Complexo */}
                        {complexTerm && !result && (
                          <div className="mt-4 rounded-lg border border-gold/40 bg-gold/5 p-3.5 text-xs">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-1.5 font-bold text-gold">
                                <span>📖 Vocabulário Jurídico Chave:</span>
                                <span className="font-mono-type bg-gold/20 px-2 py-0.5 rounded text-foreground uppercase tracking-wide">
                                  {complexTerm.termo}
                                </span>
                              </div>
                              <span className="text-[10px] uppercase font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                {complexTerm.categoria}
                              </span>
                            </div>
                            <p className="text-foreground leading-relaxed">
                              <strong>Significado Técnico:</strong> {complexTerm.significado}
                            </p>
                            {complexTerm.virada && (
                              <p className="text-muted-foreground mt-1.5 border-t border-gold/15 pt-1.5">
                                <span className="text-gold font-semibold">💡 Impacto Prático / Pegadinha FGV:</span> {complexTerm.virada}
                              </p>
                            )}
                          </div>
                        )}

                        <p className="mt-5 text-center text-xs text-muted-foreground">
                          {focused
                            ? prefs.stopOnError
                              ? "Modo estrito: o cursor trava na letra errada até você acertar."
                              : "Modo fluido: continue digitando e use Backspace para retornar e corrigir as letras em vermelho."
                            : "🎯 A velocidade surge da precisão. Clique ou toque aqui para começar."}
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
                          onCompositionEnd={(ev) => {
                            composing.current = false;
                            handleInput(ev.currentTarget, true);
                          }}
                          onInput={(ev) => handleInput(ev.currentTarget, false)}
                        />
                      </>
                    )}
                  </section>

                  {/* Controles rápidos logo abaixo da digitação */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-border/40 pt-3">
                    <button
                      onClick={() => setRepeat((r) => !r)}
                      aria-pressed={repeat}
                      title="Repetir a mesma frase deliberadamente"
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors",
                        repeat
                          ? "border-gold bg-gold text-gold-foreground"
                          : "border-border bg-card text-muted-foreground hover:text-foreground",
                      )}
                    >
                      🔁 Repetir frase {repeat ? "ligado" : "desligado"}
                    </button>
                    {!result && e.text && (
                      <button
                        onClick={handleRestartLine}
                        className="rounded-full border border-border bg-card px-4 py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                      >
                        ↺ Recomeçar esta
                      </button>
                    )}
                  </div>
                </MovableCard>
              );
            }

            if (boxId === "lesson") {
              const activeLesson = pinned || currentStudy;
              return (
                <MovableCard
                  key="lesson"
                  id="lesson"
                  title="Aula & Virada de Chave"
                  icon="🎓"
                  canMoveUp={boxOrder.indexOf("lesson") > 0}
                  canMoveDown={boxOrder.indexOf("lesson") < boxOrder.length - 1}
                  onMoveUp={() => moveBox("lesson", "up")}
                  onMoveDown={() => moveBox("lesson", "down")}
                >
                  {activeLesson ? (
                    <LessonCard
                      item={activeLesson}
                      onClose={() => {
                        setPinned(null);
                        setCurrentStudy(null);
                      }}
                      fontStudy={fontStudy}
                      onFontChange={(f) => {
                        setFontStudy(f);
                        localStorage.setItem("lextype-font-study", f);
                      }}
                    />
                  ) : (
                    <div className="rounded-lg border border-dashed border-border/70 p-6 text-center text-muted-foreground">
                      <p className="text-sm font-medium mb-1">🎓 Nenhuma virada de chave carregada no momento.</p>
                      <p className="text-xs mb-3 text-muted-foreground/80">
                        No modo <strong>Estudos Jurídicos</strong> ou <strong>Lei Seca</strong>, este painel exibirá o conceito estruturado, critério decisivo e o caso prático correspondente.
                      </p>
                      <button
                        onClick={() => {
                          changeMode("estudos");
                          void nextStudy([], selectedKeys, effectiveArea);
                        }}
                        className="rounded-md bg-gold px-4 py-1.5 text-xs font-semibold text-gold-foreground hover:opacity-90"
                      >
                        Iniciar Aula de {effectiveArea}
                      </button>
                    </div>
                  )}
                </MovableCard>
              );
            }

            if (boxId === "keyboard") {
              return (
                <MovableCard
                  key="keyboard"
                  id="keyboard"
                  title={`Teclado Virtual (${keyboardLayout.toUpperCase()})`}
                  icon="⌨️"
                  canMoveUp={boxOrder.indexOf("keyboard") > 0}
                  canMoveDown={boxOrder.indexOf("keyboard") < boxOrder.length - 1}
                  onMoveUp={() => moveBox("keyboard", "up")}
                  onMoveDown={() => moveBox("keyboard", "down")}
                >
                  <Keyboard
                    nextKeys={nextKeys}
                    stats={keyStats}
                    selectedKeys={[]}
                    flash={flash}
                    layout={keyboardLayout}
                    scale={uiScale}
                    mode={keyboardMode}
                  />
                  <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
                    {keyboardMode === "heatmap" ? (
                      <>
                        <Legend cls="bg-success/40" label="dominada" />
                        <Legend cls="bg-gold/30" label="em progresso" />
                        <Legend cls="bg-destructive/40" label="precisa de treino" />
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Zonas coloridas por dedo. A tecla atual acende com brilho vibrante.
                      </span>
                    )}
                  </div>
                </MovableCard>
              );
            }

            if (boxId === "keys") {
              return (
                <MovableCard
                  key="keys"
                  id="keys"
                  title={mode === "automatico" ? "Diagnóstico de Teclas Críticas" : "Teclas-Alvo do Treino"}
                  icon="🎯"
                  canMoveUp={boxOrder.indexOf("keys") > 0}
                  canMoveDown={boxOrder.indexOf("keys") < boxOrder.length - 1}
                  onMoveUp={() => moveBox("keys", "up")}
                  onMoveDown={() => moveBox("keys", "down")}
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {mode === "automatico"
                        ? "Marque as teclas em que você tem mais dificuldade"
                        : "Teclas selecionadas para repetição"}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(KEY_GROUPS).map(([name, g]) => (
                        <button
                          key={name}
                          onClick={() => toggleGroup(g)}
                          className={cn(
                            "rounded-md border px-3 py-1 text-xs font-medium transition-colors",
                            g.every((k) => selectedKeys.includes(k))
                              ? "border-gold bg-gold/15 text-gold"
                              : "border-border bg-secondary text-secondary-foreground hover:text-gold",
                          )}
                        >
                          {name}
                        </button>
                      ))}
                      <button
                        onClick={() => applyKeys(TRAINABLE_KEYS)}
                        className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-medium hover:text-gold"
                      >
                        Todas
                      </button>
                      <button
                        onClick={() => applyKeys([])}
                        className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-medium hover:text-destructive"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                  <Keyboard
                    stats={keyStats}
                    selectedKeys={selectedKeys}
                    onToggle={toggleKey}
                    layout={keyboardLayout}
                    compact
                  />
                </MovableCard>
              );
            }

            return null;
          })}
        </div>
      </main>
      )}
    </div>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          on ? "bg-gold" : "bg-secondary",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-card shadow transition-all",
            on ? "left-4.5" : "left-0.5",
          )}
        />
      </button>
      <span className="text-xs sm:text-sm">{label}</span>
    </label>
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

function LessonCard({
  item,
  onClose,
  fontStudy,
  onFontChange,
}: {
  item: StudyItem;
  onClose: () => void;
  fontStudy: "sm" | "md" | "lg" | "xl";
  onFontChange: (f: "sm" | "md" | "lg" | "xl") => void;
}) {
  return (
    <div className="animate-pop-in relative space-y-4 rounded-xl border border-gold/40 bg-gold/5 p-5 resize overflow-auto shadow-sm min-h-[220px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-gold/20 px-2.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
            {item.virada.titulo || item.termo}
          </span>
          <span className="text-xs text-muted-foreground font-mono-type">{item.semantica}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-border bg-card text-xs">
            <span className="px-2 py-0.5 text-[0.65rem] text-muted-foreground">Fonte:</span>
            <button
              onClick={() => {
                const sizes: ("sm" | "md" | "lg" | "xl")[] = ["sm", "md", "lg", "xl"];
                const idx = Math.max(0, sizes.indexOf(fontStudy) - 1);
                onFontChange(sizes[idx]!);
              }}
              disabled={fontStudy === "sm"}
              className="px-2 py-0.5 hover:bg-secondary disabled:opacity-30 border-r border-border font-bold"
              title="Diminuir fonte do estudo"
            >
              A−
            </button>
            <button
              onClick={() => {
                const sizes: ("sm" | "md" | "lg" | "xl")[] = ["sm", "md", "lg", "xl"];
                const idx = Math.min(sizes.length - 1, sizes.indexOf(fontStudy) + 1);
                onFontChange(sizes[idx]!);
              }}
              disabled={fontStudy === "xl"}
              className="px-2 py-0.5 hover:bg-secondary disabled:opacity-30 font-bold"
              title="Aumentar fonte do estudo"
            >
              A+
            </button>
          </div>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-muted-foreground hover:text-foreground text-xs font-semibold"
            aria-label="Fechar aula"
          >
            ✕
          </button>
        </div>
      </div>
      {item.virada.conceito && (
        <div className="rounded-lg bg-card/60 p-3.5 border border-border/60">
          <div className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
            📖 Conceito & Distinção
          </div>
          <p className={cn("text-foreground", STUDY_FONT_CLASSES[fontStudy])}>
            {item.virada.conceito}
          </p>
        </div>
      )}
      <div className="rounded-lg bg-card/60 p-3.5 border border-border/60">
        <div className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
          💡 Virada de Chave (Critério Decisivo)
        </div>
        <p className={cn("text-foreground font-medium", STUDY_FONT_CLASSES[fontStudy])}>
          {item.virada.raciocinio}
        </p>
      </div>
      <div className="rounded-lg bg-card/60 p-3.5 border border-border/60">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
          ⚖️ Exemplo no Caso Concreto
        </div>
        <p className={cn("text-muted-foreground", STUDY_FONT_CLASSES[fontStudy])}>
          {item.virada.exemplo}
        </p>
      </div>
    </div>
  );
}

function ResultView({
  result,
  weak,
  onNext,
  repeat,
}: {
  result: SessionResult;
  weak: string[];
  onNext: () => void;
  repeat: boolean;
}) {
  return (
    <div className="animate-pop-in space-y-6 text-center">
      <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
        <Big value={result.wpm} label="PPM" cls="text-gold text-glow-gold" />
        <Big value={`${result.accuracy}%`} label="Precisão" />
        <Big value={result.errors} label="Erros" cls="text-destructive" />
        <Big value={result.maxCombo} label="Maior combo" />
        <Big value={`+${result.xp}`} label="XP" cls="text-success" />
      </div>
      {result.bonus > 1 && (
        <p className="text-sm font-semibold text-success">
          🎯 Precisão{" "}
          {result.accuracy >= 97 ? "de elite (≥97%): XP ×1,5" : "excelente (≥95%): XP ×1,25"}!
        </p>
      )}
      {result.levelChange !== 0 && (
        <p
          className={cn(
            "text-sm font-semibold",
            result.levelChange > 0 ? "text-success" : "text-destructive",
          )}
        >
          {result.levelChange > 0
            ? "▲ Subiu de nível — a próxima rota exigirá mais agilidade"
            : "▼ Nível reduzido — consolidando a base"}
        </p>
      )}

      {!result.study && (
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-gold">Parecer técnico do professor: </span>
          {coachingTip(weak)}
        </p>
      )}
      {weak.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Teclas que precisam de atenção:{" "}
          <span className="font-mono-type font-bold uppercase text-destructive tracking-widest">
            {weak.join("  ")}
          </span>
        </p>
      )}
      <button
        onClick={onNext}
        className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground transition-transform hover:scale-105 shadow-md"
      >
        {repeat ? "🔁 Repetir frase" : "Próxima sessão"} <span className="opacity-60">(Enter)</span>
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
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
