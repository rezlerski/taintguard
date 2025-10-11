export type AuditEvent = {
  type: "violation" | "tool" | "prompt";
  data: any;
};

function isDebugEnabled(): boolean {
  try {
    const anyGlobal: any = (globalThis as any);
    const dbg = anyGlobal?.process?.env?.DEBUG ?? anyGlobal?.DEBUG ?? "";
    return typeof dbg === "string" && dbg.includes("taintguard");
  } catch {
    return false;
  }
}

export function emitAudit(e: AuditEvent) {
  if (isDebugEnabled() && typeof console !== "undefined" && typeof console.debug === "function") {
    console.debug("[audit]", e.type, e.data);
  }
}
