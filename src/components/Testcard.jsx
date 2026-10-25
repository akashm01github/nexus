import { formatPrice } from '../utils/formatPrice.js'

function TestCard({ name, price }) {
  return (
    <li className="test-row">
      <span className="test-row__name">{name}</span>
      <span className="test-row__leader" aria-hidden="true" />
      <span className="test-row__price">{formatPrice(price)}</span>
    </li>
  )
}

export default TestCard