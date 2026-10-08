const fs = require("fs");

const kbPath = "c:\\FOLDER APPS\\LexType\\src\\components\\Keyboard.tsx";
let kb = fs.readFileSync(kbPath, "utf8");

const replacement = `function fingerClass(key: string, layout: KeyboardLayout, isNext: boolean): string {
  const info = getFingers(layout)[key];
  if (!info) return "bg-keycap text-keycap-foreground border-border";
  
  const h = info.hand;
  const f = info.finger.toLowerCase();
  
  // Vibrant Rainbow colors, full opacity
  let baseColor = "";
  let borderColor = "";
  let textColor = "text-white"; 
  
  if (h === "E" && f.includes("nimo")) { baseColor = "bg-rose-500"; borderColor = "border-rose-700"; }
  else if (h === "E" && f.includes("anelar")) { baseColor = "bg-orange-400"; borderColor = "border-orange-600"; }
  else if (h === "E" && f.includes("dio")) { baseColor = "bg-amber-400"; borderColor = "border-amber-600"; textColor="text-amber-950"}
  else if (h === "E" && f.includes("indicador")) { baseColor = "bg-emerald-400"; borderColor = "border-emerald-600"; textColor="text-emerald-950"}
  else if (h === "D" && f.includes("indicador")) { baseColor = "bg-sky-400"; borderColor = "border-sky-600"; textColor="text-sky-950"}
  else if (h === "D" && f.includes("dio")) { baseColor = "bg-indigo-400"; borderColor = "border-indigo-600"; }
  else if (h === "D" && f.includes("anelar")) { baseColor = "bg-violet-400"; borderColor = "border-violet-600"; }
  else if (h === "D" && f.includes("nimo")) { baseColor = "bg-fuchsia-400"; borderColor = "border-fuchsia-600"; }
  else return "bg-keycap text-keycap-foreground border-border";
  
  if (isNext) {
    return \`\${baseColor} \${borderColor} \${textColor} brightness-125 shadow-lg scale-105 z-10\`;
  }
  return \`\${baseColor} \${borderColor} \${textColor}\`;
}`;

kb = kb.replace(/function fingerClass[\s\S]*?return.*\n\}/m, replacement);
fs.writeFileSync(kbPath, kb);
console.log("Fixed Keyboard colors");
