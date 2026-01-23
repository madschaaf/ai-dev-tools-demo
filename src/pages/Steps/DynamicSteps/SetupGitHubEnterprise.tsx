export default function SetupGitHubEnterprise() {
  return (
    <>
      <h2>Setup GitHub Enterprise</h2>
      <p>Configure access to eBay's GitHub Enterprise for internal repositories and collaboration.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>GitHub Enterprise vs GitHub.com:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          eBay uses GitHub Enterprise (github.corp.ebay.com) for internal code. You'll use both platforms.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>1. Access GitHub Enterprise</h3>
      <ol>
        <li>Visit <a href="https://github.corp.ebay.com" target="_blank" rel="noopener noreferrer">github.corp.ebay.com</a></li>
        <li>Sign in with your eBay credentials</li>
        <li>Complete any required authentication (PingID, YubiKey)</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>2. Configure Git for Enterprise</h3>
      <p>Set up your Git configuration for both GitHub Enterprise and GitHub.com:</p>

      <pre style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
        <code>{`# Set up SSH for GitHub Enterprise
ssh-keygen -t ed25519 -C "your.email@ebay.com"

# Add SSH key to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519`}</code>
      </pre>

      <h3 style={{ marginTop: 'var(--space-4)' }}>3. Add SSH Key to GitHub Enterprise</h3>
      <ol>
        <li>Copy your SSH public key:
          <pre style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code>cat ~/.ssh/id_ed25519.pub</code>
          </pre>
        </li>
        <li>Go to GitHub Enterprise Settings → SSH and GPG keys</li>
        <li>Click "New SSH key"</li>
        <li>Paste your public key and save</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>4. Test Connection</h3>
      <pre style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
        <code>ssh -T git@github.corp.ebay.com</code>
      </pre>
      <p style={{ marginTop: 'var(--space-2)' }}>You should see a success message confirming authentication.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Need Access?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          If you can't access GitHub Enterprise, contact your manager or IT support to request access.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>5. Clone Enterprise Repositories</h3>
      <p>Once configured, you can clone eBay internal repositories:</p>
      <pre style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
        <code>git clone git@github.corp.ebay.com:org-name/repo-name.git</code>
      </pre>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://github.corp.ebay.com" target="_blank" rel="noopener noreferrer">
          Open GitHub Enterprise
        </a>
      </div>
    </>
  )
}
