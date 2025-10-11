import { Message, Span } from "./types.js";

const fenceSpan = (s: Span) => {
  if (s.trust === "low") return `<DATA trust="low" origin="${s.origin}">${s.text}</DATA>`;
  if (s.trust === "trusted") return `<DATA trust="trusted" origin="${s.origin}">${s.text}</DATA>`;
  return s.text;
};

export function compilePrompt(messages: Message[], opts?: { fenceLowTrust?: boolean; hashSystem?: boolean }) {
  const parts: string[] = [];
  for (const m of messages) {
    for (const s of m.spans) {
      parts.push(opts?.fenceLowTrust ? fenceSpan(s) : s.text);
    }
  }
  const prompt = parts.join("\n\n");
  const provenance = messages.flatMap(m => m.spans.map(s => ({ trust: s.trust, origin: s.origin })));
  return { prompt, provenance };
}
