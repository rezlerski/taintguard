import { Message, Rules, Violation } from "./types.js";
import { spanViolations } from "./detector.js";

export function preflight(messages: Message[], rules: Rules): Violation[] {
  const inj = rules.injections ?? [];
  const v: Violation[] = [];
  for (const m of messages) for (const s of m.spans) {
    const hits = spanViolations(s, inj);
    if (hits.length) v.push({ code: "INJECTION", message: `Denied patterns: ${hits.join(", ")}`, span: s });
  }
  return v;
}

export type StreamAction = "pass" | "mask" | "drop" | "abort";
export type OnToken = (tok: string) => StreamAction;

export function streamGuard(onTokenRules: { denyLeakage?: RegExp[] }) {
  const patterns = onTokenRules.denyLeakage ?? [];
  return (tok: string): StreamAction => {
    if (patterns.some(r => r.test(tok))) return "mask";
    if (/ignore previous|you are now|override|entwicklermodus|du bist jetzt/i.test(tok)) return "drop";
    return "pass";
  };
}
