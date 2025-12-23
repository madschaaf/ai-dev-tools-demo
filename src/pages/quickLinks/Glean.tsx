export default function Glean() {
  return (
    <>
      <h2>Glean at eBay</h2>
      <p>Glean is your enterprise search engine, indexing content across Jira, Confluence, Slack, GitHub, and more. Find documents, people, and conversations instantly.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Search across all connected tools in one place</li>
        <li>Use natural language queries for better results</li>
        <li>Save frequent searches and get personalized recommendations</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://app.glean.com/" target="_blank" rel="noreferrer">
          Open Glean
        </a>
      </div>
    </>
  )
}
