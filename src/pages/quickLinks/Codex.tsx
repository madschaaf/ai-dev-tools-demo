export default function Codex() {
  return (
    <>
      <h2>Codex</h2>
      <p>Codex is eBay's internal code search and navigation tool that helps you explore and understand eBay's codebase.</p>

      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Search across eBay's entire codebase</li>
        <li>Navigate code references and dependencies</li>
        <li>Find usage examples and implementations</li>
        <li>Understand code architecture and patterns</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Key Features</h3>
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-2)', color: 'var(--color-neutral-600)' }}>
        <li><strong>Code Search:</strong> Find functions, classes, and variables across repositories</li>
        <li><strong>Cross-References:</strong> See where code is used and how it connects</li>
        <li><strong>Symbol Navigation:</strong> Jump to definitions and find all references</li>
        <li><strong>Repository Browser:</strong> Explore code structure and file organization</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://codex.corp.ebay.com/" target="_blank" rel="noreferrer">
          Open Codex
        </a>
      </div>
    </>
  )
}
