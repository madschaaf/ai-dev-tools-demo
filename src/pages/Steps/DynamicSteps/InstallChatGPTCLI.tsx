import { useState, useEffect } from 'react'
import { getUserOS } from './UserInfo'

export default function InstallChatGPTCLI({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
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

  const claudeInstallCommand = '/bin/bash -c "$(curl -fsSL https://installsvc.vip.ebay.com/repos/claude-code/raw/main/claude-code-setup.sh)"'
  const claudeRunCommand = 'claude'

  return (
    <>
      <h2>Step 6: Install Claude Code CLI</h2>
      <p>Install Claude Code CLI to get AI-powered coding assistance directly in your terminal. This works immediately with your eBay SSO credentials on Day 0.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized instructions.
        </div>
      )}

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Prerequisites:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Before installing Claude Code CLI, make sure you've applied <strong>Netskope Certificates</strong> via Self Service (Mac) or Software Center (Windows). This prevents auth failures.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What is Claude Code CLI?</h3>
      <p>Claude Code CLI is an AI coding assistant that runs directly in your terminal. It's like having an expert developer sitting next to you, ready to help with any coding task.</p>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>What Claude Code CLI Can Do:</strong>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li><strong>Write and edit code</strong> - Ask it to create functions, fix bugs, or refactor code</li>
          <li><strong>Explain code</strong> - Get detailed explanations of how code works</li>
          <li><strong>Debug issues</strong> - Paste error messages and get solutions</li>
          <li><strong>Answer questions</strong> - Ask about programming concepts, best practices, or eBay-specific tools</li>
          <li><strong>Work with files</strong> - It can read, write, and edit files in your project</li>
          <li><strong>Run commands</strong> - It can execute terminal commands to help complete tasks</li>
        </ul>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem' }}>
          <strong>Learn more:</strong>{' '}
          <a href="https://platform.claude.com/login?returnTo=%2Fdocs%2Fen%2Fdocs%2Fclaude-code%2Foverview" target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32', fontWeight: 600 }}>
            Claude Code Documentation
          </a>
        </p>
      </div>

      {/* <h3 style={{ marginTop: 'var(--space-4)' }}>How to Use Claude Code CLI</h3> */}

      {/* <h4 style={{ marginTop: 'var(--space-3)' }}>Starting Claude Code CLI:</h4>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Open your terminal</strong> ({userOS === 'windows' ? 'Git Bash' : 'Terminal'})</li>
        <li><strong>Navigate to your project folder</strong> (optional, but recommended):
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code>cd /path/to/your/project</code>
          </div>
        </li>
        <li><strong>Type the command:</strong>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
              <code style={{ flex: 1 }}>claude</code>
              <button
                type="button"
                onClick={() => handleCopy('claude', 'claude-start')}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedCommand === 'claude-start' ? 'var(--color-green-500)' : 'white',
                  color: copiedCommand === 'claude-start' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedCommand === 'claude-start' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </li>
        <li><strong>Start chatting!</strong> Type your question or request and press Enter</li>
      </ol> */}

      {/* <h4 style={{ marginTop: 'var(--space-3)' }}>Example Requests:</h4>
      <ul style={{ marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
        <li>"Create a Python function that validates email addresses"</li>
        <li>"Explain how this JavaScript code works" (after pasting code)</li>
        <li>"Help me fix this error: [paste error message]"</li>
        <li>"What's the best way to handle authentication in React?"</li>
        <li>"Read the config.js file and explain what it does"</li>
      </ul> */}

  

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Tip:</strong> Claude Code CLI works best when you're specific about what you need. Instead of "fix my code," try "this function throws a TypeError on line 42 - can you help me debug it?"
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Quick Access: Open {userOS === 'windows' ? 'Git Bash' : 'Terminal'}</strong>
        <div style={{ marginTop: 'var(--space-2)' }}>
          {userOS === 'mac' ? (
            <>
              <p style={{ margin: '0 0 8px' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>⌘ Command</kbd> + <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>Space</kbd></p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ margin: 0 }}>Type "Terminal" and press Enter</p>
                <button
                  type="button"
                  onClick={() => handleCopy('Terminal', 'terminal-search')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-blue-500)',
                    background: copiedCommand === 'terminal-search' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'terminal-search' ? 'white' : 'var(--color-blue-500)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {copiedCommand === 'terminal-search' ? '✓' : 'Copy'}
                </button>
              </div>
      {/* <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>When you're done, you can exit in several ways:</p>
      <ul style={{ marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
        <li><strong>Type:</strong> <code>/exit</code> or <code>/quit</code> and press Enter</li>
        <li><strong>Keyboard shortcut:</strong> Press <kbd style={{ background: '#f6f8fa', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl + C</kbd> (works on both Mac and Windows)</li>
        <li><strong>Close the terminal window</strong> (also ends the session)</li>
      </ul> */}
            </>
          ) : userOS === 'windows' ? (
            <>
              <p style={{ margin: '0 0 8px' }}>Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #90caf9' }}>⊞ Windows</kbd> key</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ margin: 0 }}>Type "Git Bash" and press Enter</p>
                <button
                  type="button"
                  onClick={() => handleCopy('Git Bash', 'gitbash-search')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-blue-500)',
                    background: copiedCommand === 'gitbash-search' ? 'var(--color-green-500)' : 'white',
                    color: copiedCommand === 'gitbash-search' ? 'white' : 'var(--color-blue-500)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {copiedCommand === 'gitbash-search' ? '✓' : 'Copy'}
                </button>
              </div>
      {/* <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>When you're done, you can exit in several ways:</p>
      <ul style={{ marginTop: 'var(--space-2)', fontSize: '0.9rem' }}>
        <li><strong>Type:</strong> <code>/exit</code> or <code>/quit</code> and press Enter</li>
        <li><strong>Keyboard shortcut:</strong> Press <kbd style={{ background: '#f6f8fa', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl + C</kbd> (works on both Mac and Windows)</li>
        <li><strong>Close the terminal window</strong> (also ends the session)</li>
      </ul> */}
            </>
          ) : (
            <p style={{ margin: 0 }}>Open your terminal application</p>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Install Claude Code CLI</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Run this one command to install Claude Code CLI:
      </p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{claudeInstallCommand}</code>
          <button
            type="button"
            onClick={() => handleCopy(claudeInstallCommand, 'claude-install')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'claude-install' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'claude-install' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {copiedCommand === 'claude-install' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          This installs Claude Code CLI from eBay's internal repository and sets it up for SSO authentication
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Start Claude Code CLI</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        After installation completes, launch Claude Code CLI:
      </p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>{claudeRunCommand}</code>
          <button
            type="button"
            onClick={() => handleCopy(claudeRunCommand, 'claude-run')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'claude-run' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'claude-run' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'claude-run' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          This opens Claude Code CLI and prompts for eBay SSO authentication
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Authenticate with eBay SSO</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Claude Code CLI uses your eBay SSO credentials for authentication:
      </p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Sign in:</strong> When prompted, authenticate with your eBay email and corporate credentials (SSO)
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Network proxy:</strong> If you see a proxy authentication prompt, use your corp username with PIN + YubiKey/OTP
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Verify access:</strong> Once authenticated, you'll see the Claude Code CLI interface
        </li>
      </ol>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>Using Claude Code CLI:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Claude Code CLI provides AI-powered coding assistance directly in your terminal:
        </p>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li>Ask questions about code</li>
          <li>Get help with terminal commands</li>
          <li>Debug errors and issues</li>
          <li>Generate code snippets</li>
        </ul>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Type your question or request after launching: <code>claude</code>
        </p>
      </div>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>Claude AI Website (Alternative Access):</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          You can also use Claude AI through your web browser at{' '}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32', fontWeight: 600 }}>
            claude.ai
          </a>
          . Sign in with your eBay credentials to access the same AI assistant in your browser. This is useful when you want to work on tasks outside the terminal.
        </p>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem' }}>
          Both the CLI and website use the same Claude AI - choose whichever works best for your current task!
        </p>
        <p style={{ margin: '8px 0 0', fontSize: '0.85rem' }}>
          <strong>Documentation:</strong>{' '}
          <a href="https://platform.claude.com/login?returnTo=%2Fdocs%2Fen%2Fdocs%2Fclaude-code%2Foverview" target="_blank" rel="noopener noreferrer" style={{ color: '#2e7d32', fontWeight: 600 }}>
            Claude Code Docs
          </a>
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting Common Issues</h3>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 1: Authentication Fails</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
        If authentication fails, ensure you've installed Netskope Certificates:
      </p>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Mac:</strong> Open Self Service app → Search for "Netskope" → Run "Apply Netskope Certificates"</li>
        <li><strong>Windows:</strong> Open Software Center → Search for "Netskope" → Install Netskope certificates</li>
        <li><strong>Restart your terminal</strong> after installing certificates</li>
        <li>Try running <code>claude</code> again</li>
      </ol>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 2: Proxy Authentication Required</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
        If prompted for proxy authentication:
      </p>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>Use your <strong>corp username</strong> (not email)</li>
        <li>For password, enter: <strong>PIN + YubiKey/OTP code</strong> (concatenated together)</li>
        <li>Example: If PIN is 1234 and YubiKey shows 567890, enter: 1234567890</li>
      </ol>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Issue 3: Command Not Found</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
        If you see "command not found: claude":
      </p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Close and reopen your terminal</strong> to reload PATH</li>
        <li>If still not working, manually add to PATH:
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
            <code>export PATH="$HOME/.local/bin:$PATH"</code>
          </div>
        </li>
        <li>Make it permanent by adding to your shell config (~/.zshrc or ~/.bashrc)</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verify Installation</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        Test that Claude Code CLI is installed and working:
      </p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
          <code style={{ flex: 1 }}>claude --version</code>
          <button
            type="button"
            onClick={() => handleCopy('claude --version', 'claude-version')}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-blue-500)',
              background: copiedCommand === 'claude-version' ? 'var(--color-green-500)' : 'white',
              color: copiedCommand === 'claude-version' ? 'white' : 'var(--color-blue-500)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {copiedCommand === 'claude-version' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>
          Should output the Claude Code CLI version number
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>End Claude Code CLI Session</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-2)' }}>
        When you're done using Claude Code CLI, you can exit in several ways:
      </p>

      <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Option 1: Type an exit command</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>/exit</code>
            <button
              type="button"
              onClick={() => handleCopy('/exit', 'exit-1')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'exit-1' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'exit-1' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCommand === 'exit-1' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
            <code style={{ flex: 1 }}>/quit</code>
            <button
              type="button"
              onClick={() => handleCopy('/quit', 'exit-2')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedCommand === 'exit-2' ? 'var(--color-green-500)' : 'white',
                color: copiedCommand === 'exit-2' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCommand === 'exit-2' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <h4 style={{ margin: 'var(--space-3) 0 8px', fontSize: '0.95rem' }}>Option 2: Keyboard shortcut</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Press <kbd style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #d0d7de' }}>Ctrl + C</kbd>
          </p>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)' }}>(works on both Mac and Windows)</span>
        </div>

        <h4 style={{ margin: 'var(--space-3) 0 8px', fontSize: '0.95rem' }}>Option 3: Close the terminal</h4>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
          Closing the terminal window will also end the Claude Code CLI session
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>Once Claude Code CLI is installed and authenticated, proceed to Step 7 to install Git. Now you have AI assistance directly in your terminal to help if you get stuck!</p>

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
