import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CheckoutPage } from '../src/components/CheckoutPage';

describe('CheckoutPage', () => {
  it('shows the correct BEANS25 discount and final total', () => {
    render(<CheckoutPage />);

    expect(screen.getByText('House Blend beans × 2')).toBeInTheDocument();
    expect(screen.getByText('BrewCart gift card')).toBeInTheDocument();
    expect(screen.getByTestId('merchandise-subtotal')).toHaveTextContent('€90.00');
    expect(screen.getByTestId('promotion-discount')).toHaveTextContent('−€10.00');
    expect(screen.getByTestId('delivery')).toHaveTextContent('€5.00');
    expect(screen.getByTestId('order-total')).toHaveTextContent('€85.00');
  });
});
