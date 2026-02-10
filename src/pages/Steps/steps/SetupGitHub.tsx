import { useState, useEffect } from 'react'
import { getUserInfo, getUserOS } from './UserInfo'

export default function SetupGitHub() {
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  useEffect(() => {
    const os = getUserOS()
    const userInfo = getUserInfo()
    if (os) setUserOS(os)
    if (userInfo?.email) setUserEmail(userInfo.email)
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const sshKeygenCommand = `ssh-keygen -t ed25519 -C "${userEmail || 'your_email@ebay.com'}"`
  const sshAgentCommand = 'eval "$(ssh-agent -s)"'
  const sshAddCommand = 'ssh-add ~/.ssh/id_ed25519'
  const copyPublicKeyCommandMac = 'pbcopy < ~/.ssh/id_ed25519.pub'
  const copyPublicKeyCommandWindows = 'clip < ~/.ssh/id_ed25519.pub'
  const testSSHCommand = 'ssh -T git@github.com'

  return (
    <>
      <h2>Step 10: Setup GitHub</h2>
      <p>While waiting for GitHub Enterprise access approval, set up your personal GitHub account. You can use your eBay email address.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized terminal commands.
        </div>
      )}

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

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Quick Access: Open Your Terminal</strong>
        {userOS === 'mac' ? (
          <div style={{ marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 8px' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>⌘ Command</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>Space</kbd></p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <p style={{ margin: 0 }}>Type "Terminal" and press Enter</p>
              <button
                type="button"
                onClick={() => handleCopy('Terminal', 'terminal-search')}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'terminal-search' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'terminal-search' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'terminal-search' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        ) : userOS === 'windows' ? (
          <div style={{ marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 8px' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>⊞ Windows</kbd> key</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <p style={{ margin: 0 }}>Type "Git Bash" and press Enter</p>
              <button
                type="button"
                onClick={() => handleCopy('Git Bash', 'gitbash-search')}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'gitbash-search' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'gitbash-search' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'gitbash-search' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Mac:</p>
            <div style={{ paddingLeft: '12px', marginBottom: '12px' }}>
              <p style={{ margin: '0 0 4px' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>⌘ Command</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>Space</kbd></p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Type "Terminal"</span>
                <button
                  type="button"
                  onClick={() => handleCopy('Terminal', 'terminal-search')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-blue-500)',
                    background: copiedCommand === 'terminal-search' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'terminal-search' ? 'white' : 'var(--color-blue-500)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {copiedCommand === 'terminal-search' ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Windows:</p>
            <div style={{ paddingLeft: '12px' }}>
              <p style={{ margin: '0 0 4px' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>⊞ Windows</kbd> key</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Type "Git Bash"</span>
                <button
                  type="button"
                  onClick={() => handleCopy('Git Bash', 'gitbash-search')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-blue-500)',
                    background: copiedCommand === 'gitbash-search' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'gitbash-search' ? 'white' : 'var(--color-blue-500)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {copiedCommand === 'gitbash-search' ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <h4 style={{ marginTop: 'var(--space-4)' }}>Step 1: Generate SSH Key</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Run this command in your terminal{userOS === 'windows' ? ' (Git Bash)' : ''}:
      </p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1, wordBreak: 'break-all' }}>{sshKeygenCommand}</code>
          <button
            type="button"
            onClick={() => handleCopy(sshKeygenCommand, 'keygen')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'keygen' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'keygen' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'keygen' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Press Enter to accept the default file location, then optionally set a passphrase
        </p>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Step 2: Start SSH Agent and Add Key</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Run these commands in your terminal:
      </p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>{sshAgentCommand}</code>
          <button
            type="button"
            onClick={() => handleCopy(sshAgentCommand, 'agent')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'agent' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'agent' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'agent' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>{sshAddCommand}</code>
          <button
            type="button"
            onClick={() => handleCopy(sshAddCommand, 'add')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'add' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'add' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'add' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Step 3: Copy Public Key to Clipboard</h4>
      {userOS ? (
        <>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
            Run this command to copy your public key:
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>
                {userOS === 'mac' ? copyPublicKeyCommandMac : copyPublicKeyCommandWindows}
              </code>
              <button
                type="button"
                onClick={() => handleCopy(
                  userOS === 'mac' ? copyPublicKeyCommandMac : copyPublicKeyCommandWindows,
                  'copy-key'
                )}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'copy-key' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'copy-key' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'copy-key' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
          <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', fontWeight: 600 }}>Mac:</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>{copyPublicKeyCommandMac}</code>
            <button
              type="button"
              onClick={() => handleCopy(copyPublicKeyCommandMac, 'copy-mac')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'copy-mac' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'copy-mac' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCommand === 'copy-mac' ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.9rem', fontWeight: 600 }}>Windows (Git Bash):</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>{copyPublicKeyCommandWindows}</code>
            <button
              type="button"
              onClick={() => handleCopy(copyPublicKeyCommandWindows, 'copy-win')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'copy-win' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'copy-win' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCommand === 'copy-win' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      <h4 style={{ marginTop: 'var(--space-3)' }}>Step 4: Add Key to GitHub</h4>
      <ol>
        <li>Go to <a href="https://github.com/settings/keys" target="_blank" rel="noopener noreferrer">GitHub Settings → SSH and GPG keys</a></li>
        <li>Click "New SSH key"</li>
        <li>Give it a title (e.g., "Work Laptop")</li>
        <li>Paste the key you copied</li>
        <li>Click "Add SSH key"</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Test SSH Connection</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Verify your SSH connection is working:
      </p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>{testSSHCommand}</code>
          <button
            type="button"
            onClick={() => handleCopy(testSSHCommand, 'test')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'test' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'test' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'test' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          You should see: "Hi username! You've successfully authenticated..."
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Setup GitHub Copilot</h3>
      <p>After creating your personal GitHub account, enable GitHub Copilot access through eBay's enterprise setup.</p>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>What is GitHub Copilot?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          GitHub Copilot is an AI coding assistant that suggests code completions directly in your editor as you type. It's integrated into VS Code and will be available once you complete this step.
        </p>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Enable GitHub Copilot Access:</h4>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to eBay Copilot repo:</strong> Visit{' '}
          <a href="https://github.com/ebay-copilot" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
            https://github.com/ebay-copilot
          </a>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Sign in:</strong> You'll be prompted to sign in with your personal GitHub account (the one you just created)
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Confirm SSO:</strong> When prompted, authorize eBay SSO access to link your GitHub account with eBay's enterprise
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Verify access:</strong> You should see the ebay-copilot repository and have Copilot enabled for your account
        </li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Note:</strong> GitHub Copilot will be available in VS Code after you complete Step 12 (Install VS Code Extensions). The extension will automatically connect using this GitHub account.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>Once your GitHub Enterprise access is approved (from Step 3), you'll configure GitHub Enterprise and link it to this personal account in Step 11.</p>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
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
