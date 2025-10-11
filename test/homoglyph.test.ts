import { describe, it, expect } from "vitest";
import { normalize } from "../src/core/normalizer.js";

describe("normalize", () => {
  it("removes zero-width", () => {
    expect(normalize("a\u200Bb")).toBe("ab");
  });
  it("folds simple homoglyphs", () => {
    expect(normalize("раѕѕwоrd")).toBe("password");
  });
});
