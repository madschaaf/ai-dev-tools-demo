export default function Cursor() {
  return (
    <>
      <h2>Cursor - AI-Powered Code Editor</h2>
      <p>Cursor is an AI-first code editor built on VS Code that integrates Claude, GPT-4, and other AI models directly into your coding workflow.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>⚠️ Important:</strong> To use Cursor at eBay, you must request access through <strong>Secure Access</strong>. This is a gated tool that requires approval.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What is Cursor?</h3>
      <p>Cursor combines the familiar VS Code interface with powerful AI capabilities:</p>
      <ul style={{ fontSize: '0.9rem' }}>
        <li><strong>AI Chat:</strong> Chat with your codebase, ask questions, get suggestions</li>
        <li><strong>Inline Editing:</strong> AI can edit multiple files at once based on your instructions</li>
        <li><strong>Codebase Understanding:</strong> AI indexes your entire project for context-aware assistance</li>
        <li><strong>Composer:</strong> Generate entire features by describing what you want in natural language</li>
        <li><strong>Multi-file Edits:</strong> Make coordinated changes across multiple files simultaneously</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>How to Request Access at eBay</h3>

      <div style={{ background: '#e3f2fd', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', border: '1px solid #90caf9' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600, color: '#0d47a1' }}>Step-by-Step Process:</p>
        <ol style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px', color: '#0d47a1' }}>
          <li>Navigate to <strong>Secure Access</strong> portal (internal eBay tool)</li>
          <li>Search for "Cursor" in the application catalog</li>
          <li>Click "Request Access" and fill out the justification form</li>
          <li>Provide business justification:
            <ul style={{ marginTop: '8px' }}>
              <li>Explain how AI coding assistance will improve productivity</li>
              <li>Mention specific use cases (code generation, refactoring, debugging)</li>
              <li>Reference team or manager approval if applicable</li>
            </ul>
          </li>
          <li>Wait for approval (typically 1-3 business days)</li>
          <li>Once approved, download Cursor from <a href="https://www.cursor.com/" target="_blank" rel="noopener noreferrer">cursor.com</a></li>
          <li>Sign up with your eBay email during onboarding</li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Why Use Cursor?</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #000' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Fast AI Integration</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            No need to context-switch between editor and AI chat - everything is inline
          </p>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #000' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Multi-File Editing</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            Make coordinated changes across your entire codebase with a single prompt
          </p>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #000' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem' }}>Codebase Awareness</div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
            AI understands your entire project structure and can reference any file
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Cursor vs. Other AI Tools</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e1e4e8' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Tool</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Best For</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Key Feature</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e1e4e8' }}>
              <td style={{ padding: '8px' }}><strong>Cursor</strong></td>
              <td style={{ padding: '8px' }}>Multi-file refactoring, full feature generation</td>
              <td style={{ padding: '8px' }}>Composer mode for complex changes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e1e4e8' }}>
              <td style={{ padding: '8px' }}><strong>Cline</strong></td>
              <td style={{ padding: '8px' }}>Terminal tasks, autonomous workflows</td>
              <td style={{ padding: '8px' }}>Can run bash commands</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e1e4e8' }}>
              <td style={{ padding: '8px' }}><strong>Copilot</strong></td>
              <td style={{ padding: '8px' }}>Line-by-line autocomplete</td>
              <td style={{ padding: '8px' }}>Fast inline suggestions</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}><strong>Claude Code CLI</strong></td>
              <td style={{ padding: '8px' }}>Terminal-based coding, scripting</td>
              <td style={{ padding: '8px' }}>Works from command line</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Getting Started with Cursor</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>Once you have access:</p>
        <ol style={{ margin: 0, fontSize: '0.85rem', paddingLeft: '20px' }}>
          <li>Download Cursor from <a href="https://www.cursor.com/" target="_blank" rel="noopener noreferrer">cursor.com</a></li>
          <li>Import your VS Code settings (Cursor can migrate them automatically)</li>
          <li>Try the AI chat: Press <code>Cmd+L</code> (Mac) or <code>Ctrl+L</code> (Windows)</li>
          <li>Try Composer: Press <code>Cmd+I</code> (Mac) or <code>Ctrl+I</code> (Windows) to generate features</li>
          <li>Explore the codebase with <code>@codebase</code> in chat to query your entire project</li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Example Use Cases</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--color-blue-500)' }}>
            "Refactor this component to use TypeScript"
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Cursor will convert JavaScript to TypeScript, add types, and update imports across all files
          </p>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--color-blue-500)' }}>
            "Add error handling to all API calls in this folder"
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Cursor will scan the folder and add try-catch blocks with proper error handling
          </p>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--color-blue-500)' }}>
            "Create a login form with validation using our design system"
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Using Composer, Cursor will generate the form, validation logic, and styling
          </p>
        </div>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Pro Tip:</strong> Use Cursor alongside Cline - Cursor for fast inline edits and Cline for autonomous multi-step workflows like setting up projects or running test suites.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Resources</h3>
      <ul style={{ fontSize: '0.9rem' }}>
        <li><a href="https://www.cursor.com/" target="_blank" rel="noopener noreferrer">Cursor Official Website</a></li>
        <li><a href="https://docs.cursor.com/" target="_blank" rel="noopener noreferrer">Cursor Documentation</a></li>
        <li>Internal: Secure Access portal for requesting access</li>
        <li>Internal: #ai-dev-tools Slack channel for support</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a
          className="button"
          href="https://www.cursor.com/"
          target="_blank"
          rel="noreferrer"
        >
          Visit Cursor Website
        </a>
      </div>
    </>
  )
}
