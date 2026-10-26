# From “Copilot Is Dumb” to a Reliable Agent

A 30-minute, hands-on GitHub Copilot context-engineering workshop built around **BrewCart**, a runnable React and TypeScript coffee-shop checkout.

## Observable outcome

Participants turn a vague “fix the discount bug” request into an authoritative, scoped, and verified agent workflow using custom instructions, a prompt file, specialized agents, a reusable skill, a safety hook, tests, and human review.

## The defect

The order contains:

| Line | Amount | BEANS25 eligible? |
|---|---:|---:|
| House Blend beans × 2 | €40.00 | Yes |
| BrewCart gift card | €50.00 | No |
| Delivery | €5.00 | No |

The intentional baseline discounts the full €90 merchandise subtotal:

```text
Wrong discount: €22.50
Wrong total:    €72.50
```

The current pricing contract discounts beans only:

```text
Correct discount: €10.00
Correct total:    €85.00
Store loss fixed: €12.50
```

## Requirements

- Node.js 22+
- npm
- Git
- VS Code with GitHub Copilot Chat
- PowerShell on Windows or Bash/Git Bash
- Chromium for Playwright (`npx playwright install chromium`)

## Start in the intentional red state

```powershell
cd demo
npm ci
npx playwright install chromium
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

Bash:

```bash
cd demo
npm ci
npx playwright install chromium
./scripts/reset-demo.sh
./scripts/verify-baseline.sh
```

Expected: the beans-only focused test passes, while complete verification exposes gift-card over-discounting.

## Live comparison

### Weak request

Open only `src/domain/discountPolicy.ts`, start a fresh Copilot chat, and paste `prompts/weak-prompt.txt`:

```text
Fix the BEANS25 discount bug in `src/domain/discountPolicy.ts`.
```

The request gives Copilot no authority, excluded legacy source, acceptance values, or verification contract.

### Engineered request

1. Apply the context kit:

```powershell
./scripts/Apply-Context.ps1
```

2. Open a fresh Copilot chat.
3. Use **Plan** mode or select **BrewCart Debugger**.
4. Open or attach:
   - `src/domain/discountPolicy.ts`
   - `tests/discountPolicy.test.ts`
   - `docs/pricing-rules.md`
5. Invoke `.github/prompts/fix-checkout-context.prompt.md` or paste `prompts/engineered-prompt.txt`.
6. Require diagnosis before edits.
7. Review the proposed diff before accepting.
8. Run the verification ladder.

## Deterministic fallback

```powershell
./scripts/Apply-KnownFix.ps1
./scripts/Verify-Fixed.ps1
```

Bash:

```bash
./scripts/apply-known-fix.sh
./scripts/verify-fixed.sh
```

Expected:

```text
Tests: all passed
ESLint: 0 errors
Vite build: completed
Playwright: €10 discount and €85 total
VERIFIED GREEN
```

## Best-practice notes are embedded naturally

The running app includes an **Agent playbook** beside the checkout rather than hiding every lesson in workshop prose. The notes are also maintained in `docs/agent-best-practices.md`:

1. Inspect before editing.
2. Identify the authoritative source.
3. Plan the smallest coherent change.
4. Run tests before declaring success.
5. Keep a human review of the final diff.

## Copilot customization included

The context kit contains:

- `.github/copilot-instructions.md` — stable repository guidance;
- `.github/instructions/*.instructions.md` — pricing and React path-specific rules;
- `.github/prompts/fix-checkout-context.prompt.md` — repeatable diagnosis task;
- `.github/agents/brewcart-debugger.agent.md` — implementation specialist;
- `.github/agents/brewcart-reviewer.agent.md` — read-only reviewer;
- `.github/agents/brewcart-workshop-coach.agent.md` — teaching mode;
- `.github/skills/brewcart-release/SKILL.md` — release-verification procedure;
- `.github/hooks/production-safety.json` — defense-in-depth check for common direct production-publish commands.

The hook is deliberately tested but is not the security boundary. Production credentials remain outside the agent environment, and CI permissions and approval rules enforce deployment authority.

Copilot feature support and frontmatter vary among IDE, CLI, coding agent, and GitHub.com surfaces. Verify the selected client before presenting.

## Workshop files

- `Workshop-Script-Practical-30-Min.md` — timed presenter script
- `Practical-Demo-Runbook.md` — click-by-click execution and recovery
- `Participant-Worksheet.md` — exercise and answer key
- `Context-Card.md` — minimum authoritative context packet
- `demo/` — runnable React application and intentional red/verified green states

## Reset for the next presentation

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

## Key lesson

Copilot already knows React and percentage arithmetic. It does not automatically know BrewCart’s current business authority, rejected legacy rule, desired file scope, or proof of completion. Reliable work comes from the context and verification system around the model.

## References

- GitHub Copilot customization cheat sheet: https://docs.github.com/en/copilot/reference/customization-cheat-sheet
- Custom instructions: https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
- Prompt files: https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-files
- Custom agents: https://docs.github.com/en/copilot/reference/custom-agents-configuration
- Agent skills: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
- Hooks: https://docs.github.com/en/copilot/reference/hooks-reference
