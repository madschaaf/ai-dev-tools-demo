import { useState, useEffect } from 'react'

export default function InstallGit() {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [userOS, setUserOS] = useState<'Windows' | 'Mac' | 'Linux' | 'Unknown'>('Unknown')

  useEffect(() => {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Win')) {
      setUserOS('Windows')
    } else if (userAgent.includes('Mac')) {
      setUserOS('Mac')
    } else if (userAgent.includes('Linux')) {
      setUserOS('Linux')
    }
  }, [])

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    // Provide appropriate download link based on OS
    let downloadUrl = 'https://git-scm.com/downloads'

    if (userOS === 'Windows') {
      downloadUrl = 'https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe'
    } else if (userOS === 'Mac') {
      downloadUrl = 'https://git-scm.com/download/mac'
    } else if (userOS === 'Linux') {
      downloadUrl = 'https://git-scm.com/download/linux'
    }

    // Trigger download
    window.open(downloadUrl, '_blank')

    // Simulate download progress
    setTimeout(() => {
      setIsDownloading(false)
    }, 3000)
  }

  return (
    <>
      <h2>Step 3: Install Git</h2>

      {!downloadStarted ? (
        <>
          <p>Git is a distributed version control system that tracks changes in your code and enables collaboration with other developers.</p>

          {userOS === 'Windows' && (
            <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginBottom: 'var(--space-4)' }}>
              <strong>Windows Users:</strong> You'll install Git Bash, which provides both Git and a Unix-like terminal environment.
            </div>
          )}

          {userOS === 'Mac' && (
            <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginBottom: 'var(--space-4)' }}>
              <strong>Mac Users:</strong> Git may already be installed. After installation, you can use the built-in Terminal app for Git commands.
            </div>
          )}

          <h3>Why Git?</h3>
          <ul>
            <li><strong>Version Control</strong> - Track every change to your code over time</li>
            <li><strong>Collaboration</strong> - Work with teams using branches and pull requests</li>
            <li><strong>History</strong> - Review and revert to any previous version of your code</li>
            <li><strong>Industry Standard</strong> - Used by virtually all modern development teams</li>
            <li><strong>GitHub Integration</strong> - Works seamlessly with GitHub for remote repositories</li>
          </ul>

          {userOS === 'Windows' && (
            <>
              <h3>Git Bash Features</h3>
              <ul>
                <li><strong>Git Commands</strong> - Full Git command-line interface</li>
                <li><strong>Bash Shell</strong> - Unix-style terminal for running commands</li>
                <li><strong>SSH Support</strong> - Secure connection to GitHub and other remote servers</li>
                <li><strong>Unix Tools</strong> - Access to common Unix utilities like grep, sed, awk</li>
              </ul>
            </>
          )}

          <div style={{ marginTop: 'var(--space-4)' }}>
            <button
              type="button"
              className="button"
              onClick={handleDownload}
              style={{ fontSize: '1.1rem', padding: '14px 24px' }}
            >
              {userOS === 'Windows' ? 'Download Git Bash' : 'Download Git'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
            {isDownloading ? (
              <>
                <strong>Download Started!</strong>
                <p style={{ margin: '8px 0 0' }}>
                  Your {userOS === 'Windows' ? 'Git Bash' : 'Git'} download is starting...
                </p>
              </>
            ) : (
              <>
                <strong>Download in Progress</strong>
                <p style={{ margin: '8px 0 0' }}>
                  Check your downloads folder for the {userOS === 'Windows' ? 'Git Bash' : 'Git'} installer.
                </p>
              </>
            )}
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>What's happening now?</h3>
          <p>
            We've initiated the download of Git {userOS === 'Windows' && 'Bash '}for your operating system.
          </p>

          {userOS === 'Windows' && (
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
                <li>Right-click anywhere in a folder and select "Git Bash Here"</li>
                <li>Or search for "Git Bash" in the Start menu</li>
              </ul>
            </>
          )}

          {userOS === 'Mac' && (
            <>
              <h3>Installation Steps (Mac):</h3>
              <ol>
                <li><strong>Check if Git is already installed:</strong>
                  <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                    <code>git --version</code>
                  </div>
                  <p style={{ marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
                    If Git is installed, you'll see the version number and can skip to the next step.
                  </p>
                </li>
                <li><strong>If not installed</strong> - Follow the downloaded instructions or use Homebrew:
                  <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                    <code>brew install git</code>
                  </div>
                </li>
                <li><strong>Or install Xcode Command Line Tools</strong> - This includes Git:
                  <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                    <code>xcode-select --install</code>
                  </div>
                </li>
              </ol>

              <h3>Using Terminal</h3>
              <p>Mac users can use the built-in Terminal app for Git commands:</p>
              <ul>
                <li>Press <kbd>Cmd + Space</kbd> and type "Terminal"</li>
                <li>Or find Terminal in Applications → Utilities</li>
                <li>You can also use the integrated terminal in VS Code</li>
              </ul>
            </>
          )}

          {userOS === 'Linux' && (
            <>
              <h3>Installation Steps (Linux):</h3>
              <p>Install Git using your distribution's package manager:</p>

              <h4>Debian/Ubuntu:</h4>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                <code>sudo apt-get update</code><br />
                <code>sudo apt-get install git</code>
              </div>

              <h4>Fedora:</h4>
              <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
                <code>sudo dnf install git</code>
              </div>
            </>
          )}

          <h3>Verify Installation</h3>
          <p>After installation, open {userOS === 'Windows' ? 'Git Bash' : 'Terminal'} and verify Git is installed:</p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
            <code>git --version</code>
            <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--color-neutral-700)', fontSize: '0.85rem' }}>
              Should output something like: git version 2.43.0
            </p>
          </div>

          <h3>Next Steps</h3>
          <p>Once Git is installed and verified, proceed to Step 4 to install essential VS Code extensions, then Step 5 to configure Git with your identity.</p>

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
      )}
    </>
  )
}
