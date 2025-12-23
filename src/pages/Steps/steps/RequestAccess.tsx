import { useState } from 'react'

export default function RequestAccess() {
  const [requestedItems, setRequestedItems] = useState({
    github: false,
    copilot: false,
    genai: false,
    jira: false,
    slack: false,
    figma: false
  })
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleRequest = (item: keyof typeof requestedItems) => {
    setRequestedItems(prev => ({ ...prev, [item]: !prev[item] }))
  }

  const handleCopy = (text: string, itemKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(itemKey)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const allRequested = Object.values(requestedItems).every(v => v)

  const accessItems = [
    { key: 'github', name: 'eBay GitHub Access', description: 'Access to GitHub Enterprise (github.corp.ebay.com)' },
    { key: 'copilot', name: 'github-emu-copilot', description: 'Access to GitHub Copilot AI assistant' },
    { key: 'genai', name: 'github-emu-genai', description: 'Access to generative AI tools and features' },
    { key: 'jira', name: 'CORP Citrix Jira Access', description: 'Access to Jira for project management and issue tracking' },
    { key: 'slack', name: 'Slack End User', description: 'Access to eBay\'s Slack workspace for communication' },
    { key: 'figma', name: 'CORP Citrix Figma', description: 'Access to Figma for design collaboration' }
  ]

  return (
    <>
      <h2>Step 6: Request Access</h2>
      <p>Before you can use eBay's development tools, you need to request access through Secure Access. This process may take some time for approval.</p>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
        <strong>Important:</strong> Access requests may take a few hours to a few days to be approved. Continue with other steps while waiting.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>How to Request Access</h3>
      <ol>
        <li>Open the <a href="https://secureaccess.corp.ebay.com/" target="_blank" rel="noopener noreferrer">Secure Access Portal</a></li>
        <li>Click <strong>"Request Access"</strong> button</li>
        <li>Enter your name in the search field</li>
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
    </>
  )
}
