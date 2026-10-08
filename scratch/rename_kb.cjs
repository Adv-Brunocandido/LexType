const fs = require("fs");
const filePath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(/"🇧🇷 ABNT2 \(com Ç\)"/g, '"🇧🇷 ABNT2"');
content = content.replace(/"ANSI \(US - sem Ç\)"/g, '"ANSI US"');
content = content.replace(/"ABNT2 \(Brasil\)"/g, '"ABNT2"');
content = content.replace(/"🇺🇸 ANSI \(sem Ç\)"/g, '"🇺🇸 ANSI"');

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done");
