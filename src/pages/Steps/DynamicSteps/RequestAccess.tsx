import { useState, useEffect } from 'react'
import { getUserOS, getUsername } from '../steps/UserInfo'

export default function RequestAccess() {
  const [userOS, setUserOS] = useState<'mac' | 'windows' | null>(null)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const os = getUserOS()
    const name = getUsername()
    if (os) setUserOS(os)
    if (name) setUsername(name)
  }, [])

  return (
    <>
      <h2>Step 6: Request Secure Access</h2>
      <p>Request access to the tools and systems you'll need for development at eBay. This includes GitHub, JIRA, Slack, and other essential services.</p>

      {!username && (
        <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-4)' }}>
          <strong>Tip:</strong> Go back to Step 0 to save your information for a personalized experience.
        </div>
      )}

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#0d47a1', marginTop: 'var(--space-4)' }}>
        <strong>Why Request Access?</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          At eBay, access to development tools is controlled through Secure Access for security reasons. This ensures only authorized team members can access sensitive systems and data.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What You'll Request</h3>
      <ul>
        <li><strong>GitHub Enterprise</strong> - Access to eBay's code repositories</li>
        <li><strong>GitHub Copilot</strong> - AI pair programming assistant</li>
        <li><strong>JIRA Access</strong> - Project management and issue tracking</li>
        <li><strong>Slack Access</strong> - Team communication platform</li>
        <li><strong>Glean Search</strong> - Enterprise search across eBay systems</li>
      </ul>

      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginTop: 'var(--space-3)' }}>
        <strong>Important:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Access requests typically take a few hours to a few days for approval. You can continue with other setup steps while waiting for approval.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 1: Open Secure Access Portal</h3>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Navigate to Secure Access:</strong>{' '}
          <a href="https://secureaccess.corp.ebay.com/" target="_blank" rel="noopener noreferrer">
            secureaccess.corp.ebay.com
          </a>
        </li>
        <li><strong>Sign in</strong> with your eBay credentials if prompted</li>
        <li><strong>Click "Request Access"</strong> button on the main page</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 2: Search for Your Identity</h3>
      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>Enter your name:</strong>{' '}
          {username ? (
            <>
              Type <strong>{username}</strong> in the search field
            </>
          ) : (
            <>Type your name in the search field</>
          )}
        </li>
        <li><strong>Select yourself</strong> from the dropdown when your name appears</li>
        <li><strong>Click "Next"</strong> to proceed</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 3: Request GitHub Access</h3>
      <p>Start by requesting access to GitHub Enterprise:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>In the search field, type:</strong> <code>eBay GitHub Access</code>
        </li>
        <li><strong>Click the checkmark (✓)</strong> next to "eBay GitHub Access" when it appears</li>
        <li><strong>The item will be added</strong> to your access request cart</li>
      </ol>

      <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
        <strong>GitHub Access is Required:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          This is the foundational access needed for development. All other access requests build on this.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 4: Request GitHub Copilot Access</h3>
      <p>Add GitHub Copilot to your request for AI-assisted coding:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li>
          <strong>In the same search field, type:</strong> <code>github-emu-copilot</code>
        </li>
        <li><strong>Click the checkmark (✓)</strong> next to "github-emu-copilot"</li>
        <li><strong>Verify it's added</strong> to your request alongside GitHub Access</li>
      </ol>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 5: Request Additional Tools</h3>
      <p>Follow the same process to request access to these tools:</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: 'var(--color-neutral-100)' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-blue-700)' }}>Slack Access</strong>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Search for: <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>Slack End User</code>
          </p>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: 'var(--color-neutral-100)' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-blue-700)' }}>JIRA Access</strong>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Search for: <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>JIRA User</code>
          </p>
        </div>

        <div style={{ border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', background: 'var(--color-neutral-100)' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-blue-700)' }}>Glean Search</strong>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>
            Search for: <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>Glean User</code>
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Step 6: Submit Your Request</h3>
      <p>Once you've added all the access items you need:</p>

      <ol style={{ marginTop: 'var(--space-2)' }}>
        <li><strong>Review your selections</strong> - Make sure all needed items are in your cart</li>
        <li><strong>Click "Submit"</strong> to send your access request for approval</li>
        <li><strong>Confirm submission</strong> - You should see a confirmation message</li>
      </ol>

      <div className="callout" style={{ background: '#d4edda', borderColor: '#c3e6cb', color: '#155724', marginTop: 'var(--space-3)' }}>
        <strong>Request Submitted!</strong>
        <p style={{ margin: '8px 0 0' }}>
          Your access request is now pending approval. You'll receive an email notification when access is granted.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>What Happens Next?</h3>
      <ul>
        <li><strong>Approval Timeline:</strong> Most requests are approved within a few hours to 1-2 business days</li>
        <li><strong>Email Notification:</strong> You'll receive an email when each access request is approved</li>
        <li><strong>Continue Setup:</strong> You can proceed with non-access-dependent steps while waiting</li>
        <li><strong>Check Status:</strong> Return to Secure Access portal to check request status</li>
      </ul>

      <div className="callout" style={{ background: '#e8f4f8', borderColor: '#bee5eb', color: '#0c5460', marginTop: 'var(--space-3)' }}>
        <strong>Manager Approval May Be Required:</strong>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>
          Some access requests (like GitHub Copilot) may require manager approval. Your manager will receive an email notification to approve your request.
        </p>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Troubleshooting</h3>
      <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404' }}>
        <strong>Common Issues:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li><strong>Can't find an item:</strong> Try searching with different keywords or check for typos</li>
          <li><strong>Request not appearing:</strong> Sign out and sign back in to refresh</li>
          <li><strong>Access denied:</strong> Contact your manager or the IT Help Desk for assistance</li>
          <li><strong>Delayed approval:</strong> Follow up with your manager if approval is needed</li>
        </ul>
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Next Steps</h3>
      <p>While waiting for access approval, you can continue with other setup steps like installing development tools and configuring your environment. Once access is granted, you'll be able to complete steps that require these services.</p>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          className="button"
          href="https://secureaccess.corp.ebay.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Secure Access Portal
        </a>
        <a
          className="button ghost"
          href="https://hub.ebay.com/services"
          target="_blank"
          rel="noopener noreferrer"
        >
          IT Help Desk
        </a>
      </div>
    </>
  )
}
