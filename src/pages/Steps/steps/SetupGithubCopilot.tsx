import { useState, useEffect } from 'react'
import { getUserInfo, getUserFullName } from './UserInfo'

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

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Request GitHub Copilot Access</h3>
      <p>Before you can use GitHub Copilot, you need to request access through eBay's Secure Access portal.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Important:</strong> This access request may take a few hours to be approved. You can continue with other steps while waiting.
      </div>

      <h4 style={{ marginTop: 'var(--space-3)' }}>Request Process:</h4>
      <ol>
        <li>Open the <a href="https://secureaccess.corp.ebay.com/" target="_blank" rel="noopener noreferrer">Secure Access Portal</a></li>
        <li>Click <strong>"Request Access"</strong> button</li>
        <li>
          {userName ? (
            <>
              Enter <strong>{userName}</strong> in the search field
              <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-700)', marginTop: '4px' }}>
                (Your name from Step 0)
              </div>
            </>
          ) : (
            <>
              Enter your name in the search field
              <div style={{ fontSize: '0.85rem', color: 'var(--color-yellow-500)', marginTop: '4px' }}>
                💡 Tip: Go back to Step 0 to save your information for auto-fill
              </div>
            </>
          )}
        </li>
        <li>Click on your name when it appears</li>
        <li>Click <strong>"Next"</strong></li>
        <li>Copy the access name below and paste it into the Secure Access search field</li>
        <li>Click the checkmark (✓) to add it to your request</li>
        <li>Submit your request</li>
      </ol>

      <div
        style={{
          border: '1px solid #e1e4e8',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3)',
          background: accessRequested ? '#f0f9ff' : 'white',
          marginTop: 'var(--space-3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
              <strong style={{ fontSize: '1.05rem' }}>{copilotAccessName}</strong>
              <button
                type="button"
                onClick={() => handleCopyItem(copilotAccessName, 'copilot-access')}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-blue-500)',
                  background: copiedItem === 'copilot-access' ? 'var(--color-green-500)' : 'white',
                  color: copiedItem === 'copilot-access' ? 'white' : 'var(--color-blue-500)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {copiedItem === 'copilot-access' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: '0.9rem' }}>
              Access to GitHub Copilot AI assistant for code completion
            </p>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <input
              type="checkbox"
              checked={accessRequested}
              onChange={() => setAccessRequested(!accessRequested)}
              style={{ width: '20px', height: '20px' }}
            />
          </label>
        </div>
      </div>

      {accessRequested && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-3)' }}>
          <strong>Access requested!</strong>
          <p style={{ margin: '8px 0 0' }}>
            While waiting for approval, you can proceed to Step 2 below to set up your personal GitHub account.
          </p>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-3)' }}>
        <a
          className="button"
          href="https://secureaccess.corp.ebay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Secure Access Portal
        </a>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Enable GitHub Copilot Access</h3>
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

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Note:</strong> GitHub Copilot will be available in VS Code after you complete Step 12 (Install VS Code Extensions). The extension will automatically connect using this GitHub account.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
     
      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          className="button"
          href="https://github.com/signup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign Up for GitHub
        </a>
        <a
          className="button ghost"
          href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh"
          target="_blank"
          rel="noopener noreferrer"
        >
          SSH Key Documentation
        </a>
      </div>
    </>
  )
}



