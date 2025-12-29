import { useState } from 'react'

export default function InstallCline() {
  const [downloadStarted, setDownloadStarted] = useState(false)

  const handleDownload = () => {
    setDownloadStarted(true)
    window.open('https://github.corp.ebay.com/DevGenAI/cline/releases/download/v3.36.2/ebay-cline-3.36.2.vsix', '_blank')
  }

  return (
    <>
      <h2>Step 13: Install Cline</h2>
      <p>Download and install eBay's customized Cline extension for VS Code. Cline is an AI-powered coding assistant that integrates with VS Code.</p>

      {!downloadStarted ? (
        <>
          <h3 style={{ marginTop: 'var(--space-4)' }}>What is Cline?</h3>
          <ul>
            <li><strong>AI Pair Programmer:</strong> Get help writing, refactoring, and debugging code</li>
            <li><strong>MCP Server Integration:</strong> Connect to Model Context Protocol servers</li>
            <li><strong>eBay Customized:</strong> Pre-configured for eBay's internal systems and workflows</li>
            <li><strong>GitHub Integration:</strong> Works seamlessly with GitHub Enterprise</li>
          </ul>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Download Cline VSIX</h3>
          <p>Click the button below to download the latest eBay Cline extension:</p>

          <div style={{ marginTop: 'var(--space-3)' }}>
            <button
              type="button"
              className="button"
              onClick={handleDownload}
              style={{ fontSize: '1.1rem', padding: '14px 24px' }}
            >
              Download Cline v3.36.2
            </button>
          </div>

          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
            <strong>Alternative:</strong> You can also browse all releases at{' '}
            <a href="https://github.corp.ebay.com/DevGenAI/cline/releases" target="_blank" rel="noopener noreferrer">
              GitHub Enterprise Cline Releases
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
            <strong>Download Started!</strong>
            <p style={{ margin: '8px 0 0' }}>Check your downloads folder for ebay-cline-3.36.2.vsix</p>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Installation Steps</h3>
          <ol>
            <li>Locate the downloaded <code>ebay-cline-3.36.2.vsix</code> file in your Downloads folder</li>
            <li>Open VS Code</li>
            <li>Go to Extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows)</li>
            <li>Click the "..." (ellipsis) menu at the top of the Extensions panel</li>
            <li>Select "Install from VSIX..."</li>
            <li>Navigate to and select the downloaded <code>ebay-cline-3.36.2.vsix</code> file</li>
            <li>Wait for the installation to complete</li>
            <li>Restart VS Code when prompted</li>
          </ol>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Configure Cline</h3>
          <p>After installation, you'll need to configure Cline:</p>

          <ol>
            <li>Open VS Code and look for the Cline icon in the left sidebar</li>
            <li>Click the Cline icon to open the panel</li>
            <li>Click "Sign In" or "Configure"</li>
            <li>Enter your GitHub Enterprise Personal Access Token (from Step 11)</li>
            <li>Configure MCP servers if needed (Step 15 has more details)</li>
          </ol>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Test Cline</h3>
          <p>Try asking Cline a question to verify it's working:</p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code>"Write a Python function that prints Hello, World!"</code>
          </div>

          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
            <strong>Remember:</strong> You'll need your GitHub Enterprise token from Step 11 to sign into Cline
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Using Cline with MCP</h3>
          <p>Cline integrates with Model Context Protocol (MCP) servers. You'll configure these in Step 15 when setting up your VS Code settings.</p>

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
              href="https://github.corp.ebay.com/DevGenAI/cline/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Releases
            </a>
          </div>
        </>
      )}
    </>
  )
}
