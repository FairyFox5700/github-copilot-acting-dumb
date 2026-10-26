import { expect, test } from '@playwright/test';

test('BEANS25 excludes the gift card and keeps agent notes visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Your coffee run' })).toBeVisible();
  await expect(page.getByTestId('promotion-discount')).toHaveText('−€10.00');
  await expect(page.getByTestId('order-total')).toHaveText('€85.00');
  await expect(page.getByRole('heading', { name: 'Agent playbook' })).toBeVisible();
  await expect(page.getByText('Inspect before editing')).toBeVisible();
});
