export default function GitHubEnterprise() {
  const handleCopyCommand = (command: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(command)
    }
  }

  const sshSteps = [
    {
      title: 'Step 1: Check for Existing Keys',
      command: 'ls -la ~/.ssh',
      description: 'Look for id_ed25519 and id_ed25519.pub files. If they exist, skip to Step 5.'
    },
    {
      title: 'Step 2: Create a New SSH Key',
      command: 'ssh-keygen -t ed25519 -C "your_email@ebay.com"',
      notes: ['Press Enter to accept the default file path', 'Enter a strong passphrase when prompted']
    },
    {
      title: 'Step 3: Start SSH Agent and Add Your Key',
      commands: ['eval "$(ssh-agent -s)"', 'ssh-add ~/.ssh/id_ed25519'],
      critical: '⚠️ CRITICAL: Type these directly into terminal—pasting can cause issues'
    },
    {
      title: 'Step 4: Copy Your Public Key',
      command: 'cat ~/.ssh/id_ed25519.pub',
      description: 'Copy the entire output starting with ssh-ed25519'
    },
    {
      title: 'Step 5: Add SSH Key to GitHub Enterprise',
      uiSteps: [
        'Go to github.corp.ebay.com',
        'Click your profile picture (top-right) → Settings',
        'Click "SSH and GPG keys" in the left menu',
        'Click "New SSH key", add a title (e.g., "Work Laptop")',
        'Paste your public key and save'
      ]
    },
    {
      title: 'Step 6: Verify Your Connection',
      command: 'ssh -T git@github.corp.ebay.com',
      description: 'Success: "Hi <username>! You\'ve successfully authenticated, but GitHub does not provide shell access."'
    }
  ]

  const workflowBestPractices = [
    {
      category: 'Branching & PRs',
      items: [
        'Create branches for features and fixes',
        'Open PRs early to get feedback faster',
        'Request reviewers and link related Jira tickets',
        'Use draft PRs to share work-in-progress'
      ]
    },
    {
      category: 'CI/CD',
      items: [
        'Actions run automatically on every PR',
        'All check runs must be green before merge',
        'Fix failing tests before requesting review'
      ]
    },
    {
      category: 'Development Environment',
      items: [
        'Use Codespaces for quick cloud-based setups',
        'Use Remote Repos to work without cloning'
      ]
    },
    {
      category: 'Code Quality',
      items: [
        'Follow accessibility review guidance for UI changes',
        'Keep PRs small and focused (one feature per PR)',
        'Link PRs to Jira tickets in the description'
      ]
    }
  ]

  return (
    <>
      <h2>GitHub at eBay</h2>
      <p>PRs, code review, Actions, and Codespaces/remote repos for quick spins.</p>

      <section style={{ marginTop: 'var(--space-4)' }}>
        <h3>SSH Setup for GitHub Enterprise</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {sshSteps.map((step, idx) => (
            <div key={idx} style={{ borderLeft: '3px solid var(--color-neutral-300)', paddingLeft: 'var(--space-3)' }}>
              <h4 style={{ margin: '0 0 var(--space-2) 0' }}>{step.title}</h4>
              
              {step.command && (
                <div style={{ marginBottom: 'var(--space-2)' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    backgroundColor: '#1e1e1e',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    color: '#00ff00'
                  }}>
                    <code style={{ flex: 1, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {step.command}
                    </code>
                    <button
                      onClick={() => handleCopyCommand(step.command)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#00ff00',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '4px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: '40px',
                        justifyContent: 'center'
                      }}
                      title="Copy command"
                    >
                      📋
                    </button>
                  </div>
                </div>
              )}

              {step.commands && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  {step.commands.map((cmd, cmdIdx) => (
                    <div key={cmdIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      backgroundColor: '#1e1e1e',
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      color: '#00ff00'
                    }}>
                      <code style={{ flex: 1, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {cmd}
                      </code>
                      <button
                        onClick={() => handleCopyCommand(cmd)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#00ff00',
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: '4px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          minWidth: '40px',
                          justifyContent: 'center'
                        }}
                        title="Copy command"
                      >
                        📋
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {step.description && (
                <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '14px', color: 'var(--color-neutral-600)' }}>
                  {step.description}
                </p>
              )}

              {step.notes && (
                <ul style={{ margin: 'var(--space-2) 0 0 0', paddingLeft: 'var(--space-3)' }}>
                  {step.notes.map((note, noteIdx) => (
                    <li key={noteIdx} style={{ fontSize: '14px', color: 'var(--color-neutral-600)' }}>
                      {note}
                    </li>
                  ))}
                </ul>
              )}

              {step.critical && (
                <p style={{ margin: 'var(--space-2) 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>
                  {step.critical}
                </p>
              )}

              {step.uiSteps && (
                <ol style={{ margin: 'var(--space-2) 0 0 0', paddingLeft: 'var(--space-3)' }}>
                  {step.uiSteps.map((uiStep, uiIdx) => (
                    <li key={uiIdx} style={{ fontSize: '14px', color: 'var(--color-neutral-600)' }}>
                      {uiStep}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 'var(--space-4)' }}>
        <h3>GitHub Workflow Best Practices</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          {workflowBestPractices.map((practice, idx) => (
            <div key={idx} style={{
              padding: 'var(--space-3)',
              backgroundColor: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-neutral-200)'
            }}>
              <h4 style={{ margin: '0 0 var(--space-2) 0' }}>{practice.category}</h4>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', color: 'var(--color-neutral-600)' }}>
                {practice.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ fontSize: '14px', marginBottom: 'var(--space-1)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        <a className="button" href="https://github.corp.ebay.com/" target="_blank" rel="noreferrer">
          Open GitHub Enterprise
        </a>
        <a className="button ghost" href="https://github.corp.ebay.com/DevGenAI/global-ai-context/blob/main/domains/frontend/accessibility/a11y-code-review/ACCESSIBILITY_CODE_REVIEW.md" target="_blank" rel="noreferrer">
          View A11y review guide
        </a>
      </div>
    </>
  )
}
