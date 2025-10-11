import { preflight } from "../core/guard.js";
import { compilePrompt } from "../core/renderer.js";
import { Rules, Message } from "../core/types.js";

export async function guardedOpenAIChat(fetchImpl: typeof fetch, endpoint: string, apiKey: string, messages: Message[], rules: Rules) {
  const violations = preflight(messages, rules);
  if (violations.length) throw new Error(`GuardViolation:${JSON.stringify(violations)}`);
  const { prompt } = compilePrompt(messages, { fenceLowTrust: true });

  const res = await fetchImpl(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({ model: "gpt-5", messages: [{ role: "user", content: prompt }] })
  });
  return res;
}
