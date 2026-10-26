import { describe, expect, it } from 'vitest';
import { calculatePromotionDiscount } from '../src/domain/discountPolicy';
import type { CartItem, Promotion } from '../src/types/cart';

const beans: CartItem = {
  id: 'beans-house',
  name: 'House Blend beans',
  category: 'beans',
  unitPriceCents: 2_000,
  quantity: 2,
};

const giftCard: CartItem = {
  id: 'gift-card',
  name: 'BrewCart gift card',
  category: 'gift-card',
  unitPriceCents: 5_000,
  quantity: 1,
};

const delivery: CartItem = {
  id: 'delivery',
  name: 'Delivery',
  category: 'delivery',
  unitPriceCents: 500,
  quantity: 1,
};

const beans25: Promotion = {
  code: 'BEANS25',
  percentage: 0.25,
  eligibleCategories: ['coffee', 'beans'],
};

describe('calculatePromotionDiscount', () => {
  it('discounts an eligible beans order', () => {
    expect(calculatePromotionDiscount([beans], beans25)).toBe(1_000);
  });

  it('does not discount a gift card mixed with eligible coffee', () => {
    expect(calculatePromotionDiscount([beans, giftCard], beans25)).toBe(1_000);
  });

  it('does not discount a gift-card-only order', () => {
    expect(calculatePromotionDiscount([giftCard], beans25)).toBe(0);
  });

  it('does not discount delivery', () => {
    expect(calculatePromotionDiscount([delivery], beans25)).toBe(0);
  });
});
