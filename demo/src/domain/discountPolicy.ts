import type { CartItem, Promotion } from '../types/cart';

export function calculatePromotionDiscount(
  items: CartItem[],
  promotion: Promotion,
): number {
  const merchandiseSubtotalCents = items
    .filter((item) => item.category !== 'delivery')
    .reduce(
      (subtotal, item) => subtotal + item.unitPriceCents * item.quantity,
      0,
    );

  return Math.round(merchandiseSubtotalCents * promotion.percentage);
}
