export default function V0() {
  return (
    <>
      <h2>🎨 Vercel V0 - AI-Powered UI Generation</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
        V0 is Vercel's AI-powered tool that generates <strong>copy-and-paste friendly React code</strong> from text prompts. 
        It creates shadcn/ui and Tailwind CSS components that you can use directly in your projects.
      </p>

      <div className="callout" style={{ background: '#e0f2fe', borderColor: '#0ea5e9', color: '#0c4a6e', marginBottom: 'var(--space-4)' }}>
        <strong>💡 What makes V0 unique:</strong> Unlike other AI tools that generate complete apps, V0 focuses on creating production-ready, customizable UI components that integrate seamlessly with modern React workflows.
      </div>

      {/* Key Features */}
      <div style={{ 
        background: 'var(--color-neutral-50)', 
        border: '2px solid var(--color-neutral-200)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-3) 0' }}>✨ Key Features</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-blue-700)' }}>🎯 Text-to-UI</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Describe your UI in plain English and V0 generates React components with shadcn/ui and Tailwind CSS
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-green-700)' }}>📋 Copy-Paste Ready</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Generated code is production-ready and can be copied directly into your codebase
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-purple-700)' }}>🔄 Iterative Refinement</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Refine generated components with follow-up prompts to get exactly what you need
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0', color: 'var(--color-yellow-700)' }}>🎨 Modern Stack</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Built on shadcn/ui components, Tailwind CSS, and React best practices
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>🚀 Common Use Cases</h3>
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>Dashboard Components</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Generate charts, tables, cards, and analytics views for admin dashboards
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>Form Layouts</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Create complex forms with validation, multi-step flows, and custom inputs
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>Landing Pages</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Build hero sections, feature grids, pricing tables, and CTAs quickly
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
            color: 'white',
            padding: 'var(--space-3)', 
            borderRadius: 'var(--radius-md)'
          }}>
            <strong>Component Libraries</strong>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Generate reusable UI components that match your design system
            </p>
          </div>
        </div>
      </div>

      {/* How to Use V0 */}
      <div style={{ 
        padding: 'var(--space-4)', 
        background: '#fef3c7', 
        borderRadius: 'var(--radius-lg)',
        border: '2px solid #fbbf24',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-3) 0' }}>📖 How to Use V0</h3>
        
        <ol style={{ paddingLeft: 'var(--space-4)', lineHeight: '2' }}>
          <li>
            <strong>Access V0:</strong> Sign in with your Vercel account at <a href="https://v0.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#0c4a6e' }}>v0.dev</a>
          </li>
          <li>
            <strong>Describe Your UI:</strong> Write a prompt describing what you want (e.g., "Create a user profile card with avatar, name, bio, and social links")
          </li>
          <li>
            <strong>Review Generated Code:</strong> V0 will generate multiple variations - pick the one that fits best
          </li>
          <li>
            <strong>Refine & Iterate:</strong> Use follow-up prompts to adjust colors, layout, functionality, or add features
          </li>
          <li>
            <strong>Copy to Your Project:</strong> Click "Copy Code" and paste into your React/Next.js project
          </li>
          <li>
            <strong>Install Dependencies:</strong> V0 lists required packages - run the npm/yarn commands it provides
          </li>
        </ol>
      </div>

      {/* Pro Tips */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>💡 Pro Tips for Better Results</h3>
        <div style={{ display: 'grid', gap: 'var(--space-2)', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>✅</span>
            <div>
              <strong>Be Specific:</strong> Include details about layout, colors, interactive elements, and data structure
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>✅</span>
            <div>
              <strong>Mention Framework:</strong> Specify if you're using Next.js, React, or specific libraries
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>✅</span>
            <div>
              <strong>Reference Examples:</strong> Say "like [existing site/app]" to guide the style
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>✅</span>
            <div>
              <strong>Iterate in Steps:</strong> Start simple, then add complexity with follow-up prompts
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span>✅</span>
            <div>
              <strong>Test Locally:</strong> Always test generated code in your environment before committing
            </div>
          </div>
        </div>
      </div>

      {/* Integration with eBay Workflow */}
      <div style={{ 
        background: '#e0e7ff', 
        border: '2px solid #6366f1',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>🔗 Using V0 at eBay</h3>
        <p style={{ marginBottom: 'var(--space-2)' }}>
          V0 can accelerate UI development for internal tools, prototypes, and customer-facing features:
        </p>
        <ul style={{ paddingLeft: 'var(--space-4)', lineHeight: '1.8', marginBottom: 'var(--space-2)' }}>
          <li>Generate admin dashboard components that match eBay design guidelines</li>
          <li>Create prototype UIs for stakeholder demos and user testing</li>
          <li>Build internal tools with modern, accessible interfaces</li>
          <li>Accelerate frontend development by starting with AI-generated scaffolding</li>
        </ul>
        <div className="callout" style={{ background: '#fef3c7', borderColor: '#fbbf24', color: '#92400e', marginTop: 'var(--space-2)' }}>
          <strong>⚠️ Security Note:</strong> Review all generated code before using in production. Ensure it meets eBay's security standards and accessibility requirements.
        </div>
      </div>

      {/* Resources */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>📚 Learning Resources</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ 
            padding: 'var(--space-3)', 
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-md)',
            background: 'white'
          }}>
            <h4 style={{ margin: '0 0 var(--space-1) 0', fontSize: '1rem' }}>📺 Video Guide</h4>
            <p style={{ margin: '0 0 var(--space-2) 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
              Watch the eBay-specific V0 overview
            </p>
            <a 
              href="https://www.loom.com/share/c698527d7b354c918b4730696616aff2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="button ghost"
              style={{ width: '100%' }}
            >
              Watch Loom Video
            </a>
          </div>
          
          <div style={{ 
            padding: 'var(--space-3)', 
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-md)',
            background: 'white'
          }}>
            <h4 style={{ margin: '0 0 var(--space-1) 0', fontSize: '1rem' }}>💬 Community</h4>
            <p style={{ margin: '0 0 var(--space-2) 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
              Join the conversation in Slack
            </p>
            <a 
              href="https://ebay-eng.slack.com/archives/C098FLELMS8/p1755015499579639" 
              target="_blank" 
              rel="noopener noreferrer"
              className="button ghost"
              style={{ width: '100%' }}
            >
              Join Slack Channel
            </a>
          </div>
          
          <div style={{ 
            padding: 'var(--space-3)', 
            border: '1px solid var(--color-neutral-300)',
            borderRadius: 'var(--radius-md)',
            background: 'white'
          }}>
            <h4 style={{ margin: '0 0 var(--space-1) 0', fontSize: '1rem' }}>📖 Official Docs</h4>
            <p style={{ margin: '0 0 var(--space-2) 0', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
              Vercel's official V0 documentation
            </p>
            <a 
              href="https://v0.dev/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="button ghost"
              style={{ width: '100%' }}
            >
              Read Docs
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
          <li>Visit <a href="https://v0.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#15803d', fontWeight: 600 }}>v0.dev</a></li>
          <li>Sign in with your Vercel account (create one if needed)</li>
          <li>Try a simple prompt: "Create a contact form with name, email, and message fields"</li>
          <li>Review the generated code and copy it to test locally</li>
          <li>Join the eBay Slack channel to share tips and get help</li>
        </ol>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <a className="button" href="https://v0.dev" target="_blank" rel="noopener noreferrer">
            Launch V0 →
          </a>
          <a className="button ghost" href="https://www.loom.com/share/c698527d7b354c918b4730696616aff2" target="_blank" rel="noopener noreferrer">
            Watch Tutorial
          </a>
          <a className="button ghost" href="https://ebay-eng.slack.com/archives/C098FLELMS8/p1755015499579639" target="_blank" rel="noopener noreferrer">
            Ask Questions in Slack
          </a>
        </div>
      </div>
    </>
  )
}
