import type { CartItem, Promotion } from '../types/cart';

export function calculatePromotionDiscount(
  items: CartItem[],
  promotion: Promotion,
): number {
  const eligibleSubtotalCents = items
    .filter((item) => promotion.eligibleCategories.includes(item.category))
    .reduce(
      (subtotal, item) => subtotal + item.unitPriceCents * item.quantity,
      0,
    );

  return Math.round(eligibleSubtotalCents * promotion.percentage);
}
