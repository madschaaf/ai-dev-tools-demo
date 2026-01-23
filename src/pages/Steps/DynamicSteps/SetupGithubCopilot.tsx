import { useState, useEffect } from 'react'
import { getUserInfo, getUserOS } from '../steps/UserInfo'
import copilotIcon from '../../../assets/copilot-icon.png'
import chatIcon from '../../../assets/chat-icon.png'
import rightShadeToggle from '../../../assets/right-shade-toggle.png'
import copilotExample from '../../../assets/copilot-image-example.png'

export default function SetupGitHubCopilot() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [accessRequested, setAccessRequested] = useState(false)

  useEffect(() => {
    const userInfo = getUserInfo()
    const os = getUserOS()
    if (userInfo) {
      setUserName(`${userInfo.firstName} ${userInfo.lastName}`)
    }
    if (os) setUserOS(os)
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <>
      <h2>Setup GitHub Copilot</h2>
      <p>Enable GitHub Copilot, your AI pair programmer that helps you write code faster with intelligent suggestions. This powerful tool integrates directly into VS Code and provides real-time coding assistance.</p>

      {!userOS && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to select your operating system for customized keyboard shortcuts.
        </div>
      )}

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-4)' }}>
        <strong>What is GitHub Copilot?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          GitHub Copilot is an AI-powered coding assistant developed by GitHub and OpenAI. It suggests code completions as you type, helps you write entire functions, explains code, and answers programming questions through its chat interface. It's trained on billions of lines of public code and understands context from your current file.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Get</h3>
      <ul>
        <li><strong>Inline Code Suggestions</strong> - AI-powered code completions as you type</li>
        <li><strong>Chat Interface</strong> - Conversational AI for coding questions and explanations</li>
        <li><strong>Context Awareness</strong> - Suggestions based on your current code and comments</li>
        <li><strong>Multi-Language Support</strong> - Works with dozens of programming languages</li>
        <li><strong>Code Explanations</strong> - Understand complex code snippets instantly</li>
        <li><strong>Test Generation</strong> - Automatically create unit tests for your functions</li>
        <li><strong>Refactoring Help</strong> - Improve code quality with AI suggestions</li>
        <li><strong>Documentation Writing</strong> - Generate comments and documentation</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Prerequisites</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Before You Begin:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>Personal GitHub account created (completed in previous step)</li>
          <li>VS Code installed and running</li>
          <li>GitHub Enterprise access approved (from Step 3)</li>
          <li>Active internet connection for extension installation</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Enable GitHub Copilot Access</h3>
      <p>Link your personal GitHub account with eBay's enterprise Copilot access to enable AI assistance.</p>

      <div className="callout" style={{ background: '#f0f4ff', borderColor: '#c5d7f7', color: '#1e3a8a', marginTop: 'var(--space-3)' }}>
        <strong>Why This Step Matters</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          eBay provides GitHub Copilot Business licenses to all developers. By linking your personal GitHub account to eBay's enterprise organization, you gain access to Copilot at no personal cost. This connection also ensures proper security and compliance with eBay's policies.
        </p>
      </div>

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-3)' }}>Enable Copilot Enterprise Access:</h4>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to eBay Copilot repository</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 8px' }}>
            Visit{' '}
            <a href="https://github.com/ebay-copilot" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
              https://github.com/ebay-copilot
            </a>
          </p>
        </li>
        <li>
          <strong>Sign in with your personal GitHub account</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Use the account you created in the previous step
          </p>
        </li>
        <li>
          <strong>Authorize eBay SSO</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            When prompted, authorize eBay's Single Sign-On (SSO) to link your GitHub account with eBay's enterprise organization
          </p>
        </li>
        <li>
          <strong>Verify access granted</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            You should see the ebay-copilot repository and a confirmation that Copilot is enabled for your account
          </p>
        </li>
      </ol>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>✓ Access Enabled!</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Your GitHub account is now linked to eBay's Copilot Business license. Next, you'll install the VS Code extensions.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Install Copilot Extensions</h3>
      <p>GitHub Copilot requires two separate extensions in VS Code to provide the complete AI assistance experience.</p>

      <div className="callout" style={{ background: '#fff3e0', borderColor: '#ffb74d', color: '#e65100', marginTop: 'var(--space-3)' }}>
        <strong>📦 Two Extensions Required</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          GitHub Copilot has <strong>two separate extensions</strong> that work together:
        </p>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li><strong>GitHub Copilot</strong> - Provides inline code suggestions as you type in the editor</li>
          <li><strong>GitHub Copilot Chat</strong> - Enables the chat interface for conversational AI assistance and explanations</li>
        </ul>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          You need <strong>both extensions</strong> for the full Copilot experience! Install them both now.
        </p>
      </div>

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-3)' }}>Install Both Extensions:</h4>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Open VS Code Extensions view</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Click the Extensions icon in the Activity Bar (left sidebar) or press:
          </p>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', marginTop: '8px', display: 'inline-block' }}>
            <code>
              {userOS === 'mac' ? '⌘ Cmd + Shift + X' : 
               userOS === 'windows' ? 'Ctrl + Shift + X' : 
               '⌘ Cmd + Shift + X (Mac) or Ctrl + Shift + X (Windows)'}
            </code>
          </div>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Install GitHub Copilot (Extension 1 of 2)</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Search for <strong>"GitHub Copilot"</strong> by GitHub, then click the green "Install" button
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-600)', margin: '4px 0 0', fontStyle: 'italic' }}>
            Look for the official extension published by "GitHub" with millions of downloads
          </p>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Install GitHub Copilot Chat (Extension 2 of 2)</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Search for <strong>"GitHub Copilot Chat"</strong> by GitHub, then click "Install"
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-600)', margin: '4px 0 0', fontStyle: 'italic' }}>
            This is a separate extension - don't skip it!
          </p>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Wait for installation to complete</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Both extensions should install in 10-30 seconds. You'll see a "Reload Required" button if VS Code needs to restart
          </p>
        </li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Sign In to GitHub Copilot</h3>
      <p>Authenticate the extensions with your GitHub account to activate Copilot.</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Look for the Copilot icon</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            After installation, you'll see new Copilot icons in VS Code (shown below)
          </p>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Click "Sign in to GitHub"</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            You may see a prompt in VS Code or a notification to sign in. Click it to begin authentication
          </p>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Authorize VS Code</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Your browser will open asking you to authorize VS Code to access GitHub. Click "Authorize"
          </p>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Return to VS Code</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Close the browser tab and return to VS Code. Copilot should now be active!
          </p>
        </li>
      </ol>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Troubleshooting Sign-In:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          If you don't see a sign-in prompt, try opening the Command Palette ({userOS === 'mac' ? '⌘ Cmd + Shift + P' : userOS === 'windows' ? 'Ctrl + Shift + P' : 'Cmd+Shift+P or Ctrl+Shift+P'}) and searching for "GitHub Copilot: Sign In".
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Open GitHub Copilot Chat</h3>
      <p>Once signed in, you can access the Copilot Chat interface using any of these methods:</p>

      {/* Visual Guide for Activity Bar Icons */}
      <div style={{ 
        marginTop: 'var(--space-3)',
        padding: 'var(--space-3)',
        background: '#f0f7ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem', color: '#1565c0' }}>📍 Look for These Icons in Your Activity Bar:</h4>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center', marginTop: 'var(--space-2)' }}>
          <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <img src={copilotIcon} alt="Copilot Icon" style={{ maxWidth: '60px', height: 'auto', display: 'block', margin: '0 auto' }} />
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>Copilot Icon</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888' }}>Main Copilot panel</p>
          </div>
          <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <img src={chatIcon} alt="Chat Icon" style={{ maxWidth: '60px', height: 'auto', display: 'block', margin: '0 auto' }} />
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>Chat Icon</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888' }}>Open chat interface</p>
          </div>
          <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <img src={rightShadeToggle} alt="Panel Toggle" style={{ maxWidth: '60px', height: 'auto', display: 'block', margin: '0 auto' }} />
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>Panel Toggle</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#888' }}>Toggle side panels</p>
          </div>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
          These icons appear in the Activity Bar on the left side of VS Code after Copilot is installed
        </p>
      </div>

      <h4 style={{ fontSize: '1.1rem', marginTop: 'var(--space-3)' }}>Four Ways to Open Chat:</h4>

      <div style={{ 
        marginTop: 'var(--space-3)',
        display: 'grid',
        gap: 'var(--space-3)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
      }}>
        {/* Method 1 */}
        <div style={{
          padding: 'var(--space-3)',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          transition: 'box-shadow 0.2s',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>📍</div>
          <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem' }}>Activity Bar (Recommended)</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            Click any of the Copilot icons in the <strong>Activity Bar</strong> (left sidebar) shown above
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
            Easiest method for first-time users
          </p>
        </div>

        {/* Method 2 */}
        <div style={{
          padding: 'var(--space-3)',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>💬</div>
          <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem' }}>Editor Corner</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            Click the chat icon in the <strong>top-right corner</strong> of your editor window
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
            Quick access while coding
          </p>
        </div>

        {/* Method 3 */}
        <div style={{
          padding: 'var(--space-3)',
          background: '#e8f5ff',
          borderRadius: '8px',
          border: '2px solid #4a90e2'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>⌨️</div>
          <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem' }}>Keyboard Shortcut ⭐</h4>
          <div style={{ background: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)' }}>
            <code style={{ fontSize: '0.95rem', fontWeight: 600 }}>
              {userOS === 'mac' ? '⌘ Cmd + Shift + I' :
               userOS === 'windows' ? 'Ctrl + Shift + I' :
               '⌘ Cmd + Shift + I (Mac) or Ctrl + Shift + I (Windows)'}
            </code>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>
            Fastest way to toggle chat open/closed!
          </p>
        </div>

        {/* Method 4 */}
        <div style={{
          padding: 'var(--space-3)',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>🎯</div>
          <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem' }}>Command Palette</h4>
          <p style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#666' }}>
            Press:
          </p>
          <div style={{ background: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)' }}>
            <code style={{ fontSize: '0.85rem' }}>
              {userOS === 'mac' ? '⌘ Cmd + Shift + P' :
               userOS === 'windows' ? 'Ctrl + Shift + P' :
               '⌘ Cmd + Shift + P (Mac) or Ctrl + Shift + P (Windows)'}
            </code>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
            Then type: <strong>"GitHub Copilot: Open Chat"</strong>
          </p>
        </div>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#1565c0', marginTop: 'var(--space-3)' }}>
        <strong>💡 Pro Tip:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Memorize the keyboard shortcut (<code style={{ background: 'rgba(255,255,255,0.7)', padding: '2px 6px', borderRadius: '4px' }}>
            {userOS === 'mac' ? '⌘ Cmd + Shift + I' : userOS === 'windows' ? 'Ctrl + Shift + I' : 'Cmd+Shift+I or Ctrl+Shift+I'}
          </code>) - it's the fastest way to toggle Copilot Chat while you're coding! You'll use it constantly.
        </p>
      </div>

      {/* What to Expect Section */}
      <h3 style={{ marginTop: 'var(--space-4)' }}>✅ What a Working Setup Looks Like</h3>
      <p>Once everything is configured correctly, your VS Code will look similar to this example:</p>
      
      <div style={{ 
        marginTop: 'var(--space-3)',
        padding: 'var(--space-3)',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        textAlign: 'center'
      }}>
        <img 
          src={copilotExample} 
          alt="GitHub Copilot Interface Example" 
          style={{ 
            maxWidth: '100%', 
            height: 'auto', 
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} 
        />
        <p style={{ marginTop: 'var(--space-2)', fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
          Example of GitHub Copilot Chat interface in VS Code with the Activity Bar icons visible
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Verification</h3>
      <p>Test that Copilot is working correctly:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Test inline suggestions</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Create a new file, start typing a function comment (e.g., "// function to calculate fibonacci"), and press Enter. You should see gray ghost text suggestions appear.
          </p>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Test chat interface</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Open Copilot Chat using your preferred method and ask it a simple question like "How do I create a React component?"
          </p>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Check status indicator</strong>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)', margin: '4px 0 0' }}>
            Look at the bottom-right of VS Code. You should see the Copilot icon, which you can click to verify your status.
          </p>
        </li>
      </ol>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-4)' }}>
        <strong>🎉 You're All Set!</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          With both GitHub Copilot extensions installed and authenticated, you're ready to experience AI-powered coding assistance. Try asking questions, requesting code suggestions, or getting explanations for complex code!
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Using GitHub Copilot Effectively</h3>
      
      <h4 style={{ fontSize: '1rem', marginTop: 'var(--space-3)' }}>Inline Suggestions:</h4>
      <ul style={{ fontSize: '0.9rem' }}>
        <li>Start typing code or comments - Copilot will suggest completions in gray text</li>
        <li>Press <code>Tab</code> to accept a suggestion</li>
        <li>Press <code>Esc</code> to dismiss a suggestion</li>
        <li>Use <code>Alt + ]</code> or <code>Alt + [</code> to cycle through alternative suggestions</li>
      </ul>

      <h4 style={{ fontSize: '1rem', marginTop: 'var(--space-3)' }}>Chat Interface:</h4>
      <ul style={{ fontSize: '0.9rem' }}>
        <li><strong>Ask questions:</strong> "How do I handle errors in async functions?"</li>
        <li><strong>Request code:</strong> "Create a function to validate email addresses"</li>
        <li><strong>Get explanations:</strong> Select code and ask "What does this code do?"</li>
        <li><strong>Improve code:</strong> "How can I make this function more efficient?"</li>
        <li><strong>Generate tests:</strong> "Write unit tests for this function"</li>
        <li><strong>Debug help:</strong> "Why am I getting a TypeError here?"</li>
      </ul>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>No suggestions appearing:</strong> Check the Copilot icon in the status bar (bottom-right). Click it to verify you're signed in and Copilot is active.</li>
          <li><strong>"Not authorized" error:</strong> Your GitHub account may not be linked to eBay's Copilot Business license. Revisit Step 1.</li>
          <li><strong>Chat not opening:</strong> Ensure GitHub Copilot Chat extension is installed (check Extensions view). Restart VS Code if needed.</li>
          <li><strong>Slow suggestions:</strong> This is normal on first use. Copilot learns your coding style over time and gets faster.</li>
          <li><strong>Can't sign in:</strong> Try signing out completely (Command Palette → "GitHub Copilot: Sign Out") and signing in again.</li>
          <li><strong>Extensions not showing:</strong> Restart VS Code after installation. If still missing, reinstall both extensions.</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Best Practices</h3>
      <div className="callout" style={{ background: '#f0f4ff', borderColor: '#c5d7f7', color: '#1e3a8a' }}>
        <strong>Tips for Better Copilot Suggestions:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
          <li>Write clear, descriptive comments before code blocks</li>
          <li>Use meaningful variable and function names</li>
          <li>Break complex problems into smaller functions</li>
          <li>Review and understand all AI-generated code before accepting</li>
          <li>Test all AI-generated code thoroughly</li>
          <li>Use specific language in your chat questions</li>
          <li>Provide context when asking questions (select relevant code first)</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>With GitHub Copilot enabled, you're ready to:</p>
      <ul>
        <li>Start coding with AI-powered suggestions</li>
        <li>Ask Copilot Chat to explain unfamiliar code</li>
        <li>Generate boilerplate code and tests automatically</li>
        <li>Learn new programming patterns from AI suggestions</li>
        <li>Install additional VS Code extensions (Cline, language packs, etc.)</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          className="button"
          href="https://github.com/ebay-copilot"
          target="_blank"
          rel="noopener noreferrer"
        >
          eBay Copilot Access
        </a>
        <a
          className="button ghost"
          href="https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copilot Documentation
        </a>
        <a
          className="button ghost"
          href="https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat Guide
        </a>
      </div>
    </>
  )
}
