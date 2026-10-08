import { describe, expect, it } from "vitest";
import {
  backspace,
  isComplete,
  newEngine,
  pendingErrors,
  restartLine,
  typeChar,
} from "@/lib/engine";

const strict = { stopOnError: true, caseSensitive: false, layout: "abnt2" as const, now: 1000 };
const fluid = { ...strict, stopOnError: false };

const typeAll = (e: ReturnType<typeof newEngine>, s: string, o = strict) => {
  for (const ch of s) typeChar(e, ch, o);
};

describe("Typing engine — strict mode (cursor stops on error)", () => {
  it("freezes the cursor on a wrong key", () => {
    const e = newEngine("ab");
    const out = typeChar(e, "x", strict);
    expect(out.kind).toBe("wrong");
    expect(e.pos).toBe(0);
    expect(e.wrongAt).toBe(0);
    expect(e.errors).toBe(1);
  });

  it("advances only with the correct key and completes", () => {
    const e = newEngine("ab");
    typeChar(e, "x", strict);
    typeAll(e, "ab");
    expect(e.pos).toBe(2);
    expect(isComplete(e)).toBe(true);
  });

  it("ignores backspace", () => {
    const e = newEngine("ab");
    typeChar(e, "a", strict);
    expect(backspace(e, true)).toBe(false);
    expect(e.pos).toBe(1);
  });

  it("accepts accented characters typed without the dead key", () => {
    const e = newEngine("ação");
    typeAll(e, "acao");
    expect(isComplete(e)).toBe(true);
  });
});

describe("Typing engine — fluid mode (keybr style)", () => {
  it("keeps moving forward and marks the wrong character", () => {
    const e = newEngine("abc");
    typeAll(e, "axc", fluid);
    expect(e.pos).toBe(3);
    expect(e.marks[1]).toBe(true);
    expect(pendingErrors(e)).toBe(1);
    expect(isComplete(e)).toBe(false);
  });

  it("requires backspace to fix errors before completion", () => {
    const e = newEngine("abc");
    typeAll(e, "axc", fluid);
    expect(typeChar(e, "z", fluid).kind).toBe("ignored");
    expect(backspace(e, false)).toBe(true);
    expect(backspace(e, false)).toBe(true);
    expect(e.pos).toBe(1);
    expect(pendingErrors(e)).toBe(0);
    const last = typeChar(e, "b", fluid);
    const done = typeChar(e, "c", fluid);
    expect(last.kind).toBe("correct");
    expect(done.kind === "correct" && done.finished).toBe(true);
  });
});

describe("Typing engine — options", () => {
  it("is case sensitive when capitalization module is on", () => {
    const e = newEngine("Ab");
    expect(typeChar(e, "a", { ...strict, caseSensitive: true }).kind).toBe("wrong");
    expect(typeChar(e, "A", { ...strict, caseSensitive: true }).kind).toBe("correct");
  });

  it("restartLine resets progress but keeps the error tally", () => {
    const e = newEngine("abc");
    typeAll(e, "ab");
    typeChar(e, "x", strict);
    restartLine(e);
    expect(e.pos).toBe(0);
    expect(e.startedAt).toBeNull();
    expect(e.errors).toBe(1);
  });

  it("reports when the session starts", () => {
    const e = newEngine("ab");
    expect(typeChar(e, "a", strict).started).toBe(true);
    expect(typeChar(e, "b", strict).started).toBe(false);
  });
});
