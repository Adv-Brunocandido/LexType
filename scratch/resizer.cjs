const fs = require("fs");
const filePath = "c:\\FOLDER APPS\\LexType\\src\\routes\\index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

// 1. typingNode
// <section className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
content = content.replace(
  /<section className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">/g,
  '<section className="relative rounded-xl border border-border bg-card p-6 shadow-sm resize-y overflow-auto min-h-[200px] flex flex-col">',
);

// 2. keyboardNode
// <section className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
content = content.replace(
  /<section className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">/g,
  '<section className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm resize-y overflow-auto min-h-[200px]">',
);

// 3. selectionNode
// <section className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
// wait, selectionNode has the same class. Since we did /g, it will affect both keyboardNode and selectionNode. Which is good!

// 4. LessonCard
// <div className="animate-pop-in relative space-y-4 rounded-xl border border-gold\/40 bg-gold\/5 p-5">
content = content.replace(
  /<div className="animate-pop-in relative space-y-4 rounded-xl border border-gold\/40 bg-gold\/5 p-5">/g,
  '<div className="animate-pop-in relative space-y-4 rounded-xl border border-gold/40 bg-gold/5 p-5 resize-y overflow-auto min-h-[200px]">',
);

// 5. professorNode
// <section className="flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
content = content.replace(
  /<section className="flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">/g,
  '<section className="flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm resize-y overflow-auto min-h-[120px]">',
);

fs.writeFileSync(filePath, content, "utf-8");
console.log("Done");
