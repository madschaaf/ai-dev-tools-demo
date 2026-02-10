import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallNode() {
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

  const chocoInstallCommand = 'choco install nodejs -y'
  const wingetInstallCommand = 'winget install OpenJS.NodeJS.LTS'

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    // Provide appropriate download link based on saved OS
    let downloadUrl = 'https://nodejs.org/en/download/'

    if (userOS === 'mac') {
      downloadUrl = 'https://nodejs.org/dist/v22.12.0/node-v22.12.0.pkg'
    } else if (userOS === 'windows') {
      downloadUrl = 'https://nodejs.org/dist/v22.12.0/node-v22.12.0-x64.msi'
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
      <h2>Step 5: Install Node.js</h2>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <p>Node.js is a JavaScript runtime that allows you to run JavaScript on your computer, not just in the browser. It includes npm (Node Package Manager) for installing JavaScript packages and libraries.</p>

      <h3>Why Node.js?</h3>
      <ul>
        <li><strong>JavaScript Everywhere</strong> - Use JavaScript for both frontend and backend development</li>
        <li><strong>npm Package Manager</strong> - Access to millions of open-source packages</li>
        <li><strong>Build Tools</strong> - Run build tools, bundlers, and development servers</li>
        <li><strong>Modern Development</strong> - Required for most modern web development frameworks (React, Vue, Angular)</li>
        <li><strong>Fast and Efficient</strong> - Built on Chrome's V8 JavaScript engine</li>
      </ul>

      <div className="callout" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', marginTop: 'var(--space-4)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: 'none' }}>
        <h3 style={{ color: 'white', marginTop: 0, fontSize: '1.3rem', marginBottom: 'var(--space-3)' }}>
          🍽️ Understanding Node.js: The Restaurant Analogy
        </h3>
        <p style={{ fontSize: '0.95rem', marginBottom: 'var(--space-4)', opacity: 0.95 }}>
          Think of your development environment as a restaurant. Here's how it all works together:
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {/* JavaScript */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🗣️</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  JavaScript = The Language Everyone Speaks
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9 }}>
                  Just like everyone at the restaurant speaks the same language, JavaScript is the programming language used throughout your development environment.
                </p>
              </div>
            </div>
          </div>

          {/* Node.js */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🏢</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  Node.js = The Restaurant Building + Staff System
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                  Node.js is where JavaScript runs on the server (not just in the browser). It's the whole infrastructure that makes everything work:
                </p>
                <div style={{ marginLeft: 'var(--space-3)', display: 'grid', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: '1.5rem' }}>👨‍🍳</span>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>Event Loop (Waiter):</strong>
                      <span style={{ fontSize: '0.85rem', opacity: 0.9 }}> Keeps taking new requests and checking what's ready</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: '1.5rem' }}>🍳</span>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>Background Work (Kitchen):</strong>
                      <span style={{ fontSize: '0.85rem', opacity: 0.9 }}> Handles database calls, file reads, network requests (the "slow stuff")</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', marginTop: 'var(--space-2)', opacity: 0.9, fontStyle: 'italic' }}>
                  ✨ Node is great at handling lots of "tables" (requests) without blocking!
                </p>
              </div>
            </div>
          </div>

          {/* npm */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🥫</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  npm = The Pantry + Purchasing Department
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                  npm (Node Package Manager) is how your "restaurant" gets ingredients and keeps them organized.
                </p>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    <strong>In the restaurant:</strong> You need buns, lettuce, sauces every day → install and stock them
                  </div>
                  <div>
                    <strong>In code:</strong> You need libraries (packages) like express, lodash, react, etc.
                  </div>
                </div>
                <div style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    📦 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>npm install</code> = "order ingredients and put them in the pantry" (node_modules)
                  </div>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    📝 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>package.json</code> = "the shopping list your menu depends on"
                  </div>
                  <div>
                    🔒 <code style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2px 6px', borderRadius: '3px' }}>package-lock.json</code> = "the exact receipt so you can reorder the same items"
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', marginTop: 'var(--space-2)', opacity: 0.9, fontStyle: 'italic' }}>
                  💡 Use npm when your project needs the same ingredients repeatedly
                </p>
              </div>
            </div>
          </div>

          {/* npx */}
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>🛠️</span>
              <div>
                <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-1)', fontSize: '1.1rem' }}>
                  npx = Borrowing a Tool for a One-Time Job
                </h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.9, marginBottom: 'var(--space-2)' }}>
                  npx runs a package without permanently installing it (or uses the local one if it exists). No stocking required!
                </p>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    <strong>Restaurant examples:</strong>
                  </div>
                  <div style={{ marginLeft: 'var(--space-2)' }}>
                    • Need a label maker for one afternoon<br />
                    • Running a sushi night at a burger restaurant just for tonight
                  </div>
                </div>
                <div style={{ marginTop: 'var(--space-2)', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: 'var(--space-1)' }}>
                    <strong>Common use:</strong> Project scaffolding and one-off commands
                  </div>
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)' }}>
                    <code>npx create-react-app my-app</code><br />
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Creates a new web application project without permanently installing the creation tool
                      <p>*React is a popular framework for building websites</p>
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', marginTop: 'var(--space-2)', opacity: 0.9, fontStyle: 'italic' }}>
                  ⚡ Use npx for quick, one-off tools — "run it now" instead of "stock it forever"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>What You'll Get</h3>
      <ul>
        <li><strong>Node.js</strong> - JavaScript runtime environment</li>
        <li><strong>npm</strong> - Package manager for installing dependencies</li>
        <li><strong>npx</strong> - Tool for running packages without installing them globally</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Option 1: Install via Terminal (Recommended)</h3>
      <p>Use the command line to install Node.js quickly.</p>

      <div className="callout" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div className="ai-helper-icons">
          <span className="ai-helper-icon ai-helper-icon-glean" aria-hidden="true">g</span>
          <span className="ai-helper-icon ai-helper-icon-chatgpt" aria-hidden="true">c</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          Remember to use your pinned browser AI extensions near the URL bar (Glean and ChatGPT) if you run into any issues installing Node.js.
        </p>
      </div>

      {userOS === 'mac' && (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Mac Users:</strong> Open Terminal (⌘ + Space, type "Terminal")
          </div>

          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
            <strong>Recommended: Use nvm</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              nvm (Node Version Manager) installs Node.js in your user directory and avoids permission issues on eBay-managed Macs. This prevents errors when installing global packages later.
            </p>
          </div>

          <h4 style={{ marginTop: 'var(--space-4)' }}>Install Node.js with nvm</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Follow these steps to install nvm and Node.js:
          </p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
              <strong>Step 1:</strong> Install nvm
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash</code>
              <button
                type="button"
                onClick={() => handleCopy('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash', 'nvm-install')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'nvm-install' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'nvm-install' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {copiedCommand === 'nvm-install' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', margin: 'var(--space-3) 0 var(--space-2)' }}>
              <strong>Step 2:</strong> Load nvm into your current shell
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
              <code style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>export NVM_DIR="$HOME/.nvm"</code>
              <button
                type="button"
                onClick={() => handleCopy('export NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"', 'nvm-load')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'nvm-load' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'nvm-load' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {copiedCommand === 'nvm-load' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code style={{ display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"</code>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', margin: 'var(--space-3) 0 var(--space-2)' }}>
              <strong>Step 3:</strong> Install Node.js LTS with nvm
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>nvm install --lts && nvm use --lts</code>
              <button
                type="button"
                onClick={() => handleCopy('nvm install --lts && nvm use --lts', 'nvm-node')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'nvm-node' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'nvm-node' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'nvm-node' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              This installs the latest Long Term Support version and sets it as default.
            </p>
          </div>
        </>
      )}

      {userOS === 'windows' && (
        <>
          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Windows Users:</strong> Open PowerShell (⊞ Windows key, type "PowerShell")
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
      <p>If you prefer, you can download the installer directly. We recommend the LTS (Long Term Support) version for stability.</p>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <button
          type="button"
          className="button secondary"
          onClick={handleDownload}
          style={{ fontSize: '1rem', padding: '12px 20px' }}
        >
          Download Node.js LTS Installer
        </button>
      </div>

      {downloadStarted && (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
            {isDownloading ? (
              <>
                <strong>Download Started!</strong>
                <p style={{ margin: '8px 0 0' }}>Your Node.js download is starting...</p>
              </>
            ) : (
              <>
                <strong>Download in Progress</strong>
                <p style={{ margin: '8px 0 0' }}>Check your downloads folder for the Node.js installer.</p>
              </>
            )}
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>What's happening now?</h3>
          <p>We've initiated the download of the latest LTS (Long Term Support) version of Node.js, which includes npm and npx.</p>

          <h3>Installation Steps:</h3>
          <ol>
            <li><strong>Locate the installer</strong> - Check your Downloads folder for the Node.js installer (.pkg for Mac, .msi for Windows)</li>
            <li><strong>Run the installer</strong> - Double-click the downloaded file to begin installation</li>
            <li><strong>Follow the installation wizard</strong>:
              <ul>
                <li>Accept the license agreement</li>
                <li>Choose the default installation location (recommended)</li>
                <li>Keep all default features selected (Node.js runtime, npm package manager, online documentation shortcuts)</li>
                <li>Click through the prompts to complete installation</li>
              </ul>
            </li>
            <li><strong>Complete installation</strong> - Wait for the installation to finish (may take a few minutes)</li>
          </ol>

          <h3>Verify Installation</h3>
          <p>After installation, open a new terminal window and verify Node.js and npm are installed:</p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
            <code style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
              node --version
            </code>
            <p style={{ margin: 'var(--space-2) 0', color: 'var(--color-neutral-700)', fontSize: '0.85rem' }}>
              Should output something like: v22.12.0
            </p>
            <code style={{ display: 'block', marginTop: 'var(--space-2)' }}>
              npm --version
            </code>
            <p style={{ margin: 'var(--space-2) 0 0', color: 'var(--color-neutral-700)', fontSize: '0.85rem' }}>
              Should output something like: 10.9.2
            </p>
          </div>

          <div className="callout" style={{ marginTop: 'var(--space-4)', background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
            <strong>Important:</strong> You may need to restart your terminal or VS Code for the changes to take effect.
          </div>

          <h3>After Installation</h3>
          <p>Once Node.js is installed and verified, you can proceed to Step 6 to install ChatGPT CLI.</p>
        </>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Installation</h3>
      <p>Open {userOS === 'windows' ? 'PowerShell' : 'Terminal'} and verify Node.js and npm are installed:</p>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <code style={{ flex: 1 }}>node --version</code>
          <button
            type="button"
            onClick={() => handleCopy('node --version', 'node-version')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'node-version' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'node-version' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'node-version' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: '0 0 var(--space-3)', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Should output something like: v22.12.0
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>npm --version</code>
          <button
            type="button"
            onClick={() => handleCopy('npm --version', 'npm-version')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'npm-version' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'npm-version' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'npm-version' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Should output something like: 10.9.2
        </p>
      </div>


      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button ghost"
          href="https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Node.js Documentation
        </a>
      </div>
    </>
  )
}
