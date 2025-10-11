export type Trust = "root" | "trusted" | "low" | "unknown";
export type Origin = "system" | "user" | "rag" | "tool";

export type Span = { text: string; trust: Trust; origin: Origin; meta?: Record<string, any> };
export type Message = { role: "system" | "user" | "assistant"; spans: Span[] };

export type InjectionRule = { when: { from: Trust }, deny: (RegExp | string)[] };
export type ToolsRule = { allow?: string[]; deny?: string[] };
export type OutputRule = { mustBeJson?: boolean; denyLeakage?: RegExp[] };

export type Rules = { injections?: InjectionRule[]; tools?: ToolsRule; outputs?: OutputRule };
export type Violation = { code: string; message: string; span?: Span };
