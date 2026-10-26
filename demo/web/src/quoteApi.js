export async function getPriceQuote(request) {
  const response = await fetch('/api/pricing/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const problem = await response.json().catch(() => null)
    throw new Error(problem?.detail ?? 'The pricing service could not calculate a quote.')
  }

  return response.json()
}
