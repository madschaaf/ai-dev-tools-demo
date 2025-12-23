export default function Cline() {
  const handleCopyCommand = (command: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(command)
    }
  }

  const steps = [
    {
      title: 'Before you install',
      content: 'Request local admin access on your computer so you can add a proxy'
    },
    {
      title: 'Installation steps',
      items: [
        { text: 'Visit the Cline releases page' },
        { text: 'Download the latest .vsix file' },
        { text: 'In VS Code, open the Extensions panel', command: 'Cmd+Shift+X' },
        { text: 'Click the three dots (•••) at the top of the Extensions panel' },
        { text: 'Select "Install from VSIX..." and choose the downloaded file' }
      ]
    }
  ]

  const features = [
    'AI coding agent that can edit files, run commands, and use tools',
    'eBay-customized version with internal tool integrations',
    'Works alongside GitHub Copilot for complex multi-file tasks'
  ]

  return (
    <>
      <h2>Installing Cline (eBay Custom)</h2>
      <p>Cline is an AI coding agent customized for eBay workflows. Since it's an internal extension, you'll need to install it manually from a VSIX file.</p>

      <section style={{ marginTop: 'var(--space-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ borderLeft: '3px solid var(--color-neutral-300)', paddingLeft: 'var(--space-3)' }}>
              <h3 style={{ margin: '0 0 var(--space-2) 0' }}>{step.title}</h3>
              
              {step.content && (
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-neutral-600)' }}>
                  {step.content}
                </p>
              )}

              {step.items && (
                <ol style={{ margin: 'var(--space-2) 0 0 0', paddingLeft: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
                  {step.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ fontSize: '14px', marginBottom: 'var(--space-1)' }}>
                      <span>{item.text}</span>
                      {item.command && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          backgroundColor: '#1e1e1e',
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: 'var(--radius-md)',
                          fontFamily: 'monospace',
                          fontSize: '12px',
                          color: '#00ff00',
                          marginTop: 'var(--space-1)',
                          width: 'fit-content'
                        }}>
                          <code style={{ margin: 0 }}>{item.command}</code>
                          <button
                            onClick={() => handleCopyCommand(item.command)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#00ff00',
                              cursor: 'pointer',
                              fontSize: '14px',
                              padding: '2px 6px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Copy"
                          >
                            📋
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-4)' }}>
        <h3>What is Cline?</h3>
        <ul style={{ paddingLeft: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
          {features.map((feature, idx) => (
            <li key={idx} style={{ fontSize: '14px', marginBottom: 'var(--space-1)' }}>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://github.corp.ebay.com/DevGenAI/cline/releases" target="_blank" rel="noreferrer">
          Download Cline VSIX
        </a>
      </div>
    </>
  )
}
