import { useState, useEffect } from 'react'
import { getUserInfo, getUserOS } from '../steps/UserInfo'

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
  const catKeyCommandMac = 'cat ~/.ssh/id_ed25519.pub'
  const catKeyCommandWindows = 'cat ~/.ssh/id_ed25519.pub'

  return (
    <>
      <h2>Setup GitHub Personal Account</h2>
      <p>Create your personal GitHub account and configure SSH keys for secure authentication. This setup enables passwordless git operations and is essential for modern development workflows.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized terminal commands.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Why Setup GitHub Now?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          While you wait for GitHub Enterprise access approval (from Step 3), you can set up your personal GitHub account. This allows you to start learning Git workflows and enables GitHub Copilot access through eBay's enterprise setup.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Get</h3>
      <ul>
        <li><strong>Personal GitHub Account</strong> - Free hosting for your code repositories</li>
        <li><strong>SSH Key Authentication</strong> - Secure, passwordless access to Git operations</li>
        <li><strong>GitHub Copilot Access</strong> - AI coding assistant through eBay enterprise</li>
        <li><strong>Version Control</strong> - Professional code management and collaboration</li>
        <li><strong>Portfolio Platform</strong> - Showcase your projects to potential employers</li>
        <li><strong>Open Source Access</strong> - Contribute to and learn from millions of projects</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Prerequisites</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Before You Begin:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>Git installed (completed in Step 2)</li>
          <li>Terminal or Git Bash access</li>
          <li>Valid email address (eBay or personal)</li>
          {!userEmail && <li>Complete Step 0 to save your email for auto-populated commands</li>}
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Create GitHub Account</h3>
      <p>Sign up for a free GitHub account using your eBay email or personal email.</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to GitHub</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 8px' }}>
            Go to <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>github.com</a>
          </p>
        </li>
        <li>
          <strong>Sign up</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Click "Sign up" and create an account using your eBay email ({userEmail || 'your_name@ebay.com'}) or personal email
          </p>
        </li>
        <li>
          <strong>Verify your email</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Check your inbox for a verification email and click the confirmation link
          </p>
        </li>
        <li>
          <strong>Choose the free plan</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            The free tier is sufficient for personal projects and learning
          </p>
        </li>
        <li>
          <strong>Complete your profile (optional)</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Add a profile picture, bio, and other details to personalize your GitHub presence
          </p>
        </li>
      </ol>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>✓ Account Created!</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          You now have a GitHub account. Next, you'll set up SSH keys for secure authentication.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Configure SSH Keys</h3>
      <p>SSH keys provide a secure way to authenticate with GitHub without entering your password every time. This is the recommended authentication method for Git operations.</p>

      <div className="callout" style={{ background: '#f0f4ff', borderColor: '#c5d7f7', color: '#1e3a8a', marginTop: 'var(--space-3)' }}>
        <strong>What are SSH Keys?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          SSH keys work like a lock and key pair. Your private key stays on your computer (the key), and you share your public key with GitHub (the lock). When you connect, GitHub verifies you have the matching private key without ever seeing it.
        </p>
      </div>

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

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-4)' }}>2a. Generate SSH Key</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Run this command in your terminal{userOS === 'windows' ? ' (Git Bash)' : ''} to create a new SSH key pair:
      </p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
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
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {copiedCommand === 'keygen' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(0, 0, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--color-neutral-700)', fontWeight: 600 }}>
            When prompted:
          </p>
          <ol style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', margin: 0, paddingLeft: '20px' }}>
            <li>Press <strong>Enter</strong> to accept the default file location (~/.ssh/id_ed25519)</li>
            <li>Enter a secure passphrase (recommended) or press Enter to skip</li>
            <li>Confirm the passphrase (or press Enter again if skipping)</li>
          </ol>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          This creates two files: <code>id_ed25519</code> (private key - keep secret!) and <code>id_ed25519.pub</code> (public key - safe to share)
        </p>
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Security Best Practice:</strong> Always set a passphrase for your SSH key. This adds an extra layer of security if someone gains access to your computer.
      </div>

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-4)' }}>2b. Start SSH Agent and Add Key</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        The SSH agent manages your keys and handles authentication. Run these commands:
      </p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--color-neutral-700)', fontWeight: 600 }}>
            1. Start the SSH agent:
          </p>
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
          <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--color-neutral-600)' }}>
            Expected output: "Agent pid [number]"
          </p>
        </div>

        <div>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--color-neutral-700)', fontWeight: 600 }}>
            2. Add your SSH key to the agent:
          </p>
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
          <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--color-neutral-600)' }}>
            Enter your passphrase if you set one
          </p>
        </div>
      </div>

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-4)' }}>2c. Copy Public Key to Clipboard</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Copy your public key so you can add it to GitHub:
      </p>

      {userOS ? (
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
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
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Alternative: Display the key with <code>{userOS === 'mac' ? catKeyCommandMac : catKeyCommandWindows}</code> and copy it manually
          </p>
        </div>
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

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-4)' }}>2d. Add Key to GitHub</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Now add your public key to your GitHub account:
      </p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to SSH settings</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 8px' }}>
            Go to <a href="https://github.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>GitHub Settings → SSH and GPG keys</a>
          </p>
        </li>
        <li>
          <strong>Add new SSH key</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Click the green "New SSH key" button
          </p>
        </li>
        <li>
          <strong>Enter key details</strong>
          <ul style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            <li>Title: Give it a descriptive name (e.g., "Work Laptop - MacBook Pro" or "eBay Windows Machine")</li>
            <li>Key type: Keep as "Authentication Key"</li>
            <li>Key: Paste the public key you copied (starts with "ssh-ed25519")</li>
          </ul>
        </li>
        <li>
          <strong>Save the key</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Click "Add SSH key" and confirm with your GitHub password if prompted
          </p>
        </li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Test SSH Connection</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Verify your SSH setup is working correctly:
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
        <div style={{ marginTop: 'var(--space-2)', padding: 'var(--space-2)', background: 'rgba(0, 0, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--color-neutral-700)', fontWeight: 600 }}>
            Expected output:
          </p>
          <code style={{ fontSize: '0.8rem', display: 'block', whiteSpace: 'pre-wrap', color: 'var(--color-green-700)' }}>
            Hi [your-username]! You've successfully authenticated, but GitHub does not provide shell access.
          </code>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          The first time you connect, you'll be asked to verify GitHub's fingerprint - type "yes" to continue
        </p>
      </div>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>✓ SSH Setup Complete!</strong>
        <p style={{ margin: '8px 0 0' }}>
          Your SSH authentication is now configured. You can push and pull code from GitHub without entering your password.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Enable GitHub Copilot Access</h3>
      <p>After creating your personal GitHub account, enable GitHub Copilot access through eBay's enterprise setup.</p>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>What is GitHub Copilot?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          GitHub Copilot is an AI-powered coding assistant that suggests code completions as you type. It's trained on billions of lines of code and can help you write code faster, learn new patterns, and avoid common mistakes. eBay provides enterprise access through GitHub Copilot Business.
        </p>
      </div>

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-3)' }}>Enable Copilot Access:</h4>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to eBay Copilot repository</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 8px' }}>
            Visit <a href="https://github.com/ebay-copilot" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>https://github.com/ebay-copilot</a>
          </p>
        </li>
        <li>
          <strong>Sign in with your personal GitHub account</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Use the account you just created
          </p>
        </li>
        <li>
          <strong>Authorize eBay SSO</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            When prompted, authorize eBay's Single Sign-On (SSO) to link your GitHub account with eBay's enterprise
          </p>
        </li>
        <li>
          <strong>Verify access</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            You should see the ebay-copilot repository and have Copilot enabled for your account
          </p>
        </li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Note:</strong> GitHub Copilot will be available in VS Code after you install the GitHub Copilot extension (covered in a later step). The extension will automatically connect using this GitHub account.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>Permission denied (publickey):</strong> Your SSH key isn't properly added to GitHub or the SSH agent. Re-run the ssh-add command and verify the key is added to GitHub</li>
          <li><strong>Could not open a connection to your authentication agent:</strong> SSH agent isn't running. Run <code>eval "$(ssh-agent -s)"</code> first</li>
          <li><strong>No such file or directory (~/.ssh/id_ed25519):</strong> SSH key wasn't generated. Re-run the ssh-keygen command and don't change the default location</li>
          <li><strong>Bad owner or permissions on ~/.ssh/config:</strong> Fix permissions with <code>chmod 600 ~/.ssh/config</code></li>
          <li><strong>Key already in use:</strong> Each SSH key can only be added to one GitHub account. Generate a new key or use a different email address</li>
          <li><strong>Can't copy public key:</strong> Manually display it with <code>cat ~/.ssh/id_ed25519.pub</code> and copy from the terminal</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With your GitHub account and SSH keys configured, you're ready to:</p>
      <ul>
        <li>Clone repositories securely using SSH URLs</li>
        <li>Push and pull code without password prompts</li>
        <li>Use GitHub Copilot for AI-assisted coding</li>
        <li>Set up GitHub Enterprise access (next step)</li>
        <li>Collaborate on projects with other developers</li>
      </ul>

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
          SSH Documentation
        </a>
        <a
          className="button ghost"
          href="https://github.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
        >
          Manage SSH Keys
        </a>
      </div>
    </>
  )
}
