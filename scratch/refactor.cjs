const fs = require("fs");

const filePath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

// 1. Update imports from @/lib/typing
content = content.replace(
  /(import \{\s*)([^}]*)(,\s*type KeyStats,\s*type Mode,\s*\}(\s*from\s*"@\/lib\/typing";))/,
  "$1$2, applyModifiers, precisionBonus, addPracticeSeconds, type TextModifiers, NO_MODIFIERS$3",
);

// 2. Add import for engine.ts
if (!content.includes("@/lib/engine")) {
  content = content.replace(
    /(import \{ cn \} from "@\/lib\/utils";)/,
    '$1\nimport { type Engine, newEngine, typeChar, backspace, restartLine, isComplete, pendingErrors } from "@/lib/engine";',
  );
}

// 3. Remove local Engine interface and newEngine
content = content.replace(
  /interface Engine \{[\s\S]*?const newEngine = \(text: string\): Engine => \(\{[\s\S]*?timedMap: \{\},\n\}\);\n/,
  "",
);

// 4. Add stopOnError state and modifier state
const stateInjection = `  const [stopOnError, setStopOnError] = useState(true);
  const [modifiers, setModifiers] = useState<TextModifiers>(NO_MODIFIERS);`;

content = content.replace(
  /(const \[restartOnError, setRestartOnError\] = useState\(false\);)/,
  `$1\n${stateInjection}`,
);

// 5. Load settings in useEffect
const effectInjection = `
    const savedStopOnError = localStorage.getItem("lextype-stop-on-error") !== "0";
    setStopOnError(savedStopOnError);
    
    try {
      const savedMods = JSON.parse(localStorage.getItem("lextype-modifiers") || "null");
      if (savedMods) setModifiers(savedMods);
    } catch {}
`;
content = content.replace(
  /(const savedRigor = localStorage\.getItem\("lextype-restart-on-error"\) === "1";\s*setRestartOnError\(savedRigor\);)/,
  `$1${effectInjection}`,
);

// 6. Apply modifiers when generating text in reset()
content = content.replace(
  /loadText\(generateText\(\{ mode: "palavras", keys: r\.target, weak: r\.weak, level: lvl \}\)\);/,
  'loadText(applyModifiers(generateText({ mode: "palavras", keys: r.target, weak: r.weak, level: lvl }), modifiers));',
);

content = content.replace(
  /loadText\(generateText\(\{ mode: m, keys, weak: weakestKeys\(stats, keys\), level: lvl \}\)\);/,
  "loadText(applyModifiers(generateText({ mode: m, keys, weak: weakestKeys(stats, keys), level: lvl }), modifiers));",
);

// 7. Modify `finish` to include practice seconds and precision bonus
const finishReplace = `    saveKeyStats(stats);
    setKeyStats(stats);

    // Save practice seconds
    if (e.startedAt) {
      addPracticeSeconds(Math.round((now - e.startedAt) / 1000));
    }
    
    let levelChange = 0;`;

content = content.replace(
  /saveKeyStats\(stats\);\s*setKeyStats\(stats\);\s*let levelChange = 0;/,
  finishReplace,
);

const xpCalc = `    const baseGained = Math.round(
      len * (accuracy / 100) * (1 + e.maxCombo / 40) * (mode === "automatico" ? 1 + level / 10 : 1)
    );
    const bonusPct = precisionBonus(accuracy);
    const gained = Math.round(baseGained * (1 + bonusPct / 100));`;

content = content.replace(
  /const gained = Math\.round\([\s\S]*?\);\n\s*const newXp = xp \+ gained;/,
  `${xpCalc}\n    const newXp = xp + gained;`,
);

// 8. Refactor handleInput to capture backspace correctly
const handleInputReplace = `  const handleInput = (el: HTMLInputElement, final: boolean) => {
    const v = el.value;
    if (v.length < consumed.current) {
      let deletions = consumed.current - v.length;
      while (deletions > 0) {
        if (backspace(eng.current, stopOnError)) deletions--;
        else break;
      }
      consumed.current = v.length;
      rerender();
      return;
    }
    let fresh = v.slice(consumed.current);
    if (!final && composing.current && /[´\`~^\¨]$/.test(fresh)) fresh = fresh.slice(0, -1);
    for (const ch of fresh) processChar(ch);
    consumed.current += fresh.length;
    if (final || !composing.current) {
      el.value = "";
      consumed.current = 0;
    }
  };`;

content = content.replace(
  /const handleInput = \(el: HTMLInputElement, final: boolean\) => \{[\s\S]*? consumed\.current = 0;\n    \}\n  \};/,
  handleInputReplace,
);

// 9. Refactor processChar to use typeChar from engine
const processCharReplace = `  const processChar = useCallback(
    (ch: string) => {
      const e = eng.current;
      if (result || !e.text || isComplete(e)) return;
      const now = Date.now();
      if (!e.startedAt) {
        setRunning(true);
      }
      
      const outcome = typeChar(e, ch, {
         stopOnError,
         caseSensitive: true,
         layout: keyboardLayout,
         now
      });
      
      if (outcome.kind === "ignored") return;
      
      if (outcome.kind === "correct") {
        playKey();
        if (COMBO_MILESTONES.includes(e.combo) || (e.combo > 200 && e.combo % 50 === 0)) {
          playCombo();
          setComboPulse((p) => p + 1);
          say("combo", { n: e.combo });
        }
        setFlash(null);
        if (outcome.finished) finish();
      } else {
        playError();
        setFlash({ key: outcome.keys[outcome.keys.length - 1]!, type: "err" });
        if (restartOnError) {
          restartLine(e);
          setElapsed(0);
          setRunning(false);
          say("error", { k: outcome.expected });
          rerender();
          return;
        }
        if (e.errStreak === 3) say("errorStreak");
        else if (e.errStreak === 1 && Math.random() < 0.45) say("error", { k: outcome.expected });
      }
      rerender();
    },
    [finish, keyboardLayout, restartOnError, stopOnError, result, say],
  );`;

content = content.replace(
  /const processChar = useCallback\([\s\S]*?rerender\(\);\n    \},\n    \[finish, keyboardLayout, restartOnError, result, say\],\n  \);/,
  processCharReplace,
);

// 10. Update layout names in the header
content = content.replace(/"ABNT2 \(com Ç\)"/g, '"ABNT2"');
content = content.replace(/"ANSI US \(sem Ç\)"/g, '"ANSI US"');

// 11. Add UI switches for stopOnError and modifiers in Settings
const settingsUI = `                <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={stopOnError}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setStopOnError(val);
                    localStorage.setItem("lextype-stop-on-error", val ? "1" : "0");
                  }}
                  className="rounded border-border accent-gold"
                />
                <span title="Modo Estrito: Trava na letra errada. Desmarque para Modo Fluido (corrigir com Backspace)">
                  Parar cursor no erro
                </span>
              </label>
              
              <div className="h-4 w-px bg-border" />
              <span className="text-muted-foreground ml-2">Complexidade:</span>
              
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={modifiers.capitals}
                  onChange={(e) => {
                    const next = { ...modifiers, capitals: e.target.checked };
                    setModifiers(next);
                    localStorage.setItem("lextype-modifiers", JSON.stringify(next));
                  }}
                  className="rounded border-border accent-gold"
                />
                <span title="Injetar letras maiúsculas aleatórias no texto">Maiúsculas</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={modifiers.punctuation}
                  onChange={(e) => {
                    const next = { ...modifiers, punctuation: e.target.checked };
                    setModifiers(next);
                    localStorage.setItem("lextype-modifiers", JSON.stringify(next));
                  }}
                  className="rounded border-border accent-gold"
                />
                <span title="Injetar pontuação (, . ? !) no final das frases">Pontuação</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={modifiers.symbols}
                  onChange={(e) => {
                    const next = { ...modifiers, symbols: e.target.checked };
                    setModifiers(next);
                    localStorage.setItem("lextype-modifiers", JSON.stringify(next));
                  }}
                  className="rounded border-border accent-gold"
                />
                <span title="Injetar símbolos (@, #, $, §, _)">Símbolos</span>
              </label>
`;
content = content.replace(
  /(<span title="Ao errar um caractere, a linha reinicia do zero para treinar precisão máxima">\s*Reiniciar ao errar\s*<\/span>\s*<\/label>)/,
  `$1\n${settingsUI}`,
);

// 12. Fix the error highlight classes to use wrongAt vs marks
const renderReplace = `                    const past = i < e.pos;
                    const isWrongStrict = e.wrongAt === i;
                    const isWrongFluid = e.marks[i];
                    const isError = isWrongStrict || isWrongFluid;
                    const isCurrent = i === e.pos && !isWrongStrict;
                    const char = ch === " " ? "␣" : ch;
                    const c = cn(
                      "relative transition-colors duration-100",
                      isCurrent && "bg-foreground/20 text-foreground animate-pulse font-bold underline underline-offset-4",
                      isWrongStrict && "bg-destructive text-destructive-foreground animate-shake font-bold",
                      isWrongFluid && "text-destructive underline decoration-destructive decoration-wavy",
                      past && !isWrongFluid && "text-muted-foreground",
                      !past && !isCurrent && !isError && "text-foreground opacity-90",
                      isError && "z-10",
                    );
                    return (
                      <span key={i} className={c}>
                        {char}
                      </span>
                    );`;

content = content.replace(
  /const past = i < e\.pos;\s*const isWrong = e\.wrongAt === i;\s*const isCurrent = i === e\.pos && !isWrong;[\s\S]*?<\/span>\s*\);\n/,
  `${renderReplace}\n`,
);

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done");
