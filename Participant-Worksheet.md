# Participant worksheet

## Exercise: engineer the context, not the wording

**Time:** 4 minutes  
**Scenario:** BrewCart introduces `LATTE15`: 15% off drinks for loyalty members. Gift cards, beans, delivery, tips, and subscriptions are excluded. Money remains in integer cents.

Write a context packet for Copilot.

### 1. Goal

What observable outcome should the agent produce?

> 

### 2. Target

Which production file or symbol may change?

> 

### 3. Authority

Which source defines membership, eligible categories, and rounding? What should the agent do if it does not exist?

> 

### 4. Constraints

Name at least four prohibited changes.

> 

### 5. Acceptance criteria

Write at least four executable examples.

> 

### 6. Verification

Which commands and diff checks prove completion?

> 

### 7. Excluded context

Name one plausible but obsolete source that should not influence the answer.

> 

---

# Answer key

```text
Implement LATTE15 in src/domain/discountPolicy.ts.

Authority:
Use the approved LATTE15 policy and current pricing architecture. If no approved
policy exists, stop and request it; do not infer membership or eligibility from
buggy code or a campaign draft.

Constraints:
- keep pricing formulas out of React components;
- do not change exported APIs, tests, dependencies, or project configuration;
- do not weaken, skip, or delete assertions;
- use integer cents;
- preserve BEANS25 and unknown-code behavior.

Acceptance:
1. loyalty member, €10 drinks => €1.50 discount;
2. non-member, €10 drinks => €0 discount;
3. €50 gift card => €0 discount;
4. mixed drinks and beans discount drinks only;
5. delivery and tips remain unchanged;
6. existing BrewCart tests remain green.

Verification:
- focused LATTE15 test;
- npm run test:run;
- npm run lint;
- npm run build;
- npm run e2e;
- git diff --check and changed-file review.

Exclude superseded campaign drafts and legacy promotion notes.
```

## Self-check

- [ ] Goal is observable.
- [ ] Target is explicit.
- [ ] Authority is named.
- [ ] Missing authority creates a stop condition.
- [ ] Constraints prevent convenient but invalid changes.
- [ ] Acceptance covers positive, negative, mixed, and regression cases.
- [ ] Verification includes execution and diff scope.
- [ ] Stale evidence is excluded or labeled.
