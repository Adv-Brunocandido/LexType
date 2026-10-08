const fs = require("fs");

// 1. UPDATE STYLES.CSS
let cssPath = "c:\\FOLDER APPS\\LexType\\src\\styles.css";
let css = fs.readFileSync(cssPath, "utf8");

// Font family
css = css.replace(
  /font-family: "Inter", ui-sans-serif, system-ui, sans-serif;/g,
  'font-family: "Nunito", "Quicksand", ui-sans-serif, system-ui, sans-serif;',
);

// Aquarela Theme
const aquarelaTheme = `
.aquarela {
  --background: #FAF7F2;
  --foreground: #3A3238;
  --card: #FAF7F2;
  --card-foreground: #3A3238;
  --popover: #FAF7F2;
  --popover-foreground: #3A3238;
  --primary: #C8B6E2;
  --primary-foreground: #2D2638;
  --secondary: #EFECE6;
  --secondary-foreground: #3A3238;
  --muted: #EFECE6;
  --muted-foreground: #7a7078;
  --accent: #F4D4D4;
  --accent-foreground: #3A3238;
  --destructive: #F5C6B8;
  --destructive-foreground: #3A3238;
  --border: #DCD6CD;
  --input: #EFECE6;
  --ring: #C8B6E2;
  --gold: #C8B6E2;
  --gold-foreground: #2D2638;
  --keycap: #EFECE6;
  --keycap-foreground: #3A3238;
  --success: #CBE4D6;
}
`;
css = css.replace(/\.aquarela\s*\{[\s\S]*?\}/g, aquarelaTheme.trim());

fs.writeFileSync(cssPath, css);

// 2. UPDATE KEYBOARD.TSX
let kbPath = "c:\\FOLDER APPS\\LexType\\src\\components\\Keyboard.tsx";
let kb = fs.readFileSync(kbPath, "utf8");

// Add mode prop
kb = kb.replace(
  /layout\?: KeyboardLayout;/g,
  'layout?: KeyboardLayout;\n  mode?: "heatmap" | "rainbow";',
);
kb = kb.replace(
  /layout = "abnt2",\n\}: Props\)/g,
  'layout = "abnt2",\n  mode = "heatmap",\n}: Props)',
);

// Add fingerClass function
const fingerClassFn = `
function fingerClass(key: string, layout: KeyboardLayout, isNext: boolean): string {
  const info = getFingers(layout)[key];
  if (!info) return "bg-keycap text-keycap-foreground border-border";
  
  const h = info.hand;
  const f = info.finger.toLowerCase();
  
  const opBg = isNext ? "90" : "30";
  const opBorder = isNext ? "80" : "30";
  const textClr = isNext ? "text-[#2D2638]" : "text-[#3A3238]";
  
  let baseColor = "";
  let borderColor = "";
  
  if (h === "E" && f.includes("nimo")) { baseColor = "bg-[#F4D4D4]"; borderColor = "border-[#D98A8A]"; }
  else if (h === "E" && f.includes("anelar")) { baseColor = "bg-[#F5C6B8]"; borderColor = "border-[#E5A698]"; }
  else if (h === "E" && f.includes("dio")) { baseColor = "bg-[#F6E8B6]"; borderColor = "border-[#DCD6CD]"; }
  else if (h === "E" && f.includes("indicador")) { baseColor = "bg-[#CBE4D6]"; borderColor = "border-[#AACFBC]"; }
  else if (h === "D" && f.includes("indicador")) { baseColor = "bg-[#B6D8F6]"; borderColor = "border-[#98BCE5]"; }
  else if (h === "D" && f.includes("dio")) { baseColor = "bg-[#F6E8B6]"; borderColor = "border-[#DCD6CD]"; }
  else if (h === "D" && f.includes("anelar")) { baseColor = "bg-[#F5C6B8]"; borderColor = "border-[#E5A698]"; }
  else if (h === "D" && f.includes("nimo")) { baseColor = "bg-[#F4D4D4]"; borderColor = "border-[#D98A8A]"; }
  else return "bg-keycap text-keycap-foreground border-border";
  
  return \`\${baseColor}/\${opBg} \${borderColor}/\${opBorder} \${textClr}\`;
}
`;
if (!kb.includes("function fingerClass")) {
  kb = kb.replace(/function heatClass/, fingerClassFn + "\nfunction heatClass");
}

// Modify the classname logic in the keycap
const classLogic = `
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
                    isFlash &&
                      flash?.type === "err" &&
                      "animate-shake border-destructive bg-destructive text-destructive-foreground",
`;

kb = kb.replace(
  /d\.trainable[\s\S]*?animate-shake border-destructive bg-destructive text-destructive-foreground",/m,
  classLogic.trim() + ",",
);
fs.writeFileSync(kbPath, kb);

// 3. UPDATE INDEX.TSX
let idxPath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let idx = fs.readFileSync(idxPath, "utf8");

// State
if (!idx.includes("const [keyboardMode")) {
  idx = idx.replace(
    /const \[uiScale, setUiScale\] = useState/,
    `const [keyboardMode, setKeyboardMode] = useState<"heatmap" | "rainbow">(() => {
    if (typeof localStorage === "undefined") return "heatmap";
    return (localStorage.getItem("lextype-keyboard-mode") as any) || "rainbow";
  });\n  const [uiScale, setUiScale] = useState`,
  );
}

// Pass to Keyboard
idx = idx.replace(
  /scale=\{uiScale\}\n\s*layout=\{keyboardLayout\}/g,
  "scale={uiScale}\n                  layout={keyboardLayout}\n                  mode={keyboardMode}",
);

// Add the toggle in the UI (near where layout is chosen, which is in Command Palette)
// We need to add an item in Command palette or settings modal
// Let's find "Alterar Tamanho" or "Layout" in Settings Dialog
const modeToggleHtml = `
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Guia de Dedos (Aquarela)</Label>
                    <p className="text-sm text-muted-foreground">Mostra cores no teclado visual</p>
                  </div>
                  <Switch
                    checked={keyboardMode === "rainbow"}
                    onCheckedChange={(checked) => {
                      const m = checked ? "rainbow" : "heatmap";
                      setKeyboardMode(m);
                      localStorage.setItem("lextype-keyboard-mode", m);
                    }}
                  />
                </div>
`;

if (!idx.includes("Guia de Dedos (Aquarela)")) {
  idx = idx.replace(
    /<div className="space-y-6">([\s\S]*?)<div className="flex items-center justify-between">/m,
    `<div className="space-y-6">
$1${modeToggleHtml}
                <div className="flex items-center justify-between">`,
  );
}

fs.writeFileSync(idxPath, idx);
console.log("Done");
