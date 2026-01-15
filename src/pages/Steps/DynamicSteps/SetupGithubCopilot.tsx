import { useState, useEffect } from 'react'
import { getUserInfo, getUserFullName } from './UserInfo'
import copilotIcon from '../../../assets/copilot-icon.png'
import chatIcon from '../../../assets/chat-icon.png'
import rightShadeToggle from '../../../assets/right-shade-toggle.png'
import copilotExample from '../../../assets/copilot-image-example.png'

export default function SetupGitHubCopilot() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [accessRequested, setAccessRequested] = useState(false)

  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo) {
      setUserName(`${userInfo.firstName} ${userInfo.lastName}`)
    }
  }, [])

  const handleCopy = (text: string, commandKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandKey)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const handleCopyItem = (text: string, itemKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(itemKey)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const copilotAccessName = 'github-emu-copilot'

  return (
    <>
      <h2>Setup GitHub Copilot</h2>
      <p>GitHub Copilot is your AI pair programmer that helps you write code faster. First, request access through Secure Access, then enable it with your personal GitHub account.</p>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>What is GitHub Copilot?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          GitHub Copilot is an AI coding assistant that suggests code completions directly in your editor as you type. It's integrated into VS Code and will be available once you complete this step.
        </p>
      </div>


      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Enable GitHub Copilot Access</h3>
      <p>After your Secure Access request is approved, link your personal GitHub account with eBay's enterprise setup.</p>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Enable GitHub Copilot:</h4>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to eBay Copilot repo:</strong> Visit{' '}
          <a href="https://github.com/ebay-copilot" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
            https://github.com/ebay-copilot
          </a>
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Sign in:</strong> You'll be prompted to sign in with your personal GitHub account (the one you just created)
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Confirm SSO:</strong> When prompted, authorize eBay SSO access to link your GitHub account with eBay's enterprise
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Verify access:</strong> You should see the ebay-copilot repository and have Copilot enabled for your account
        </li>
      </ol>

      <div className="callout" style={{ background: '#fff3e0', borderColor: '#ffb74d', color: '#e65100', marginTop: 'var(--space-3)' }}>
        <strong>📦 Two Extensions Required</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          GitHub Copilot has <strong>two separate extensions</strong> that work together:
        </p>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '0.9rem' }}>
          <li><strong>GitHub Copilot</strong> - Provides inline code suggestions as you type</li>
          <li><strong>GitHub Copilot Chat</strong> - Enables the chat interface for conversational AI assistance</li>
        </ul>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          You need <strong>both extensions</strong> for the full Copilot experience!
        </p>
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Install Both Copilot Extensions:</h4>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Install GitHub Copilot:</strong> In VS Code, click the Extensions icon in the left sidebar (or press Cmd/Ctrl+Shift+X), search for <strong>"GitHub Copilot"</strong>, and click "Install"
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Install GitHub Copilot Chat:</strong> In the same Extensions view, search for <strong>"GitHub Copilot Chat"</strong> and click "Install"
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Sign in to both extensions:</strong> Open VS Code and sign in to the Copilot extensions using your personal GitHub account
        </li>
        <li style={{ marginTop: 'var(--space-2)' }}>
          <strong>Sign into GitHub Copilot in VS Code:</strong> In VS Code, find the chat icon <em>Typically located at the top of VS Code,</em> then click "Sign in to GitHub Copilot" and follow the prompts to authenticate
        </li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Opening GitHub Copilot Chat</h3>
      <p>Once GitHub Copilot is enabled, you can open the chat interface using any of these methods:</p>

      {/* Visual Guide for Activity Bar Icons */}
      <div style={{ 
        marginTop: 'var(--space-3)',
        padding: 'var(--space-3)',
        background: '#f0f7ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem', color: '#1565c0' }}>📍 Look for These Icons in Your Activity Bar:</h4>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center', marginTop: 'var(--space-2)' }}>
          <div style={{ textAlign: 'center' }}>
            <img src={copilotIcon} alt="Copilot Icon" style={{ maxWidth: '60px', height: 'auto', display: 'block', margin: '0 auto' }} />
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#666' }}>Copilot Icon</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={chatIcon} alt="Chat Icon" style={{ maxWidth: '60px', height: 'auto', display: 'block', margin: '0 auto' }} />
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#666' }}>Chat Icon</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={rightShadeToggle} alt="Panel Toggle" style={{ maxWidth: '60px', height: 'auto', display: 'block', margin: '0 auto' }} />
            <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#666' }}>Panel Toggle</p>
          </div>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
          These icons appear in the Activity Bar on the left side of VS Code
        </p>
      </div>

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
          border: '1px solid #dee2e6'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>📍</div>
          <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem' }}>Activity Bar</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            Click any of the Copilot icons in the <strong>Activity Bar</strong> (left sidebar) shown above
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
        </div>

        {/* Method 3 */}
        <div style={{
          padding: 'var(--space-3)',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>⌨️</div>
          <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1rem' }}>Keyboard Shortcut</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            Press <strong>Cmd+Shift+I</strong> (Mac) or <strong>Ctrl+Shift+I</strong> (Windows/Linux)
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
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            Press <strong>Cmd+Shift+P</strong> (Mac) or <strong>Ctrl+Shift+P</strong> (Windows/Linux) and type <strong>"GitHub Copilot: Open Chat"</strong>
          </p>
        </div>
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#1565c0', marginTop: 'var(--space-3)' }}>
        <strong>💡 Pro Tip:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          The keyboard shortcut (<strong>Cmd+Shift+I</strong> or <strong>Ctrl+Shift+I</strong>) is the fastest way to toggle Copilot Chat open and closed while you're coding!
        </p>
      </div>

      {/* What to Expect Section */}
      <h3 style={{ marginTop: 'var(--space-4)' }}>✅ What a Working Copilot Setup Looks Like</h3>
      <p>Once everything is set up correctly, your VS Code will look similar to this:</p>
      
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
          Example of GitHub Copilot Chat interface in VS Code
        </p>
      </div>

      <div className="callout" style={{ background: '#e8f5e9', borderColor: '#a5d6a7', color: '#2e7d32', marginTop: 'var(--space-3)' }}>
        <strong>🎉 You're All Set!</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          With both GitHub Copilot extensions installed and the chat interface accessible, you're ready to start coding with AI assistance. Try asking Copilot a question or request code suggestions as you type!
        </p>
      </div>

    </>
  )
}
