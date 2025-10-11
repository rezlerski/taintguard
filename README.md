**⚠️ Experimental – Not for production**

This package is a *reference implementation / idea starter* for span-based taint tracking and guardrails around LLM prompts. It is **not** a drop-in security control and comes **without guarantees**. Use it for exploration, prototypes, or as a basis for your own hardened implementation.  
For any production use, perform your own threat modeling, add comprehensive tests, and combine with defense-in-depth controls (rate limiting, moderation, output validation, allowlists, human review, etc.).

# taintguard

Span-based taint tracking for LLM prompts (TypeScript-first).
Keep untrusted text from hijacking system instructions or tools. Fence low-trust data, enforce policies before the call, guard the stream token-by-token, and gate tool use by provenance.

## Why taintguard?

Prompt injection thrives on mixing instructions with data. Regex-only filters are brittle. taintguard labels every text span with a trust level (root/trusted/low/unknown).

## Features

🧩 Span provenance: per-span trust + origin (system|user|rag|tool)  
🧱 Prompt fencing: XML-like <DATA trust="low">…</DATA> by default  
🔎 Preflight detection: jailbreak/role-hijack/“developer mode”/tool-trigger patterns  
💧 Leakage controls: deny lists for API keys, passwords, tokens  
📡 Streaming guards: token-wise mask/drop to avoid echoing risky text  
🔐 Tool gating: allow/deny lists; elevation required for sensitive tools  
🌍 Language packs: English & German rules out of the box  
🧪 Property tests: adversarial fuzzing (zero-width, homoglyphs, spacing) with fast-check

## Quick Start

```bash
pnpm i
pnpm build
pnpm test
```

Branch Code Coverage: 79.48%  
License: MIT