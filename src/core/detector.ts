import { Span, InjectionRule } from "./types.js";
import { normalize } from "./normalizer.js";

export function spanViolations(span: Span, rules: InjectionRule[]): string[] {
  const n = normalize(span.text);
  const applicable = rules.filter(r => r.when.from === span.trust);
  const denies = applicable.flatMap(r => r.deny.map(d => (typeof d === "string" ? new RegExp(d, "i") : d)));
  return denies.filter(re => re.test(n)).map(re => re.toString());
}
