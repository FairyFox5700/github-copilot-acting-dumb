# Enterprise engineering practices for GitHub Copilot

This companion turns BrewCart from a prompt-engineering demo into an enterprise operating model. It is adapted from `GitHub Copilot Steering Guide.md` and keeps one rule visible throughout:

> Put information in the narrowest mechanism that reliably activates when needed. Use model-readable guidance for judgment; use deterministic automation and platform policy for guarantees.

## What the repository demonstrates—and what it does not

| Layer | BrewCart evidence | Enterprise production control |
|---|---|---|
| Context governance | `.github/copilot-instructions.md` and path-specific instructions | owners, review cadence, conflict checks, support-matrix validation |
| Repeatable workflows | prompt file and `brewcart-release` skill | versioned templates, stop conditions, evidence retention |
| Least-privilege agency | debugger, reviewer, and coach agents | role-specific tools, separation of implementation and approval |
| Governed capabilities | documented MCP and plugin pattern | read-only-first identities, scoped credentials, write approval, audit |
| Deterministic controls | tested pre-tool hook and pinned CI | branch protection, required checks, environment approvals, secret scanning, restricted deployment identity |

BrewCart intentionally does **not** connect an MCP server or install a plugin. No external system is required for the checkout defect, and unused capabilities would increase context cost and attack surface without improving the workflow.

The command-matching hook is also intentionally presented as defense in depth. It demonstrates deterministic lifecycle automation, but it is not the production security boundary. Production authority belongs to credentials, identities, CI permissions, protected environments, and human approval rules.

## 1. Govern context as versioned engineering policy

### Repository-wide instructions

Use `.github/copilot-instructions.md` only for facts that apply to nearly every task:

- supported stack and versions;
- architecture boundaries;
- approved build, test, lint, and local-run commands;
- universal security and data-handling rules;
- definition of done.

Assign a code owner to instruction files. Review changes like code because they can influence every agent interaction in the repository.

### Path-specific instructions

Use `.github/instructions/*.instructions.md` for rules that are always relevant only within a narrow path. This avoids loading React guidance into domain work or infrastructure policy into UI tasks.

Enterprise review questions:

- Is `applyTo` narrow enough?
- Does the file name an authoritative standard?
- Does it conflict with repository or organization guidance?
- Has it been tested on every supported Copilot surface?

### Portable guidance

Use `AGENTS.md` only when guidance must travel across compatible agent products. Avoid duplicating the same rule in both `AGENTS.md` and Copilot-specific instructions unless ownership and conflict handling are explicit.

## 2. Standardize workflows, not personal prompting styles

### Prompt files

Use prompt files for deliberate, parameterized tasks such as designing an API, drafting an ADR, or investigating a defect. A production prompt file should define:

1. objective and input;
2. authoritative sources;
3. allowed and prohibited scope;
4. required output format;
5. stop conditions;
6. verification evidence.

### Skills

Use a skill when the workflow is multi-step or needs scripts, templates, references, or conditional branches. The skill description is a routing contract: it should say exactly when the workflow applies and what outcome it produces.

Enterprise controls:

- keep scripts non-destructive by default;
- make publishing and production changes explicit approval points;
- pin or validate external dependencies;
- retain an evidence summary of commands and results;
- version the skill with the repository or controlled plugin release.

## 3. Separate roles and minimize tools

Custom agents define who performs recurring work and which tools that role can use. Subagents provide isolated execution contexts for delegated tasks.

Recommended separation:

| Role | Minimum capability | Must not do |
|---|---|---|
| Planner | read and search | edit, merge, or deploy |
| Implementer | read, edit, narrow test execution | approve its own change or deploy |
| Reviewer | read, search, tests | modify the reviewed files |
| Release verifier | read and verification commands | publish without explicit approval |
| Production operator | approved deployment workflow only | receive broad repository or personal credentials |

Do not treat a second agent as independent evidence when it receives the implementer’s reasoning and assumptions. Give the reviewer the task contract, diff, tests, and policy—not a persuasive narrative from the author.

Delegation contracts should state objective, scope, prohibited actions, result format, and verification requirements. Parallelize only independent work.

## 4. Govern MCP and plugin capabilities

MCP adds external capability, not operating policy. Before enabling a server, record:

- the business workflow it enables;
- tool inventory and read/write classification;
- data classification and allowed destinations;
- identity, credential scope, and rotation owner;
- approval requirements for writes;
- timeouts, rate limits, and failure behavior;
- audit events and retention;
- prompt-injection and untrusted-content handling;
- revocation and incident procedure.

Start read-only. Expose only required tools to the agents that need them. Keep production credentials outside general coding-agent sessions.

Use a plugin only when a coherent bundle of instructions, skills, agents, hooks, and integrations has a reusable audience and release lifecycle. Treat plugin installation like dependency installation: verify publisher, review contents, pin versions where supported, test compatibility, and maintain rollback guidance.

## 5. Move guarantees outside model judgment

Instructions explain intent; they cannot guarantee compliance. Enterprise guarantees require layered controls.

### Repository automation

- fast, fail-closed hooks for well-defined lifecycle checks;
- required CI for tests, lint, build, dependency audit, and secret scanning;
- immutable action or dependency references where practical;
- minimal workflow-token permissions;
- evidence that the checked commit is the commit being merged or deployed.

### Platform controls

- protected default branches;
- required pull requests and independent review;
- required status checks;
- protected deployment environments;
- environment-specific identities and secrets;
- approval for production deployment;
- signed artifacts or provenance where required;
- audit logs and retention aligned with policy.

### Application and cloud controls

- least-privilege runtime identity;
- network and data boundaries;
- policy-as-code for infrastructure;
- observability without secrets or regulated data;
- rollback and incident-response paths;
- no standing production credentials in developer or agent environments.

## 6. Preserve human accountability

A human remains accountable for:

- accepting the requirement and authoritative source;
- approving exceptions and risky scope;
- reviewing security, data, and compatibility impact;
- approving the final diff;
- authorizing merge and production release.

Human-in-the-loop is not a vague instruction to “review carefully.” It should be a named decision at a protected boundary, supported by evidence and an audit record.

## 7. Measure the system, not just model output

Track operational outcomes such as:

- change failure and rollback rate;
- escaped defects and security findings;
- test-integrity violations;
- scope drift and unrelated-file changes;
- review rework;
- time to verified change;
- denied high-risk tool calls;
- MCP read/write usage and approval outcomes;
- incidents involving secrets or sensitive data;
- instruction, skill, and plugin adoption by supported surface.

Do not optimize only for generated lines, acceptance rate, or task speed. A faster unverified change is not an enterprise improvement.

## 8. Adoption sequence

1. **Baseline:** inventory Copilot surfaces, repositories, data classes, identities, and current controls.
2. **Context:** add concise repository instructions and scoped path rules with owners.
3. **Workflow:** convert repeated high-value tasks into prompt files or skills.
4. **Roles:** add specialists only where stable separation or tool restriction is useful.
5. **Evidence:** standardize focused tests, full verification, diff review, and result reporting.
6. **Enforcement:** add CI, branch protection, protected environments, and credential boundaries.
7. **Capability:** add MCP read-only for a demonstrated use case, then govern writes.
8. **Distribution:** package stable cross-repository capabilities as versioned plugins.
9. **Operations:** measure outcomes, audit usage, rehearse revocation, and review controls regularly.

## 9. Enterprise readiness checklist

### Ownership and policy

- [ ] Every instruction, prompt, skill, agent, hook, MCP server, and plugin has an owner.
- [ ] Authoritative sources and superseded material are labeled.
- [ ] Conflicting instruction layers are removed rather than relying on precedence.
- [ ] Supported Copilot surfaces are documented and tested.

### Identity and data

- [ ] Agent identities are separate from personal and production identities.
- [ ] Tokens are short-lived and least privilege where the platform supports it.
- [ ] Production credentials are unavailable to general coding sessions.
- [ ] Sensitive inputs, outputs, and logs have defined handling and retention.
- [ ] External tools have explicit data-boundary approval.

### Engineering controls

- [ ] Changes require tests appropriate to the risk.
- [ ] Test weakening, skipped assertions, and unrelated scope are reviewed.
- [ ] CI permissions are minimal and dependencies are pinned or controlled.
- [ ] Protected branches and required checks prevent direct unverified merges.
- [ ] Production environments require explicit approval and a restricted identity.
- [ ] Rollback and incident response are documented and rehearsable.

### Agent operations

- [ ] Each custom agent has the minimum tools required.
- [ ] Implementers cannot approve their own work.
- [ ] Subagent contracts state scope, prohibited actions, and return format.
- [ ] MCP begins read-only and writes require an approval policy.
- [ ] Hooks validate input, avoid secret logging, fail safely, and have timeouts.
- [ ] Completion reports distinguish executed evidence from assumptions.

## Workshop message

BrewCart demonstrates the complete progression in one small system:

1. a plausible but wrong result;
2. missing authority and noisy context;
3. scoped, versioned guidance;
4. a repeatable diagnosis and implementation workflow;
5. specialist roles with independent review;
6. deterministic tests and a safety hook;
7. CI and platform controls as the enterprise boundary;
8. a human decision before merge or production.

The enterprise lesson is not “add every Copilot feature.” It is **choose the smallest mechanism for the requirement, restrict capability, prove the result independently, and enforce non-negotiable policy outside the model.**

## References

- GitHub Copilot customization cheat sheet: https://docs.github.com/en/copilot/reference/customization-cheat-sheet
- Custom instructions: https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
- Prompt files: https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-files
- Custom agents: https://docs.github.com/en/copilot/concepts/customizations/custom-agents
- Agent skills: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
- Hooks: https://docs.github.com/en/copilot/concepts/agents/hooks
- MCP: https://docs.github.com/en/copilot/concepts/customizations/mcp
- Plugins: https://docs.github.com/en/copilot/concepts/agents/about-plugins
