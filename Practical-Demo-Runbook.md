# Practical Demo Runbook

## Goal

Demonstrate that GitHub Copilot’s apparent quality changes when the surrounding context system changes—even with the same model and target file.

## IDE setup

1. In VS Code, choose **File → Open Folder**.
2. Select `Copilot Context Engineering Workshop - Dumb to Deliberate/demo`.
3. Open **View → Terminal**.
4. Open **View → Chat** and select **Agent** mode.
5. Pin the Explorer, Chat, editor, and terminal so the audience can see all four.

## Baseline state

PowerShell:

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

Bash:

```bash
./scripts/reset-demo.sh
./scripts/verify-baseline.sh
```

Recognizable result: three failed specifications. If the baseline passes, stop and reset again; do not present from an unknown state.

## Weak demo

1. Start a new chat.
2. Open only `src/Commerce.Pricing/PricingCalculator.cs`.
3. Paste `prompts/weak-prompt.txt`.
4. Ask for explanation before edits.
5. Record which items the response omits:
   - EUR 50 cap;
   - category-discount non-stacking;
   - exact rounding;
   - authoritative source;
   - verification commands;
   - change boundary.
6. Reject/undo edits.

### Interpretation

The model may fail, guess partly, or guess correctly. All three support the lesson: the request provides no evidence chain, so the answer is not reliably grounded.

## Engineered demo

1. Run `./scripts/Apply-Context.ps1`.
2. Confirm these files appear:
   - `.github/copilot-instructions.md`
   - `.github/instructions/pricing.instructions.md`
   - `.github/instructions/react.instructions.md`
   - `.github/prompts/fix-pricing.prompt.md`
3. Start a fresh chat.
4. Open or attach the target, policy, and specs.
5. Paste `prompts/engineered-prompt.txt`.
6. Require diagnosis first.
7. Inspect the diff before accepting.
8. Accept only a production change in `PricingCalculator.cs`; the API and React client are real consumers, not targets.
9. Run `./scripts/Verify-Fixed.ps1`.

## Expected diff

- Add category-discount early return.
- Cap the discount with `Math.Min(..., 50m)`.
- Round the final amount with `MidpointRounding.AwayFromZero`.
- Do not change tests, project files, method signature, or dependencies.

## Optional full-stack reveal

Run the API and Vite client in two terminals:

```powershell
dotnet run --project src/Commerce.Api --urls http://localhost:5055
npm ci --prefix web
npm run dev --prefix web
```

Price a €400 basket with `SAVE20` before and after the fix. The visible result changes from the buggy €320.00 to the contract-aligned €350.00 without editing the API or React client. This demonstrates that the domain contract, rather than duplicated UI logic, owns the decision.

## Troubleshooting

| Symptom | Cause | Recovery |
|---|---|---|
| Copilot already knows the policy during weak demo | Reused chat or open files leaked context | Start a fresh chat; close policy/spec tabs |
| Weak demo produces the exact correct fix | Model guessed from familiar patterns | Ask which artifact proves the rules; emphasize reliability, not failure theater |
| Copilot edits tests | Scope boundary was ignored | Reject test edits; restate “production-only”; use known fix if time-boxed |
| Copilot changes multiple files | Prompt or tool scope is too broad | Reject diff; attach exact target and constraints |
| Agent cannot find instructions | Files not applied or client support differs | Run `Apply-Context.ps1`; open instruction files explicitly |
| Network/model latency blocks demo | Live dependency | Run `Apply-KnownFix.ps1` and continue verification |
| Build cannot find SDK | .NET 10 missing | Use prepared output screenshots or install the correct SDK before delivery |
| Bash scripts fail on Windows paths | Not running Git Bash | Use the PowerShell scripts |

## Deterministic recovery

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
./scripts/Apply-Context.ps1
./scripts/Apply-KnownFix.ps1
./scripts/Verify-Fixed.ps1
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

The final command must return the workshop to the visible red starting state.
