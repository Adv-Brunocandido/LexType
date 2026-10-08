import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, type KeyboardScale } from "@/components/Keyboard";
import { DiagnosticMap } from "@/components/DiagnosticMap";
import {
  getKeyGroups,
  getTrainableKeys,
  charToKeys,
  strip,
  type KeyboardLayout,
} from "@/lib/abnt2";
import { professorSays, rankOf, type Mood } from "@/lib/professor";
import {
  playCombo,
  playError,
  playKey,
  playWin,
  soundSettings,
  setVolume,
  type WinTier,
} from "@/lib/sound";
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

export type ThemeMode = "dark" | "light" | "sepia" | "oled";
export type PanelLayout = "stack" | "split" | "keyboard-top";

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

const FALLBACK_STUDY: StudyItem[] = [
  {
    linha: "o juiz homologou os cálculos e extinguiu a execução por sentença",
    termo: "sentença",
    semantica:
      "Pronunciamento judicial que, com fundamento nos arts. 485 ou 487 do CPC, põe fim à fase cognitiva ou extingue a execução (art. 203, §1º).",
    virada: {
      titulo: "Natureza do ato judicial",
      raciocinio:
        "A natureza de um ato judicial é definida pelo seu conteúdo (arts. 485/487 do CPC) e pela sua finalidade (encerrar ou não a fase processual), jamais pelo nome que o juiz lhe deu.",
      exemplo:
        'O juiz redige "Despacho: homologo os cálculos e dou por satisfeita a execução." Não é despacho, é sentença. Cabe Apelação, não Agravo. Quem agrava perde o prazo da Apelação.',
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
  text,
  pos: 0,
  errors: 0,
  errorMap: {},
  hitMap: {},
  timeMap: {},
  timedMap: {},
  combo: 0,
  maxCombo: 0,
  startedAt: null,
  lastAt: null,
  errStreak: 0,
  wrongAt: null,
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
  const [keyboardLayout, setKeyboardLayout] = useState<KeyboardLayout>("abnt2");
  const [panelLayout, setPanelLayout] = useState<PanelLayout>("stack");
  const [showLocalKeyboard, setShowLocalKeyboard] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => getKeyGroups("abnt2").Central);
  const [mode, setMode] = useState<FullMode>("automatico");
  const [area, setArea] = useState(AREAS[0]!);
  const [customArea, setCustomArea] = useState("");
  const [lineCount, setLineCount] = useState(2);
  const [reference, setReference] = useState<{ name: string; text: string } | null>(null);
  const [repeat, setRepeat] = useState(false);
  const [pinned, setPinned] = useState<StudyItem | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [uiScale, setUiScale] = useState<KeyboardScale>("normal");
  const [restartOnError, setRestartOnError] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [volume, setVolumeState] = useState(0.6);
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
    eng.current = newEngine(text);
    consumed.current = 0;
    if (inputRef.current) inputRef.current.value = "";
    setElapsed(0);
    setRunning(false);
    setResult(null);
    rerender();
  }, []);

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
        const r = await fetchStudy({
          data: {
            area: ar,
            keys,
            seen: seenTerms.current.slice(-20),
            count: lineCount,
            reference: reference?.text,
          },
        });
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
    [fetchStudy, loadText, lineCount, reference],
  );

  const reset = useCallback(
    (
      m: FullMode,
      keys: string[],
      stats: KeyStats,
      lvl: number,
      opts?: { area?: string; freshStudy?: boolean },
    ) => {
      if (m === "estudos") {
        const q = opts?.freshStudy ? [] : studyQueue;
        void nextStudy(q, keys, opts?.area ?? effectiveArea);
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
    [effectiveArea, loadText, nextStudy, studyQueue],
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

    const savedTheme = (localStorage.getItem("lextype-theme") as ThemeMode) || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.remove("dark", "light", "sepia", "oled");
    document.documentElement.classList.add(savedTheme);

    const savedScale = (localStorage.getItem("lextype-scale") as KeyboardScale) || "normal";
    setUiScale(savedScale);

    const savedRigor = localStorage.getItem("lextype-restart-on-error") === "1";
    setRestartOnError(savedRigor);

    const savedVol = Number(localStorage.getItem("lextype-volume"));
    if (Number.isFinite(savedVol) && localStorage.getItem("lextype-volume") !== null) {
      setVolumeState(savedVol);
      setVolume(savedVol);
    }

    const savedLayout =
      (localStorage.getItem("lextype-keyboard-layout") as KeyboardLayout) || "abnt2";
    setKeyboardLayout(savedLayout);

    const savedPanelLayout =
      (localStorage.getItem("lextype-panel-layout") as PanelLayout) || "stack";
    setPanelLayout(savedPanelLayout);

    const savedShowKeyboard = localStorage.getItem("lextype-show-keyboard") !== "0";
    setShowLocalKeyboard(savedShowKeyboard);

    const initialGroups = getKeyGroups(savedLayout);
    setSelectedKeys(initialGroups.Central);
    reset("automatico", initialGroups.Central, st, lvl);
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

    const gained = Math.round(
      len * (accuracy / 100) * (1 + e.maxCombo / 40) * (mode === "automatico" ? 1 + level / 10 : 1),
    );
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
      ...(currentStudy ? { study: currentStudy } : {}),
    });
    const winTier: WinTier = levelChange > 0 ? "grand" : accuracy >= 96 ? "epic" : "normal";
    playWin(winTier);
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
      const keys = charToKeys(expected, keyboardLayout);
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
        if (restartOnError) {
          e.pos = 0;
          e.startedAt = null;
          e.lastAt = null;
          e.combo = 0;
          setElapsed(0);
          setRunning(false);
          say("error", { k: expected });
          rerender();
          return;
        }
        if (e.errStreak === 3) say("errorStreak");
        else if (e.errStreak === 1 && Math.random() < 0.45) say("error", { k: expected });
      }
      rerender();
    },
    [finish, keyboardLayout, restartOnError, result, say],
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
        goNextRef.current();
        return;
      }
      if (ev.key.length === 1 && !ev.metaKey && !ev.ctrlKey) inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyStats, level, mode, reset, result, selectedKeys]);

  const applyTheme = (t: ThemeMode) => {
    setTheme(t);
    document.documentElement.classList.remove("dark", "light", "sepia", "oled");
    document.documentElement.classList.add(t);
    localStorage.setItem("lextype-theme", t);
  };

  const applyScale = (s: KeyboardScale) => {
    setUiScale(s);
    localStorage.setItem("lextype-scale", s);
  };

  const toggleRestartOnError = () => {
    setRestartOnError((prev) => {
      const next = !prev;
      localStorage.setItem("lextype-restart-on-error", next ? "1" : "0");
      return next;
    });
  };

  const handleVolumeChange = (vol: number) => {
    setVolumeState(vol);
    setVolume(vol);
    localStorage.setItem("lextype-volume", String(vol));
  };

  const handleTrainWeakKeys = (weakKeys: string[]) => {
    setSelectedKeys(weakKeys);
    reset(mode === "estudos" ? "automatico" : mode, weakKeys, keyStats, level);
    say("start");
  };

  const handleShare = async (res: SessionResult) => {
    const text = `⚖️ Treino de Digitação Jurídica concluído no LexType!\n⚡ Velocidade: ${res.wpm} PPM\n🎯 Precisão: ${res.accuracy}%\n🔥 Maior Combo: ${res.maxCombo}\n🏆 XP Ganho: +${res.xp}\nPatente: ${rankOf(xp).name}\n\nPratique vocabulário jurídico com teclado ABNT2 no LexType!`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "LexType — Minha Conquista",
          text,
        });
        return;
      } catch {
        // Fallback para clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      say("combo", { n: res.maxCombo });
      alert(
        "Resultado copiado para a área de transferência! Você pode colar nas suas redes sociais.",
      );
    }
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!/\.(txt|md|csv|json|html?)$/i.test(file.name) && !file.type.startsWith("text/")) {
      setStudyError("Envie um arquivo de texto (.txt ou .md).");
      return;
    }
    const text = (await file.text()).slice(0, 30000);
    setReference({ name: file.name, text });
    setStudyError(null);
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

  const applyKeyboardLayout = (layout: KeyboardLayout) => {
    setKeyboardLayout(layout);
    localStorage.setItem("lextype-keyboard-layout", layout);
    const groups = getKeyGroups(layout);
    setSelectedKeys(groups.Central);
    reset(mode, groups.Central, keyStats, level);
  };

  const applyPanelLayout = (pl: PanelLayout) => {
    setPanelLayout(pl);
    localStorage.setItem("lextype-panel-layout", pl);
  };

  const toggleShowLocalKeyboard = () => {
    setShowLocalKeyboard((prev) => {
      const next = !prev;
      localStorage.setItem("lextype-show-keyboard", next ? "1" : "0");
      return next;
    });
  };

  const openPopoutKeyboard = () => {
    window.open(
      "/keyboard",
      "LexTypeKeyboard",
      "width=1020,height=520,menubar=no,toolbar=no,location=no,status=no",
    );
  };

  const activeTrainableKeys = useMemo(() => getTrainableKeys(keyboardLayout), [keyboardLayout]);
  const activeGroups = useMemo(() => getKeyGroups(keyboardLayout), [keyboardLayout]);

  const goNext = () =>
    repeat && eng.current.text
      ? loadText(eng.current.text)
      : reset(mode, selectedKeys, keyStats, level);
  goNextRef.current = goNext;

  const e = eng.current;
  const pos = e.pos;
  const liveWpm = e.startedAt && pos > 0 && elapsed > 0 ? Math.round(pos / 5 / (elapsed / 60)) : 0;
  const liveAcc = pos > 0 ? Math.round((pos / (pos + e.errors)) * 100) : 100;
  const nextKeys = useMemo(
    () => (!result && e.text[pos] ? charToKeys(e.text[pos]!, keyboardLayout) : []),
    [result, e.text, pos, keyboardLayout],
  );
  const weak = useMemo(
    () => weakestKeys(keyStats, activeTrainableKeys, 3),
    [keyStats, activeTrainableKeys],
  );
  const rank = rankOf(xp);
  const inFlow = running && !result;
  const progress = e.text.length ? pos / e.text.length : 0;

  const broadcastRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const ch = new BroadcastChannel("lextype-channel");
      broadcastRef.current = ch;
      ch.onmessage = (ev) => {
        if (ev.data?.type === "REQUEST_SYNC") {
          ch.postMessage({
            type: "KEYBOARD_SYNC",
            nextKeys,
            flash,
            stats: keyStats,
            layout: keyboardLayout,
            scale: uiScale,
          });
        }
      };
      return () => {
        ch.close();
      };
    }
    return undefined;
  }, [keyboardLayout, nextKeys, flash, keyStats, uiScale]);

  useEffect(() => {
    broadcastRef.current?.postMessage({
      type: "KEYBOARD_SYNC",
      nextKeys,
      flash,
      stats: keyStats,
      layout: keyboardLayout,
      scale: uiScale,
    });
  }, [nextKeys, flash, keyStats, keyboardLayout, uiScale]);

  return (
    <div className="min-h-screen bg-background">
      {result && result.accuracy >= 90 && <Confetti key={quote.id} />}
      <header
        className={cn(
          "border-b border-border transition-opacity duration-500",
          inFlow && "opacity-25 hover:opacity-100",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-mono-type text-lg font-bold text-gold-foreground">
              §
            </div>
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
                <div
                  className="h-full bg-gold transition-all duration-700"
                  style={{ width: `${rank.progress * 100}%` }}
                />
              </div>
              {rank.next && (
                <div className="mt-0.5 text-[0.65rem] text-muted-foreground">
                  próx.: {rank.next}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="flex gap-1">
                {Array.from({ length: DAILY_GOAL }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      i < today ? "bg-success" : "bg-secondary",
                    )}
                  />
                ))}
              </div>
              <div className="mt-1 text-[0.65rem] text-muted-foreground">meta do dia</div>
            </div>
            <Stat value={`${streak}🔥`} label="dias" gold />
            <Stat value={bestWpm} label="melhor PPM" />
            <button
              onClick={openPopoutKeyboard}
              className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-gold hover:text-gold transition-colors"
              title="Destacar Teclado Visual em Janela Separada (ideal para 2º monitor)"
            >
              <span>🖥️</span>
              <span className="hidden sm:inline">2º Monitor</span>
            </button>
            <button
              onClick={() => setShowDiagnostic(true)}
              className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-gold hover:text-gold transition-colors"
              title="Abrir Mapa Diagnóstico de Teclas"
            >
              <span>📊</span>
              <span className="hidden sm:inline">Diagnóstico</span>
            </button>
            <button
              onClick={() => setShowSettings((v) => !v)}
              className={cn(
                "rounded-md border px-2 py-1 text-base",
                showSettings ? "border-gold" : "border-border",
              )}
              aria-label="Configurações"
              title="Configurações"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {showSettings && (
        <div className="animate-pop-in border-b border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-3 text-sm sm:px-6">
            <span className="font-semibold uppercase tracking-wider text-muted-foreground">
              Configurações
            </span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Tema:</span>
              <div className="flex overflow-hidden rounded-md border border-border">
                {(
                  [
                    { id: "dark", label: "🌙 Escuro" },
                    { id: "light", label: "☀️ Claro" },
                    { id: "sepia", label: "📜 Sépia" },
                    { id: "oled", label: "⬛ OLED" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => applyTheme(t.id)}
                    className={cn(
                      "px-2.5 py-1 text-xs transition-colors",
                      theme === t.id
                        ? "bg-gold text-gold-foreground font-semibold"
                        : "hover:bg-secondary",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Disposição:</span>
              <div className="flex overflow-hidden rounded-md border border-border">
                {(
                  [
                    { id: "stack", label: "📑 Vertical" },
                    { id: "split", label: "🔲 Lado a Lado" },
                    { id: "keyboard-top", label: "🔄 Teclado Topo" },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPanelLayout(p.id)}
                    className={cn(
                      "px-2.5 py-1 text-xs transition-colors",
                      panelLayout === p.id
                        ? "bg-gold text-gold-foreground font-semibold"
                        : "hover:bg-secondary",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Teclado:</span>
              <div className="flex overflow-hidden rounded-md border border-border">
                {(
                  [
                    { id: "abnt2", label: "🇧🇷 ABNT2 (com Ç)" },
                    { id: "ansi", label: "🇺🇸 ANSI (sem Ç)" },
                  ] as const
                ).map((k) => (
                  <button
                    key={k.id}
                    onClick={() => applyKeyboardLayout(k.id)}
                    className={cn(
                      "px-2.5 py-1 text-xs transition-colors",
                      keyboardLayout === k.id
                        ? "bg-gold text-gold-foreground font-semibold"
                        : "hover:bg-secondary",
                    )}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Escala:</span>
              <div className="flex overflow-hidden rounded-md border border-border">
                {(
                  [
                    { id: "compact", label: "▫️ Compacto" },
                    { id: "normal", label: "▪️ Padrão" },
                    { id: "large", label: "⬛ Grande" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => applyScale(s.id)}
                    className={cn(
                      "px-2.5 py-1 text-xs transition-colors",
                      uiScale === s.id
                        ? "bg-gold text-gold-foreground font-semibold"
                        : "hover:bg-secondary",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={toggleShowLocalKeyboard}
              className="rounded-md border border-border px-3 py-1 hover:bg-secondary text-xs"
              title="Ocultar ou exibir o teclado visual na tela principal"
            >
              {showLocalKeyboard ? "⌨️ Teclado na Tela: Ligado" : "⌨️ Teclado na Tela: Oculto"}
            </button>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={restartOnError}
                onChange={toggleRestartOnError}
                className="rounded border-border accent-gold"
              />
              <span title="Ao errar um caractere, a linha reinicia do zero para treinar precisão máxima">
                Reiniciar ao errar (Modo Rigor)
              </span>
            </label>

            <button
              onClick={toggleMute}
              className="rounded-md border border-border px-3 py-1 hover:bg-secondary text-xs"
            >
              {muted ? "🔇 Som desligado" : "🔊 Som ligado"}
            </button>
          </div>
        </div>
      )}

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

        {/* Disposição flexível das janelas */}
        {(() => {
          const professorNode = (
            <div className="flex items-start gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-card text-2xl"
                title="Prof. Dr. Rigoroso"
              >
                👨‍⚖️
              </div>
              <div
                key={quote.id}
                className={cn(
                  "animate-pop-in relative rounded-xl rounded-tl-none border px-4 py-2.5 text-sm flex-1",
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
          );

          const modeInfoNode = (
            <>
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
                      <span className="font-mono-type uppercase text-destructive">
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
                        onClick={() => setLineCount((n) => Math.max(2, n - 1))}
                        className="h-7 w-7 rounded-md border border-border bg-card"
                        aria-label="Menos linhas"
                      >
                        −
                      </button>
                      <span
                        id="lines"
                        className="w-6 text-center font-mono-type font-bold text-gold"
                      >
                        {lineCount}
                      </span>
                      <button
                        onClick={() => setLineCount((n) => Math.min(10, n + 1))}
                        className="h-7 w-7 rounded-md border border-border bg-card"
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
                </div>
              )}
            </>
          );

          const typingNode = (
            <div className="space-y-6">
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
                    repeat={repeat}
                    onNext={goNext}
                    onShare={handleShare}
                  />
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
                        Tempo{" "}
                        <span className="font-bold text-foreground">{elapsed.toFixed(0)}s</span>
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
                          "font-mono-type leading-relaxed tracking-wide",
                          uiScale === "compact"
                            ? "text-lg sm:text-xl"
                            : uiScale === "large"
                              ? "text-2xl sm:text-3xl"
                              : "text-xl sm:text-2xl",
                        )}
                      >
                        {e.text.split("").map((ch, i) => (
                          <span
                            key={i}
                            className={cn(
                              i < pos && "text-muted-foreground/40",
                              i === pos &&
                                (e.wrongAt === i
                                  ? "rounded-sm bg-destructive/40 text-destructive-foreground animate-shake"
                                  : "rounded-sm bg-gold/30 text-gold animate-caret"),
                              i > pos && "text-foreground",
                            )}
                          >
                            {ch === " " && i === pos ? "␣" : ch}
                          </span>
                        ))}
                      </p>
                    )}
                    <p className="mt-5 text-center text-xs text-muted-foreground">
                      {focused
                        ? "Errou? Você só avança quando acertar a tecla."
                        : "Toque ou clique aqui e comece a digitar"}
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

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setRepeat((r) => !r)}
                  aria-pressed={repeat}
                  title="Repetir a mesma frase até você desligar"
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    repeat
                      ? "border-gold bg-gold text-gold-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  🔁 Repetir frase {repeat ? "ligado" : "desligado"}
                </button>
                {!result && e.text && (
                  <button
                    onClick={() => loadText(e.text)}
                    className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    ↺ Recomeçar esta
                  </button>
                )}
              </div>

              {pinned && <LessonCard item={pinned} onClose={() => setPinned(null)} />}
            </div>
          );

          const keyboardNode = showLocalKeyboard ? (
            <section className="rounded-xl border border-border bg-card p-4 sm:p-6 transition-all shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Teclado Visual & Dedilhado
                  </span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[0.65rem] font-mono-type text-gold uppercase font-bold">
                    {keyboardLayout === "ansi" ? "ANSI (US - sem Ç)" : "ABNT2 (Brasil)"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openPopoutKeyboard}
                    className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground hover:border-gold hover:text-gold transition-colors"
                    title="Abrir Teclado no 2º Monitor (Pop-Out)"
                  >
                    <span>🖥️</span>
                    <span>2º Monitor</span>
                  </button>
                  <button
                    onClick={toggleShowLocalKeyboard}
                    className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                    title="Ocultar teclado local nesta tela"
                  >
                    ✕ Ocultar
                  </button>
                </div>
              </div>

              <Keyboard
                nextKeys={nextKeys}
                stats={keyStats}
                selectedKeys={[]}
                flash={flash}
                scale={uiScale}
                layout={keyboardLayout}
              />
              <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
                <Legend cls="bg-success/40" label="dominada" />
                <Legend cls="bg-gold/30" label="em progresso" />
                <Legend cls="bg-destructive/40" label="precisa de treino" />
              </div>
            </section>
          ) : null;

          const selectionNode = (
            <section
              className={cn(
                "rounded-xl border border-border bg-card p-4 transition-opacity duration-500 sm:p-6",
                inFlow && "opacity-25 hover:opacity-100",
              )}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {mode === "automatico"
                    ? "Marque as teclas em que você tem mais dificuldade"
                    : "Teclas-alvo do treino"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(activeGroups) as [string, string[]][])
                    .filter(([, g]) => g.length > 0)
                    .map(([name, g]) => (
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
                    onClick={() => applyKeys(activeTrainableKeys)}
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
                compact
                scale={uiScale}
                layout={keyboardLayout}
              />
            </section>
          );

          if (panelLayout === "split") {
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-6">
                  {professorNode}
                  {modeInfoNode}
                  {typingNode}
                </div>
                <div className="lg:col-span-5 space-y-6">
                  {keyboardNode}
                  {selectionNode}
                </div>
              </div>
            );
          }

          if (panelLayout === "keyboard-top") {
            return (
              <>
                {professorNode}
                {keyboardNode}
                {modeInfoNode}
                {typingNode}
                {selectionNode}
              </>
            );
          }

          return (
            <>
              {professorNode}
              {modeInfoNode}
              {typingNode}
              {keyboardNode}
              {selectionNode}
            </>
          );
        })()}

        {/* Rodapé de Governança, Transparência Jurídica e Privacidade */}
        <footer className="border-t border-border pt-6 pb-12 text-center text-xs text-muted-foreground space-y-2">
          <p>
            ⚖️ <strong>LexType:</strong> Treinador de memória muscular e digitação jurídica em
            layout ABNT2 brasileiro.
          </p>
          <p className="text-[0.7rem] max-w-2xl mx-auto">
            O material de estudo destina-se exclusivamente à prática de digitação e fixação
            pedagógica. Conteúdos e viradas de chave gerados por IA devem ser conferidos com as
            fontes legislativas oficiais e não substituem consulta jurídica profissional.
          </p>
          <p className="text-[0.65rem] opacity-75">
            🔒 <strong>Privacidade:</strong> Suas estatísticas, histórico e preferências residem
            integralmente no armazenamento local do navegador (localStorage), sem rastreamento de
            anúncios.
          </p>
        </footer>
      </main>

      {showDiagnostic && (
        <DiagnosticMap
          stats={keyStats}
          onClose={() => setShowDiagnostic(false)}
          onTrainWeakKeys={handleTrainWeakKeys}
        />
      )}
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

function LessonCard({ item, onClose }: { item: StudyItem; onClose: () => void }) {
  return (
    <div className="animate-pop-in relative space-y-4 rounded-xl border border-gold/40 bg-gold/5 p-5">
      <button
        onClick={onClose}
        className="absolute right-3 top-3 rounded-md px-2 text-muted-foreground hover:text-foreground"
        aria-label="Fechar aula"
      >
        ✕
      </button>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-gold">Semântica</div>
        <p className="mt-1 pr-6 text-sm">
          <span className="font-mono-type font-bold">{item.termo}</span> — {item.semantica}
        </p>
      </div>
      <div className="border-t border-gold/20 pt-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-gold">
          Virada de chave · {item.virada.titulo}
        </div>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Raciocínio: </span>
          {item.virada.raciocinio}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Exemplo: </span>
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
  onShare,
  repeat,
}: {
  result: SessionResult;
  weak: string[];
  onNext: () => void;
  onShare: (res: SessionResult) => void;
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
      {result.levelChange !== 0 && (
        <p
          className={cn(
            "text-sm font-semibold",
            result.levelChange > 0 ? "text-success" : "text-destructive",
          )}
        >
          {result.levelChange > 0
            ? "▲ Subiu de nível — a próxima rota será mais pesada"
            : "▼ Nível reduzido — de volta ao básico"}
        </p>
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
          <span className="font-mono-type font-bold uppercase text-destructive">
            {weak.join("  ")}
          </span>
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onNext}
          className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground transition-transform hover:scale-105"
        >
          {repeat ? "🔁 Repetir frase" : "Próxima sessão"}{" "}
          <span className="opacity-60">(Enter)</span>
        </button>
        <button
          onClick={() => onShare(result)}
          className="rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          📤 Compartilhar Conquista
        </button>
      </div>
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
