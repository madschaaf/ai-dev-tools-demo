import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallGit() {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [userOS, setUserOS] = useState<'windows' | 'mac' | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }
  }, [])

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    const downloadUrl = 'https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe'

    // Trigger download
    window.open(downloadUrl, '_blank')

    // Simulate download progress
    setTimeout(() => {
      setIsDownloading(false)
    }, 3000)
  }

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <>
      <h2>Step 7: Install Git</h2>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for personalized instructions.
        </div>
      )}

      {userOS === 'mac' && (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
            <strong>Mac Users:</strong> Git is typically pre-installed on macOS. You'll use Terminal for all commands throughout this guide. 
            <p><em>Note: If you run into issues during installation, type "Claude" in your terminal to get AI-powered help right in the command line.</em></p>
          </div>

          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Quick Access: Open Terminal</strong>
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
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Git Installation</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
            Check that Git is installed on your Mac:
          </p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code>git --version</code>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              Should output something like: git version 2.39.0
            </p>
          </div>

          <p style={{ marginTop: 'var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            If not installed, run: <code>xcode-select --install</code>
          </p>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
          <p>Once Git is verified, proceed to Step 8 to install VS Code.</p>
        </>
      )}

      {userOS === 'windows' && !downloadStarted ? (
        <>
          <p>Git Bash is a Windows application that provides a Unix-like terminal environment with Git version control. This is essential for your development workflow.</p>

          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginBottom: 'var(--space-4)' }}>
            <strong>Windows Users:</strong> Git Bash will be your primary terminal throughout this guide. Note: if you run into issues during installation type "Claude" in your terminal to get AI-powered help right in the command line.
          </div>

          <h3>Why Git Bash?</h3>
          <ul>
            <li><strong>Git Commands</strong> - Full Git command-line interface for version control</li>
            <li><strong>Bash Shell</strong> - Unix-style terminal for running commands (used throughout this guide)</li>
            <li><strong>SSH Support</strong> - Secure connection to GitHub and remote servers</li>
            <li><strong>Unix Tools</strong> - Access to common Unix utilities like grep, sed, awk</li>
            <li><strong>Package Management</strong> - Install additional tools like ChatGPT CLI</li>
          </ul>

          <div style={{ marginTop: 'var(--space-4)' }}>
            <button
              type="button"
              className="button"
              onClick={handleDownload}
              style={{ fontSize: '1.1rem', padding: '14px 24px' }}
            >
              Download Git Bash
            </button>
          </div>
        </>
      ) : userOS === 'windows' ? (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
            {isDownloading ? (
              <>
                <strong>Download Started!</strong>
                <p style={{ margin: '8px 0 0' }}>
                  Your Git Bash download is starting...
                </p>
              </>
            ) : (
              <>
                <strong>Download in Progress</strong>
                <p style={{ margin: '8px 0 0' }}>
                  Check your downloads folder for the Git Bash installer.
                </p>
              </>
            )}
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>What's happening now?</h3>
          <p>
            We've initiated the download of Git Bash for Windows. After installation, you'll install ChatGPT CLI for AI-powered command line assistance.
          </p>

          {userOS === 'windows' && (
            <>
              <h3>Installation Steps (Windows):</h3>
              <ol>
                <li><strong>Locate the installer</strong> - Check your Downloads folder for Git-*-64-bit.exe</li>
                <li><strong>Run the installer</strong> - Double-click to begin installation</li>
                <li><strong>Follow the installation wizard</strong>:
                  <ul>
                    <li>Accept the license agreement</li>
                    <li>Choose installation location (default is fine)</li>
                    <li><strong>Select components:</strong> Keep all defaults selected, especially "Git Bash Here"</li>
                    <li><strong>Default editor:</strong> Choose VS Code if you see it, otherwise keep the default</li>
                    <li><strong>PATH environment:</strong> Select "Git from the command line and also from 3rd-party software"</li>
                    <li><strong>HTTPS transport:</strong> Use the OpenSSL library</li>
                    <li><strong>Line endings:</strong> Choose "Checkout Windows-style, commit Unix-style"</li>
                    <li><strong>Terminal emulator:</strong> Use MinTTY (default)</li>
                    <li>Keep all other defaults and complete installation</li>
                  </ul>
                </li>
              </ol>

              <h3>After Installation</h3>
              <p><strong>To use Git Bash:</strong></p>
              <ul>
                <li>Press the <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>⊞ Windows</kbd> key and type "Git Bash"</li>
                <li>Or right-click anywhere in a folder and select "Git Bash Here"</li>
              </ul>
            </>
          )}

          <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Installation</h3>
          <p>After installation, open Git Bash and verify Git is installed:</p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
            <code>git --version</code>
            <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--color-neutral-700)', fontSize: '0.85rem' }}>
              Should output something like: git version 2.43.0
            </p>
          </div>

          <h3>Next Steps</h3>
          <p>Once Git Bash is installed and verified, proceed to Step 8 to install VS Code.</p>

          <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
            <button
              type="button"
              className="button secondary"
              onClick={handleDownload}
            >
              Download Again
            </button>
            <a
              className="button ghost"
              href="https://git-scm.com/doc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Git Documentation
            </a>
          </div>
        </>
      ) : null}
    </>
  )
}
