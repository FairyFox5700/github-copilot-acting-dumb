import { useState } from 'react'
import { getPriceQuote } from './quoteApi'
import './styles.css'

const euros = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
})

function explainQuote(quote) {
  if (quote.promotionCode.toUpperCase() === 'SAVE20' && quote.hasCategoryDiscount) {
    return 'SAVE20 cannot be combined with a category discount.'
  }

  if (quote.promotionCode.toUpperCase() === 'SAVE20' && quote.discountApplied === 50) {
    return 'SAVE20 is capped at €50.00.'
  }

  if (quote.discountApplied > 0) {
    return 'SAVE20 applied: 20% off your subtotal.'
  }

  return quote.promotionCode
    ? 'That promotion is not eligible for this basket.'
    : 'No promotion applied.'
}

export default function App() {
  const [subtotal, setSubtotal] = useState('100')
  const [promotionCode, setPromotionCode] = useState('SAVE20')
  const [hasCategoryDiscount, setHasCategoryDiscount] = useState(false)
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setQuote(null)
    setIsLoading(true)

    try {
      const nextQuote = await getPriceQuote({
        subtotal: Number(subtotal),
        promotionCode: promotionCode.trim(),
        hasCategoryDiscount,
      })
      setQuote(nextQuote)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="shell">
      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">Commerce pricing demo</p>
        <h1 id="page-title">Make the rule visible.</h1>
        <p className="lede">
          A React client calling a C# pricing API. The same basket makes the
          business contract—and any agent mistake—impossible to hide.
        </p>
        <div className="rule-list" aria-label="Authoritative SAVE20 rules">
          <span>20% off</span>
          <span>€50 maximum</span>
          <span>No stacking</span>
          <span>2-decimal rounding</span>
        </div>
      </section>

      <section className="calculator" aria-labelledby="calculator-title">
        <div className="panel-heading">
          <div>
            <p className="step">Live contract check</p>
            <h2 id="calculator-title">Price a basket</h2>
          </div>
          <span className="status"><i /> API-backed</span>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="subtotal">Subtotal</label>
          <div className="money-input">
            <span>€</span>
            <input
              id="subtotal"
              type="number"
              min="0.01"
              step="0.01"
              value={subtotal}
              onChange={(event) => setSubtotal(event.target.value)}
              required
            />
          </div>

          <label htmlFor="promotionCode">Promotion code</label>
          <input
            id="promotionCode"
            value={promotionCode}
            onChange={(event) => setPromotionCode(event.target.value)}
            placeholder="SAVE20"
          />

          <label className="check-row">
            <input
              type="checkbox"
              aria-label="Category discount already applied"
              checked={hasCategoryDiscount}
              onChange={(event) => setHasCategoryDiscount(event.target.checked)}
            />
            <span>
              <strong>Category discount already applied</strong>
              <small>SAVE20 must not stack with it</small>
            </span>
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Calculating…' : 'Calculate price'}
          </button>
        </form>

        {error && <p className="error" role="alert">{error}</p>}

        {quote && (
          <div className="result" aria-live="polite">
            <p>Final price</p>
            <strong>{euros.format(quote.finalAmount)}</strong>
            <span>You save {euros.format(quote.discountApplied)}</span>
            <hr />
            <small>{explainQuote(quote)}</small>
          </div>
        )}
      </section>
    </main>
  )
}
