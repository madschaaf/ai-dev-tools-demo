export default function SetupEnvironment() {
  return (
    <>
      <h2>Step 5: Setup Environment</h2>
      <p>Install project dependencies and configure your development environment.</p>

      <h3>Install Node.js Dependencies</h3>
      <p>Most projects use npm or yarn for package management:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <code style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
          npm install
        </code>
        <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--color-neutral-700)', fontSize: '0.9rem' }}>or</p>
        <code style={{ display: 'block', marginTop: 'var(--space-2)' }}>
          yarn install
        </code>
      </div>

      <h3>Environment Variables</h3>
      <p>Create a <code>.env</code> file if needed:</p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <code style={{ display: 'block' }}>cp .env.example .env</code>
      </div>

      <h3>Run the Project</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <code>npm run dev</code>
      </div>
    </>
  )
}
