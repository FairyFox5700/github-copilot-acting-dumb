# Participant Worksheet

## Exercise: engineer the context, not the wording

**Time:** 4 minutes  
**Scenario:** Product introduces `VIP15`: 15% off for authenticated loyalty members. Gift cards are excluded. The final amount uses the repository’s existing currency-rounding rule.

Write a context packet for Copilot.

### 1. Task

What outcome should the agent produce?

> 

### 2. Target

Which production file or symbol may change?

> 

### 3. Authority

Which source defines membership, exclusions, and rounding? What should the agent do if that source does not exist?

> 

### 4. Constraints

Name at least three prohibited changes.

> 

### 5. Acceptance criteria

Write at least four executable examples.

> 

### 6. Verification

Which commands and diff checks prove completion?

> 

### 7. Excluded context

Name one plausible but non-authoritative item that should be excluded or labeled.

> 

---

# Answer key

## Strong packet

```text
Implement VIP15 in src/Commerce.Pricing/PricingCalculator.cs.

Authority: use the approved VIP promotion policy. If no approved policy exists,
stop and ask for it; do not infer membership or gift-card behavior from existing code.

Constraints:
- production change only in PricingCalculator.cs;
- do not change public signatures, tests, dependencies, or project files;
- use decimal and the repository currency-rounding convention;
- preserve existing SAVE20 and unknown-code behavior.

Acceptance criteria:
1. authenticated loyalty member, EUR 100 eligible goods => EUR 85;
2. unauthenticated customer, EUR 100 => EUR 100;
3. EUR 100 gift card => EUR 100;
4. mixed basket discounts only eligible non-gift-card subtotal;
5. midpoint result rounds away from zero to two decimals;
6. existing pricing specifications remain green.

Verification:
- run focused VIP15 specifications;
- run the full pricing specification project;
- build CommercePricing.slnx;
- show changed files and summarize evidence used.

Exclude rejected launch drafts and stale campaign notes.
```

## Why this is stronger

- It distinguishes authority from implementation.
- It gives the agent permission to stop when required policy is missing.
- It prevents the easiest failure mode: changing tests or widening scope.
- It turns “done” into executable evidence.

## Self-check

- [ ] Target is explicit.
- [ ] Authority is named.
- [ ] Missing authority has a stop condition.
- [ ] Constraints prohibit convenient but invalid changes.
- [ ] Acceptance criteria cover positive, negative, edge, and regression cases.
- [ ] Verification includes both execution and diff scope.
- [ ] Stale evidence is excluded or labeled.
