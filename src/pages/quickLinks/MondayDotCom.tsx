export default function MondayDotCom() {
  return (
    <>
      <h2>Monday.com at eBay</h2>
      <p>Monday.com helps teams plan projects, track tasks, and collaborate on deliverables with visual boards and automation.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Use boards to organize sprints and projects</li>
        <li>Automate status updates and notifications</li>
        <li>Connect with Slack and other tools for seamless workflow</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://ebay.monday.com/" target="_blank" rel="noreferrer">
          Open Monday.com
        </a>
      </div>
    </>
  )
}
