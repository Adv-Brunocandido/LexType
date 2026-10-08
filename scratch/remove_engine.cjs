const fs = require("fs");
const filePath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(
  /interface Engine \{[\s\S]*?const newEngine = \(text: string\): Engine => \(\{[\s\S]*?errStreak: 0,\n  wrongAt: null,\n\}\);\n/,
  "",
);

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done");
