export * from "./en.js";
export * from "./de.js";

export const combinedRules = (lang: "de" | "en" | "both" = "both") => {
  switch (lang) {
    case "de": return { lang, packs: ["de"] as const };
    case "en": return { lang, packs: ["en"] as const };
    default:   return { lang, packs: ["de","en"] as const };
  }
};
