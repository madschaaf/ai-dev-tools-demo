export default function FinalAICheckpoint({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  return (
    <>
      <div style={{
        padding: 'var(--space-4)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 'var(--radius-lg)',
        color: 'white',
        marginBottom: 'var(--space-4)'
      }}>
        <h2 style={{ margin: 0, color: 'white', fontSize: '1.75rem' }}>✓ Checkpoint: Your Complete AI Toolkit</h2>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '1rem', opacity: 0.95 }}>
          Congratulations! You've completed your AI development setup. Let's review the powerful AI tools you now have at your fingertips.
        </p>
      </div>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-4)' }}>
        <strong>🎉 You're All Set!</strong> You now have a complete AI-powered development environment ready to boost your productivity.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>MCP Servers - Your AI's Superpowers</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          <strong>Model Context Protocol (MCP)</strong> servers connect your AI assistants to eBay's tools and services, giving them the ability to:
        </p>
        <ul style={{ margin: 0, fontSize: '0.9rem' }}>
          <li><strong>Access GitHub:</strong> Read repos, create PRs, manage issues</li>
          <li><strong>Query Jira:</strong> Search tickets, update status, create tasks</li>
          <li><strong>Search Glean:</strong> Find internal docs and wiki pages</li>
          <li><strong>Browse Confluence:</strong> Access team documentation</li>
          <li><strong>Discover APIs:</strong> Explore eBay's internal services</li>
        </ul>
        <div style={{ marginTop: '12px', padding: '12px', background: 'white', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-blue-500)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-neutral-700)' }}>
            Example: Ask Cline with MCP
          </div>
          <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)' }}>
            "Show me all my assigned Jira tickets and create a PR to close the highest priority one"
          </code>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>AI Tools in Slack</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)', marginBottom: '8px' }}>HubGPT - Your eBay Search Assistant</h4>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          HubGPT searches across all eBay Slack channels, documentation, and resources to help you find information instantly.
        </p>
        <div style={{ background: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-blue-500)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-neutral-700)' }}>
            Try asking HubGPT:
          </div>
          <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)', display: 'block', marginBottom: '8px' }}>
            "What's the latest MCP server update?"
          </code>
          <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)', display: 'block' }}>
            "Summarize discussions in #ai-news-and-insights this week"
          </code>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Message <code>@HubGPT</code> in any Slack channel or visit #community-hubgpt
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-blue-700)', marginBottom: '8px' }}>Slackbox - Slack Feature Help</h4>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
          Slackbox helps you learn and use Slack features more effectively.
        </p>
        <div style={{ background: 'white', padding: '12px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-blue-500)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-neutral-700)' }}>
            Ask Slackbox things like:
          </div>
          <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)', display: 'block', marginBottom: '8px' }}>
            "How do I create custom emoji reactions?"
          </code>
          <code style={{ fontSize: '0.9rem', color: 'var(--color-neutral-900)', display: 'block' }}>
            "How can I set up Do Not Disturb hours?"
          </code>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          <strong>How to use:</strong> Message <code>@Slackbox</code> in Slack
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Your Complete AI Toolkit Summary</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-blue-500)' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>In Your Terminal</div>
          <ul style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li>Claude Code CLI</li>
          </ul>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-green-500)' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>In VS Code</div>
          <ul style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li>GitHub Copilot</li>
            <li>eBay Cline + MCPs</li>
            <li>Obsidian</li>
            <li>AI Use Case Form</li>
          </ul>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-yellow-500)' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>In Your Browser</div>
          <ul style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li>ChatGPT Enterprise</li>
            <li>Claude AI</li>
            <li>Google Gemini Pro</li>
            <li>Glean Search</li>
          </ul>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>In Slack</div>
          <ul style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px' }}>
            <li>HubGPT</li>
            <li>Slackbox</li>
            <li>14 AI Channels</li>
          </ul>
        </div>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Pro Tip: Use the Right Tool for the Task</strong>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li><strong>Quick code suggestions:</strong> GitHub Copilot</li>
          <li><strong>Complex multi-file features:</strong> eBay Cline with MCPs</li>
          <li><strong>Terminal automation:</strong> Claude Code CLI</li>
          <li><strong>eBay-specific searches:</strong> Glean or HubGPT</li>
          <li><strong>General research:</strong> ChatGPT or Gemini Pro</li>
        </ul>
      </div>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>⚠️ Remember Responsible AI:</strong> Always follow eBay's Responsible AI guidelines. Use the AI Use Case Form extension to document your workflows and submit them for review.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>You're Ready to Build!</h3>
      <p>Your AI-powered development environment is fully configured. You can now:</p>
      <ul>
        <li>✅ Write code faster with AI assistance</li>
        <li>✅ Access eBay tools through MCP servers</li>
        <li>✅ Search internal docs and channels with AI</li>
        <li>✅ Collaborate with the AI community on Slack</li>
        <li>✅ Stay updated on AI tools and best practices</li>
      </ul>

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
              ✓ Setup Complete!
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
