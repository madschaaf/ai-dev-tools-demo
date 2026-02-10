export default function GlobalAIContext() {
  return (
    <>
      <h3>What is Global AI Context?</h3>
      <p>
        Global AI Context is eBay's central repository for AI workflows, automation templates, 
        and context management. Think of it as a shared library of proven AI development patterns 
        that you can reference and use in your own projects.
      </p>

      <h4>Key Features</h4>
      <ul>
        <li><strong>JIRA Automation Workflows</strong>: Complete workflows for automating JIRA ticket management, repository mapping, and multi-repo coordination</li>
        <li><strong>Cline Rules & Templates</strong>: Pre-configured rules and workflow templates for Cline AI agent development</li>
        <li><strong>MCP Server Configurations</strong>: Ready-to-use Model Context Protocol server setups for extending AI capabilities</li>
        <li><strong>Best Practices</strong>: Documented patterns for error handling, input validation, token monitoring, and monitoring infrastructure</li>
        <li><strong>Agent Checklists</strong>: Step-by-step guides for common development tasks with AI agents</li>
      </ul>

      <h4>What's Inside</h4>
      <div style={{ 
        backgroundColor: '#f9fafb', 
        padding: 'var(--space-3)', 
        borderRadius: 'var(--radius-md)', 
        marginBottom: 'var(--space-3)' 
      }}>
        <h5 style={{ marginTop: 0 }}>Workflows</h5>
        <ul style={{ marginBottom: 0 }}>
          <li><code>jira-workflow.md</code> - Complete JIRA ticket workflow automation</li>
          <li><code>repo-mapping.md</code> - Multi-repository coordination</li>
          <li><code>analyze-app.md</code> - Application analysis workflows</li>
          <li><code>analyze-logs.md</code> - Log analysis and issue detection</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#f9fafb', 
        padding: 'var(--space-3)', 
        borderRadius: 'var(--radius-md)', 
        marginBottom: 'var(--space-3)' 
      }}>
        <h5 style={{ marginTop: 0 }}>Enhancements</h5>
        <ul style={{ marginBottom: 0 }}>
          <li><code>workflow-error-handling.md</code> - Robust error recovery patterns</li>
          <li><code>input-sanitization.md</code> - Security and validation best practices</li>
          <li><code>token-monitoring.md</code> - Context management strategies</li>
          <li><code>monitoring-infrastructure.md</code> - Performance tracking</li>
        </ul>
      </div>

      <h4>How to Use</h4>
      <ol>
        <li><strong>Browse the Repository</strong>: Explore workflows and templates relevant to your task</li>
        <li><strong>Reference in Prompts</strong>: Point Cline or other AI agents to specific workflows using file paths</li>
        <li><strong>Customize for Your Needs</strong>: Adapt templates to your specific project requirements</li>
        <li><strong>Contribute Back</strong>: Share your own workflows and improvements with the community</li>
      </ol>

      <h4>Example Usage</h4>
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        padding: 'var(--space-3)', 
        borderRadius: 'var(--radius-md)',
        fontFamily: 'monospace',
        fontSize: '13px',
        marginBottom: 'var(--space-3)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Prompt Example:</p>
        <code>
          "Please execute the complete JIRA workflow for ticket SSTA-12345 <br/>
          following .cline/workflows/jira-workflow.md"
        </code>
      </div>

      <h4>Getting Started</h4>
      <p>
        Clone the repository and explore the <code>workflows/</code> directory to see available 
        automation patterns. Each workflow includes detailed documentation and step-by-step instructions.
      </p>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a 
          className="button" 
          href="https://github.corp.ebay.com/DevGenAI/global-ai-context" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          🔗 Open Global AI Context Repository
        </a>
      </div>

      <div style={{ 
        marginTop: 'var(--space-4)', 
        padding: 'var(--space-3)', 
        backgroundColor: '#fef3c7', 
        borderLeft: '4px solid var(--color-yellow-500)',
        borderRadius: 'var(--radius-md)'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          ⚡ <strong>Pro Tip:</strong> Reference these workflows in your Cline .clinerules directory 
          to automatically apply proven patterns to your development tasks. See the repository's 
          README for setup instructions.
        </p>
      </div>
    </>
  )
}
