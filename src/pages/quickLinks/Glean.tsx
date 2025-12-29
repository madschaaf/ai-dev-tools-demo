export default function Glean() {
  return (
    <>
      <h2>Glean at eBay</h2>
      <p>Glean is your enterprise search engine, indexing content across Jira, Confluence, Slack, GitHub, and more. Find documents, people, and conversations instantly.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Key Features</h3>
      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Search across all connected tools in one place</li>
        <li>Use natural language queries for better results</li>
        <li>Save frequent searches and get personalized recommendations</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Glean MCP Server Integration</h3>
      <p>You can integrate Glean with AI assistants like Cline and Claude Code using the Glean Agent MCP Server. This allows AI to search and retrieve information from Glean on your behalf.</p>

      <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
        <li>Enable AI assistants to search your enterprise knowledge base</li>
        <li>Automatically retrieve relevant documentation and context</li>
        <li>Connect to Jira, Confluence, GitHub, and other tools through Glean</li>
      </ul>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://app.glean.com/" target="_blank" rel="noopener noreferrer">
          Open Glean
        </a>
        <a className="button ghost" href="https://wiki.corp.ebay.com/pages/viewpage.action?spaceKey=EbayFinancialServices&title=Glean+Agent+MCP+Server" target="_blank" rel="noopener noreferrer">
          Glean MCP Wiki
        </a>
        <a className="button ghost" href="https://github.corp.ebay.com/efs-platform/mcp-gleanagent/blob/main/README.md" target="_blank" rel="noopener noreferrer">
          MCP Server GitHub
        </a>
      </div>
    </>
  )
}
