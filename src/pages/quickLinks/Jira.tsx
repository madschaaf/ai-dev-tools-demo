export default function Jira() {
  return (
    <>
      <h2>Jira at eBay</h2>
      <p>We use Jira to track work, plan sprints, and coordinate cross-team efforts. Keeping tickets up to date helps everyone align on priorities and progress.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Where tickets live: feature work, bugs, and epics</li>
        <li>What you do: update statuses, add estimates, and link PRs</li>
        <li>Tips: use board filters and handy JQL search templates</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://jira.ebay.com" target="_blank" rel="noreferrer">
          Open Jira
        </a>
      </div>
    </>
  )
}
