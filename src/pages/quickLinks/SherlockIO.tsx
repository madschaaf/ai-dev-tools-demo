export default function SherlockIO() {
  return (
    <>
      <h2>Sherlock IO at eBay</h2>
      <p>Sherlock IO is an observability and investigation companion. Use it to explore logs and signals across services when you debug issues.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Common uses: trace investigations, error rate checks, service dashboards</li>
        <li>What you do: search, filter, bookmark key views, share links in incident channels</li>
        <li>Tips: learn key query patterns and save shortcuts for recurring workflows</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://sherlock.io" target="_blank" rel="noreferrer">
          Open Sherlock IO
        </a>
      </div>
    </>
  )
}
