export interface EnterprisePractice {
  number: string;
  title: string;
  mechanism: string;
  detail: string;
  evidence: string;
  status: string;
}

export const enterprisePractices: EnterprisePractice[] = [
  {
    number: '01',
    title: 'Context governance',
    mechanism: 'Instructions + AGENTS.md',
    detail: 'Keep architecture, approved commands, data boundaries, and definition of done versioned with the code. Scope local rules to the paths they govern.',
    evidence: 'Owner-reviewed guidance with explicit source authority',
    status: 'Live example',
  },
  {
    number: '02',
    title: 'Repeatable workflows',
    mechanism: 'Prompt files + skills',
    detail: 'Turn repeated engineering work into reviewable task contracts and procedures instead of relying on personal prompt craft.',
    evidence: 'Inputs, outputs, stop conditions, and verification commands',
    status: 'Live example',
  },
  {
    number: '03',
    title: 'Least-privilege agency',
    mechanism: 'Custom agents + subagents',
    detail: 'Separate implementation from review, restrict tools by role, and isolate context-heavy delegated work.',
    evidence: 'Named role, minimum tools, bounded scope, structured handoff',
    status: 'Live example',
  },
  {
    number: '04',
    title: 'Governed capabilities',
    mechanism: 'MCP + plugins',
    detail: 'Connect external systems only for a demonstrated workflow. Start read-only, scope credentials, approve writes, and version shared bundles.',
    evidence: 'Tool inventory, identity boundary, approvals, and audit trail',
    status: 'Pattern only — no MCP needed',
  },
  {
    number: '05',
    title: 'Deterministic controls',
    mechanism: 'Hooks + CI + platform policy',
    detail: 'Move non-negotiable checks outside model judgment. Treat hooks as defense in depth and platform controls as the security boundary.',
    evidence: 'Protected branches, environment approvals, secret scanning, and no production credentials in agent sessions',
    status: 'Live hook + CI; platform policy recommended',
  },
];
