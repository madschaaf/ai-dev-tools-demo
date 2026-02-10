export default function MCPServers() {
  const sections = [
    {
      title: 'Purpose',
      items: [
        'Give copilots narrow, auditable access to internal APIs and data',
        'Reduce prompt boilerplate by centralizing tool definitions and auth',
        'Keep secrets off prompts by using server-side credentials'
      ]
    },
    {
      title: 'How we use them here',
      items: [
        'Run the MCP Setup Wizard from the palette to generate configs',
        'Start the MCP server and point your copilot to it for richer context',
        'Commit shared configs so teammates can reuse the same tools'
      ]
    }
  ]

  return (
    <>
      <h2>MCP servers — what and why</h2>
      <p>They expose structured capabilities (search, data, tools) to your AI copilots so you can act on internal systems safely.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        {sections.map((section, idx) => (
          <div key={idx} style={{
            padding: 'var(--space-3)',
            backgroundColor: 'var(--color-neutral-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-neutral-200)'
          }}>
            <h3 style={{ margin: '0 0 var(--space-2) 0' }}>{section.title}</h3>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} style={{ fontSize: '14px', marginBottom: 'var(--space-1)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://pages.github.corp.ebay.com/DevGenAI/ebay-mcp/" target="_blank" rel="noreferrer">
          Open MCP Servers
        </a>
      </div>
    </>
  )
}
