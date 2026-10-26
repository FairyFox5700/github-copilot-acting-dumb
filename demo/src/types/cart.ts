export type ProductCategory = 'coffee' | 'beans' | 'gift-card' | 'delivery';

export interface CartItem {
  id: string;
  name: string;
  category: ProductCategory;
  unitPriceCents: number;
  quantity: number;
}

export interface Promotion {
  code: string;
  percentage: number;
  eligibleCategories: ProductCategory[];
}

export interface CheckoutTotals {
  merchandiseSubtotalCents: number;
  promotionDiscountCents: number;
  deliveryCents: number;
  totalCents: number;
}
