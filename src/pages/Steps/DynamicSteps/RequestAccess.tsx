import { useState } from 'react'

interface AccessItem {
  key: string;
  name: string;
  description: string;
}

interface RequestAccessProps {
  accessItems?: AccessItem[];
  userName?: string;
  userEmail?: string;
}

export default function RequestAccess({ accessItems = [], userName, userEmail }: RequestAccessProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [requestedItems, setRequestedItems] = useState<Record<string, boolean>>({})

  const handleRequest = (itemKey: string) => {
    setRequestedItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }))
  }

  const handleCopy = (text: string, itemKey: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(itemKey)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const allRequested = accessItems.length > 0 && 
    accessItems.every(item => requestedItems[item.key])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Request Secure Access</h2>
      <p>Request access to the tools and systems needed for your use case. This process may take some time for approval.</p>

      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffeaa7', 
        borderRadius: '4px',
        padding: '12px',
        marginTop: '16px',
        color: '#856404'
      }}>
        <strong>Important:</strong> Access requests may take a few hours to a few days to be approved. You can continue with other setup steps while waiting.
      </div>

      <h3 style={{ marginTop: '24px' }}>Request Process</h3>
      <ol>
        <li>Open the <a href="https://secureaccess.corp.ebay.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0064d2' }}>Secure Access Portal</a></li>
        <li>Click <strong>"Request Access"</strong> button</li>
        <li>
          {userName ? (
            <>
              Enter <strong>{userName}</strong> in the search field
            </>
          ) : (
            <>Enter your name in the search field</>
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

      {accessItems.length > 0 ? (
        <>
          <h3 style={{ marginTop: '24px' }}>Required Access Items</h3>
          <p>Copy each item name below and search for it in Secure Access:</p>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {accessItems.map((item) => (
              <div
                key={item.key}
                style={{
                  border: '1px solid #e1e4e8',
                  borderRadius: '4px',
                  padding: '16px',
                  background: requestedItems[item.key] ? '#f0f9ff' : 'white'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '1.05rem' }}>{item.name}</strong>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.name, item.key)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          border: '1px solid #0064d2',
                          background: copiedItem === item.key ? '#28a745' : 'white',
                          color: copiedItem === item.key ? 'white' : '#0064d2',
                          cursor: 'pointer',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        {copiedItem === item.key ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      {item.description}
                    </p>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      checked={requestedItems[item.key] || false}
                      onChange={() => handleRequest(item.key)}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          {allRequested && (
            <div style={{ 
              background: '#d4edda', 
              border: '1px solid #c3e6cb', 
              borderRadius: '4px',
              padding: '12px',
              marginTop: '16px',
              color: '#155724'
            }}>
              <strong>All access requested!</strong>
              <p style={{ margin: '8px 0 0' }}>
                While waiting for approval, you can continue with other setup steps.
              </p>
            </div>
          )}
        </>
      ) : (
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '20px',
          marginTop: '16px',
          textAlign: 'center',
          color: '#666'
        }}>
          <p style={{ margin: 0 }}>
            No access items configured. Access requirements will be determined based on your use case selections.
          </p>
        </div>
      )}

      <h3 style={{ marginTop: '24px' }}>What to Expect</h3>
      <ul>
        <li><strong>Approval time:</strong> Most requests are approved within a few hours, but some may take 1-2 business days</li>
        <li><strong>Notifications:</strong> You'll receive an email when access is granted</li>
        <li><strong>Next steps:</strong> Once approved, you can proceed with additional configuration</li>
      </ul>

      <div style={{ marginTop: '24px' }}>
        <a
          href="https://secureaccess.corp.ebay.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#0064d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 600
          }}
        >
          Open Secure Access Portal
        </a>
      </div>
    </div>
  )
}

// Example usage with dynamic access items:
// <RequestAccess 
//   userName="John Doe"
//   userEmail="john.doe@ebay.com"
//   accessItems={[
//     { key: 'github', name: 'eBay GitHub Access', description: 'Access to GitHub Enterprise' },
//     { key: 'copilot', name: 'github-emu-copilot', description: 'Access to GitHub Copilot' }
//   ]}
// />
