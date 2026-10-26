# Working effectively with a coding agent

These notes also appear naturally in BrewCart’s **Agent playbook** panel. The UI keeps the teaching cues close to the checkout example; this document provides the reusable engineering detail.

## 1. Inspect before editing

Open the target, its nearest test, and the current business contract. Do not infer the requirement from buggy production code.

## 2. Identify authority

Classify sources before using them:

- **authoritative** — current business rule, interface, specification, or accepted test;
- **supporting** — useful current example or architecture note;
- **obsolete** — superseded implementation or document;
- **uncertain** — relevant-looking evidence whose status is unknown.

## 3. Plan the smallest coherent change

Name:

- the observable outcome;
- files expected to change;
- files prohibited from changing;
- assumptions and unanswered questions;
- deterministic acceptance criteria;
- commands that will prove completion.

## 4. Match the Copilot mode to the work

- **Ask** — investigate or explain without editing.
- **Plan** — establish diagnosis, scope, and verification before implementation.
- **Edit** — apply a bounded change to selected files.
- **Agent** — execute a coherent multi-file task with tools and verification.
- **Custom agent** — apply a specialized role, tool boundary, and workflow.
- **Coding agent** — delegate a complete issue and review the resulting pull request.

## 5. Verify independently

Run focused tests, the complete suite, lint, build, browser verification, and diff review. A fluent response or plausible diff is not evidence that the task is correct.

## 6. Keep the human decision

The agent proposes. A human checks authority, scope, test integrity, security, and command evidence before approving the merge.

## 7. Scale the workflow with enterprise controls

Individual habits are not an enterprise operating model. Add ownership and enforcement around the agent:

- version and review instruction files;
- use prompt files and skills for repeatable workflows;
- separate implementation from read-only review;
- restrict agent and MCP tools to least privilege;
- start external integrations read-only;
- enforce required tests, protected branches, environment approval, and restricted deployment identities outside the model;
- retain auditable evidence without logging secrets or customer data.

See `enterprise-engineering-practices.md` for the adoption sequence and readiness checklist.

## BrewCart context packet

```text
Goal:
BEANS25 must discount coffee and beans only.

Authority:
- docs/pricing-rules.md
- tests/discountPolicy.test.ts

Target:
- src/domain/discountPolicy.ts

Constraints:
- no pricing formulas in React components;
- no legacy helper;
- integer cents;
- do not weaken tests.

Acceptance:
- discount = €10.00;
- final total = €85.00.

Verification:
- npm run test:focused
- npm run test:run
- npm run lint
- npm run build
- npm run e2e
- git diff --check
```
