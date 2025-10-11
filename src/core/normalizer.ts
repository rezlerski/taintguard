import { foldHomoglyphs } from "./homoglyph.js";

export const normalize = (s: string) =>
  foldHomoglyphs(
    s.normalize("NFKC")
     .replace(/[​-‍﻿]/g, "") // zero-width
  ).toLowerCase();
