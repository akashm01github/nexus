// Formats a price from price.json for display without altering the source value.
// Numbers get Indian digit grouping (e.g. 3,900); strings such as "300/250" are kept as-is.
export function formatPrice(price) {
  if (typeof price === 'number') {
    return `₹${price.toLocaleString('en-IN')}`
  }
  const text = String(price ?? '').trim()
  return text ? `₹${text}` : 'Price on request'
}