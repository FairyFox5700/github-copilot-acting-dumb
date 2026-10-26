import { calculateCheckout } from '../services/checkoutService';
import type { CartItem, Promotion } from '../types/cart';

const items: CartItem[] = [
  {
    id: 'beans-house',
    name: 'House Blend beans',
    category: 'beans',
    unitPriceCents: 2_000,
    quantity: 2,
  },
  {
    id: 'gift-card',
    name: 'BrewCart gift card',
    category: 'gift-card',
    unitPriceCents: 5_000,
    quantity: 1,
  },
  {
    id: 'delivery',
    name: 'Delivery',
    category: 'delivery',
    unitPriceCents: 500,
    quantity: 1,
  },
];

const beans25: Promotion = {
  code: 'BEANS25',
  percentage: 0.25,
  eligibleCategories: ['coffee', 'beans'],
};

const euro = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
});

function formatCents(cents: number) {
  return euro.format(cents / 100);
}

export function CheckoutPage() {
  const totals = calculateCheckout(items, beans25);
  const merchandiseItems = items.filter((item) => item.category !== 'delivery');

  return (
    <section className="checkout" aria-labelledby="checkout-title">
      <div className="checkout__header">
        <div>
          <span className="checkout__eyebrow">Order BRC-2048</span>
          <h1 id="checkout-title">Your coffee run</h1>
        </div>
        <span className="checkout__status">Ready to brew</span>
      </div>

      <div className="checkout__items" aria-label="Cart items">
        {merchandiseItems.map((item) => (
          <article key={item.id} className="cart-item">
            <div className={`cart-item__icon cart-item__icon--${item.category}`} aria-hidden="true">
              {item.category === 'gift-card' ? 'GC' : 'HB'}
            </div>
            <div className="cart-item__copy">
              <h2>
                {item.name}
                {item.quantity > 1 ? ` × ${item.quantity}` : ''}
              </h2>
              <p>
                {item.category === 'gift-card'
                  ? 'A future coffee, never promotion eligible'
                  : 'Roasted this week · medium profile'}
              </p>
            </div>
            <strong>{formatCents(item.unitPriceCents * item.quantity)}</strong>
          </article>
        ))}
      </div>

      <div className="promo">
        <div>
          <span className="promo__label">Promotion applied</span>
          <strong>{beans25.code}</strong>
        </div>
        <span className="promo__rule">25% off coffee and beans only</span>
      </div>

      <dl className="totals">
        <div>
          <dt>Merchandise subtotal</dt>
          <dd data-testid="merchandise-subtotal">
            {formatCents(totals.merchandiseSubtotalCents)}
          </dd>
        </div>
        <div className="totals__discount">
          <dt>BEANS25 discount</dt>
          <dd data-testid="promotion-discount">
            −{formatCents(totals.promotionDiscountCents)}
          </dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd data-testid="delivery">{formatCents(totals.deliveryCents)}</dd>
        </div>
        <div className="totals__grand">
          <dt>Total</dt>
          <dd data-testid="order-total">{formatCents(totals.totalCents)}</dd>
        </div>
      </dl>

      <button className="checkout__button" type="button">
        Pay {formatCents(totals.totalCents)}
      </button>
      <p className="checkout__assurance">
        Promotion eligibility is calculated in the domain policy—not in this React component.
      </p>
    </section>
  );
}
