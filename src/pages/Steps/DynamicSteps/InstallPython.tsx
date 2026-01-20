import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallPython() {
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

  const chocoInstallCommand = 'choco install python -y'
  const wingetInstallCommand = 'winget install Python.Python.3.12'
  const brewInstallCommand = 'brew install python@3.12'

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    // Provide appropriate download link based on saved OS
    let downloadUrl = 'https://www.python.org/downloads/'

    if (userOS === 'mac') {
      downloadUrl = 'https://www.python.org/ftp/python/3.12.8/python-3.12.8-macos11.pkg'
    } else if (userOS === 'windows') {
      downloadUrl = 'https://www.python.org/ftp/python/3.12.8/python-3.12.8-amd64.exe'
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
      <h2>Install Python</h2>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <p>Python is a versatile programming language widely used for data analysis, machine learning, automation, web development, and scripting. It comes with pip (Python Package Installer) for managing packages and libraries.</p>

      <h3>Why Python?</h3>
      <ul>
        <li><strong>Easy to Learn</strong> - Clean, readable syntax ideal for beginners and experts</li>
        <li><strong>Extensive Libraries</strong> - Rich ecosystem of packages for data science, ML, web dev, and more</li>
        <li><strong>pip Package Manager</strong> - Simple package installation and dependency management</li>
        <li><strong>Automation</strong> - Perfect for scripts, tools, and workflow automation</li>
        <li><strong>Cross-Platform</strong> - Runs on Windows, Mac, Linux, and more</li>
        <li><strong>Industry Standard</strong> - Used extensively in AI/ML, data analysis, and backend development</li>
      </ul>

      <div className="callout" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginTop: 'var(--space-4)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: 'none' }}>
        <h3 style={{ color: 'white', marginTop: 0, fontSize: '1.3rem', marginBottom: 'var(--space-3)' }}>
          🐍 Understanding Python: The Swiss Army Knife
        </h3>
        <p style={{ fontSize: '0.95rem', marginBottom: 'var(--space-4)', opacity: 0.95 }}>
          Python is like a versatile multi-tool that handles many different tasks:
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {/* Python Language */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🐍</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  Python = The Language
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                  A programming language designed for simplicity and readability. Write code that looks almost like plain English!
                </p>
              </div>
            </div>
          </div>

          {/* pip */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>📦</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  pip = Package Manager
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                  pip (Pip Installs Packages) makes it easy to add functionality to Python. Need data analysis? Machine learning? Web scraping? Just install a package!
                </p>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    📦 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>pip install pandas</code> = Install data analysis tools
                  </div>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    📦 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>pip install requests</code> = Install HTTP library
                  </div>
                  <div>
                    📦 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>pip list</code> = See all installed packages
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Environments */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🏠</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  Virtual Environments = Isolated Workspaces
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                  Each project can have its own set of packages without interfering with others. Like having separate toolboxes for different projects!
                </p>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <code>python -m venv myproject</code><br />
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Creates an isolated environment for your project</span>
                </div>
              </div>
            </div>
          </div>

          {/* Common Use Cases */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>⚡</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  What Can You Do With Python?
                </h4>
                <div style={{ marginLeft: 'var(--space-2)', display: 'grid', gap: 'var(--space-2)', fontSize: '0.9rem' }}>
                  <div>📊 <strong>Data Analysis:</strong> Analyze spreadsheets, visualize trends, create reports</div>
                  <div>🤖 <strong>Machine Learning:</strong> Build AI models, train algorithms, make predictions</div>
                  <div>🌐 <strong>Web Development:</strong> Build websites and APIs (Django, Flask)</div>
                  <div>🔄 <strong>Automation:</strong> Automate repetitive tasks, schedule jobs, process files</div>
                  <div>🔬 <strong>Scientific Computing:</strong> Simulations, calculations, research</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>What You'll Get</h3>
      <ul>
        <li><strong>Python</strong> - The Python programming language interpreter</li>
        <li><strong>pip</strong> - Package manager for installing Python libraries</li>
        <li><strong>IDLE</strong> - Simple Python IDE for beginners (included with Python)</li>
        <li><strong>Standard Library</strong> - Built-in modules for common tasks</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Option 1: Install via Terminal (Recommended)</h3>
      <p>Use the command line to install Python quickly.</p>

      <div className="callout" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div className="ai-helper-icons">
          <span className="ai-helper-icon ai-helper-icon-glean" aria-hidden="true">g</span>
          <span className="ai-helper-icon ai-helper-icon-chatgpt" aria-hidden="true">c</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          Remember to use your pinned browser AI extensions near the URL bar (Glean and ChatGPT) if you run into any issues installing Python.
        </p>
      </div>

      {userOS === 'mac' && (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Mac Users:</strong> Open Terminal (⌘ + Space, type "Terminal")
          </div>

          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
            <strong>Note:</strong> macOS comes with Python pre-installed, but it's an older version. We recommend installing Python 3.12+ using Homebrew for the latest features and security updates.
          </div>

          <h4 style={{ marginTop: 'var(--space-4)' }}>Install Python with Homebrew</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            If you have Homebrew installed (common package manager for Mac):
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
              This installs Python 3.12 and automatically sets up pip.
            </p>
          </div>

          <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
            <strong>Don't have Homebrew?</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              Install it first with: <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code>
            </p>
          </div>
        </>
      )}

      {userOS === 'windows' && (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Windows Users:</strong> Open PowerShell as Administrator (⊞ Windows key, type "PowerShell", right-click, "Run as Administrator")
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
      <p>If you prefer, you can download the installer directly from python.org.</p>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <button
          type="button"
          className="button secondary"
          onClick={handleDownload}
          style={{ fontSize: '1rem', padding: '12px 20px' }}
        >
          Download Python 3.12 Installer
        </button>
      </div>

      {downloadStarted && (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
            {isDownloading ? (
              <>
                <strong>Download Started!</strong>
                <p style={{ margin: '8px 0 0' }}>Your Python download is starting...</p>
              </>
            ) : (
              <>
                <strong>Download in Progress</strong>
                <p style={{ margin: '8px 0 0' }}>Check your downloads folder for the Python installer.</p>
              </>
            )}
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>What's happening now?</h3>
          <p>We've initiated the download of Python 3.12, which includes pip and the standard library.</p>

          <h3>Installation Steps:</h3>
          <ol>
            <li><strong>Locate the installer</strong> - Check your Downloads folder for the Python installer (.pkg for Mac, .exe for Windows)</li>
            <li><strong>Run the installer</strong> - Double-click the downloaded file to begin installation</li>
            <li><strong>IMPORTANT for Windows Users</strong>:
              <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', margin: 'var(--space-2) 0' }}>
                ✅ <strong>Check "Add Python to PATH"</strong> at the start of installation! This is crucial for running Python from any terminal.
              </div>
            </li>
            <li><strong>Follow the installation wizard</strong>:
              <ul>
                <li>Accept the license agreement</li>
                <li>Choose the default installation location (recommended)</li>
                <li>Keep all default features selected (pip, IDLE, documentation)</li>
                <li>Click through the prompts to complete installation</li>
              </ul>
            </li>
            <li><strong>Complete installation</strong> - Wait for the installation to finish (may take a few minutes)</li>
          </ol>
        </>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Installation</h3>
      <p>Open {userOS === 'windows' ? 'PowerShell or Command Prompt' : 'Terminal'} and verify Python and pip are installed:</p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <code style={{ flex: 1 }}>python --version</code>
          <button
            type="button"
            onClick={() => handleCopy('python --version', 'python-version')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'python-version' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'python-version' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'python-version' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: '0 0 var(--space-3)', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Should output something like: Python 3.12.8
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>pip --version</code>
          <button
            type="button"
            onClick={() => handleCopy('pip --version', 'pip-version')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'pip-version' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'pip-version' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'pip-version' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Should output something like: pip 24.3.1
        </p>
      </div>

      <div className="callout" style={{ marginTop: 'var(--space-3)', background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Troubleshooting:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>If "python" command not found, try <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 4px', borderRadius: '3px' }}>python3 --version</code></li>
          <li>On Mac, you may need to use <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 4px', borderRadius: '3px' }}>python3</code> and <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 4px', borderRadius: '3px' }}>pip3</code> commands</li>
          <li>Restart your terminal or VS Code after installation</li>
          <li>Windows: Ensure "Add Python to PATH" was checked during installation</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps: Create a Virtual Environment</h3>
      <p>Virtual environments keep your project dependencies isolated. Create one for your project:</p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <code style={{ flex: 1 }}>python -m venv myproject</code>
          <button
            type="button"
            onClick={() => handleCopy('python -m venv myproject', 'venv-create')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'venv-create' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'venv-create' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'venv-create' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: '0 0 var(--space-2)', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Creates a virtual environment named "myproject"
        </p>
        
        <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-1)' }}>Activate it:</p>
        {userOS === 'windows' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>myproject\Scripts\activate</code>
              <button
                type="button"
                onClick={() => handleCopy('myproject\\Scripts\\activate', 'venv-activate')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'venv-activate' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'venv-activate' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'venv-activate' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>source myproject/bin/activate</code>
              <button
                type="button"
                onClick={() => handleCopy('source myproject/bin/activate', 'venv-activate')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'venv-activate' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'venv-activate' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'venv-activate' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button ghost"
          href="https://docs.python.org/3/tutorial/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Python Tutorial
        </a>
        <a
          className="button ghost"
          href="https://pip.pypa.io/en/stable/getting-started/"
          target="_blank"
          rel="noopener noreferrer"
        >
          pip Guide
        </a>
      </div>
    </>
  )
}
