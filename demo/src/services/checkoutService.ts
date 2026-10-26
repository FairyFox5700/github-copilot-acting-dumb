import { calculatePromotionDiscount } from '../domain/discountPolicy';
import type { CartItem, CheckoutTotals, Promotion } from '../types/cart';

export function calculateCheckout(
  items: CartItem[],
  promotion: Promotion,
): CheckoutTotals {
  const merchandiseSubtotalCents = items
    .filter((item) => item.category !== 'delivery')
    .reduce(
      (subtotal, item) => subtotal + item.unitPriceCents * item.quantity,
      0,
    );

  const deliveryCents = items
    .filter((item) => item.category === 'delivery')
    .reduce(
      (subtotal, item) => subtotal + item.unitPriceCents * item.quantity,
      0,
    );

  const promotionDiscountCents = calculatePromotionDiscount(items, promotion);

  return {
    merchandiseSubtotalCents,
    promotionDiscountCents,
    deliveryCents,
    totalCents:
      merchandiseSubtotalCents - promotionDiscountCents + deliveryCents,
  };
}
