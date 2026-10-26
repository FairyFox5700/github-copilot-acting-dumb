import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AgentPlaybook } from '../src/components/AgentPlaybook';

describe('AgentPlaybook', () => {
  it('embeds the agent best-practice notes in the app', () => {
    render(<AgentPlaybook />);

    expect(screen.getByRole('heading', { name: 'Agent playbook' })).toBeInTheDocument();
    expect(screen.getByText(/inspect before editing/i)).toBeInTheDocument();
    expect(screen.getByText(/identify the authoritative source/i)).toBeInTheDocument();
    expect(screen.getByText(/run tests before declaring success/i)).toBeInTheDocument();
    expect(screen.getByText(/human reviews the final diff/i)).toBeInTheDocument();
  });
});
