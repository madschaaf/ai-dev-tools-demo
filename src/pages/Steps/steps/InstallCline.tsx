import { useState } from 'react'

export default function InstallCline() {
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [copied, setCopied] = useState(false)

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

          <h3 style={{ marginTop: 'var(--space-4)' }}>Get Cline VSIX File</h3>
          <p>You have three options to get the Cline extension:</p>

          <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#f6f8fa', marginTop: 'var(--space-2)' }}>
            <strong style={{ fontSize: '0.95rem' }}>Option 1: Use File from Repository (Recommended)</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              If the VSIX file is available at <code>.vscode/extensions/ebay.ebay-cline-*.vsix</code> in this repository, use that file directly!
            </p>
          </div>

          <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff', marginTop: 'var(--space-2)' }}>
            <strong style={{ fontSize: '0.95rem' }}>Option 2: Download from GitHub Enterprise</strong>
            <div style={{ marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                className="button"
                onClick={handleDownload}
                style={{ fontSize: '1rem', padding: '10px 20px' }}
              >
                Download Cline v3.36.2
              </button>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              Or browse all releases at{' '}
              <a href="https://github.corp.ebay.com/DevGenAI/cline/releases" target="_blank" rel="noopener noreferrer">
                GitHub Enterprise Cline Releases
              </a>
            </p>
          </div>

          <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff', marginTop: 'var(--space-2)' }}>
            <strong style={{ fontSize: '0.95rem' }}>Option 3: Request from Team</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              Contact your team lead or check internal Slack channels for the latest VSIX file
            </p>
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

          <h3 style={{ marginTop: 'var(--space-4)' }}>Configure Global VS Code Settings</h3>

          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
            <strong>⚠️ Important:</strong> You must configure your global VS Code settings.json to use Claude Code with Cline across all your repositories.
          </div>

          <p style={{ marginTop: 'var(--space-3)' }}>To ensure Cline and Claude Code work in all your repositories, you need to add configuration to your <strong>global</strong> VS Code settings.json file:</p>

          <h4 style={{ marginTop: 'var(--space-3)' }}>How to Open Global Settings.json</h4>
          <ol style={{ fontSize: '0.9rem' }}>
            <li>Open VS Code</li>
            <li>Press:
              <ul style={{ marginTop: '8px' }}>
                <li><strong>Mac:</strong> <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>⌘ Cmd</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Shift</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>P</kbd></li>
                <li><strong>Windows:</strong> <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Shift</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>P</kbd></li>
              </ul>
            </li>
            <li>Type: <code>Preferences: Open User Settings (JSON)</code></li>
            <li>Press Enter</li>
          </ol>

          <p style={{ margin: '12px 0 8px', fontSize: '0.9rem', fontWeight: 600 }}>This opens your global settings file located at:</p>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
            <li><strong>Mac:</strong> <code>~/Library/Application Support/Code/User/settings.json</code></li>
            <li><strong>Windows:</strong> <code>%APPDATA%\Code\User\settings.json</code></li>
          </ul>

          <h4 style={{ marginTop: 'var(--space-3)' }}>Add Claude Code Configuration</h4>
          <p style={{ fontSize: '0.9rem' }}>Add the following configuration to your settings.json file:</p>

          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', position: 'relative', marginTop: 'var(--space-2)' }}>
            <pre style={{ margin: 0, fontSize: '0.75rem', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
{`"apiKeyHelper": "npx @ebay/claude-code-token@latest get_token",
"claude-code.environmentVariables": [
  { "name": "ANTHROPIC_API_KEY", "value": "$(npx @ebay/claude-code-token@latest get_token)" },
  { "name": "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS", "value": "1" },
  { "name": "ANTHROPIC_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "ANTHROPIC_BASE_URL", "value": "https://platformgateway2.vip.ebay.com/hubgptgatewaysvc/v1/anthropic" },
  { "name": "CLAUDE_CODE_API_KEY_HELPER_TTL_MS", "value": "360000000" },
  { "name": "DISABLE_TELEMETRY", "value": "1" },
  { "name": "ANTHROPIC_LOG", "value": "debug" }
]`}
            </pre>
            <button
              type="button"
              className="button ghost"
              onClick={() => {
                navigator.clipboard.writeText(`"apiKeyHelper": "npx @ebay/claude-code-token@latest get_token",
"claude-code.environmentVariables": [
  { "name": "ANTHROPIC_API_KEY", "value": "$(npx @ebay/claude-code-token@latest get_token)" },
  { "name": "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS", "value": "1" },
  { "name": "ANTHROPIC_MODEL", "value": "hubgpt-chat-completions-claude-sonnet-4-5" },
  { "name": "ANTHROPIC_BASE_URL", "value": "https://platformgateway2.vip.ebay.com/hubgptgatewaysvc/v1/anthropic" },
  { "name": "CLAUDE_CODE_API_KEY_HELPER_TTL_MS", "value": "360000000" },
  { "name": "DISABLE_TELEMETRY", "value": "1" },
  { "name": "ANTHROPIC_LOG", "value": "debug" }
]`)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              style={{
                position: 'absolute',
                right: '8px',
                top: '8px',
                fontSize: '0.75rem',
                padding: '4px 8px',
                background: copied ? 'var(--color-green-500)' : '',
                color: copied ? 'white' : ''
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
            <strong>Why Global Settings?</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
              By adding this to your <strong>global</strong> settings.json (User settings), Claude Code will work with Cline in <strong>all your repositories</strong>, not just this one. This means you won't need to reconfigure Claude Code for every new project.
            </p>
          </div>

          <h4 style={{ marginTop: 'var(--space-3)' }}>What Each Setting Does:</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem' }}>
              <li><strong>apiKeyHelper:</strong> Command to retrieve your eBay SSO token for authentication</li>
              <li><strong>ANTHROPIC_API_KEY:</strong> Environment variable that runs the token helper to get your API key</li>
              <li><strong>CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS:</strong> Disables beta features for stability</li>
              <li><strong>ANTHROPIC_MODEL:</strong> Uses Claude Sonnet 4.5 via eBay's HubGPT gateway</li>
              <li><strong>ANTHROPIC_BASE_URL:</strong> eBay's internal HubGPT gateway endpoint</li>
              <li><strong>CLAUDE_CODE_API_KEY_HELPER_TTL_MS:</strong> Token cache duration (100 hours)</li>
              <li><strong>DISABLE_TELEMETRY:</strong> Disables usage tracking</li>
              <li><strong>ANTHROPIC_LOG:</strong> Enables debug logging for troubleshooting</li>
            </ul>
          </div>

          <h3 style={{ marginTop: 'var(--space-4)' }}>Configure Cline</h3>
          <p>After adding the global settings, configure Cline:</p>

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
