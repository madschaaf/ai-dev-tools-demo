import { useState, useEffect } from 'react'
import { getUserInfo, getUserFullName } from './UserInfo'

export default function RequestAccess({ onComplete, isCompleted, onNext }: { onComplete: () => void, isCompleted: boolean, onNext: () => void }) {
  const [userName, setUserName] = useState<string>('')
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)
  const [requestedItems, setRequestedItems] = useState({
    github: false,
    copilot: false,
    genai: false,
    jira: false,
    slack: false,
    figma: false
  })
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo) {
      setUserName(`${userInfo.firstName} ${userInfo.lastName}`)
    }
  }, [])

  const handleRequest = (item: keyof typeof requestedItems) => {
    setRequestedItems(prev => ({ ...prev, [item]: !prev[item] }))
  }

  const handleCopy = (text: string, itemKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(itemKey)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const handleCopyPrompt = (text: string, promptKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPrompt(promptKey)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const allRequested = Object.values(requestedItems).every(v => v)

  const userInfo = getUserInfo()
  const fullName = getUserFullName()

  const accessItems = [
    { key: 'github', name: 'eBay GitHub Access', description: 'Access to GitHub Enterprise (github.corp.ebay.com)' },
    { key: 'copilot', name: 'github-emu-copilot', description: 'Access to GitHub Copilot AI assistant' },
    { key: 'genai', name: 'github-emu-genai', description: 'Access to generative AI tools and features' },
    { key: 'jira', name: 'CORP Citrix Jira Access', description: 'Access to Jira for project management and issue tracking' },
    { key: 'slack', name: 'Slack End User', description: "Access to eBay's Slack workspace for communication" },
    { key: 'figma', name: 'CORP Citrix Figma', description: 'Access to Figma for design collaboration' }
  ]

  const aiHelpPrompt = `I need to request access to several systems for my new eBay developer account. Can you help me:

1. Understand what each of these access items is for:
${accessItems.map(item => `   - ${item.name}: ${item.description}`).join('\n')}

2. Explain the Secure Access portal process at eBay
3. Help me troubleshoot if I get stuck or encounter errors

My name is: ${fullName || '[Your Name]'}
My email is: ${userInfo?.email || '[Your Email]'}

Please explain the process step-by-step and what each system will let me do.`

  return (
    <>
      <h2>Step 3: Request Access</h2>
      <p>Before you can use eBay's development tools, you need to request access through Secure Access. This process may take some time for approval.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Important:</strong> Access requests may take a few hours to a few days to be approved. Continue with other steps while waiting.
      </div>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-3)' }}>
        <strong>💡 Get AI Help:</strong> Not sure what these access items are for? Copy this prompt and paste it into eBay's Glean Chat for explanations and guidance:
        <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <pre style={{ flex: 1, margin: 0, fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {aiHelpPrompt}
            </pre>
            <button
              type="button"
              onClick={() => handleCopyPrompt(aiHelpPrompt, 'ai-help')}
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-blue-500)',
                background: copiedPrompt === 'ai-help' ? 'var(--color-green-500)' : 'white',
                color: copiedPrompt === 'ai-help' ? 'white' : 'var(--color-blue-500)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {copiedPrompt === 'ai-help' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: '0.85rem' }}>
          {/* Paste into <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">ChatGPT</a> or <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude.ai</a> */}
            Paste into <a href="https://app.glean.com/chat" target="_blank" rel="noopener noreferrer">Glean Chat</a>
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Request Process</h3>
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
                💡 Tip: Go back to Step 0 to save your information for auto-fill throughout the guide
              </div>
            </>
          )}
        </li>
        <li>Click on your name when it appears</li>
        <li>Click <strong>"Next"</strong></li>
        <li>For each item below:
          <ul>
            <li>Click the copy button to copy the access name</li>
            <li>Paste it into the Secure Access search field</li>
            <li>Click the checkmark (✓) to add it to your request</li>
          </ul>
        </li>
        <li>After adding all items, submit your request</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Required Access Items</h3>
      <p>Copy each item name below and search for it in Secure Access:</p>

      <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {accessItems.map((item) => (
          <div
            key={item.key}
            style={{
              border: '1px solid #e1e4e8',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3)',
              background: requestedItems[item.key as keyof typeof requestedItems] ? '#f0f9ff' : 'white'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '1.05rem' }}>{item.name}</strong>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.name, item.key)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-blue-500)',
                      background: copiedItem === item.key ? 'var(--color-green-500)' : 'white',
                      color: copiedItem === item.key ? 'white' : 'var(--color-blue-500)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                  >
                    {copiedItem === item.key ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ margin: 0, color: 'var(--color-neutral-700)', fontSize: '0.9rem' }}>
                  {item.description}
                </p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <input
                  type="checkbox"
                  checked={requestedItems[item.key as keyof typeof requestedItems]}
                  onChange={() => handleRequest(item.key as keyof typeof requestedItems)}
                  style={{ width: '20px', height: '20px' }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {allRequested && (
        <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-4)' }}>
          <strong>All access requested!</strong>
          <p style={{ margin: '8px 0 0' }}>
            While waiting for approval, continue with Step 7 to set up your personal GitHub account.
          </p>
        </div>
      )}

      <h3 style={{ marginTop: 'var(--space-4)' }}>What to Expect</h3>
      <ul>
        <li><strong>Approval time:</strong> Most requests are approved within a few hours, but some may take 1-2 business days</li>
        <li><strong>Notifications:</strong> You'll receive an email when access is granted</li>
        <li><strong>Next steps:</strong> Once approved, you can proceed to configure GitHub Enterprise in Step 8</li>
      </ul>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <a
          className="button"
          href="https://secureaccess.corp.ebay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Secure Access Portal
        </a>
      </div>

      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {!isCompleted ? (
            <button
              type="button"
              onClick={onComplete}
              disabled={!allRequested}
              style={{
                fontSize: '1rem',
                padding: '12px 24px',
                background: allRequested ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: allRequested ? 'pointer' : 'not-allowed',
                fontWeight: 600,
                transition: 'all 0.2s',
                opacity: allRequested ? 1 : 0.6
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
