import { afterEach, describe, expect, it, vi } from 'vitest'
import { getPriceQuote } from './quoteApi'

describe('getPriceQuote', () => {
  afterEach(() => vi.restoreAllMocks())

  it('posts the pricing context to the API', async () => {
    const response = {
      subtotal: 400,
      promotionCode: 'SAVE20',
      hasCategoryDiscount: false,
      discountApplied: 50,
      finalAmount: 350,
    }
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => response,
    })

    const result = await getPriceQuote({
      subtotal: 400,
      promotionCode: 'SAVE20',
      hasCategoryDiscount: false,
    })

    expect(fetchMock).toHaveBeenCalledWith('/api/pricing/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subtotal: 400,
        promotionCode: 'SAVE20',
        hasCategoryDiscount: false,
      }),
    })
    expect(result).toEqual(response)
  })

  it('reports the API validation message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ detail: 'Subtotal must be greater than zero.' }),
    })

    await expect(getPriceQuote({ subtotal: 0, promotionCode: '', hasCategoryDiscount: false }))
      .rejects.toThrow('Subtotal must be greater than zero.')
  })
})
