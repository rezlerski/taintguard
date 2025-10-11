const MAP: Record<string, string> = {
  "а": "a", // Cyrillic a -> Latin a
  "ｅ": "e", // fullwidth e -> e
  "і": "i", // Cyrillic i -> i
  "о": "o",
  "р": "p",
  "ѕ": "s",
  "у": "y",
  "ѵ": "v",
  "：": ":", 
  "／": "/", 
  "－": "-", 
  "＿": "_"
};
export const foldHomoglyphs = (s: string) => s.replace(
  /[аеіорѕуѵ：／－＿]/g,
  (ch) => MAP[ch] ?? ch
);
