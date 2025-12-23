export default function SetupGitHub() {
  return (
    <>
      <h2>Step 7: Setup GitHub</h2>
      <p>While waiting for GitHub Enterprise access approval, set up your personal GitHub account. You can use your eBay email address.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Create GitHub Account</h3>
      <ol>
        <li>
          Go to{' '}
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            github.com
          </a>
        </li>
        <li>Click "Sign up" and create an account using your eBay email (or personal email)</li>
        <li>Complete the email verification process</li>
        <li>Choose the free plan (sufficient for personal projects)</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Configure SSH Keys</h3>
      <p>SSH keys allow you to securely connect to GitHub without entering your password every time.</p>

      <h4>Generate SSH Key:</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <code style={{ display: 'block' }}>ssh-keygen -t ed25519 -C "your_email@ebay.com"</code>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Press Enter to accept the default file location, then optionally set a passphrase
        </p>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Start SSH Agent and Add Key:</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <code style={{ display: 'block', marginBottom: 'var(--space-2)' }}>eval "$(ssh-agent -s)"</code>
        <code style={{ display: 'block' }}>ssh-add ~/.ssh/id_ed25519</code>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Copy Public Key:</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', fontWeight: 600 }}>Mac:</p>
        <code style={{ display: 'block', marginBottom: 'var(--space-3)' }}>pbcopy &lt; ~/.ssh/id_ed25519.pub</code>

        <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', fontWeight: 600 }}>Windows (Git Bash):</p>
        <code style={{ display: 'block' }}>clip &lt; ~/.ssh/id_ed25519.pub</code>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Add Key to GitHub:</h4>
      <ol>
        <li>Go to GitHub Settings → SSH and GPG keys</li>
        <li>Click "New SSH key"</li>
        <li>Give it a title (e.g., "Work Laptop")</li>
        <li>Paste the key you copied</li>
        <li>Click "Add SSH key"</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Test SSH Connection</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <code>ssh -T git@github.com</code>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          You should see: "Hi username! You've successfully authenticated..."
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>Once your GitHub Enterprise access is approved (Step 6), you'll configure GitHub Enterprise and link it to this personal account in Step 8.</p>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button"
          href="https://github.com/signup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign Up for GitHub
        </a>
        <a
          className="button ghost"
          href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh"
          target="_blank"
          rel="noopener noreferrer"
        >
          SSH Key Documentation
        </a>
      </div>
    </>
  )
}
