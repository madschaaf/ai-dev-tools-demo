import { useState, useEffect } from 'react'
import { getUserOS } from '../steps/UserInfo'

export default function ConfigureGit() {
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <>
      <h2>Configure Git</h2>
      <p>Set up Git with your identity and preferences so your commits are properly attributed and your workflow is optimized. This is a critical step that ensures all your code contributions are tracked with your information.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Why Configure Git?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Git needs to know who you are to properly attribute your commits. This information appears in your commit history, pull requests, and helps team members understand who made which changes. Proper configuration also enables features like commit signing and seamless integration with GitHub.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Configure</h3>
      <ul>
        <li><strong>User Name</strong> - Your display name in commits and GitHub</li>
        <li><strong>User Email</strong> - Email address linked to your commits (use eBay email)</li>
        <li><strong>Default Editor</strong> - Editor for commit messages and Git operations</li>
        <li><strong>Line Endings</strong> - Platform-specific line ending handling</li>
        <li><strong>Credential Helper</strong> - Save credentials securely</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Prerequisites</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Before You Configure:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>Git must be installed (see previous step)</li>
          <li>Terminal or command prompt access</li>
          <li>Your eBay email address ready</li>
          <li>Your full name as you want it to appear in commits</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Configure Your Identity</h3>
      <p>Set your name and email address. These will be associated with every commit you make:</p>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>Set Your Name</h4>
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>git config --global user.name "Your Full Name"</code>
            <button
              type="button"
              onClick={() => handleCopy('git config --global user.name "Your Full Name"', 'set-name')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'set-name' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'set-name' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCommand === 'set-name' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Replace "Your Full Name" with your actual name (e.g., "John Smith")
          </p>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>Set Your Email</h4>
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>git config --global user.email "your.email@ebay.com"</code>
            <button
              type="button"
              onClick={() => handleCopy('git config --global user.email "your.email@ebay.com"', 'set-email')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'set-email' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'set-email' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCommand === 'set-email' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Use your eBay email address for proper GitHub attribution
          </p>
        </div>
      </div>

      <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
        <strong>Pro Tip:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          The <code>--global</code> flag applies these settings to all repositories on your machine. You can override these per-repository by omitting the <code>--global</code> flag when inside a specific repository.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Configure Default Editor</h3>
      <p>Set your preferred text editor for Git commit messages and interactive rebases:</p>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>Use VS Code (Recommended)</h4>
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>git config --global core.editor "code --wait"</code>
            <button
              type="button"
              onClick={() => handleCopy('git config --global core.editor "code --wait"', 'editor-vscode')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'editor-vscode' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'editor-vscode' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCommand === 'editor-vscode' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-2)' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>Other Editors</h4>
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Vim:</strong> <code>git config --global core.editor "vim"</code></p>
          <p style={{ margin: '8px 0 0', fontSize: '0.85rem' }}><strong>Nano:</strong> <code>git config --global core.editor "nano"</code></p>
          <p style={{ margin: '8px 0 0', fontSize: '0.85rem' }}><strong>Sublime:</strong> <code>git config --global core.editor "subl -n -w"</code></p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Configure Line Endings</h3>
      <p>Set up proper line ending handling to avoid cross-platform issues:</p>

      {userOS === 'mac' && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>macOS Configuration</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>git config --global core.autocrlf input</code>
              <button
                type="button"
                onClick={() => handleCopy('git config --global core.autocrlf input', 'autocrlf-mac')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'autocrlf-mac' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'autocrlf-mac' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'autocrlf-mac' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              Converts CRLF to LF on commit, keeps LF on checkout
            </p>
          </div>
        </div>
      )}

      {userOS === 'windows' && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>Windows Configuration</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>git config --global core.autocrlf true</code>
              <button
                type="button"
                onClick={() => handleCopy('git config --global core.autocrlf true', 'autocrlf-win')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'autocrlf-win' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'autocrlf-win' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'autocrlf-win' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              Converts LF to CRLF on checkout, CRLF to LF on commit
            </p>
          </div>
        </div>
      )}

      {!userOS && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-2)' }}>
            <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>macOS/Linux:</strong> <code>git config --global core.autocrlf input</code></p>
          </div>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Windows:</strong> <code>git config --global core.autocrlf true</code></p>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Configure Credential Helper</h3>
      <p>Save your credentials securely so you don't have to enter them repeatedly:</p>

      {userOS === 'mac' && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>macOS Keychain</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>git config --global credential.helper osxkeychain</code>
              <button
                type="button"
                onClick={() => handleCopy('git config --global credential.helper osxkeychain', 'cred-mac')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'cred-mac' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'cred-mac' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'cred-mac' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {userOS === 'windows' && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>Windows Credential Manager</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>git config --global credential.helper manager-core</code>
              <button
                type="button"
                onClick={() => handleCopy('git config --global credential.helper manager-core', 'cred-win')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'cred-win' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'cred-win' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'cred-win' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {!userOS && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-2)' }}>
            <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>macOS:</strong> <code>git config --global credential.helper osxkeychain</code></p>
          </div>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Windows:</strong> <code>git config --global credential.helper manager-core</code></p>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Additional Useful Configurations</h3>
      <p>Optional but recommended settings to improve your Git experience:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ marginTop: 0, fontSize: '0.95rem' }}>Enable Color Output</h4>
        <code>git config --global color.ui auto</code>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Makes Git output more readable with colors
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ marginTop: 0, fontSize: '0.95rem' }}>Set Default Branch Name</h4>
        <code>git config --global init.defaultBranch main</code>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Sets "main" as default branch for new repositories
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ marginTop: 0, fontSize: '0.95rem' }}>Enable Rebase by Default on Pull</h4>
        <code>git config --global pull.rebase true</code>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Keeps commit history cleaner by rebasing instead of merging on pull
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verification</h3>
      <p>Verify your Git configuration is set up correctly:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>git config --list</code>
          <button
            type="button"
            onClick={() => handleCopy('git config --list', 'config-list')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'config-list' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'config-list' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'config-list' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Shows all Git configuration settings
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>git config user.name && git config user.email</code>
          <button
            type="button"
            onClick={() => handleCopy('git config user.name && git config user.email', 'check-identity')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'check-identity' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'check-identity' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'check-identity' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Verify your name and email are set correctly
        </p>
      </div>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>Git Configuration Complete!</strong>
        <p style={{ margin: '8px 0 0' }}>
          Your Git environment is now properly configured. All your commits will be attributed to you, and you're ready to start working with repositories.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>Configuration not saving:</strong> Check file permissions in <code>~/.gitconfig</code></li>
          <li><strong>Wrong email showing:</strong> Check for repository-specific config overriding global settings</li>
          <li><strong>Editor not opening:</strong> Ensure your editor is installed and in PATH</li>
          <li><strong>Credential helper errors:</strong> Try reinstalling Git or updating to latest version</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With Git configured, you're ready to:</p>
      <ul>
        <li>Clone your first repository</li>
        <li>Create commits with proper attribution</li>
        <li>Push code to GitHub/GitHub Enterprise</li>
        <li>Collaborate with your team on projects</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          className="button ghost"
          href="https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Git Configuration Guide
        </a>
        <a
          className="button ghost"
          href="https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Setup Guide
        </a>
      </div>
    </>
  )
}
