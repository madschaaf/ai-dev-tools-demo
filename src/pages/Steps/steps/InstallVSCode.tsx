import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallVSCode({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
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

  const brewInstallCommand = 'brew install --cask visual-studio-code'
  const chocoInstallCommand = 'choco install vscode -y'
  const wingetInstallCommand = 'winget install Microsoft.VisualStudioCode'

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    // Provide appropriate download link based on saved OS
    let downloadUrl = 'https://code.visualstudio.com/Download'

    if (userOS === 'mac') {
      downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal'
    } else if (userOS === 'windows') {
      downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user'
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
      <h2>Step 8: Install VS Code</h2>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <p>Visual Studio Code is a lightweight but powerful source code editor that runs on your desktop.</p>

      <h3>Why VS Code?</h3>
      <ul>
        <li><strong>Free and Open Source</strong> - Built by Microsoft and the community</li>
        <li><strong>IntelliSense</strong> - Smart code completion and syntax highlighting</li>
        <li><strong>Extensions</strong> - Thousands of extensions for any language or framework</li>
        <li><strong>Integrated Terminal</strong> - Run commands without leaving your editor</li>
        <li><strong>Git Integration</strong> - Built-in source control management</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Option 1: Install via Terminal (Recommended)</h3>
      <p>Use the command line to install VS Code quickly.</p>

      {userOS === 'mac' && (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Mac Users:</strong> For the best experience on eBay-managed Macs, use the download installer (Option 2 below).
          </div>
        </>
      )}

      {userOS === 'windows' && (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Windows Users:</strong> Open Git Bash (⊞ Windows key, type "Git Bash")
          </div>

          <p style={{ marginTop: 'var(--space-3)', fontSize: '0.9rem' }}>
            <strong>Option A:</strong> Using winget (Windows Package Manager):
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>{wingetInstallCommand}</code>
              <button
                type="button"
                onClick={() => handleCopy(wingetInstallCommand, 'winget')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'winget' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'winget' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'winget' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <p style={{ marginTop: 'var(--space-3)', fontSize: '0.9rem' }}>
            <strong>Option B:</strong> Using Chocolatey:
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>{chocoInstallCommand}</code>
              <button
                type="button"
                onClick={() => handleCopy(chocoInstallCommand, 'choco')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'choco' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'choco' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'choco' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Option 2: Download Installer</h3>
      <p>If you prefer, you can download the installer directly.</p>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <button
          className="button secondary"
          onClick={handleDownload}
          style={{ fontSize: '1rem', padding: '12px 20px' }}
        >
          Download VS Code Installer
        </button>
      </div>

      {downloadStarted && (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
            {isDownloading ? (
              <>
                <strong>Download Started!</strong>
                <p style={{ margin: '8px 0 0' }}>Your VS Code download is starting...</p>
              </>
            ) : (
              <>
                <strong>Download in Progress</strong>
                <p style={{ margin: '8px 0 0' }}>Check your downloads folder for the installer.</p>
              </>
            )}
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>What's happening now?</h3>
          <p>We've initiated the download of the latest stable version of Visual Studio Code for your operating system.</p>

          <h3>Installation Steps:</h3>
          <ol>
            <li><strong>Locate the installer</strong> - Check your Downloads folder for the VS Code installer file</li>
            <li><strong>Run the installer</strong> - Double-click the downloaded file to begin installation</li>
            <li><strong>Follow the prompts</strong> - Accept the license agreement and choose your install location</li>
            <li><strong>Select additional tasks</strong> (recommended):
              <ul>
                <li>Add "Open with Code" action to Windows Explorer context menu (Windows only)</li>
                <li>Add to PATH (allows you to open VS Code from terminal)</li>
                <li>Register Code as an editor for supported file types</li>
              </ul>
            </li>
            <li><strong>Complete installation</strong> - Click Install and wait for the process to complete</li>
            <li><strong>Launch VS Code</strong> - Once installed, open VS Code to verify everything works</li>
          </ol>

          <h3>After Installation</h3>
          <p>Once VS Code is installed, verify it opens correctly. You can proceed to Step 9 to setup the proxy.</p>
        </>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Installation</h3>
      <p>Open {userOS === 'windows' ? 'Git Bash' : 'Terminal'} and check VS Code is installed:</p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <code>code --version</code>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Should output the VS Code version number
        </p>
      </div>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button ghost"
          href="https://code.visualstudio.com/docs/setup/setup-overview"
          target="_blank"
          rel="noreferrer"
        >
          Installation Help
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
