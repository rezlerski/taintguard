import { defineRules } from "../core/rules.js";
import { Rules } from "../core/types.js";

export const enInjectionPhrases: (RegExp | string)[] = [
  /ignore previous/i,
  /previous instructions/i,
  /ignore (all|the)? previous (instructions|messages)/i,
  /disregard (all )?(rules|instructions)/i,
  /you are now/i,
  /act as/i,
  /override (the )?(system|policy)/i,
  /reset (the )?system prompt/i,
  /developer mode/i,
  /disable (safety|guardrails|filters)/i,
  /call function/i, /use tool/i, /run tool/i, /function call/i, /use function/i,
  /output raw text/i, /answer (only|strictly) in/i,
  /return unfiltered/i,
  /do anything now/i,
  /dan (mode)?/i,
  /jailbreak/i,
  /hypothetical/i,
  /write a story about/i,
  /simulate/i,
  /repeat (the )?system prompt/i,
  /reveal (your )?(prompt|instructions)/i,
  /without ethics/i,
  /in character as/i,
  /\[?SYSTEM\b.+\]?/i,
  /as a (text|fictional) model/i,
  /print the instructions/i
];

export const enLeakage: RegExp[] = [
  /api[_ -]?key/i, /secret/i, /password/i, /bearer\s+[a-z0-9\-_\.]+/i,
  /private token/i, /client[_ -]?secret/i,
];

export const enRules: Rules = defineRules({
  injections: [
    { when: { from: "low" }, deny: enInjectionPhrases },
    { when: { from: "unknown" }, deny: enInjectionPhrases },
  ],
  outputs: { denyLeakage: enLeakage }
});
