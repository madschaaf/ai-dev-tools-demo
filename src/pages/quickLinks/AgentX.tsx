export default function AgentX() {
  return (
    <>
      <h2>🤖 Agent X - eBay's AI Agent Framework</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
        Agent X is eBay's powerful AI agent framework designed to help developers build and deploy intelligent agents for various automation and development tasks.
      </p>

      {/* What is Agent X Section */}
      <div style={{ 
        marginBottom: 'var(--space-4)', 
        padding: 'var(--space-4)', 
        background: '#e3f2fd', 
        borderRadius: 'var(--radius-lg)',
        border: '2px solid #90caf9'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>What is Agent X?</h3>
        <p style={{ marginBottom: 'var(--space-2)' }}>
          Agent X is a comprehensive framework that enables developers to create custom AI agents that can:
        </p>
        <ul style={{ marginLeft: 'var(--space-3)', lineHeight: '1.8' }}>
          <li>Automate complex development workflows</li>
          <li>Integrate with eBay's internal systems and APIs</li>
          <li>Process and analyze large amounts of data</li>
          <li>Make intelligent decisions based on context</li>
          <li>Orchestrate multi-step tasks autonomously</li>
        </ul>
      </div>

      {/* Key Features */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: 'var(--space-3)', 
        marginBottom: 'var(--space-4)' 
      }}>
        <div style={{ 
          padding: 'var(--space-3)', 
          background: 'var(--color-neutral-50)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-neutral-200)'
        }}>
          <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0' }}>🔧 Framework Features</h4>
          <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li>Pre-built agent templates</li>
            <li>Extensible architecture</li>
            <li>Built-in error handling</li>
            <li>Monitoring and logging</li>
          </ul>
        </div>
        
        <div style={{ 
          padding: 'var(--space-3)', 
          background: 'var(--color-neutral-50)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-neutral-200)'
        }}>
          <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0' }}>🔌 Integration Options</h4>
          <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li>MCP server integration</li>
            <li>REST API support</li>
            <li>GitHub workflow automation</li>
            <li>JIRA and ServiceNow connectors</li>
          </ul>
        </div>
      </div>

      {/* Use Cases */}
      <div style={{ 
        marginBottom: 'var(--space-4)',
        padding: 'var(--space-4)', 
        background: '#f3e5f5', 
        borderRadius: 'var(--radius-lg)',
        border: '2px solid #ce93d8'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>💡 Common Use Cases</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--space-2)',
          fontSize: '0.9rem'
        }}>
          <div>
            <strong>Code Review Automation:</strong>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-neutral-700)' }}>
              Automatically review PRs and suggest improvements
            </p>
          </div>
          <div>
            <strong>Documentation Generation:</strong>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-neutral-700)' }}>
              Create and update technical documentation
            </p>
          </div>
          <div>
            <strong>Issue Triage:</strong>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-neutral-700)' }}>
              Categorize and prioritize JIRA tickets
            </p>
          </div>
          <div>
            <strong>Test Generation:</strong>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-neutral-700)' }}>
              Generate unit and integration tests
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div style={{ 
        marginBottom: 'var(--space-4)',
        padding: 'var(--space-3)', 
        background: '#fff3cd', 
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #ffeaa7'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>🚀 Getting Started</h3>
        <ol style={{ fontSize: '0.95rem', lineHeight: '1.8', paddingLeft: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <li>Read the Agent X documentation on GitHub</li>
          <li>Review example agent implementations</li>
          <li>Set up your development environment</li>
          <li>Clone the Agent X repository</li>
          <li>Follow the quick start guide to build your first agent</li>
        </ol>
      </div>

      {/* Resources */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-3)', 
        flexWrap: 'wrap',
        marginBottom: 'var(--space-3)'
      }}>
        <a 
          className="button" 
          href="https://github.corp.ebay.com/CoreAI/agent-x/blob/main/README.md" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          📖 Agent X Documentation
        </a>
        <a 
          className="button ghost" 
          href="https://github.corp.ebay.com/CoreAI/agent-x" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View on GitHub Enterprise
        </a>
      </div>

      {/* Help and Support */}
      <div className="callout" style={{ 
        background: '#e3f2fd', 
        borderColor: '#90caf9', 
        color: '#0d47a1' 
      }}>
        <strong>💬 Need Help?</strong>
        <p style={{ margin: '0.5rem 0 0 0' }}>
          Join the <strong>#ai-dev-tools</strong> Slack channel for Agent X support and community discussions.
        </p>
      </div>
    </>
  )
}
