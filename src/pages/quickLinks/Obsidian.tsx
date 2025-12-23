export default function Obsidian() {
  const sections = [
    {
      title: 'Purpose',
      items: [
        'Capture runbooks, retro notes, and prompt recipes in one place',
        'Search across team knowledge without digging through chats',
        'Keep project context close to code for faster onboarding'
      ]
    },
    {
      title: 'Getting started',
      items: [
        'Follow the vault setup guide to sync the shared vault',
        'Use daily notes for quick breadcrumbs; link to PRs and tickets',
        'Tag entries for discovery (e.g., #frontend, #mcp, #a11y)'
      ]
    }
  ]

  return (
    <>
      <h2>Obsidian for engineering notes</h2>
      <p>Personal and team vaults for decision logs, how-tos, and prompt snippets.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3)' }}>
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

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-3)' }}>
        <a className="button" href="https://pages.github.corp.ebay.com/obsidian/docs/" target="_blank" rel="noreferrer">
          Open Obsidian
        </a>
        <a className="button ghost" href="https://github.corp.ebay.com/obsidian/claude-code-integration" target="_blank" rel="noreferrer">
          Open vault instructions
        </a>
      </div>
    </>
  )
}
