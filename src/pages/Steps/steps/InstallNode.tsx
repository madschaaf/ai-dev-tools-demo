import { useState } from 'react'

export default function InstallNode() {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setDownloadStarted(true)
    setIsDownloading(true)

    // Detect OS and provide appropriate download link
    const userAgent = navigator.userAgent
    let downloadUrl = 'https://nodejs.org/en/download/'

    if (userAgent.includes('Mac')) {
      downloadUrl = 'https://nodejs.org/dist/v22.12.0/node-v22.12.0.pkg'
    } else if (userAgent.includes('Win')) {
      downloadUrl = 'https://nodejs.org/dist/v22.12.0/node-v22.12.0-x64.msi'
    } else if (userAgent.includes('Linux')) {
      downloadUrl = 'https://nodejs.org/dist/v22.12.0/node-v22.12.0-linux-x64.tar.xz'
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
      <h2>Step 2: Install Node.js</h2>

      {!downloadStarted ? (
        <>
          <p>Node.js is a JavaScript runtime that allows you to run JavaScript on your computer, not just in the browser. It includes npm (Node Package Manager) for installing JavaScript packages and libraries.</p>

          <h3>Why Node.js?</h3>
          <ul>
            <li><strong>JavaScript Everywhere</strong> - Use JavaScript for both frontend and backend development</li>
            <li><strong>npm Package Manager</strong> - Access to millions of open-source packages</li>
            <li><strong>Build Tools</strong> - Run build tools, bundlers, and development servers</li>
            <li><strong>Modern Development</strong> - Required for most modern web development frameworks (React, Vue, Angular)</li>
            <li><strong>Fast and Efficient</strong> - Built on Chrome's V8 JavaScript engine</li>
          </ul>

          <h3>What You'll Get</h3>
          <ul>
            <li><strong>Node.js</strong> - JavaScript runtime environment</li>
            <li><strong>npm</strong> - Package manager for installing dependencies</li>
            <li><strong>npx</strong> - Tool for running packages without installing them globally</li>
          </ul>

          <div style={{ marginTop: 'var(--space-4)' }}>
            <button
              type="button"
              className="button"
              onClick={handleDownload}
              style={{ fontSize: '1.1rem', padding: '14px 24px' }}
            >
              Download Node.js LTS
            </button>
            <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-neutral-700)', fontSize: '0.9rem' }}>
              We recommend the LTS (Long Term Support) version for stability
            </p>
          </div>
        </>
      ) : (
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
          <p>Once Node.js is installed and verified, you can proceed to Step 3 to install Git for version control.</p>

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
              href="https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Node.js Documentation
            </a>
          </div>
        </>
      )}
    </>
  )
}
