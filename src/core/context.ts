import { Message, Span, Trust } from "./types.js";

export class Context {
  private messages: Message[] = [];
  add(role: Message["role"], text: string, trust: Trust, origin: Span["origin"], meta?: Span["meta"]) {
    const span: Span = { text, trust, origin, meta };
    this.messages.push({ role, spans: [span] });
    return this;
  }
  addSystem(text: string, opts?: { trust?: Trust }) { return this.add("system", text, opts?.trust ?? "root", "system"); }
  addUser(text: string, opts?: { trust?: Trust }) { return this.add("user", text, opts?.trust ?? "low", "user"); }
  addRag(text: string, opts?: { trust?: Trust, meta?: any }) { return this.add("user", text, opts?.trust ?? "trusted", "rag", opts?.meta); }
  list() { return this.messages; }
}
export const context = () => new Context();
