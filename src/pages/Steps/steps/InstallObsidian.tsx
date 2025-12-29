export default function InstallObsidian({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  return (
    <>
      <h2>Step 14: Install Obsidian App</h2>
      <p>Install the Obsidian Workflow App on GitHub Enterprise to enable @obsidian and @claude triggers in repositories.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What is Obsidian?</h3>
      <p>Obsidian is an AI-powered workflow tool that integrates with GitHub to provide automated code assistance, refactoring, and issue resolution using Claude AI.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Installation Steps</h3>
      <ol>
        <li>
          Go to the{' '}
          <a href="https://github.corp.ebay.com/github-apps/obsidian-workflow-app" target="_blank" rel="noopener noreferrer">
            Obsidian Workflow App page
          </a>
        </li>
        <li>Click the "Install" or "Configure" button</li>
        <li>Choose installation scope:
          <ul>
            <li><strong>All repositories:</strong> Enable org-wide (recommended for teams)</li>
            <li><strong>Only select repositories:</strong> Choose specific repos that will use @obsidian/@claude</li>
          </ul>
        </li>
        <li>Review and confirm the requested permissions</li>
        <li>Complete the installation</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Installation</h3>
      <p>Check that the app is installed:</p>
      <ol>
        <li>Go to your target repository</li>
        <li>Navigate to: Settings → Integrations → GitHub Apps</li>
        <li>Confirm "Obsidian Workflow App" appears in the list</li>
        <li>Verify Issues/PR webhooks are enabled (this is the default)</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Test the Installation</h3>
      <p>Try using Obsidian in a repository:</p>
      <ol>
        <li>Open an issue or PR in an onboarded repository</li>
        <li>Comment: <code>@obsidian help me refactor &lt;area&gt;</code></li>
        <li>Watch the repository's Actions tab for the obsidian.yml workflow run</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Available Commands</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: 0, marginBottom: 'var(--space-2)' }}><code>@claude</code> - Triggers basic Claude assistance</p>
        <p style={{ margin: 0 }}><code>@obsidian</code> - Triggers enhanced Obsidian workflow with custom configurations</p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Obsidian Features</h3>
      <ul>
        <li><strong>Custom prompt loading</strong> - Load project-specific prompts</li>
        <li><strong>MCP server integration</strong> - Connect to Model Context Protocol servers</li>
        <li><strong>Label-based routing</strong> - Route requests based on issue/PR labels</li>
        <li><strong>Advanced tools:</strong> Bash, Edit, Write, LS, WebFetch, WebSearch, Grep</li>
      </ul>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Note:</strong> Domain repos generally do not need to add secrets for this integration. The hub repository obtains a cross-repo installation token to checkout code and open PRs.
      </div>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button"
          href="https://github.corp.ebay.com/github-apps/obsidian-workflow-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Install Obsidian App
        </a>
        <a
          className="button ghost"
          href="https://github.corp.ebay.com/obsidian/claude-code-integration/blob/main/docs/obsidian-user-guide.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Documentation
        </a>
      </div>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {!isCompleted ? (
            <button
              type="button"
              onClick={onComplete}
              style={{
                fontSize: '1rem',
                padding: '12px 24px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Mark as Complete
            </button>
          ) : (
            <div style={{ color: '#28a745', fontWeight: 600, fontSize: '1.1rem' }}>
              ✓ Step Completed
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          style={{
            fontSize: '1rem',
            padding: '12px 24px',
            background: '#0969da',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          Next Step →
        </button>
      </div>
    </>
  )
}
