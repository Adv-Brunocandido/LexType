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
import { extractComplexLegalTerm } from "@/lib/legal-terms";
import { getStudyOfflineModule, getLeiSecaModule } from "@/lib/lazy-modules";
import { LeiSecaPanel } from "@/components/LeiSecaPanel";
import { DicionarioPanel } from "@/components/DicionarioPanel";
import { RankingRecordsPanel } from "@/components/RankingRecordsPanel";
import { ProfileModal } from "@/components/ProfileModal";
import { MovableCard } from "@/components/MovableCard";
import { getActiveProfile, updateActiveProfile, type UserProfile } from "@/lib/profiles";
import { type LeiSecaItem, LEI_SECA_EIXOS, leiSecaToStudyItem } from "@/lib/lei-seca-types";
import {
  calculateTribunalScore,
  getRandomTribunalAcordao,
  TRIBUNAL_DURATION_SECONDS,
  type TribunalExamText,
  type TribunalScoreResult,
} from "@/lib/tribunal-simulado";
import { downloadBackupFile, restoreBackupData } from "@/lib/backup";
import {
  getMetronomeBpm,
  setMetronome,
  startMetronome,
  stopMetronome,
  type MetronomeBpm,
} from "@/lib/sound";

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
  type TypingErrorMode,
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

type FullMode = Mode | "estudos" | "leiseca" | "tribunal";

const MODES: { id: FullMode; label: string; hint: string }[] = [
  {
    id: "automatico",
    label: "⚡ Automático",
    hint: "O professor detecta suas fraquezas e ajusta rota e dificuldade",
  },
  {
    id: "estudos",
    label: "🎓 Estudos OAB",
    hint: "Digite linhas de uma área do Direito e aprenda viradas de chave",
  },
  {
    id: "leiseca",
    label: "📜 Lei Seca",
    hint: "Artigos da CF/88, Códigos e Súmulas com viradas de chave e atualidades",
  },
  {
    id: "tribunal",
    label: "🏛️ Simulado de Tribunal",
    hint: "Prova prática oficial de 5 minutos com acórdãos e avaliação forense",
  },
  { id: "aquecimento", label: "Aquecimento", hint: "Bigramas e trigramas com as teclas-alvo" },
  { id: "palavras", label: "Palavras jurídicas", hint: "Termos do Direito filtrados pelas teclas" },
  { id: "frases", label: "Frases", hint: "Frases jurídicas completas" },
];

// Matérias do Exame da OAB (1ª fase) e Brocardos Forenses
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
  "Brocardos e Latim Forense",
];

const CUSTOM = "__custom__";

interface Prefs {
  stopOnError: boolean;
  errorMode: TypingErrorMode;
  caps: boolean;
  punct: boolean;
  symbols: boolean;
}
const DEFAULT_PREFS: Prefs = {
  stopOnError: true,
  errorMode: "strict",
  caps: false,
  punct: false,
  symbols: false,
};
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
  const [useAttachedDoc, setUseAttachedDoc] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [pinned, setPinned] = useState<StudyItem | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState<
    "rigor" | "ergonomia" | "texto" | "audio" | "sistema"
  >("rigor");
  const [layoutMode, setLayoutMode] = useState<"auto" | "widescreen" | "classic">(() => {
    if (typeof localStorage === "undefined") return "auto";
    try {
      const s = localStorage.getItem("lextype-layout-mode");
      if (s === "widescreen" || s === "classic" || s === "auto") return s;
    } catch {}
    return "auto";
  });
  const [fontFamily, setFontFamily] = useState<"sans" | "serif">(() => {
    if (typeof localStorage === "undefined") return "sans";
    try {
      const s = localStorage.getItem("lextype-font-family");
      if (s === "serif" || s === "sans") return s;
    } catch {}
    return "sans";
  });
  const [isThesisExpanded, setIsThesisExpanded] = useState(true);
  const [metronomeBpm, setMetronomeBpmState] = useState<MetronomeBpm>(() => getMetronomeBpm());
  const [isLoadingModule, setIsLoadingModule] = useState(false);
  const leiSecaModRef = useRef<typeof import("@/lib/lei-seca") | null>(null);
  const studyOfflineModRef = useRef<typeof import("@/lib/study-offline") | null>(null);

  // Estados do Simulado de Tribunal (5 Minutos)
  const [tribunalItem, setTribunalItem] = useState<TribunalExamText | null>(null);
  const [tribunalSeconds, setTribunalSeconds] = useState(TRIBUNAL_DURATION_SECONDS);
  const [tribunalActive, setTribunalActive] = useState(false);
  const [tribunalScore, setTribunalScore] = useState<TribunalScoreResult | null>(null);

  // Diagnóstico em Tempo Real da IA
  const [aiStatusMessage, setAiStatusMessage] = useState<string | null>(null);
  const [aiStatusType, setAiStatusType] = useState<"success" | "quota" | "idle" | "testing">("idle");

  const [activeTab, setActiveTab] = useState<
    "treino" | "leiseca" | "dicionario" | "desempenho" | "ranking"
  >("treino");
  const [leiSecaEixo, setLeiSecaEixo] = useState<string>("Todos os Eixos");
  const [leiSecaDiploma, setLeiSecaDiploma] = useState<string>("Todos os Diplomas");
  const [leiSecaStartingId, setLeiSecaStartingId] = useState<string>("random");
  const [currentLeiSeca, setCurrentLeiSeca] = useState<LeiSecaItem | null>(null);
  const seenLeiSecaIds = useRef<string[]>([]);


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
  const [aiProvider, setAiProvider] = useState<
    "gemini" | "openai" | "claude" | "deepseek" | "grok" | "lovable"
  >(() => {
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

  const [activeProfile, setActiveProfile] = useState<UserProfile>(() => getActiveProfile());
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [prefs, setPrefs] = useState<Prefs>(() => {
    if (typeof localStorage === "undefined") return DEFAULT_PREFS;
    try {
      const p = localStorage.getItem("lextype-prefs");
      if (p) {
        const parsed = JSON.parse(p);
        const errorMode: TypingErrorMode =
          parsed.errorMode || (parsed.stopOnError === false ? "fluid" : "strict");
        return {
          ...DEFAULT_PREFS,
          ...parsed,
          errorMode,
          stopOnError: errorMode === "strict",
        };
      }
      return DEFAULT_PREFS;
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
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const [typingParts, setTypingParts] = useState<string[]>([]);
  const [partIndex, setPartIndex] = useState(0);

  const say = useCallback((mood: Mood, vars?: { k?: string; n?: number }) => {
    setQuote((q) => ({ text: professorSays(mood, vars), mood, id: q.id + 1 }));
  }, []);

  const splitTextIntoTypingParts = useCallback((raw: string, maxLen = 220): string[] => {
    const clean = raw
      .replace(/[\u00A0\u200B]/g, " ")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean || clean.length <= maxLen) return clean ? [clean] : [""];

    const sentences = clean.split(/(?<=[;:.!?])\s+/).filter((s) => s.trim().length > 3);
    const parts: string[] = [];
    let current = "";
    for (const s of sentences) {
      if (s.length > maxLen) {
        const clauses = s.split(/(?<=[,])\s+/).filter((c) => c.trim().length > 2);
        for (const c of clauses) {
          if (!current) {
            current = c.trim();
          } else if ((current + " " + c).length <= maxLen) {
            current += " " + c.trim();
          } else {
            parts.push(current);
            current = c.trim();
          }
        }
      } else {
        if (!current) {
          current = s.trim();
        } else if ((current + " " + s).length <= maxLen) {
          current += " " + s.trim();
        } else {
          parts.push(current);
          current = s.trim();
        }
      }
    }
    if (current) parts.push(current);

    if (parts.length <= 1) {
      const words = clean.split(" ");
      const wordParts: string[] = [];
      let curW = "";
      for (const w of words) {
        if ((curW + " " + w).length <= maxLen) {
          curW += (curW ? " " : "") + w;
        } else {
          if (curW) wordParts.push(curW);
          curW = w;
        }
      }
      if (curW) wordParts.push(curW);
      return wordParts.length > 0 ? wordParts : [clean];
    }

    return parts;
  }, []);

  const loadText = useCallback(
    (text: string, targetPartIdx = 0) => {
      const parts = splitTextIntoTypingParts(text);
      const pIdx = Math.min(Math.max(0, targetPartIdx), Math.max(0, parts.length - 1));
      setTypingParts(parts);
      setPartIndex(pIdx);
      const activeText = parts[pIdx] || text;
      eng.current = newEngine(activeText);
      consumed.current = 0;
      if (inputRef.current) inputRef.current.value = "";
      setElapsed(0);
      setRunning(false);
      setResult(null);
      setFlash(null);
      rerender();
    },
    [splitTextIntoTypingParts],
  );

  const enrichText = useCallback((text: string, p: Prefs) => {
    const modifiers: TextModifiers = {
      capitals: p.caps,
      punctuation: p.punct,
      symbols: p.symbols,
    };
    return applyModifiers(text, modifiers);
  }, []);

  const ensureLeiSecaMod = useCallback(async () => {
    if (leiSecaModRef.current) return leiSecaModRef.current;
    setIsLoadingModule(true);
    try {
      const mod = await getLeiSecaModule();
      leiSecaModRef.current = mod;
      return mod;
    } finally {
      setIsLoadingModule(false);
    }
  }, []);

  const ensureStudyOfflineMod = useCallback(async () => {
    if (studyOfflineModRef.current) return studyOfflineModRef.current;
    setIsLoadingModule(true);
    try {
      const mod = await getStudyOfflineModule();
      studyOfflineModRef.current = mod;
      return mod;
    } finally {
      setIsLoadingModule(false);
    }
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

      const normalizedAreaKey = ar
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const cacheKey = `lextype-ai-cache-${normalizedAreaKey}`;
      const attachedText = useAttachedDoc && reference?.text ? reference.text : undefined;

      try {
        const r = await fetchStudy({
          data: {
            area: ar,
            keys,
            seen: seenTerms.current.slice(-20),
            count: activeCount,
            reference: attachedText,
            userApiKey: aiKey || undefined,
            userApiProvider: aiProvider || undefined,
          },
        });

        let items: StudyItem[] = [];
        if (r.itens && r.itens.length > 0) {
          items = r.itens;
          try {
            localStorage.setItem(cacheKey, JSON.stringify(r.itens));
          } catch {}
        } else {
          // Tenta ler do cache local resiliente da IA
          let fromCache: StudyItem[] | null = null;
          try {
            const raw = localStorage.getItem(cacheKey);
            if (raw) {
              const p = JSON.parse(raw);
              if (Array.isArray(p) && p.length > 0) fromCache = p;
            }
          } catch {}

          if (fromCache && fromCache.length >= activeCount) {
            items = fromCache.slice(0, activeCount);
          } else {
            const { offlineStudy } = await ensureStudyOfflineMod();
            items = offlineStudy(ar, activeCount, seenTerms.current, attachedText);
          }
        }

        if (r.error || !r.itens?.length)
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
        const { offlineStudy } = await ensureStudyOfflineMod();
        const items = offlineStudy(ar, activeCount, seenTerms.current, attachedText);
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
    [fetchStudy, loadText, lineCount, reference, useAttachedDoc, aiKey, aiProvider, ensureStudyOfflineMod],
  );

  const [availableDiplomas, setAvailableDiplomas] = useState<string[]>(["Todos os Diplomas"]);
  const [availableLeiSecaItems, setAvailableLeiSecaItems] = useState<LeiSecaItem[]>([]);

  useEffect(() => {
    if (mode === "leiseca" || activeTab === "leiseca") {
      void ensureLeiSecaMod().then((mod) => {
        setAvailableDiplomas(mod.getDiplomasList());
        setAvailableLeiSecaItems(mod.getAllLeiSecaItems(leiSecaEixo, leiSecaDiploma));
      });
    }
  }, [mode, activeTab, leiSecaEixo, leiSecaDiploma, ensureLeiSecaMod]);

  const nextLeiSeca = useCallback(
    async (eixoOverride?: string, forceRandom = false, diplomaOverride?: string) => {
      const mod = await ensureLeiSecaMod();
      const targetEixo = eixoOverride ?? leiSecaEixo;
      const targetDiploma = diplomaOverride ?? leiSecaDiploma;
      const isRandom = forceRandom || leiSecaStartingId === "random";
      const item = isRandom
        ? mod.getRandomLeiSecaItem(targetEixo, seenLeiSecaIds.current, targetDiploma)
        : mod.getNextLeiSecaItem(targetEixo, seenLeiSecaIds.current, targetDiploma);
      seenLeiSecaIds.current.push(item.id);
      if (seenLeiSecaIds.current.length >= mod.LEI_SECA_BANK.length) {
        seenLeiSecaIds.current = [item.id];
      }
      setCurrentLeiSeca(item);
      const studyItem = mod.leiSecaToStudyItem(item);
      setCurrentStudy(studyItem);
      loadText(item.texto);
    },
    [ensureLeiSecaMod, leiSecaEixo, leiSecaDiploma, leiSecaStartingId, loadText],
  );

  const prevLeiSeca = useCallback(
    async (eixoOverride?: string, diplomaOverride?: string) => {
      const mod = await ensureLeiSecaMod();
      const targetEixo = eixoOverride ?? leiSecaEixo;
      const targetDiploma = diplomaOverride ?? leiSecaDiploma;
      const item = mod.getPreviousLeiSecaItem(
        currentLeiSeca?.id,
        targetEixo,
        seenLeiSecaIds.current,
        targetDiploma,
      );
      if (seenLeiSecaIds.current.length > 1) {
        seenLeiSecaIds.current.pop();
      }
      setCurrentLeiSeca(item);
      const studyItem = mod.leiSecaToStudyItem(item);
      setCurrentStudy(studyItem);
      loadText(item.texto);
    },
    [ensureLeiSecaMod, currentLeiSeca?.id, leiSecaEixo, leiSecaDiploma, loadText],
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
      if (m === "leiseca") {
        void nextLeiSeca();
        return;
      }
      if (m === "tribunal") {
        const item = getRandomTribunalAcordao();
        setTribunalItem(item);
        setTribunalSeconds(TRIBUNAL_DURATION_SECONDS);
        setTribunalActive(true);
        setTribunalScore(null);
        setCurrentStudy({
          linha: item.texto,
          termo: `Acórdão ${item.tribunal}`,
          semantica: item.ementa,
          virada: {
            titulo: `${item.origem} — ${item.relator}`,
            conceito: item.ementa,
            raciocinio: "Jurisprudência oficial aplicada em concurso forense e prática judiciária.",
            exemplo: item.texto,
          },
        });
        loadText(item.texto);
        return;
      }
      setTribunalActive(false);
      setCurrentStudy(null);
      setCurrentLeiSeca(null);

      if (m === "automatico") {
        const r = adaptiveRoute(keys, stats);
        setRoute(r);
        loadText(
          enrichText(
            generateText({
              mode: "palavras",
              keys: r.target,
              weak: r.weak,
              level: lvl,
              lines: activeLines,
            }),
            prefsRef.current,
          ),
        );
      } else {
        setRoute(null);
        loadText(
          enrichText(
            generateText({
              mode: m,
              keys,
              weak: weakestKeys(stats, keys),
              level: lvl,
              lines: activeLines,
            }),
            prefsRef.current,
          ),
        );
      }
    },
    [effectiveArea, enrichText, lineCount, loadText, nextStudy, studyQueue, nextLeiSeca],
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
    let newLevel = level;
    if (mode === "automatico") {
      if (accuracy >= 96 && wpm >= 12 + level * 3) levelChange = 1;
      else if (accuracy < 88) levelChange = -1;
      newLevel = Math.min(10, Math.max(1, level + levelChange));
      if (newLevel === level) levelChange = 0;
      setLevel(newLevel);
      saveNum("lextype-level", newLevel);
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

    // Mantém o perfil do usuário ativo sincronizado
    const updatedProf = updateActiveProfile({
      xp: newXp,
      level: newLevel,
      bestWpm: Math.max(bestWpm, wpm),
      streak: streakDays(),
      practiceTodaySeconds: practiced,
      sessions: loadSessions(),
      keyStats: stats,
    });
    setActiveProfile(updatedProf);

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
  }, [bestWpm, currentStudy, level, mode, say, xp]);

  const processChar = useCallback(
    (ch: string) => {
      const e = eng.current;
      if (result || !e.text || e.pos >= e.text.length) return;
      const outcome = typeChar(e, ch, {
        stopOnError: prefsRef.current.errorMode === "strict",
        errorMode: prefsRef.current.errorMode,
        caseSensitive: prefsRef.current.caps,
        layout: keyboardLayout,
        now: Date.now(),
      });

      if (outcome.started) setRunning(true);

      if (outcome.kind === "correct") {
        playKey();
        if (flashTimerRef.current) {
          clearTimeout(flashTimerRef.current);
          flashTimerRef.current = null;
        }
        if (COMBO_MILESTONES.includes(e.combo) || (e.combo > 200 && e.combo % 50 === 0)) {
          playCombo();
          setComboPulse((p) => p + 1);
          say("combo", { n: e.combo });
        }
        setFlash(null);
        if (outcome.finished) {
          if (typingParts.length > 1 && partIndex < typingParts.length - 1) {
            const nextIdx = partIndex + 1;
            setPartIndex(nextIdx);
            const nextText = typingParts[nextIdx] || "";
            eng.current = newEngine(nextText);
            consumed.current = 0;
            if (inputRef.current) inputRef.current.value = "";
            playWin();
            say("finishGreat");
          } else {
            finish();
          }
        }
      } else if (outcome.kind === "wrong") {
        playError();
        const pressedKeys = charToKeys(ch, keyboardLayout);
        const typedKey = pressedKeys[0] || ch.toLowerCase();
        setFlash({ key: typedKey, type: "err" });
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => {
          setFlash(null);
        }, 350);

        if (outcome.restarted) {
          consumed.current = 0;
          if (inputRef.current) inputRef.current.value = "";
          setElapsed(0);
          setRunning(false);
          say("errorStreak");
        } else {
          if (e.errStreak === 3) say("errorStreak");
          else if (e.errStreak === 1 && Math.random() < 0.45) say("error", { k: outcome.expected });
        }
      }
      rerender();
    },
    [finish, keyboardLayout, partIndex, result, say, typingParts],
  );

  const handleBackspace = () => {
    const e = eng.current;
    if (result) return;
    const curMode = prefsRef.current.errorMode;
    if (curMode === "nobackspace" || curMode === "strict" || curMode === "restart") return;
    const ok = backspace(e, curMode);
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
      if (
        t.tagName === "SELECT" ||
        t.tagName === "TEXTAREA" ||
        (t.tagName === "INPUT" && t !== inputRef.current)
      )
        return;
      if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault();
        setIsThesisExpanded((prev) => !prev);
        return;
      }
      if (ev.key === "Enter" && result) {
        ev.preventDefault();
        goNextRef.current();
        return;
      }
      if (ev.key === "Escape") {
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

  // Contagem regressiva do Simulado de Tribunal (5 Minutos)
  useEffect(() => {
    if (mode !== "tribunal" || !tribunalActive || tribunalSeconds <= 0 || result) return;
    const t = setInterval(() => {
      setTribunalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mode, tribunalActive, tribunalSeconds, result]);

  // Avaliação ao vivo / final do Simulado de Tribunal
  useEffect(() => {
    if (mode === "tribunal" && (tribunalSeconds === 0 || result)) {
      const elapsed = TRIBUNAL_DURATION_SECONDS - tribunalSeconds;
      const scoreRes = calculateTribunalScore(eng.current.pos, eng.current.errors, elapsed || 1);
      setTribunalScore(scoreRes);
      setTribunalActive(false);
    }
  }, [mode, tribunalSeconds, result]);

  // Sincronização do Metrônomo Rítmico durante a digitação
  useEffect(() => {
    if (metronomeBpm !== "off" && focused && !result && eng.current.text.length > 0) {
      startMetronome(metronomeBpm);
    } else {
      stopMetronome();
    }
    return () => stopMetronome();
  }, [metronomeBpm, focused, result]);

  // Testador de Conexão com a IA
  const handleTestAiConnection = async () => {
    setAiStatusType("testing");
    setAiStatusMessage("Testando conectividade com o provedor de IA...");
    try {
      const res = await fetchStudy({
        data: {
          area: "Direito Constitucional",
          keys: KEY_GROUPS.Central,
          seen: [],
          count: 1,
          userApiKey: aiKey || undefined,
          userApiProvider: aiProvider || undefined,
        },
      });

      if (res.error) {
        const errStr = res.error.toLowerCase();
        if (
          errStr.includes("402") ||
          errStr.includes("crédito") ||
          errStr.includes("quota") ||
          errStr.includes("payment")
        ) {
          setAiStatusType("quota");
          setAiStatusMessage(
            "Créditos de IA esgotados temporariamente. Modo Offline Ativo (100% Funcional).",
          );
        } else {
          setAiStatusType("quota");
          setAiStatusMessage(`Modo Offline Ativo (100% Funcional). Detalhe: ${res.error}`);
        }
      } else {
        setAiStatusType("success");
        setAiStatusMessage("Conexão com Gemini / IA Operacional (HTTP 200 OK).");
      }
    } catch (err) {
      const errStr = String(err).toLowerCase();
      if (errStr.includes("402") || errStr.includes("quota") || errStr.includes("crédito")) {
        setAiStatusType("quota");
        setAiStatusMessage(
          "Créditos de IA esgotados temporariamente. Modo Offline Ativo (100% Funcional).",
        );
      } else {
        setAiStatusType("quota");
        setAiStatusMessage("Modo Offline Ativo (100% Funcional).");
      }
    }
  };


  const applyTheme = (t: ThemeMode) => {
    setTheme(t);
    document.documentElement.classList.remove("dark", "light", "sepia", "oled", "aquarela");
    document.documentElement.classList.add(t);
    localStorage.setItem("lextype-theme", t);
  };

  const updatePrefs = (patch: Partial<Prefs>) => {
    const nextPatch = { ...patch };
    if ("errorMode" in patch && patch.errorMode) {
      nextPatch.stopOnError = patch.errorMode === "strict";
    } else if ("stopOnError" in patch && patch.stopOnError !== undefined) {
      nextPatch.errorMode = patch.stopOnError ? "strict" : "fluid";
    }
    const next = { ...prefsRef.current, ...nextPatch };
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
    const cleaned = raw
      .replace(/[\u00A0\u200B]/g, " ")
      .replace(/\r\n/g, "\n")
      .trim();
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
  const handleAreaChange = (newArea: string) => {
    setArea(newArea);
    setStudyQueue([]);
    seenTerms.current = [];
    const eff = newArea === CUSTOM ? customArea.trim() || "Direito em geral" : newArea;
    reset("estudos", selectedKeys, keyStats, level, { area: eff, freshStudy: true });
  };
  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    soundSettings.enabled = !m;
    localStorage.setItem("lextype-muted", m ? "1" : "0");
  };

  const goNext = () => {
    if (typingParts.length > 1 && partIndex < typingParts.length - 1) {
      const nextIdx = partIndex + 1;
      setPartIndex(nextIdx);
      const nextText = typingParts[nextIdx] || "";
      eng.current = newEngine(nextText);
      consumed.current = 0;
      if (inputRef.current) inputRef.current.value = "";
      setResult(null);
      setRunning(false);
      rerender();
      return;
    }
    if (repeat && eng.current.text) {
      loadText(eng.current.text);
    } else if (mode === "estudos") {
      void nextStudy(studyQueue, selectedKeys, effectiveArea);
    } else if (mode === "leiseca") {
      nextLeiSeca();
    } else {
      reset(mode, selectedKeys, keyStats, level);
    }
  };
  goNextRef.current = goNext;

  const e = eng.current;
  const pos = e.pos;
  const liveWpm = e.startedAt && pos > 0 && elapsed > 0 ? Math.round(pos / 5 / (elapsed / 60)) : 0;
  const liveAcc = pos > 0 ? Math.round((pos / (pos + e.errors)) * 100) : 100;
  const nextKeys = !result && e.text[pos] ? charToKeys(e.text[pos]!, keyboardLayout) : [];
  const nextKeysSig = nextKeys.join("|");

  // Sincronização com o teclado da 2ª tela (substitui o teclado da plataforma)
  const [popoutActive, setPopoutActive] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const syncRef = useRef<() => void>(() => {});
  syncRef.current = () => {
    channelRef.current?.postMessage({
      type: "KEYBOARD_SYNC",
      nextKeys,
      flash,
      stats: keyStats,
      layout: keyboardLayout,
      mode: keyboardMode,
    });
  };
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const ch = new BroadcastChannel("lextype-channel");
    channelRef.current = ch;
    ch.onmessage = (ev) => {
      const t = ev.data?.type;
      if (t === "REQUEST_SYNC" || t === "POPOUT_ALIVE") {
        setPopoutActive(true);
        if (t === "REQUEST_SYNC") syncRef.current();
      } else if (t === "POPOUT_CLOSED") setPopoutActive(false);
    };
    ch.postMessage({ type: "MAIN_PING" });
    return () => {
      ch.close();
      channelRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (popoutActive) syncRef.current();
  }, [popoutActive, nextKeysSig, flash, keyStats, keyboardLayout, keyboardMode]);

  useEffect(() => {
    const h = (ev: Event) => {
      const d = (ev as CustomEvent<{ from: string; to: string }>).detail;
      if (d) moveBoxTo(d.from, d.to);
    };
    window.addEventListener("lextype-box-drop", h);
    return () => window.removeEventListener("lextype-box-drop", h);
  });
  const moveBoxTo = (from: string, to: string) => {
    if (from === to) return;
    setBoxOrder((prev) => {
      const next = prev.filter((b) => b !== from);
      const idx = next.indexOf(to);
      if (idx === -1) return prev;
      const fromIdx = prev.indexOf(from);
      const toIdx = prev.indexOf(to);
      next.splice(fromIdx < toIdx ? idx + 1 : idx, 0, from);
      localStorage.setItem("lextype-box-order", JSON.stringify(next));
      return next;
    });
  };
  const weak = useMemo(() => weakestKeys(keyStats, TRAINABLE_KEYS, 3), [keyStats]);
  const rank = rankOf(xp, bestWpm, liveAcc);
  const inFlow = running && !result;
  const progress = e.text.length ? pos / e.text.length : 0;
  const complexTerm = useMemo(() => {
    return extractComplexLegalTerm(e.text || "");
  }, [e.text]);

  const renderModeBanners = () => (
    <>
      {mode === "tribunal" && tribunalItem && (
        <div className="space-y-3 rounded-xl border border-gold/40 bg-gold/5 p-4 text-sm shadow-sm backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-gold text-xs uppercase tracking-wider">
                🏛️ Simulado de Tribunal (5 Minutos)
              </span>
              <span className="rounded bg-gold/20 px-2 py-0.5 text-xs font-bold text-foreground">
                {tribunalItem.tribunal}
              </span>
              <span className="text-xs text-muted-foreground font-mono-type truncate max-w-xs sm:max-w-md">
                {tribunalItem.origem}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "rounded-lg px-3 py-1 font-mono-type font-bold text-sm border shadow-xs transition-colors",
                  tribunalSeconds <= 60
                    ? "border-destructive bg-destructive/15 text-destructive animate-pulse"
                    : "border-gold/40 bg-card text-gold",
                )}
              >
                ⏱️ {Math.floor(tribunalSeconds / 60)}:
                {String(tribunalSeconds % 60).padStart(2, "0")}
              </span>
              <button
                onClick={() => reset("tribunal", selectedKeys, keyStats, level)}
                className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-semibold hover:bg-secondary text-muted-foreground hover:text-foreground transition shadow-xs"
                title="Sortear outro acórdão"
              >
                🎲 Novo Acórdão
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic leading-relaxed border-t border-gold/20 pt-2">
            <strong className="text-foreground not-italic">Ementa Oficial:</strong> {tribunalItem.ementa}
          </p>
        </div>
      )}

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
        <div className="space-y-3 rounded-xl border border-gold/40 bg-gold/5 p-4 text-sm shadow-sm backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 pb-2">
            <div className="inline-flex items-center gap-2 font-bold text-xs text-gold">
              <span>⚖️ Disciplina: {effectiveArea} • 1ª Fase OAB / FGV</span>
            </div>
            {studyQueue.length > 0 && (
              <span className="text-xs text-muted-foreground font-mono-type">
                {studyQueue.length} linha(s) restante(s)
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="area" className="text-xs font-semibold text-foreground">
              Matéria (OAB):
            </label>
            <select
              id="area"
              value={area}
              onChange={(ev) => handleAreaChange(ev.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground shadow-sm focus:border-gold focus:outline-none"
            >
              {AREAS.map((a) => (
                <option key={a}>{a}</option>
              ))}
              <option value={CUSTOM}>Outra matéria…</option>
            </select>
            {area === CUSTOM && (
              <div className="flex items-center gap-1.5 flex-1 min-w-64">
                <input
                  value={customArea}
                  onChange={(ev) => setCustomArea(ev.target.value.slice(0, 120))}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") handleAreaChange(CUSTOM);
                  }}
                  placeholder="Ex.: recursos no STJ, LGPD, contratos bancários…"
                  className="flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs"
                />
                <button
                  onClick={() => handleAreaChange(CUSTOM)}
                  className="rounded-md bg-gold px-2.5 py-1.5 text-xs font-semibold text-gold-foreground hover:opacity-90"
                >
                  Aplicar
                </button>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <label htmlFor="lines" className="text-xs font-medium text-muted-foreground">
                Linhas:
              </label>
              <button
                onClick={() => handleLineCountChange((n) => Math.max(1, n - 1))}
                className="h-7 w-7 rounded-md border border-border bg-card hover:bg-secondary transition-colors"
                aria-label="Menos linhas"
              >
                −
              </button>
              <span id="lines" className="w-5 text-center font-mono-type font-bold text-gold">
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
            <label className="cursor-pointer rounded-lg border border-dashed border-gold/50 bg-card px-3 py-1.5 text-xs font-medium hover:border-gold transition shadow-xs">
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
              <>
                <button
                  onClick={() => setReference(null)}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  remover
                </button>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-foreground bg-card border border-border px-2.5 py-1.5 rounded-lg shadow-xs">
                  <input
                    type="checkbox"
                    checked={useAttachedDoc}
                    onChange={(ev) => {
                      const val = ev.target.checked;
                      setUseAttachedDoc(val);
                      setStudyQueue([]);
                      void nextStudy([], selectedKeys, effectiveArea);
                    }}
                    className="rounded accent-gold h-3.5 w-3.5"
                  />
                  <span>Usar documento anexado para gerar aulas</span>
                </label>
              </>
            )}
            <button
              onClick={() => {
                setStudyQueue([]);
                void nextStudy([], selectedKeys, effectiveArea);
              }}
              disabled={studyLoading}
              className="rounded-lg bg-gold px-4 py-1.5 text-xs font-bold text-gold-foreground disabled:opacity-50 shadow-xs hover:opacity-90 transition"
            >
              {studyLoading ? "Gerando…" : "Gerar nova aula"}
            </button>
            {studyError && <span className="text-xs text-destructive">{studyError}</span>}
          </div>
          {reference && reference.sentences.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gold/20 pt-2 text-xs">
              <span className="text-muted-foreground">
                📄 <strong>{reference.name}</strong>: {reference.sentences.length} frases
                prontas para treino.
              </span>
              <button
                onClick={practiceReferenceSentence}
                className="rounded-md bg-gold/20 hover:bg-gold hover:text-gold-foreground text-gold px-3 py-1 font-semibold transition-colors"
                title="Carregar a próxima frase do seu arquivo para praticar imediatamente"
              >
                ⚡ Digitar Frase do Arquivo ({reference.activeSentenceIdx + 1}/
                {reference.sentences.length})
              </button>
            </div>
          )}
        </div>
      )}

      {mode === "leiseca" && (
        <div className="space-y-3.5 rounded-xl border border-gold/40 bg-gold/5 p-4 text-sm shadow-sm backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="diploma-leiseca"
                  className="text-xs font-semibold text-foreground"
                >
                  📜 Diploma:
                </label>
                <select
                  id="diploma-leiseca"
                  value={leiSecaDiploma}
                  onChange={(ev) => {
                    const nx = ev.target.value;
                    setLeiSecaDiploma(nx);
                    setLeiSecaStartingId("random");
                    nextLeiSeca(leiSecaEixo, true, nx);
                  }}
                  className="max-w-[190px] sm:max-w-[240px] truncate rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs sm:text-sm font-medium text-foreground shadow-sm focus:border-gold focus:outline-none"
                >
                  {availableDiplomas.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label htmlFor="eixo-leiseca" className="text-xs font-semibold text-foreground">
                  ⚖️ Eixo:
                </label>
                <select
                  id="eixo-leiseca"
                  value={leiSecaEixo}
                  onChange={(ev) => {
                    const nx = ev.target.value;
                    setLeiSecaEixo(nx);
                    setLeiSecaStartingId("random");
                    nextLeiSeca(nx, true, leiSecaDiploma);
                  }}
                  className="max-w-[170px] sm:max-w-[210px] truncate rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs sm:text-sm font-medium text-foreground shadow-sm focus:border-gold focus:outline-none"
                >
                  {LEI_SECA_EIXOS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="artigo-inicial"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Dispositivo:
                </label>
                <select
                  id="artigo-inicial"
                  value={leiSecaStartingId}
                  onChange={(ev) => {
                    const val = ev.target.value;
                    setLeiSecaStartingId(val);
                    if (val === "random") {
                      nextLeiSeca(leiSecaEixo, true, leiSecaDiploma);
                    } else {
                      void ensureLeiSecaMod().then((mod) => {
                        const target = mod.getLeiSecaItemById(val);
                        if (target) {
                          setCurrentLeiSeca(target);
                          const st = mod.leiSecaToStudyItem(target);
                          setCurrentStudy(st);
                          loadText(target.texto);
                        }
                      });
                    }
                  }}
                  className="max-w-[190px] sm:max-w-[250px] truncate rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm focus:border-gold focus:outline-none"
                >
                  <option value="random">
                    🎲 Aleatório ({availableLeiSecaItems.length} disp.)
                  </option>
                  {availableLeiSecaItems.slice(0, 250).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.dispositivo} - {item.diploma}
                    </option>
                  ))}
                  {availableLeiSecaItems.length > 250 && (
                    <option disabled value="">
                      ... e mais {availableLeiSecaItems.length - 250} (selecione o Diploma acima para filtrar)
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => prevLeiSeca(leiSecaEixo, leiSecaDiploma)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary shadow-sm transition-transform active:scale-95"
                title="Retornar ao dispositivo anterior"
              >
                <span>◀ Artigo Anterior</span>
              </button>
              <button
                onClick={() =>
                  nextLeiSeca(leiSecaEixo, leiSecaStartingId === "random", leiSecaDiploma)
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-1.5 text-xs font-semibold text-gold-foreground hover:opacity-90 shadow-sm transition-transform active:scale-95"
                title="Avançar para o próximo dispositivo"
              >
                <span>
                  {leiSecaStartingId === "random" ? "🎲 Sortear Artigo →" : "Próximo Artigo ▶"}
                </span>
              </button>
            </div>
          </div>

          {currentLeiSeca && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-gold/20 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-gold">📜 {currentLeiSeca.diploma}:</span>
                <span className="rounded bg-gold/15 px-2.5 py-0.5 font-bold text-foreground">
                  {currentLeiSeca.dispositivo}
                </span>
                <span className="rounded bg-secondary/80 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {currentLeiSeca.eixo}
                </span>
              </div>
              <span className="text-muted-foreground hidden sm:inline font-mono-type text-[11px]">
                🏛️ {currentLeiSeca.fonteOficial}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );

  const renderModularBox = (boxId: string) => {
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
              {/* Seletor rápido de modo de erro */}
              <select
                value={prefs.errorMode}
                onChange={(ev) =>
                  updatePrefs({ errorMode: ev.target.value as TypingErrorMode })
                }
                className="rounded-md border border-border bg-card px-2 py-0.5 text-xs font-semibold text-foreground focus:border-gold focus:outline-none shadow-sm"
                title="Modo de tolerância e tratamento de erros"
              >
                <option value="fluid">🌊 Fluido</option>
                <option value="strict">🛑 Estrito</option>
                <option value="restart">⚡ Morte Súbita</option>
                <option value="nobackspace">🥋 Sem Backspace</option>
              </select>
              <div className="flex items-center rounded-md border border-border bg-card text-xs">
                <span className="px-2 py-0.5 text-[0.65rem] text-muted-foreground">
                  Fonte:
                </span>
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
              minHeight:
                lineCount === 1 ? "5.5rem" : `${Math.max(8.5, 4.5 + lineCount * 2.8)}rem`,
              maxHeight: lineCount === 1 ? "8.5rem" : "75vh",
            }}
            className={cn(
              "relative rounded-lg p-2 transition-all duration-300 overflow-auto",
              focused ? "ring-1 ring-gold/30" : "",
            )}
          >
            {isLoadingModule ? (
              <div className="py-12 px-6 flex flex-col items-center justify-center space-y-3 rounded-lg border border-gold/20 bg-card/60 animate-pulse">
                <div className="h-4 w-3/4 bg-gold/20 rounded-md"></div>
                <div className="h-4 w-5/6 bg-gold/15 rounded-md"></div>
                <div className="h-4 w-2/3 bg-gold/20 rounded-md"></div>
                <div className="flex items-center gap-2 text-xs font-mono-type text-gold mt-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-gold animate-ping" />
                  Carregando acervo forense sob demanda...
                </div>
              </div>
            ) : result ? (
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
                    Tempo{" "}
                    <span className="font-bold text-foreground">
                      {elapsed.toFixed(0)}s
                    </span>
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
                  <>
                    {typingParts.length > 1 && (
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-xs">
                        <div className="flex items-center gap-2 font-medium">
                          <span className="text-gold font-bold">
                            📑 Dispositivo em Partes:
                          </span>
                          <span className="rounded bg-gold/20 px-2 py-0.5 font-mono-type font-bold text-foreground">
                            Parte {partIndex + 1} de {typingParts.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (partIndex > 0) {
                                const prevIdx = partIndex - 1;
                                setPartIndex(prevIdx);
                                eng.current = newEngine(typingParts[prevIdx]!);
                                consumed.current = 0;
                                if (inputRef.current) inputRef.current.value = "";
                                rerender();
                              }
                            }}
                            disabled={partIndex === 0}
                            className="rounded border border-border bg-card px-2.5 py-1 text-xs font-medium hover:bg-secondary disabled:opacity-30 transition-colors"
                          >
                            ◀ Parte Anterior
                          </button>
                          <button
                            onClick={() => {
                              if (partIndex < typingParts.length - 1) {
                                const nextIdx = partIndex + 1;
                                setPartIndex(nextIdx);
                                eng.current = newEngine(typingParts[nextIdx]!);
                                consumed.current = 0;
                                if (inputRef.current) inputRef.current.value = "";
                                rerender();
                              }
                            }}
                            disabled={partIndex >= typingParts.length - 1}
                            className="rounded border border-gold/40 bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold hover:bg-gold/25 disabled:opacity-30 transition-colors"
                          >
                            Próxima Parte ▶
                          </button>
                        </div>
                      </div>
                    )}
                    <p
                      className={cn(
                        "leading-relaxed tracking-wide transition-all",
                        fontFamily === "serif" ? "font-forensic-serif" : "font-mono-type",
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
                                ((prefs.errorMode === "strict" || prefs.stopOnError) &&
                                e.wrongAt === i
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
                  </>
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
                  </div>
                )}

                {/* Resultado Oficial do Simulado de Tribunal */}
                {mode === "tribunal" && tribunalScore && (
                  <div
                    className={cn(
                      "mt-4 rounded-xl border p-4 space-y-3 transition-all",
                      tribunalScore.isApproved
                        ? "border-success/60 bg-success/10 text-foreground"
                        : "border-destructive/60 bg-destructive/10 text-foreground",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2">
                      <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                        🏛️ Veredito Oficial do Simulado de Tribunal
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold",
                          tribunalScore.isApproved
                            ? "bg-success text-success-foreground"
                            : "bg-destructive text-destructive-foreground",
                        )}
                      >
                        Nota: {tribunalScore.score.toFixed(1)} / 10.0
                      </span>
                    </div>
                    <p className="font-bold text-sm">{tribunalScore.verdict}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-type">
                      <div className="rounded bg-card/60 p-2 border border-border/50 text-center">
                        <div className="text-muted-foreground text-[10px]">Brutos</div>
                        <div className="text-sm font-bold text-foreground">{tribunalScore.grossChars}</div>
                      </div>
                      <div className="rounded bg-card/60 p-2 border border-border/50 text-center">
                        <div className="text-muted-foreground text-[10px]">Erros (×2)</div>
                        <div className="text-sm font-bold text-destructive">{tribunalScore.errors}</div>
                      </div>
                      <div className="rounded bg-card/60 p-2 border border-border/50 text-center">
                        <div className="text-muted-foreground text-[10px]">Líquidos</div>
                        <div className="text-sm font-bold text-gold">{tribunalScore.netChars}</div>
                      </div>
                      <div className="rounded bg-card/60 p-2 border border-border/50 text-center">
                        <div className="text-muted-foreground text-[10px]">Velocidade</div>
                        <div className="text-sm font-bold text-foreground">{tribunalScore.wpm} PPM</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tribunalScore.feedback}</p>
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => reset("tribunal", selectedKeys, keyStats, level)}
                        className="rounded-lg bg-gold px-3.5 py-1.5 text-xs font-bold text-gold-foreground hover:opacity-90 shadow-sm"
                      >
                        ↻ Novo Simulado
                      </button>
                    </div>
                  </div>
                )}

                <p className="mt-5 text-center text-xs text-muted-foreground">
                  {focused
                    ? prefs.errorMode === "strict"
                      ? "Modo estrito: o cursor trava na letra errada até você acertar."
                      : prefs.errorMode === "restart"
                        ? "⚡ Morte Súbita: errou qualquer caractere, a linha reinicia do início. Treino para digitadores de elite!"
                        : prefs.errorMode === "nobackspace"
                          ? "🥋 Modo Mestre: digite sem parar para frente. Backspace desativado para treinar cadência constante."
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
                ↺ Recomeçar esta (Tab)
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
          {result && activeLesson ? (
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
          ) : activeLesson ? (
            <div className="rounded-lg border border-gold/30 bg-gold/5 p-6 text-center space-y-2">
              <div className="text-3xl">🔒</div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold">
                Virada de Chave Protegida
              </div>
              <p className="text-sm font-semibold text-foreground">
                {mode === "leiseca" && currentLeiSeca
                  ? `${currentLeiSeca.dispositivo} (${currentLeiSeca.diploma})`
                  : activeLesson.virada.titulo}
              </p>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                {mode === "leiseca"
                  ? "Foque na digitação do dispositivo legal acima. O conceito doutrinário, a tese vinculante e o caso concreto serão revelados ao final!"
                  : "Foque na cadência e na precisão dos dedos. A Virada de Chave (critério decisivo, requisitos e caso prático) será revelada assim que você concluir a digitação!"}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border/70 p-6 text-center text-muted-foreground">
              <p className="text-sm font-medium mb-1">
                🎓 Nenhuma virada de chave carregada no momento.
              </p>
              <p className="text-xs mb-3 text-muted-foreground/80">
                No modo <strong>Estudos Jurídicos</strong> ou <strong>Lei Seca</strong>,
                este painel exibirá o conceito estruturado, critério decisivo e o caso
                prático correspondente ao final de cada item.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => {
                    changeMode("estudos");
                    void nextStudy([], selectedKeys, effectiveArea);
                  }}
                  className="rounded-md bg-gold px-3.5 py-1.5 text-xs font-semibold text-gold-foreground hover:opacity-90"
                >
                  Iniciar Estudos Jurídicos
                </button>
                <button
                  onClick={() => {
                    changeMode("leiseca");
                  }}
                  className="rounded-md border border-gold text-gold hover:bg-gold/10 px-3.5 py-1.5 text-xs font-semibold"
                >
                  Treinar Lei Seca
                </button>
              </div>
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
          {popoutActive ? (
            <div className="rounded-lg border border-gold/40 bg-gold/5 p-4 text-center text-sm text-muted-foreground">
              ↗ Teclado ativo na 2ª tela. Feche aquela janela para trazê-lo de volta aqui.
            </div>
          ) : (
          <Keyboard
            nextKeys={nextKeys}
            stats={keyStats}
            selectedKeys={[]}
            flash={flash}
            layout={keyboardLayout}
            scale={uiScale}
            mode={keyboardMode}
          />
          )}
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
          title={
            mode === "automatico"
              ? "Diagnóstico de Teclas Críticas"
              : "Teclas-Alvo do Treino"
          }
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
                    (g as readonly string[]).every((k: string) =>
                      selectedKeys.includes(k),
                    )
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
  };

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
            <div className="flex flex-wrap items-center rounded-lg border border-border bg-card p-0.5 sm:p-1 gap-0.5">
              <button
                onClick={() => setActiveTab("treino")}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2 sm:px-2.5 py-1 text-xs font-semibold transition-colors",
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
                  "flex items-center gap-1 rounded-md px-2 sm:px-2.5 py-1 text-xs font-semibold transition-colors",
                  activeTab === "leiseca"
                    ? "bg-gold text-gold-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                📜 Lei Seca
              </button>
              <button
                onClick={() => setActiveTab("dicionario")}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2 sm:px-2.5 py-1 text-xs font-semibold transition-colors",
                  activeTab === "dicionario"
                    ? "bg-gold text-gold-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                📖 Dicionário
              </button>
              <button
                onClick={() => setActiveTab("desempenho")}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2 sm:px-2.5 py-1 text-xs font-semibold transition-colors",
                  activeTab === "desempenho"
                    ? "bg-gold text-gold-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                📊 Desempenho
              </button>
              <button
                onClick={() => setActiveTab("ranking")}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2 sm:px-2.5 py-1 text-xs font-semibold transition-colors",
                  activeTab === "ranking"
                    ? "bg-gold text-gold-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                🏆 Records
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
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium hover:border-gold hover:bg-gold/10 transition-colors shadow-sm"
              title="Gerenciar / Alternar Perfis de Usuário"
            >
              <span className="text-sm">{activeProfile.avatar}</span>
              <span className="max-w-[100px] truncate font-semibold text-foreground">
                {activeProfile.name}
              </span>
              {activeProfile.pin && (
                <span className="text-[10px]" title="Protegido por PIN">
                  🔒
                </span>
              )}
              {activeProfile.isGoogle && (
                <span className="text-[10px]" title="Google Login">
                  🌐
                </span>
              )}
            </button>
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
          <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm">
            {/* Header com Navegação em 5 Abas */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚙️</span>
                <span className="font-bold uppercase tracking-wider text-foreground">
                  Configurações e Ergonomia Forense
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-secondary/30 p-1">
                {(
                  [
                    { id: "rigor", label: "🎯 Rigor & Tolerância" },
                    { id: "ergonomia", label: "🖥️ Exibição & Ergonomia" },
                    { id: "texto", label: "🔤 Complexidade de Texto" },
                    { id: "audio", label: "🔊 Áudio & Metrônomo" },
                    { id: "sistema", label: "💾 Dados & Sistema" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSettingsTab(tab.id)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                      settingsTab === tab.id
                        ? "bg-gold text-gold-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/70",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTEÚDO DA ABA 1: RIGOR & TOLERÂNCIA */}
            {settingsTab === "rigor" && (
              <div className="space-y-4 animate-pop-in">
                <div>
                  <h4 className="font-bold text-foreground">Modo de Tratamento de Erros</h4>
                  <p className="text-xs text-muted-foreground">
                    Selecione a disciplina de digitação adequada aos seus objetivos de treino forense:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(
                    [
                      {
                        id: "fluid",
                        label: "🌊 Fluido",
                        sub: "Backspace Livre",
                        desc: "Digitação contínua. As letras erradas ficam em vermelho e você pode voltar com Backspace para corrigir a qualquer momento.",
                      },
                      {
                        id: "strict",
                        label: "🛑 Estrito",
                        sub: "Trava no Erro",
                        desc: "O cursor trava na letra errada e não avança enquanto a tecla correta não for pressionada. Ideal para precisão cirúrgica.",
                      },
                      {
                        id: "restart",
                        label: "⚡ Morte Súbita",
                        sub: "Erro Zera Linha",
                        desc: "Qualquer caractere errado reinicia a frase do zero imediatamente. Treinamento extremo para digitadores forenses de elite.",
                      },
                      {
                        id: "nobackspace",
                        label: "🥋 Modo Mestre",
                        sub: "Sem Backspace",
                        desc: "Backspace completamente desativado. Treina cadência rítmica sem interrupções ou hesitações musculares.",
                      },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => updatePrefs({ errorMode: m.id })}
                      className={cn(
                        "flex flex-col items-start rounded-xl border p-3.5 text-left transition-all duration-200",
                        prefs.errorMode === m.id
                          ? "border-gold bg-gold/15 text-gold font-bold shadow-sm ring-1 ring-gold"
                          : "border-border bg-card text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                      )}
                    >
                      <span className="text-sm font-bold flex items-center gap-1.5">{m.label}</span>
                      <span className="text-[11px] font-semibold text-gold/90 mt-0.5">{m.sub}</span>
                      <p className="text-[11px] text-muted-foreground font-normal leading-relaxed mt-2">
                        {m.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CONTEÚDO DA ABA 2: EXIBIÇÃO & ERGONOMIA */}
            {settingsTab === "ergonomia" && (
              <div className="space-y-6 animate-pop-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Seletor de Layout */}
                  <div className="space-y-2">
                    <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Layout da Tela (HUD)
                    </span>
                    <div className="flex flex-col gap-2">
                      <select
                        value={layoutMode}
                        onChange={(ev) => {
                          const val = ev.target.value as "auto" | "widescreen" | "classic";
                          setLayoutMode(val);
                          localStorage.setItem("lextype-layout-mode", val);
                        }}
                        className="rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-gold focus:outline-none"
                      >
                        <option value="auto">⚡ Automático (HUD Widescreen em ≥1280px, Clássico em telas menores)</option>
                        <option value="widescreen">🖥️ Forçar Widescreen HUD (2 Colunas Amplas)</option>
                        <option value="classic">📱 Forçar Clássico Centralizado (Coluna Única)</option>
                      </select>
                      <p className="text-[11px] text-muted-foreground leading-tight">
                        O HUD Widescreen projeta o terminal em 2 colunas amplas com zero rolagem vertical.
                      </p>
                    </div>
                  </div>

                  {/* Tipografia Forense */}
                  <div className="space-y-2">
                    <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Tipografia Forense
                    </span>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setFontFamily("sans");
                            localStorage.setItem("lextype-font-family", "sans");
                          }}
                          className={cn(
                            "flex-1 rounded-md border py-2 px-3 text-xs font-semibold transition-colors font-forensic-sans",
                            fontFamily === "sans"
                              ? "border-gold bg-gold text-gold-foreground shadow-xs"
                              : "border-border hover:bg-secondary text-foreground",
                          )}
                        >
                          Moderna Sans (Inter/Geist)
                        </button>
                        <button
                          onClick={() => {
                            setFontFamily("serif");
                            localStorage.setItem("lextype-font-family", "serif");
                          }}
                          className={cn(
                            "flex-1 rounded-md border py-2 px-3 text-xs font-semibold transition-colors font-forensic-serif",
                            fontFamily === "serif"
                              ? "border-gold bg-gold text-gold-foreground shadow-xs"
                              : "border-border hover:bg-secondary text-foreground",
                          )}
                        >
                          Acórdão Serif (Tribunais)
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">
                        Alterne entre clareza técnica sem serifa ou o estilo clássico dos acórdãos do STF/STJ.
                      </p>
                    </div>
                  </div>

                  {/* Temas Visuais */}
                  <div className="space-y-2">
                    <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Tema Visual (WCAG AA)
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
                              ? "border-gold bg-gold text-gold-foreground shadow-xs"
                              : "border-border hover:bg-secondary text-foreground",
                          )}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Teclado e Desempenho */}
                  <div className="space-y-2">
                    <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Teclado Virtual & Layout
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={keyboardLayout}
                        onChange={(ev) => {
                          const l = ev.target.value as KeyboardLayout;
                          setKeyboardLayout(l);
                          localStorage.setItem("lextype-layout", l);
                        }}
                        className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold"
                      >
                        <option value="abnt2">ABNT2 (Brasil)</option>
                        <option value="ansi">ANSI (US Internacional)</option>
                      </select>
                      <select
                        value={uiScale}
                        onChange={(ev) => {
                          const s = ev.target.value as KeyboardScale;
                          setUiScale(s);
                          localStorage.setItem("lextype-scale", s);
                        }}
                        className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold"
                      >
                        <option value="compact">Compacto</option>
                        <option value="normal">Normal</option>
                        <option value="large">Expandido</option>
                      </select>
                      <button
                        onClick={() => {
                          const next = keyboardMode === "heatmap" ? "rainbow" : "heatmap";
                          setKeyboardMode(next);
                          localStorage.setItem("lextype-keyboard-mode", next);
                        }}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                          keyboardMode === "rainbow"
                            ? "border-gold bg-gold/15 text-gold font-bold"
                            : "border-border hover:bg-secondary text-muted-foreground",
                        )}
                      >
                        {keyboardMode === "rainbow" ? "🌈 Dedos Coloridos" : "🔥 Mapa de Calor"}
                      </button>
                    </div>
                  </div>

                  {/* Desprender teclado */}
                  <div className="space-y-2">
                    <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Segunda Tela
                    </span>
                    <div>
                      <button
                        onClick={() => window.open("/keyboard", "LexTypeKeyboard", "width=1150,height=600")}
                        className="w-full rounded-md border border-gold/50 bg-gold/10 px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/20 transition shadow-xs text-center"
                      >
                        ↗ Abrir Teclado ABNT2 em Janela Externa (2º Monitor)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONTEÚDO DA ABA 3: COMPLEXIDADE DE TEXTO */}
            {settingsTab === "texto" && (
              <div className="space-y-4 animate-pop-in">
                <div>
                  <h4 className="font-bold text-foreground">Modificadores de Complexidade</h4>
                  <p className="text-xs text-muted-foreground">
                    Adicione elementos reais da redação forense para treinar a musculatura dos dedos:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-2">
                    <Toggle
                      on={prefs.caps}
                      onChange={(v) => updatePrefs({ caps: v })}
                      label="Maiúsculas (Capitalização)"
                    />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Treina o uso alternado de Shift esquerdo e direito para siglas e inícios de frase.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-2">
                    <Toggle
                      on={prefs.punct}
                      onChange={(v) => updatePrefs({ punct: v })}
                      label="Pontuação Básica (. , ; : ? !)"
                    />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Exercita vírgulas, pontos e ponto-e-vírgula fundamentais na redação jurídica.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-2">
                    <Toggle
                      on={prefs.symbols}
                      onChange={(v) => updatePrefs({ symbols: v })}
                      label="Símbolos Forenses (§, º, ª, caput, @, #, $)"
                    />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Treina digitação de parágrafos legais (§), números ordinais (º, ª) e citações.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CONTEÚDO DA ABA 4: ÁUDIO & METRÔNOMO */}
            {settingsTab === "audio" && (
              <div className="space-y-6 animate-pop-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sons do Teclado */}
                  <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-xs uppercase tracking-wider">
                        Sons de Digitação (Web Audio API)
                      </span>
                      <button
                        onClick={toggleMute}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
                          muted
                            ? "border-destructive/40 bg-destructive/10 text-destructive"
                            : "border-gold/40 bg-gold/15 text-gold",
                        )}
                      >
                        {muted ? "🔇 Silencioso" : "🔊 Ativado"}
                      </button>
                    </div>
                    <select
                      value={soundProfile}
                      onChange={(ev) => {
                        const p = ev.target.value as SoundProfile;
                        setSoundProfile(p);
                        setSoundProfileState(p);
                        playKey();
                      }}
                      disabled={muted}
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground disabled:opacity-40 shadow-xs"
                    >
                      {SOUND_PROFILES.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      {SOUND_PROFILES.find((p) => p.id === soundProfile)?.description}
                    </p>
                  </div>

                  {/* Metrônomo Rítmico de Cadência */}
                  <div className="rounded-xl border border-gold/40 bg-gold/5 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gold text-xs uppercase tracking-wider flex items-center gap-1.5">
                        ⏱️ Metrônomo Rítmico de Cadência
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono-type">
                        Batida Acústica Suave
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {(
                        [
                          { id: "off", label: "Desligado" },
                          { id: 60, label: "60 BPM (Base)" },
                          { id: 80, label: "80 BPM (Forense)" },
                          { id: 100, label: "100 BPM (Elite)" },
                        ] as const
                      ).map((b) => (
                        <button
                          key={String(b.id)}
                          onClick={() => {
                            setMetronome(b.id as MetronomeBpm);
                            setMetronomeBpmState(b.id as MetronomeBpm);
                          }}
                          className={cn(
                            "rounded-lg border px-2 py-2 text-xs font-semibold text-center transition-all",
                            metronomeBpm === b.id
                              ? "border-gold bg-gold text-gold-foreground shadow-xs font-bold"
                              : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
                          )}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      O metrônomo toca um clique acústico contínuo durante a digitação para treinar cadência constante e eliminar pausas involuntárias.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CONTEÚDO DA ABA 5: DADOS & SISTEMA */}
            {settingsTab === "sistema" && (
              <div className="space-y-6 animate-pop-in">
                {/* Backup & Restauração JSON */}
                <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        💾 Backup e Restauração (.json)
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Exporte e restaure perfis, históricos de WPM, recordes e configurações completas.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const filename = downloadBackupFile();
                        alert(`Backup exportado com sucesso: ${filename}`);
                      }}
                      className="rounded-lg border border-gold/60 bg-gold/15 px-4 py-2 text-xs font-bold text-gold hover:bg-gold/25 transition shadow-xs"
                    >
                      📥 Exportar Backup Completo (.json)
                    </button>
                    <label className="cursor-pointer rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary transition shadow-xs">
                      📤 Restaurar Backup (.json)
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(ev) => {
                          const file = ev.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const content = e.target?.result as string;
                            if (!content) return;
                            const res = restoreBackupData(content);
                            alert(res.message);
                            if (res.success) {
                              window.location.reload();
                            }
                          };
                          reader.readAsText(file);
                          ev.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Conexão com IAs & Teste */}
                <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-gold flex items-center gap-1.5">
                      🤖 Integração com Provedores de IA & Diagnóstico
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      🔒 Chaves salvas exclusivamente no seu navegador (localStorage)
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
                      className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium"
                    >
                      <option value="gemini">Google Gemini (Gemini 1.5 Flash)</option>
                      <option value="openai">OpenAI (GPT-4o)</option>
                      <option value="claude">Anthropic Claude (Claude 3.5)</option>
                      <option value="deepseek">DeepSeek AI (DeepSeek Chat)</option>
                      <option value="grok">xAI Grok (Grok-2)</option>
                      <option value="lovable">Lovable Cloud / Local</option>
                    </select>
                    <input
                      type="password"
                      value={aiKey}
                      onChange={(ev) => {
                        const k = ev.target.value;
                        setAiKey(k);
                        localStorage.setItem("lextype-ai-key", k);
                      }}
                      placeholder="Cole sua API Key aqui (opcional)..."
                      className="min-w-64 flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs"
                    />
                    {aiKey && (
                      <button
                        onClick={() => {
                          setAiKey("");
                          localStorage.removeItem("lextype-ai-key");
                        }}
                        className="rounded-md border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/20"
                      >
                        Remover
                      </button>
                    )}
                    <button
                      onClick={handleTestAiConnection}
                      disabled={aiStatusType === "testing"}
                      className="rounded-md bg-gold px-3 py-1.5 text-xs font-bold text-gold-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      {aiStatusType === "testing" ? "Testando..." : "⚡ Testar Conexão com a IA"}
                    </button>
                  </div>

                  {aiStatusMessage && (
                    <div
                      className={cn(
                        "rounded-lg border px-3 py-2 text-xs font-semibold animate-pop-in",
                        aiStatusType === "success"
                          ? "border-success/50 bg-success/15 text-foreground"
                          : aiStatusType === "quota"
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                            : "border-border bg-card text-muted-foreground",
                      )}
                    >
                      {aiStatusMessage}
                    </div>
                  )}

                  <p className="text-[11px] text-muted-foreground">
                    Sem conexão com IA ou créditos esgotados? O LexType opera com 100% de autonomia e resiliência via acervo offline de 2.220 viradas de chave e artigos da OAB.
                  </p>
                </div>
              </div>
            )}
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
              setCurrentLeiSeca(item);
              setCurrentStudy(leiSecaToStudyItem(item));
              loadText(item.texto);
              setActiveTab("treino");
            }}
            onClose={() => setActiveTab("treino")}
          />
        </main>
      ) : activeTab === "dicionario" ? (
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <DicionarioPanel
            onSelectForTyping={(text, _termo) => {
              loadText(text);
              setActiveTab("treino");
            }}
            onClose={() => setActiveTab("treino")}
          />
        </main>
      ) : activeTab === "ranking" ? (
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <RankingRecordsPanel
            stats={keyStats}
            xp={xp}
            bestWpm={bestWpm}
            streak={streak}
            practiceTodaySeconds={practiceToday}
            onBackToPractice={() => setActiveTab("treino")}
          />
        </main>
      ) : (
        <main
          className={cn(
            layoutMode === "classic"
              ? "mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6"
              : "mx-auto max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8",
          )}
        >
          {layoutMode === "classic" ? (
            /* LAYOUT CLÁSSICO (COLUNA ÚNICA CENTRALIZADA) */
            <div className="space-y-6">
              {/* Modos */}
              <div
                className={cn(
                  "flex flex-wrap gap-2 sm:gap-2.5 transition-opacity duration-500",
                  inFlow && "opacity-25 hover:opacity-100",
                )}
              >
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => changeMode(m.id)}
                    title={m.hint}
                    className={cn(
                      "rounded-lg border px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all shadow-xs",
                      mode === m.id
                        ? "border-gold bg-gold text-gold-foreground shadow-sm scale-102"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
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
                      ? "border-destructive/50 bg-destructive/10 text-destructive-foreground font-medium"
                      : ["combo", "finishGreat", "levelUp"].includes(quote.mood)
                        ? "border-success/50 bg-success/10 text-foreground font-medium"
                        : "border-border bg-card text-foreground",
                  )}
                >
                  <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                    Prof. Dr. Rigoroso
                  </div>
                  {quote.text || "…"}
                </div>
              </div>

              {/* Mode Banners */}
              {renderModeBanners()}

              {/* Barra de Status e Restauração dos Painéis Independentes */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>
                    📐 <strong>Painéis Modulares:</strong> use ▲▼ para reposicionar e ◀ Esquerda / Direita ▶ para alargar as caixas.
                  </span>
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
                {boxOrder.map((boxId) => renderModularBox(boxId))}
              </div>
            </div>
          ) : (
            /* LAYOUT WIDESCREEN DINÂMICO & HUD DE 2 COLUNAS (ZERO-SCROLL) */
            <div
              className={cn(
                layoutMode === "widescreen"
                  ? "grid grid-cols-12 gap-6 items-start"
                  : "grid grid-cols-1 xl:grid-cols-12 gap-6 items-start",
              )}
            >
              {/* Coluna Principal (Esquerda ~65%) */}
              <div
                className={cn(
                  layoutMode === "widescreen"
                    ? "col-span-12 lg:col-span-8 space-y-4"
                    : "xl:col-span-8 space-y-4",
                )}
              >
                {/* Modos */}
                <div
                  className={cn(
                    "flex flex-wrap gap-2 sm:gap-2.5 transition-opacity duration-500",
                    inFlow && "opacity-25 hover:opacity-100",
                  )}
                >
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => changeMode(m.id)}
                      title={m.hint}
                      className={cn(
                        "rounded-lg border px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all shadow-xs",
                        mode === m.id
                          ? "border-gold bg-gold text-gold-foreground shadow-sm scale-102"
                          : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Mode Banners (tribunal, estudos, leiseca, automatico) */}
                {renderModeBanners()}

                {boxOrder
                  .filter((b) => b === "typing" || b === "keyboard" || b === "keys")
                  .map((b) => renderModularBox(b))}

                {/* Atalhos Zen Legend */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/50 px-3.5 py-2 text-xs text-muted-foreground shadow-xs">
                  <div className="flex flex-wrap items-center gap-2 font-mono-type">
                    <span className="font-bold text-foreground">⌨️ Atalhos Zen:</span>
                    <span><kbd className="rounded bg-secondary px-1.5 py-0.5 border border-border">Tab</kbd> Recomeçar</span>
                    <span className="opacity-40">•</span>
                    <span><kbd className="rounded bg-secondary px-1.5 py-0.5 border border-border">Esc</kbd> Próxima</span>
                    <span className="opacity-40">•</span>
                    <span><kbd className="rounded bg-secondary px-1.5 py-0.5 border border-border">Ctrl+Enter</kbd> Tese</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono-type hidden sm:inline">
                    {fontFamily === "serif" ? "🏛️ Tipografia Acórdão (Serif)" : "⚡ Tipografia Moderna (Sans)"}
                  </span>
                </div>

              </div>

              {/* Coluna Lateral de Inteligência Forense (Direita ~35%) */}
              <div
                className={cn(
                  layoutMode === "widescreen"
                    ? "col-span-12 lg:col-span-4 space-y-4"
                    : "xl:col-span-4 space-y-4",
                )}
              >
                {/* 1. Card do Professor Dr. Rigoroso */}
                <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-card/60 p-3.5 backdrop-blur-sm shadow-sm">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-card text-2xl shadow-sm"
                    title="Prof. Dr. Rigoroso"
                  >
                    👨‍⚖️
                  </div>
                  <div
                    key={quote.id}
                    className={cn(
                      "animate-pop-in relative flex-1 rounded-xl rounded-tl-none border px-3.5 py-2 text-xs transition-all",
                      ["error", "errorStreak", "finishBad", "levelDown"].includes(quote.mood)
                        ? "border-destructive/50 bg-destructive/10 text-destructive-foreground font-medium"
                        : ["combo", "finishGreat", "levelUp"].includes(quote.mood)
                          ? "border-success/50 bg-success/10 text-foreground font-medium"
                          : "border-border bg-card/80 text-foreground",
                    )}
                  >
                    <div className="text-[0.65rem] font-bold uppercase tracking-wider text-gold mb-0.5 flex items-center justify-between">
                      <span>Prof. Dr. Rigoroso</span>
                      <span className="text-[9px] text-muted-foreground font-mono-type">Ao Vivo</span>
                    </div>
                    <div className="leading-snug">{quote.text || "…"}</div>
                  </div>
                </div>

                {/* 2. Card da Virada de Chave / Semântica (Persistente & Expansível) */}
                <div className="rounded-xl border border-gold/40 bg-card/80 p-4 shadow-sm backdrop-blur-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-border/70 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎓</span>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gold">
                        Virada de Chave Forense
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsThesisExpanded((prev) => !prev)}
                      className="text-xs text-muted-foreground hover:text-foreground font-mono-type px-2 py-0.5 rounded border border-border hover:bg-secondary"
                      title="Atalho: Ctrl+Enter"
                    >
                      {isThesisExpanded ? "▲ Recolher" : "▼ Expandir (Ctrl+Enter)"}
                    </button>
                  </div>
                  {isThesisExpanded && (
                    <div className="space-y-3 animate-pop-in text-xs">
                      {result && (pinned || currentStudy) ? (
                        <LessonCard
                          item={pinned || currentStudy!}
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
                      ) : (pinned || currentStudy) ? (
                        <div className="space-y-2 rounded-lg bg-gold/5 p-3 border border-gold/30">
                          <div className="font-bold text-foreground flex items-center gap-1.5">
                            <span className="text-gold">⚖️</span>
                            <span>{(pinned || currentStudy)!.virada.titulo || (pinned || currentStudy)!.termo}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {(pinned || currentStudy)!.virada.raciocinio}
                          </p>
                          {(pinned || currentStudy)!.virada.exemplo && (
                            <div className="pt-1.5 border-t border-gold/20 text-muted-foreground italic">
                              <strong>Caso Concreto:</strong> {(pinned || currentStudy)!.virada.exemplo}
                            </div>
                          )}
                        </div>
                      ) : complexTerm ? (
                        <div className="space-y-1.5 rounded-lg bg-secondary/30 p-3 border border-border/60">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gold uppercase tracking-wide">
                              📖 {complexTerm.termo}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                              {complexTerm.categoria}
                            </span>
                          </div>
                          <p className="text-foreground leading-relaxed">
                            <strong>Significado Técnico:</strong> {complexTerm.significado}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted-foreground text-xs space-y-1">
                          <p>Nenhuma virada fixada no momento.</p>
                          <p className="text-[11px] text-muted-foreground/70">
                            Pratique no modo <strong>Estudos OAB</strong> ou <strong>Lei Seca</strong> para ter síntese doutrinária contínua.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Telemetria Forense de Alta Precisão (HUD) */}
                <div className="rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm space-y-3.5">
                  <div className="flex items-center justify-between border-b border-border/70 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      📊 Telemetria Forense ao Vivo
                    </span>
                    {metronomeBpm !== "off" && (
                      <span className="rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold font-mono-type">
                        ⏱️ {metronomeBpm} BPM
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-lg bg-secondary/30 p-2.5 border border-border/50 text-center">
                      <div className="font-mono-type text-2xl font-bold text-gold">{liveWpm}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">PPM Instantâneo</div>
                      <div className="text-[9px] text-muted-foreground font-mono-type mt-0.5">Recorde: {bestWpm}</div>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-2.5 border border-border/50 text-center">
                      <div className="font-mono-type text-2xl font-bold text-foreground">{liveAcc}%</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Precisão (%)</div>
                      <div className="text-[9px] text-muted-foreground font-mono-type mt-0.5">Erros: {e.errors}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-lg bg-secondary/30 p-2.5 border border-border/50 text-center">
                      <div className="font-mono-type text-xl font-bold text-foreground">{e.combo}🔥</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Combo Atual</div>
                      <div className="text-[9px] text-muted-foreground font-mono-type mt-0.5">Máx: {e.maxCombo}</div>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-2.5 border border-border/50 text-center">
                      <div className="font-mono-type text-xl font-bold text-success">+{xp}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">XP Acumulado</div>
                      <div className="text-[9px] text-muted-foreground font-mono-type mt-0.5">{rank.name}</div>
                    </div>
                  </div>
                  {/* Desafio Diário de 5 Minutos */}
                  <div className="pt-2 border-t border-border/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-foreground">
                        <span>⏱️</span>
                        <span>{practiceToday >= DAILY_SECONDS ? "Desafio 5 min Concluído!" : "Desafio Diário Forense"}</span>
                      </span>
                      <span className="font-mono-type text-gold">
                        {Math.floor(Math.min(practiceToday, DAILY_SECONDS) / 60)}:
                        {String(Math.min(practiceToday, DAILY_SECONDS) % 60).padStart(2, "0")} / 5:00
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full transition-all duration-500",
                          practiceToday >= DAILY_SECONDS ? "bg-success" : "bg-gold",
                        )}
                        style={{ width: `${Math.min(1, practiceToday / DAILY_SECONDS) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      5 minutos de treino deliberado por dia consolidam a memória muscular e cadência estável para peças forenses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Modal de Múltiplos Perfis de Usuário */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onProfileSwitched={(p) => {
          setActiveProfile(p);
          setXp(p.xp);
          setLevel(p.level);
          setBestWpm(p.bestWpm);
          setKeyStats(p.keyStats);
          setStreak(p.streak);
          reset(mode, selectedKeys, p.keyStats, p.level);
        }}
      />
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
      {Boolean(item.virada.exemplo && item.virada.exemplo.trim()) && (
        <div className="rounded-lg bg-card/60 p-3.5 border border-border/60">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            ⚖️ Exemplo no Caso Concreto
          </div>
          <p className={cn("text-muted-foreground", STUDY_FONT_CLASSES[fontStudy])}>
            {item.virada.exemplo}
          </p>
        </div>
      )}
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
      {result.study && (
        <div className="mx-auto max-w-2xl text-left rounded-xl border border-gold/40 bg-card p-5 space-y-3.5 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="rounded bg-gold/20 px-2.5 py-0.5 text-xs font-bold text-gold uppercase tracking-wider">
                💡 Virada de Chave Desbloqueada
              </span>
              <span className="font-mono-type text-xs text-foreground font-semibold">
                {result.study.virada.titulo}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground font-mono-type">
              {result.study.semantica}
            </span>
          </div>

          {result.study.virada.conceito && (
            <div className="rounded-lg bg-secondary/30 p-3.5 border border-border/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
                📖 Dispositivo & Conceito
              </div>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                {result.study.virada.conceito}
              </p>
            </div>
          )}

          <div className="rounded-lg bg-gold/10 p-3.5 border border-gold/30">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gold mb-1">
              💡 Virada de Chave (Atualidade / Tese Vinculante / Critério Decisivo)
            </div>
            <p className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed">
              {result.study.virada.raciocinio}
            </p>
          </div>

          {result.study.virada.exemplo && (
            <div className="rounded-lg bg-secondary/30 p-3.5 border border-border/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                ⚖️ Exemplo / Caso Concreto no Exame
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {result.study.virada.exemplo}
              </p>
            </div>
          )}
        </div>
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
