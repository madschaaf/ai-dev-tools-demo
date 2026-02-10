export default function Obsidian() {
  return (
    <>
      <h2>⚠️ Which Obsidian Tool Do You Need?</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
        There are <strong>TWO different "Obsidian" tools</strong> available at eBay. Choose the one that fits your needs:
      </p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginBottom: 'var(--space-4)' }}>
        <strong>Important:</strong> These are completely different products with the same name. Make sure you're using the right one!
      </div>

      {/* Decision Tree */}
      <div style={{ 
        background: 'var(--color-neutral-50)', 
        border: '2px solid var(--color-neutral-200)', 
        borderRadius: 'var(--radius-lg)', 
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ margin: '0 0 var(--space-3) 0', textAlign: 'center' }}>🔍 Decision Tree: Which Tool Should I Use?</h3>
        
        <div style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
          <p style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>Do you want to...</p>
          
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>📝 Build a personal knowledge base?</strong>
              <div style={{ marginLeft: 'var(--space-3)', color: 'var(--color-neutral-700)' }}>
                → Use: <a href="#obsidian-notes" style={{ color: 'var(--color-blue-700)', fontWeight: 600 }}>Obsidian.md (Note-Taking App)</a>
              </div>
            </li>
            
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>🤖 Get AI help in GitHub PRs/Issues?</strong>
              <div style={{ marginLeft: 'var(--space-3)', color: 'var(--color-neutral-700)' }}>
                → Use: <a href="#obsidian-workflow" style={{ color: 'var(--color-blue-700)', fontWeight: 600 }}>Obsidian Workflow App (GitHub Bot)</a>
              </div>
            </li>
            
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <strong>🔄 Create automated workflows?</strong>
              <div style={{ marginLeft: 'var(--space-3)', color: 'var(--color-neutral-700)' }}>
                → Use: <a href="#obsidian-workflow" style={{ color: 'var(--color-blue-700)', fontWeight: 600 }}>Obsidian Workflow Dashboard</a>
              </div>
            </li>
            
            <li>
              <strong>📚 Document code patterns AND automate reviews?</strong>
              <div style={{ marginLeft: 'var(--space-3)', color: 'var(--color-neutral-700)' }}>
                → Use: <strong>Both!</strong> Notes in Obsidian.md, automation with Workflow App
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Tool Comparison Table */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3>Quick Comparison</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.9rem'
          }}>
            <thead>
              <tr style={{ background: 'var(--color-neutral-100)' }}>
                <th style={{ padding: 'var(--space-2)', textAlign: 'left', borderBottom: '2px solid var(--color-neutral-300)' }}>Feature</th>
                <th style={{ padding: 'var(--space-2)', textAlign: 'left', borderBottom: '2px solid var(--color-neutral-300)' }}>Obsidian Workflow App</th>
                <th style={{ padding: 'var(--space-2)', textAlign: 'left', borderBottom: '2px solid var(--color-neutral-300)' }}>Obsidian.md Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)', fontWeight: 600 }}>Purpose</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>AI coding assistant in GitHub</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>Personal knowledge management</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)', fontWeight: 600 }}>Where it lives</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>GitHub repos</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>Local app on your computer</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)', fontWeight: 600 }}>How you use it</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>@obsidian in PR comments</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>Write markdown notes</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)', fontWeight: 600 }}>Output</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>Code suggestions, PR reviews</td>
                <td style={{ padding: 'var(--space-2)', borderBottom: '1px solid var(--color-neutral-200)' }}>Personal documentation</td>
              </tr>
              <tr>
                <td style={{ padding: 'var(--space-2)', fontWeight: 600 }}>Integrates with</td>
                <td style={{ padding: 'var(--space-2)' }}>GitHub, Jira, MCP servers</td>
                <td style={{ padding: 'var(--space-2)' }}>MCP servers, Git, AI tools</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Obsidian Workflow App Section */}
      <div id="obsidian-workflow" style={{ 
        marginBottom: 'var(--space-4)', 
        padding: 'var(--space-4)', 
        background: '#e3f2fd', 
        borderRadius: 'var(--radius-lg)',
        border: '2px solid #90caf9'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>🤖 Obsidian Workflow App (GitHub Bot)</h3>
        <p><strong>What it does:</strong> AI-powered GitHub assistant that responds to @obsidian mentions in PRs and issues</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0' }}>Use Cases</h4>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', fontSize: '0.9rem' }}>
              <li>Code review automation</li>
              <li>PR description generation</li>
              <li>Bug triage and labeling</li>
              <li>Workflow automation</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0' }}>How to Use</h4>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', fontSize: '0.9rem' }}>
              <li>Type <code>@obsidian</code> in PR comment</li>
              <li>Use Dashboard UI for workflows</li>
              <li>Configure via MCP servers</li>
              <li>Compare with <code>@claude</code> bot</li>
            </ul>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-3)' }}>
          <a className="button" href="https://pages.github.corp.ebay.com/obsidian/docs/" target="_blank" rel="noopener noreferrer">
            Obsidian Workflow Docs
          </a>
          <a className="button ghost" href="/#/sandbox">
            Practice in AI Sandbox →
          </a>
        </div>
      </div>

      {/* Obsidian.md Section */}
      <div id="obsidian-notes" style={{ 
        padding: 'var(--space-4)', 
        background: '#f3e5f5', 
        borderRadius: 'var(--radius-lg)',
        border: '2px solid #ce93d8'
      }}>
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>📝 Obsidian.md (Note-Taking App)</h3>
        <p><strong>What it does:</strong> Local-first knowledge management app for personal notes and documentation</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0' }}>Use Cases</h4>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', fontSize: '0.9rem' }}>
              <li>Personal knowledge base</li>
              <li>Meeting notes & decisions</li>
              <li>Code snippet library</li>
              <li>Project documentation</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 var(--space-1) 0' }}>Features</h4>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-3)', fontSize: '0.9rem' }}>
              <li>Markdown-based notes</li>
              <li>Linking between notes</li>
              <li>Git-based backup</li>
              <li>MCP integration for AI</li>
            </ul>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-3)' }}>
          <a className="button" href="https://obsidian.md" target="_blank" rel="noopener noreferrer">
            Download Obsidian.md
          </a>
          <a className="button ghost" href="https://github.corp.ebay.com/obsidian/claude-code-integration" target="_blank" rel="noopener noreferrer">
            Setup Guide
          </a>
          <a className="button ghost" href="/#/sandbox">
            Practice in AI Sandbox →
          </a>
        </div>
      </div>

      {/* Integration Story */}
      <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#fff3cd', borderRadius: 'var(--radius-lg)', border: '1px solid #ffeaa7' }}>
        <h3>💡 How to Use Both Tools Together</h3>
        <p style={{ fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
          Get the most value by combining both Obsidian tools in your workflow:
        </p>
        <ol style={{ fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: 'var(--space-3)' }}>
          <li>Use <strong>Obsidian.md</strong> to document architecture decisions and code patterns</li>
          <li>Use <strong>Obsidian Workflow App</strong> to automate code reviews based on those documented patterns</li>
          <li>Connect your <strong>Obsidian.md vault</strong> via MCP so AI tools can reference your notes</li>
          <li>Trigger <strong>@obsidian</strong> in PRs to check code against your documented standards</li>
          <li>Store the workflow results back in your <strong>Obsidian.md vault</strong> for future reference</li>
        </ol>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>🎯 Quick Start:</strong> New to both tools? Start with <a href="/#/sandbox" style={{ color: '#0d47a1', textDecoration: 'underline' }}>AI Sandbox</a> to explore hands-on exercises for each tool!
      </div>
    </>
  )
}
