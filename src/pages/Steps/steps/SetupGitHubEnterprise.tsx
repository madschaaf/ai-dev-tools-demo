export default function SetupGitHubEnterprise() {
  return (
    <>
      <h2>Step 8: Setup GitHub Enterprise</h2>
      <p>Configure GitHub Enterprise for eBay's internal repositories. This step requires your GitHub Enterprise access to be approved from Step 6.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Prerequisites:</strong> Make sure your "eBay GitHub Access" request from Step 6 has been approved before proceeding.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Access GitHub Enterprise</h3>
      <p>
        Go to{' '}
        <a href="https://github.corp.ebay.com/" target="_blank" rel="noopener noreferrer">
          github.corp.ebay.com
        </a>{' '}
        and sign in with your eBay credentials.
      </p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Create Personal Access Token (Classic)</h3>
      <p>This token will be used for Cline with MCP Servers.</p>

      <ol>
        <li>In GitHub Enterprise, go to Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
        <li>Click "Generate new token (classic)"</li>
        <li>Give it a descriptive name (e.g., "Cline MCP Token")</li>
        <li>Select scopes:
          <ul>
            <li><code>repo</code> (Full control of private repositories)</li>
            <li><code>workflow</code> (Update GitHub Action workflows)</li>
            <li><code>read:org</code> (Read org and team membership)</li>
          </ul>
        </li>
        <li>Set expiration (recommend 90 days for security)</li>
        <li>Click "Generate token"</li>
        <li><strong>IMPORTANT:</strong> Copy the token immediately and save it securely - you won't be able to see it again!</li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Save Your Token:</strong> Store this token in a secure password manager. You'll need it for configuring Cline in Step 10.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Link Enterprise to Personal Account</h3>
      <ol>
        <li>In GitHub Enterprise, go to Settings → Organizations</li>
        <li>Find "eBay" organization</li>
        <li>Click "Connect" or "Link" to connect your personal GitHub account</li>
        <li>Follow the prompts to authorize the connection</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Token Configuration Reference</h3>
      <p>You'll use these configurations later when setting up MCP servers:</p>

      <h4>For GitHub Enterprise (github.corp.ebay.com):</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontSize: '0.85rem' }}>{`"env": {
  "GITHUB_TOKEN": "<your enterprise PAT>",
  "GITHUB_API_URL": "https://github.corp.ebay.com/api/v3"
}`}</pre>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>For Personal GitHub (github.com):</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontSize: '0.85rem' }}>{`"env": {
  "GITHUB_TOKEN": "<your github.com fine-grained PAT>",
  "GITHUB_API_URL": "https://api.github.com"
}`}</pre>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With GitHub Enterprise configured, you're ready to:</p>
      <ul>
        <li>Install the Obsidian Workflow App (Step 9)</li>
        <li>Install and configure Cline with your access token (Step 10)</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button"
          href="https://github.corp.ebay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open GitHub Enterprise
        </a>
        <a
          className="button ghost"
          href="https://github.corp.ebay.com/settings/tokens"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create Access Token
        </a>
      </div>
    </>
  )
}
