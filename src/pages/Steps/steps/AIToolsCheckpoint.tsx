export default function AIToolsCheckpoint({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  return (
    <>
      <div style={{
        padding: 'var(--space-4)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 'var(--radius-lg)',
        color: 'white',
        marginBottom: 'var(--space-4)'
      }}>
        <h2 style={{ margin: 0, color: 'white', fontSize: '1.75rem' }}>✓ Checkpoint: AI Tools Available</h2>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '1rem', opacity: 0.95 }}>
          Congratulations! You've completed the software installation steps. Let's review all the AI tools you now have access to help you with your development work.
        </p>
      </div>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-4)' }}>
        <strong>You now have access to these AI assistants:</strong>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Terminal AI Assistant</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>Claude Code CLI</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          AI coding assistant in your terminal
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Type <code>claude</code> in your terminal
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Writing code, debugging, explaining code, running terminal commands
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Documentation:</strong>{' '}
          <a href="https://platform.claude.com/login?returnTo=%2Fdocs%2Fen%2Fdocs%2Fclaude-code%2Foverview" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-700)' }}>
            Claude Code Docs
          </a>
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Browser AI Assistants</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>ChatGPT Extension</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          AI assistant available in your Chrome browser toolbar
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Click the ChatGPT icon in your Chrome toolbar
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Quick questions while browsing, context-aware help on web pages
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>ChatGPT Enterprise Website</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Full ChatGPT interface with your eBay enterprise account
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Visit{' '}
          <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-700)' }}>
            chat.openai.com
          </a>{' '}
          and sign in with eBay credentials
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Longer conversations, complex problem-solving, document analysis
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>Glean Extension</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          eBay-specific AI that searches internal documentation
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Click the Glean icon in your Chrome toolbar
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Finding eBay-specific documentation, internal wikis, team information
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>Glean Website</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Full Glean interface for searching eBay's knowledge base
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Visit{' '}
          <a href="https://app.glean.com/chat/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-700)' }}>
            app.glean.com/chat
          </a>{' '}
          and sign in with eBay credentials
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Deep searches of eBay documentation, finding team contacts, exploring codebases
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>Claude AI Website</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Claude AI in your browser (same as Claude Code CLI)
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Visit{' '}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-700)' }}>
            claude.ai
          </a>{' '}
          and sign in with eBay credentials
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Same as Claude Code CLI, but in browser - useful for non-terminal tasks
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Documentation:</strong>{' '}
          <a href="https://platform.claude.com/login?returnTo=%2Fdocs%2Fen%2Fdocs%2Fclaude-code%2Foverview" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-700)' }}>
            Claude Code Docs
          </a>
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)' }}>Google Gemini Pro</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Google's AI assistant with Pro version access through eBay
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Visit{' '}
          <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-700)' }}>
            gemini.google.com
          </a>{' '}
          and sign in with eBay credentials
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>Best for:</strong> Multimodal tasks, image analysis, long-context conversations, document processing
        </p>
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Pro Tip: Use the Right Tool for the Job</strong>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li><strong>Coding tasks:</strong> Use Claude Code CLI or Claude AI website</li>
          <li><strong>eBay-specific questions:</strong> Use Glean extension or website</li>
          <li><strong>General questions:</strong> Use ChatGPT or Google Gemini Pro</li>
          <li><strong>Image/document analysis:</strong> Use Google Gemini Pro for multimodal tasks</li>
          <li><strong>Quick help while browsing:</strong> Use the Chrome extensions</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>Now that you have your AI tools set up, proceed to Step 10 to configure proxy settings and set up access to GitHub and other eBay tools. Your AI assistants are ready to help if you get stuck!</p>

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
