import { useState } from 'react'

export default function InstallExtensions() {
  const [cloned, setCloned] = useState(false)

  return (
    <>
      <h2>Step 11: Install VS Code Extensions</h2>
      <p>Clone the AI Dev Tools repository to automatically get all recommended VS Code extensions.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Clone the Repository</h3>
      <p>This repository includes a pre-configured list of essential extensions for eBay development.</p>

      <h4>Using Terminal/Git Bash:</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <code style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
          cd ~/Documents  # or your preferred location
        </code>
        <code style={{ display: 'block' }}>
          git clone https://github.com/madschaaf/ai-dev-tools.git
        </code>
      </div>

      <p style={{ marginTop: 'var(--space-3)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
        Note: This repo will eventually be moved to GitHub Enterprise
      </p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Open in VS Code</h3>
      <ol>
        <li>Open VS Code</li>
        <li>Go to File → Open Folder (or Cmd+O on Mac, Ctrl+O on Windows)</li>
        <li>Navigate to and select the <code>ai-dev-tools</code> folder you just cloned</li>
        <li>Click "Open"</li>
      </ol>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Extension Popup:</strong> VS Code will automatically detect the workspace recommendations and show a popup asking if you want to install the recommended extensions.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Install Recommended Extensions</h3>
      <ol>
        <li>When the popup appears, click <strong>"Install All"</strong> or <strong>"Show Recommendations"</strong></li>
        <li>If you missed the popup:
          <ul>
            <li>Press <kbd>Cmd+Shift+P</kbd> (Mac) or <kbd>Ctrl+Shift+P</kbd> (Windows)</li>
            <li>Type "Extensions: Show Recommended Extensions"</li>
            <li>Click the cloud download icon next to "Workspace Recommendations"</li>
          </ul>
        </li>
        <li>Wait for all extensions to install (this may take a few minutes)</li>
        <li>Reload VS Code when prompted</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What Extensions Are Included?</h3>
      <p>The repository includes recommended extensions for:</p>
      <ul>
        <li><strong>AI Tools:</strong> GitHub Copilot, Copilot Chat, Cline</li>
        <li><strong>Azure:</strong> Azure Copilot, MCP Server, Resource Groups</li>
        <li><strong>Database:</strong> SQL Server, Database Projects, SQL Formatter</li>
        <li><strong>Python:</strong> Python, Pylance, Debugger</li>
        <li><strong>GitHub:</strong> Pull Requests, Actions, Remote Repositories</li>
        <li><strong>Developer Tools:</strong> Prettier, Edge DevTools, Rainbow Brackets</li>
      </ul>

      <p style={{ marginTop: 'var(--space-3)' }}>
        These extensions are pre-configured in the repository's <code>.vscode/extensions.json</code> file.
      </p>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={cloned}
            onChange={(e) => setCloned(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: cloned ? 600 : 400 }}>
            I've cloned the repository and installed the extensions
          </span>
        </label>
      </div>

      {cloned && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>Extensions installed!</strong>
          <p style={{ margin: '8px 0 0' }}>
            You now have all the essential tools. Continue to Step 12 to configure Git.
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Note About VSIX Extensions</h3>
      <p>Some extensions (like eBay Cline from Step 10) need to be installed manually from VSIX files. The standard extensions in this repository will install automatically.</p>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button"
          href="https://github.com/madschaaf/ai-dev-tools"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Repository on GitHub
        </a>
        <a
          className="button ghost"
          href="/vscode-extensions"
        >
          See Full Extensions List
        </a>
      </div>
    </>
  )
}
