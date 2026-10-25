# From “Copilot Is Dumb” to a Reliable Agent

**Audience:** Software engineers using GitHub Copilot  
**Duration:** 30 minutes  
**Observable outcome:** Participants can build and apply a six-part context packet that turns an ambiguous coding request into a contract-aligned, verified change.  
**Demo scenario:** A .NET e-commerce promotion calculator passes the obvious case but violates cap, stacking, and rounding rules.

## Presenter preflight — outside the clock

1. Open the folder `Copilot Context Engineering Workshop - Dumb to Deliberate/demo` in VS Code.
2. Open these tabs in order:
   - `src/Commerce.Pricing/PricingCalculator.cs`
   - `tests/Commerce.Pricing.Specs/Program.cs`
   - `docs/promotion-policy.md`
   - `docs/stale-promotion-notes.md`
   - `prompts/weak-prompt.txt`
   - `prompts/engineered-prompt.txt`
3. Open Copilot Chat in **Agent** mode.
4. Run:

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

5. Confirm three failures: cap, non-stacking, and rounding.
6. Start a fresh Copilot chat for the weak demo.
7. Keep the fallback command ready:

```powershell
./scripts/Apply-KnownFix.ps1
./scripts/Verify-Fixed.ps1
```

## Run of show

| Time | Segment | Observable result |
|---|---|---|
| 00:00–02:00 | Reproduce and establish stakes | Three visible failures |
| 02:00–04:00 | Minimal mental model | “Context is a dependency graph” |
| 04:00–07:00 | Evidence/authority map | Contract, target, tests, and stale note classified |
| 07:00–10:00 | Weak Copilot attempt | Missing authority and verification become visible |
| 10:00–18:00 | Context-engineered attempt | Minimal contract-aligned production change |
| 18:00–22:00 | Verification ladder | Specs pass, build passes, diff scope is narrow |
| 22:00–26:00 | Participant exercise | Teams write a six-part context packet |
| 26:00–28:00 | Durable guidance | Rules placed in repository/path scope |
| 28:00–30:00 | Recovery and recap | Reset demonstrated; takeaway stated |

**Total: 30 minutes.**

## 00:00–02:00 — Reproduce the visible failure

**Say:**

> “We often say Copilot is dumb when it gives a plausible but wrong change. For the next 30 minutes, we will treat that as an engineering diagnosis. The model is not missing clever wording—it is missing a reliable information system.”

**Presenter does:**

- In the VS Code terminal, from `demo`, run:

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

**Expected:**

```text
FAILED: 3 pricing specification(s)
 - SAVE20 discount is capped at EUR 50: expected 350, got 320.00
 - SAVE20 does not stack with category discount: expected 100, got 80.00
 - currency result rounds away from zero: expected 79.99, got 79.9920
EXPECTED RED: baseline exposes the pricing defect.
```

**Ask:**

> “If I only tell an agent ‘fix the discount bug,’ which of these business rules can it know with authority?”

**Transition:**

> “Before prompting, we need a model for the evidence the agent requires.”

## 02:00–04:00 — Teach one mental model

**Say:**

> “Context engineering is dependency injection for reasoning. The agent needs the target to change, an authoritative contract, constraints, executable acceptance criteria, and verification. Anything stale must be excluded or labeled. More context is not the goal; decision-relevant context is.”

**Presenter does:**

- Open `../Context-Card.md`.
- Point to the formula:

```text
Task + target + authority + constraints + acceptance criteria + verification
```

**Participants do:**

> “Write down which element your last disappointing Copilot request omitted.”

**Transition:**

> “Now we will classify the repository before asking the model to act.”

## 04:00–07:00 — Map evidence and authority

**Presenter does:**

Open the four files and label them aloud:

1. `PricingCalculator.cs` — **target**, not authority.
2. `Program.cs` — **executable acceptance criteria**.
3. `promotion-policy.md` — **authoritative contract**.
4. `stale-promotion-notes.md` — **conflicting historical noise**.

**Say:**

> “The current implementation is evidence of what the code does, not proof of what the business wants. Tests are executable claims. The policy is the authority. The stale note is dangerous precisely because it is relevant-looking.”

**Ask:**

> “Would attaching the whole repository improve this task?”

Expected answer: **No.** It would add undifferentiated context and conflicting evidence.

**Transition:**

> “Let’s deliberately omit this structure and see what a weak request asks Copilot to guess.”

## 07:00–10:00 — Run the weak approach

**Presenter does:**

1. Start a fresh Copilot chat.
2. Open only `PricingCalculator.cs`.
3. Paste the exact contents of `prompts/weak-prompt.txt`:

```text
Fix the discount bug in `PricingCalculator.cs`.
```

4. Ask Copilot to explain its proposed change before accepting anything.

**Say:**

> “The weak prompt does not identify the failing behavior, the policy, the stale evidence, the scope boundary, or the proof of completion. Copilot must infer the specification from the buggy code. A fluent guess is still a guess.”

**Expected screen state:**

Any response that lacks one or more of cap, non-stacking, exact rounding, narrow scope, and verification demonstrates the lesson. Do not depend on one exact wrong answer.

**If Copilot happens to guess correctly:**

Say:

> “It produced a plausible answer, but it cannot show why that answer is authoritative. Correct by luck is not reliable engineering.”

Then ask:

```text
Which repository artifact proves those business rules are correct?
```

The weak chat has not been given one.

**Transition:**

> “We will now change the information architecture, not the model.”

## 10:00–18:00 — Run the engineered approach

**Presenter does:**

1. Reject or undo any weak-demo edits.
2. Apply durable instructions:

```powershell
./scripts/Apply-Context.ps1
```

3. Open `.github/copilot-instructions.md` and `.github/instructions/pricing.instructions.md`.
4. Explain the split:
   - repository instructions: authority, scope, commands;
   - path instructions: money and pricing conventions.
5. Start a **fresh** Copilot chat so the weak conversation does not contaminate the comparison.
6. Open/attach:
   - `src/Commerce.Pricing/PricingCalculator.cs`
   - `tests/Commerce.Pricing.Specs/Program.cs`
   - `docs/promotion-policy.md`
7. Paste `prompts/engineered-prompt.txt`.
8. Require diagnosis before edit.
9. Review the proposed diff. Accept only a change in `PricingCalculator.cs`.

**Say:**

> “Notice that the prompt names not only what to include, but what to exclude. It also separates diagnosis, change, and proof. The agent now has an authority chain and a stopping condition.”

**Expected minimal implementation:**

```csharp
if (!string.Equals(promotionCode, "SAVE20", StringComparison.OrdinalIgnoreCase)
    || hasCategoryDiscount)
{
    return subtotal;
}

var discount = Math.Min(subtotal * 0.20m, 50m);
var finalAmount = subtotal - discount;
return Math.Round(finalAmount, 2, MidpointRounding.AwayFromZero);
```

**If the model diverges:**

1. Do not improvise.
2. Run:

```powershell
./scripts/Apply-KnownFix.ps1
```

3. Continue to verification and explain that deterministic fallback preserves the learning objective.

**Transition:**

> “A better-looking diff is not the result. Executable evidence is the result.”

## 18:00–22:00 — Run the verification ladder

**Presenter does:**

```powershell
./scripts/Verify-Fixed.ps1
```

**Expected:**

```text
[1/3] Focused pricing specifications
PASS: 5 pricing specifications

[2/3] Full solution build
Build succeeded.

[3/3] Changed-file scope
src/Commerce.Pricing/PricingCalculator.cs

VERIFIED GREEN: specifications pass and solution builds.
```

**Say:**

> “The verification ladder catches two common agent failures: changing tests to make the problem disappear and broadening the diff beyond the task.”

**Ask:**

> “What would you add in production?”

Expected answers: real unit-test framework, full test suite, static analysis, security checks, CI, and review.

**Transition:**

> “Now you will design the context packet yourselves.”

## 22:00–26:00 — Participant exercise

**Participants do:**

Open `Participant-Worksheet.md` and spend three minutes writing a context packet for the variant:

> “A `VIP15` promotion gives 15% off, is limited to authenticated loyalty members, and must not apply to gift cards.”

They must provide:

1. Task.
2. Target.
3. Authority.
4. Constraints.
5. Acceptance criteria.
6. Verification.
7. One excluded context item.

At minute 25, reveal the answer key.

**Say:**

> “A good packet makes uncertainty explicit. If the authoritative policy is missing, the correct agent action is to ask or stop—not invent.”

**Transition:**

> “One-off context solves today’s task. Durable context prevents tomorrow’s repetition.”

## 26:00–28:00 — Place durable guidance correctly

**Presenter does:**

Show:

- `.github/copilot-instructions.md` for repository-wide facts and commands.
- `.github/instructions/pricing.instructions.md` for C# pricing files.
- `prompts/engineered-prompt.txt` for the one-off task contract.

**Say:**

> “Do not put the whole task in always-on instructions. Persist stable facts and conventions. Keep case-specific evidence in the prompt. If a multi-step workflow repeats, promote it to a skill. If a check must always run, use a hook or CI—not prose.”

**Transition:**

> “Let’s prove that this workshop is recoverable, then close with one sentence.”

## 28:00–30:00 — Recovery and recap

**Presenter does:**

```powershell
./scripts/Reset-Demo.ps1
./scripts/Verify-Baseline.ps1
```

**Expected:** the three intentional failures return.

**Say:**

> “The takeaway: when Copilot looks dumb, inspect the context contract before changing the model or writing a longer prompt. Give it selected authority, scope, and executable proof. Better context is not more text; it is better evidence architecture.”

**Final audience question:**

> “Which one repeated task in your team should become a context packet this week?”

## Verification ladder

1. Focused specification runner.
2. Full solution build.
3. Changed-file scope.
4. Context/source audit.
5. Reset to the intentional baseline.

## Presenter appendix

### Exact weak input

`demo/prompts/weak-prompt.txt`

### Exact engineered input

`demo/prompts/engineered-prompt.txt`

### Known-good recovery

```powershell
./scripts/Apply-KnownFix.ps1
./scripts/Verify-Fixed.ps1
```

### Fresh-chat reset

Always create a new Copilot chat between weak and engineered attempts. Otherwise prior answers become hidden context and invalidate the comparison.

### Take-home checklist

- Did I name the target?
- Did I identify the authority?
- Did I exclude stale or conflicting evidence?
- Did I state constraints and forbidden changes?
- Did I provide executable acceptance criteria?
- Did I require verification and a scope report?
