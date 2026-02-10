import { useState } from 'react'

export default function LocalAdminAccess() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
        <h2 style={{ margin: 0 }}>Request Local Admin Access</h2>
        <button
          type="button"
          onMouseEnter={() => setShowHelp(true)}
          onMouseLeave={() => setShowHelp(false)}
          onClick={() => setShowHelp(!showHelp)}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #1976d2',
            background: 'white',
            color: '#1976d2',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            transition: 'all 0.2s',
            transform: showHelp ? 'scale(1.1)' : 'scale(1)'
          }}
          aria-label="Why do I need admin access?"
        >
          ?
        </button>
      </div>

      {showHelp && (
        <div className="callout" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          marginBottom: 'var(--space-3)',
          animation: 'fadeIn 0.2s ease-in'
        }}>
          <h4 style={{ color: 'white', marginTop: 0, marginBottom: 'var(--space-2)' }}>💡 Why Do You Need Admin Access?</h4>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
            Think of admin access like having the keys to your own house. Some developer tools need to install software, 
            change settings, or access protected areas of your computer to work properly. Without admin access, it's like 
            trying to renovate your house but not being allowed to unlock certain rooms. Admin access gives you permission 
            to install the AI tools, configure settings, and make your development environment work the way you need it to.
          </p>
        </div>
      )}

      <p>Learn how to request temporary or permanent local admin rights for your Mac or Windows device at eBay.</p>

      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#1565c0', marginTop: 'var(--space-3)' }}>
        <strong>What you're requesting:</strong> Permanent local admin = ongoing admin rights granted as an exception and tied to your identity/device. 
        This is different from the temporary 24-hour elevation available through Self Service (Mac) or Software Center (Windows).
      </div>

      {/* Mac Instructions */}
      <div style={{ background: 'white', border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <h3 style={{ margin: '0 0 var(--space-3)' }}>🍎 Mac Instructions</h3>

        {/* Temporary Access - Mac */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h4 style={{ color: '#1976d2', marginBottom: 'var(--space-2)' }}>Option 1: Temporary Access (24 hours)</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Open Self Service</strong> - Navigate to Applications → Self Service on your Mac
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Search for "Request Local Admin Rights"</strong> - Click the Request button when found
              </li>
              <li>
                <strong>Admin rights granted for 24 hours</strong> - Rights automatically expire after 24 hours; run again whenever needed
              </li>
            </ol>
          </div>
        </div>

        {/* Permanent Access - Mac */}
        <div>
          <h4 style={{ color: '#7b1fa2', marginBottom: 'var(--space-2)' }}>Option 2: Permanent Access (Manager Approval Required)</h4>
          
          <div className="callout" style={{ background: '#fff3cd', borderColor: '#ffeaa7', color: '#856404', marginBottom: 'var(--space-2)' }}>
            <strong>⚠️ Exception Basis:</strong> This is granted on an exception basis and requires your manager's approval per ITSS policy (least privilege).
          </div>
          
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Go to Secure Access</strong> - Navigate to{' '}
                <a 
                  href="https://secureaccess.corp.ebay.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2' }}
                >
                  Secure Access
                </a>
                {' '}and choose "Request Access"
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Select yourself and search</strong> - Click Next, then search for "Local Privileged Access"
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Submit for approval</strong> - Choose "Local Privileged Access", click Next, and Submit
              </li>
              <li>
                <strong>After approval</strong> - The "Request Local Admin Rights" tool in Self Service can grant admin rights without expiring, 
                provided the device can see the approval (typically when connected to the corporate network/VPN)
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Windows Instructions */}
      <div style={{ background: 'white', border: '1px solid #e1e4e8', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <h3 style={{ margin: '0 0 var(--space-3)' }}>🪟 Windows Instructions</h3>

        {/* Temporary Access - Windows */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h4 style={{ color: '#1976d2', marginBottom: 'var(--space-2)' }}>Option 1: Temporary Access (24 hours)</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Open Software Center</strong> - Search for "Software Center" in the Start menu
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Search for "local admin"</strong> - Use the search bar in Software Center
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Install the tool</strong> - Click "Local Admin – Request Rights" or "Local Admin Request GUI", then select Install or Reinstall
              </li>
              <li>
                <strong>Log off and back on</strong> - Follow the prompts to complete activation. Access auto-expires after 24 hours; rerun whenever needed
              </li>
            </ol>
          </div>
        </div>

        {/* Permanent Access - Windows */}
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <h4 style={{ color: '#7b1fa2', marginBottom: 'var(--space-2)' }}>Option 2: Permanent Access (Manager Approval Required)</h4>
          <div style={{ background: '#f6f8fa', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Go to Secure Access portal</strong> - Navigate to{' '}
                <a 
                  href="https://secureaccess.corp.ebay.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2' }}
                >
                  Secure Access
                </a>
                , choose "Request Access", and select your identity
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Request Local Privileged Access</strong> - Search for "Local Privileged Access" and submit the request for approval
              </li>
              <li>
                <strong>After approval</strong> - Use the Software Center local admin tool to activate rights as needed on the device
              </li>
            </ol>
          </div>
        </div>

        {/* Cloud PC Note */}
        <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#1565c0' }}>
          <strong>💻 For eBay Cloud PC users:</strong> Use Software Center inside your Cloud PC to install the Local Admin Request tool. 
          If you need persistent rights, request "Local Privileged Access" via Secure Access first, then run the tool in the Cloud PC.
        </div>
      </div>

      {/* Troubleshooting */}
      <div style={{ background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <h3 style={{ margin: '0 0 var(--space-3)', color: '#856404' }}>⚠️ Troubleshooting Tips</h3>
        
        <div style={{ fontSize: '0.9rem' }}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <strong>Connect to VPN</strong>
            <p style={{ margin: '4px 0 0', color: '#856404' }}>
              If you don't see the Local Admin tool or Software Center doesn't show the option, 
              connect to GlobalProtect VPN and try again. This helps your device pick up approved permanent exceptions.
            </p>
          </div>
          
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <strong>Tool errors or missing</strong>
            <p style={{ margin: '4px 0 0', color: '#856404' }}>
              If the tool errors or you can't locate it, contact{' '}
              <a 
                href="https://hub.ebay.com/services" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#1976d2' }}
              >
                ITSS Support via Hub Services
              </a>
              {' '}for help.
            </p>
          </div>
          
          <div>
            <strong>Removing permanent access</strong>
            <p style={{ margin: '4px 0 0', color: '#856404' }}>
              Managers can remove permanent access later via Secure Access by searching the team member's name 
              and submitting the removal request.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="callout" style={{ background: '#e3f2fd', borderColor: '#90caf9', color: '#1565c0', marginTop: 'var(--space-3)' }}>
        <strong>💡 Remember:</strong> Permanent local admin access requires manager approval and is granted on an exception basis 
        per ITSS policy (least privilege principle). Use temporary access for occasional admin needs.
      </div>

      <h3 style={{ marginTop: 'var(--space-4)' }}>Additional Resources</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <a
          href="https://secureaccess.corp.ebay.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 'var(--space-2)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-blue-700)', fontSize: '0.9rem', border: '1px solid #e1e4e8' }}
        >
          🔐 Secure Access Portal
        </a>
        <a
          href="https://hub.ebay.com/services"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: 'var(--space-2)', background: '#f6f8fa', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--color-blue-700)', fontSize: '0.9rem', border: '1px solid #e1e4e8' }}
        >
          🛠️ ITSS Support
        </a>
      </div>
    </>
  )
}
