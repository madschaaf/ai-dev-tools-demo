import { useState, useEffect } from 'react'
import { getUserOS } from '../steps/UserInfo'

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
      <h2>Install Git</h2>
      <p>Install Git, the essential version control system that powers modern software development. Git enables you to track changes, collaborate with team members, and manage code efficiently across all your projects.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized installation instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>What is Git?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Git is a distributed version control system that tracks changes in your code over time. It's the foundation of modern software development, enabling you to save snapshots of your work, experiment with new features safely, and collaborate with other developers seamlessly.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Get</h3>
      <ul>
        <li><strong>Version Control</strong> - Track every change to your code with full history</li>
        <li><strong>Branching & Merging</strong> - Experiment safely without affecting main code</li>
        <li><strong>Collaboration</strong> - Work with teams using GitHub and pull requests</li>
        <li><strong>Backup & Recovery</strong> - Never lose your work with distributed backups</li>
        <li><strong>Unix Tools</strong> - {userOS === 'windows' ? 'Git Bash provides Unix-like environment on Windows' : 'Command-line tools for development'}</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Prerequisites</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Before Installation:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>Administrator access on your computer</li>
          <li>At least 500MB of free disk space</li>
          {userOS === 'mac' && <li>Xcode Command Line Tools (may be prompted to install)</li>}
          {userOS === 'windows' && <li>Windows 7 SP1 or newer</li>}
        </ul>
      </div>

      {userOS === 'mac' && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>macOS Installation</h3>
          
          <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
            <strong>Good News!</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Git is typically pre-installed on macOS. Let's verify if you already have it before installing.
            </p>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Step 1: Open Terminal</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.9rem' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>⌘ Cmd</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Space</kbd></p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Type "Terminal" and press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Enter</kbd></p>
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
                {copiedCommand === 'terminal-search' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Step 2: Check If Git is Installed</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>git --version</code>
              <button
                type="button"
                onClick={() => handleCopy('git --version', 'git-version-mac')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'git-version-mac' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'git-version-mac' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'git-version-mac' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              Expected output: git version 2.39.0 (or similar)
            </p>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Step 3: Install if Needed</h4>
          <p>If Git is not installed, you'll be prompted to install Xcode Command Line Tools. You can also install manually:</p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>xcode-select --install</code>
              <button
                type="button"
                onClick={() => handleCopy('xcode-select --install', 'xcode-install')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'xcode-install' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'xcode-install' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'xcode-install' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              This will open a dialog to install Xcode Command Line Tools (includes Git)
            </p>
          </div>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <h4 style={{ marginTop: 0, fontSize: '0.95rem' }}>Alternative: Install via Homebrew</h4>
            <p style={{ margin: '8px 0', fontSize: '0.85rem' }}>If you have Homebrew package manager:</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>brew install git</code>
              <button
                type="button"
                onClick={() => handleCopy('brew install git', 'brew-git')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'brew-git' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'brew-git' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'brew-git' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
            <strong>Pro Tip:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Terminal will be your command center throughout this guide. You'll use it for Git commands, running development servers, and installing tools. Keep it handy!
            </p>
          </div>
        </>
      )}

      {userOS === 'windows' && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>Windows Installation - Git Bash</h3>
          
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>What is Git Bash?</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Git Bash provides both Git version control AND a Unix-like terminal environment on Windows. It's your gateway to modern development workflows, including all the commands used in this guide and tutorials you'll find online.
            </p>
          </div>

          {!downloadStarted ? (
            <>
              <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Why You Need Git Bash</h4>
              <ul>
                <li><strong>Git Commands</strong> - Full command-line interface for version control</li>
                <li><strong>Bash Shell</strong> - Unix-style terminal (most dev tutorials use Unix commands)</li>
                <li><strong>SSH Support</strong> - Secure connections to GitHub and remote servers</li>
                <li><strong>Unix Tools</strong> - Access to grep, sed, awk, curl, and more</li>
                <li><strong>Package Management</strong> - Install additional development tools</li>
              </ul>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <button
                  type="button"
                  className="button"
                  onClick={handleDownload}
                  style={{ fontSize: '1.1rem', padding: '14px 28px' }}
                >
                  📥 Download Git Bash for Windows
                </button>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: 'var(--space-2)' }}>
                  Version 2.43.0 (64-bit) - Official release from git-scm.com
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-3)' }}>
                {isDownloading ? (
                  <>
                    <strong>✓ Download Started!</strong>
                    <p style={{ margin: '8px 0 0' }}>
                      Your Git Bash installer is downloading. Check your Downloads folder.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>✓ Ready to Install</strong>
                    <p style={{ margin: '8px 0 0' }}>
                      Check your Downloads folder for <code>Git-2.43.0-64-bit.exe</code>
                    </p>
                  </>
                )}
              </div>

              <h3 style={{ marginTop: 'var(--space-4)' }}>Installation Steps</h3>
              <ol style={{ marginTop: 'var(--space-2)' }}>
                <li>
                  <strong>Locate the installer</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Open your Downloads folder and find <code>Git-2.43.0-64-bit.exe</code>
                  </p>
                </li>
                <li>
                  <strong>Run the installer</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Double-click the file. If prompted by User Account Control, click "Yes"
                  </p>
                </li>
                <li>
                  <strong>Accept the license</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Click "Next" to proceed
                  </p>
                </li>
                <li>
                  <strong>Choose installation location</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Default location (<code>C:\Program Files\Git</code>) is recommended
                  </p>
                </li>
                <li>
                  <strong>Select components</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Keep all defaults, especially:
                  </p>
                  <ul style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                    <li>✓ Git Bash Here (context menu integration)</li>
                    <li>✓ Git GUI Here</li>
                    <li>✓ Associate .git* configuration files</li>
                  </ul>
                </li>
                <li>
                  <strong>Default editor</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Select "Use Visual Studio Code as Git's default editor" if available, otherwise keep default
                  </p>
                </li>
                <li>
                  <strong>PATH environment</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Choose: <strong>"Git from the command line and also from 3rd-party software"</strong>
                  </p>
                </li>
                <li>
                  <strong>HTTPS transport</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Select: <strong>"Use the OpenSSL library"</strong>
                  </p>
                </li>
                <li>
                  <strong>Line endings</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Choose: <strong>"Checkout Windows-style, commit Unix-style line endings"</strong>
                  </p>
                </li>
                <li>
                  <strong>Terminal emulator</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Use: <strong>"Use MinTTY (the default terminal of MSYS2)"</strong>
                  </p>
                </li>
                <li>
                  <strong>Complete installation</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Keep all remaining defaults and click "Install"
                  </p>
                </li>
              </ol>

              <h3 style={{ marginTop: 'var(--space-4)' }}>How to Open Git Bash</h3>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Method 1: Start Menu</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>⊞ Windows</kbd> key, type "Git Bash", press Enter</p>
              </div>

              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Method 2: Right-Click Menu</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Right-click in any folder → Select "Git Bash Here"</p>
              </div>

              <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
                <strong>Pro Tip:</strong>
                <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
                  Git Bash will be your primary terminal throughout this guide. All Unix-style commands (used in most dev tutorials) will work here. Pin it to your taskbar for quick access!
                </p>
              </div>
            </>
          )}
        </>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verification</h3>
      <p>Verify Git is properly installed:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>git --version</code>
          <button
            type="button"
            onClick={() => handleCopy('git --version', 'verify-version')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'verify-version' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'verify-version' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'verify-version' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Expected output: git version 2.39.0 (or higher)
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>git config --list</code>
          <button
            type="button"
            onClick={() => handleCopy('git config --list', 'verify-config')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'verify-config' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'verify-config' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'verify-config' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Shows your Git configuration (may be empty if not configured yet)
        </p>
      </div>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>✓ Git Installed Successfully!</strong>
        <p style={{ margin: '8px 0 0' }}>
          You now have Git version control installed. Next, you'll configure it with your identity so your commits are properly attributed.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>Command not found:</strong> Restart your terminal/Git Bash after installation</li>
          <li><strong>Permission denied (Mac):</strong> You may need to approve the installation in System Preferences → Security & Privacy</li>
          <li><strong>Installation fails (Windows):</strong> Run installer as Administrator (right-click → "Run as administrator")</li>
          <li><strong>PATH issues:</strong> Ensure you selected the correct PATH option during installation</li>
          <li><strong>Old version:</strong> Uninstall previous Git version before installing new one</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With Git installed, you're ready to:</p>
      <ul>
        <li>Configure Git with your identity (next step)</li>
        <li>Set up GitHub authentication</li>
        <li>Clone repositories and start coding</li>
        <li>Create commits and manage version history</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        {userOS === 'windows' && downloadStarted && (
          <button
            type="button"
            className="button secondary"
            onClick={handleDownload}
          >
            Download Again
          </button>
        )}
        <a
          className="button ghost"
          href="https://git-scm.com/doc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Git Documentation
        </a>
        <a
          className="button ghost"
          href="https://git-scm.com/book/en/v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pro Git Book (Free)
        </a>
      </div>
    </>
  )
}
