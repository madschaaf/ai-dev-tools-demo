export default function VSCodeExtensionsCheckpoint({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  return (
    <>
      <div style={{
        padding: 'var(--space-4)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 'var(--radius-lg)',
        color: 'white',
        marginBottom: 'var(--space-4)'
      }}>
        <h2 style={{ margin: 0, color: 'white', fontSize: '1.75rem' }}>✓ Checkpoint: VS Code Extensions</h2>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '1rem', opacity: 0.95 }}>
          Great progress! You now have all the essential VS Code extensions installed. Let's review the AI-powered extensions you have access to in your IDE.
        </p>
      </div>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-4)' }}>
        <strong>You now have these AI extensions in VS Code:</strong>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Code Generation & Assistance</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>GitHub Copilot</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          AI-powered code completion and suggestions as you type
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Start typing code and Copilot will suggest completions. Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Tab</kbd> to accept suggestions.
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Writing boilerplate code, function implementations, tests, and documentation
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>eBay Cline</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          eBay's internal AI coding assistant with plan-and-execute capabilities
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Open the Cline panel in VS Code sidebar and describe what you want to build
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Breaking down complex features, multi-file changes, refactoring projects
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Workflow & Documentation</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>Obsidian</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          GitHub workflow app for managing pull requests and issues
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Access through GitHub Enterprise in your browser
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> PR reviews, issue tracking, team collaboration
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>AI Use Case Form Extension</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          eBay's internal tool to document and submit your AI workflow use cases
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> The extension automatically identifies AI usage in your repo and helps you fill out use case forms
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Submitting AI workflows to AI Essentials for review, documenting AI tool usage, compliance tracking
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Features:</strong> Auto-fills required fields, detects AI patterns in your code, streamlines approval process
        </p>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Pro Tip: Combining Extensions</strong>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li><strong>Quick edits:</strong> Use GitHub Copilot for inline suggestions</li>
          <li><strong>Complex features:</strong> Use eBay Cline to plan and execute multi-file changes</li>
          <li><strong>Documentation:</strong> Use AI Use Case Form extension to track and document your AI workflow</li>
          <li><strong>Team collaboration:</strong> Use Obsidian for PR reviews and issue management</li>
        </ul>
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>⚠️ Remember:</strong> When using AI tools, always follow eBay's Responsible AI guidelines. Use the AI Use Case Form extension to properly document your workflows and submit them for review.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>Continue to the Configuration section to set up MCP servers and VS Code settings. Your IDE is now fully equipped with AI-powered tools!</p>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {!isCompleted ? (
            <button
              type="button"
              onClick={onComplete}
              style={{
                fontSize: '1rem',
                padding: '12px 24px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Mark as Complete
            </button>
          ) : (
            <div style={{ color: '#28a745', fontWeight: 600, fontSize: '1.1rem' }}>
              ✓ Step Completed
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          style={{
            fontSize: '1rem',
            padding: '12px 24px',
            background: '#0969da',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          Next Step →
        </button>
      </div>
    </>
  )
}
