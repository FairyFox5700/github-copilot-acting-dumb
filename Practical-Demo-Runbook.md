# Practical demo runbook — BrewCart React

## Goal

Demonstrate that the same Copilot model produces more reliable work when the task has authority, scope, acceptance values, appropriate mode selection, and independent verification.

## IDE setup

1. Open the repository’s `demo` folder as the VS Code workspace root.
2. Run `npm ci` and `npx playwright install chromium`.
3. Pin Explorer, editor, Chat, and terminal.
4. Open:
   - `src/domain/discountPolicy.ts`
   - `tests/discountPolicy.test.ts`
   - `docs/pricing-rules.md`
   - `docs/legacy-promo-guide.md`
   - `docs/agent-best-practices.md`
5. Open Copilot Chat.

## Baseline

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

Recognizable result:

- focused beans-only test passes;
- mixed coffee + gift-card test fails;
- gift-card-only test fails;
- checkout UI test reports €22.50 instead of €10 and €72.50 instead of €85.

If complete verification passes, stop and reset. Do not present from an unknown state.

## Show the app

Run:

```bash
npm run dev
```

The page shows:

- the coffee order;
- weak-context total €72.50 while in baseline;
- the Agent playbook panel with five collaboration notes;
- the Enterprise control stack with five governance layers and explicit implemented-versus-recommended labels.

The playbook notes guide the individual interaction. The enterprise stack explains how an organization turns those habits into owned, versioned, least-privilege, auditable controls. Open `docs/enterprise-engineering-practices.md` for the detailed operating model and readiness checklist.

## Weak demo

1. Start a new Copilot chat.
2. Open only `src/domain/discountPolicy.ts`.
3. Paste `prompts/weak-prompt.txt`.
4. Ask Copilot to explain its proposed change before accepting anything.
5. Record whether it identifies:
   - the current pricing policy;
   - the obsolete guide;
   - the mixed-order €10 discount;
   - the €85 final total;
   - the prohibition on test weakening;
   - complete verification.
6. Reject or undo edits.

The model may fail, partly guess, or guess correctly. All three support the lesson: the request has no evidence chain, so the result is not reliably grounded.

## Engineered demo

1. Run `./scripts/Apply-Context.ps1`.
2. Confirm `.github` now contains instructions, a prompt, three agents, a release skill, and a hook.
3. Start a fresh chat so weak assumptions do not remain in history.
4. Select **Plan** mode or **BrewCart Debugger**.
5. Attach the target, tests, and current policy.
6. Invoke `.github/prompts/fix-checkout-context.prompt.md`.
7. Require this order: reproduce → classify sources → diagnose → propose file scope → edit → verify.
8. Accept only the change in `src/domain/discountPolicy.ts`.
9. Run `./scripts/Verify-Fixed.ps1`.

## Expected production change

Replace a non-delivery subtotal with a subtotal filtered by `promotion.eligibleCategories`. Keep integer cents and the exported function signature.

Do not change React components, tests, dependencies, docs, or public types.

## Specialized modes to demonstrate

- **Ask:** compare `pricing-rules.md` with `legacy-promo-guide.md`; no edits.
- **Plan:** return diagnosis, authority, file scope, and verification plan.
- **BrewCart Debugger:** implement the approved change.
- **BrewCart Reviewer:** perform read-only post-change review and return PASS or REVIEW.
- **BrewCart Workshop Coach:** explain the same flow through predictions and participant checkpoints.

## Production hook check

After applying context:

```bash
printf '%s' '{"toolName":"bash","toolArgs":{"command":"npm run build"}}' | node .github/hooks/block-production-deploy.mjs
printf '%s' '{"toolName":"bash","toolArgs":{"command":"vercel --prod"}}' | node .github/hooks/block-production-deploy.mjs
```

Expected: the tested direct production command is denied. Explain that shell command matching is defense in depth; missing production credentials, restricted identities, required CI, protected branches, and environment approval are the actual deployment boundary.

## Enterprise showcase

Scroll to **Enterprise control stack** and distinguish:

- **implemented here:** instructions, prompt file, release skill, restricted specialist roles, tested hook, read-only CI, and human review;
- **recommended for production:** protected branches, required status checks, protected environments, restricted deployment identities, secret scanning, audit retention, and rollback ownership;
- **deliberately absent:** MCP and plugins, because this scenario requires no external capability or distributable extension bundle.

Ask: “Who owns each layer, and what evidence proves it is active?” If the answer is only “the prompt says so,” the control is advisory rather than enforced.

## Troubleshooting

| Symptom | Cause | Recovery |
|---|---|---|
| Weak chat already knows the policy | Reused chat or open policy tabs | Start a new chat and close authoritative files |
| Weak prompt guesses correctly | Familiar pattern | Ask which artifact proves the rule |
| Copilot edits tests | Scope or authority not respected | Reject test changes; invoke BrewCart Debugger explicitly |
| Prompt or agent is not discovered | Client support or file location differs | Open the file explicitly and paste its body into Plan mode |
| Browser is unavailable | Playwright not installed | Run unit, lint, and build checks; use the known screenshot |
| Network/model latency blocks demo | Live dependency | Apply the known fix and continue verification |

## Complete recovery sequence

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
./scripts/Apply-Context.ps1
./scripts/Apply-KnownFix.ps1
./scripts/Verify-Fixed.ps1
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

Finish in the intentional red state for the next presentation.
