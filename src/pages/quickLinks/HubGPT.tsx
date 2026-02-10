export default function HubGPT() {
  return (
    <>
      <h2>🤖 HubGPT - eBay's ChatGPT Enterprise</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
        HubGPT is eBay's secure, enterprise deployment of ChatGPT. It provides AI-powered assistance for development, 
        ideation, and problem-solving while keeping your data within eBay's control.
      </p>

      <div className="callout" style={{ background: '#dcfce7', borderColor: '#22c55e', color: '#065f46', marginBottom: 'var(--space-4)' }}>
        <strong>✅ Security First:</strong> HubGPT is designed for eBay internal use - safe for confidential code, designs, and business discussions. Your data never leaves eBay's infrastructure.
      </div>

      {/* What is HubGPT */}
      <div style={{ 
        background: 'var(--color-neutral-50)', 
        border: '2px solid var(--color-neutral-200)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-3) 0' }}>🎯 What is HubGPT?</h3>
        
        <p style={{ marginBottom: 'var(--space-2)' }}>
          HubGPT is eBay's enterprise ChatGPT deployment that provides:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-blue-700)' }}>🔒 Secure Environment</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              All conversations stay within eBay's infrastructure. Safe for code, architecture discussions, and business logic.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-green-700)' }}>💬 Multiple Interfaces</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Access via Slack (@HubGPT), web portal, or directly through VS Code with Claude Code and Cline.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-purple-700)' }}>🧠 Powerful Models</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Powered by Claude Sonnet 4.5 and other advanced AI models for development assistance.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-yellow-700)' }}>📚 eBay Context</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Searches across eBay documentation, Slack channels, and internal resources for relevant answers.
            </p>
          </div>
        </div>
      </div>

      {/* Why Use HubGPT */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>🚀 Why Use HubGPT?</h3>
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>🛡️ Security & Compliance</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Unlike public ChatGPT, HubGPT keeps all data within eBay. Safe to discuss proprietary code, architecture, and business logic.
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>💡 Development Assistance</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Get help with code reviews, debugging, architecture decisions, and implementation strategies - all with eBay context.
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>🔍 Search & Discovery</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Find information across Slack channels, documentation, and internal resources faster than manual searching.
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>⚡ Integration Ready</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Integrated with Claude Code, Cline, and other eBay development tools for seamless AI-powered workflows.
            </p>
          </div>
        </div>
      </div>

      {/* How to Access */}
      <div style={{ 
        padding: 'var(--space-4)', 
        background: '#e0f2fe', 
        borderRadius: 'var(--radius-lg)',
        border: '2px solid #0ea5e9',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-3) 0' }}>🔑 How to Access HubGPT</h3>
        
        <div style={{ display: 'grid', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: '#0c4a6e' }}>📱 Method 1: Slack (Easiest)</h4>
            <ol style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: '0.9rem', lineHeight: '1.8' }}>
              <li>Open any Slack channel or direct message</li>
              <li>Type <code>@HubGPT</code> followed by your question</li>
              <li>HubGPT will respond with relevant information</li>
              <li>Join <strong>#community-hubgpt</strong> for discussions and updates</li>
            </ol>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: '#0c4a6e' }}>🌐 Method 2: Web Portal</h4>
            <ol style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: '0.9rem', lineHeight: '1.8' }}>
              <li>Navigate to eBay's internal HubGPT portal</li>
              <li>Sign in with your eBay credentials</li>
              <li>Start a new conversation or continue existing ones</li>
              <li>Access saved conversations and chat history</li>
            </ol>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: '#0c4a6e' }}>💻 Method 3: VS Code Integration</h4>
            <ol style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: '0.9rem', lineHeight: '1.8' }}>
              <li>Install <strong>Claude Code</strong> or <strong>Cline</strong> extension</li>
              <li>Configure with HubGPT endpoint in VS Code settings</li>
              <li>Use AI assistance directly in your development workflow</li>
              <li>Get context-aware code suggestions and reviews</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>💼 Common Use Cases</h3>
        <div style={{ display: 'grid', gap: 'var(--space-2)', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>💻</span>
            <div>
              <strong>Code Review & Debugging:</strong> Get a second opinion on code quality, spot potential bugs, or understand complex logic
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>🏗️</span>
            <div>
              <strong>Architecture Planning:</strong> Discuss system design, evaluate trade-offs, and explore implementation approaches
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>📝</span>
            <div>
              <strong>Documentation:</strong> Generate technical documentation, API specs, or README files from code
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>🔍</span>
            <div>
              <strong>Information Discovery:</strong> Find eBay-specific information, API documentation, or team contacts
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>🐛</span>
            <div>
              <strong>Troubleshooting:</strong> Debug issues, understand error messages, or find solutions to common problems
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>🎨</span>
            <div>
              <strong>Frontend Development:</strong> Get help with React components, CSS styling, or accessibility implementations
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>🧪</span>
            <div>
              <strong>Test Generation:</strong> Create unit tests, integration tests, or test scenarios for your code
            </div>
          </div>
        </div>
      </div>

      {/* Example Prompts */}
      <div style={{ 
        background: '#fef3c7',
        border: '2px solid #fbbf24',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-3) 0' }}>💡 Example HubGPT Prompts</h3>
        
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid #fbbf24' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#92400e' }}>🔍 Finding Information:</strong>
            <code style={{ display: 'block', fontSize: '0.85rem', background: '#fef3c7', padding: '8px', borderRadius: '4px' }}>
              "Which Slack channels should I join for frontend development at eBay?"
            </code>
          </div>

          <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid #fbbf24' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#92400e' }}>💻 Code Review:</strong>
            <code style={{ display: 'block', fontSize: '0.85rem', background: '#fef3c7', padding: '8px', borderRadius: '4px' }}>
              "Review this React component for accessibility issues and suggest ARIA attributes"
            </code>
          </div>

          <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid #fbbf24' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#92400e' }}>🏗️ Architecture:</strong>
            <code style={{ display: 'block', fontSize: '0.85rem', background: '#fef3c7', padding: '8px', borderRadius: '4px' }}>
              "What are the pros and cons of using Context API vs Redux for state management in our app?"
            </code>
          </div>

          <div style={{ background: 'white', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid #fbbf24' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#92400e' }}>🐛 Debugging:</strong>
            <code style={{ display: 'block', fontSize: '0.85rem', background: '#fef3c7', padding: '8px', borderRadius: '4px' }}>
              "I'm getting a 'Cannot read property of undefined' error. Here's my code... [paste code]"
            </code>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div style={{ 
        background: '#e0e7ff', 
        border: '2px solid #6366f1',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>⭐ Best Practices</h3>
        <ul style={{ paddingLeft: 'var(--space-4)', lineHeight: '1.8', marginBottom: 'var(--space-2)' }}>
          <li><strong>Be Specific:</strong> Provide context, code snippets, and clear questions for better responses</li>
          <li><strong>Iterate:</strong> Refine your prompts based on responses - HubGPT learns from conversation context</li>
          <li><strong>Use Threads:</strong> Keep related conversations in the same thread for continuity</li>
          <li><strong>Verify Responses:</strong> Always validate AI-generated code and suggestions before implementation</li>
          <li><strong>Share Knowledge:</strong> Post helpful HubGPT interactions in #community-hubgpt for the team</li>
        </ul>
        
        <div className="callout" style={{ background: '#fef3c7', borderColor: '#fbbf24', color: '#92400e', marginTop: 'var(--space-2)' }}>
          <strong>💡 Pro Tip:</strong> Create dedicated conversations for different projects. HubGPT maintains context within each conversation, making it easier to have ongoing project discussions!
        </div>
      </div>

      {/* Technical Integration */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>🔧 Technical Integration</h3>
        <p style={{ marginBottom: 'var(--space-2)' }}>
          HubGPT can be integrated directly into your development tools:
        </p>
        
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-2)' }}>
          <h4 style={{ fontSize: '0.95rem', margin: '0 0 var(--space-1) 0' }}>API Endpoint</h4>
          <code style={{ fontSize: '0.85rem', display: 'block', padding: '8px', background: 'white', borderRadius: '4px' }}>
            https://platformgateway2.vip.ebay.com/hubgptgatewaysvc/v1/anthropic
          </code>
        </div>

        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ fontSize: '0.95rem', margin: '0 0 var(--space-1) 0' }}>Model Name</h4>
          <code style={{ fontSize: '0.85rem', display: 'block', padding: '8px', background: 'white', borderRadius: '4px' }}>
            hubgpt-chat-completions-claude-sonnet-4-5
          </code>
        </div>

        <p style={{ marginTop: 'var(--space-2)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
          These settings are pre-configured in Claude Code and Cline when following the setup guides in this tool.
        </p>
      </div>

      {/* Resources */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>📚 Resources</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ 
            padding: 'var(--space-3)', 
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-md)',
            background: 'white'
          }}>
            <h4 style={{ margin: '0 0 var(--space-1) 0', fontSize: '1rem' }}>💬 Slack Community</h4>
            <p style={{ margin: '0 0 var(--space-2) 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
              Join the HubGPT community channel
            </p>
            <a 
              href="https://ebay.enterprise.slack.com/archives/C05RY7Z9EF7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="button ghost"
              style={{ width: '100%' }}
            >
              #community-hubgpt
            </a>
          </div>
          
          <div style={{ 
            padding: 'var(--space-3)', 
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-md)',
            background: 'white'
          }}>
            <h4 style={{ margin: '0 0 var(--space-1) 0', fontSize: '1rem' }}>📖 Documentation</h4>
            <p style={{ margin: '0 0 var(--space-2) 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
              Onboarding process and guides
            </p>
            <a 
              href="https://wiki.corp.ebay.com/pages/viewpage.action?spaceKey=innovation&title=HubGPT+Platform+Assistant+Onboarding+Process" 
              target="_blank" 
              rel="noopener noreferrer"
              className="button ghost"
              style={{ width: '100%' }}
            >
              Wiki Documentation
            </a>
          </div>
          
          <div style={{ 
            padding: 'var(--space-3)', 
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-md)',
            background: 'white'
          }}>
            <h4 style={{ margin: '0 0 var(--space-1) 0', fontSize: '1rem' }}>🛠️ Development Setup</h4>
            <p style={{ margin: '0 0 var(--space-2) 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
              Configure VS Code integration
            </p>
            <a 
              href="/#/sandbox" 
              className="button ghost"
              style={{ width: '100%' }}
            >
              Setup Guides
            </a>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div style={{ 
        background: '#dcfce7',
        border: '2px solid #22c55e',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>🚀 Quick Start</h3>
        <ol style={{ paddingLeft: 'var(--space-4)', lineHeight: '2', marginBottom: 'var(--space-3)' }}>
          <li>Open Slack and type <code>@HubGPT</code> in any channel</li>
          <li>Ask a question like "How do I deploy to production at eBay?"</li>
          <li>Review the response and refine your question if needed</li>
          <li>Join <strong>#community-hubgpt</strong> to learn from others</li>
          <li>For VS Code integration, follow the Claude Code or Cline setup guides</li>
        </ol>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <a className="button" href="https://ebay.enterprise.slack.com/archives/C05RY7Z9EF7" target="_blank" rel="noopener noreferrer">
            Join #community-hubgpt →
          </a>
          <a className="button ghost" href="https://wiki.corp.ebay.com/pages/viewpage.action?spaceKey=innovation&title=HubGPT+Platform+Assistant+Onboarding+Process" target="_blank" rel="noopener noreferrer">
            Read Documentation
          </a>
        </div>
      </div>
    </>
  )
}
