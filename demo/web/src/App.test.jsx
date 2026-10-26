import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => vi.restoreAllMocks())

it('calculates and explains a SAVE20 quote', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({
      subtotal: 400,
      promotionCode: 'SAVE20',
      hasCategoryDiscount: false,
      discountApplied: 50,
      finalAmount: 350,
    }),
  })

  render(<App />)
  fireEvent.change(screen.getByLabelText('Subtotal'), { target: { value: '400' } })
  fireEvent.change(screen.getByLabelText('Promotion code'), { target: { value: 'SAVE20' } })
  fireEvent.click(screen.getByRole('button', { name: 'Calculate price' }))

  await waitFor(() => expect(screen.getByText('€350.00')).toBeInTheDocument())
  expect(screen.getByText('You save €50.00')).toBeInTheDocument()
  expect(screen.getByText('SAVE20 is capped at €50.00.')).toBeInTheDocument()
})

it('explains why SAVE20 is not stacked', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({
      subtotal: 100,
      promotionCode: 'SAVE20',
      hasCategoryDiscount: true,
      discountApplied: 0,
      finalAmount: 100,
    }),
  })

  render(<App />)
  fireEvent.click(screen.getByLabelText('Category discount already applied'))
  fireEvent.click(screen.getByRole('button', { name: 'Calculate price' }))

  await waitFor(() => expect(screen.getByText('€100.00')).toBeInTheDocument())
  expect(screen.getByText('SAVE20 cannot be combined with a category discount.')).toBeInTheDocument()
})
