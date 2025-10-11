import { streamGuard } from "../src/core/guard.js";

const guard = streamGuard({ denyLeakage: [/api[_ -]?key/i, /password/i] });

const simulatedTokens = ["Hello", " ", "my ", "api_key", "=", "XYZ"];
for (const t of simulatedTokens) {
  const action = guard(t);
  if (action !== "pass") console.log("Action on token:", t, "->", action);
}
