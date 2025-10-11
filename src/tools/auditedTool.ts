import { Trust } from "../core/types.js";

export function auditedTool<TArgs extends object>(
  name: string,
  requiredTrust: Exclude<Trust, "low">,
  impl: (args: TArgs) => Promise<any>
) {
  return async (args: TArgs, ctx: { minTrust: Trust; why?: string; evidence?: string[] }) => {
    if (ctx.minTrust === "low") throw new Error(`TOOL_FORBIDDEN:${name}`);
    if (requiredTrust === "trusted" && ctx.minTrust !== "trusted" && ctx.minTrust !== "root")
      throw new Error(`TOOL_ELEVATION_REQUIRED:${name}`);
    return impl(args);
  };
}
