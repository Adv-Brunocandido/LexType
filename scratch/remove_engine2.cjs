const fs = require("fs");
const filePath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

// Use a more relaxed regex to remove `interface Engine` up to the end of `newEngine`
content = content.replace(
  /interface Engine \{[\s\S]*?const newEngine = \(text: string\): Engine => \(\{[\s\S]*?wrongAt: null,[\s\S]*?\}\);/m,
  "",
);

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done");
