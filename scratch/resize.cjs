const fs = require("fs");
const filePath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

const regex =
  /function LessonCard\(\{ item, onClose \}: \{ item: StudyItem; onClose: \(\) => void \}\) \{([\s\S]*?)return \([\s\S]*?\}\);?\n\}/;

content = content.replace(regex, (match) => {
  let replaced = match;
  // Increase Semântica title
  replaced = replaced.replace(
    /"text-xs font-semibold uppercase tracking-wider text-gold"/g,
    '"text-sm font-semibold uppercase tracking-wider text-gold"',
  );
  // Increase Semântica content
  replaced = replaced.replace(/"mt-1 pr-6 text-sm"/g, '"mt-1 pr-6 text-lg"');
  // Increase Raciocínio content
  replaced = replaced.replace(/"mt-2 text-sm"/g, '"mt-2 text-lg"');
  // Increase Exemplo content
  replaced = replaced.replace(
    /"mt-2 text-sm text-muted-foreground"/g,
    '"mt-2 text-lg text-muted-foreground"',
  );
  return replaced;
});

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done");
