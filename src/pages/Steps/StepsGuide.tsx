
export default function StepsGuide() {
  return (
    <>
      <h2>Steps to Get Started</h2>
      <p>Click Step 1 to get started</p>
      
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Install necessary software and tools</li>
        <li>Clone the project repository</li>
        <li>Set up your local development environment</li>
        <li>Run initial tests to ensure everything is working</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://example.com/get-started" target="_blank" rel="noreferrer">
          Get Started Guide
        </a>
      </div>
    </>
  )
}

//should these steps start at cloning repo or start at installing software?