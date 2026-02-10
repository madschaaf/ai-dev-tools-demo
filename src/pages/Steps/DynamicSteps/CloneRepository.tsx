import { useState, useEffect } from 'react'
import { getUserOS } from '../steps/UserInfo'

export default function CloneRepository() {
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  useEffect(() => {
    const os = getUserOS()
    if (os) {
      setUserOS(os)
    }
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const vsCodeCloneCommand = 'Git: Clone'
  const terminalCloneCommand = 'git clone https://github.com/username/repository.git'

  return (
    <>
      <h2>Clone Repository</h2>
      <p>Clone your first project repository to start working on code. This step teaches you how to get a copy of a Git repository onto your local machine using VS Code or terminal commands.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>What is Repository Cloning?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Cloning creates a local copy of a remote Git repository on your computer. This gives you access to all the code, history, and branches so you can start developing, making changes, and contributing to the project.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Get</h3>
      <ul>
        <li><strong>Local Repository Copy</strong> - Full copy of the project on your machine</li>
        <li><strong>Git History</strong> - Complete commit history and all branches</li>
        <li><strong>Ready to Code</strong> - Immediately start making changes and commits</li>
        <li><strong>Remote Connection</strong> - Linked to original repository for pushing/pulling changes</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Prerequisites</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Before You Clone:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>Git must be installed (see previous step)</li>
          <li>You need repository URL (from GitHub, GitHub Enterprise, etc.)</li>
          <li>Proper access permissions to the repository</li>
          <li>VS Code installed (if using VS Code method)</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Method 1: Clone Using VS Code (Recommended)</h3>
      <p>VS Code provides an easy visual interface for cloning repositories:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Open VS Code</strong></li>
        <li><strong>Open Command Palette:</strong>
          <ul>
            <li><strong>Mac:</strong> Press <kbd>⌘ Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></li>
            <li><strong>Windows:</strong> Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></li>
          </ul>
        </li>
        <li><strong>Type "Git: Clone"</strong> and select it from the dropdown</li>
        <li><strong>Paste Repository URL:</strong> Enter the full URL of the repository
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)', fontSize: '0.85rem' }}>
            Example URLs:
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
              <li>GitHub: <code>https://github.com/username/repository.git</code></li>
              <li>GitHub Enterprise: <code>https://github.corp.ebay.com/org/repository.git</code></li>
              <li>SSH: <code>git@github.com:username/repository.git</code></li>
            </ul>
          </div>
        </li>
        <li><strong>Choose Local Folder:</strong> Select where to clone the repository on your computer</li>
        <li><strong>Wait for Clone:</strong> VS Code will download all files and show progress</li>
        <li><strong>Open Repository:</strong> Click "Open" when prompted to open the cloned folder</li>
      </ol>

      <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
        <strong>Pro Tip:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          VS Code will automatically detect Git in the cloned repository and show the Source Control panel. You'll see all your files, branches, and be ready to make commits.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Method 2: Clone Using Terminal</h3>
      <p>For command-line users, you can clone using Git directly in the terminal:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Open Terminal:</strong>
          <ul>
            <li><strong>Mac:</strong> Press <kbd>⌘ Cmd</kbd> + <kbd>Space</kbd>, type "Terminal"</li>
            <li><strong>Windows:</strong> Press <kbd>⊞ Win</kbd> + <kbd>R</kbd>, type "cmd" or "powershell"</li>
            <li><strong>VS Code:</strong> Press <kbd>Ctrl</kbd> + <kbd>`</kbd> (backtick)</li>
          </ul>
        </li>
        <li><strong>Navigate to Destination:</strong> Use <code>cd</code> to go to where you want the repository
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>cd ~/Documents/Projects</code>
              <button
                type="button"
                onClick={() => handleCopy('cd ~/Documents/Projects', 'cd-projects')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'cd-projects' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'cd-projects' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'cd-projects' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </li>
        <li><strong>Run Clone Command:</strong> Replace URL with your repository's URL
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>{terminalCloneCommand}</code>
              <button
                type="button"
                onClick={() => handleCopy(terminalCloneCommand, 'git-clone')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'git-clone' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'git-clone' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'git-clone' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              This creates a new folder with the repository name and downloads all files
            </p>
          </div>
        </li>
        <li><strong>Navigate into Repository:</strong> Move into the cloned folder
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>cd repository</code>
              <button
                type="button"
                onClick={() => handleCopy('cd repository', 'cd-repo')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'cd-repo' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'cd-repo' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'cd-repo' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
              Replace "repository" with the actual folder name created
            </p>
          </div>
        </li>
        <li><strong>Open in VS Code (Optional):</strong> Open the current directory in VS Code
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>code .</code>
              <button
                type="button"
                onClick={() => handleCopy('code .', 'code-open')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'code-open' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'code-open' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'code-open' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Clone Options</h3>
      <p>Advanced Git clone options you might need:</p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ marginTop: 0, fontSize: '0.95rem' }}>Clone Specific Branch</h4>
        <code>git clone -b branch-name https://github.com/username/repository.git</code>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Only clone a specific branch instead of all branches
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ marginTop: 0, fontSize: '0.95rem' }}>Shallow Clone (Faster)</h4>
        <code>git clone --depth 1 https://github.com/username/repository.git</code>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Only clone recent history, useful for large repositories
        </p>
      </div>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ marginTop: 0, fontSize: '0.95rem' }}>Clone to Specific Folder</h4>
        <code>git clone https://github.com/username/repository.git my-folder-name</code>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Specify a custom folder name instead of using repository name
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verification</h3>
      <p>Confirm the repository was cloned successfully:</p>
      <ul>
        <li>✓ Repository folder exists in your chosen location</li>
        <li>✓ All project files are present</li>
        <li>✓ Hidden <code>.git</code> folder exists (contains Git data)</li>
        <li>✓ Can see repository in VS Code Source Control panel</li>
        <li>✓ Running <code>git status</code> shows branch information</li>
      </ul>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>git status</code>
          <button
            type="button"
            onClick={() => handleCopy('git status', 'git-status')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'git-status' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'git-status' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'git-status' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Should show your current branch and status
        </p>
      </div>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
        <strong>Repository Cloned Successfully!</strong>
        <p style={{ margin: '8px 0 0' }}>
          You now have a local copy of the repository and can start making changes, creating branches, and committing code.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>Permission denied:</strong> Ensure you have access to the repository or use correct credentials</li>
          <li><strong>Authentication failed:</strong> Check your GitHub token or SSH keys are configured</li>
          <li><strong>Repository not found:</strong> Verify the URL is correct and repository exists</li>
          <li><strong>Network errors:</strong> Check internet connection or VPN if using GitHub Enterprise</li>
          <li><strong>Command not found:</strong> Git may not be installed or not in PATH</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>After cloning your repository, you're ready to:</p>
      <ul>
        <li>Explore the codebase and project structure</li>
        <li>Create a new branch for your work</li>
        <li>Install project dependencies (npm install, pip install, etc.)</li>
        <li>Start developing and making changes</li>
        <li>Commit your work and push to remote</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          className="button ghost"
          href="https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Clone Guide
        </a>
        <a
          className="button ghost"
          href="https://code.visualstudio.com/docs/sourcecontrol/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          VS Code Git Guide
        </a>
      </div>
    </>
  )
}
