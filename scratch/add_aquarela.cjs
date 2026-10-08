const fs = require("fs");

const path = "c:\\FOLDER APPS\\LexType\\src\\styles.css";
let content = fs.readFileSync(path, "utf-8");

const aquarelaTheme = `
.aquarela {
  --background: oklch(0.97 0.03 200);
  --foreground: oklch(0.35 0.05 260);
  --card: oklch(0.99 0.01 200);
  --card-foreground: oklch(0.35 0.05 260);
  --popover: oklch(0.99 0.01 200);
  --popover-foreground: oklch(0.35 0.05 260);
  --primary: oklch(0.75 0.12 330);
  --primary-foreground: oklch(0.99 0.02 330);
  --secondary: oklch(0.93 0.04 200);
  --secondary-foreground: oklch(0.4 0.06 260);
  --muted: oklch(0.93 0.04 200);
  --muted-foreground: oklch(0.6 0.05 260);
  --accent: oklch(0.9 0.06 200);
  --accent-foreground: oklch(0.35 0.05 260);
  --destructive: oklch(0.75 0.15 15);
  --destructive-foreground: oklch(0.99 0.02 15);
  --border: oklch(0.9 0.04 200);
  --input: oklch(0.9 0.04 200);
  --ring: oklch(0.75 0.12 330);
  --gold: oklch(0.85 0.15 75);
  --gold-foreground: oklch(0.4 0.1 75);
  --keycap: oklch(0.96 0.02 200);
  --keycap-foreground: oklch(0.4 0.06 260);
  --success: oklch(0.8 0.15 140);
}
`;

if (!content.includes(".aquarela {")) {
  content = content.replace(/\.oled \{[\s\S]*?\}\s*/, (match) => match + aquarelaTheme);
  fs.writeFileSync(path, content, "utf-8");
}

// Update index.tsx theme types and selection
const indexPath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let indexContent = fs.readFileSync(indexPath, "utf-8");

indexContent = indexContent.replace(
  /export type ThemeMode = "dark" \| "light" \| "sepia" \| "oled";/,
  'export type ThemeMode = "dark" | "light" | "sepia" | "oled" | "aquarela";',
);

indexContent = indexContent.replace(
  /document\.documentElement\.classList\.remove\("dark", "light", "sepia", "oled"\);/,
  'document.documentElement.classList.remove("dark", "light", "sepia", "oled", "aquarela");',
);

indexContent = indexContent.replace(
  /\{ id: "oled", label: "⬛ OLED" \},/,
  '{ id: "oled", label: "⬛ OLED" },\n                      { id: "aquarela", label: "🎨 Aquarela" },',
);

fs.writeFileSync(indexPath, indexContent, "utf-8");
console.log("Done");
