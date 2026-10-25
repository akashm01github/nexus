import TestCard from './TestCard.jsx'

function TestList({ tests, onReset }) {
  if (tests.length === 0) {
    return (
      <div className="test-list__empty" role="status">
        <p className="test-list__empty-title">No tests found</p>
        <p>Check the spelling or search with a shorter name.</p>
        <button type="button" className="btn btn--primary" onClick={onReset}>
          Show all tests
        </button>
      </div>
    )
  }

  return (
    <ul className="test-list">
      {tests.map((test) => (
        <TestCard key={test.id} name={test.test_name} price={test.price} />
      ))}
    </ul>
  )
}

export default TestList