const fs = require("fs");

const kbPath = "c:\\FOLDER APPS\\LexType\\src\\components\\Keyboard.tsx";
let kb = fs.readFileSync(kbPath, "utf8");

const regex = /const title = d\.trainable[\s\S]*?isFlash &&/m;

const replacement = `const title = d.trainable
                ? [
                    info && \`Mão \${info.hand === "E" ? "esquerda" : "direita"} - \${info.finger}\`,
                    st?.attempts
                      ? \`\${masteryLabel(masteryOf(st))} (\${masteryOf(st)}%)\`
                      : "Ainda não treinada",
                  ]
                    .filter(Boolean)
                    .join(" • ")
                : undefined;
              const Tag = onToggle && d.trainable ? "button" : "div";
              return (
                <Tag
                  key={d.id}
                  type={Tag === "button" ? "button" : undefined}
                  title={title}
                  onClick={onToggle && d.trainable ? () => onToggle(d.id) : undefined}
                  style={{
                    width: \`calc(var(--u) * \${d.w ?? 1} + \${((d.w ?? 1) - 1) * 0.25}rem)\`,
                    height: "var(--u)",
                  }}
                  className={cn(
                    "relative flex items-center justify-center rounded-md border border-border font-mono-type font-semibold transition-all duration-100 keycap-shadow",
                    "bg-keycap text-keycap-foreground",
                    d.trainable
                      ? "text-[0.6rem] sm:text-sm"
                      : "text-[0.5rem] text-muted-foreground sm:text-[0.65rem]",
                    onToggle && d.trainable && "cursor-pointer hover:border-gold/60",
                    !onToggle && mode === "heatmap" && heatClass(d.id, stats),
                    !onToggle && mode === "rainbow" && d.trainable && fingerClass(d.id, layout, isNext),
                    !onToggle && mode === "rainbow" && !d.trainable && "bg-keycap text-keycap-foreground",
                    isSel && "border-gold bg-gold/15 text-gold",
                    isNext && mode !== "rainbow" &&
                      "z-10 scale-110 border-gold bg-gold text-gold-foreground shadow-[0_0_18px] shadow-gold/40",
                    isNext && mode === "rainbow" &&
                      "z-10 scale-110 shadow-[0_0_18px] shadow-primary/40",
                    isFlash &&`;

kb = kb.replace(regex, replacement);
fs.writeFileSync(kbPath, kb);
console.log("Fixed");
