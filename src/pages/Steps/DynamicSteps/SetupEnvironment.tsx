export default function SetupEnvironment() {
  return (
    <>
      <h2>Setup Development Environment</h2>
      <p>Configure environment variables and development settings for your projects.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>What are Environment Variables?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Environment variables store configuration values like API keys, database URLs, and feature flags without hardcoding them.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Create .env File</h3>
      <p>Most projects use a <code>.env</code> file for local development:</p>

      <ol>
        <li>Copy the example file: <code>cp .env.example .env</code></li>
        <li>Edit <code>.env</code> with your local values</li>
        <li>Never commit <code>.env</code> to git (it's in <code>.gitignore</code>)</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Common Environment Variables</h3>
      <pre style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
        <code>{`# Database
DATABASE_URL=postgresql://localhost:5432/mydb

# API Keys (get from team)
GITHUB_TOKEN=your_token_here
JIRA_API_TOKEN=your_token_here

# Feature Flags
ENABLE_AI_FEATURES=true
NODE_ENV=development`}</code>
      </pre>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Security:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Never share your <code>.env</code> file or commit it to version control. Use <code>.env.example</code> as a template.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Setup</h3>
      <p>Check that your environment is configured:</p>
      <pre style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
        <code>npm run dev</code>
      </pre>
      <p style={{ marginTop: 'var(--space-2)' }}>If the application starts successfully, your environment is configured correctly.</p>
    </>
  )
}
