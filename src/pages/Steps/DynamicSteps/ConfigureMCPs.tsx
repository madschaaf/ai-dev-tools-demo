export default function ConfigureMCPs() {
  return (
    <>
      <h2>Configure MCP Servers</h2>
      <p>Set up Model Context Protocol (MCP) servers to extend AI assistant capabilities with custom tools and data sources.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>What are MCP Servers?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          MCP servers provide AI assistants with access to additional tools, APIs, and data sources like GitHub, JIRA, Confluence, and more.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Setup MCP Servers</h3>
      <p>Run the setup script from the ai-dev-tools repository:</p>

      <pre style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
        <code>npm run setup-mcp</code>
      </pre>

      <p style={{ marginTop: 'var(--space-3)' }}>This script will configure MCP servers for:</p>
      <ul>
        <li>GitHub (repository operations)</li>
        <li>JIRA (ticket management)</li>
        <li>Confluence (wiki access)</li>
        <li>Custom eBay tools</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Configuration</h3>
      <p>Check that MCP servers are configured in your Cline settings:</p>
      <ol>
        <li>Open VS Code Settings</li>
        <li>Search for "Cline MCP"</li>
        <li>Verify server configurations are present</li>
      </ol>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>Documentation:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Learn more at <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32', fontWeight: 600 }}>modelcontextprotocol.io</a>
        </p>
      </div>
    </>
  )
}
