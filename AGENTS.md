# AGENTS.md

## Review guidelines

Reviewers (Codex on GitHub included) follow this on every PR:

```
Always cite file:line.

1. If any scope or redesign is required, provide hard relevant proof: which parts of the application/service are affected, what would regress, what could be consolidated.
2. Flag issues with correctness, data integrity, and unproven claims.
3. Flag anything that would result in a regression in the existing codebase.
4. Try to scope proposed edits to be as minimal as possible unless we trigger the "scope/redesign required" parameters in 1.

Auth or tenant-isolation holes count as correctness (2). A "Fixed in <sha>" claim that is not in the PR head being reviewed is an unproven claim (2).

Reply in this format:

Scope/Redesign suggested (1)
Correctness, data integrity, unproven claims (2)
Regressions (3)
Additional issues found from the 4 criteria from above
```
