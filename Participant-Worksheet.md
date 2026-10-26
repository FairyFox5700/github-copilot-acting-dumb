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

## Enterprise extension: convert advice into controls

For LATTE15, name one example for each row:

| Question | Your answer |
|---|---|
| What guidance belongs in repository or path instructions? | |
| What repeated procedure belongs in a prompt file or skill? | |
| Which role should implement, and which independent role should review? | |
| Does the task genuinely require MCP or another external capability? | |
| Which non-negotiable checks belong in CI or platform policy? | |
| Who owns the merge and production decision? | |

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

## Enterprise extension answer

| Question | Recommended answer |
|---|---|
| Guidance | Universal test and security expectations in repository instructions; LATTE15 domain constraints in pricing path instructions |
| Repeatable procedure | A scoped LATTE15 diagnosis prompt; promote to a skill only if scripts, templates, or conditional steps are needed |
| Roles | A pricing implementer with edit/test tools; a separate read-only reviewer |
| External capability | None for the local policy change; do not add MCP without a demonstrated external workflow |
| Deterministic controls | Required test/lint/build checks, secret scanning, protected branch, protected production environment |
| Human decision | Named reviewer owns merge; named environment approver owns production release |

## Self-check

- [ ] Goal is observable.
- [ ] Target is explicit.
- [ ] Authority is named.
- [ ] Missing authority creates a stop condition.
- [ ] Constraints prevent convenient but invalid changes.
- [ ] Acceptance covers positive, negative, mixed, and regression cases.
- [ ] Verification includes execution and diff scope.
- [ ] Stale evidence is excluded or labeled.
