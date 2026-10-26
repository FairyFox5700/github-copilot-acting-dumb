export interface AgentNote {
  step: string;
  title: string;
  detail: string;
}

export const agentNotes: AgentNote[] = [
  {
    step: '01',
    title: 'Inspect before editing',
    detail: 'Open the target, its closest test, and the current business contract before proposing a change.',
  },
  {
    step: '02',
    title: 'Confirm authority',
    detail: 'Identify the authoritative source and label stale or conflicting examples instead of blending them.',
  },
  {
    step: '03',
    title: 'Plan the smallest change',
    detail: 'Name the files that should change, the files that must not change, and the behavior that proves success.',
  },
  {
    step: '04',
    title: 'Verify with evidence',
    detail: 'Run tests before declaring success, then lint, build, inspect the UI, and review the final diff.',
  },
  {
    step: '05',
    title: 'Keep a human decision',
    detail: 'The agent proposes. A human reviews the final diff, checks the evidence, and owns the merge decision.',
  },
];
