export default function ServiceNow() {
  return (
    <>
      <h2>ServiceNow at eBay</h2>
      <p>ServiceNow is the central hub for IT support, onboarding requests, hardware requests, and incident management.</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Submit tickets for hardware, software, and access requests</li>
        <li>Track onboarding tasks and approvals</li>
        <li>Search the knowledge base for common issues</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://ebayinc.service-now.com/esc" target="_blank" rel="noreferrer">
          Open ServiceNow
        </a>
      </div>
    </>
  )
}
