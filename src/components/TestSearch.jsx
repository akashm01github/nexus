import { SearchIcon, ResetIcon } from './Icons.jsx'

function TestSearch({ query, onQueryChange, onReset, resultCount, totalCount }) {
  const hasQuery = query.trim() !== ''

  return (
    <form className="test-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <div className="test-search__field">
        <label htmlFor="test-query">Search tests</label>
        <div className="test-search__input-wrap">
          <SearchIcon size={20} />
          <input
            id="test-query"
            type="search"
            value={query}
            placeholder="Type a test name"
            autoComplete="off"
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>
      </div>

      <div className="test-search__status">
        <p role="status" aria-live="polite">
          Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong> tests
        </p>
        <button type="button" className="btn btn--ghost" onClick={onReset} disabled={!hasQuery}>
          <ResetIcon size={16} />
          Reset search
        </button>
      </div>
    </form>
  )
}

export default TestSearch