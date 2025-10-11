import { defineRules } from "../core/rules.js";
import { Rules } from "../core/types.js";

export const deInjectionPhrases: (RegExp | string)[] = [
  /ignoriere vorherige/i,
  /ignoriere (alle|die)? (vorherigen|bisherigen) (anweisungen|nachrichten)/i,
  /missachte (alle )?(regeln|anweisungen)/i,
  /du bist jetzt/i,
  /tue so als ob|ag(iere)? als/i,
  /überschreibe (den )?(system|policy)-prompt/i,
  /setze den system[- ]?prompt zurück/i,
  /entwicklermodus|developer[- ]?mode/i,
  /sicherheit (deaktivieren|abschalten)/i,
  /funktion (ausführen|verwenden|aufrufen|callen)/i,
  /rohen? text ausgeben|ohne json antworten/i,
  /ungefiltert zurückgeben/i,
  /handle als ob|gib vor zu sein/i,
  /ändere deine (persönlichkeit|rolle)/i,
  /verhalte dich wie/i,
  /geh über (deine )?(grenzen|einschränkungen) hinaus/i,
  /zeige mir den (original|geheim)-prompt/i,
  /zeige (den )?(inhalt|text|daten) ungefiltert/i,
  /gib (alles|eine )?(alternative|verbotene) antwort/i,
  /(antworte|sag) das (folgende|genau|jetzt|untenstehende)/i,
  /deaktiviere (deine )?(zensur|filter|ethik)/i,
  /was ist der (erste|anfangs) teil (deiner)? anweisung/i,
  /gib den (ursprünglichen|systemischen) befehl aus/i,
  /füge (den )?(folgenden )?text ein/i,
  /verletzt du deine (regeln|richtlinien)/i,
  /mach (eine|etwas) (gefährliche|illegale|verbotene) ausgabe/i,
  /verstecke diese (anweisung|nachricht)/i,
  /tarn(e)? dich als/i,
  /(schalt|deaktivier) den sicherheitsmodus ab/i,
  /systembeschränkungen (umgehen|ignoriere)/i,
];

export const deLeakage: RegExp[] = [
  /api[_ -]?schl(ü|u)ssel/i, /passwort/i, /geheime?s? token/i,
  /bearer\s+[a-z0-9\-_\.]+/i, /client[_ -]?secret/i,
];

export const deRules: Rules = defineRules({
  injections: [
    { when: { from: "low" }, deny: deInjectionPhrases },
    { when: { from: "unknown" }, deny: deInjectionPhrases },
  ],
  outputs: { denyLeakage: deLeakage }
});
