import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallExtensions({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  const [cloned, setCloned] = useState(false)
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }

    // Get user's email from localStorage and extract username
    const savedData = localStorage.getItem('ebay-dev-setup-user-info')
    if (savedData) {
      const userData = JSON.parse(savedData)
      if (userData.email) {
        // Extract part before @ebay.com
        const usernameFromEmail = userData.email.split('@')[0]
        setUsername(usernameFromEmail)
      }
    }
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <>
      <h2>Step 12: Install VS Code Extensions</h2>
      <p>Clone the AI Dev Tools repository to automatically get all recommended VS Code extensions.</p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Clone the Repository</h3>
      <p>This repository includes a pre-configured list of essential extensions for eBay development.</p>

      <h4>Using Terminal/Git Bash:</h4>
      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            cd ~/Documents{'\n'}git clone https://github.com/madschaaf/ai-dev-tools.git{'\n'}cd ai-dev-tools
          </code>
          <button
            type="button"
            onClick={() => handleCopy('cd ~/Documents\ngit clone https://github.com/madschaaf/ai-dev-tools.git\ncd ai-dev-tools', 'clone')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'clone' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'clone' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {copiedCommand === 'clone' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Clone the repository to your Documents folder and navigate into it
        </p>
      </div>

      <p style={{ marginTop: 'var(--space-3)', fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
        Note: This repo will eventually be moved to GitHub Enterprise
      </p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Create Your Own Branch</h3>
      <p>Create a new branch so you can make edits and commits without affecting the main branch.</p>

      {!username && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
          <strong>Tip:</strong> Go back to Step 0 and enter your eBay email to auto-populate your personalized branch name below.
        </div>
      )}

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            {username ? `git checkout -b practice-${username}` : 'git checkout -b practice-USERNAME'}
          </code>
          <button
            type="button"
            onClick={() => handleCopy(username ? `git checkout -b practice-${username}` : 'git checkout -b practice-USERNAME', 'branch')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'branch' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'branch' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {copiedCommand === 'branch' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          {username
            ? `Create and switch to a new branch called "practice-${username}"`
            : 'Enter your email in Step 0 to see your personalized branch name here'}
        </p>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Why Create a Branch?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Working on your own branch allows you to:
        </p>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li>Make configuration changes specific to your setup</li>
          <li>Commit your progress without affecting the main branch</li>
          <li>Easily update from the main branch later with <code>git pull origin main</code></li>
          <li>Push your branch to share or back up your work</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Open in VS Code</h3>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            {userOS === 'mac' ? 'code .' : userOS === 'windows' ? 'code .' : 'code .'}
          </code>
          <button
            type="button"
            onClick={() => handleCopy('code .', 'open-vscode')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'open-vscode' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'open-vscode' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {copiedCommand === 'open-vscode' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          {'Command to open the cloned repository in VS Code or open it manually as described below'}
        </p>
      </div>
      <ol>
        <li>Open VS Code</li>
        <li>Go to File → Open Folder (or Cmd+O on Mac, Ctrl+O on Windows)</li>
        <li>Navigate to and select the <code>ai-dev-tools</code> folder you just cloned</li>
        <li>Click "Open"</li>
      </ol>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Extension Popup:</strong> VS Code will automatically detect the workspace recommendations and show a popup asking if you want to install the recommended extensions.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Install Recommended Extensions</h3>
      <ol>
        <li>When the popup appears, click <strong>"Install All"</strong> or <strong>"Show Recommendations"</strong></li>
        <li>If you missed the popup:
          <ul>
            <li>Press <kbd>Cmd+Shift+P</kbd> (Mac) or <kbd>Ctrl+Shift+P</kbd> (Windows)</li>
            <li>Type "Extensions: Show Recommended Extensions"</li>
            <li>Click the cloud download icon next to "Workspace Recommendations"</li>
          </ul>
        </li>
        <li>Wait for all extensions to install (this may take a few minutes)</li>
        <li>Reload VS Code when prompted</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What Extensions Are Included?</h3>
      <p>The repository includes recommended extensions for:</p>
      <ul>
        <li><strong>AI Tools:</strong> GitHub Copilot, Copilot Chat, Cline</li>
        <li><strong>Azure:</strong> Azure Copilot, MCP Server, Resource Groups</li>
        <li><strong>Database:</strong> SQL Server, Database Projects, SQL Formatter</li>
        <li><strong>Python:</strong> Python, Pylance, Debugger</li>
        <li><strong>GitHub:</strong> Pull Requests, Actions, Remote Repositories</li>
        <li><strong>Developer Tools:</strong> Prettier, Edge DevTools, Rainbow Brackets</li>
      </ul>

      <p style={{ marginTop: 'var(--space-3)' }}>
        These extensions are pre-configured in the repository's <code>.vscode/extensions.json</code> file.
      </p>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 5: Install Dependencies</h3>
      <p>Open your terminal in VS Code by pressing <kbd>{userOS === 'mac' ? 'Ctrl + ~' : 'Ctrl + ~'}</kbd></p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1, whiteSpace: 'pre-wrap' }}>
            npm install
          </code>
          <button
            type="button"
            onClick={() => handleCopy('npm install', 'npm-install')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'npm-install' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'npm-install' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {copiedCommand === 'npm-install' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Install all project dependencies
        </p>
      </div>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-3)' }}>
        <strong>What happens after install?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          The postinstall script will display a message with instructions for configuring MCP servers.
          You'll set those up in a later step using the <code>npm run setup-mcp</code> command.
        </p>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Available npm Commands:</strong>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li><code>npm run dev</code> - Start both client and server (to run this app locally)</li>
          <li><code>npm run server</code> - Start only the server</li>
          <li><code>npm run build</code> - Build the project for production</li>
          <li><code>npm run setup-mcp</code> - Configure MCP servers (covered in a later step)</li>
        </ul>
      </div>



      <div style={{ marginTop: 'var(--space-3)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={cloned}
            onChange={(e) => setCloned(e.target.checked)}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ fontWeight: cloned ? 600 : 400 }}>
            I've cloned the repository and installed the extensions
          </span>
        </label>
      </div>

      {cloned && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>Extensions installed!</strong>
          <p style={{ margin: '8px 0 0' }}>
            You now have all the essential tools. Continue to Step 13 to install Cline.
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>Note About VSIX Extensions</h3>
      <p>Some extensions (like eBay Cline from Step 13) need to be installed manually from VSIX files. The standard extensions in this repository will install automatically.</p>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
        <a
          className="button"
          href="https://github.com/madschaaf/ai-dev-tools"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Repository on GitHub
        </a>
        <a
          className="button ghost"
          href="/vscode-extensions"
        >
          See Full Extensions List
        </a>
      </div>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {!isCompleted ? (
            <button
              type="button"
              onClick={onComplete}
              disabled={!cloned}
              style={{
                fontSize: '1rem',
                padding: '12px 24px',
                background: cloned ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: cloned ? 'pointer' : 'not-allowed',
                fontWeight: 600,
                transition: 'all 0.2s',
                opacity: cloned ? 1 : 0.6
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
