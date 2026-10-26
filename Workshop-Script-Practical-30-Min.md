# From “Copilot Is Dumb” to a Reliable Agent

**Audience:** Software engineers using GitHub Copilot  
**Duration:** 30 minutes  
**Application:** BrewCart, a React and TypeScript coffee-shop checkout
**Outcome:** Participants can turn a vague defect request into an authoritative, scoped, mode-aware, and independently verified agent workflow.

## Presenter preflight — outside the clock

1. Open the repository’s `demo` folder in VS Code.
2. Run `npm ci` and `npx playwright install chromium`.
3. Open `src/domain/discountPolicy.ts`, the pricing tests, current policy, legacy guide, and agent notes.
4. Reset and verify the intentional red state:

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

5. Confirm the focused beans-only test passes and complete verification fails.
6. Keep the known-fix commands ready.

## Run of show

| Time | Segment | Observable result |
|---|---|---|
| 00:00–02:00 | Reveal the €12.50 loss | Wrong €22.50 discount is visible |
| 02:00–05:00 | Teach the context packet | Target, authority, constraints, proof |
| 05:00–08:00 | Map authority and stale evidence | Current policy beats legacy guide |
| 08:00–11:00 | Run the weak request | Copilot must guess the contract |
| 11:00–15:00 | Apply scoped instructions | Durable rules move to proper scope |
| 15:00–19:00 | Use prompt file in Plan mode | Diagnosis precedes editing |
| 19:00–23:00 | Implement with specialist agent | One-file domain fix |
| 23:00–26:00 | Verify independently | Tests, lint, build, browser, diff |
| 26:00–28:00 | Show hook and review agent | Guidance differs from enforcement |
| 28:00–30:00 | Participant decision and recap | Correct mode and mechanism selected |

**Total: 30 minutes.**

## 00:00–02:00 — Reveal the loss

**Say:**

> “A customer bought €40 of coffee beans and a €50 gift card. BEANS25 should save €10. The checkout saved €22.50. The TypeScript compiled, the visible test passed, and the shop lost €12.50.”

Open `src/domain/discountPolicy.ts` and show that the baseline discounts every non-delivery row.

Run:

```bash
npm run test:focused
npm run test:run
```

**Ask:**

> “If the focused test is green, what evidence says the business behavior is correct?”

**Transition:**

> “Copilot knows percentages. It does not automatically know what this coffee shop is allowed to discount.”

## 02:00–05:00 — Teach the minimum context packet

Open `../Context-Card.md`.

**Say:**

> “Reliable agent work needs a goal, target, authority, constraints, acceptance values, excluded stale evidence, and verification. More text is not the goal; decision-relevant context is.”

Point to:

```text
Goal + target + authority + constraints + acceptance + exclusion + verification
```

Ask participants which element their last disappointing request omitted.

## 05:00–08:00 — Map authority

Classify:

1. `discountPolicy.ts` — target, not authority.
2. `discountPolicy.test.ts` — executable acceptance criteria.
3. `pricing-rules.md` — current authority.
4. `legacy-promo-guide.md` — obsolete but relevant-looking evidence.
5. `agent-best-practices.md` — reusable collaboration guidance.

**Say:**

> “The implementation proves what code does, not what the business wants. Relevant is not the same as authoritative.”

## 08:00–11:00 — Run the weak request

Start a fresh Agent-mode chat, open only the target, and paste:

```text
Fix the BEANS25 discount bug in `src/domain/discountPolicy.ts`.
```

Ask Copilot to explain its plan before editing. Do not depend on one exact wrong answer.

**Say:**

> “A correct guess is still a guess. Which repository artifact proves the proposed behavior?”

Reject or undo edits.

## 11:00–15:00 — Apply scoped instructions

Run:

```powershell
./scripts/Apply-Context.ps1
```

Open:

- `.github/copilot-instructions.md` — stable React/TypeScript rules;
- `.github/instructions/pricing.instructions.md` — domain authority and constraints;
- `.github/instructions/react-ui.instructions.md` — presentation boundaries.

**Say:**

> “Keep shared facts small and always available. Scope specialized rules to the files they govern. Put deterministic safety outside the model’s discretion.”

Show the Agent playbook panel in the running app. Explain that short notes are embedded where the participant uses them, while detailed guidance lives in a maintained document.

## 15:00–19:00 — Plan before editing

Start a fresh chat. Use Plan mode or select BrewCart Debugger. Attach the target, test, and current policy. Invoke:

```text
.github/prompts/fix-checkout-context.prompt.md
```

Require:

1. reproduction;
2. source classification;
3. first incorrect decision;
4. proposed file scope;
5. verification plan.

Expected scope: `src/domain/discountPolicy.ts` only.

## 19:00–23:00 — Implement with BrewCart Debugger

Approve the plan and switch to Agent mode with BrewCart Debugger.

Expected change:

```ts
const eligibleSubtotalCents = items
  .filter((item) => promotion.eligibleCategories.includes(item.category))
  .reduce((subtotal, item) => subtotal + item.unitPriceCents * item.quantity, 0);
```

Reject React-component calculations, test weakening, dependency changes, or unrelated formatting.

Fallback:

```powershell
./scripts/Apply-KnownFix.ps1
```

## 23:00–26:00 — Verify independently

Run:

```powershell
./scripts/Verify-Fixed.ps1
```

Expected:

- all Vitest tests pass;
- ESLint reports no errors;
- TypeScript and Vite build;
- Playwright sees €10 discount and €85 total;
- the final diff stays within the approved scope.

**Say:**

> “Generation proposes a change. The verification ladder earns the right to call it correct.”

## 26:00–28:00 — Separate guidance, workflow, and enforcement

Show:

- prompt file — repeatable investigation;
- Debugger agent — implementation specialist;
- Reviewer agent — read-only verdict;
- release skill — reusable procedure;
- production hook — defense-in-depth denial for tested direct-publish command forms.

Test the hook:

```bash
printf '%s' '{"toolName":"bash","toolArgs":{"command":"vercel --prod"}}' |
  node .github/hooks/block-production-deploy.mjs
```

Expected: `permissionDecision` is `deny`.

## 28:00–30:00 — Choose the right mechanism

Ask participants to place each requirement:

| Requirement | Mechanism |
|---|---|
| React + strict TypeScript | Repository instruction |
| Pricing outside components | Path instruction + tests |
| Diagnose before editing | Prompt file in Ask/Plan mode |
| Specialist implementation | BrewCart Debugger agent |
| Read-only post-change check | BrewCart Reviewer agent |
| Repeatable release verification | Skill |
| Never publish directly | Hook + permissions/CI approval |
| Current issue and CI state | Narrow tools or MCP |

**Closing line:**

> “Copilot was not missing JavaScript knowledge. It was missing the coffee shop’s authority, the correct workflow, and independent proof.”

## Recovery

Restore the presentation baseline:

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

If model behavior diverges, use the known fix and preserve the lesson through deterministic verification.
