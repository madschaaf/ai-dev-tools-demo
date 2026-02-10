export default function SetupObsidianNotes({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  return (
    <>
      <h2>Step 15: Set Up Obsidian Notes & Knowledge Base</h2>
      <p>Set up Obsidian.md for personal knowledge management, documentation, and AI-enhanced note-taking with GitHub Enterprise backup.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Why Obsidian for Engineers?</h3>
      <p>Obsidian helps you build a searchable knowledge base that AI tools can reference. Think of it as your second brain that integrates with your development workflow.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ padding: 'var(--space-3)', background: '#e8f5e9', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #4caf50' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', color: '#2e7d32' }}>📝 Document as You Code</div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Keep notes on design decisions, tricky bugs, and code patterns right alongside your work
          </p>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#e8f5e9', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #4caf50' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', color: '#2e7d32' }}>🤖 AI Context Source</div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Your notes become context for AI tools via MCP - Claude can search your vault for relevant info
          </p>
        </div>

        <div style={{ padding: 'var(--space-3)', background: '#e8f5e9', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #4caf50' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', color: '#2e7d32' }}>🔗 Link Knowledge</div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Connect related concepts with wiki-style links - see how ideas relate in the graph view
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Download & Install Obsidian</h3>
      <ol>
        <li>Go to <a href="https://obsidian.md" target="_blank" rel="noopener noreferrer">obsidian.md</a></li>
        <li>Download the app for your OS (Mac, Windows, or Linux)</li>
        <li>Install and launch Obsidian</li>
        <li>Choose "Create new vault" on the welcome screen</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Create Your Engineering Vault</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>Recommended structure:</p>
        <ol style={{ margin: 0, fontSize: '0.85rem' }}>
          <li><strong>Vault Name:</strong> "DevKnowledge" or "EngineeringNotes"</li>
          <li><strong>Location:</strong> <code>~/Documents/DevKnowledge/</code> (or your preferred location)</li>
          <li><strong>Create these folders:</strong>
            <ul>
              <li><code>Daily Notes/</code> - Daily work log</li>
              <li><code>Projects/</code> - Project documentation</li>
              <li><code>Code Snippets/</code> - Reusable code patterns</li>
              <li><code>Learning/</code> - New concepts and tutorials</li>
              <li><code>Meetings/</code> - Meeting notes and decisions</li>
              <li><code>Troubleshooting/</code> - Bug fixes and solutions</li>
            </ul>
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Connect to GitHub Enterprise (Backup & Sync)</h3>
      <p>Back up your vault to GitHub Enterprise so you never lose your notes:</p>

      <div style={{ background: '#fff3cd', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', border: '1px solid #ffeaa7' }}>
        <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 600, color: '#856404' }}>Option A: Using Git Manually (Recommended for Engineers)</p>
        <ol style={{ margin: 0, fontSize: '0.85rem', color: '#856404' }}>
          <li>Open Terminal and navigate to your vault:
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '0.8rem' }}>cd ~/Documents/DevKnowledge</pre>
          </li>
          <li>Initialize Git and create .gitignore:
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '0.8rem' }}>{`git init
echo ".obsidian/workspace*" >> .gitignore
echo ".trash/" >> .gitignore`}</pre>
          </li>
          <li>Create a private repo on GitHub Enterprise:
            <ul>
              <li>Go to <a href="https://github.corp.ebay.com" target="_blank" rel="noopener noreferrer">github.corp.ebay.com</a></li>
              <li>Click "New Repository"</li>
              <li>Name: "dev-knowledge" (or your choice)</li>
              <li>Set to <strong>Private</strong></li>
              <li>Do NOT initialize with README</li>
            </ul>
          </li>
          <li>Connect and push:
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '0.8rem' }}>{`git add .
git commit -m "Initial commit: Engineering knowledge vault"
git branch -M main
git remote add origin git@github.corp.ebay.com:YOUR_USERNAME/dev-knowledge.git
git push -u origin main`}</pre>
          </li>
        </ol>
      </div>

      <div style={{ background: '#e3f2fd', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)', border: '1px solid #90caf9' }}>
        <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 600, color: '#0d47a1' }}>Option B: Using Obsidian Git Plugin (Automatic Sync)</p>
        <ol style={{ margin: 0, fontSize: '0.85rem', color: '#0d47a1' }}>
          <li>In Obsidian, go to Settings → Community Plugins</li>
          <li>Turn off "Restricted Mode" (if enabled)</li>
          <li>Click "Browse" and search for "Obsidian Git"</li>
          <li>Install and enable the plugin</li>
          <li>Follow Option A steps 1-3 first to initialize Git and create the remote repo</li>
          <li>Configure the plugin: Settings → Obsidian Git
            <ul>
              <li>Enable "Auto backup"</li>
              <li>Set backup interval (e.g., every 10 minutes)</li>
              <li>Enable "Auto pull" on startup</li>
            </ul>
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Integrate with VS Code (Optional but Recommended)</h3>
      <p>You can edit your Obsidian notes directly in VS Code alongside your code:</p>
      <ol>
        <li>In VS Code, click File → Open Folder</li>
        <li>Navigate to your vault folder: <code>~/Documents/DevKnowledge/</code></li>
        <li>Now you can:
          <ul>
            <li>Edit .md files in VS Code while coding</li>
            <li>Use VS Code's search to find notes</li>
            <li>Keep notes side-by-side with code in split view</li>
            <li>Use Git in VS Code to commit/push notes</li>
          </ul>
        </li>
        <li><strong>Pro Tip:</strong> Install the "Markdown All in One" extension in VS Code for better Markdown editing</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 5: Connect Obsidian to MCP (AI Integration)</h3>
      <p>Make your notes searchable by AI tools like Claude via Model Context Protocol:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>Using the Filesystem MCP Server (Recommended):</p>
        <ol style={{ margin: 0, fontSize: '0.85rem' }}>
          <li>Your vault is already a folder of Markdown files</li>
          <li>Add this to your MCP settings (<code>~/.mcp/cline_mcp_settings.json</code>):
            <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '12px', borderRadius: '4px', marginTop: '8px', fontSize: '0.75rem', overflow: 'auto' }}>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/YOUR_USERNAME/Documents/DevKnowledge"
      ]
    }
  }
}`}</pre>
          </li>
          <li>Now Claude/Cline can read and search your notes!</li>
          <li>Try asking: <code>"Search my Obsidian notes for information about React hooks"</code></li>
        </ol>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Practical Use Cases for Engineers</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '1rem', color: '#3665F3' }}>
            1. Daily Engineering Log
          </div>
          <p style={{ margin: '8px 0', fontSize: '0.85rem' }}>
            Use the Daily Notes plugin to automatically create a note each day. Log what you worked on, blockers, and learnings.
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px' }}>
            <strong style={{ fontSize: '0.8rem' }}>Template:</strong>
            <pre style={{ margin: '8px 0 0', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>{`# {{date}}

## What I Worked On
- Fixed bug in checkout flow
- Reviewed PR #123

## Blockers
- Waiting for API access

## Learnings
- [[React Suspense]] works better than manual loading states`}</pre>
          </div>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '1rem', color: '#3665F3' }}>
            2. AI-Enhanced Documentation
          </div>
          <p style={{ margin: '8px 0', fontSize: '0.85rem' }}>
            Ask Claude to document code → Save to Obsidian → Link to related notes
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px' }}>
            <strong style={{ fontSize: '0.8rem' }}>Workflow:</strong>
            <ol style={{ margin: '8px 0 0', fontSize: '0.75rem', paddingLeft: '20px' }}>
              <li>Copy complex code</li>
              <li>Ask Claude: "Explain this and format as Obsidian note with links"</li>
              <li>Paste result into Obsidian</li>
              <li>Claude automatically formats with [[wiki-style]] links</li>
            </ol>
          </div>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '1rem', color: '#3665F3' }}>
            3. MCP Workflow Creation
          </div>
          <p style={{ margin: '8px 0', fontSize: '0.85rem' }}>
            Store reusable prompts and workflows in Obsidian that AI can reference
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px' }}>
            <strong style={{ fontSize: '0.8rem' }}>Example:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.75rem' }}>
              Create a note called "Code Review Checklist.md" with your team's standards.
              Then tell Claude: "Review this PR using my Code Review Checklist note"
            </p>
          </div>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: '#fff' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '1rem', color: '#3665F3' }}>
            4. Troubleshooting Database
          </div>
          <p style={{ margin: '8px 0', fontSize: '0.85rem' }}>
            Document every bug fix with problem, solution, and prevention
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: '4px', marginTop: '8px' }}>
            <strong style={{ fontSize: '0.8rem' }}>Benefit:</strong>
            <p style={{ margin: '8px 0 0', fontSize: '0.75rem' }}>
              When you hit a similar issue months later, ask Claude to search your vault for solutions
            </p>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Essential Plugins for Engineers</h3>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <p style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 600 }}>Install these from Settings → Community Plugins:</p>
        <ul style={{ margin: 0, fontSize: '0.85rem' }}>
          <li><strong>Daily Notes</strong> - Auto-create daily work log</li>
          <li><strong>Templater</strong> - Create reusable templates</li>
          <li><strong>Obsidian Git</strong> - Auto-sync to GitHub Enterprise</li>
          <li><strong>Dataview</strong> - Query your notes (e.g., "show all open tasks")</li>
          <li><strong>Calendar</strong> - Visual calendar of daily notes</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Your Setup</h3>
      <ol>
        <li>✅ Obsidian app is installed and vault created</li>
        <li>✅ GitHub Enterprise repo created and connected</li>
        <li>✅ Can push/pull notes to GitHub (test with a commit)</li>
        <li>✅ Vault folder can be opened in VS Code</li>
        <li>✅ MCP configured to access your vault (if using)</li>
        <li>✅ Daily Notes plugin enabled and working</li>
      </ol>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Next Steps:</strong> Create your first daily note and document something you learned today. Link it to a project note. Try asking Claude to search your vault!
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Resources</h3>
      <ul style={{ fontSize: '0.9rem' }}>
        <li><a href="https://obsidian.md" target="_blank" rel="noopener noreferrer">Obsidian Download</a></li>
        <li><a href="https://help.obsidian.md" target="_blank" rel="noopener noreferrer">Obsidian Help Docs</a></li>
        <li><a href="https://github.corp.ebay.com" target="_blank" rel="noopener noreferrer">GitHub Enterprise</a></li>
        <li>Practice exercises in the AI Sandbox tab</li>
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
