import { useState } from 'react'

export default function ConfigureMCPs() {
  const [configured, setConfigured] = useState(false)

  const mcpServers = [
    {
      name: 'git-server',
      token: 'GITHUB_PERSONAL_ACCESS_TOKEN',
      description: 'GitHub integration for repository management',
      where: 'From Step 8: GitHub Enterprise PAT',
      required: true
    },
    {
      name: 'jira-server',
      token: 'JIRA_PAT_TOKEN',
      description: 'Jira integration for issue tracking',
      where: 'Jira Settings → Personal Access Tokens',
      required: true
    },
    {
      name: 'wiki-server',
      token: 'CONFLUENCE_TOKEN',
      description: 'Confluence wiki integration',
      where: 'Confluence Settings → Personal Access Tokens',
      required: false
    },
    {
      name: 'apidiscovery-server',
      token: 'IAF_TOKEN',
      description: 'API Discovery for eBay services',
      where: 'IAF Portal → Generate Token',
      required: false
    },
    {
      name: 'pulse-api',
      token: 'PULSE_API_KEY',
      description: 'Pulse API for metrics and monitoring',
      where: 'Pulse Dashboard → API Keys',
      required: false
    }
  ]

  return (
    <>
      <h2>Step 12: Configure MCPs</h2>
      <p>Set up Model Context Protocol (MCP) servers to give Cline and Claude Code access to eBay tools and services.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What are MCP Servers?</h3>
      <p>MCP servers allow AI assistants to interact with external services like GitHub, Jira, Confluence, and more. They act as bridges between the AI and your development tools.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Open MCP Setup Wizard</h3>
      <ol>
        <li>Open VS Code</li>
        <li>Press <kbd>Ctrl+Shift+P</kbd> (Windows/Linux) or <kbd>Cmd+Shift+P</kbd> (Mac)</li>
        <li>Type: <code>MCP: Open MCP Setup Wizard</code></li>
        <li>Press Enter</li>
      </ol>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Note:</strong> The MCP Setup Wizard will guide you through configuring each server and obtaining the required tokens.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Using the Template File</h3>
      <p>The repository includes an example MCP configuration at <code>.mcp/cline_mcp_settings.template.json</code></p>

      <ol>
        <li>Copy the template file to create your configuration:
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code>cp .mcp/cline_mcp_settings.template.json ~/.mcp/cline_mcp_settings.json</code>
          </div>
        </li>
        <li>Update the file paths to replace <code>YOUR_USERNAME</code> with your actual username</li>
        <li>Replace all placeholder tokens (see list below)</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Required Tokens and Where to Get Them</h3>
      <p>You'll need to obtain tokens for each MCP server you want to use:</p>

      <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {mcpServers.map((server) => (
          <div
            key={server.name}
            style={{
              border: '1px solid #e1e4e8',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3)',
              background: server.required ? '#fffbf0' : 'white',
              borderLeft: server.required ? '4px solid var(--color-yellow-500)' : '1px solid #e1e4e8'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>
                  {server.name}
                  {server.required && (
                    <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: 'var(--color-yellow-500)', fontWeight: 600 }}>
                      REQUIRED
                    </span>
                  )}
                </div>
                <p style={{ margin: '4px 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
                  {server.description}
                </p>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Token:</strong> <code style={{ background: '#f6f8fa', padding: '2px 6px', borderRadius: '4px' }}>{server.token}</code>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-blue-500)' }}>
                    <strong>Where to get it:</strong> {server.where}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>MCP Setup Wizard Will Help You With:</h3>
      <ul>
        <li><strong>Token Generation:</strong> Links to generate tokens for each service</li>
        <li><strong>Path Configuration:</strong> Automatically set correct file paths for your system</li>
        <li><strong>Testing Connections:</strong> Verify each MCP server is working correctly</li>
        <li><strong>Enable/Disable Servers:</strong> Choose which servers you want to use</li>
      </ul>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Git Configuration Note:</strong> While setting up MCPs, you should also configure Git with your identity:
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
          <code style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            git config --global user.name "Your Name"
          </code>
          <code style={{ display: 'block' }}>
            git config --global user.email "your.email@ebay.com"
          </code>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Configuration</h3>
      <ol>
        <li>Open Cline in VS Code (click the Cline icon in the sidebar)</li>
        <li>Check that the MCP servers you configured appear in the Cline settings</li>
        <li>Try asking Cline to access one of the services (e.g., "Show me my recent Jira tickets")</li>
      </ol>

      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={configured}
            onChange={(e) => setConfigured(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: configured ? 600 : 400 }}>
            I've configured MCP servers and tested the connections
          </span>
        </label>
      </div>

      {configured && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>MCPs configured!</strong>
          <p style={{ margin: '8px 0 0' }}>
            Your AI assistants can now access eBay tools. Continue to Step 13 to configure VS Code settings.
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <ul>
        <li><strong>MCP Setup Wizard not found:</strong> Make sure you've installed the MCP extension from Step 11</li>
        <li><strong>Connection errors:</strong> Verify you're on the corporate network or VPN</li>
        <li><strong>Token invalid:</strong> Check that the token hasn't expired and has the correct permissions</li>
        <li><strong>Path errors:</strong> Ensure all file paths use your actual username, not YOUR_USERNAME</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button ghost"
          href="https://pages.github.corp.ebay.com/DevGenAI/ebay-mcp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MCP Server Documentation
        </a>
      </div>
    </>
  )
}
