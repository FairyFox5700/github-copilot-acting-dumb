import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EnterpriseBlueprint } from '../src/components/EnterpriseBlueprint';

describe('EnterpriseBlueprint', () => {
  it('shows the enterprise control stack and separates guidance from enforcement', () => {
    render(<EnterpriseBlueprint />);

    expect(screen.getByRole('heading', { name: 'Enterprise control stack' })).toBeInTheDocument();
    expect(screen.getByText('Context governance')).toBeInTheDocument();
    expect(screen.getByText('Repeatable workflows')).toBeInTheDocument();
    expect(screen.getByText('Least-privilege agency')).toBeInTheDocument();
    expect(screen.getByText('Governed capabilities')).toBeInTheDocument();
    expect(screen.getByText('Deterministic controls')).toBeInTheDocument();

    const enforcement = screen.getByTestId('enterprise-enforcement');
    expect(within(enforcement).getByText(/protected branches/i)).toBeInTheDocument();
    expect(within(enforcement).getByText(/environment approvals/i)).toBeInTheDocument();
    expect(within(enforcement).getByText(/production credentials/i)).toBeInTheDocument();
    expect(screen.getByText(/guidance shapes judgment; platform controls enforce policy/i)).toBeInTheDocument();
  });
});
