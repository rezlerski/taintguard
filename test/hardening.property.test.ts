import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { normalize } from "../src/core/normalizer.js";
import { spanViolations } from "../src/core/detector.js";
import { defineRules } from "../src/core/rules.js";
import { deRules } from "../src/packs/de.js";
import { enRules } from "../src/packs/en.js";
import { zeroWidthMutator, homoglyphMutator, spacingMutator, paraphraseArb } from "./mutations.js";

const rules = defineRules({
  injections: [
    ...((deRules.injections) ?? []),
    ...((enRules.injections) ?? [])
  ]
});

describe("Injection detection under adversarial mutations", () => {
  it("detects paraphrased + zero-width variants", () => {
    fc.assert(
      fc.property(paraphraseArb, (s) => {
        const z = fc.sample(zeroWidthMutator(s), 1)[0];
        const hits = spanViolations({ text: z, trust: "low", origin: "user" }, rules.injections!);
        expect(hits.length).toBeGreaterThan(0);
      })
    );
  });

  it("detects homoglyph variants", () => {
    fc.assert(
      fc.property(paraphraseArb, (s) => {
        const h = fc.sample(homoglyphMutator(s), 1)[0];
        const hits = spanViolations({ text: h, trust: "low", origin: "user" }, rules.injections!);
        expect(hits.length).toBeGreaterThan(0);
      })
    );
  });

  it("normalizer collapses spacing/zero-width noise", () => {
    fc.assert(
      fc.property(fc.string(), (base) => {
        const z = fc.sample(zeroWidthMutator(base), 1)[0];
        const sp = fc.sample(spacingMutator(base), 1)[0];
        expect(normalize(z)).toEqual(normalize(base));
        expect(typeof normalize(sp)).toBe("string");
      })
    );
  });
});
