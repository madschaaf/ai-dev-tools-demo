export default function Airtable() {
  return (
    <>
      <h2>Airtable at eBay</h2>
      <p>Airtable powers flexible operational tables: roadmaps, intake forms, and status trackers. You'll often reference it for cross-functional updates and shared resources.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Common uses: program tracking, team rosters, intake pipelines</li>
        <li>What you do: update rows, add comments, attach links</li>
        <li>Tips: save personal views and use filters to focus on what matters</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://airtable.com" target="_blank" rel="noreferrer">
          Open Airtable
        </a>
      </div>
    </>
  )
}
