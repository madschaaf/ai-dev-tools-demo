import { useState, useEffect } from 'react'
import { getUserOS } from '../steps/UserInfo'

export default function InstallVSCode() {
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

    let downloadUrl = 'https://code.visualstudio.com/Download'

    if (userOS === 'mac') {
      downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal'
    } else if (userOS === 'windows') {
      downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user'
    }

    window.open(downloadUrl, '_blank')

    setTimeout(() => {
      setIsDownloading(false)
    }, 3000)
  }

  return (
    <>
      <h2>Install Visual Studio Code</h2>
      <p>Install VS Code, the powerful and versatile code editor that will be your primary development environment. VS Code combines simplicity with extensive capabilities, making it perfect for everything from quick edits to complex development projects.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized installation instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>What is VS Code?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Visual Studio Code is a free, open-source code editor built by Microsoft. It's lightweight yet powerful, combining the simplicity of a text editor with the features of a full IDE. VS Code is used by millions of developers worldwide and is the recommended editor for this guide.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Get</h3>
      <ul>
        <li><strong>IntelliSense</strong> - Smart code completion that understands your code context</li>
        <li><strong>Built-in Git Integration</strong> - Manage version control without leaving the editor</li>
        <li><strong>Integrated Terminal</strong> - Run commands and scripts directly in VS Code</li>
        <li><strong>Debugging Tools</strong> - Set breakpoints, inspect variables, and debug your code</li>
        <li><strong>Extensions Marketplace</strong> - Thousands of extensions for any language or framework</li>
        <li><strong>Customization</strong> - Themes, keybindings, and settings to match your workflow</li>
        <li><strong>Live Share</strong> - Real-time collaboration with other developers</li>
        <li><strong>AI Integration</strong> - Works seamlessly with GitHub Copilot and Cline</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Prerequisites</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Before Installation:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>At least 500MB of free disk space</li>
          {userOS === 'mac' && <li>macOS 10.11 or newer</li>}
          {userOS === 'windows' && <li>Windows 7 or newer (Windows 10/11 recommended)</li>}
          <li>Administrator access (for system-wide installation)</li>
        </ul>
      </div>

      {userOS === 'mac' && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>macOS Installation</h3>
          
          <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
            <strong>Recommended for eBay Macs:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Use the download installer (Option 2 below) for the most reliable installation on eBay-managed Macs. This ensures proper permissions and system integration.
            </p>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Option A: Install via Homebrew (Alternative)</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            If you have Homebrew package manager installed:
          </p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>{brewInstallCommand}</code>
              <button
                type="button"
                onClick={() => handleCopy(brewInstallCommand, 'brew')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'brew' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'brew' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'brew' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              This will download and install VS Code automatically
            </p>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Option B: Download Installer (Recommended)</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Download the official installer for the most reliable installation:
          </p>

          <div style={{ marginTop: 'var(--space-3)' }}>
            <button
              type="button"
              className="button"
              onClick={handleDownload}
              style={{ fontSize: '1.1rem', padding: '14px 28px' }}
            >
              📥 Download VS Code for macOS
            </button>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: 'var(--space-2)' }}>
              Universal build (Apple Silicon & Intel)
            </p>
          </div>
        </>
      )}

      {userOS === 'windows' && (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>Windows Installation</h3>

          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Choose Your Installation Method</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Windows offers multiple installation methods. The download installer (Option C) is recommended for most users.
            </p>
          </div>

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Option A: Using winget (Windows Package Manager)</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Open PowerShell and run:
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

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Option B: Using Chocolatey</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            If you have Chocolatey installed:
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

          <h4 style={{ fontSize: '0.95rem', marginTop: 'var(--space-3)' }}>Option C: Download Installer (Recommended)</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Download the official installer for the most reliable installation:
          </p>

          <div style={{ marginTop: 'var(--space-3)' }}>
            <button
              type="button"
              className="button"
              onClick={handleDownload}
              style={{ fontSize: '1.1rem', padding: '14px 28px' }}
            >
              📥 Download VS Code for Windows
            </button>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: 'var(--space-2)' }}>
              64-bit User Installer (recommended)
            </p>
          </div>
        </>
      )}

      {downloadStarted && (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
            {isDownloading ? (
              <>
                <strong>✓ Download Started!</strong>
                <p style={{ margin: '8px 0 0' }}>
                  Your VS Code installer is downloading. Check your Downloads folder.
                </p>
              </>
            ) : (
              <>
                <strong>✓ Ready to Install</strong>
                <p style={{ margin: '8px 0 0' }}>
                  Check your Downloads folder for the VS Code installer
                </p>
              </>
            )}
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Installation Steps</h3>
          <ol style={{ marginTop: 'var(--space-2)' }}>
            <li>
              <strong>Locate the installer</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                {userOS === 'mac' 
                  ? 'Find VSCode-darwin-universal.zip in your Downloads folder' 
                  : 'Find VSCodeUserSetup-x64-*.exe in your Downloads folder'}
              </p>
            </li>
            <li>
              <strong>Run the installer</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                {userOS === 'mac'
                  ? 'Double-click to unzip, then drag VS Code to your Applications folder'
                  : 'Double-click the installer. If prompted by User Account Control, click "Yes"'}
              </p>
            </li>
            <li>
              <strong>Accept the license agreement</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                {userOS === 'windows' && 'Read and accept the license terms, then click "Next"'}
                {userOS === 'mac' && 'Open VS Code from Applications - no license screen needed'}
              </p>
            </li>
            {userOS === 'windows' && (
              <>
                <li>
                  <strong>Choose installation location</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Default location is recommended (C:\Users\[Username]\AppData\Local\Programs\Microsoft VS Code)
                  </p>
                </li>
                <li>
                  <strong>Select additional tasks (Important!)</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Check these boxes for the best experience:
                  </p>
                  <ul style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                    <li>✓ Add "Open with Code" action to Windows Explorer file context menu</li>
                    <li>✓ Add "Open with Code" action to Windows Explorer directory context menu</li>
                    <li>✓ Register Code as an editor for supported file types</li>
                    <li>✓ Add to PATH (allows 'code' command in terminal)</li>
                  </ul>
                </li>
                <li>
                  <strong>Complete installation</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                    Click "Install" and wait for the process to complete (1-2 minutes)
                  </p>
                </li>
              </>
            )}
            <li>
              <strong>Launch VS Code</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
                {userOS === 'windows' 
                  ? 'Check "Launch Visual Studio Code" and click "Finish"'
                  : 'Open VS Code from your Applications folder or Spotlight (⌘ + Space, type "Visual Studio Code")'}
              </p>
            </li>
          </ol>

          <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
            <strong>First Launch Tips:</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li>VS Code may ask to import settings from other editors - skip this for now</li>
              <li>You can customize the theme and appearance later in Settings</li>
              <li>The Welcome page has helpful links to get started</li>
              <li>You'll install extensions in the next steps</li>
            </ul>
          </div>
        </>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verification</h3>
      <p>Verify VS Code is properly installed and accessible from the command line:</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginBottom: 'var(--space-2)' }}>
        <strong>Important:</strong> Close and reopen your terminal after installation for the PATH changes to take effect.
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>code --version</code>
          <button
            type="button"
            onClick={() => handleCopy('code --version', 'verify-version')}
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
          Expected output: Version number (e.g., 1.85.0)
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>code .</code>
          <button
            type="button"
            onClick={() => handleCopy('code .', 'open-current')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'open-current' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'open-current' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'open-current' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Opens VS Code in the current directory (test this in any folder)
        </p>
      </div>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>✓ VS Code Installed Successfully!</strong>
        <p style={{ margin: '8px 0 0' }}>
          You now have Visual Studio Code ready to use. Next, you'll configure settings and install essential extensions to supercharge your development environment.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>'code' command not found:</strong> Restart your terminal after installation, or manually add VS Code to PATH</li>
          <li><strong>Installation fails (Windows):</strong> Run installer as Administrator (right-click → "Run as administrator")</li>
          <li><strong>Permission denied (Mac):</strong> Approve in System Preferences → Security & Privacy → General</li>
          <li><strong>Extensions not loading:</strong> Check your proxy settings in VS Code preferences</li>
          <li><strong>Slow startup:</strong> Disable unused extensions or try resetting VS Code settings</li>
          <li><strong>Missing from Applications (Mac):</strong> Make sure you dragged the app to Applications folder, not just opened from Downloads</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With VS Code installed, you're ready to:</p>
      <ul>
        <li>Configure VS Code settings for optimal development</li>
        <li>Install essential extensions (Cline, GitHub Copilot, etc.)</li>
        <li>Set up your workspace and customize your environment</li>
        <li>Start coding with powerful AI assistance</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          className="button ghost"
          href="https://code.visualstudio.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          VS Code Documentation
        </a>
        <a
          className="button ghost"
          href="https://code.visualstudio.com/docs/setup/setup-overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          Setup Guide
        </a>
        <a
          className="button ghost"
          href="https://code.visualstudio.com/docs/getstarted/tips-and-tricks"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tips & Tricks
        </a>
      </div>
    </>
  )
}
